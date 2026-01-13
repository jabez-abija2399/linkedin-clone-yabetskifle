"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { profileUpdateSchema } from "@/schemas/user.schema"
import { revalidatePath } from "next/cache"


export async function updateProfile(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) {
        return { error: "Unauthorized" };
    }

    // Extract data and convert empty strings to null
    const headline = formData.get("headline") as string;
    const about = formData.get("about") as string;
    const location = formData.get("location") as string;

    const data = {
        headline: headline?.trim() || null,
        about: about?.trim() || null,
        location: location?.trim() || null,
    };

    // Validate
    const validated = profileUpdateSchema.safeParse(data);
    if (!validated.success) {
        console.error("Validation errors:", validated.error);
        return { error: "Invalid profile data" };
    }

    try {
        await prisma.user.update({
            where: { id: session.user.id },
            data: validated.data,
        });
        revalidatePath(`/profile/${session.user.id}`);
        return { success: true };
    } catch (error) {
        console.error("Error updating profile:", error);
        return { error: "Failed to update profile" };
    }
}
