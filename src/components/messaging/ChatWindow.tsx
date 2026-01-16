"use client";

import { useEffect, useRef } from "react";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";

interface ChatWindowProps {
    conversation: any;
    currentUserId: string | undefined;
}

export function ChatWindow({ conversation, currentUserId }: ChatWindowProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [conversation?.messages]);

    if (!conversation) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500 bg-white">
                <div className="relative h-40 w-40 mb-4 opacity-50">
                    <Image src="/images/no-msg.svg" alt="" fill className="object-contain" /> 
                </div>
                <h2 className="text-xl font-light">Select a conversation</h2>
            </div>
        );
    }

    const otherUser = conversation.users.find((u: any) => u.id !== currentUserId);

    return (
        <div className="flex-1 flex flex-col bg-white h-full">
            {/* Active Header */}
            <div className="p-3 border-b border-gray-200 flex items-center justify-between shadow-sm z-10">
                <div className="flex items-center gap-3">
                    <span className="font-bold text-sm">{otherUser?.name || "Unknown"}</span>
                    <span className="text-xs text-gray-500 truncate max-w-xs border-l pl-2">
                        {otherUser?.headline}
                    </span>
                </div>
                <MoreHorizontal className="h-5 w-5 text-gray-600 cursor-pointer" />
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-white" ref={scrollRef}>
                {conversation.messages.map((msg: any) => (
                    <MessageBubble 
                        key={msg.id} 
                        message={msg} 
                        isMe={msg.senderId === currentUserId} 
                    />
                ))}
            </div>

            {/* Input */}
            <MessageInput conversationId={conversation.id} />
        </div>
    );
}