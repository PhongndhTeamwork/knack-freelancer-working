import type React from "react"
import { cn } from "@/lib/utils"

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: "sm" | "md" | "lg" | "xl"
    variant?: "default" | "primary" | "secondary" | "ghost"
}

export const CustomSpinner = ({ size = "md", variant = "default", className, ...props }: SpinnerProps) => {
    return (
        <div
            className={cn(
                "animate-spin rounded-full border-2 border-current border-t-transparent",
                {
                    "h-4 w-4 border-[2px]": size === "sm",
                    "h-6 w-6 border-[2px]": size === "md",
                    "h-8 w-8 border-[3px]": size === "lg",
                    "h-12 w-12 border-[4px]": size === "xl",
                },
                {
                    "text-muted-foreground": variant === "default",
                    "text-primary": variant === "primary",
                    "text-secondary": variant === "secondary",
                    "text-gray-400/20 border-t-gray-400/20": variant === "ghost",
                },
                className,
            )}
            {...props}
            role="status"
            aria-label="Loading"
        />
    )
}

