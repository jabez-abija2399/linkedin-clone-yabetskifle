import { cn } from "@/lib/utils";
import * as React from "react";
import { Loader2 } from "lucide-react";

// define the props for the button
interface ButtonProps extends
 React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
 }

//  create the commpnent with "forwardRef" (alllows us to accss the DOM element if needed)
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({className, variant = "primary", size = "md", isLoading, ...props}, ref) => {

        // Define the base styles applied to all buttons
        const baseStyles ="inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";

        // Define Specific stylles for each variant
        const variantStyles = {
            primary: "bg-primary text-primary-foreground text-white hover:bg-primary-hover",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
            outline: "bg-transparent border border-primary text-primary hover:bg-outline-hover",
            ghost: "text-primary-hover hover:bg-ghost-hover",
        };

        // Define Specific stylles for each size
        const sizeStyles = {
            sm: "h-8 px-4 text-xs",
            md: "h-10 px-6 text-sm",
            lg: "h-12 px-8 text-base",
        };

        return (
            <button
            ref={ref}
            {...props}
            className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
            disabled={isLoading || props.disabled}
            >
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {props.children}

            </button>
        )
            
    }
)

Button.displayName = "Button"; // good for debugging

export default Button;
