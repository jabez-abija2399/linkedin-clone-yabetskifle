"use client"
import { X } from "lucide-react";
import { useEffect } from "react";

 


interface ModelProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export function Modal({
    isOpen, onClose, title, children
}: ModelProps){
    
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "unset";
    }, [isOpen]);

    if (!isOpen) return null;
    
    return (

        <div>
            <div>
                <div>
                    <h2>{title}</h2>
                    <button onClick={onClose}><X className="h-6 w-6" /></button>

                </div>
                <div>{children}</div>
            </div>
        </div>
    )
}