"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { ExperienceForm } from "./ExperienceForm";

export function AddExperienceButton() {
    const [isFormOpen, setIsFormOpen] = useState(false);

    if (isFormOpen) {
        return <ExperienceForm onClose={() => setIsFormOpen(false)} />;
    }

    return (
        <button 
            onClick={() => setIsFormOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
            <Plus className="h-5 w-5" />
        </button>
    );
}