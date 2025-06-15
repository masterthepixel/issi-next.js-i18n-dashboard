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
