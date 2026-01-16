import { Edit, MoreHorizontal, Search } from "lucide-react";
import { ConversationItem } from "./ConversationItem";


interface MessagingSidebarProps {
    conversations: any[];
    activeConversationId?: string;
    currentUserId: string;
}

export function MessagingSidebar({conversations, activeConversationId, currentUserId}: MessagingSidebarProps) {
    return (
        <div>
            
            {/* Header */}
            <div>
                <h1>Messaging</h1>
                <div>
                    <MoreHorizontal className="h-5 w-5 cursor-pointer hover:text-black"/>
                    <Edit className="h-5 w-5 cursor-pointer hover:text-black"/>
                </div>
            </div>

            {/* search */}
            <div>
                <div>
                    <Search className="" />
                    <input type="text" placeholder="Search messages" />
                </div>
            </div>

            {/* List */}
            <div>
                {conversations.length === 0 ? (
                    <p>No conversations yet</p>
                ): 
                (
                    conversations.map((conv) => (
                        <ConversationItem
                            key={conv.id}
                            conversation={conv}
                            currentUserId={currentUserId}
                            isActive={activeConversationId === conv.id}
                        />
                    ))
                )
                }
            </div>
        </div>
    )
}