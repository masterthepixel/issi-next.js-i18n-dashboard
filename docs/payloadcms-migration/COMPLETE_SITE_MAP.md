# Complete Site Map for PayloadCMS Migration

## Overview

This document provides a comprehensive site map of all pages that need to be migrated to PayloadCMS, based on the current Next.js application structure and content analysis.

## 📊 **Summary Statistics**

- **Total Pages**: ~120+ pages across 3 languages
- **Unique Pages**: 40+ distinct pages
- **Languages**: English (EN), French (FR), Spanish (ES)
- **Content Types**: Static pages, Product pages, Dynamic content
- **Translation Strings**: 5,148 total (1,716 keys × 3 languages)

## 🗺️ **Complete Site Structure**

### **1. Static Core Pages (12 pages × 3 languages = 36 total)**

#### **Primary Navigation Pages**

| Page           | Route Pattern        | Priority     | Description                |
| -------------- | -------------------- | ------------ | -------------------------- |
| **Homepage**   | `/{lang}`            | P0 Critical  | Main landing page          |
| **About**      | `/{lang}/about`      | P0 Critical  | Company information        |
| **Services**   | `/{lang}/services`   | P0 Critical  | Service offerings overview |
| **Products**   | `/{lang}/products`   | P0 Critical  | Products listing/grid      |
| **Government** | `/{lang}/government` | P1 Important | Government solutions       |
| **eLearning**  | `/{lang}/eLearning`  | P1 Important | Learning management        |
| **Compliance** | `/{lang}/compliance` | P1 Important | Compliance solutions       |
| **Contact**    | `/{lang}/contact`    | P1 Important | Contact information        |

#### **Secondary/Support Pages**

| Page               | Route Pattern            | Priority        | Description             |
| ------------------ | ------------------------ | --------------- | ----------------------- |
| **Infrastructure** | `/{lang}/infrastructure` | P2 Nice-to-have | Infrastructure services |
| **License**        | `/{lang}/license`        | P2 Nice-to-have | Software licensing      |
| **Privacy**        | `/{lang}/privacy`        | P2 Nice-to-have | Privacy policy          |
| **Terms**          | `/{lang}/terms`          | P2 Nice-to-have | Terms of service        |

### **2. Product Pages (30 products × 3 languages = 90 total)**

#### **Product Categories by Implementation Status**

##### **✅ Complete Products (1 product)**

| #   | Product ID | Product Name            | Slug                      | Route Pattern                              |
| --- | ---------- | ----------------------- | ------------------------- | ------------------------------------------ |
| 1   | `gms`      | Grant Management System | `grant-management-system` | `/{lang}/products/grant-management-system` |

##### **🔄 Generic Implementation (29 products)**

