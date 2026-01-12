"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


export async function CreateComment(content: string, postId: string) {
    const userId = "cmka10j6l0000ux9l430r1vte"; // Use our seed user ID for now
    
    if(!content || !postId) {
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
    } catch (error) {
        console.error("Error creating comment:", error);
        return { error: "Failed to create comment" };
    }

    revalidatePath("/")
}