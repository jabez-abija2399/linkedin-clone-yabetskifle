"use client"; // <--- 1. This is now a Client Component

import Link from "next/link";
import { usePathname } from "next/navigation"; // <--- 2. To check current URL
import { Home, Briefcase, Users, MessageSquare, Bell, Search } from "lucide-react";
import { Input } from "../ui/Input";

export function Navbar() {
    const pathname = usePathname(); // Get current route (e.g., "/jobs")

    return (
        <nav className="sticky top-0 z-50 border-b border-border bg-surface shadow-sm">
            <div className="flex h-14 items-center px-4 max-w-5xl mx-auto justify-between">

                {/* Left: Logo and search */}
                <div className="flex items-center gap-2">
                    <Link
                        href="/"
                        className="
                            mr-2 
                            flex items-center justify-center
                            bg-primary
                            text-white 
                            font-bold 
                            text-[28px]
                            w-9 h-9
                            rounded
                        "
                    >
                        in
                    </Link>

                    {/* Search Bar */}
                    <div className="hidden md:block relative w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted" />
                        <Input 
                            placeholder="Search" 
                            className="pl-9 bg-input border-none h-9 rounded-full transition-all focus:w-[280px]" 
                        />
                    </div>
                </div>

                {/* Right: Navigation Icons */}
                <ul className="flex h-full items-center gap-6 sm:gap-8">
                    <NavLink 
                        href="/" 
                        icon={Home} 
                        label="Home" 
                        isActive={pathname === "/"} 
                    />
                    <NavLink 
                        href="/my-network" 
                        icon={Users}  // LinkedIn uses "Users" for Network
                        label="My Network" 
                        isActive={pathname === "/my-network"} 
                    />
                    <NavLink 
                        href="/jobs" 
                        icon={Briefcase} 
                        label="Jobs" 
                        isActive={pathname === "/jobs"} 
                    />
                    <NavLink 
                        href="/messaging" 
                        icon={MessageSquare} 
                        label="Messaging" 
                        isActive={pathname === "/messaging"} 
                    />
                    <NavLink 
                        href="/notifications" 
                        icon={Bell} 
                        label="Notifications" 
                        isActive={pathname === "/notifications"} 
                    />

                    {/* Profile & Me */}
                    <li className="flex flex-col items-center justify-center h-full border-b-[2px] border-transparent cursor-pointer min-w-[50px]">
                        <div className="flex flex-col items-center gap-1 text-gray-500 hover:text-black">
                             <div className="h-6 w-6 rounded-full bg-gray-300 overflow-hidden">
                                {/* Placeholder for user image */}
                             </div>
                             <span className="hidden md:block text-[12px]">Me ▼</span>
                        </div>
                    </li>
                </ul>

            </div>
        </nav>
    )
}

// Micro-component for Nav Links
interface NavLinkProps {
    href: string;
    icon: React.ElementType; // Using ElementType to pass the component itself
    label: string;
    isActive: boolean;
}

function NavLink({ href, icon: Icon, label, isActive }: NavLinkProps) {
    return (
        <li className={`h-full flex items-center ${isActive ? "border-b-2 border-black" : "border-b-2 border-transparent"}`}>
            <Link 
                href={href} 
                className={`flex flex-col items-center justify-center gap-1 min-w-[50px] transition-colors
                    ${isActive ? "text-black" : "text-gray-500 hover:text-black"}
                `}
            >
                {/* FILL TRICK: fill={isActive ? "currentColor" : "none"} */}
                <Icon 
                    className="h-6 w-6" 
                    // fill={isActive ? "currentColor" : "none" } 
                />
                <span className="hidden md:block text-[12px]">{label}</span>
            </Link>
        </li>
    )
}