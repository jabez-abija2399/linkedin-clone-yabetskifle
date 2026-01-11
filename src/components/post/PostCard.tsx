import { MoreHorizontal } from "lucide-react";
import Button from "../ui/Button";
import { Card, CardContent, CardHeader } from "../ui/Card";


interface PostCardProps {
    authorName: string;
    authorHeadline: string;
    content: string;
    createdAt: string;
    
}

export function PostCard({ authorName, authorHeadline, content, createdAt}: PostCardProps) {
    return (
        <Card>
            <CardHeader>
                <div>
                    {/* Avatar placeholder */}
                    <div />

                    <div>
                        <h4>
                            {authorName}
                        </h4>
                        <p>
                            {authorHeadline}
                        </p>
                        <p>
                            {createdAt} • 🌐
                        </p>
                    </div>
                </div>

                <Button>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </CardHeader>

            <CardContent>
                <p>{content}</p>
            </CardContent>

            {/* Interactions bar */}
        </Card>
    )
}

function ActionButtons({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div>
            <button>
                {icon}
                <span>{label}</span>
            </button>
        </div>
    )
}