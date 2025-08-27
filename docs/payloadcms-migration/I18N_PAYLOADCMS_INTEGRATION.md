# PayloadCMS i18n Integration Guide

## Overview

This document outlines how the existing Next.js i18n system (React Intl) will integrate with PayloadCMS's native localization features for a hybrid multilingual content management approach.

## Current i18n System Analysis

### **Translation Volume**

- **Total Translation Strings**: 5,148 (1,716 keys × 3 languages)
- **English**: 1,716 lines (100% complete)
- **French**: 1,805 lines (105% - includes expanded content)
- **Spanish**: 1,288 lines (75% - needs completion)

### **Current Architecture**

```text
Static JSON Files → React Intl → Components
src/lang/en.json → FormattedMessage → UI Rendering
src/lang/fr.json → intl.formatMessage → Server Components
src/lang/es.json → IntlProvider → Client Components
```

## Hybrid Translation Architecture

### **Two-Layer Translation System**

#### **Layer 1: PayloadCMS Content Translations**

- **Purpose**: Dynamic content managed by editors
- **Content Types**: Products, Pages, Blog Posts, Media descriptions
- **Management**: PayloadCMS Admin UI with native localization

#### **Layer 2: UI Element Translations**

- **Purpose**: Static interface elements and system messages
- **Content Types**: Navigation, buttons, error messages, form labels
- **Management**: Traditional JSON files with React Intl

### **Integration Flow**

