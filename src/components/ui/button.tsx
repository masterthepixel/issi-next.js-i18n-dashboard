
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

// Enhanced button variants using your existing theme variables
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",

        // NEW ENHANCED VARIANTS USING THEME VARIABLES
        loading: "bg-primary text-primary-foreground shadow cursor-not-allowed opacity-70",
        success: "bg-chart-2 text-chart-2-foreground shadow hover:bg-chart-2/90",
        warning: "bg-chart-4 text-chart-4-foreground shadow hover:bg-chart-4/90",
        danger: "bg-destructive text-destructive-foreground shadow hover:bg-destructive/90",
        gradient: "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow hover:from-primary/90 hover:to-secondary/80",
        pill: "rounded-full px-4 py-2",
        icon: "h-10 w-10 rounded-full p-0",
        featured: "bg-accent text-accent-foreground shadow hover:bg-accent/90",
        subtle: "bg-muted text-muted-foreground hover:bg-muted/80",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-9 w-9",
      },
      state: {
        default: "",
        loading: "cursor-not-allowed opacity-70",
        disabled: "cursor-not-allowed opacity-50",
        success: "bg-chart-2 text-chart-2-foreground",
        error: "bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  loadingText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant,
    size,
    state,
    asChild = false,
    loading = false,
    loadingText = "Loading...",
    leftIcon,
    rightIcon,
    fullWidth = false,
    children,
    disabled,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    const isDisabled = disabled || loading

    // Auto-set state based on props
    const currentState = loading ? "loading" : state || "default"

    // Warn in development if asChild is used with icons
    if (process.env.NODE_ENV === 'development' && asChild && (leftIcon || rightIcon)) {
      console.warn('Button: leftIcon and rightIcon are ignored when asChild is true. Icons should be included in the child component instead.')
    }

    // When using asChild, handle children properly for Slot component
    const safeChildren = asChild
      ? (React.Children.count(children) === 1 && React.isValidElement(children)
        ? children // Pass the single valid React element directly
        : <div className="inline-flex items-center">{children}</div>) // Wrap multiple/invalid children
      : children

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, state: currentState }),
          fullWidth && "w-full",
          className
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {/* When using asChild (Slot) we must not inject additional sibling elements
            because the Slot expects a single child element. Only render icons/spinner
            when rendering a native <button>. */}
        {!asChild && loading && (
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {!asChild && leftIcon && !loading && <span className="button-left-icon">{leftIcon}</span>}
        {loading && !asChild ? loadingText : safeChildren}
        {!asChild && rightIcon && !loading && <span className="button-right-icon">{rightIcon}</span>}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants };

