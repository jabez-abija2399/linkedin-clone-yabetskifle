import * as React from "react";
import { cn } from "@/lib/utils";

// 1. The Container
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      // bg-surface acts as White, shadow-sm gives it that subtle lift
      className={cn("rounded-lg border border-border bg-surface text-surface-foreground shadow-sm", className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

// the content Area adds padding
const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({className, ...props}, ref) => (
        <div
        ref={ref}
        className={cn("p-6 pt-0", className)}
        {...props}
        />
    )
)
CardContent.displayName = "CardContent"

// the Header
const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({className, ...props}, ref) => (
        <div
        ref={ref}
        className={cn("flex flex-col space-y-1.5 p-6", className)}
        {...props}
        />
    )
)

CardHeader.displayName = "CardHeader"

// the Title

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({className, ...props}, ref) => (
        <h3
        ref={ref}
        className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
        {...props}
        />
    )
)

CardTitle.displayName = "CardTitle"

export {Card, CardContent, CardHeader, CardTitle}
