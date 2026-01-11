import { z } from "zod";

export const postSchema = z.object({
    content:z
    .string()
    .min(1, "Post cannot be empty")
    .max(500, "Post cannot be longer than 500 characters"),
    image:z
    .string()
    .optional(),
})

export type PostInput = z.infer<typeof postSchema>