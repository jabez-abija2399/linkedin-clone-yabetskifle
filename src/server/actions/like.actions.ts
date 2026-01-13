"use server"
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleLike(postId: string) {
    const session = await auth()
    const userId = session?.user?.id

    if (!userId) {
        return { error: "Unauthorized" }
    }

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