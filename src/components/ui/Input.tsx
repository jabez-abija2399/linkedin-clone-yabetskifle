import * as React from "react";
import { cn } from "@/lib/utils";

// 1. Extend standard HTML Input props (so we can use type="password", placeholder="...", etc.)
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

// 2. Use forwardRef again (so forms can focus this input automatically on error)
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {/* 3. Optional Label */}
        {label && (
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        
        {/* 4. The actual input */}
        <input
          type={type}
          className={cn(
            // Base styles: height, rounded, border, background, typography
            "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm",
            "placeholder:text-muted disabled:cursor-not-allowed disabled:opacity-50",
            // Focus styles: remove default outline, add a ring with our primary color
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
            // Error state: if error exists, make border red
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          ref={ref}
          {...props}
        />
        
        {/* 5. Error Message */}
        {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };