"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleLike(postId: string) {
    const userId = "cmka10j6l0000ux9l430r1vte"; // Use our seed user ID for now

    const like = await prisma.like.findUnique({
        where: {
            userId_postId: {
                userId,
                postId,
            },
        },
    });
    
    if (like) {
        await prisma.like.delete({
            where: {
                userId_postId: {
                    userId,
                    postId,
                },
            },
        });
    } else {
        await prisma.like.create({
            data: {
                userId,
                postId,
            },
        });
    }
    
    revalidatePath("/")
}