```text
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  PayloadCMS     │────▶│  Combined       │────▶│   Component     │
│  Content        │     │  Translation    │     │  Provider       │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                       │                        │
         │                       │                        │
         ▼                       ▼                        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  JSON Files     │────▶│  React Intl     │◀───▶│  User Interface │
│  (UI Strings)   │     │  Provider       │     │                 │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## PayloadCMS Localization Configuration

### **Collection Schema with Localization**

```typescript
// cms/collections/Products.ts
export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "title",
  },
  // Enable localization for this collection
  localization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
    fallback: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true, // This field will be translatable
    },
    {
      name: "description",
      type: "richText",
      localized: true,
    },
    {
      name: "slug",
      type: "text",
      localized: true,
      admin: {
        position: "sidebar",
      },
    },
    // Non-localized fields (same across all languages)
    {
      name: "productId",
      type: "text",
      required: true,
      localized: false, // Same ID across all languages
    },
  ],
};
```

### **Global Settings for Site-wide Translations**

```typescript
// cms/globals/SiteSettings.ts
export const SiteSettings: GlobalConfig = {
  slug: "siteSettings",
  localization: {
    locales: ["en", "fr", "es"],
    defaultLocale: "en",
    fallback: true,
  },
  fields: [
    {
      name: "siteName",
      type: "text",
      localized: true,
    },
    {
      name: "siteDescription",
      type: "textarea",
      localized: true,
    },
    {
      name: "navigation",
      type: "array",
      localized: true,
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "href",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
```

## Frontend Integration Strategy

### **Enhanced Translation Provider**

```typescript
// src/components/providers/CombinedIntlProvider.tsx
"use client";

import { IntlProvider } from "react-intl";
import { usePayloadTranslations } from "@/hooks/usePayloadTranslations";

interface CombinedIntlProviderProps {
  locale: string;
  staticMessages: Record<string, string>; // From JSON files
  children: React.ReactNode;
}

export function CombinedIntlProvider({ locale, staticMessages, children }: CombinedIntlProviderProps) {
  const { dynamicMessages, loading } = usePayloadTranslations(locale);

  // Combine static UI translations with dynamic PayloadCMS content
  const combinedMessages = {
    ...staticMessages, // UI elements from JSON files
    ...dynamicMessages, // Content from PayloadCMS
  };

  if (loading) {
    return <div>Loading translations...</div>;
  }

  return (
    <IntlProvider locale={locale} messages={combinedMessages}>
      {children}
    </IntlProvider>
  );
}
```

### **PayloadCMS Translation Hook**

```typescript
// src/hooks/usePayloadTranslations.ts
import { useState, useEffect } from "react";
import { getPayloadClient } from "@/lib/payload";

export function usePayloadTranslations(locale: string) {
  const [dynamicMessages, setDynamicMessages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPayloadTranslations() {
      try {
        const payload = await getPayloadClient();

        // Load global settings
        const globals = await payload.findGlobal({
          slug: "siteSettings",
          locale,
        });

        // Load collections that need translations
        const products = await payload.find({
          collection: "products",
          locale,
          limit: 100,
        });

        // Transform PayloadCMS data into translation keys
        const messages: Record<string, string> = {};

        // Add global translations
        if (globals.siteName) {
          messages["site.name"] = globals.siteName;
        }
        if (globals.siteDescription) {
          messages["site.description"] = globals.siteDescription;
        }

        // Add product translations
        products.docs.forEach((product: any) => {
          const key = `products.${product.productId}`;
          messages[`${key}.title`] = product.title;
          messages[`${key}.description`] = product.description;
        });

        setDynamicMessages(messages);
      } catch (error) {
        console.error("Failed to load PayloadCMS translations:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPayloadTranslations();
  }, [locale]);

  return { dynamicMessages, loading };
}
```

## Translation Migration Strategy

### **Phase 1: Static Content to PayloadCMS**

```typescript
// scripts/migrate-static-to-payload.ts
import { getPayloadClient } from "../src/lib/payload";

interface StaticProduct {
  id: string;
  title: { en: string; fr: string; es: string };
  description: { en: string; fr: string; es: string };
  // ... other fields
}

async function migrateProductTranslations() {
  const payload = await getPayloadClient();

  // Load existing static data
  const staticProducts: StaticProduct[] = await loadStaticProducts();

  for (const staticProduct of staticProducts) {
    // Create English version first
    const englishProduct = await payload.create({
      collection: "products",
      locale: "en",
      data: {
        productId: staticProduct.id,
        title: staticProduct.title.en,
        description: staticProduct.description.en,
        // ... other fields
      },
    });

    // Add French translation
    await payload.update({
      collection: "products",
      id: englishProduct.id,
      locale: "fr",
      data: {
        title: staticProduct.title.fr,
        description: staticProduct.description.fr,
      },
    });

    // Add Spanish translation
    await payload.update({
      collection: "products",
      id: englishProduct.id,
      locale: "es",
      data: {
        title: staticProduct.title.es,
        description: staticProduct.description.es,
      },
    });
  }
}
```

### **Phase 2: UI Strings Migration Analysis**

```typescript
// Analysis of which UI strings should migrate vs stay in JSON
const translationAnalysis = {
  // Keep in JSON files (static UI elements)
  stayInJSON: ["common.navigation.*", "common.buttons.*", "common.forms.*", "errors.*", "validation.*", "loading.*"],

  // Migrate to PayloadCMS (dynamic content)
  migrateToPayload: ["products.*", "pages.*.title", "pages.*.description", "hero.*", "features.*", "testimonials.*"],
};
```

## Content Editor Workflow

### **PayloadCMS Translation Workflow**

1. **Content Creation**: Editor creates content in default language (English)
2. **Translation Assignment**: Content marked for translation
3. **Language Switching**: Admin UI allows switching between locales
4. **Translation Editing**: Translators edit content in their assigned language
5. **Review Process**: Content reviewed before publishing
6. **Publication**: Content published across all languages

### **Admin UI Features**

- **Translation Status Dashboard**: See completion status per language
- **Missing Translation Alerts**: Identify untranslated content
- **Bulk Translation Tools**: Manage multiple items at once
- **Translation Memory**: Reuse previous translations

## Validation and Quality Assurance

### **Translation Completeness Check**

```typescript
// scripts/validate-translations.ts
async function validateTranslationCompleteness() {
  const payload = await getPayloadClient();
  const locales = ["en", "fr", "es"];

  for (const collection of ["products", "pages"]) {
    console.log(`\nChecking ${collection} translations:`);

    for (const locale of locales) {
      const docs = await payload.find({
        collection,
        locale,
        limit: 0, // Get count only
      });

      console.log(`  ${locale.toUpperCase()}: ${docs.totalDocs} documents`);
    }
  }
}
```

### **Fallback Strategy**

```typescript
// src/lib/translation-fallback.ts
export function getTranslationWithFallback(key: string, locale: string, translations: Record<string, any>): string {
  // Try requested locale
  if (translations[locale]?.[key]) {
    return translations[locale][key];
  }

  // Fallback to English
  if (translations.en?.[key]) {
    return translations.en[key];
  }

  // Fallback to key itself
  return key;
}
```

## Performance Optimization

### **Translation Caching Strategy**

```typescript
// src/lib/translation-cache.ts
import { Redis } from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

export async function getCachedTranslations(
  locale: string,
  collection: string
): Promise<Record<string, string> | null> {
  try {
    const cached = await redis.get(`translations:${locale}:${collection}`);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.error("Translation cache error:", error);
    return null;
  }
}

export async function setCachedTranslations(
  locale: string,
  collection: string,
  translations: Record<string, string>
): Promise<void> {
  try {
    await redis.setex(
      `translations:${locale}:${collection}`,
      3600, // 1 hour TTL
      JSON.stringify(translations)
    );
  } catch (error) {
    console.error("Translation cache set error:", error);
  }
}
```

## Testing Strategy

### **Translation Integration Tests**

```typescript
// __tests__/i18n-payload-integration.test.ts
import { render, screen } from "@testing-library/react";
import { CombinedIntlProvider } from "@/components/providers/CombinedIntlProvider";

describe("PayloadCMS i18n Integration", () => {
  test("combines static and dynamic translations", async () => {
    const staticMessages = {
      "common.button.submit": "Submit",
    };

    const mockDynamicMessages = {
      "products.gms.title": "Grant Management System",
    };

    // Mock the PayloadCMS hook
    jest.mock("@/hooks/usePayloadTranslations", () => ({
      usePayloadTranslations: () => ({
        dynamicMessages: mockDynamicMessages,
        loading: false,
      }),
    }));

    render(
      <CombinedIntlProvider locale="en" staticMessages={staticMessages}>
        <TestComponent />
      </CombinedIntlProvider>
    );

    // Test that both static and dynamic translations work
    expect(screen.getByText("Submit")).toBeInTheDocument();
    expect(screen.getByText("Grant Management System")).toBeInTheDocument();
  });
});
```

## Implementation Timeline

### **Week 1-2: Foundation**

- [ ] PayloadCMS localization configuration
- [ ] Enhanced IntlProvider implementation
- [ ] Translation migration scripts

### **Week 3-4: Content Migration**

- [ ] Static content to PayloadCMS migration
- [ ] UI string analysis and categorization
- [ ] Translation validation tools

### **Week 5-6: Frontend Integration**

- [ ] Combined translation provider implementation
- [ ] Component updates for hybrid system
- [ ] Caching and performance optimization

### **Week 7-8: Testing & Launch**

- [ ] Translation completeness validation
- [ ] Editor workflow testing
- [ ] Performance testing and optimization

## Success Metrics

- **Translation Completeness**: 100% coverage across all languages
- **Content Update Speed**: 75% reduction in time to publish translations
- **Editor Independence**: 90% of translations managed without developer help
- **Performance Impact**: <100ms additional load time for translation loading
- **Translation Accuracy**: 95% translation quality score through validation

## References

- [PayloadCMS Localization Guide](https://payloadcms.com/docs/configuration/localization)
- [React Intl Documentation](https://formatjs.io/docs/react-intl/)
- [Next.js Internationalization](https://nextjs.org/docs/advanced-features/i18n-routing)
- [ICU Message Format](https://unicode-org.github.io/icu/userguide/format_parse/messages/)

---

**Document Created**: August 11, 2025  
**Status**: Ready for Implementation  
**Dependencies**: PayloadCMS setup, existing i18n system
