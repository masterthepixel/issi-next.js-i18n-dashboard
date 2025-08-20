# PayloadCMS Technical Implementation Guide

**Document Version**: 2.0  
**Created**: August 11, 2025  
**Updated**: Split from original large file for better maintainability  
**Purpose**: Detailed technical implementation steps and code examples

---

## 📋 Implementation Overview

This document provides detailed technical implementation steps that were split from the original IMPLEMENTATION_PLAN.md for better organization.

**⚠️ Note**: This document has been restructured. For high-level implementation phases, see `IMPLEMENTATION_PHASES.md`

**Reference Documentation**:

- `IMPLEMENTATION_PHASES.md` - High-level phase overview and timeline
- `MIGRATION_SCRIPTS_GUIDE.md` - Automated migration utilities
- `COMPONENTS_INVENTORY.md` - Complete component tracking

---

## 🚀 Technical Implementation Details

### **Step 1: Environment Setup & Dependencies** (Day 1)

#### **1.1 Tailwind CSS v4 Upgrade**

```bash
# Remove old Tailwind CSS
pnpm remove tailwindcss autoprefixer postcss

# Install Tailwind CSS v4
pnpm add -D tailwindcss@next @tailwindcss/typography@next

# Update PostCSS config for v4
# Update Tailwind config for v4 syntax
```

#### **1.2 PayloadCMS Dependencies Installation**

```bash
# Core PayloadCMS packages
pnpm add payload@^2.0.0
pnpm add @payloadcms/bundler-webpack@^1.0.0
pnpm add @payloadcms/db-mongodb@^1.0.0
pnpm add @payloadcms/plugin-cloud-storage@^1.0.0
pnpm add @payloadcms/plugin-seo@^2.0.0
pnpm add @payloadcms/richtext-slate@^1.0.0

# Database and utilities
pnpm add mongodb@^6.0.0 express@^4.18.0 cors@^2.8.5
pnpm add -D @types/express@^4.17.0 @types/cors@^2.8.0
```

#### **1.3 Update Package.json Scripts**

```json
{
  "scripts": {
    "payload": "payload",
    "payload:dev": "payload dev",
    "payload:build": "payload build",
    "migrate:content": "tsx scripts/migrate-content.ts",
    "validate:translations": "tsx scripts/validate-translations.ts",
    "backup:content": "tsx scripts/backup-content.ts",
    "setup:payload": "tsx scripts/setup-payload.ts"
  }
}
```

### **Step 2: Core Collection Development** (Days 2-5)

#### **2.1 Products Collection** (Priority P0 - 10-12 hours)

```typescript
// cms/collections/Products.ts
import type { CollectionConfig } from "payload/types";
import { isEditor, isPublished } from "../access";
import { slugField } from "../fields/slug";
import { seoField } from "../fields/seo";
import { heroField } from "../fields/hero";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "status", "updatedAt"],
    group: "Content",
  },
  access: {
    read: isPublished,
    create: isEditor,
    update: isEditor,
    delete: isEditor,
  },
  versions: {
    drafts: true,
    maxPerDoc: 5,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      admin: {
        description: "Product title displayed on the product page",
      },
    },
    slugField,
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Featured", value: "featured" },
        { label: "Project Management", value: "project" },
        { label: "HR Solutions", value: "hr" },
        { label: "Compliance", value: "compliance" },
        { label: "Data Management", value: "data" },
        { label: "Modernization", value: "modernization" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
        { label: "Archived", value: "archived" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    heroField,
    {
      name: "features",
      type: "array",
      localized: true,
      minRows: 1,
      maxRows: 15,
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
        },
        {
          name: "icon",
          type: "text",
          admin: {
            description: 'Heroicon name (e.g., "DocumentCheckIcon")',
          },
        },
      ],
      admin: {
        components: {
          RowLabel: ({ data }) => data?.name || "Feature",
        },
      },
    },
    {
      name: "specifications",
      type: "array",
      localized: true,
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "value",
          type: "text",
          required: true,
        },
      ],
      admin: {
        components: {
          RowLabel: ({ data }) => data?.label || "Specification",
        },
      },
    },
    {
      name: "benefits",
      type: "array",
      localized: true,
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
        },
      ],
    },
    seoField,
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-generate slug from title if not provided
        if (!data.slug && data.title?.en) {
          data.slug = data.title.en
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
        }
        return data;
      },
    ],
  },
  timestamps: true,
};
```

#### **2.2 UIElements Collection** (Priority P0 - 6-8 hours)

