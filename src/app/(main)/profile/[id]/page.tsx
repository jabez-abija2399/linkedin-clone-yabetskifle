import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/Card";
import { PostCard } from "@/components/post/PostCard";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { MapPin, Briefcase, Calendar } from "lucide-react";
import { EditProfileModal } from "../EditProfileModel";
import { isFollowing } from "@/server/actions/connection.actions";
import { FollowButton } from "@/components/profile/FollowButton";

// Get user profile data
async function getUserProfile(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            posts: {
                orderBy: { createdAt: "desc" },
                include: {
                    author: true,
                    likes: true,
                    comments: {
                        include: { author: true },
                        orderBy: { createdAt: "desc" },
                    },
                },
            },
            _count: {
                select: {
                    posts: true,
                    followers: true,
                    following: true,
                },
            },
        },
    });

    return user;
}

export default async function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth();

    if (!session?.user?.id) {
        return redirect("/login");
    }

    const { id } = await params; // 👈 Await params first!
    const user = await getUserProfile(id);

    if (!user) {
        return notFound();
    }

    const isOwnProfile = session.user.id === id;

    // 3. Fetch the follow status if it's someone else's profile
    // This tells the FollowButton whether to show "Follow" or "Unfollow"
    const followingStatus = isOwnProfile ? false : await isFollowing(id);


    return (
        <div className="max-w-4xl mx-auto space-y-4">
            {/* Profile Header Card */}
            <Card className="overflow-hidden">
                {/* Banner */}
                <div className="h-32 bg-gradient-to-r from-primary to-blue-400" />

                <CardContent className="relative pt-0 pb-6">
                    {/* Avatar */}
                    <div className="absolute -top-40 left-6">
                        <div className="h-32 w-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden relative">
                            {user.image ? (
                                <Image src={user.image} alt={user.name || "User"} fill className="object-cover" />
                            ) : (
                                <div className="h-full w-full bg-gray-300 flex items-center justify-center text-4xl font-bold text-gray-600">
                                    {user.name?.[0]?.toUpperCase() || "U"}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="mt-20 px-6">
                        <h1 className="text-2xl font-bold">{user.name}</h1>
                        <p className="text-muted text-lg">{user.headline || "LinkedIn User"}</p>

                        {user.location && (
                            <div className="flex items-center gap-1 text-sm text-muted mt-2">
                                <MapPin className="h-4 w-4" />
                                <span>{user.location}</span>
                            </div>
                        )}

                        {user.about && (
                            <p className="mt-4 text-sm leading-relaxed">{user.about}</p>
                        )}

                        {/* Stats */}
                        <div className="flex gap-6 mt-4 text-sm">
                            <div>
                                <span className="font-semibold">{user._count.posts}</span>
                                <span className="text-muted ml-1">posts</span>
                            </div>
                            {/* We'll add connections count later */}
                        </div>

                        {/* Edit Profile Button - Only show on own profile */}
                        {isOwnProfile ? (
                            <div className="mt-4">
                                <EditProfileModal
                                    currentHeadline={user.headline}
                                    currentAbout={user.about}
                                    currentLocation={user.location}
                                />
                            </div>
                        ): (
                            <FollowButton
                                targetUserId={user.id}
                                initialIsFollowing={followingStatus}
                            />
                        )}

                    </div>
                </CardContent>
            </Card>

            {/* Posts Section */}
            <Card>
                <CardContent className="p-4">
                    <h2 className="font-semibold text-lg mb-4">
                        {isOwnProfile ? "Your Posts" : `${user.name}'s Posts`}
                    </h2>

                    {user.posts.length === 0 ? (
                        <p className="text-center text-muted py-8">No posts yet</p>
                    ) : (
                        <div className="space-y-4">
                            {user.posts.map((post) => (
                                <PostCard
                                    key={post.id}
                                    postId={post.id}
                                    authorId={post.author.id}
                                    authorName={post.author.name || "Anonymous"}
                                    authorHeadline={post.author.headline || ""}
                                    content={post.content || ""}
                                    image={post.image}
                                    initialLike={post.likes.some(like => like.userId === session?.user?.id)}
                                    //   initialLike={post.likes.some(like => like.userId === session.user.id)}
                                    comments={post.comments}
                                    createdAt={formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                                />
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}