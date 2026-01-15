import { z } from "zod"


// validation schema
export const userSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    image: z.string().url("Invalid image URL"),
    headline: z.string().max(100, "Headline must be at most 100 characters long"),
    about: z.string().max(1000, "About must be at most 1000 characters long"),
    location: z.string().max(100, "Location must be at most 100 characters long"),
})

// Profile update schema - only the fields users can edit
export const profileUpdateSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long").optional().nullable(),
    headline: z.string().max(120, "Headline must be at most 120 characters").optional().nullable(),
    about: z.string().max(2000, "About must be at most 2000 characters").optional().nullable(),
    location: z.string().max(100, "Location must be at most 100 characters").optional().nullable(),
})