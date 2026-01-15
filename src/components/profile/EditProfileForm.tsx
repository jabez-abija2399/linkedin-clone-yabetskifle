"use client";

import { useState } from "react";
import Button from "../ui/Button";
import { Input } from "../ui/Input";
import { Camera, X } from "lucide-react";
import { updateProfile } from "@/server/actions/user.actions";
import Image from "next/image";

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
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState(user.image || "/images/placeholder.jpg");

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    }

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
            if (selectedImage) {
                formData.append("image", selectedImage);
            }

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
            <div className="bg-white rounded-lg w-full max-w-lg shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
                    <h2 className="text-xl font-semibold">Edit Intro</h2>
                    <button onClick={onClose}><X className="h-6 w-6" /></button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    {/* Image Upload */}
                    <div className="flex justify-center mb-6">
                        <div className="relative h-28 w-28 rounded-full border-4 border-white shadow-lg overflow-hidden group bg-gray-100">
                            <Image
                                src={previewUrl}
                                alt="Preview"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <label htmlFor="profile-image" className="cursor-pointer p-4 w-full h-full flex items-center justify-center">
                                    <Camera className="h-8 w-8 text-white" />
                                </label>
                            </div>
                            <input
                                type="file"
                                id="profile-image"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>

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

                    <div className="flex justify-end gap-2 pt-4 border-t sticky bottom-0 bg-white pb-2">
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