```typescript
// cms/collections/UIElements.ts
import type { CollectionConfig } from "payload/types";
import { isEditor } from "../access";

export const UIElements: CollectionConfig = {
  slug: "uielements",
  admin: {
    useAsTitle: "key",
    defaultColumns: ["key", "category", "translationStatus", "updatedAt"],
    group: "Translation",
  },
  access: {
    read: () => true,
    create: isEditor,
    update: isEditor,
    delete: isEditor,
  },
  fields: [
    {
      name: "key",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: 'Original JSON key (e.g., "common.buttons.submit")',
      },
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Common", value: "common" },
        { label: "Navigation", value: "navigation" },
        { label: "Forms", value: "forms" },
        { label: "Errors", value: "errors" },
        { label: "Buttons", value: "buttons" },
        { label: "Labels", value: "labels" },
        { label: "Messages", value: "messages" },
        { label: "Breadcrumbs", value: "breadcrumbs" },
        { label: "Footer", value: "footer" },
        { label: "Products", value: "products" },
        { label: "Pages", value: "pages" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "context",
      type: "textarea",
      admin: {
        description: "Context about where and how this text is used",
      },
    },
    {
      name: "value",
      type: "text",
      required: true,
      localized: true,
      admin: {
        description: "The translated text value",
      },
    },
    {
      name: "type",
      type: "select",
      defaultValue: "text",
      options: [
        { label: "Text", value: "text" },
        { label: "HTML", value: "html" },
        { label: "Plural (ICU)", value: "plural" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "translationNotes",
      type: "textarea",
      admin: {
        description: "Notes for translators about context, tone, etc.",
      },
    },
    {
      name: "translationStatus",
      type: "group",
      fields: [
        {
          name: "en",
          type: "checkbox",
          defaultValue: true,
          admin: {
            readOnly: true,
          },
        },
        {
          name: "fr",
          type: "checkbox",
          defaultValue: false,
        },
        {
          name: "es",
          type: "checkbox",
          defaultValue: false,
        },
      ],
      admin: {
        position: "sidebar",
      },
    },
  ],
  timestamps: true,
};
```

#### **2.3 Pages Collection** (Priority P0 - 8-10 hours)

```typescript
// cms/collections/Pages.ts
import type { CollectionConfig } from "payload/types";
import { isEditor, isPublished } from "../access";
import { slugField } from "../fields/slug";
import { seoField } from "../fields/seo";
import { HeroBlock } from "../blocks/HeroBlock";
import { FeatureBlock } from "../blocks/FeatureBlock";
import { CTABlock } from "../blocks/CTABlock";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "template", "status", "updatedAt"],
    group: "Content",
  },
  access: {
    read: isPublished,
    create: isEditor,
    update: isEditor,
    delete: isEditor,
  },
  versions: {
    drafts: true,
    maxPerDoc: 5,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    slugField,
    {
      name: "template",
      type: "select",
      required: true,
      defaultValue: "default",
      options: [
        { label: "Default Page", value: "default" },
        { label: "About Page", value: "about" },
        { label: "Services Page", value: "services" },
        { label: "Contact Page", value: "contact" },
        { label: "Legal Page", value: "legal" },
        { label: "Government Page", value: "government" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
        { label: "Archived", value: "archived" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "blocks",
      type: "blocks",
      localized: true,
      blocks: [HeroBlock, FeatureBlock, CTABlock],
      admin: {
        initCollapsed: true,
      },
    },
    seoField,
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (!data.slug && data.title?.en) {
          data.slug = data.title.en
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
        }
        return data;
      },
    ],
  },
  timestamps: true,
};
```

#### **2.4 Media Collection** (Priority P1 - 6-8 hours)

```typescript
// cms/collections/Media.ts
import type { CollectionConfig } from "payload/types";
import { isEditor } from "../access";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "filename",
    defaultColumns: ["filename", "alt", "mimeType", "filesize", "updatedAt"],
    group: "Media",
  },
  access: {
    read: () => true,
    create: isEditor,
    update: isEditor,
    delete: isEditor,
  },
  upload: {
    staticURL: "/media",
    staticDir: "media",
    mimeTypes: ["image/*", "application/pdf", "application/msword"],
    imageSizes: [
      {
        name: "thumbnail",
        width: 300,
        height: 300,
        position: "centre",
        formatOptions: {
          format: "webp",
          options: {
            quality: 80,
          },
        },
      },
      {
        name: "card",
        width: 640,
        height: 480,
        position: "centre",
        formatOptions: {
          format: "webp",
          options: {
            quality: 85,
          },
        },
      },
      {
        name: "hero",
        width: 1200,
        height: 800,
        position: "centre",
        formatOptions: {
          format: "webp",
          options: {
            quality: 90,
          },
        },
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      localized: true,
      admin: {
        description: "Alternative text for screen readers and SEO",
      },
    },
    {
      name: "caption",
      type: "text",
      localized: true,
    },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Product Images", value: "product" },
        { label: "Hero Images", value: "hero" },
        { label: "Icons", value: "icon" },
        { label: "Documents", value: "document" },
        { label: "Marketing", value: "marketing" },
        { label: "UI Elements", value: "ui" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "focalPoint",
      type: "group",
      fields: [
        {
          name: "x",
          type: "number",
          min: 0,
          max: 100,
          admin: {
            description: "Horizontal focal point percentage (0-100)",
          },
        },
        {
          name: "y",
          type: "number",
          min: 0,
          max: 100,
          admin: {
            description: "Vertical focal point percentage (0-100)",
          },
        },
      ],
      admin: {
        position: "sidebar",
        description: "Focal point for responsive image cropping",
      },
    },
  ],
  timestamps: true,
};
```

### **Step 3: Reusable Field Configurations** (Day 6)

#### **3.1 Slug Field** (2-3 hours)

```typescript
// cms/fields/slug.ts
import type { Field } from "payload/types";

export const slugField: Field = {
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
  admin: {
    position: "sidebar",
    description: "URL slug for this content (auto-generated from title)",
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (!value && data?.title?.en) {
          return data.title.en
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");
        }
        return value;
      },
    ],
  },
};
```

#### **3.2 SEO Field** (3-4 hours)

```typescript
// cms/fields/seo.ts
import type { Field } from "payload/types";

export const seoField: Field = {
  name: "seo",
  type: "group",
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
      admin: {
        description: "SEO title (recommended: 50-60 characters)",
      },
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
      admin: {
        description: "SEO description (recommended: 150-160 characters)",
      },
    },
    {
      name: "keywords",
      type: "text",
      localized: true,
      admin: {
        description: "Comma-separated keywords",
      },
    },
    {
      name: "ogImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Open Graph image for social media sharing",
      },
    },
    {
      name: "noIndex",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Prevent search engines from indexing this page",
      },
    },
  ],
  admin: {
    position: "sidebar",
  },
};
```

#### **3.3 Rich Text Field** (2-3 hours)

```typescript
// cms/fields/richText.ts
import type { Field } from "payload/types";

export const richTextField: Field = {
  name: "content",
  type: "richText",
  required: true,
  localized: true,
  admin: {
    elements: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "blockquote",
      "ul",
      "ol",
      "li",
      "link",
      "textAlign",
      "indent",
      "upload",
    ],
    leaves: ["bold", "italic", "underline", "strikethrough", "code"],
  },
};
```

#### **3.4 Hero Field** (3-4 hours)

```typescript
// cms/fields/hero.ts
import type { Field } from "payload/types";

export const heroField: Field = {
  name: "hero",
  type: "group",
  fields: [
    {
      name: "tagline",
      type: "text",
      localized: true,
      admin: {
        description: "Small text above the main title",
      },
    },
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      admin: {
        description: "Main hero title",
      },
    },
    {
      name: "context",
      type: "textarea",
      localized: true,
      admin: {
        description: "Context or subtitle text",
      },
    },
    {
      name: "description",
      type: "richText",
      localized: true,
      admin: {
        description: "Hero description with rich text formatting",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
      admin: {
        description: "Hero background or featured image",
      },
    },
    {
      name: "cta",
      type: "group",
      fields: [
        {
          name: "text",
          type: "text",
          localized: true,
        },
        {
          name: "url",
          type: "text",
        },
        {
          name: "style",
          type: "select",
          defaultValue: "primary",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Outline", value: "outline" },
          ],
        },
      ],
      admin: {
        description: "Call-to-action button",
      },
    },
  ],
  admin: {
    description: "Hero section content",
  },
};
```

### **Step 4: Content Blocks Development** (Day 7)

#### **4.1 Hero Block** (4-5 hours)

```typescript
// cms/blocks/HeroBlock.ts
import type { Block } from "payload/types";

export const HeroBlock: Block = {
  slug: "hero",
  labels: {
    singular: "Hero Section",
    plural: "Hero Sections",
  },
  fields: [
    {
      name: "tagline",
      type: "text",
      localized: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "description",
      type: "richText",
      localized: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "cta",
      type: "array",
      maxRows: 2,
      fields: [
        {
          name: "text",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
        {
          name: "style",
          type: "select",
          defaultValue: "primary",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Outline", value: "outline" },
          ],
        },
      ],
    },
    {
      name: "layout",
      type: "select",
      defaultValue: "centered",
      options: [
        { label: "Centered", value: "centered" },
        { label: "Left Aligned", value: "left" },
        { label: "Right Aligned", value: "right" },
        { label: "Split Layout", value: "split" },
      ],
    },
  ],
};
```

