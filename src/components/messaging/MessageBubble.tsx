import { format } from "date-fns";
import Image from "next/image";

interface MessageBubbleProps {
    message: any;
    isMe: boolean;
}

export function MessageBubble({ message, isMe }: MessageBubbleProps) {
    return (
        <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-4`}>
            {/* Avatar for 'Them' */}
            {!isMe && (
                <div className="h-8 w-8 relative flex-shrink-0 mr-2 self-end mb-1">
                    <Image 
                        src={message.sender?.image || "/images/placeholder.jpg"} 
                        alt={message.sender?.name} 
                        fill
                        className="rounded-full object-cover"
                    />
                </div>
            )}

            <div className="max-w-[70%] group">
                {/* Header (Name + Time) */}
                {!isMe && (
                   <div className="flex items-center gap-2 mb-1 ml-1">
                       <span className="text-xs font-bold text-gray-700">{message.sender?.name}</span>
                       <span className="text-[10px] text-gray-400">
                           {format(new Date(message.createdAt), "h:mm a")}
                       </span>
                   </div> 
                )}
                
                {/* The Bubble */}
                <div
                    className={`p-3 text-sm rounded-xl relative break-words shadow-sm ${
                        isMe
                            ? "bg-[#0073B1] text-white rounded-br-none" // LinkedIn Blue
                            : "bg-[#F2F2F2] text-black rounded-bl-none"
                    }`}
                >
                    {message.content}
                </div>

                {/* Time for Me */}
                {isMe && (
                    <p className="text-[10px] text-gray-400 text-right mt-1 mr-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {format(new Date(message.createdAt), "h:mm a")}
                    </p>
                )}
            </div>
        </div>
    );
}