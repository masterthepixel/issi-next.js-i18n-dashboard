# Page Components & Layout Documentation

## Overview

This document provides detailed specifications for all components, layout elements, and content blocks that should appear on each page type during PayloadCMS migration. This ensures no page is recreated poorly and all functionality is preserved.

## 🏗️ **Global Components (Present on ALL Pages)**

### **Universal Layout Components**

1. **Header/Navigation** (`src/components/Navbar.tsx`)

   - Main navigation menu with language switcher
   - Mobile responsive hamburger menu
   - Logo and branding
   - User authentication state (if applicable)

2. **UniversalBreadcrumb** (`src/components/UniversalBreadcrumb.tsx`)

   - Automatic breadcrumb generation
   - 3D globe integration
   - Multi-language support
   - SEO structured data

3. **Footer** (`src/components/Footer.tsx`)

   - Company information
   - Links to legal pages
   - Social media links
   - Contact information

4. **Mobile Floating Menu** (`src/components/MobileFloatingMenu.tsx`)
   - Mobile-specific navigation
   - Quick access to key pages

## 📄 **Page-Specific Components by Page Type**

### **1. Homepage (`/{lang}`)**

#### **Components Required:**

- **Hero Section** (`src/components/HeroSection.tsx`)
  - Main value proposition
  - Call-to-action buttons
  - Background imagery/animation
- **ProductsBentoGrid** (`src/components/ProductsBentoGrid.tsx`)
  - Interactive product showcase
  - Category filtering
  - Product cards with hover effects
- **Services Overview** (`src/components/ServicesOverview.tsx`)
  - Key service highlights
  - Link to full services page
- **Company Stats/Metrics** (`src/components/CompanyStats.tsx`)
  - Key performance indicators
  - Client testimonials
- **Contact CTA Section** (`src/components/ContactCTA.tsx`)
  - Contact form or contact button
  - Location/office information

#### **Content Blocks Needed in PayloadCMS:**

```typescript
type HomepageBlocks =
  | HeroBlock
  | ProductShowcaseBlock
  | ServicesOverviewBlock
  | StatsBlock
  | TestimonialBlock
  | ContactCTABlock;
```

### **2. About Page (`/{lang}/about`)**

#### **Components Required:**

- **Company Story Hero** (`src/components/CompanyHero.tsx`)
  - Company mission/vision
  - Executive team photos
- **Team Grid** (`src/components/TeamGrid.tsx`)
  - Employee profiles
  - Role descriptions
  - Photos and bios
- **Company Timeline** (`src/components/CompanyTimeline.tsx`)
  - Historical milestones
  - Growth achievements
- **Values Section** (`src/components/ValuesSection.tsx`)
  - Core company values
  - Culture highlights

#### **Content Blocks Needed in PayloadCMS:**

```typescript
type AboutPageBlocks = CompanyHeroBlock | TeamGridBlock | TimelineBlock | ValuesBlock | AwardsBlock;
```

### **3. Services Page (`/{lang}/services`)**

#### **Components Required:**

- **Services Hero** (`src/components/ServicesHero.tsx`)
  - Service portfolio overview
  - Value proposition
- **Service Categories Grid** (`src/components/ServiceCategoriesGrid.tsx`)
  - Different service offerings
  - Category descriptions
- **Process Overview** (`src/components/ProcessOverview.tsx`)
  - How the company works
  - Step-by-step methodology
- **Case Studies Preview** (`src/components/CaseStudiesPreview.tsx`)
  - Success stories
  - Client examples

#### **Content Blocks Needed in PayloadCMS:**

```typescript
type ServicesPageBlocks = ServicesHeroBlock | ServiceCategoriesBlock | ProcessBlock | CaseStudyBlock | ServiceCTABlock;
```

### **4. Products Listing (`/{lang}/products`)**

#### **Components Required:**

- **Products Hero** (`src/components/ProductsHero.tsx`)
  - Product portfolio introduction
  - Search/filter functionality
- **ProductsBentoGrid** (`src/components/ProductsBentoGrid.tsx`)
  - All products display
  - Category filtering
  - Search functionality
- **Product Categories Filter** (`src/components/ProductCategoriesFilter.tsx`)
  - Filter by product type
  - Sort functionality

#### **Content Blocks Needed in PayloadCMS:**

```typescript
type ProductsPageBlocks = ProductsHeroBlock | ProductGridBlock | FilterBlock | FeaturedProductsBlock;
```