#### **4.2 Feature Block** (4-5 hours)

```typescript
// cms/blocks/FeatureBlock.ts
import type { Block } from "payload/types";

export const FeatureBlock: Block = {
  slug: "features",
  labels: {
    singular: "Features Section",
    plural: "Features Sections",
  },
  fields: [
    {
      name: "title",
      type: "text",
      localized: true,
    },
    {
      name: "subtitle",
      type: "textarea",
      localized: true,
    },
    {
      name: "features",
      type: "array",
      minRows: 1,
      maxRows: 12,
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "description",
          type: "textarea",
          required: true,
          localized: true,
        },
        {
          name: "icon",
          type: "text",
          admin: {
            description: 'Heroicon name (e.g., "DocumentCheckIcon")',
          },
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
      ],
      admin: {
        components: {
          RowLabel: ({ data }) => data?.name || "Feature",
        },
      },
    },
    {
      name: "layout",
      type: "select",
      defaultValue: "grid",
      options: [
        { label: "Grid Layout", value: "grid" },
        { label: "List Layout", value: "list" },
        { label: "Card Layout", value: "cards" },
        { label: "Masonry Layout", value: "masonry" },
      ],
    },
    {
      name: "columns",
      type: "select",
      defaultValue: "3",
      options: [
        { label: "2 Columns", value: "2" },
        { label: "3 Columns", value: "3" },
        { label: "4 Columns", value: "4" },
      ],
      admin: {
        condition: (data) => data.layout === "grid" || data.layout === "cards",
      },
    },
  ],
};
```

#### **4.3 CTA Block** (2-3 hours)

```typescript
// cms/blocks/CTABlock.ts
import type { Block } from "payload/types";

export const CTABlock: Block = {
  slug: "cta",
  labels: {
    singular: "Call to Action",
    plural: "Call to Actions",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
    },
    {
      name: "buttons",
      type: "array",
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          name: "text",
          type: "text",
          required: true,
          localized: true,
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
        {
          name: "style",
          type: "select",
          defaultValue: "primary",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Outline", value: "outline" },
          ],
        },
        {
          name: "external",
          type: "checkbox",
          defaultValue: false,
        },
      ],
    },
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "style",
      type: "select",
      defaultValue: "default",
      options: [
        { label: "Default", value: "default" },
        { label: "Branded", value: "branded" },
        { label: "Minimal", value: "minimal" },
        { label: "Gradient", value: "gradient" },
      ],
    },
  ],
};
```

---

## 🔄 Phase 2: Migration Scripts Development (Weeks 3-4)

### **Step 5: Core Migration Infrastructure** (Days 8-10)

#### **5.1 JSON Parser Utility** (6-8 hours)

