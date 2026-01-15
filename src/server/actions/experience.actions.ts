"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { experienceSchema } from "@/schemas/experience.schema";
import { revalidatePath } from "next/cache";

export async function addExperience(data: any) {
    const session = await auth();
    if (!session?.user) return { error: "Unauthorized" };

    // Basic date conversion if coming from simple JSON form
    const parsedData = {
        ...data,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : undefined,
    };

    const validated = experienceSchema.safeParse(parsedData);
    if (!validated.success) return { error: validated.error.errors[0].message };

    try {
        await prisma.experience.create({
            data: {
                ...validated.data,
                userId: session.user.id,
                // cleanup 'current' field which isn't in DB
                current: undefined, 
            }
        });

        revalidatePath(`/profile/${session.user.id}`);
        return { success: true };
    } catch (error) {
        return { error: "Failed to add experience" };
    }
}