### **5. Individual Product Pages (`/{lang}/products/[slug]`)**

#### **Components Required (Based on GMS as Complete Example):**

- **Product Hero** (`src/components/ProductHero.tsx`)
  - Product name and tagline
  - Key value proposition
  - Call-to-action buttons
- **Product Features Grid** (`src/components/ProductFeaturesGrid.tsx`)
  - Detailed feature list
  - Feature descriptions
  - Icons/imagery
- **Product Screenshots/Demo** (`src/components/ProductDemo.tsx`)
  - Product interface previews
  - Video demonstrations
- **Technical Specifications** (`src/components/TechnicalSpecs.tsx`)
  - System requirements
  - Integration capabilities
- **Contact/Demo CTA** (`src/components/ProductCTA.tsx`)
  - Request demo button
  - Contact sales form

#### **Content Blocks Needed in PayloadCMS:**

```typescript
type ProductPageBlocks =
  | ProductHeroBlock
  | FeaturesGridBlock
  | DemoBlock
  | SpecificationsBlock
  | BenefitsBlock
  | TestimonialsBlock
  | ProductCTABlock;
```

### **6. Government Page (`/{lang}/government`)**

#### **Components Required:**

- **Government Solutions Hero** (`src/components/GovernmentHero.tsx`)
  - Government-specific messaging
  - Compliance highlights
- **Compliance Certifications** (`src/components/ComplianceCertifications.tsx`)
  - Government certifications
  - Security clearances
- **Government Products Grid** (`src/components/GovernmentProductsGrid.tsx`)
  - Government-specific products
  - Case studies

#### **Content Blocks Needed in PayloadCMS:**

```typescript
type GovernmentPageBlocks =
  | GovernmentHeroBlock
  | ComplianceBlock
  | GovernmentProductsBlock
  | SecurityBlock
  | GovernmentCTABlock;
```

### **7. eLearning Page (`/{lang}/eLearning`)**

#### **Components Required:**

- **eLearning Hero** (`src/components/ELearningHero.tsx`)
  - Learning platform overview
  - Educational approach
- **Course Catalog** (`src/components/CourseCatalog.tsx`)
  - Available courses
  - Learning paths
- **Learning Management Features** (`src/components/LMSFeatures.tsx`)
  - Platform capabilities
  - Student tracking

#### **Content Blocks Needed in PayloadCMS:**

```typescript
type ELearningPageBlocks =
  | ELearningHeroBlock
  | CourseCatalogBlock
  | LMSFeaturesBlock
  | LearningPathsBlock
  | ELearningCTABlock;
```

### **8. Compliance Page (`/{lang}/compliance`)**

#### **Components Required:**

- **Compliance Hero** (`src/components/ComplianceHero.tsx`)
  - Compliance commitment
  - Industry standards
- **Certifications Grid** (`src/components/CertificationsGrid.tsx`)
  - Industry certifications
  - Compliance badges
- **Compliance Process** (`src/components/ComplianceProcess.tsx`)
  - How compliance is maintained
  - Audit processes

#### **Content Blocks Needed in PayloadCMS:**

```typescript
type CompliancePageBlocks =
  | ComplianceHeroBlock
  | CertificationsBlock
  | ComplianceProcessBlock
  | AuditBlock
  | ComplianceCTABlock;
```

### **9. Contact Page (`/{lang}/contact`)**

#### **Components Required:**

- **Contact Hero** (`src/components/ContactHero.tsx`)
  - Contact introduction
  - Multiple contact methods
- **Contact Form** (`src/components/ContactForm.tsx`)
  - Multi-field contact form
  - Form validation
  - Success/error handling
- **Office Locations** (`src/components/OfficeLocations.tsx`)
  - Physical addresses
  - Maps integration
- **Contact Information Grid** (`src/components/ContactInfoGrid.tsx`)
  - Phone numbers
  - Email addresses
  - Business hours

#### **Content Blocks Needed in PayloadCMS:**

```typescript
type ContactPageBlocks =
  | ContactHeroBlock
  | ContactFormBlock
  | OfficeLocationsBlock
  | ContactInfoBlock
  | DirectionsBlock;
```

### **10. Support Pages (Infrastructure, License, Privacy, Terms)**

#### **Components Required:**

- **Legal/Info Hero** (`src/components/LegalHero.tsx`)
  - Page-specific introduction
  - Last updated information
- **Content Sections** (`src/components/LegalContentSections.tsx`)
  - Structured legal content
  - Table of contents
  - Section navigation