```typescript
// migration/utils/json-parser.ts
import fs from "fs";
import path from "path";

interface TranslationData {
  [key: string]: string | TranslationData;
}

interface ParsedContent {
  products: ProductData[];
  pages: PageData[];
  uiElements: UIElementData[];
  navigation: NavigationData;
}

export class JSONParser {
  private langDir: string = "./src/lang";
  private supportedLocales: string[] = ["en", "fr", "es"];

  async parseAllTranslations(): Promise<ParsedContent> {
    const translations: { [locale: string]: TranslationData } = {};

    // Load all translation files
    for (const locale of this.supportedLocales) {
      const filePath = path.join(this.langDir, `${locale}.json`);
      const content = await fs.promises.readFile(filePath, "utf-8");
      translations[locale] = JSON.parse(content);
    }

    return {
      products: this.extractProductData(translations),
      pages: this.extractPageData(translations),
      uiElements: this.extractUIElementData(translations),
      navigation: this.extractNavigationData(translations),
    };
  }

  private extractProductData(translations: { [locale: string]: TranslationData }): ProductData[] {
    const products: ProductData[] = [];
    const productKeys = this.getProductKeys(translations.en);

    for (const productKey of productKeys) {
      const product: ProductData = {
        slug: productKey,
        title: {},
        hero: {},
        features: {},
        specifications: {},
        benefits: {},
      };

      // Extract localized content for each product
      for (const locale of this.supportedLocales) {
        product.title[locale] = this.getNestedValue(translations[locale], `products.${productKey}.title`);
        product.hero[locale] = this.extractHeroData(translations[locale], productKey);
        product.features[locale] = this.extractFeaturesData(translations[locale], productKey);
        product.specifications[locale] = this.extractSpecificationsData(translations[locale], productKey);
        product.benefits[locale] = this.extractBenefitsData(translations[locale], productKey);
      }

      products.push(product);
    }

    return products;
  }

  private extractUIElementData(translations: { [locale: string]: TranslationData }): UIElementData[] {
    const uiElements: UIElementData[] = [];
    const uiKeys = this.getUIKeys(translations.en);

    for (const key of uiKeys) {
      const element: UIElementData = {
        key,
        category: this.categorizeUIKey(key),
        value: {},
        type: this.determineFieldType(key),
      };

      // Extract localized values
      for (const locale of this.supportedLocales) {
        element.value[locale] = this.getNestedValue(translations[locale], key);
      }

      uiElements.push(element);
    }

    return uiElements;
  }

  private getProductKeys(translations: TranslationData): string[] {
    const productSection = translations.products as TranslationData;
    if (!productSection) return [];

    return Object.keys(productSection).filter(
      (key) => typeof productSection[key] === "object" && productSection[key] !== null
    );
  }

  private getUIKeys(translations: TranslationData, prefix: string = "", keys: string[] = []): string[] {
    for (const [key, value] of Object.entries(translations)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === "string") {
        // Skip product-specific keys as they're handled separately
        if (!fullKey.startsWith("products.") || this.isSharedProductKey(fullKey)) {
          keys.push(fullKey);
        }
      } else if (typeof value === "object" && value !== null) {
        this.getUIKeys(value as TranslationData, fullKey, keys);
      }
    }

    return keys;
  }

  private categorizeUIKey(key: string): string {
    if (key.startsWith("common.")) return "common";
    if (key.startsWith("navigation.")) return "navigation";
    if (key.startsWith("forms.")) return "forms";
    if (key.startsWith("errors.")) return "errors";
    if (key.startsWith("buttons.")) return "buttons";
    if (key.startsWith("breadcrumb.")) return "breadcrumbs";
    if (key.startsWith("footer.")) return "footer";
    if (key.includes(".button.") || key.includes(".btn.")) return "buttons";
    if (key.includes(".label.") || key.includes(".title.")) return "labels";
    if (key.includes(".message.") || key.includes(".msg.")) return "messages";

    return "other";
  }

  private determineFieldType(key: string): "text" | "html" | "plural" {
    if (key.includes(".html") || key.includes(".rich")) return "html";
    if (key.includes(".plural") || key.includes(".count")) return "plural";
    return "text";
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split(".").reduce((current, key) => current && current[key], obj);
  }

  private isSharedProductKey(key: string): boolean {
    // Keys that are shared across all products
    const sharedPatterns = ["products.common.", "products.labels.", "products.buttons."];

    return sharedPatterns.some((pattern) => key.startsWith(pattern));
  }

  async validateTranslationCompleteness(): Promise<ValidationResult> {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: [],
      stats: {
        totalKeys: 0,
        translatedKeys: {},
        missingTranslations: {},
      },
    };

    const translations = await this.parseAllTranslations();

    // Validate that all locales have the same keys
    const enKeys = this.getAllKeys(translations);
    result.stats.totalKeys = enKeys.length;

    for (const locale of this.supportedLocales) {
      result.stats.translatedKeys[locale] = 0;
      result.stats.missingTranslations[locale] = [];

      for (const key of enKeys) {
        const value = this.getTranslationValue(translations, key, locale);
        if (value && value.trim() !== "") {
          result.stats.translatedKeys[locale]++;
        } else {
          result.stats.missingTranslations[locale].push(key);
        }
      }
    }

    // Check for missing translations
    for (const locale of this.supportedLocales) {
      if (result.stats.missingTranslations[locale].length > 0) {
        result.warnings.push(`${locale}: Missing ${result.stats.missingTranslations[locale].length} translations`);
      }
    }

    return result;
  }
}

// Types
interface ProductData {
  slug: string;
  title: { [locale: string]: string };
  hero: { [locale: string]: any };
  features: { [locale: string]: any[] };
  specifications: { [locale: string]: any[] };
  benefits: { [locale: string]: any[] };
}

interface UIElementData {
  key: string;
  category: string;
  value: { [locale: string]: string };
  type: "text" | "html" | "plural";
}

interface PageData {
  slug: string;
  title: { [locale: string]: string };
  content: { [locale: string]: any };
  template: string;
}

interface NavigationData {
  primary: { [locale: string]: any[] };
  footer: { [locale: string]: any[] };
}

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    totalKeys: number;
    translatedKeys: { [locale: string]: number };
    missingTranslations: { [locale: string]: string[] };
  };
}
```

#### **5.2 Product Migration Script** (8-10 hours)

```typescript
// migration/scripts/migrate-products.ts
import { getPayloadClient } from "../../lib/getPayload";
import { JSONParser } from "../utils/json-parser";
import fs from "fs";
import path from "path";

interface MigrationResult {
  success: boolean;
  migrated: number;
  errors: string[];
  warnings: string[];
}

export class ProductMigrator {
  private payload: any;
  private parser: JSONParser;

  constructor() {
    this.parser = new JSONParser();
  }

  async initialize(): Promise<void> {
    this.payload = await getPayloadClient();
  }

  async migrateAllProducts(): Promise<MigrationResult> {
    const result: MigrationResult = {
      success: true,
      migrated: 0,
      errors: [],
      warnings: [],
    };

    try {
      await this.initialize();

      console.log("🔍 Parsing existing product data...");
      const parsedData = await this.parser.parseAllTranslations();

      console.log(`📦 Found ${parsedData.products.length} products to migrate`);

      for (const productData of parsedData.products) {
        try {
          await this.migrateProduct(productData);
          result.migrated++;
          console.log(`✅ Migrated product: ${productData.slug}`);
        } catch (error) {
          const errorMsg = `❌ Failed to migrate ${productData.slug}: ${error.message}`;
          result.errors.push(errorMsg);
          console.error(errorMsg);
          result.success = false;
        }
      }

      // Generate migration report
      await this.generateMigrationReport(result);
    } catch (error) {
      result.success = false;
      result.errors.push(`Migration failed: ${error.message}`);
    }

    return result;
  }

  private async migrateProduct(productData: ProductData): Promise<void> {
    // Map category from slug
    const category = this.mapProductCategory(productData.slug);

    // Create the product document
    const productDoc = {
      title: productData.title,
      slug: productData.slug,
      category: category,
      status: "published",
      hero: {
        tagline: productData.hero.en?.tagline || productData.hero,
        title: productData.title,
        context: productData.hero.en?.context || "",
        description: productData.hero.en?.description || "",
        image: await this.findOrCreateHeroImage(productData.slug),
      },
      features: productData.features.en || [],
      specifications: productData.specifications.en || [],
      benefits: productData.benefits.en || [],
      seo: {
        title: productData.title,
        description: productData.hero.en?.description || "",
        keywords: this.generateKeywords(productData),
      },
    };

    // Create the product in PayloadCMS
    const createdProduct = await this.payload.create({
      collection: "products",
      data: productDoc,
    });

    console.log(`📝 Created product document with ID: ${createdProduct.id}`);
  }

  private mapProductCategory(slug: string): string {
    const categoryMap: { [key: string]: string } = {
      gms: "featured",
      "grant-management-system": "featured",
      "bug-tracking-system": "project",
      "capture-manager": "project",
      mdsps: "hr",
      "medicare-drug-subsidy": "hr",
      "compliance-manager": "compliance",
      "data-migration": "data",
      "legacy-modernization": "modernization",
    };

    return categoryMap[slug] || "project";
  }

  private async findOrCreateHeroImage(productSlug: string): Promise<string | null> {
    try {
      // Look for existing product image
      const imagePath = path.join(process.cwd(), "public", "images", "products", `${productSlug}.png`);

      if (fs.existsSync(imagePath)) {
        // Check if image already exists in media collection
        const existingMedia = await this.payload.find({
          collection: "media",
          where: {
            filename: {
              equals: `${productSlug}.png`,
            },
          },
        });

        if (existingMedia.docs.length > 0) {
          return existingMedia.docs[0].id;
        }

        // Upload the image to PayloadCMS
        const mediaDoc = await this.payload.create({
          collection: "media",
          data: {
            alt: {
              en: `${productSlug} product hero image`,
              fr: `Image héro du produit ${productSlug}`,
              es: `Imagen héroe del producto ${productSlug}`,
            },
            category: "product",
          },
          filePath: imagePath,
        });

        return mediaDoc.id;
      }
    } catch (error) {
      console.warn(`⚠️  Could not process image for ${productSlug}: ${error.message}`);
    }

    return null;
  }

  private generateKeywords(productData: ProductData): string {
    const keywords = new Set<string>();

    // Add product title words
    if (productData.title.en) {
      productData.title.en.split(" ").forEach((word) => {
        if (word.length > 3) {
          keywords.add(word.toLowerCase());
        }
      });
    }

    // Add feature names
    if (productData.features.en) {
      productData.features.en.forEach((feature) => {
        if (feature.name) {
          feature.name.split(" ").forEach((word) => {
            if (word.length > 3) {
              keywords.add(word.toLowerCase());
            }
          });
        }
      });
    }

    // Add common software keywords
    keywords.add("software");
    keywords.add("system");
    keywords.add("management");
    keywords.add("issi");

    return Array.from(keywords).join(", ");
  }

  private async generateMigrationReport(result: MigrationResult): Promise<void> {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalProducts: result.migrated + result.errors.length,
        successful: result.migrated,
        failed: result.errors.length,
        successRate: `${((result.migrated / (result.migrated + result.errors.length)) * 100).toFixed(2)}%`,
      },
      errors: result.errors,
      warnings: result.warnings,
    };

    const reportPath = path.join(process.cwd(), "migration", "reports", `product-migration-${Date.now()}.json`);

    // Ensure reports directory exists
    await fs.promises.mkdir(path.dirname(reportPath), { recursive: true });

    await fs.promises.writeFile(reportPath, JSON.stringify(report, null, 2));

    console.log(`📊 Migration report saved to: ${reportPath}`);
  }
}

// CLI execution
if (require.main === module) {
  (async () => {
    const migrator = new ProductMigrator();

    console.log("🚀 Starting product migration...");
    const result = await migrator.migrateAllProducts();

    if (result.success) {
      console.log(`✅ Migration completed successfully! Migrated ${result.migrated} products.`);
    } else {
      console.error(
        `❌ Migration completed with errors. ${result.migrated} successful, ${result.errors.length} failed.`
      );
      process.exit(1);
    }
  })();
}
```

