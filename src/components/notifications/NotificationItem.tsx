"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageSquare, UserPlus } from "lucide-react";
import Image from "next/image";
import { markAsRead } from "@/server/actions/notification.actions";

interface NotificationItemProps {
    notification: any;
}

export default function NotificationItem({ notification }: NotificationItemProps) {
    const [isRead, setIsRead] = useState(notification.read);

    const handleRead = async () => {
        if (!isRead) {
            setIsRead(true);
            await markAsRead(notification.id);
        }
    };

    return (
        <div
            onClick={handleRead}
            className={`flex gap-4 p-4 border-b hover:bg-muted/50 transition-colors cursor-pointer ${!isRead ? "bg-blue-50/50" : ""
                }`}
        >
            <div className="relative h-10 w-10 flex-shrink-0">
                <Image
                    src={notification.creator.image || "/placeholder.png"}
                    alt={notification.creator.name || "User"}
                    fill
                    className="rounded-full object-cover"
                />

                {/* Icon badge */}
                <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-surface border border-border">
                    {notification.type === "LIKE" && <Heart className="h-3 w-3 text-red-500 fill-red-500" />}
                    {notification.type === "COMMENT" && <MessageSquare className="h-3 w-3 text-blue-500 fill-blue-500" />}
                    {notification.type === "FOLLOW" && <UserPlus className="h-3 w-3 text-green-500 fill-green-500" />}
                </div>
            </div>

            <div className="flex-1">
                <p className="text-sm">
                    <span className="font-semibold text-foreground">
                        {notification.creator.name}
                    </span>{" "}
                    {notification.type === "FOLLOW" && "started following you"}
                    {notification.type === "LIKE" && "liked your post"}
                    {notification.type === "COMMENT" && "commented on your post"}
                </p>

                {/* Optional: Show snippet of post content for context */}
                {(notification.type === "LIKE" || notification.type === "COMMENT") && notification.post && (
                    <div className="mt-2 text-xs text-muted p-2 bg-muted/50 rounded-md line-clamp-2">
                        {notification.post.content}
                    </div>
                )}

                <p className="text-xs text-muted mt-1">
                    {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                </p>
            </div>

            {/* Unread indicator dot */}
            {!isRead && (
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
            )}
        </div>
    );
}

