"use client"; // <--- MUST be client because of state (isOpen)

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Image, Video, Calendar, Newspaper } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { createPost } from "@/server/actions/post.actions";

export function PostForm() {
  const [isOpen, setIsOpen] = useState(false);

  // This function will run when the form inside the modal is submitted
  async function handleAction(formData: FormData) {
      const result = await createPost(formData);
      if (result.success) {
          setIsOpen(false); // Close modal on success
      } else {
          alert(result.error);
      }
  }

  return (
    <>
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gray-300" />
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(true)} // Open the modal!
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

      {/* THE MODAL POP-UP */}
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        title="Create a post"
      >
        <form action={handleAction} className="space-y-4">
             <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-300" />
                <div>
                    <p className="font-semibold text-sm">Your Name</p>
                    <p className="text-xs text-muted">Post to Anyone</p>
                </div>
             </div>

             <textarea 
                name="content"
                placeholder="What do you want to talk about?"
                className="w-full min-h-[150px] resize-none border-none focus:ring-0 text-lg placeholder:text-gray-400"
                autoFocus
             />

             <div className="flex justify-end pt-4 border-t">
                <Button type="submit" className="rounded-full px-6">
                    Post
                </Button>
             </div>
        </form>
      </Modal>
    </>
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