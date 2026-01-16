"use client";

import { Input } from "@/components/ui/Input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchInput() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-black" />
            <Input 
                placeholder="Search" 
                className="pl-8 border-border rounded-full focus:border-primary h-8 focus:ring-0 w-full md:w-[310px] "
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearch}
            />
        </div>
    );
}