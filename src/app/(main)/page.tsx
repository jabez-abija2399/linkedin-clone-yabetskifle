// src/app/page.tsx
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"; // Import our new components
import { Sidebar } from "@/components/layout/Sidebar";
import { PostForm } from "@/components/post/PostForm";
import { PostCard } from "@/components/post/PostCard";
import { getPosts } from "@/server/actions/post.actions";
import { formatDistanceToNow } from "date-fns";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserProfile } from "@/lib/user";

interface Post {
   id: string;
   author: {
      id: string;
      name: string | null;
      headline: string | null;
   };
   content: string | null;
   image: string | null;
   createdAt: Date;
   likes: {
      userId: string;
   }[];
   comments: {
      id: string;
      content: string;
      createdAt: Date;
      author: {
         name: string | null;
         headline: string | null;
      };
   }[];
}


export default async function Home() {
   const posts = await getPosts();
   const session = await auth();
   const user = session?.user;
   // const myUserId = "cmka10j6l0000ux9l430r1vte";

   // src/app/(main)/page.tsx
   if (!session?.user?.id) {
      return redirect("/login");
   }
   const myUserId = session.user.id;

   const userDetails = await getUserProfile(myUserId);


   return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-14 max-w-[1160px] mx-auto px-4 py-6">
         {/* left column (3/12 width) */}
         <div className="md:col-span-3">
            <Sidebar user={userDetails} />
         </div>

         {/* Middle colume (6/12 width) */}
         <div className="md:col-span-8 space-y-4">
            {user ? <PostForm user={userDetails} /> :
               <Card>
                  <CardHeader>
                     <CardTitle>
                        Please sign in to post
                     </CardTitle>
                  </CardHeader>
               </Card>

            }

            {/*  map through Posts */}
            {posts.length === 0 ? (
               <Card className="p-12 text-center">
                  <div className="space-y-3">
                     <div className="text-4xl">📝</div>
                     <h3 className="text-lg font-semibold">No posts yet</h3>
                     <p className="text-muted text-sm">
                        Be the first to share something!
                     </p>
                  </div>
               </Card>
            ) : (
               posts.map((post: Post) => (
                  <PostCard
                     postId={post.id}
                     key={post.id}
                     authorId={post.author.id}
                     authorName={post.author.name || "Anonymous"}
                     authorHeadline={post.author.headline || ""}
                     content={post.content || ""}
                     initialLike={post.likes.some(like => like.userId === myUserId)}
                     comments={post.comments}
                     image={post?.image}
                     // For now, let's just turn the date into a string. 
                     // Later we can use 'date-fns' to make it say "2h ago"
                     createdAt={formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                  />
               )))}
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