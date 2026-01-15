"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function getNotifications() {
    const session = await auth();
    if (!session?.user?.id) return [];

    const notifications = await (prisma.notification as any).findMany({
        where: { userId: session.user.id },
        include: {
            creator: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                    headline: true // Useful for showing "John Doe (Software Engineer)"
                },
            },
            post: true, // Include post data if you want to show a preview
        },
        orderBy: { createdAt: "desc" },
    });

    return notifications;
}

export async function markAsRead(notificationId: string) {
    const session = await auth();
    if (!session?.user?.id) return;

    await prisma.notification.update({
        where: { id: notificationId, userId: session.user.id },
        data: { read: true }
    });
}

export async function getUnreadNotificationCount() {
    const session = await auth()
    if (!session?.user?.id) return 0;

    const count = await prisma.notification.count({
        where: {
            userId: session.user.id,
            read: false
        }
    });

    return count;
}