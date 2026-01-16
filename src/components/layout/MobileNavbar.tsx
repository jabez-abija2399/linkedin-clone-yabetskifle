"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Briefcase, MessageSquare, Bell } from "lucide-react";

export function MobileNavbar() {
    const pathname = usePathname();

    const navItems = [
        { icon: Home, label: "Home", href: "/" },
        { icon: Users, label: "Network", href: "/my-network" },
        { icon: Briefcase, label: "Jobs", href: "/jobs" }, // Dummy link
        { icon: MessageSquare, label: "Messaging", href: "/messaging" },
        { icon: Bell, label: "Notifications", href: "/notifications" },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-safe pt-1">
            <ul className="flex justify-around items-center h-14 px-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <li key={item.label} className="flex-1">
                            <Link 
                                href={item.href}
                                className={`flex flex-col items-center justify-center gap-1 w-full h-full ${
                                    isActive ? "text-black" : "text-gray-500"
                                }`}
                            >
                                <item.icon className={`h-6 w-6 ${isActive ? "fill-current" : ""}`} />
                                <span className="text-[10px]">{item.label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}