"use client";

import Button from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import Link from "next/link";
import { signIn } from "next-auth/react"; // Client-side sign in

export default function LoginPage() {
  return (
    <Card className="w-full max-w-sm shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
        <CardDescription className="text-center">
            Welcome back to your professional community
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        
        {/* Social Login Button */}
        <Button 
            className="w-full bg-black text-white hover:bg-gray-800"
            onClick={() => signIn("github", { callbackUrl: "/" })}
        >
           Sign in with GitHub 
        </Button>
        
        <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-surface px-2 text-muted-foreground">Or</span>
            </div>
        </div>
        
        {/* Placeholder for Email Login (We'll implement functionality later) */}
        {/* We aren't building the full form yet, just the UI */}
        <div className="text-center text-sm">
            <p className="text-muted">Don't have an account? <Link href="/register" className="text-primary hover:underline font-medium">Join now</Link></p>
        </div>

      </CardContent>
    </Card>
  );
}