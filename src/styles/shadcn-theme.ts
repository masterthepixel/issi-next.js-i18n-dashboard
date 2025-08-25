// Minimal theme tokens for shadcn/ui migration
// This file centralizes a small set of design tokens used across components.
// It's intentionally minimal: expand as needed.

export const shadcnTheme = {
    fonts: {
        sans: "var(--font-sans)",
        serif: "var(--font-serif)",
    },
    colors: {
        primary: "hsl(220 90% 56%)",
        foreground: "hsl(210 14% 15%)",
        background: "hsl(0 0% 100%)",
        muted: "hsl(210 10% 96%)",
    },
    radii: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        full: "9999px",
    },
    sizes: {
        container: "1200px",
    },
} as const;

export type ShadcnTheme = typeof shadcnTheme;

export default shadcnTheme;
