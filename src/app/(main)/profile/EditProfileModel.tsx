"use client"

import Button from "@/components/ui/Button"
import { Modal } from "@/components/ui/Modal"
import { updateProfile } from "@/server/actions/user.actions"
import { PencilIcon } from "lucide-react"
import { useState } from "react"


interface EditProfileModelProps {
    currentHeadline?: string | null
    currentUser?: string | null
    currentAbout?: string | null
    currentLocation?: string | null
    currentImage?: string | null
}

export function EditProfileModel({
    currentHeadline,
    currentUser,
    currentAbout,
    currentLocation,
    currentImage
}: EditProfileModelProps) {
    const [isOpen, setIsOpen] = useState(false)

    async function handleSubmit(formData: FormData) {
        const result = await updateProfile(formData)

        if (result.success) {
            setIsOpen(false);
        } else {
            alert(result.error)
        }
    }
    
    return (
        <>
        <Button
        onClick={() => setIsOpen(true)}
        >
            <PencilIcon className="mr-2 h-4 w-4" />
            Edit Profile
        </Button>
        <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Profile"
        >
          <form action={handleSubmit}>
            {/* headline */}
            <div>
                <label htmlFor="">Headline</label>
                <input type="text" name="headline" id="headline" value={currentHeadline || ""} />
            </div>
            {/* user */}
            <div>
                <label htmlFor="">User</label>
                <input type="text" name="user" id="user" value={currentUser || ""} />
            </div>
            {/* about */}
            <div>
                <label htmlFor="">About</label>
                <input type="text" name="about" id="about" value={currentAbout || ""} />
            </div>
            {/* location */}
            <div>
                <label htmlFor="">Location</label>
                <input type="text" name="location" id="location" value={currentLocation || ""} />
            </div>
            {/* image */}
            <div>
                <label htmlFor="">Image</label>
                <input type="text" name="image" id="image" value={currentImage || ""} />
            </div>

            <div>
                <Button type="button" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button type="submit">Save changes</Button>
            </div>
          </form>
        </Modal>
        </>
    )
}