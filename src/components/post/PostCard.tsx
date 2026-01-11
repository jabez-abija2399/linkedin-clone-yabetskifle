import { MessageCircle, MoreHorizontal, Repeat2, Send, ThumbsUp } from "lucide-react";
import Button from "../ui/Button";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { ActionButtons } from "./PostActions";


interface PostCardProps {
    authorName: string;
    authorHeadline: string;
    content: string;
    createdAt: string;
    
}

export function PostCard({ authorName, authorHeadline, content, createdAt}: PostCardProps) {
    return (
        <Card className="overflow-hidden">
            <CardHeader className="p-4 flex flex-row items-start justify-between space-y-0">
                <div className="flex gap-3">
                    {/* Avatar placeholder */}
                    <div className="h-12 w-12 rounded-full bg-gray-300 flex-shrink-0" />

                    <div>
                        <h4 className="font-semibold text-sm hover:text-primary hover:underline cursor-pointer">
                            {authorName}
                        </h4>
                        <p className="text-xs text-muted line-clamp-1">
                            {authorHeadline}
                        </p>
                        <p className="text-xs text-muted">
                            {createdAt} • 🌐
                        </p>
                    </div>
                </div>

                <Button variant="ghost" size="sm" className="rounded-full h-8 w-8 p-0">
                    <MoreHorizontal className="h-5 w-5 text-muted" />
                </Button>
            </CardHeader>

            <CardContent className="px-4 py-3">
                <p className="text-sm leading-relaxed">{content}</p>
            </CardContent>

            {/* Interactions bar */}
            <div className="px-4 py-1 border-t border-border flex justify-between">
                <ActionButtons icon={<ThumbsUp className="h-5 w-5 " />} label="Like" />
                <ActionButtons icon={<MessageCircle className="h-5 w-5" />} label="Comment" />
                <ActionButtons icon={<Repeat2 className="h-5 w-5" />} label="Repost" />
                <ActionButtons icon={<Send className="h-5 w-5" />} label="Send" />
            </div>
        </Card>
    )
}

