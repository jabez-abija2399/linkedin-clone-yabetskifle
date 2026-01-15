"use server"

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function toggleFollow(targetUserId: string) {
    const session = await auth();

    if (!session?.user?.id) {
        return { error: "Unauthorized" };
    }

    if (session.user.id === targetUserId) {
        return { error: "You cannot follow yourself" };
    }

    try {
        // Check if already following
        const existingFollow = await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: session.user.id,
                    followingId: targetUserId,
                },
            },
        });

        if (existingFollow) {
            // Unfollow
            await prisma.follow.delete({
                where: {
                    id: existingFollow.id,
                },
            });

            revalidatePath(`/profile/${targetUserId}`);
            return { success: true, action: "unfollowed" };
        } else {
            // Follow
            await prisma.follow.create({
                data: {
                    followerId: session.user.id,
                    followingId: targetUserId,
                },
            });

            if (targetUserId !== session.user.id) {
                await prisma.notification.create({
                    data: {
                        userId: targetUserId,      // Recipient
                        creatorId: session.user.id, // You
                        type: "FOLLOW",
                    }
                });
            }

            revalidatePath(`/profile/${targetUserId}`);
            return { success: true, action: "followed" };
        }
    } catch (error) {
        console.error("Error toggling follow:", error);
        return { error: "Failed to update connection" };
    }
}

// Get connection counts
export async function getConnectionCounts(userId: string) {
    try {
        const [followersCount, followingCount] = await Promise.all([
            prisma.follow.count({
                where: { followingId: userId },
            }),
            prisma.follow.count({
                where: { followerId: userId },
            }),
        ]);

        return { followersCount, followingCount };
    } catch (error) {
        console.error("Error getting connection counts:", error);
        return { followersCount: 0, followingCount: 0 };
    }
}

// Check if current user follows target user
export async function isFollowing(targetUserId: string) {
    const session = await auth();

    if (!session?.user?.id) {
        return false;
    }

    try {
        const follow = await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: session.user.id,
                    followingId: targetUserId,
                },
            },
        });

        return !!follow;
    } catch (error) {
        console.error("Error checking follow status:", error);
        return false;
    }
}

// Get suggested users to follow
export async function getSuggestions() {
    const session = await auth();

    if (!session?.user?.id) {
        return [];
    }

    try {
        const users = await prisma.user.findMany({
            where: {
                AND: [
                    { NOT: { id: session.user.id } }, // Not yourself
                    {
                        NOT: {
                            followers: {
                                some: { followerId: session.user.id }
                            }
                        }
                    } // Not someone you already follow
                ]
            },
            take: 5,
            select: {
                id: true,
                name: true,
                image: true,
                headline: true,
            }
        });

        return users;
    } catch (error) {
        console.error("Error fetching suggestions:", error);
        return [];
    }
}