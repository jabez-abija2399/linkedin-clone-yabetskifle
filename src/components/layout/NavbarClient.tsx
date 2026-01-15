"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Briefcase, Users, MessageSquare, Bell, Search, X } from "lucide-react";
import { Input } from "../ui/Input";
import { useState } from "react";
import { Card, CardContent } from "../ui/Card";
import Image from "next/image";
import { signOut } from "next-auth/react";
import Button from "../ui/Button";

interface NavbarClientProps {
    user: any;
    unreadCount: number;
}

export function NavbarClient({ user, unreadCount }: NavbarClientProps) {
    const pathname = usePathname();
    const [meActive, setMeActive] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

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

                    <div className="flex-1 max-w-md mx-4 relative">
                        {/* Desktop search - always visible */}
                        <div className="hidden md:flex items-center gap-2 bg-background rounded px-3 py-1.5">
                            <Search className="h-4 w-4 text-muted" />
                            <Input
                                placeholder="Search"
                                className="border-none bg-transparent focus:ring-0 text-sm p-0"
                            />
                        </div>

                        {/* Mobile search - toggle button */}
                        <button
                            onClick={() => setShowSearch(!showSearch)}
                            className="md:hidden p-2 hover:bg-gray-100 rounded-full"
                        >
                            <Search className="h-5 w-5 text-muted" />
                        </button>

                        {/* Mobile search overlay */}
                        {showSearch && (
                            <div className="md:hidden fixed inset-0 bg-white z-50 p-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <button onClick={() => setShowSearch(false)}>
                                        <X className="h-6 w-6" />
                                    </button>
                                    <Input
                                        autoFocus
                                        placeholder="Search"
                                        className="pl-9 bg-input border-none h-9 rounded-full transition-all focus:w-[280px]"
                                    />
                                </div>
                            </div>
                        )}
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
                        icon={Users}
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
                        badge={unreadCount > 0 ? unreadCount : undefined}
                    />

                    {/* Profile & Me */}
                    <li className="relative flex flex-col items-center justify-center h-full border-b-[2px] border-transparent cursor-pointer min-w-[50px]">
                        <div onClick={() => setMeActive(!meActive)} className="flex flex-col items-center gap-1 text-gray-500 hover:text-black">
                            <div className="h-6 w-6 rounded-full bg-gray-300 overflow-hidden relative">
                                <Image
                                    src={user?.image || "/images/placeholder.jpg"}
                                    alt="User"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <span className="hidden md:block text-[12px]">Me ▼</span>
                        </div>
                        {meActive && (
                            <Card className="absolute top-[120%] right-0 w-64 shadow-xl border border-border z-[100]">
                                <CardContent className="p-0">
                                    <div className="p-4 border-b border-border">
                                        <div className="flex gap-2">
                                            <div className="h-12 w-12 rounded-full overflow-hidden relative border border-border">
                                                <Image
                                                    src={user?.image || "/images/placeholder.jpg"}
                                                    alt="User"
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-sm truncate">{user?.name}</p>
                                                <p className="text-xs text-muted truncate">{user?.headline || "LinkedIn User"}</p>
                                            </div>
                                        </div>
                                        {/* Added Link to Profile Page */}
                                        <Link href={`/profile/${user?.id}`} className="w-full">
                                            <Button variant="outline" className="w-full mt-3 rounded-full text-xs py-1 h-7 text-primary border-primary hover:bg-blue-50">
                                                View Profile
                                            </Button>
                                        </Link>
                                    </div>

                                    <div className="p-2 border-b border-border">
                                        <p className="px-2 py-1 text-sm font-semibold">Account</p>
                                        <p className="px-2 py-1 text-xs text-muted hover:underline cursor-pointer">Settings & Privacy</p>
                                        <p className="px-2 py-1 text-xs text-muted hover:underline cursor-pointer">Help</p>
                                    </div>

                                    <div className="p-2">
                                        <button
                                            onClick={() => signOut()}
                                            className="w-full text-left px-2 py-1 text-xs text-muted hover:underline"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </li>
                </ul>

            </div>
        </nav>
    );
}

// Micro-component for Nav Links
interface NavLinkProps {
    href: string;
    icon: React.ElementType;
    label: string;
    isActive: boolean;
    badge?: number;
}

function NavLink({ href, icon: Icon, label, isActive, badge }: NavLinkProps) {
    return (
        <li className={`h-full flex items-center ${isActive ? "border-b-2 border-black" : "border-b-2 border-transparent"}`}>
            <Link
                href={href}
                className={`flex flex-col items-center justify-center gap-1 min-w-[50px] transition-colors relative
                    ${isActive ? "text-black" : "text-gray-500 hover:text-black"}
                `}
            >
                <div className="relative">
                    <Icon className="h-6 w-6" />
                    {badge && (
                        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">
                            {badge > 9 ? "9+" : badge}
                        </span>
                    )}
                </div>

                <span className="hidden md:block text-[12px]">{label}</span>
            </Link>
        </li>
    );
}
