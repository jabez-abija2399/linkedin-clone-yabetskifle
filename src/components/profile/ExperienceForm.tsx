"use client";

import { useState } from "react";
import Button from "../ui/Button";
import { Input } from "../ui/Input";
import { X } from "lucide-react";
import { addExperience } from "@/server/actions/experience.actions";

interface ExperienceFormProps {
    onClose: () => void;
}

export function ExperienceForm({ onClose }: ExperienceFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [current, setCurrent] = useState(false);
    
    // Form State
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [location, setLocation] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const result = await addExperience({
            title,
            company,
            location,
            startDate,
            endDate: current ? undefined : endDate,
            current,
            description,
        });

        setIsLoading(false);

        if (result.success) {
            onClose();
        } else {
            alert(result.error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-lg shadow-xl overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">Add Experience</h2>
                    <button onClick={onClose}><X className="h-6 w-6" /></button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title*</label>
                        <Input required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Software Engineer" />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Company Name*</label>
                        <Input required value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Ex: Google" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Ex: London, UK" />
                    </div>

                    <div className="flex items-center gap-2">
                        <input 
                            type="checkbox" 
                            id="current" 
                            checked={current} 
                            onChange={(e) => setCurrent(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="current" className="text-sm font-medium">I am currently working in this role</label>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Start Date*</label>
                            <Input required type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </div>
                        
                        {!current && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium">End Date*</label>
                                <Input required type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                         <label className="text-sm font-medium">Description</label>
                         <textarea 
                            className="w-full border rounded-md p-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary/50"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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