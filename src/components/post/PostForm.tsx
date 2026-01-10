import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Image, Video, Calendar, Newspaper } from "lucide-react";

export function PostForm() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-3">
          <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gray-300" />
          <Button 
            variant="outline" 
            className="flex-1 justify-start rounded-full border-gray-300 text-muted hover:bg-gray-100 h-12 px-5 font-semibold text-sm"
          >
            Start a post
          </Button>
        </div>
        
        <div className="mt-2 flex justify-between">
          <PostOption icon={<Image className="text-blue-500" />} label="Media" />
          <PostOption icon={<Video className="text-green-500" />} label="Video" />
          <PostOption icon={<Calendar className="text-orange-500" />} label="Event" />
          <PostOption icon={<Newspaper className="text-red-400" />} label="Write article" />
        </div>
      </CardContent>
    </Card>
  );
}

function PostOption({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-2 rounded p-2 hover:bg-gray-100 transition-colors text-muted font-semibold text-sm">
      {icon}
      <span>{label}</span>
    </button>
  );
}