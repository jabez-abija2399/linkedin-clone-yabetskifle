"use client";

import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ConversationItemProps {
    conversation: any;
    currentUserId: string | undefined;
    isActive: boolean;
}

export const ConversationItem = ({ conversation, currentUserId, isActive }: ConversationItemProps) => {
    const router = useRouter();

    // Find the other user
    const otherUser = conversation.users.find((u: any) => u.id !== currentUserId);
    const lastMessage = conversation.messages && conversation.messages[0];

    return (
        <div
            onClick={() => router.push(`/messaging?id=${conversation.id}`)}
            className={`flex items-start gap-3 p-4 cursor-pointer hover:bg-gray-100 border-l-[6px] border-transparent transition-colors ${isActive ? "!border-[#01754f] bg-[#EDF3F8]" : ""
                }`}
        >
            {/* Avatar */}
            <div className="relative h-12 w-12 flex-shrink-0">
                <Image
                    src={otherUser?.image || "/images/placeholder.jpg"}
                    alt={otherUser?.name || "User"}
                    fill
                    className="rounded-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                    <span className="font-semibold text-sm truncate text-gray-900">
                        {otherUser?.name}
                    </span>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                        {lastMessage?.createdAt && format(new Date(lastMessage.createdAt), "MMM d")}
                    </span>
                </div>
                <p className="text-xs text-gray-500 truncate line-clamp-1">
                    {lastMessage?.senderId === currentUserId && "You: "}
                    {lastMessage?.content || "Start a conversation"}
                </p>
            </div>
        </div>
    );
};