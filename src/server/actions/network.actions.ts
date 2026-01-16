"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getWhoToFollow() {
    const session = await auth();
    if (!session?.user) return [];

    try {
        // Find users who are NOT me and NOT in my following list
        const users = await prisma.user.findMany({
            where: {
                AND: [
                    { id: { not: session.user.id } },
                    { followers: { none: { followerId: session.user.id } } }
                ]
            },
            take: 12, // Grid of 12 people
            select: {
                id: true,
                name: true,
                headline: true,
                image: true,
                _count: {
                    select: { followers: true } // "400 followers"
                }
            }
        });

        return users;
    } catch (error) {
        return [];
    }
}