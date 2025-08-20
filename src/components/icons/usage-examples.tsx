// Example: Using Figma icons in the services bento grid
// This shows how to replace existing icons with custom Figma icons

// Usage examples for Figma icons. Remove or update these examples as needed.
// Note: do not import non-existent icons here; replace with real components when available.
const _servicesWithFigmaIcons = [
    {
        id: "cybersecurity",
        title: "Cybersecurity",
        description: "Enterprise-grade cybersecurity services and consulting.",
        icon: null, // Replace with your Figma icon component
        href: '/services/cybersecurity',
        className: 'md:col-span-2',
        categories: ['cyber', 'it'],
    },
    // ... more services
];

// Example: Using in ProductsBentoGrid.tsx (placeholder example)
const _productsWithFigmaIcons = [
    {
        id: "gms",
        titleKey: "products.gms.title",
        descriptionKey: "products.gms.description",
        icon: null, // Replace with your Figma icon component
        category: "featured",
        tags: ["Cloud-Based", "Workflow Automation"],
        size: { width: 2, height: 1 },
        className: "col-span-2",
        priority: 1,
    },
    // ... more products
];
