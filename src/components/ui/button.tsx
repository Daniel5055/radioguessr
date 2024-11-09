import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
        variant: {
            primary: "text-white bg-primary-600 hover:bg-primary-700 focus-visible:ring-primary-500",
            secondary: "text-primary-600 bg-primary-100 hover:bg-primary-200 focus-visible:ring-primary-500",
            danger: "text-white bg-red-600 hover:bg-red-700 focus-visible:ring-red-500",
        },
        size: {
            sm: "px-2.5 py-1.5",
            md: "px-3 py-2",
            lg: "px-4 py-2.5",
        },
        },
    }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, variant = "primary", size = "md", className, children, ...props }, ref) => {
    const classes = cn(
      buttonVariants({ variant, size }),
      className
    )

    if (asChild) {
      return (
        <span className={classes} {...props}>
          {children}
        </span>
      )
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }