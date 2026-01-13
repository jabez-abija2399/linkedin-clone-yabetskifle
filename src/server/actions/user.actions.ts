"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { userSchema } from "@/schemas/user.schema"
import { revalidatePath } from "next/cache"


export async function updateProfile(formData: FormData) {
    const session = await auth()

    if (!session?.user?.id) {
        return { error: "Unauthorized" }
    }

    // Extract data
    const data = {
        name: formData.get("name") as string,
        headline: formData.get("headline") as string,
        about: formData.get("about") as string,
        location: formData.get("location") as string,
        image: formData.get("image") as string,
    }

    // validate
    const validate = userSchema.safeParse(data)

    if (!validate.success) {
        return { error: "Invalid data" }
    }

    try {
        await prisma.user.update({
            where: { id: session.user.id },
            data: validate.data 
        });

        revalidatePath(`/profile/${session.user.id}`)
        return { success: true }

    } catch (error) {
        console.error("Error updating profile:", error);
        return { error: "Failed to update profile" }
    }
}
