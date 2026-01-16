import { Card, CardContent } from "@/components/ui/Card";
import { User } from "lucide-react";
import Image from "next/image";

// interface User {
//     name: string;
//     headline?: string;
//     about?: string;
//     location?: string;
//     email?: string;
//     image?: string;
// }

export function Sidebar({ user }: { user?: any }) {

  return (
    <aside className="w-full space-y-2">
      <Card className="overflow-hidden">
        {/* Banner Area */}
        <div className="h-14 bg-primary/20 bg-linear-to-r from-primary to-blue-400" />

        <CardContent className="relative flex flex-col items-left p-4">
          {/* Avatar - Positioned to overlap the banner */}
          <div className="absolute -top-10 h-20 w-20 rounded-full border-2 border-white bg-surface p-0.5 overflow-hidden">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-300 relative overflow-hidden">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User"}
                  fill
                  className="object-cover"
                />
              ) : (
                <User className="h-12 w-12 text-gray-500" />
              )}
            </div>
          </div>

          <div className="mt-8 ">
            <h3 className="text-lg font-bold hover:underline cursor-pointer">{user?.name}</h3>
            <p className="text-xs text-black">{user?.headline}</p>
            <p className="text-xs text-muted">{user?.location}</p>
          </div>

          {/* user Exprience */}
            <div className="mt-2 space-y-2 font-semibold text-lg">
              {user?.experience?.map((exp: any) => (
                <p key={exp.id} className="hover:bg-gray-100 p-1 rounded cursor-pointer">
                 {exp.company}
                </p>
              ))}
            </div>
          {/* <hr className="my-4 w-full border-border" /> */}

        </CardContent>
      </Card>

       <Card className="p-3">
        
          {/* Stats Section */}
          <div className="w-full space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted font-medium hover:underline cursor-pointer">Profile viewers</span>
              <span className="text-primary font-semibold">1,240</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted font-medium hover:underline cursor-pointer">Post impressions</span>
              <span className="text-primary font-semibold">892</span>
            </div>
          </div>
      </Card>

      {/* Bottom Sidebar Item (Sticky or Static) */}
      <Card className="p-3">
        <p className="text-xs font-semibold">Recent</p>
        <div className="mt-2 space-y-2 text-xs text-muted font-medium">
          <p className="hover:bg-gray-100 p-1 rounded cursor-pointer"># nextjs</p>
          <p className="hover:bg-gray-100 p-1 rounded cursor-pointer"># reactjs</p>
          <p className="hover:bg-gray-100 p-1 rounded cursor-pointer"># webdev</p>
        </div>
      </Card>
    </aside>
  );
}