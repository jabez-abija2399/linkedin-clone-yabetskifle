'use server'
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { postSchema } from "@/schemas/post.schema";
import { revalidatePath } from "next/cache";

// this tells next js this function only runs on the server


export async function createPost(formData: FormData) {
    const session = await auth()

    if (!session?.user?.id) {
        return { error: "Unauthorized" }
    }

    // Extract the data from the form
    const content = formData.get("content") as string;

    // validate it with zod
    const validated = postSchema.safeParse({ content });

    if (!validated.success) {
        return { error: "Invalid post data" }
    }

    try {
        // save to database
        // note for now we use a hardcoded user ID b/c you aren't logged in yet
        // we will fix this once Auth is connected
        await prisma.post.create({
            data: {
                content: validated.data.content,
                authorId: session.user.id,
            },
        });

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Error creating post:", error);
        return { error: "Failed to create post" };
    }
}

export async function getPosts() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                author: true, // This brings in the name, image, and headline!
                likes: true, 
                comments: {
                    include: {
                        author: true,
                    },
                    orderBy: { createdAt: "desc" },
                }
            }

        });
        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
}

