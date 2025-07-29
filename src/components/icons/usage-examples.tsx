// Example: Using Figma icons in the services bento grid
// This shows how to replace existing icons with custom Figma icons

import { CustomProductsIcon, CustomServicesIcon } from '@/components/icons';

// Example of how to update the services array in ISSIServicesShowcase.tsx
const servicesWithFigmaIcons = [
    {
        id: "cybersecurity",
        title: intl.formatMessage({ id: 'services.items.cybersecurity.title' }),
        description: intl.formatMessage({ id: 'services.items.cybersecurity.description' }),
        icon: CustomServicesIcon, // Replace with your Figma icon
        href: '/services/cybersecurity',
        className: 'md:col-span-2',
        categories: ['cyber', 'it'],
    },
    // ... more services
];

// Example: Using in ProductsBentoGrid.tsx
const productsWithFigmaIcons = [
    {
        id: "gms",
        titleKey: "products.gms.title",
        descriptionKey: "products.gms.description",
        icon: CustomProductsIcon, // Replace with your Figma icon
        category: "featured",
        tags: ["Cloud-Based", "Workflow Automation"],
        size: { width: 2, height: 1 },
        className: "col-span-2",
        priority: 1,
    },
    // ... more products
];
