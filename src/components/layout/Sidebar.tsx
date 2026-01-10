import { Card, CardContent } from "@/components/ui/Card";
import { User } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-full space-y-2">
      <Card className="overflow-hidden">
        {/* Banner Area */}
        <div className="h-14 bg-primary/20 bg-gradient-to-r from-primary to-blue-400" />
        
        <CardContent className="relative flex flex-col items-center p-4">
          {/* Avatar - Positioned to overlap the banner */}
          <div className="absolute -top-8 h-16 w-16 rounded-full border-2 border-white bg-gray-200 p-1">
             <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-300">
               <User className="h-10 w-10 text-gray-500" />
             </div>
          </div>
          
          <div className="mt-8 text-center">
            <h3 className="text-lg font-semibold hover:underline cursor-pointer">Your Name</h3>
            <p className="text-xs text-muted">Software Engineer at Learning Inc.</p>
          </div>

          <hr className="my-4 w-full border-border" />

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
        </CardContent>
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