- **Document Download** (`src/components/DocumentDownload.tsx`)
  - PDF downloads
  - Print functionality

#### **Content Blocks Needed in PayloadCMS:**

```typescript
type LegalPageBlocks =
  | LegalHeroBlock
  | ContentSectionBlock
  | TableOfContentsBlock
  | DocumentDownloadBlock
  | LastUpdatedBlock;
```

## 🎨 **Reusable Component Library**

### **Content Blocks (Flexible Components)**

1. **HeroBlock**

   - Title, subtitle, description
   - Background image/video
   - Call-to-action buttons
   - Optional overlay

2. **TextBlock**

   - Rich text content
   - Headings and paragraphs
   - Lists and formatting
   - Image embeds

3. **ImageBlock**

   - Image with caption
   - Multiple image layouts
   - Gallery functionality
   - Lightbox viewing

4. **FeatureGrid**

   - Grid of features/services
   - Icons and descriptions
   - Hover effects
   - Link capabilities

5. **CallToAction**

   - Action-oriented sections
   - Buttons and forms
   - Contact information
   - Conversion-focused

6. **TestimonialBlock**

   - Customer quotes
   - Client logos
   - Star ratings
   - Carousel functionality

7. **FormBlock**

   - Contact forms
   - Newsletter signup
   - Custom form fields
   - Validation and submission

8. **VideoBlock**
   - Embedded videos
   - YouTube/Vimeo integration
   - Custom video players
   - Thumbnails and controls

## 🔧 **Technical Component Specifications**

### **Component Props Interface**

```typescript
interface ComponentProps {
  content: any; // PayloadCMS content
  locale: string; // Current language
  isEditing?: boolean; // Edit mode flag
  className?: string; // Custom styling
}
```

### **Content Block Base Interface**

```typescript
interface ContentBlock {
  id: string;
  blockType: string;
  blockName?: string;
  content: Record<string, any>;
  visibility: "public" | "private";
  order: number;
}
```

## 📱 **Responsive Design Requirements**

### **Breakpoints for All Components**

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large Desktop**: 1440px+

### **Mobile-Specific Components**

- **MobileFloatingMenu**: Quick navigation
- **MobileHero**: Optimized hero sections
- **MobileProductGrid**: Touch-friendly product browsing
- **MobileContactForm**: Simplified form layouts

## 🎯 **Implementation Priority**

### **Phase 1: Core Components**

1. Global layout components (Header, Footer, Breadcrumb)
2. Basic content blocks (Hero, Text, Image)
3. Homepage components
4. Product page components

### **Phase 2: Specialized Components**

1. Page-specific components
2. Advanced content blocks
3. Form components
4. Interactive elements

### **Phase 3: Enhancement Components**

1. Animation and transitions
2. Advanced interactions
3. Performance optimizations
4. Accessibility enhancements

## 📊 **Component Migration Mapping**

### **Existing Component → PayloadCMS Block**

```typescript
// Current static component
<ProductsBentoGrid products={staticProducts} />

// Target PayloadCMS dynamic component
<ProductsBentoGrid
  products={payloadProducts}
  locale={locale}
  isEditing={isEditing}
/>
```

### **Content Structure Migration**

```typescript
// Current JSON-based content
const heroContent = {
  title: t("hero.title"),
  description: t("hero.description"),
  image: "/static/hero.jpg",
};

// Target PayloadCMS content
const heroContent = {
  title: block.title, // Localized in PayloadCMS
  description: block.description, // Rich text from PayloadCMS
  image: block.media.url, // Media managed in PayloadCMS
};
```

## ✅ **Quality Assurance Checklist**

### **Component Validation**

- [ ] All existing components documented
- [ ] PayloadCMS block equivalents defined
- [ ] Responsive design specifications included
- [ ] Accessibility requirements documented
- [ ] Performance considerations noted

### **Content Migration Validation**

- [ ] All content types mapped to blocks
- [ ] Translation keys properly migrated
- [ ] Media assets migration planned
- [ ] Form functionality preserved
- [ ] SEO components maintained

### **Technical Implementation Validation**

- [ ] Component props interfaces defined
- [ ] TypeScript types documented
- [ ] Error handling specified
- [ ] Loading states planned
- [ ] Edit mode functionality included

---

**Document Created**: August 11, 2025  
**Status**: Complete Component Specification  
**Coverage**: All page types and components documented  
**Next Step**: Implementation of PayloadCMS content blocks
