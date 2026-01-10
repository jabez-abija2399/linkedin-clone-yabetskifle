// src/app/page.tsx
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"; // Import our new components
import { Sidebar } from "@/components/layout/Sidebar";
import { PostForm } from "@/components/post/PostForm";

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
      {/* left column (3/12 width) */}
      <div className="md:col-span-3">
         <Sidebar />
      </div>

      {/* Middle colume (6/12 width) */}
      <div className="md:col-span-6">
         <PostForm />

         {/* place holder for acution posts - we will build this later */}
         <div className="text-center p-10 text-muted">No Posts Yet</div>
      </div>

      {/* right column (3/12 width) */}
      <div className="hidden md:block md:col-span-3">
         <div className="rounded-lg bg-surface p-4 border border-border">
            <h3 className="font-semibold text-sm">Trending News</h3>
            <p className="text-xs mt-2 text-muted">No News today</p>
         </div>
      </div>
    </div>
  );
}