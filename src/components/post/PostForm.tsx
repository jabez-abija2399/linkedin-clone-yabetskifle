"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Image as ImageIcon, Video, Calendar, Newspaper, X } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { createPost } from "@/server/actions/post.actions";
import Image from "next/image";
import { toast } from "sonner";

export function PostForm() {
  // STATE MANAGEMENT
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // REF: A "remote control" for the hidden file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // FUNCTION 1: Handle when user selects an image
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first file
    if (file) {
      setImageFile(file); // Store the actual file (to send to server)

      // Create a preview URL using FileReader
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string); // Store preview URL
      };
      reader.readAsDataURL(file); // Convert file to base64 string
    }
  };

  // FUNCTION 2: Remove the selected image
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file input
    }
  };

  // FUNCTION 3: Submit the form
  async function handleAction(formData: FormData) {
    // If user selected an image, add it to the form data
    if (imageFile) {
      formData.append("image", imageFile);
    }
    const result = await createPost(formData);
    if (result.success) {
      toast.success("Post created successfully");
      setIsOpen(false);
      setSelectedImage(null); // Reset everything
      setImageFile(null);
    } else {
      toast.error(result.error);
    }
  }

  return (
    <>
      {/* MAIN CARD - The "Start a post" button */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gray-300" />
            <Button
              variant="outline"
              onClick={() => setIsOpen(true)}
              className="flex-1 justify-start rounded-full border-gray-300 text-muted hover:bg-gray-100 h-12 px-5 font-semibold text-sm"
            >
              Start a post
            </Button>
          </div>

          <div className="mt-2 flex justify-between">
            {/* MEDIA BUTTON - Triggers the file picker */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 rounded p-2 hover:bg-gray-100 transition-colors text-muted font-semibold text-sm"
            >
              <ImageIcon className="text-blue-500" />
              <span>Media</span>
            </button>

            <PostOption icon={<Video className="text-green-500" />} label="Video" />
            <PostOption icon={<Calendar className="text-orange-500" />} label="Event" />
            <PostOption icon={<Newspaper className="text-red-400" />} label="Write article" />
          </div>
        </CardContent>
      </Card>

      {/* MODAL - The popup form */}
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Create a post"
      >
        <form action={handleAction} className="space-y-4">
          {/* HIDDEN FILE INPUT - The actual file picker */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />

          {/* User info */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-gray-300" />
            <div>
              <p className="font-semibold text-sm">Your Name</p>
              <p className="text-xs text-muted">Post to Anyone</p>
            </div>
          </div>

          {/* Text area */}
          <textarea
            name="content"
            placeholder="What do you want to talk about?"
            className="w-full min-h-[150px] resize-none border-none focus:ring-0 text-lg placeholder:text-gray-400"
            autoFocus
          />

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 text-sm font-medium"
            >
              <ImageIcon className="h-4 w-4 text-blue-500" />
              Add Photo
            </button>
          </div>

          {/* IMAGE PREVIEW - Only shows if an image is selected */}
          {selectedImage && (
            <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={selectedImage}
                alt="Preview"
                fill
                className="object-contain"
              />
              {/* Remove button */}
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Submit button */}
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
    <button type="button" className="flex items-center gap-2 rounded p-2 hover:bg-gray-100 transition-colors text-muted font-semibold text-sm">
      {icon}
      <span>{label}</span>
    </button>
  );
}