// src/app/page.tsx
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"; // Import our new components
import { Sidebar } from "@/components/layout/Sidebar";
import { PostForm } from "@/components/post/PostForm";
import { PostCard } from "@/components/post/PostCard";
import { getPosts } from "@/server/actions/post.actions";
import { formatDistanceToNow } from "date-fns";


// Mock data array
const MOCK_Posts = [
   {
      id: 1,
      authorName: "John Doe",
      authorHeadline: "Software Engineer",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec metus vel ante feugiat finibus. Nullam nec metus vel ante feugiat finibus.",
      createdAt: "2022-01-01",
   },
    {
    id: "2",
    authorName: "Antigravity AI",
    authorHeadline: "Building the future of coding agents",
    content: "I'm having a great time helping build this LinkedIn clone! Using Next.js and Tailwind CSS makes UI development so fast. 🚀 #webdev #coding",
    createdAt: "2h"
  },
  {
    id: "3",
    authorName: "Satya Nadella",
    authorHeadline: "CEO at Microsoft",
    content: "The potential of AI to transform every industry is immense. We are just getting started. #AI #Innovation",
    createdAt: "5h"
  },
  {
      id: 4,
      authorName: "John Doe",
      authorHeadline: "Software Engineer",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec metus vel ante feugiat finibus. Nullam nec metus vel ante feugiat finibus.",
      createdAt: "2022-01-01",
   },
    {
    id: "5",
    authorName: "Antigravity AI",
    authorHeadline: "Building the future of coding agents",
    content: "I'm having a great time helping build this LinkedIn clone! Using Next.js and Tailwind CSS makes UI development so fast. 🚀 #webdev #coding",
    createdAt: "2h"
  },
  {
    id: "6",
    authorName: "Satya Nadella",
    authorHeadline: "CEO at Microsoft",
    content: "The potential of AI to transform every industry is immense. We are just getting started. #AI #Innovation",
    createdAt: "5h"
  },
  {
      id: "7",
      authorName: "John Doe",
      authorHeadline: "Software Engineer",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec metus vel ante feugiat finibus. Nullam nec metus vel ante feugiat finibus.",
      createdAt: "2022-01-01",
   },
    {
    id: "8",
    authorName: "Antigravity AI",
    authorHeadline: "Building the future of coding agents",
    content: "I'm having a great time helping build this LinkedIn clone! Using Next.js and Tailwind CSS makes UI development so fast. 🚀 #webdev #coding",
    createdAt: "2h"
  },
  {
    id: "9",
    authorName: "Satya Nadella",
    authorHeadline: "CEO at Microsoft",
    content: "The potential of AI to transform every industry is immense. We are just getting started. #AI #Innovation",
    createdAt: "5h"
  }
]

interface Post {
   id: string;
   author: {
      name: string;
      headline: string;
   };
   content: string;
   createdAt: Date;
}

export default async function Home() {
   const posts = await getPosts();
   console.log(posts);
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
      {/* left column (3/12 width) */}
      <div className="md:col-span-3">
         <Sidebar />
      </div>

      {/* Middle colume (6/12 width) */}
      <div className="md:col-span-6 space-y-4">
         <PostForm />

         {/*  map through MOCK_Posts */}
        {posts.map((post: Post) => (
    <PostCard  
        key={post.id}
        authorName={post.author.name || "Anonymous"} 
        authorHeadline={post.author.headline || ""} 
        content={post.content}
        // For now, let's just turn the date into a string. 
        // Later we can use 'date-fns' to make it say "2h ago"
        createdAt={formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })} 
    />
))}
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