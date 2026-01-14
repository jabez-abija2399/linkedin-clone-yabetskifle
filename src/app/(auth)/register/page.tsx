"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import Link from "next/link";
import { register } from "@/server/actions/auth.actions";
import { toast } from "sonner";

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        const formData = new FormData(event.currentTarget);
        const result = await register(formData);

        setIsLoading(false);

        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success("Account created successfully! Please sign in.");
            router.push("/login");
        }
    }

    return (
        <Card className="w-full max-w-sm shadow-lg">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Join LinkedIn</CardTitle>
                <CardDescription className="text-center">
                    Make the most of your professional life
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                        <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="password" className="text-sm font-medium">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Creating account..." : "Agree & Join"}
                    </Button>
                </form>

                <div className="mt-4 text-center text-sm">
                    <p className="text-muted">
                        Already on LinkedIn?{" "}
                        <Link href="/login" className="text-primary hover:underline font-medium">
                            Sign in
                        </Link>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