| #   | Product ID                   | Product Name                               | Slug                                         | Status  |
| --- | ---------------------------- | ------------------------------------------ | -------------------------------------------- | ------- |
| 2   | `ects`                       | Electronic Correspondence Tracking System  | `electronic-correspondence-tracking-system`  | Generic |
| 3   | `ets`                        | Environmental Tracking System              | `environmental-tracking-system`              | Generic |
| 4   | `mdsps`                      | Multi-Dimensional System Planning Solution | `multi-dimensional-system-planning-solution` | Generic |
| 5   | `project-management`         | Project Management Suite                   | `project-management-suite`                   | Generic |
| 6   | `bug-tracking`               | Bug Tracking System                        | `bug-tracking-system`                        | Generic |
| 7   | `capture-manager`            | Capture Manager                            | `capture-manager`                            | Generic |
| 8   | `prudent-agile`              | Prudent Agile Methodology                  | `prudent-agile-methodology`                  | Generic |
| 9   | `task-management`            | Task Management System                     | `task-management-system`                     | Generic |
| 10  | `requirements-management`    | Requirements Management System             | `requirements-management-system`             | Generic |
| 11  | `hr-manager`                 | HR Management System                       | `hr-management-system`                       | Generic |
| 12  | `employee-performance`       | Employee Performance System                | `employee-performance-system`                | Generic |
| 13  | `timesheet-management`       | Timesheet Management System                | `timesheet-management-system`                | Generic |
| 14  | `employee-talent-repository` | Employee Talent Repository                 | `employee-talent-repository`                 | Generic |
| 15  | `learning-management`        | Learning Management System                 | `learning-management-system`                 | Generic |
| 16  | `training-dashboard`         | Training Dashboard                         | `training-dashboard`                         | Generic |
| 17  | `i-learn`                    | I-Learn System                             | `i-learn-system`                             | Generic |
| 18  | `rsvp`                       | RSVP Event Management                      | `rsvp-event-management`                      | Generic |
| 19  | `audit-reporting`            | Audit Reporting System                     | `audit-reporting-system`                     | Generic |
| 20  | `expense-tracking`           | Expense Tracking System                    | `expense-tracking-system`                    | Generic |
| 21  | `meeting-minutes-manager`    | Meeting Minutes Manager                    | `meeting-minutes-manager`                    | Generic |
| 22  | `training-records`           | Training Records System                    | `training-records-system`                    | Generic |
| 23  | `central-data`               | Central Data Platform                      | `central-data-platform`                      | Generic |
| 24  | `e-survey`                   | E-Survey Platform                          | `e-survey-platform`                          | Generic |
| 25  | `form-management`            | Form Management System                     | `form-management-system`                     | Generic |
| 26  | `i-code`                     | I-Code Testing Platform                    | `i-code-testing-platform`                    | Generic |
| 27  | `professional-management`    | Professional Management System             | `professional-management-system`             | Generic |
| 28  | `complaint-tracking`         | Complaint Tracking System                  | `complaint-tracking-system`                  | Generic |
| 29  | `inventory-asset-tracking`   | Inventory Asset Tracking System            | `inventory-asset-tracking-system`            | Generic |
| 30  | `visitor-log`                | Visitor Log System                         | `visitor-log-system`                         | Generic |

## 🎯 **PayloadCMS Collection Mapping**

### **Pages Collection Structure**

#### **Static Pages** (To be created in PayloadCMS Pages collection)

```typescript
interface StaticPage {
  title: string; // Localized page title
  slug: string; // URL slug
  content: RichText; // Page content blocks
  seoTitle?: string; // SEO title override
  seoDescription?: string; // Meta description
  seoKeywords?: string; // Meta keywords
  status: "draft" | "published";
  updatedAt: Date;
  createdAt: Date;
}
```

#### **Product Pages** (To be created in PayloadCMS Products collection)

```typescript
interface ProductPage {
  productId: string; // Unique product identifier
  title: string; // Localized product name
  slug: string; // URL slug
  tagline?: string; // Hero tagline
  description: RichText; // Product description
  features: Feature[]; // Product features array
  images: Media[]; // Product images
  category: string; // Product category
  status: "draft" | "published";
  priority: number; // Display priority
  updatedAt: Date;
  createdAt: Date;
}
```

## 📝 **Translation Key Migration Map**

### **Current JSON Structure → PayloadCMS**

#### **Static Page Translations**

```javascript
// Current JSON structure (src/lang/*.json)
{
  "pages.about.title": "About ISSI",
  "pages.about.description": "Learn about our company...",
  "pages.services.title": "Our Services",
  "pages.services.description": "Comprehensive technology solutions..."
}

// Target PayloadCMS structure
Pages Collection:
- title: "About ISSI" (localized)
- content: RichText blocks (localized)
- seoDescription: "Learn about our company..." (localized)
```

#### **Product Page Translations**

```javascript
// Current JSON structure
{
  "products.gms.hero.title": "Grant Management System",
  "products.gms.hero.tagline": "Complete Grant Lifecycle Management",
  "products.gms.hero.description": "ISSI provided GMS solution...",
  "products.gms.features.feature1.name": "Interactive Grant Dashboards",
  "products.gms.features.feature1.description": "Insightful, actionable dashboards..."
}

// Target PayloadCMS structure
Products Collection:
- productId: "gms"
- title: "Grant Management System" (localized)
- tagline: "Complete Grant Lifecycle Management" (localized)
- description: RichText content (localized)
- features: [
    {
      name: "Interactive Grant Dashboards" (localized),
      description: "Insightful, actionable dashboards..." (localized)
    }
  ]
```

## 🚀 **Migration Priority Matrix**

### **Phase 1: Critical Pages (P0)**

- **Homepage**: Main landing page with hero section
- **About**: Company information and team
- **Services**: Service offerings overview
- **Products**: Product listing/BentoGrid
- **Contact**: Contact information and forms

