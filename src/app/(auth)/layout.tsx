export default function AuthLayout({ children }: 
    { children: React.ReactNode}
){
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
            
            {/* logo above the box */}
            <div className="mb-8 text-center gap-2">
                <div>in</div>
                <span>LinkedinClone</span>
            </div>

            {children}

            {/* footer */}
            <footer>
                &copy; 2025 LinkedIn Clone. All rights reserved.
            </footer>

        </div>
    )
}