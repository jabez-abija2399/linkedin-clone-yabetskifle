'use server'
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { postSchema } from "@/schemas/post.schema";
import { revalidatePath } from "next/cache";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function createPost(formData: FormData) {
    const session = await auth()

    if (!session?.user?.id) {
        return { error: "Unauthorized" }
    }

    // Extract the data from the form
    const content = formData.get("content") as string;
    const imageFile = formData.get("image") as File | null;

    // Validate content with zod
    const validated = postSchema.safeParse({ content });

    if (!validated.success) {
        return { error: "Invalid post data" }
    }

    try {
        let imageUrl: string | null = null;

        // If there's an image, upload it to Cloudinary
        if (imageFile && imageFile.size > 0) {
            imageUrl = await uploadToCloudinary(imageFile);
        }

        // Save to database with the image URL
        await prisma.post.create({
            data: {
                content: validated.data.content,
                image: imageUrl, // Store the Cloudinary URL
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

