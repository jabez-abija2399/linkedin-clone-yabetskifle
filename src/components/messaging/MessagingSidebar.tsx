import { MoreHorizontal, Edit, Search } from "lucide-react";
import { ConversationItem } from "./ConversationItem";

interface MessagingSidebarProps {
    conversations: any[];
    activeConversationId?: string;
    currentUserId: string | undefined;
}

export function MessagingSidebar({ conversations, activeConversationId, currentUserId }: MessagingSidebarProps) {
    return (
        <div className="w-[350px] border-r border-gray-200 flex flex-col h-full bg-white">
            {/* Header */}
            <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h1 className="font-semibold text-sm">Messaging</h1>
                <div className="flex gap-4 text-gray-600">
                    <MoreHorizontal className="h-5 w-5 cursor-pointer hover:text-black" />
                    <Edit className="h-5 w-5 cursor-pointer hover:text-black" />
                </div>
            </div>

            {/* Search */}
            <div className="p-3">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                    <input 
                        type="text" 
                        placeholder="Search messages" 
                        className="w-full bg-[#EEF3F8] pl-10 pr-4 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-black"
                    />
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
                {conversations.length === 0 ? (
                    <p className="p-4 text-center text-gray-500 text-sm">No conversations yet.</p>
                ) : (
                    conversations.map((conv) => (
                        <ConversationItem 
                            key={conv.id}
                            conversation={conv}
                            currentUserId={currentUserId}
                            isActive={activeConversationId === conv.id}
                        />
                    ))
                )}
            </div>
        </div>
    );
}