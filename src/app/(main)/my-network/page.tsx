import { auth } from "@/lib/auth";
import { getWhoToFollow } from "@/server/actions/network.actions";
import { FollowButton } from "@/components/profile/FollowButton";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/Card";
import { Users } from "lucide-react";

export default async function MyNetworkPage() {
    const session = await auth();
    const users = await getWhoToFollow();

    return (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
            
            {/* Left Sidebar (Manage Network) */}
            <div className="hidden md:block col-span-1">
                <Card>
                    <CardContent className="p-0">
                        <h3 className="p-4 font-semibold text-gray-600 border-b border-gray-100">Manage my network</h3>
                        <div className="p-2">
                             <div className="flex justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer text-gray-600">
                                <div className="flex items-center gap-3">
                                    <Users className="h-6 w-6" />
                                    <span>Connections</span>
                                </div>
                                <span className="font-semibold text-black">104</span>
                             </div>
                             {/* You can add more dummy links here like 'Contacts', 'Following', etc. */}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content (The Grid) */}
            <div className="md:col-span-3 space-y-4">
                
                {/* Pending Invitations Section (Placeholder for now) */}
                <Card>
                    <div className="p-4 flex justify-between items-center">
                        <h2 className="font-semibold text-gray-600">No pending invitations</h2>
                        <button className="text-sm font-semibold text-gray-500 hover:bg-gray-100 px-3 py-1 rounded">Manage</button>
                    </div>
                </Card>

                {/* Suggestions Grid */}
                <div>
                     <div className="flex justify-between items-center mb-3 px-2">
                        <h2 className="font-semibold">People you may know</h2>
                        <button className="text-sm font-semibold text-gray-600 hover:bg-gray-100 px-2 py-1 rounded">See all</button>
                     </div>
                     
                     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {users.map((user: any) => (
                            <Card key={user.id} className="overflow-hidden flex flex-col items-center pt-6 pb-4 relative hover:shadow-md transition-shadow">
                                {/* Banner (Fake) */}
                                <div className="absolute top-0 left-0 right-0 h-14 bg-gray-200 z-0" />
                                
                                {/* Avatar */}
                                <Link href={`/profile/${user.id}`} className="relative z-10 h-24 w-24 rounded-full border-2 border-white overflow-hidden cursor-pointer">
                                    <Image 
                                        src={user.image || "/images/placeholder.jpg"} 
                                        alt={user.name} 
                                        fill 
                                        className="object-cover" 
                                    />
                                </Link>

                                {/* Info */}
                                <div className="text-center mt-2 px-2 flex-1 w-full">
                                    <Link href={`/profile/${user.id}`}>
                                        <h3 className="font-semibold text-base truncate hover:underline cursor-pointer">{user.name}</h3>
                                    </Link>
                                    <p className="text-xs text-muted truncate mt-1 h-8">{user.headline || "LinkedIn Member"}</p>
                                    <p className="text-xs text-muted mt-2">{user._count.followers} followers</p>
                                </div>

                                {/* Follow Button */}
                                <div className="mt-4 w-full px-4">
                                     <FollowButton 
                                        targetUserId={user.id}
                                        targetUserName={user.name}
                                        initialIsFollowing={false}
                                        // We might want a smaller/outline variant here
                                     />
                                </div>
                            </Card>
                        ))}
                     </div>
                </div>
            </div>
        </div>
    );
}