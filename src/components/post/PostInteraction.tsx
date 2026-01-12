"use client"

import { useState } from "react"
import { ActionButtons } from "./PostActions"
import { ThumbsUp, MessageCircle, Repeat2, Send } from "lucide-react"

export function PostInteraction({ 
  postId, 
  initialLike 
}: { 
  postId: string; 
  initialLike?: boolean 
}) {
    const [showComments, setShowComments] = useState(false)

    return (
        <div className="flex flex-col">
            {/* 1. The Interaction Buttons */}
            <div className="px-4 py-1 border-t border-border flex justify-between">
                <ActionButtons 
                    postId={postId} 
                    initialLike={initialLike} 
                    icon={<ThumbsUp className="h-5 w-5" />} 
                    label="Like" 
                />
                <ActionButtons 
                    icon={<MessageCircle className="h-5 w-5" />} 
                    label="Comment" 
                    onClick={() => setShowComments(!showComments)} // 👈 This is why we made the flexible onClick!
                />
                <ActionButtons icon={<Repeat2 className="h-5 w-5" />} label="Repost" />
                <ActionButtons icon={<Send className="h-5 w-5" />} label="Send" />
            </div>

            {/* 2. The Conditional Comment Section */}
            {showComments && (
                <div className="px-4 py-3 border-t border-border space-y-4">
                    {/* We will build the input field here! */}
                    {/* comment input */}
                    <div className="flex gap-2">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0" />
                            <form action="" className="flex-1 flex gap-2">
                                <input 
                                type="text" 
                                placeholder="Add a comment..." 
                                className="
                                flex-1 bg-background border border-border rounded-full px-4
                                py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary
                                "
                                />
                                <button type="submit" className="text-primary font-semibold
                                text-sm hover:bg-blue-50 rounded-full px-3 py-1 transition-colors
                                ">
                                    Post
                                </button>
                            </form>
                        </div>
                        <p className="text-xs text-muted text-center italic">Be the first to comment!</p>
                    
                </div>
            )}

            
        </div>
    )
}