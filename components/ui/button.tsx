import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[0.375rem] px-[0.875rem] pt-[0.33rem] pb-[0.305rem] uppercase transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none b_mono",
  {
    variants: {
      variant: {
        default:
          "text-secondary-color hover:text-primary-color bg-fill",
        selected:
          "text-primary-color bg-select shadow-inset-tertiary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isSelected?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, isSelected, asChild = false, onClick, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ 
          variant: isSelected ? "selected" : variant, 
          className 
        }))}
        ref={ref}
        onClick={onClick}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, buttonVariants }
