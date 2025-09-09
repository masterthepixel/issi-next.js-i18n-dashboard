// Context-specific variants using your theme variables
export const productCardVariants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
    featured: "bg-accent text-accent-foreground hover:bg-accent/90",
}

export const formButtonVariants = {
    submit: "bg-chart-2 text-chart-2-foreground hover:bg-chart-2/90",
    cancel: "bg-muted text-muted-foreground hover:bg-muted/80",
    delete: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
}

export const navigationVariants = {
    active: "bg-primary text-primary-foreground",
    inactive: "text-muted-foreground hover:text-foreground hover:bg-accent",
    featured: "bg-accent text-accent-foreground hover:bg-accent/90",
}

export const complianceVariants = {
    certified: "bg-chart-2 text-chart-2-foreground hover:bg-chart-2/90",
    pending: "bg-chart-4 text-chart-4-foreground hover:bg-chart-4/90",
    expired: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
}

export const eLearningVariants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    accent: "bg-accent text-accent-foreground hover:bg-accent/90",
    gradient: "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow hover:from-primary/90 hover:to-secondary/80",
}

export const heroVariants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow",
    outline: "border-2 border-border bg-background hover:bg-accent hover:text-accent-foreground shadow",
    ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
}

export const testimonialVariants = {
    default: "bg-muted text-muted-foreground hover:bg-muted/80",
    featured: "bg-accent text-accent-foreground hover:bg-accent/90",
    outline: "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
}

export const statsVariants = {
    success: "bg-chart-2 text-chart-2-foreground",
    warning: "bg-chart-4 text-chart-4-foreground",
    info: "bg-primary text-primary-foreground",
    default: "bg-muted text-muted-foreground",
}

export const filterVariants = {
    active: "bg-primary text-primary-foreground",
    inactive: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    pill: "rounded-full px-4 py-2 ",
}

export const actionVariants = {
    view: "text-primary hover:text-primary/80 underline-offset-4 hover:underline",
    edit: "text-chart-2 hover:text-chart-2/80",
    delete: "text-destructive hover:text-destructive/80",
    download: "text-chart-4 hover:text-chart-4/80",
}

export const socialVariants = {
    default: "bg-muted text-muted-foreground hover:bg-muted/80",
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
}

export const utilityVariants = {
    copy: "bg-muted text-muted-foreground hover:bg-muted/80",
    share: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    print: "bg-accent text-accent-foreground hover:bg-accent/90",
    bookmark: "bg-chart-4 text-chart-4-foreground hover:bg-chart-4/90",
}

export const sizeVariants = {
    xs: "h-7 px-2 text-xs",
    sm: "h-8 px-3 ",
    md: "h-9 px-4 py-2",
    lg: "h-10 px-6 text-base",
    xl: "h-12 px-8 text-lg",
    icon: "h-10 w-10",
}

export const stateVariants = {
    default: "",
    loading: "cursor-not-allowed opacity-70",
    disabled: "cursor-not-allowed opacity-50",
    success: "bg-chart-2 text-chart-2-foreground",
    error: "bg-destructive text-destructive-foreground",
    warning: "bg-chart-4 text-chart-4-foreground",
}

// Helper functions for common button patterns
export const getButtonVariant = (context: string, type: string = 'default') => {
    switch (context) {
        case 'product':
            return productCardVariants[type as keyof typeof productCardVariants] || productCardVariants.primary;
        case 'form':
            return formButtonVariants[type as keyof typeof formButtonVariants] || formButtonVariants.submit;
        case 'navigation':
            return navigationVariants[type as keyof typeof navigationVariants] || navigationVariants.inactive;
        case 'compliance':
            return complianceVariants[type as keyof typeof complianceVariants] || complianceVariants.certified;
        case 'elearning':
            return eLearningVariants[type as keyof typeof eLearningVariants] || eLearningVariants.primary;
        case 'hero':
            return heroVariants[type as keyof typeof heroVariants] || heroVariants.primary;
        case 'testimonial':
            return testimonialVariants[type as keyof typeof testimonialVariants] || testimonialVariants.default;
        case 'stats':
            return statsVariants[type as keyof typeof statsVariants] || statsVariants.default;
        case 'filter':
            return filterVariants[type as keyof typeof filterVariants] || filterVariants.inactive;
        case 'action':
            return actionVariants[type as keyof typeof actionVariants] || actionVariants.view;
        case 'social':
            return socialVariants[type as keyof typeof socialVariants] || socialVariants.default;
        case 'utility':
            return utilityVariants[type as keyof typeof utilityVariants] || utilityVariants.copy;
        default:
            return "bg-primary text-primary-foreground hover:bg-primary/90";
    }
};

export const getButtonSize = (size: string = 'default') => {
    return sizeVariants[size as keyof typeof sizeVariants] || sizeVariants.md;
};

export const getButtonState = (state: string = 'default') => {
    return stateVariants[state as keyof typeof stateVariants] || stateVariants.default;
};
