"use client";

import { useEffect, useRef, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { getConversationById } from "@/server/actions/message.actions"; // Import the fetcher

interface ChatWindowProps {
    conversation: any; // Initial data from server
    currentUserId: string;
}

export function ChatWindow({ conversation: initialConversation, currentUserId }: ChatWindowProps) {
    // 1. Convert Prop to State allows us to update it
    const [conversation, setConversation] = useState(initialConversation);
    const scrollRef = useRef<HTMLDivElement>(null);

    // 2. Sync state if the user clicks a different conversation
    useEffect(() => {
        setConversation(initialConversation);
    }, [initialConversation]);

    // 3. The Polling Logic (The "Heartbeat")
    useEffect(() => {
        if (!conversation?.id) return;

        const intervalId = setInterval(async () => {
            // Ask server for latest data
            const res = await getConversationById(conversation.id);
            if ('conversation' in res && res.conversation) {
                // Determine if we actually have new messages to avoid unnecessary re-renders
                // (Simple check: compare message counts or last message ID)
                setConversation((prev: any) => {
                    if (res.conversation.messages.length !== prev.messages.length) {
                        return res.conversation; // Update if different
                    }
                    return prev; // Keep old if same
                });
            }
        }, 3000); // Check every 3 seconds

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [conversation?.id]);


    // Auto-scroll logic
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [conversation?.messages]); // Re-run when messages update

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

    // Helper to separate messages by date
    const renderMessages = () => {
        let lastDate = "";
        return conversation.messages.map((msg: any, index: number) => {
            const messageDate = new Date(msg.createdAt).toDateString();
            const showDate = messageDate !== lastDate;
            lastDate = messageDate;

            return (
                <div key={msg.id}>
                    {showDate && (
                        <div className="flex items-center my-4">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <span className="px-3 text-xs font-semibold text-gray-500 uppercase">
                                {new Date(msg.createdAt).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                            </span>
                            <div className="flex-1 h-px bg-gray-300"></div>
                        </div>
                    )}
                    <MessageBubble
                        message={msg}
                        isMe={msg.senderId === currentUserId}
                    />
                </div>
            );
        });
    };

    return (
        <div className="flex-1 flex flex-col bg-white h-full">
            {/* Header */}
            <div className="p-3 border-b border-gray-200 flex items-center justify-between shadow-sm z-10">
                <a href={`/profile/${otherUser?.id}`} className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded -ml-2 transition-colors">
                    <div className="relative">
                        {/* Online Dot (Fake) */}
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-600 rounded-full border-2 border-white z-10"></div>
                        <div className="relative h-10 w-10">
                            <Image
                                src={otherUser?.image || "/images/placeholder.jpg"}
                                alt={otherUser?.name || "User"}
                                fill
                                className="rounded-full object-cover"
                            />
                        </div>
                    </div>
                    <div>
                        <span className="font-bold text-sm block leading-tight">{otherUser?.name || "Unknown"}</span>
                        <span className="text-xs text-gray-500 truncate max-w-xs block leading-tight mt-0.5">
                            {otherUser?.headline || "LinkedIn Member"}
                        </span>
                    </div>
                </a>
                <MoreHorizontal className="h-5 w-5 text-gray-600 cursor-pointer hover:bg-gray-100 rounded-full p-1 box-content" />
            </div>

            {/* Live Message List */}
            <div className="flex-1 overflow-y-auto p-4 bg-[#F4F2EE]" ref={scrollRef}>
                {renderMessages()}
            </div>

            {/* Input */}
            <MessageInput conversationId={conversation.id} />
        </div>
    );
}