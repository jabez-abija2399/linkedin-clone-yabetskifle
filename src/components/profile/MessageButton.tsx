"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getOrCreateConversation } from "@/server/actions/message.actions";
import { MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";

export function MessageButton({ userId }: { userId: string }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    async function handleMessage() {
        setIsLoading(true);
        try {
            const res = await getOrCreateConversation(userId);
            if (res.conversation) {
                router.push(`/messaging?id=${res.conversation.id}`);
            }
        } catch (error) {
            console.error("Failed to start conversation:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Button
            onClick={handleMessage}
            disabled={isLoading}
            variant="outline"
            className="flex items-center gap-2"
        >
            <MessageCircle className="h-4 w-4" />
            {isLoading ? "Loading..." : "Message"}
        </Button>
    );
}
