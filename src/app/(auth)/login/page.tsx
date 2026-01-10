"use client"

import Button from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import Link from "next/link"


export default function LoginPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                    Welcome back to your professional community
                </CardDescription>
            </CardHeader>
            <CardContent>
                {/* Social Sign In */}
                <Button>

                    Sign In with GitHub
                </Button>

                <div>
                    <div>
                        <span />
                    </div>
                    <div>
                        <span>or</span>
                    </div>
                </div>

                {/* placeholeder for email login (we'll implement this later) */}
                {/* we aren't building the full form yet, just the UI */}
                <div>
                    <p>Don't have an account? <Link href="/register">Join Now</Link></p>
                </div>

            </CardContent>
        </Card>
    )
}
