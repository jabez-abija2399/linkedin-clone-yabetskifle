import { format } from "date-fns";
import Image from "next/image";


interface MessageBubbleProps {
    message: any;
    isMe: boolean;
}

export function MessageBubble({message, isMe}: MessageBubbleProps) {
    return (
        <div>
            {/* Avata fo them */}
            {isMe && (
                <div>
                <Image
                src={message.sender.image}
                alt={message.sender.name}
                fill
                className="rounded-full object-cover"
            />
            </div>
            )}

            <div>
                {/* header name + time */}
                {isMe && (
                    <div>
                        <span>{message.sender.name}</span>
                        <span>{message.createdAt && format(new Date(message.createdAt), "h:mm a")}</span>
                    </div>
                )}

                {/* the bubble */}
                <div>
                    {message.content}
                </div>

                {/* time for me */}
                {isMe && (
                    <p>
                        {format(new Date(message.createdAt), "h:mm a")}
                    </p>
                )}
            </div>

        </div>
        
    )
}