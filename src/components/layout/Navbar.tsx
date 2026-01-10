import Link from "next/link";
import { Home, Briefcase, User, MessageSquare, Bell, Search } from "lucide-react";
import { Input } from "../ui/Input";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 border-b border-border bg-surface shadow-sm">
            <div className="flex h-14 items-center px-4 max-w-7xl mx-auto justify-between">

                {/* Left: Logo and search */}
                <div className="flex items-center gap-4">
                    <Link href="/" className="mr-4">
                        <span className="text-primary font-bold text-2xl">LinkedInClone</span>
                    </Link>


                    {/* Search Bar (hidden on mobile) */}
                    <div className="hidden md:block relative w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted" />
                        <Input 
                        placeholder="Search" 
                        className="pl-9 bg-input border-none h-9" />
                    </div>
                </div>

                {/* Right, navigation icons */}
                <div className="flex items-center gap-6 sm:gap-8">
                    <NavLink href="/" icon={<Home className="h-6 w-6" />} label="Home" active />
                    <NavLink href="/my-network" icon={<User className="h-6 w-6" />} label="My Network" />
                    <NavLink href="/jobs" icon={<Briefcase className="h-6 w-6" />} label="Jobs" />
                    <NavLink href="/messages" icon={<MessageSquare className="h-6 w-6" />} label="Messages" />
                    <NavLink href="/notifications" icon={<Bell className="h-6 w-6" />} label="Notifications" />

                    {/* Profile Menu Placeholder */}
                    <div className="flex flex-col items-center gap-1 cursor-pointer">
                        <User className="h-6 w-6 text-muted hover:text-surface-foreground transition-colors" />
                        <span className="hidden md:block text-[10px] text-muted">Me</span>
                    </div>
                </div>

            </div>


        </nav>
    )
}

// micro-component for Nav Links to keep code clean
function NavLink({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
    return (
        <Link href={href} className={`flex flex-col items center gap-1 transition-colors ${active ? "text-surface-foreground" : "text-muted hover:text-surface-foreground"}`}>
            {icon}
            <span className="hidden md:block text-[10px]">{label}</span>
        </Link>
    )
}