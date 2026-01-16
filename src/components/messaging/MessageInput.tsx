"use client";

import { sendMessage } from "@/server/actions/message.actions";
import { useRouter } from "next/router";
import { useState } from "react";


export function MessageInput({conversationId}: {conversationId: string}) {
    const [messageText, setMessageText] = useState("");
    const [sending, setSending] = useState(false);
    const router = useRouter()

    async function handleSend() {
        if (!messageText.trim() || sending) return;
        setSending(true);
        
        await sendMessage(conversationId, messageText);
        setMessageText("");
        setSending(false);
        router.refresh();
    }

    return (
        <div>
            <form onSubmit={(e) => {e.preventDefault(); handleSend()}}>
                <textarea
                 name="" 
                 id=""
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
            <div>
                <div>
                    <button>📷</button>
                    <button>📎</button>
                   
                </div>
                <button
                onClick={handleSend}
                 disabled={!messageText.trim() || sending}
                >Send</button>
            </div>
        </div>
    )
}