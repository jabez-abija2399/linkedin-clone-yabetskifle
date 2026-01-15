"use client";

import { useState } from "react";
import Button from "../ui/Button";
import { Input } from "../ui/Input";
import { X } from "lucide-react";
import { updateProfile } from "@/server/actions/user.actions";

interface EditProfileFormProps {
    user: any;
    onClose: () => void;
}

export function EditProfileForm({ user, onClose }: EditProfileFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    
    // Form State
    const [name, setName] = useState(user.name || "");
    const [headline, setHeadline] = useState(user.headline || "");
    const [location, setLocation] = useState(user.location || "");
    const [about, setAbout] = useState(user.about || "");

        const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            // Create a FormData object properly
            const formData = new FormData();
            formData.append("name", name);
            formData.append("headline", headline);
            formData.append("location", location);
            formData.append("about", about);

            // Pass the FormData object
            await updateProfile(formData); 
            
            onClose(); 
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-lg shadow-xl overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">Edit Intro</h2>
                    <button onClick={onClose}><X className="h-6 w-6" /></button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Headline</label>
                        <Input value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="e.g. Software Engineer" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. New York, NY" />
                    </div>

                    <div className="space-y-2">
                         <label className="text-sm font-medium">About</label>
                         {/* We can use a simple textarea for now */}
                         <textarea 
                            className="w-full border rounded-md p-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary/50"
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                         />
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}