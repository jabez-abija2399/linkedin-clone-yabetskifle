import { Calendar, Image, Newspaper, Video } from "lucide-react";
import Button from "../ui/Button";
import { Card, CardContent } from "../ui/Card";


export function PostForm() {
    return (
       <Card>
         <CardContent>
            <div>
                <div>
                    <Button>
                        Start a post
                    </Button>
                </div>

                <div>
                    <PostOption icon={<Image className="text-blue-500" />} label="Media" />
                    <PostOption icon={<Video className="text-green-500" />} label="Video" />
                    <PostOption icon={<Calendar className="text-orange-500" />} label="Event" />
                    <PostOption icon={<Newspaper className="text-red-400" />} label="write article" />
                </div>
            </div>
         </CardContent>
       </Card>
    )
}

function PostOption({icon, label}: {icon: React.ReactNode, label: string}) {
    return (
        <button>
            {icon}
            <span>{label}</span>
        </button>
    )
}
