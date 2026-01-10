// src/app/page.tsx
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"; // Import our new components

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-8 p-10 bg-background min-h-screen">
      
      {/* Test Buttons */}
      <Card className="w-full max-w-md">
        <CardHeader>
           <CardTitle>Buttons</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
           <Button>Primary</Button>
           <Button variant="outline">Outline</Button>
        </CardContent>
      </Card>

      {/* Test Inputs */}
      <Card className="w-full max-w-md">
         <CardHeader>
            <CardTitle>Login</CardTitle>
         </CardHeader>
         <CardContent className="space-y-4">
            <Input label="Email" placeholder="user@example.com" />
            <Input label="Password" type="password" />
            <Button className="w-full">Sign In</Button>
         </CardContent>
      </Card>

    </div>
  );
}