#### **5.3 UI Elements Migration Script** (8-10 hours)

```typescript
// migration/scripts/migrate-ui-elements.ts
import { getPayloadClient } from "../../lib/getPayload";
import { JSONParser } from "../utils/json-parser";
import fs from "fs";
import path from "path";

export class UIElementMigrator {
  private payload: any;
  private parser: JSONParser;

  constructor() {
    this.parser = new JSONParser();
  }

  async initialize(): Promise<void> {
    this.payload = await getPayloadClient();
  }

  async migrateAllUIElements(): Promise<MigrationResult> {
    const result: MigrationResult = {
      success: true,
      migrated: 0,
      errors: [],
      warnings: [],
    };

    try {
      await this.initialize();

      console.log("🔍 Parsing UI element data...");
      const parsedData = await this.parser.parseAllTranslations();

      console.log(`🎨 Found ${parsedData.uiElements.length} UI elements to migrate`);

      // Process in batches to avoid overwhelming the database
      const batchSize = 50;
      for (let i = 0; i < parsedData.uiElements.length; i += batchSize) {
        const batch = parsedData.uiElements.slice(i, i + batchSize);

        for (const uiElement of batch) {
          try {
            await this.migrateUIElement(uiElement);
            result.migrated++;

            if (result.migrated % 100 === 0) {
              console.log(`📝 Migrated ${result.migrated} UI elements...`);
            }
          } catch (error) {
            const errorMsg = `❌ Failed to migrate ${uiElement.key}: ${error.message}`;
            result.errors.push(errorMsg);
            result.success = false;
          }
        }

        // Small delay between batches
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      // Validate migration completeness
      await this.validateUIElementMigration(result);

      // Generate migration report
      await this.generateMigrationReport(result);
    } catch (error) {
      result.success = false;
      result.errors.push(`UI Element migration failed: ${error.message}`);
    }

    return result;
  }

  private async migrateUIElement(uiElementData: UIElementData): Promise<void> {
    // Create the UI element document
    const uiElementDoc = {
      key: uiElementData.key,
      category: uiElementData.category,
      context: this.generateContextDescription(uiElementData.key),
      value: uiElementData.value,
      type: uiElementData.type,
      translationNotes: this.generateTranslationNotes(uiElementData.key),
      translationStatus: {
        en: true,
        fr: Boolean(uiElementData.value.fr && uiElementData.value.fr.trim() !== ""),
        es: Boolean(uiElementData.value.es && uiElementData.value.es.trim() !== ""),
      },
    };

    // Create the UI element in PayloadCMS
    await this.payload.create({
      collection: "uielements",
      data: uiElementDoc,
    });
  }

  private generateContextDescription(key: string): string {
    const contextMap: { [pattern: string]: string } = {
      "common.buttons.": "Button text used throughout the application",
      "common.labels.": "Form labels and UI element labels",
      "common.messages.": "System messages and notifications",
      "navigation.": "Navigation menu items and links",
      "footer.": "Footer content and links",
      "breadcrumb.": "Breadcrumb navigation text",
      "forms.": "Form field labels, placeholders, and validation messages",
      "errors.": "Error messages displayed to users",
      "products.": "Product-specific text and descriptions",
      "page.": "Static page content and headers",
      "government.": "Government-specific page content",
    };

    for (const [pattern, description] of Object.entries(contextMap)) {
      if (key.startsWith(pattern)) {
        return description;
      }
    }

    return "User interface text element";
  }

  private generateTranslationNotes(key: string): string {
    const notesMap: { [pattern: string]: string } = {
      ".button.": "Keep button text concise and action-oriented",
      ".title.": "Maintain formal tone for titles and headers",
      ".description.": "Provide clear and informative descriptions",
      ".error.": "Error messages should be helpful and not technical",
      ".success.": "Success messages should be encouraging and clear",
      ".placeholder.": "Placeholder text should guide user input",
      "government.": "Use formal, professional language appropriate for government context",
    };

    for (const [pattern, notes] of Object.entries(notesMap)) {
      if (key.includes(pattern)) {
        return notes;
      }
    }

    return "Maintain consistent tone and style with the rest of the application";
  }

  private async validateUIElementMigration(result: MigrationResult): Promise<void> {
    console.log("🔍 Validating UI element migration...");

    // Count migrated elements
    const migratedCount = await this.payload.count({
      collection: "uielements",
    });

    console.log(`📊 Migration validation:`);
    console.log(`  - Expected: ${result.migrated + result.errors.length}`);
    console.log(`  - Migrated: ${migratedCount.totalDocs}`);
    console.log(
      `  - Success rate: ${((result.migrated / (result.migrated + result.errors.length)) * 100).toFixed(2)}%`
    );

    // Check for translation completeness
    const incompleteTranslations = await this.payload.find({
      collection: "uielements",
      where: {
        or: [
          {
            "translationStatus.fr": {
              equals: false,
            },
          },
          {
            "translationStatus.es": {
              equals: false,
            },
          },
        ],
      },
    });

    if (incompleteTranslations.totalDocs > 0) {
      result.warnings.push(`${incompleteTranslations.totalDocs} UI elements have incomplete translations`);
      console.log(`⚠️  ${incompleteTranslations.totalDocs} UI elements have incomplete translations`);
    }
  }

  private async generateMigrationReport(result: MigrationResult): Promise<void> {
    const report = {
      timestamp: new Date().toISOString(),
      type: "ui-elements",
      summary: {
        totalElements: result.migrated + result.errors.length,
        successful: result.migrated,
        failed: result.errors.length,
        successRate: `${((result.migrated / (result.migrated + result.errors.length)) * 100).toFixed(2)}%`,
      },
      translationCompleteness: await this.getTranslationCompletenessStats(),
      errors: result.errors,
      warnings: result.warnings,
    };

    const reportPath = path.join(process.cwd(), "migration", "reports", `ui-elements-migration-${Date.now()}.json`);

    await fs.promises.mkdir(path.dirname(reportPath), { recursive: true });
    await fs.promises.writeFile(reportPath, JSON.stringify(report, null, 2));

    console.log(`📊 UI Elements migration report saved to: ${reportPath}`);
  }

  private async getTranslationCompletenessStats(): Promise<any> {
    const total = await this.payload.count({ collection: "uielements" });

    const frComplete = await this.payload.count({
      collection: "uielements",
      where: {
        "translationStatus.fr": { equals: true },
      },
    });

    const esComplete = await this.payload.count({
      collection: "uielements",
      where: {
        "translationStatus.es": { equals: true },
      },
    });

    return {
      total: total.totalDocs,
      french: {
        complete: frComplete.totalDocs,
        percentage: `${((frComplete.totalDocs / total.totalDocs) * 100).toFixed(2)}%`,
      },
      spanish: {
        complete: esComplete.totalDocs,
        percentage: `${((esComplete.totalDocs / total.totalDocs) * 100).toFixed(2)}%`,
      },
    };
  }
}

// CLI execution
if (require.main === module) {
  (async () => {
    const migrator = new UIElementMigrator();

    console.log("🚀 Starting UI elements migration...");
    const result = await migrator.migrateAllUIElements();

    if (result.success) {
      console.log(`✅ UI Elements migration completed successfully! Migrated ${result.migrated} elements.`);
    } else {
      console.error(
        `❌ UI Elements migration completed with errors. ${result.migrated} successful, ${result.errors.length} failed.`
      );
      process.exit(1);
    }
  })();
}
```

### **Continue with remaining phases...**

This implementation plan covers the foundational components. Would you like me to continue with the remaining phases (Frontend Integration, Testing, Documentation) or would you prefer to focus on implementing these core components first?

The plan ensures:

- ✅ **Tailwind CSS v4 compatibility**
- ✅ **Complete component inventory tracking**
- ✅ **Phased implementation approach**
- ✅ **Comprehensive migration scripts**
- ✅ **Error handling and validation**
- ✅ **Progress tracking and reporting**

All components reference the `COMPONENTS_INVENTORY.md` file for status tracking and prioritization.
