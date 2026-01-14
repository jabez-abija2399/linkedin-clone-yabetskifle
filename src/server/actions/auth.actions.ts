"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function register(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const validated = registerSchema.safeParse({ name, email, password });

    if (!validated.success) {
        return { error: validated.error.issues[0].message };
    }

    try {
        console.log("Checking for existing user:", email);
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            console.log("User already exists");
            return { error: "User already exists" };
        }

        console.log("Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("Creating user in database...");
        await (prisma.user as any).create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        console.log("User created successfully");
        return { success: "User created successfully" };
    } catch (error: any) {
        console.error("Registration error:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        return { error: `Registration failed: ${errorMessage}` };
    }
}
