import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import * as React from "react"

import { cn } from "@/lib/utils"

const bannerVariants = cva(
    "relative w-full border px-4 py-3 text-sm [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
    {
        variants: {
            variant: {
                default: "bg-background text-foreground",
                destructive:
                    "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
                primary: "border-primary/50 bg-primary/5 text-primary dark:border-primary",
                secondary: "border-secondary/50 bg-secondary/5 text-secondary dark:border-secondary",
            },
            inset: {
                true: "rounded-lg",
                false: "",
            },
        },
        defaultVariants: {
            variant: "default",
            inset: false,
        },
    }
)

const Banner = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof bannerVariants>
>(({ className, variant, inset, ...props }, ref) => (
    <div
        ref={ref}
        role="banner"
        className={cn(bannerVariants({ variant, inset }), className)}
        {...props}
    />
))
Banner.displayName = "Banner"

const BannerClose = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
    <button
        ref={ref}
        className={cn(
            "absolute right-4 top-4 rounded-sm opacity-100 bg-background/80 hover:bg-background ring-offset-background transition-all hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none p-1",
            className
        )}
        {...props}
    >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
    </button>
))
BannerClose.displayName = "BannerClose"

const BannerTitle = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h5
        ref={ref}
        className={cn("mb-1 font-medium leading-none tracking-tight", className)}
        {...props}
    />
))
BannerTitle.displayName = "BannerTitle"

const BannerDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("text-sm [&_p]:leading-relaxed", className)}
        {...props}
    />
))
BannerDescription.displayName = "BannerDescription"

export { Banner, BannerClose, BannerDescription, BannerTitle, bannerVariants }

