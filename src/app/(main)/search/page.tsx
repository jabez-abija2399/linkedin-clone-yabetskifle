import { PostCard } from "@/components/post/PostCard";
import { FollowButton } from "@/components/profile/FollowButton";
import Button from "@/components/ui/Button";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";



interface SearchPageProps {
    searchParams: Promise<{ q: string; filter?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const session = await auth()
    if (!session?.user) {
        return redirect("/login")
    }


    const { q, filter: rawFilter } = await searchParams;
    const filter = rawFilter || "all";
    const query = q || "";
    if (!query) return <p className="p-8 text-center text-muted-foreground">Search for something</p>

    // search for users
    const users = await prisma.user.findMany({
        where: {
            OR: [
                { name: { contains: query, mode: "insensitive" } },
                { headline: { contains: query, mode: "insensitive" } },
            ]
        },
        include: {
            followers: {
                where: { followerId: session.user.id } // check if WE follow THEM
            }
        },
        take: 5,
    });

    // search for posts
    const posts = await prisma.post.findMany({
        where: {
            OR: [
                { content: { contains: query, mode: "insensitive" } },
            ]
        },
        include: {
            author: true,
            likes: true,
            comments: true,
        }
    });

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 border-b border-border">
                {['all', 'people', 'posts'].map((f) => (
                    <Link
                        key={f}
                        href={`/search?q=${query}&filter=${f}`}
                        className={`
                px-4 py-2 rounded-full text-sm font-semibold transition-colors
                ${filter === f
                                ? "bg-green-700 text-white"
                                : "bg-surface border border-border hover:bg-muted text-muted-foreground"}
            `}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </Link>
                ))}
            </div>
            <h1 className="text-2xl font-bold">Search results for "{query}"</h1>

            {/* PEOPLE SECTION */}
            {(filter === "all" || filter === "people") && (


                <section className="bg-surface rounded-lg border border-border p-4">
                    <h2 className="text-lg font-semibold mb-4 border-b pb-2">People</h2>
                    {users.length === 0 ? (
                        <p className="text-muted text-sm">No people found.</p>
                    ) : (
                        users.map((user) => (
                            <div key={user.id} className="flex items-center gap-4 py-3 border-b last:border-0">
                                {/* Avatar */}
                                <div className="relative h-12 w-12 flex-shrink-0">
                                    <Image
                                        src={user.image || "/images/placeholder.jpg"}
                                        alt={user.name || "User"}
                                        fill
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <Link href={`/profile/${user.id}`} className="font-semibold hover:underline truncate block">
                                        {user.name}
                                    </Link>
                                    <p className="text-xs text-muted truncate">{user.headline || "LinkedIn User"}</p>
                                </div>
                                {/* Action */}
                                  <div className="flex items-center gap-2"> {/* Change Link to div wrapper */}
                                {/* The new Follow Button */}
                                {session?.user?.id !== user.id && (
                                    <FollowButton
                                        userId={user.id}
                                        initialIsFollowing={user.followers.length > 0} 
                                        targetUserName={user.name}
                                    />
                                )}
                                
                                {/* Existing View Profile Button */}
                                <Link href={`/profile/${user.id}`}>
                                    <Button variant="outline" size="sm">View Profile</Button>
                                </Link>
                            </div>
                            </div>
                        ))
                    )}
                </section>
            )}


            {/* POSTS SECTION */}
            {(filter === "all" || filter === "posts") && (
                <section>
                    <h2 className="text-lg font-semibold mb-4">Posts</h2>
                    {posts.length === 0 ? (
                        <p className="text-muted text-sm">No posts found.</p>
                    ) : (
                        <div className="space-y-4">
                            {posts.map((post) => (
                                // Reuse your PostCard!
                                <PostCard
                                    key={post.id}
                                    postId={post.id}
                                    authorId={post.author.id}
                                    authorName={post.author.name || "Anonymous"}
                                    authorHeadline={post.author.headline || ""}
                                    content={post.content || ""}
                                    image={post.image}
                                    initialLike={post.likes.some(like => like.userId === session.user?.id)}
                                    comments={post.comments} // Note: You might need to map comments to match PostCard props exactly if strict typing is on
                                    createdAt={formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                                />
                            ))}
                        </div>
                    )}
                </section>
            )}

        </div>

    )
}
