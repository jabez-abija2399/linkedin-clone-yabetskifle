"use client"

import { useOptimistic, useState, useTransition } from "react"
import { ActionButtons } from "./PostActions"
import { ThumbsUp, MessageCircle, Repeat2, Send } from "lucide-react"
import { CreateComment } from "@/server/actions/comment.actions";

export function PostInteraction({
    postId,
    initialLike,
    comments
}: {
    postId: string;
    initialLike?: boolean
    comments?: any[]
}) {
    const [commentText, setCommentText] = useState("")
    const [showComments, setShowComments] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [optimisticComments, addOptimisticComment] = useOptimistic(
        comments || [],
        (state, newComment: any) => [...state, newComment]
    );

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!commentText.trim()) return

        const tempComment = {
            id: "temp-" + Date.now(),
            content: commentText,
            createdAt: new Date(),
            author: {
                name: "You",
                headline: "",
            },
        };

        const formData = new FormData();
        formData.append("content", commentText);
        formData.append("postId", postId);

        setCommentText("");

        // Wrap optimistic update in transition
        startTransition(() => {
            addOptimisticComment(tempComment);
        });

        await CreateComment(formData);
    }

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
                    onClick={() => setShowComments(!showComments)}
                // 👈 This is why we made the flexible onClick!
                />
                <ActionButtons icon={<Repeat2 className="h-5 w-5" />} label="Repost" />
                <ActionButtons icon={<Send className="h-5 w-5" />} label="Send" />
            </div>

            {/* 2. The Conditional Comment Section */}
            {showComments && comments && (
                <div className="px-4 py-3 border-t border-border space-y-4">
                    {/* We will build the input field here! */}
                    {/* comment input */}
                    <div className="flex gap-2">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0" />
                        <form onSubmit={handleCommentSubmit} className="flex-1 flex gap-2">
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                className="
                                flex-1 bg-background border border-border rounded-full px-4
                                py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary
                                "
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                            />
                            <button type="submit" className="text-primary font-semibold
                                text-sm hover:bg-blue-50 rounded-full px-3 py-1 transition-colors
                                ">
                                Post
                            </button>
                        </form>
                    </div>

                    {/* Mapping real comments */}
                    <div className="space-y-4 pt-2">
                        {optimisticComments.map((comment) => (
                            <div key={comment.id} className="flex gap-2 items-start">
                                <div className="h-8 w-8 rounded-full bg-gray-200 flex-shrink-0" />
                                <div className="bg-gray-100 rounded-lg rounded-tl-none p-3 flex-1">
                                    <p className="text-xs font-bold">{comment.author.name}</p>
                                    <p className="text-xs text-muted leading-tight mb-1">{comment.author.headline}</p>
                                    <p className="text-sm">{comment.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            )}


        </div>
    )
}