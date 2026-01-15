"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { educationSchema } from "@/schemas/education.schema";
import { revalidatePath } from "next/cache";

export async function addEducation(data: any) {
    const session = await auth();
    if (!session?.user || !session.user.id) return { error: "Unauthorized" };

    const parsedData = {
        ...data,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : undefined,
    };

    const validated = educationSchema.safeParse(parsedData);
    if (!validated.success) return { error: validated.error.errors[0].message };

    try {
        await prisma.education.create({
            data: {
                school: validated.data.school,
                degree: validated.data.degree,
                fieldOfStudy: validated.data.fieldOfStudy,
                startDate: validated.data.startDate,
                endDate: validated.data.endDate,
                description: validated.data.description,
                userId: session.user.id,
            }
        });

        revalidatePath(`/profile/${session.user.id}`);
        return { success: true };
    } catch (error) {
        console.error(error);
        return { error: "Failed to add education" };
    }
}