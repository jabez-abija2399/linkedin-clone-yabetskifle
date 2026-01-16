"use client"

import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation"; 


interface ConversationItemProps {
    conversation: any;
    currentUserId: string | undefined;
    isActive: boolean;
}

export const ConversationItem = ({conversation, currentUserId, isActive}: ConversationItemProps) => {
    const router = useRouter()

    // find the otheruser
    const otheruser = conversation.users.find((u:any) => u.id !== currentUserId);
    const lastMessage = conversation.messages && conversation.message[0];
    return (
       <div>
        <div>
            <Image 
               src={otheruser?.image }
               alt={otheruser?.name}
               fill
               className="rounded-full object-cover"
            />
        </div>
        <div>
            <div>
                <span>{otheruser?.name}</span>
                <span>{lastMessage?.createdAt && format(new Date(lastMessage.createdAt), "MMM d")}</span>

            </div>
            <p>
                {lastMessage?.senderId === currentUserId && "You: "}
                {lastMessage?.content || "start a conversation"}
            </p>
        </div>
       </div>
    )
}