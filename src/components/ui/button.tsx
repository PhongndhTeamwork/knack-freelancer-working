import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
        variant: {
            primary:
                "bg-gradient-to-br from-blue-600 to-blue-700 text-primary-foreground hover:from-blue-700 hover:to-blue-700 active:from-blue-600 active:to-blue-700",
            white:
                "bg-white text-black hover:bg-gray-200 active:bg-gray-100",
            danger:
                "bg-gradient-to-br from-red-600 to-red-700 text-destructive-foreground hover:from-red-700 hover:to-red-700 active:from-red-600 active:to-red-700",
            dark:
                "bg-gradient-to-br from-gray-800 to-gray-900 text-primary-foreground hover:from-gray-900 hover:to-gray-900 active:from-gray-800 active:to-gray-900",
            "dark-outline":
                "border border-gray-900 bg-background shadow-sm hover:bg-accent active:bg-gray-200 hover:text-accent-foreground",
            "danger-outline":
                "border border-red-500 text-red-500 bg-background shadow-sm hover:bg-accent active:bg-gray-200 hover:text-red-600",
            destructive:
                "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
            outline:
                "border border-white bg-transparent shadow-sm hover:bg-white-100 text-white hover:bg-gray-900 active:bg-gray-800",
            ghost:
                "border-transparent shadow-none hover:bg-accent active:bg-gray-200 hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
            secondary:
                "bg-neutral-100 text-black active:bg-neutral-300 hover:bg-neutral-200",
        },
        size: {
            primary: "h-[48px] px-4 py-2 rounded-3xl text-[18px]",
            sm: "h-[40px] rounded-3xl px-3 text-xs text-[16px]",
            lg: "h-10 rounded-3xl px-8",
            xl: "h-14 rounded-full px-9 text-[20px]",
            icon: "h-9 w-9",
        },
    },
    defaultVariants: {
      variant: "primary",
      size: "primary",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
