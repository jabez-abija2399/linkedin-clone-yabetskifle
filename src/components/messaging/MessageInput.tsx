"use client";

import { useState } from "react";
import { sendMessage } from "@/server/actions/message.actions";
import { useRouter } from "next/navigation";
import { Image as ImageIcon, Paperclip, Smile } from "lucide-react";

export function MessageInput({ conversationId }: { conversationId: string }) {
    const [messageText, setMessageText] = useState("");
    const [sending, setSending] = useState(false);
    const router = useRouter();

    async function handleSend() {
        if (!messageText.trim() || sending) return;
        setSending(true);

        await sendMessage(conversationId, messageText);

        setMessageText("");
        setSending(false);
        router.refresh();
    }

    return (
        <div className="p-4 border-t border-gray-200 bg-white">
            <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2 items-end"
            >
                <textarea
                    className="flex-1 bg-[#F8FAFD] border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#0073B1] resize-none min-h-[80px]"
                    placeholder="Write a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                />
            </form>
            <div className="flex justify-between items-center mt-3 px-1">
                <div className="flex gap-4 text-gray-600 items-center">
                    <button type="button" className="hover:bg-gray-100 p-2 rounded-full transition-colors">
                        <ImageIcon className="w-5 h-5" />
                    </button>
                    <button type="button" className="hover:bg-gray-100 p-2 rounded-full transition-colors">
                        <Paperclip className="w-5 h-5" />
                    </button>
                    <button type="button" className="hover:bg-gray-100 p-2 rounded-full transition-colors font-bold text-sm border border-gray-600 h-6 w-6 flex items-center justify-center">
                        GIF
                    </button>
                    <button type="button" className="hover:bg-gray-100 p-2 rounded-full transition-colors">
                        <Smile className="w-5 h-5" />
                    </button>
                </div>
                {messageText.trim() && (
                    <button
                        onClick={handleSend}
                        disabled={sending}
                        className="bg-[#0073B1] text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-[#006097] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Send
                    </button>
                )}
            </div>
        </div>
    );
}