### **Phase 2: Important Pages (P1)**

- **Government**: Government solutions
- **eLearning**: Learning management
- **Compliance**: Compliance solutions
- **Core Product Pages**: Top 10 most-used products

### **Phase 3: Nice-to-have Pages (P2)**

- **Infrastructure**: Infrastructure services
- **License/Privacy/Terms**: Legal pages
- **Remaining Product Pages**: Less-used products

## 🔧 **Technical Implementation Notes**

### **URL Structure Preservation**

All existing URLs must be preserved during migration:

```
Current: /{lang}/products/{slug}
Target:  /{lang}/products/{slug} (same)

Current: /{lang}/about
Target:  /{lang}/about (same)
```

### **SEO Requirements**

- **Sitemap Generation**: Auto-generate XML sitemap from PayloadCMS
- **Meta Tags**: Proper SEO tags from collection data
- **Structured Data**: JSON-LD for all pages
- **Canonical URLs**: Prevent duplicate content
- **Language Alternates**: Proper hreflang implementation

### **Content Block Types Needed**

```typescript
// Rich content blocks for flexible page building
type ContentBlock =
  | HeroBlock // Hero sections with CTA
  | TextBlock // Rich text content
  | ImageBlock // Images with captions
  | FeatureGrid // Feature listings
  | CallToAction // CTA buttons/sections
  | ProductShowcase // Product highlights
  | TestimonialBlock // Customer testimonials
  | ContactForm; // Contact forms
```

## 📊 **Migration Validation Checklist**

### **Pre-Migration Validation**

- [ ] All 40+ unique pages identified
- [ ] Translation keys mapped to collections
- [ ] URL structure documented
- [ ] SEO requirements defined
- [ ] Content blocks designed

### **Post-Migration Validation**

- [ ] All URLs working correctly
- [ ] Translation completeness verified
- [ ] SEO tags generating properly
- [ ] Search functionality working
- [ ] Performance benchmarks met

## 🎯 **Success Metrics**

### **Content Coverage**

- **Static Pages**: 12 pages × 3 languages = 36 pages migrated
- **Product Pages**: 30 products × 3 languages = 90 pages migrated
- **Total Migration**: 126 pages successfully migrated

### **Translation Completeness**

- **English**: 1,716 keys (100% baseline)
- **French**: 1,805 keys (105% - enhanced content)
- **Spanish**: 1,288 keys (75% - needs completion to 1,716)

### **Performance Targets**

- **Page Load Time**: <3 seconds
- **SEO Score**: 95+ on Lighthouse
- **Translation Load Time**: <500ms
- **Content Update Time**: <30 seconds for editors

## 📁 **File Organization in PayloadCMS**

### **Collections**

```
cms/collections/
├── Pages.ts           // Static pages (about, services, etc.)
├── Products.ts        // Product pages with features
├── Media.ts           // Images, documents, assets
├── UIElements.ts      // Reusable UI components
└── Users.ts           // Admin users and permissions
```

### **Globals**

```
cms/globals/
├── SiteSettings.ts    // Site-wide configuration
├── Navigation.ts      // Menu and footer links
└── SEODefaults.ts     // Default SEO settings
```

### **Migration Scripts**

```
scripts/migration/
├── migrate-static-pages.ts    // Migrate static content
├── migrate-products.ts        // Migrate product pages
├── migrate-translations.ts    // Migrate i18n strings
├── migrate-media.ts           // Migrate images/assets
└── validate-migration.ts      // Post-migration validation
```

## 🔗 **External Dependencies**

### **Current Asset Locations**

- **Product Images**: `public/images/products/`
- **Hero Images**: `public/images/heroes/`
- **Icons**: `public/images/icons/`
- **Documents**: `public/documents/`

### **Target Asset Management**

- **PayloadCMS Media**: Cloud storage (Cloudinary/AWS S3)
- **CDN**: Global content delivery
- **Image Optimization**: Automatic resizing and formats
- **Asset Versioning**: Track media changes

---

**Document Created**: August 11, 2025  
**Status**: Ready for Implementation  
**Total Pages to Migrate**: 126 pages (40+ unique × 3 languages)  
**Priority Focus**: Static core pages and top product pages first
