"use client";

import { useState } from "react";
import Button from "../ui/Button";
import { EditProfileForm } from "./EditProfileForm";
import { Pencil } from "lucide-react";

export function ProfileEditor({ user }: { user: any }) {
    const [isEditing, setIsEditing] = useState(false);

    if (isEditing) {
        return <EditProfileForm user={user} onClose={() => setIsEditing(false)} />;
    }

    return (
        <Button onClick={() => setIsEditing(true)} variant="outline" className="gap-2">
            <Pencil className="h-4 w-4" />
            Edit Profile
        </Button>
    );
}