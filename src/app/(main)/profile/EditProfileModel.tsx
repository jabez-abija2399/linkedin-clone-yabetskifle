"use client"

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { updateProfile } from "@/server/actions/user.actions";
import { Pencil } from "lucide-react";

interface EditProfileModalProps {
  currentHeadline?: string | null;
  currentAbout?: string | null;
  currentLocation?: string | null;
}

export function EditProfileModal({ currentHeadline, currentAbout, currentLocation }: EditProfileModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    const result = await updateProfile(formData);
    
    if (result.success) {
      setIsOpen(false);
    } else {
      alert(result.error);
    }
  }

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="rounded-full"
      >
        <Pencil className="h-4 w-4 mr-2" />
        Edit Profile
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Profile"
      >
        <form action={handleSubmit} className="space-y-4">
          {/* Headline */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Headline
            </label>
            <input
              name="headline"
              type="text"
              defaultValue={currentHeadline || ""}
              placeholder="Software Engineer at Company"
              maxLength={120}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-muted mt-1">Max 120 characters</p>
          </div>

          {/* About */}
          <div>
            <label className="block text-sm font-medium mb-1">
              About
            </label>
            <textarea
              name="about"
              defaultValue={currentAbout || ""}
              placeholder="Tell us about yourself..."
              maxLength={2000}
              rows={5}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            <p className="text-xs text-muted mt-1">Max 2000 characters</p>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Location
            </label>
            <input
              name="location"
              type="text"
              defaultValue={currentLocation || ""}
              placeholder="San Francisco, CA"
              maxLength={100}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}