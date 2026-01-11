"use client"

import { ThumbsUp } from "lucide-react";
import { useState } from "react";

export function ActionButtons({ icon, label }: { icon: React.ReactNode; label: string }) {
    const [isActive, setIsActive] = useState(false);

    return (
            <button onClick={() => setIsActive(!isActive)} className={`flex items-center gap-2 
            rounded-md p-2 hover:bg-gray-100 transition-colors 
            cursor-pointer text-muted font-semibold text-sm flex-1 justify-center ${isActive && label === "Like"  ? "text-primary" : ""}`}>
               {isActive && label === "Like" ? <div className="bg-primary rounded-full p-1"> <ThumbsUp className="h-3 w-3 text-black fill-white" /></div> : icon}
                <span className="hidden sm:inline">{label}</span>
            </button>
        
    )
}