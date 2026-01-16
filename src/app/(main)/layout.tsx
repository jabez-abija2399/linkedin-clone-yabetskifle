import { MobileNavbar } from "@/components/layout/MobileNavbar";
import { Navbar } from "@/components/layout/Navbar";

export default function MainLayout(
    {children}: 
    {children: React.ReactNode}) {
     return (
        <div className="min-h-screen flex flex-col bg-[#F3F2EF]">
            <Navbar /> {/* Existing Top Bar */}
            
            <main className="flex-1 pb-16 md:pb-0"> 
                 {/* Added pb-16 to prevent content being hidden behind bottom bar on mobile */}
                {children}
            </main>
            {/* The new Bottom Bar */}
            <MobileNavbar />
        </div>
    );
}