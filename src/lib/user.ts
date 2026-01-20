import { prisma } from "./prisma";

// Get user profile data
export async function getUserProfile(userId: string) {
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
