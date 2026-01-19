import { auth } from "@/lib/auth";
import { getConversationById, getUserConversations } from "@/server/actions/message.actions";
import { MessagingSidebar } from "@/components/messaging/MessagingSidebar";
import { ChatWindow } from "@/components/messaging/ChatWindow";
import { redirect } from "next/navigation";

export default async function MessagingPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
    const session = await auth();
    if (!session?.user) return redirect("/login");

    const { id } = await searchParams;

    // Fetch Sidebar Data
    const conversations = await getUserConversations();

    // Fetch Active Chat Data
    let activeConversation = null;
    if (id) {
        const res = await getConversationById(id);
        if ('conversation' in res) {
            activeConversation = res.conversation;
        }
    }

    return (
        <div className="max-w-6xl mx-auto pt-4 h-[calc(100vh-100px)]">
            <div className="bg-white rounded-t-lg shadow-sm border border-gray-200 h-full flex overflow-hidden">

                {/* 1. Left Sidebar */}
                <MessagingSidebar
                    conversations={conversations}
                    activeConversationId={activeConversation?.id}
                    currentUserId={session.user.id!}
                />

                {/* 2. Right Chat Window */}
                <ChatWindow
                    conversation={activeConversation}
                    currentUserId={session.user.id!}
                />
            </div>
        </div>
    );
}