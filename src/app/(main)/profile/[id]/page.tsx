import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/Card";
import { PostCard } from "@/components/post/PostCard";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { MapPin, Briefcase, Calendar, GraduationCap } from "lucide-react";
import { EditProfileModal } from "../EditProfileModel";
import { isFollowing } from "@/server/actions/connection.actions";
import { FollowButton } from "@/components/profile/FollowButton";
import { ProfileEditor } from "@/components/profile/ProfileEditor";
import { format } from "date-fns";
import { AddExperienceButton } from "@/components/profile/AddExperienceButton";
import { EducationForm } from "@/components/profile/EducationForm";

// Get user profile data
async function getUserProfile(userId: string) {
    const user = (await prisma.user.findUnique({
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
            experience: {
                orderBy: { startDate: 'desc' },
            },
            education: {
                orderBy: { startDate: 'desc' },
            },
        } as any,
    })) as any;

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
                    <div className="absolute -top-16 left-6">
                        <div className="h-32 w-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden relative shadow-sm">
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
                        <p className="text-muted text-lg leading-tight">{user.headline || "LinkedIn User"}</p>

                        {user.location && (
                            <div className="flex items-center gap-1 text-sm text-muted mt-2">
                                <MapPin className="h-4 w-4" />
                                <span>{user.location}</span>
                            </div>
                        )}

                        {user.about && (
                            <p className="mt-4 text-sm leading-relaxed text-gray-700">{user.about}</p>
                        )}
                        <div className="mt-6 px-6 border-t border-border pt-6">
                            {/* HEADER ROW with Title + Button */}
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold">Experience</h2>
                                {isOwnProfile && <AddExperienceButton isExperienceOpen />}
                            </div>

                            {user.experience.length === 0 ? (
                                <p className="text-muted text-sm">No experience listed.</p>
                            ) : (
                                <div className="space-y-6">
                                    {user.experience.map((job: any) => (
                                        <div key={job.id} className="flex gap-4">
                                            {/* Company Logo Placeholder */}
                                            <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                                                <Briefcase className="h-6 w-6 text-gray-500" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">{job.title}</h3>
                                                <p className="text-sm">{job.company}</p>
                                                <p className="text-xs text-muted flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {format(new Date(job.startDate), "MMM yyyy")} -
                                                    {job.endDate ? format(new Date(job.endDate), "MMM yyyy") : "Present"}
                                                </p>
                                                {job.description && <p className="text-sm mt-2">{job.description}</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* EDUCATION SECTION */}
                        <div className="mt-6 px-6 border-t border-border pt-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold">Education</h2>
                                {isOwnProfile && <AddExperienceButton isEducationOpen />}
                            </div>

                            {user.education.length === 0 ? (
                                <p className="text-muted text-sm">No education listed.</p>
                            ) : (
                                <div className="space-y-6">
                                    {user.education.map((edu: any) => (
                                        <div key={edu.id} className="flex gap-4">
                                            <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                                                {/* Import GraduationCap from lucide-react */}
                                                <GraduationCap className="h-6 w-6 text-gray-500" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">{edu.school}</h3>
                                                <p className="text-sm">{edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}</p>
                                                <p className="text-xs text-muted">
                                                    {format(new Date(edu.startDate), "yyyy")} -
                                                    {edu.endDate ? format(new Date(edu.endDate), "yyyy") : "Present"}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Stats */}
                        <div className="flex gap-6 mt-4 text-sm">
                            <div>
                                <span className="font-semibold">{user._count.posts}</span>
                                <span className="text-muted ml-1">posts</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold text-primary">
                                    {user._count.followers}
                                </span>
                                <span className="text-muted ml-1">connections</span>
                            </div>
                        </div>

                        {/* Edit Profile Button (Absolute Positioned) */}
                        {isOwnProfile && (
                            <div className="absolute top-4 right-4">
                                <ProfileEditor user={user} />
                            </div>
                        )}

                        {/* Follow Button (In Flow) */}
                        {!isOwnProfile && (
                            <div className="mt-4 flex gap-2">
                                <FollowButton
                                    targetUserId={user.id}
                                    targetUserName={user.name || "this user"}
                                    initialIsFollowing={followingStatus}
                                />
                            </div>
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
                            {user.posts.map((post: any) => (
                                <PostCard
                                    key={post.id}
                                    postId={post.id}
                                    authorId={post.author.id}
                                    authorName={post.author.name || "Anonymous"}
                                    authorHeadline={post.author.headline || ""}
                                    content={post.content || ""}
                                    image={post.image}
                                    initialLike={post.likes.some((like: any) => like.userId === session?.user?.id)}
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