"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    // DARK OVERLAY: fixed inset-0 centers it on the screen
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-200">
      
      {/* THE BOX: bg-surface shadow-xl rounded-lg */}
      <div className="w-full max-w-lg rounded-lg bg-surface shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* HEADER */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-medium text-gray-700">{title}</h2>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100 transition-colors">
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}       