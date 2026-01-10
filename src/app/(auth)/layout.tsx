export default function AuthLayout({ children }: 
    { children: React.ReactNode}
){
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
            
            {/* logo above the box */}
            <div className="mb-8 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded bg-primary text-3xl font-bold text-background">in</div>
                <span className="text-2xl font-bold text-primary">LinkedinClone</span>
            </div>

            {children}

            {/* footer */}
            <footer className="mt-8 text-xs text-muted">
                &copy; 2025 LinkedIn Clone. All rights reserved.
            </footer>

        </div>
    )
}