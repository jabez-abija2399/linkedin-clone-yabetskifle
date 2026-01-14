"use server"
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function CreateComment(formData: FormData) {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) {
        return { error: "Unauthorized" }
    }

    const content = formData.get("content") as string;
    const postId = formData.get("postId") as string;

    if (!content || !postId) {
        return { error: "Invalid comment data" }
    }

    try {
        await prisma.comment.create({
            data: {
                authorId: userId,
                postId,
                content,
            }
        })

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Error creating comment:", error);
        return { error: "Failed to create comment" };
    }
}