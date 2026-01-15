"use server"

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { profileUpdateSchema } from "@/schemas/user.schema"
import { revalidatePath } from "next/cache"
import { uploadToCloudinary } from "@/lib/cloudinary"

export async function updateProfile(formData: FormData) {
    const session = await auth();
    if (!session?.user?.id) {
        return { error: "Unauthorized" };
    }

    // Extract data and convert empty strings to null
    const name = formData.get("name") as string;
    const headline = formData.get("headline") as string;
    const about = formData.get("about") as string;
    const location = formData.get("location") as string;
    const imageFile = formData.get("image") as File | null;

    const data = {
        name: name?.trim() || null,
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
        let imageUrl: string | undefined = undefined; // Undefined means "don't update" in Prisma

        // If there's an image, upload it to Cloudinary
        if (imageFile && imageFile.size > 0) {
            const uploadedUrl = await uploadToCloudinary(imageFile);
            if (uploadedUrl) imageUrl = uploadedUrl;
        }

        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                ...validated.data,
                // Only include image if a new one was uploaded
                ...(imageUrl && { image: imageUrl })
            },
        });
        revalidatePath(`/profile/${session.user.id}`);
        return { success: true };
    } catch (error) {
        console.error("Error updating profile:", error);
        return { error: "Failed to update profile" };
    }
}
