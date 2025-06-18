# BentoGrid Creation Guide for ISSI Multilingual Website

This comprehensive guide explains how to create, implement, and localize BentoGrid components within the ISSI Next.js multilingual website project, following established patterns and best practices.

## Table of Contents

1. [Overview](#overview)
2. [BentoGrid Architecture](#bentogrid-architecture)
3. [Creating a New BentoGrid Component](#creating-a-new-bentogrid-component)
4. [Internationalization Implementation](#internationalization-implementation)
5. [Styling and Design Patterns](#styling-and-design-patterns)
6. [Integration with Pages](#integration-with-pages)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)

## Overview

BentoGrids in the ISSI project are responsive, grid-based layout components that showcase content in an organized, visually appealing manner. They follow Apple's design language and are fully internationalized to support English, French, and Spanish.

### Current BentoGrid Implementations

- **ISSIServicesShowcase**: Services page grid with 6 main service categories
- **ProductsBentoGrid**: Products page grid with filterable product categories
- **GovernmentHero**: Government page grid highlighting government-specific services

## BentoGrid Architecture

### Core Components Structure

```
src/components/ui/
├── bento-grid.tsx          # Base BentoGrid and BentoGridItem components
└── ...

src/components/
├── [Name]BentoGrid.tsx     # Main component (client-side)
├── [Name]BentoGridWrapper.tsx # Wrapper with i18n provider
└── ...
```

### File Naming Conventions

- **Main Component**: `[PageName]BentoGrid.tsx` (e.g., `ProductsBentoGrid.tsx`)
- **Wrapper Component**: `[PageName]BentoGridWrapper.tsx` (e.g., `ProductsBentoGridWrapper.tsx`)
- **Page Integration**: Used in `src/app/[lang]/[page]/page.tsx`

## Creating a New BentoGrid Component

### Step 1: Create the Main BentoGrid Component

Create a new file `src/components/[Name]BentoGrid.tsx`:

```tsx
"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { FormattedMessage } from "react-intl";

// Data structure - move outside component for performance
const gridData = [
  {
    id: 1,
    titleKey: "page.section.item1.title",
    descriptionKey: "page.section.item1.description",
    category: "Category1",
    icon: "🔧",
    className: "md:col-span-2", // Grid positioning
  },
  {
    id: 2,
    titleKey: "page.section.item2.title",
    descriptionKey: "page.section.item2.description",
    category: "Category2",
    icon: "⚡",
    className: "md:col-span-1",
  },
  // Add more items as needed
];

interface YourBentoGridProps {
  lang: string;
}

export default function YourBentoGrid({ lang }: YourBentoGridProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  // Extract unique categories for filtering
  const categories = ["All", ...Array.from(new Set(gridData.map((item) => item.category)))];

  // Filter items based on active filter
  const filteredItems = activeFilter === "All" ? gridData : gridData.filter((item) => item.category === activeFilter);

  return (
    <div className="w-full">
      {/* Filter Tabs (Optional) */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
              activeFilter === category
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            )}
          >
            <FormattedMessage id={`page.section.categories.${category.toLowerCase()}`} />
          </button>
        ))}
      </div>

      {/* BentoGrid */}
      <BentoGrid className="max-w-7xl mx-auto">
        {filteredItems.map((item) => (
          <BentoGridItem
            key={item.id}
            title={<FormattedMessage id={item.titleKey} />}
            description={<FormattedMessage id={item.descriptionKey} />}
            header={<div className="flex h-full w-full items-center justify-center text-4xl">{item.icon}</div>}
            className={item.className}
          />
        ))}
      </BentoGrid>
    </div>
  );
}
```

### Step 2: Create the Wrapper Component

Create `src/components/[Name]BentoGridWrapper.tsx`:

```tsx
"use client";

import { IntlProvider } from "react-intl";
import YourBentoGrid from "./YourBentoGrid";
import { Locale } from "@/lib/definitions";

interface YourBentoGridWrapperProps {
  locale: Locale;
  messages: Record<string, string>;
}

export default function YourBentoGridWrapper({ locale, messages }: YourBentoGridWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <YourBentoGrid lang={locale} />
    </IntlProvider>
  );
}
```

### Step 3: Add Translation Keys

Add translations to each language file in `src/lang/`:

**English (`src/lang/en.json`)**:

```json
{
  "page.section.categories.all": "All",
  "page.section.categories.category1": "Category 1",
  "page.section.categories.category2": "Category 2",
  "page.section.item1.title": "Item 1 Title",
  "page.section.item1.description": "Description for item 1",
  "page.section.item2.title": "Item 2 Title",
  "page.section.item2.description": "Description for item 2"
}
```

**French (`src/lang/fr.json`)**:

```json
{
  "page.section.categories.all": "Tout",
  "page.section.categories.category1": "Catégorie 1",
  "page.section.categories.category2": "Catégorie 2",
  "page.section.item1.title": "Titre de l'élément 1",
  "page.section.item1.description": "Description de l'élément 1",
  "page.section.item2.title": "Titre de l'élément 2",
  "page.section.item2.description": "Description de l'élément 2"
}
```

**Spanish (`src/lang/es.json`)**:

```json
{
  "page.section.categories.all": "Todo",
  "page.section.categories.category1": "Categoría 1",
  "page.section.categories.category2": "Categoría 2",
  "page.section.item1.title": "Título del elemento 1",
  "page.section.item1.description": "Descripción del elemento 1",
  "page.section.item2.title": "Título del elemento 2",
  "page.section.item2.description": "Descripción del elemento 2"
}
```

## Internationalization Implementation

### Server Component Integration

In your page file (`src/app/[lang]/[page]/page.tsx`):

```tsx
import { getIntl } from "@/app/[lang]/i18n";
import YourBentoGridWrapper from "@/components/YourBentoGridWrapper";

interface PageProps {
  params: {
    lang: string;
  };
}

export default async function YourPage({ params: { lang } }: PageProps) {
  const intl = await getIntl(lang);

  // Load messages for client components
  const messages = await import(`@/lang/${lang}.json`).then((module) => module.default);

  return (
    <main className="min-h-screen">
      <YourBentoGridWrapper locale={lang} messages={messages} />
    </main>
  );
}
```

### Translation Key Patterns

Follow these naming conventions for consistency:

```
[page].[section].[element].[property]

Examples:
- products.bentogrid.categories.all
- services.showcase.item1.title
- government.hero.capabilities.description
```

## Styling and Design Patterns

### Grid Layout Classes

Common `className` patterns for BentoGridItem positioning:

```tsx
// Recommended layouts (single row height)
"md:col-span-1"; // Single column, standard height
"md:col-span-2"; // Double width, standard height

// Legacy layouts (avoid for consistency)
// "md:col-span-3"; // Triple width - breaks responsive design
// "md:row-span-2"; // Double height - creates layout inconsistency

// Current best practice: All cards use single row height
"md:col-span-1"; // Most common - balanced grid appearance
"md:col-span-2"; // Featured content - maintains visual harmony
```

**Important**: For optimal grid consistency, all cards should use single row height (`height: 1`) to ensure uniform visual balance and predictable responsive behavior.

### Color and Theme Integration

Follow the established color palette:

```tsx
// Filter buttons
"bg-slate-900 text-white dark:bg-white dark:text-slate-900"; // Active
"bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"; // Inactive

// Card backgrounds
"bg-white dark:bg-slate-800"; // Standard cards
"bg-slate-50 dark:bg-slate-900"; // Alternate cards
```

### Animation and Hover Effects

Standard hover animations:

```tsx
className = "transition-all duration-200 hover:scale-105";
```

## Integration with Pages

### Page Structure Pattern

```tsx
// Page component structure
export default async function Page({ params: { lang } }: PageProps) {
  const intl = await getIntl(lang);
  const messages = await import(`@/lang/${lang}.json`).then((module) => module.default);

  return (
    <main className="grid-background min-h-screen">
      {/* Hero Section */}
      <section className="py-20">
        <YourBentoGridWrapper locale={lang} messages={messages} />
      </section>

      {/* Additional sections... */}
    </main>
  );
}
```

### SEO and Metadata

Add proper metadata for each page:

```tsx
export async function generateMetadata({ params: { lang } }: PageProps): Promise<Metadata> {
  const intl = await getIntl(lang);

  return {
    title: intl.formatMessage({ id: "page.meta.title" }),
    description: intl.formatMessage({ id: "page.meta.description" }),
  };
}
```

## Best Practices

### Performance Optimization

1. **Move data outside components**:

   ```tsx
   // ✅ Good - outside component
   const gridData = [...]

   export default function Component() {
     // Component logic
   }
   ```

2. **Use React.memo for pure components**:

   ```tsx
   export default React.memo(YourBentoGrid);
   ```

3. **Optimize re-renders**:

   ```tsx
   const filteredItems = useMemo(
     () => (activeFilter === "All" ? gridData : gridData.filter((item) => item.category === activeFilter)),
     [activeFilter]
   );
   ```

### Code Organization

1. **Consistent file structure**
2. **Clear naming conventions**
3. **Proper TypeScript interfaces**
4. **Comprehensive error handling**

### Accessibility

1. **Proper ARIA labels**:

   ```tsx
   <button
     aria-label={intl.formatMessage({ id: 'filter.button.aria.label' })}
     aria-pressed={activeFilter === category}
   >
   ```

2. **Keyboard navigation support**
3. **Screen reader compatibility**

## Troubleshooting

### Common Issues

1. **Missing `lang` prop error**:

   ```
   Property 'lang' is missing in type '{}' but required in type 'Props'
   ```

   **Solution**: Ensure wrapper component passes `lang={locale}` prop

2. **Translation keys not found**:

   ```
   [React Intl] Missing message: "key.name"
   ```

   **Solution**: Verify keys exist in all language files

3. **IntlProvider context error**:

   ```
   Error: [React Intl] Could not find required 'intl' object
   ```

   **Solution**: Ensure component is wrapped with IntlProvider

### Build Validation

Run these commands before deployment:

```bash
# Validate JSON files
pnpm run validate:json

# Check TypeScript compilation
pnpm run build

# Run linting
pnpm run lint
```

## Example Implementation Reference

See these existing implementations for reference:

1. **ProductsBentoGrid**: Products page with filtering
2. **ISSIServicesShowcase**: Services page showcase
3. **GovernmentHero**: Government page hero section

Each follows the patterns outlined in this guide and can serve as templates for new implementations.

---

## Summary

This guide provides a complete framework for creating internationalized BentoGrid components in the ISSI project. Follow these patterns to ensure consistency, maintainability, and proper localization across all languages.

For additional help, refer to:

- [COMPONENT_INTEGRATION_GUIDE.md](./COMPONENT_INTEGRATION_GUIDE.md)
- [INTERNATIONALIZATION.md](./INTERNATIONALIZATION.md)
- [COLOR_PALETTE_INSTRUCTIONS.md](./COLOR_PALETTE_INSTRUCTIONS.md)

## Advanced Features and Patterns

### Alternating Icon Colors

For enhanced visual appeal, implement alternating icon colors:

```tsx
export default function YourBentoGrid({ lang }: YourBentoGridProps) {
  const intl = useIntl();
  
  // Define alternating icon colors
  const iconColors = [
    "text-blue-600 dark:text-blue-400",
    "text-green-600 dark:text-green-400", 
    "text-purple-600 dark:text-purple-400",
    "text-orange-600 dark:text-orange-400",
    "text-red-600 dark:text-red-400",
    "text-indigo-600 dark:text-indigo-400",
    "text-teal-600 dark:text-teal-400",
    "text-pink-600 dark:text-pink-400",
  ];

  return (
    <BentoGrid className="max-w-7xl mx-auto">
      {items.map((item, index) => {
        const IconComponent = item.icon;
        const iconColorClass = iconColors[index % iconColors.length];
        
        return (
          <div key={item.id} className={item.className}>
            <div className="flex justify-start">
              <IconComponent className={`text-3xl ${iconColorClass}`} />
            </div>
            {/* Rest of card content */}
          </div>
        );
      })}
    </BentoGrid>
  );
}
```

### Hybrid Translation System

Implement flexible translation support with fallbacks:

```tsx
// Product interface supporting both translation keys and direct text
interface Product {
  id: string;
  title?: string;        // Fallback text
  titleKey?: string;     // Translation key
  description?: string;  // Fallback text
  descriptionKey?: string; // Translation key
  // ... other properties
}

// Rendering with fallback support
<h3 className="font-semibold text-slate-900 dark:text-slate-100">
  {product.titleKey ? intl.formatMessage({ id: product.titleKey }) : product.title}
</h3>
<p className="text-slate-600 dark:text-slate-300">
  {product.descriptionKey ? intl.formatMessage({ id: product.descriptionKey }) : product.description}
</p>
```

### Interactive Elements

#### Cursor Pointer for Clickable Cards

Add visual feedback for interactive cards:

```tsx
<div className="cursor-pointer hover:shadow-xl transition duration-300">
  {/* Card content */}
</div>
```

#### Left-Aligned Filter Tabs

For better layout hierarchy:

```tsx
<div className="flex flex-wrap justify-start gap-2 mb-12">
  {categories.map((category) => (
    <button key={category} className="filter-button">
      {intl.formatMessage({ id: `products.categories.${category}` })}
    </button>
  ))}
</div>
```

### Component Architecture Best Practices

#### Wrapper Component with IntlProvider

```tsx
"use client";

import { IntlProvider } from "react-intl";
import YourBentoGrid from "./YourBentoGrid";
import { Locale } from "@/lib/definitions";

interface YourBentoGridWrapperProps {
  locale: Locale;
  messages: Record<string, string>;
}

export default function YourBentoGridWrapper({ locale, messages }: YourBentoGridWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <YourBentoGrid lang={locale} />
    </IntlProvider>
  );
}
```

#### TypeScript Interfaces

```tsx
interface BentoGridItem {
  id: string;
  titleKey?: string;
  title?: string;
  descriptionKey?: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  tags?: string[];
  size: { width: number; height: number };
  className: string;
  priority?: number;
}
```

---

_Last updated: June 15, 2025_
_Author: ISSI Development Team_

## Advanced Styling and Visual Enhancements

### Category-Based Color Coordination System

Implement consistent color theming across all card elements (icons, borders, titles, filters):

```tsx
// Define category-specific color mappings
const categoryColors = {
  featured: {
    icon: "text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
    hover: "hover:border-blue-400 dark:hover:border-blue-500"
  },
  project: {
    icon: "text-green-600 dark:text-green-400", 
    border: "border-green-200 dark:border-green-800",
    hover: "hover:border-green-400 dark:hover:border-green-500"
  },
  hr: {
    icon: "text-purple-600 dark:text-purple-400",
    border: "border-purple-200 dark:border-purple-800", 
    hover: "hover:border-purple-400 dark:hover:border-purple-500"
  },
  compliance: {
    icon: "text-orange-600 dark:text-orange-400",
    border: "border-orange-200 dark:border-orange-800",
    hover: "hover:border-orange-400 dark:hover:border-orange-500"
  },
  data: {
    icon: "text-red-600 dark:text-red-400",
    border: "border-red-200 dark:border-red-800",
    hover: "hover:border-red-400 dark:hover:border-red-500"
  },
  modernization: {
    icon: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-200 dark:border-indigo-800", 
    hover: "hover:border-indigo-400 dark:hover:border-indigo-500"
  },
  technology: {
    icon: "text-teal-600 dark:text-teal-400",
    border: "border-teal-200 dark:border-teal-800",
    hover: "hover:border-teal-400 dark:hover:border-teal-500"
  }
};

// Function to get colors for any category
const getCategoryColors = (category: string) => {
  return categoryColors[category as keyof typeof categoryColors] || {
    icon: "text-slate-600 dark:text-slate-400",
    border: "border-gray-200 dark:border-gray-700",
    hover: "hover:border-gray-400 dark:hover:border-gray-500"
  };
};
```

### Enhanced Card Structure with Color Coordination

```tsx
{filteredProducts.map((product, index) => {
  const IconComponent = product.icon;
  const colors = getCategoryColors(product.category);
  
  return (
    <div
      key={product.id}
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition-all duration-300 shadow-input dark:shadow-none p-1 bg-gradient-to-br from-transparent via-transparent to-transparent relative min-h-[200px] cursor-pointer",
        // Category-specific glow effects
        "hover:shadow-2xl hover:scale-[1.02]",
        product.category === "featured" && "hover:shadow-blue-500/20 hover:[box-shadow:0_0_30px_-5px_rgb(59_130_246_/_0.5)]",
        product.category === "project" && "hover:shadow-green-500/20 hover:[box-shadow:0_0_30px_-5px_rgb(34_197_94_/_0.5)]",
        product.category === "hr" && "hover:shadow-purple-500/20 hover:[box-shadow:0_0_30px_-5px_rgb(147_51_234_/_0.5)]",
        // ... other categories
        product.className
      )}
    >              
      {/* Card Content with Coordinated Colors */}
      <div className={cn(
        "relative flex h-full flex-col justify-between p-4 rounded-lg border-2 transition-all duration-300 bg-white dark:bg-slate-800/80 backdrop-blur-sm",
        colors.border,
        colors.hover,
        "group-hover/bento:border-opacity-60 group-hover/bento:bg-white/90 dark:group-hover/bento:bg-slate-800/90"
      )}>
        {/* Icon with category color */}
        <div className="flex justify-start">
          <IconComponent className={cn(
            "text-3xl transition-all duration-300",
            colors.icon,
            "group-hover/bento:drop-shadow-lg"
          )} />
        </div>

        {/* Title with matching category color */}
        <div className="mt-auto">
          <h3 className={cn(
            "font-semibold tracking-tight text-xl mb-2 transition duration-300",
            colors.icon, // Use same color as icon
            "dark:text-slate-100" // Override for dark mode readability
          )}>
            {product.titleKey ? intl.formatMessage({ id: product.titleKey }) : product.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-sm">
            {product.descriptionKey ? intl.formatMessage({ id: product.descriptionKey }) : product.description}
          </p>
        </div>
      </div>
    </div>
  );
})}
```

### WCAG AAA Compliant Filter Buttons

Implement accessible filter buttons with category-coordinated colors:

```tsx
// WCAG AAA compliant button colors
const getButtonColors = (category: string, isActive: boolean) => {
  const colors = {
    featured: {
      active: "bg-blue-700 text-white border-blue-700 dark:bg-blue-600 dark:border-blue-600",
      inactive: "bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700",
      hover: "hover:border-blue-600 dark:hover:border-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/50"
    },
    // ... other categories with -700 shades for better contrast
  };

  const categoryColor = colors[category as keyof typeof colors] || colors.All;
  return isActive ? categoryColor.active : `${categoryColor.inactive} ${categoryColor.hover}`;
};

// Accessible filter implementation
<div className="flex flex-wrap justify-start gap-2 mb-12" role="tablist" aria-label="Product category filters">
  {categories.map((category) => (
    <button
      key={category}
      onClick={() => setActiveFilter(category)}
      className={cn(
        "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
        getButtonColors(category, activeFilter === category)
      )}
      role="tab"
      aria-selected={activeFilter === category ? "true" : "false"}
      aria-controls={`products-${category.toLowerCase()}`}
      tabIndex={activeFilter === category ? 0 : -1}
    >
      {categoryMap[category as keyof typeof categoryMap] || category}
    </button>
  ))}
</div>
```

### CSS-Based Glowing Effects

Implement performant glowing effects using pure CSS:

```tsx
// Category-specific glow classes in component
className={cn(
  "hover:shadow-2xl hover:scale-[1.02]",
  // Category-specific glow effects
  product.category === "featured" && "hover:shadow-blue-500/20 hover:[box-shadow:0_0_30px_-5px_rgb(59_130_246_/_0.5)]",
  product.category === "project" && "hover:shadow-green-500/20 hover:[box-shadow:0_0_30px_-5px_rgb(34_197_94_/_0.5)]",
  product.category === "hr" && "hover:shadow-purple-500/20 hover:[box-shadow:0_0_30px_-5px_rgb(147_51_234_/_0.5)]",
  product.category === "compliance" && "hover:shadow-orange-500/20 hover:[box-shadow:0_0_30px_-5px_rgb(234_88_12_/_0.5)]",
  product.category === "data" && "hover:shadow-red-500/20 hover:[box-shadow:0_0_30px_-5px_rgb(220_38_38_/_0.5)]",
  product.category === "modernization" && "hover:shadow-indigo-500/20 hover:[box-shadow:0_0_30px_-5px_rgb(79_70_229_/_0.5)]",
  product.category === "technology" && "hover:shadow-teal-500/20 hover:[box-shadow:0_0_30px_-5px_rgb(13_148_136_/_0.5)]"
)}
```

### Double Height Cards Configuration

For featured content that needs more visual prominence:

```tsx
// In your product data array
{
  id: "employee-performance",
  title: "Employee Performance",
  description: "360-degree feedback system with automated performance reviews and goal tracking.",
  icon: FaChartLine,
  category: "hr",
  tags: ["360 Feedback", "Goal Tracking"],
  size: { width: 1, height: 2 }, // Double height
  className: "col-span-1 row-span-2", // CSS Grid classes
  priority: 11,
}
```

**Best Practice**: Use double height sparingly for featured content (max 4 cards per grid) to maintain visual balance.

### Enhanced Visual Effects

```tsx
// Enhanced hover animations and visual feedback
className={cn(
  "transition-all duration-300",
  "group-hover/bento:scale-[1.02]", // Subtle scale on hover
  "group-hover/bento:border-opacity-60", // Border fade effect
  "group-hover/bento:bg-white/90 dark:group-hover/bento:bg-slate-800/90", // Background enhancement
  "backdrop-blur-sm", // Subtle blur effect
)}

// Icon enhancements
<IconComponent className={cn(
  "text-3xl transition-all duration-300",
  colors.icon,
  "group-hover/bento:drop-shadow-lg" // Drop shadow on hover
)} />
```

## Accessibility Enhancements (WCAG AAA)

### Color Contrast Standards

- **Active buttons**: Use `-700` color shades for 7:1+ contrast ratio
- **Inactive buttons**: Use `-800` text on light backgrounds
- **Dark mode**: Use `-200` text colors for proper contrast
- **Focus indicators**: Blue focus ring with offset for keyboard navigation

### ARIA Implementation

```tsx
// Proper ARIA attributes for filter tabs
role="tablist"
aria-label="Product category filters"
role="tab"
aria-selected={activeFilter === category ? "true" : "false"}
aria-controls={`products-${category.toLowerCase()}`}
tabIndex={activeFilter === category ? 0 : -1}

// Focus management
focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
```

### Keyboard Navigation

- **Tab order**: Only active filter in tab sequence
- **Focus indicators**: Clear visual feedback
- **Screen reader support**: Proper labels and descriptions

## Implementation Checklist for New BentoGrids

When creating a new BentoGrid, ensure you implement:

- ✅ **Category-based color coordination** (icons, borders, titles, filters)
- ✅ **WCAG AAA compliant filter buttons** with proper contrast ratios
- ✅ **CSS-based glowing effects** for performance
- ✅ **Accessible ARIA attributes** and keyboard navigation
- ✅ **Consistent card structure** with coordinated colors
- ✅ **Double height cards** for featured content (sparingly)
- ✅ **Enhanced hover effects** with shadows and scaling
- ✅ **Dark mode support** for all color variants
- ✅ **Internationalization** with proper translation keys
- ✅ **TypeScript interfaces** for type safety

## Color Palette Reference

Use these specific color combinations for consistency:

```tsx
// Primary category colors
featured: blue-600/700/800    // #2563eb / #1d4ed8 / #1e40af
project: green-600/700/800    // #16a34a / #15803d / #166534
hr: purple-600/700/800        // #9333ea / #7c3aed / #6b21d4
compliance: orange-600/700/800 // #ea580c / #c2410c / #9a3412
data: red-600/700/800         // #dc2626 / #b91c1c / #991b1b
modernization: indigo-600/700/800 // #4f46e5 / #4338ca / #3730a3
technology: teal-600/700/800  // #0d9488 / #0f766e / #115e59
```

This ensures visual consistency across all BentoGrid implementations while maintaining excellent accessibility standards.
