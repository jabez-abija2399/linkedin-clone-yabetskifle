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
    const existingConnection = await prisma.Connection.findUnique({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId: targetUserId,
        },
      },
    });

    if (existingConnection) {
      // Unfollow
      await prisma.Connection.delete({
        where: {
          id: existingConnection.id,
        },
      });
      
      revalidatePath(`/profile/${targetUserId}`);
      return { success: true, action: "unfollowed" };
    } else {
      // Follow
      await prisma.Connection.create({
        data: {
          followerId: session.user.id,
          followingId: targetUserId,
        },
      });
      
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
      prisma.Connection.count({
        where: { followingId: userId },
      }),
      prisma.Connection.count({
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
    const connection = await prisma.Connection.findUnique({
      where: {
        followerId_followingId: {
          followerId: session.user.id,
          followingId: targetUserId,
        },
      },
    });

    return !!connection;
  } catch (error) {
    console.error("Error checking follow status:", error);
    return false;
  }
}