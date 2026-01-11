"use client"

import { ThumbsUp } from "lucide-react";
import { useState } from "react";
import { toggleLike } from "@/server/actions/like.actions";

export function ActionButtons({ icon, label, postId ,initialLike }:
     { icon: React.ReactNode; label: string; postId?: string; initialLike?: boolean }) {
    const [isActive, setIsActive] = useState(initialLike || false)
    
    const handleLike = async () => {
        if (!postId || label !== "Like")  return
        
        await toggleLike(postId)
        setIsActive(!isActive)
    }

    return (
            <button onClick={handleLike} className={`flex items-center gap-2 
            rounded-md p-2 hover:bg-gray-100 transition-colors 
            cursor-pointer text-muted font-semibold text-sm flex-1 justify-center ${isActive && label === "Like"  ? "text-primary" : ""}`}>
               {isActive && label === "Like" ? <div className="bg-primary rounded-full p-1"> <ThumbsUp className="h-3 w-3 text-black fill-white" /></div> : icon}
                <span className="hidden sm:inline">{label}</span>
            </button>
        
    )
}