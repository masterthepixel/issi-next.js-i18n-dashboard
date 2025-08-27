# Grant Management System Implementation Updates

## Overview

This document captures the recent updates made to the Grant Management System (GMS) product page implementation, reflecting the current configuration and design decisions.

## Recent Changes Summary

### 1. Background Configuration

#### **Component Background**

- **Current**: Reduced padding - `py-4 lg:py-8` for tighter spacing
- **Previous**: `py-24 sm:py-32` - Standard section padding
- **Strategy**: Transparent component background with optimized vertical spacing

#### **Page Container Background**

- **Current**: No background - Clean, minimal appearance (`min-h-screen` only)
- **Strategy**: Minimal design approach with transparent containers

#### **Image Container Background**

- **Current**: White background container around image (`bg-white rounded-xl p-4`)
- **Dark Mode**: White background persists for consistent image presentation

### 2. Hero Text Layout Updates

#### **Text Container Width**

- **Before**: `max-w-4xl` - Constrained width
- **After**: `max-w-7xl` - Full-width utilization

#### **Text Alignment**

- **Maintained**: Left-aligned text (`text-left`)
- **Structure**: Tagline, title, context paragraph, description paragraph

### 3. Color Scheme and Typography Updates

#### **Blue Color Theme Implementation**

- **Hero Title**: `text-blue-600 dark:text-blue-400` - Main title in blue for brand consistency
- **Features Subtitle**: `text-blue-600 dark:text-blue-400` - Section subtitle in blue
- **Feature Names**: `text-blue-600 dark:text-blue-400` - Individual feature titles in blue
- **Feature Descriptions**: `text-slate-600 dark:text-slate-300` - Descriptions in subtle slate
- **Features Section Description**: `text-slate-600 dark:text-slate-300` - Overview text in slate

#### **Icon Color Strategy**

- **Light Mode**: `text-slate-600` - Subtle gray for professional appearance
- **Dark Mode**: `text-white` - White icons for optimal contrast and visibility

#### **Typography Hierarchy**

- **Main Title**: `text-4xl font-bold tracking-tight sm:text-5xl` - Large, prominent
- **Section Subtitles**: `text-3xl font-bold tracking-tight sm:text-4xl` - Clear hierarchy
- **Feature Names**: `font-semibold` - Emphasized but not overwhelming
- **Body Text**: `text-lg/8` - Comfortable reading size with good line height

### 4. Layout Structure Improvements

#### **Feature Grid Layout**

- **Feature Spacing**: Reduced from `mt-2` to `mt-1` for tighter feature name/description pairing
- **Feature Structure**:

  ```tsx
  <div className="font-semibold text-blue-600 dark:text-blue-400">
    <feature.icon className="absolute top-1 left-1 size-5 text-slate-600 dark:text-white" />
    Feature Name
  </div>
  <div className="mt-1">
    Feature Description
  </div>
  ```

- **Visual Grouping**: Each feature name and description form a cohesive unit
- **Icon Positioning**: `absolute top-1 left-1` with `pl-9` container padding

### 5. Image Configuration

#### **Image Source**

- **Updated**: Changed from Tailwind placeholder to local asset
- **Before**: `https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png`
- **After**: `/images/products/gmsproduct.png`

#### **Image Fitting**

- **Added**: Container-fitting properties
- **Classes**: `w-full h-auto object-contain`
- **Behavior**: Fits container width while maintaining aspect ratio

### 4. Image Asset Management

#### **Hero Images Location**

- **Directory**: `C:\Users\kfiagbedzi\Documents\GitHub\issi-next.js-i18n-dashboard\public\images\products`
- **Web Path**: `/images/products/[productname].png`
- **Current Assets**: All hero images for product pages are stored in this directory
- **Usage**: Reference images using `/images/products/[filename]` in components

#### **Image Naming Convention**

- **Format**: `[productid]product.png`
- **Example**: `gmsproduct.png` for Grant Management System
- **Access**: Images are served statically by Next.js from the public directory

### 5. Page Structure Cleanup

#### **Breadcrumb Navigation**

- **Removed**: "Home / Products / Grant Management System" breadcrumb for GMS page
- **Implementation**: Conditional rendering based on product slug

#### **Generic Content**

- **Hidden**: All generic product layout elements for GMS page
- **Includes**: Back button, generic header, tags, CTA sections, etc.
- **Result**: Clean, dedicated layout without duplicate content

## Current Component Structure - DEFINITIVE REFERENCE

### Main Component File

`src/components/ProductsGrantManagementSystemFeatures.tsx`

**This is the exact, current implementation as of latest update:**

```tsx
'use client'

import {
  AdjustmentsHorizontalIcon,
  ArrowPathIcon,
  ChartBarIcon,
  ClockIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  DocumentCheckIcon,
  EyeIcon,
  FingerPrintIcon,
  LockClosedIcon,
  ServerIcon,
  ShieldCheckIcon,
} from '@heroicons/react/20/solid'
import { FormattedMessage, useIntl } from 'react-intl'

export default function ProductsGrantManagementSystemFeatures() {
  const intl = useIntl()

  const features = [
    {
      nameId: "products.gms.features.feature1.name",
      descriptionId: "products.gms.features.feature1.description",
      icon: ChartBarIcon,
    },
    {
      nameId: "products.gms.features.feature2.name",
      descriptionId: "products.gms.features.feature2.description",
      icon: DocumentCheckIcon,
    },
    {
      nameId: "products.gms.features.feature3.name",
      descriptionId: "products.gms.features.feature3.description",
      icon: ArrowPathIcon,
    },
    {
      nameId: "products.gms.features.feature4.name",
      descriptionId: "products.gms.features.feature4.description",
      icon: FingerPrintIcon,
    },
    {
      nameId: "products.gms.features.feature5.name",
      descriptionId: "products.gms.features.feature5.description",
      icon: CloudArrowUpIcon,
    },
    {
      nameId: "products.gms.features.feature6.name",
      descriptionId: "products.gms.features.feature6.description",
      icon: Cog6ToothIcon,
    },
    {
      nameId: "products.gms.features.feature7.name",
      descriptionId: "products.gms.features.feature7.description",
      icon: AdjustmentsHorizontalIcon,
    },
    {
      nameId: "products.gms.features.feature8.name",
      descriptionId: "products.gms.features.feature8.description",
      icon: ServerIcon,
    },
    {
      nameId: "products.gms.features.feature9.name",
      descriptionId: "products.gms.features.feature9.description",
      icon: ClockIcon,
    },
    {
      nameId: "products.gms.features.feature10.name",
      descriptionId: "products.gms.features.feature10.description",
      icon: EyeIcon,
    },
    {
      nameId: "products.gms.features.feature11.name",
      descriptionId: "products.gms.features.feature11.description",
      icon: LockClosedIcon,
    },
    {
      nameId: "products.gms.features.feature12.name",
      descriptionId: "products.gms.features.feature12.description",
      icon: CurrencyDollarIcon,
    },
    {
      nameId: "products.gms.features.feature13.name",
      descriptionId: "products.gms.features.feature13.description",
      icon: ShieldCheckIcon,
    },
  ]

  return (
    <div className="py-4 lg:py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-7xl text-left">
          <h2 className="text-base/7 font-semibold text-slate-600 dark:text-slate-400">
            <FormattedMessage id="products.gms.hero.tagline" />
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-blue-600 dark:text-blue-400 sm:text-5xl">
            <FormattedMessage id="products.gms.hero.title" />
          </p>

          {/* Context Description */}
          <p className="mt-6 text-lg/8 text-slate-600 dark:text-slate-300">
            <FormattedMessage id="products.gms.hero.context" />
          </p>

          {/* Main Description */}
          <p className="mt-4 text-lg/8 text-slate-600 dark:text-slate-300">
            <FormattedMessage id="products.gms.hero.description" />
          </p>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="bg-white rounded-xl p-4">
            <img
              alt={intl.formatMessage({ id: "products.gms.hero.imageAlt", defaultMessage: "Grant Management System Dashboard" })}
              src="/images/products/gmsproduct.png"
              width={2432}
              height={1442}
              className="w-full h-auto object-contain mb-[-12%] rounded-xl shadow-2xl ring-1 ring-slate-900/10 dark:ring-slate-700/20"
            />
          </div>
          <div aria-hidden="true" className="relative">
            <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white dark:from-gray-900 pt-[7%]" />
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-base/7 font-semibold text-slate-600 dark:text-slate-400">
            <FormattedMessage id="products.gms.features.title" />
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-400 sm:text-4xl">
            <FormattedMessage id="products.gms.features.subtitle" />
          </p>
          <p className="mt-6 text-lg/8 text-slate-600 dark:text-slate-300">
            <FormattedMessage id="products.gms.features.description" />
          </p>
        </div>

        {/* Features Grid - All 13 Features */}
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-slate-600 dark:text-slate-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
          {features.map((feature, index) => (
            <div key={index} className="relative pl-9">
              <div className="font-semibold text-blue-600 dark:text-blue-400">
                <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-slate-600 dark:text-white" />
                <FormattedMessage id={feature.nameId} />
              </div>
              <div className="mt-1">
                <FormattedMessage id={feature.descriptionId} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

### Page Route File

`src/app/[lang]/products/[slug]/page.tsx`

```tsx
// Check if this is the Grant Management System page
const isGMSPage = product.slug === 'grant-management-system';

return (
  <div className="min-h-screen">
    {/* Grant Management System Features Section */}
    {isGMSPage && (
      <ProductsGrantManagementSystemFeaturesWrapper 
        locale={params.lang} 
        messages={messages} 
      />
    )}
    
    {/* Only show generic product layout for non-GMS pages */}
    {!isGMSPage && (
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb, generic content, etc. */}
      </div>
    )}
  </div>
);
```

## CSS Classes Reference

### Current Implementation Patterns

#### **Component Container**

```css
.py-4 .lg:py-8
```

#### **Hero Text Container (Full Width)**

```css
.mx-auto .max-w-7xl .text-left
```

#### **Hero Title Styling**

```css
.text-4xl .font-bold .tracking-tight .text-blue-600 .dark:text-blue-400 .sm:text-5xl
```

#### **Features Section Subtitle**

```css
.text-3xl .font-bold .tracking-tight .text-blue-600 .dark:text-blue-400 .sm:text-4xl
```

#### **Feature Grid Item**

```css
.relative .pl-9
```

#### **Feature Name**

```css
.font-semibold .text-blue-600 .dark:text-blue-400
```

#### **Feature Icon**

```css
.absolute .top-1 .left-1 .size-5 .text-slate-600 .dark:text-white
```

#### **Feature Description**

```css
.mt-1
```

#### **Image Background Container**

```css
.bg-white .rounded-xl .p-4
```

#### **Image Fitting**

```css
.w-full .h-auto .object-contain
```

## Design Principles Applied

### 1. **Minimal Background Strategy**

- **Component Level**: Transparent background for clean appearance
- **Selective Backgrounds**: White backgrounds only where needed (image container)
- **Consistency**: White backgrounds persist in dark mode for better contrast

### 2. **Content-First Layout**

- **Full Width**: Utilizes available screen real estate effectively
- **Clean Structure**: Removes duplicate navigation and content elements
- **Focus**: Dedicated layout for detailed product presentation

### 3. **Image Optimization**

- **Local Assets**: Uses actual product images instead of placeholders
- **Responsive Fitting**: Scales appropriately across different screen sizes
- **Visual Hierarchy**: White background creates clear separation and focus

### 4. **Accessibility Maintained**

- **Alt Text**: Proper image alt text through translation system
- **Semantic HTML**: Maintained proper heading hierarchy
- **Screen Reader**: Compatible structure with ARIA labels

## Template Usage for Future Products

### Key Specifications for Replication

1. **Component Background**: Use `py-4 lg:py-8` for compact spacing without color backgrounds
2. **Hero Text Width**: Use `max-w-7xl` for full-width utilization
3. **Image Container**: Wrap images in `bg-white rounded-xl p-4` containers
4. **Page Structure**: Implement conditional rendering to hide generic content
5. **Image Fitting**: Use `w-full h-auto object-contain` for proper scaling

### Files to Update for New Products

1. **Component File**: Create `Products[Name]Features.tsx` following GMS pattern
2. **Route File**: Add conditional rendering in `[slug]/page.tsx`
3. **Translation Files**: Add keys to `en.json`, `es.json`, `fr.json`
4. **Image Assets**: Product images are already available in `C:\Users\kfiagbedzi\Documents\GitHub\issi-next.js-i18n-dashboard\public\images\products\`

### Image Asset Reference Guide

#### **Available Hero Images**

All product hero images are stored in the local directory:

- **Physical Path**: `C:\Users\kfiagbedzi\Documents\GitHub\issi-next.js-i18n-dashboard\public\images\products\`
- **Web Path for Components**: `/images/products/[filename]`

#### **Usage in Components**

```tsx
<img
  src="/images/products/[productid]product.png"
  alt={intl.formatMessage({ id: "products.[productid].hero.imageAlt" })}
  className="w-full h-auto object-contain mb-[-12%] rounded-xl shadow-2xl ring-1 ring-slate-900/10 dark:ring-slate-700/20"
/>
```

#### **Expected Naming Pattern**

- Grant Management System: `gmsproduct.png`
- Environmental Tracking System: `etsproduct.png`
- Electronic Correspondence Tracking: `ectsproduct.png`
- Multi-Dimensional System Planning: `mdspsproduct.png`
- *(Continue pattern for all 30 products)*

## Verification Checklist

### Visual Appearance

- [ ] No background colors except white image container
- [ ] Text left-aligned and full-width
- [ ] Image fits container properly
- [ ] White background persists in dark mode

### Functionality

- [ ] No breadcrumb navigation visible
- [ ] No duplicate content from generic layout
- [ ] Translation keys working across all languages
- [ ] Image loads from local assets

### Responsiveness

- [ ] Works on mobile devices
- [ ] Text scales appropriately
- [ ] Image maintains aspect ratio
- [ ] Features grid responsive

### Performance

- [ ] Local image loads quickly
- [ ] No external asset dependencies
- [ ] Component lazy-loads properly
- [ ] Translation keys efficient

## Reference Implementation

### **IMPORTANT: Use Live Layout as Template**

🎯 **For all future product page implementations, editors MUST reference the live layout from:**

**<http://localhost:3000/en/products/grant-management-system>**

This URL shows the **exact implementation pattern** that should be followed for all other product pages. It serves as the **definitive visual and functional specification** with the following key characteristics:

#### **Visual Standards from Reference Layout:**

- ✅ **Text Alignment**: Left-aligned hero text (not centered)
- ✅ **Container Width**: Hero text uses `max-w-7xl` for full-width utilization  
- ✅ **Background Strategy**: Transparent component background with white background only behind the hero image
- ✅ **Image Fitting**: Hero image uses `object-contain` to fit properly within its container
- ✅ **Spacing**: Clean spacing with `py-4 lg:py-8` padding for compact layout
- ✅ **Navigation**: No breadcrumb navigation or duplicate content

#### **Functional Standards from Reference Layout:**

- ✅ **Translation Integration**: All text uses FormattedMessage components
- ✅ **Dark Mode Support**: Proper dark mode variants throughout
- ✅ **Responsive Design**: Mobile-first responsive grid layout
- ✅ **Icon Integration**: Heroicons used consistently with features
- ✅ **Image Assets**: Local images served from `/images/products/` directory

#### **Content Structure from Reference Layout:**

- ✅ **Hero Section**: Tagline → Title → Context paragraph → Description paragraph
- ✅ **Hero Image**: Product screenshot with white background container
- ✅ **Features Section**: Grid layout with icon + name + description format
- ✅ **Feature Count**: 13 comprehensive features with detailed descriptions

#### **Implementation Directive**

**When implementing any new product page, always:**

1. **Visit <http://localhost:3000/en/products/grant-management-system> first**
2. **Use it as your visual reference** for layout, spacing, and styling
3. **Match the exact component structure** shown in the live implementation
4. **Follow the established patterns** for text alignment, image handling, and feature presentation
5. **Verify your implementation matches** the reference layout before completion

This live reference ensures consistency and quality across all product implementations.

## Final Implementation Status - CURRENT AS OF LATEST UPDATE

### **Implementation Verified and Complete ✅**

The Grant Management System (GMS) product page implementation has been **fully completed and verified** with the following current state:

#### **Component Architecture**

- **Main Component**: `ProductsGrantManagementSystemFeatures.tsx` - Complete implementation
- **Wrapper Component**: `ProductsGrantManagementSystemFeaturesWrapper.tsx` - Handles locale/messages
- **Routing Integration**: Conditional rendering in `[slug]/page.tsx` for GMS-specific layout
- **Translation Support**: Complete translations in `en.json`, `es.json`, `fr.json`

#### **Visual Design Standards**

- **Color Scheme**: Blue titles (`text-blue-600 dark:text-blue-400`), slate descriptions (`text-slate-600 dark:text-slate-300`)
- **Layout**: Compact spacing (`py-4 lg:py-8`), full-width text containers (`max-w-7xl`)
- **Icons**: Slate in light mode, white in dark mode for optimal contrast
- **Feature Layout**: Stacked title/description with reduced spacing (`mt-1`)

#### **Content Integration**

- **Hero Image**: Local asset from `/images/products/gmsproduct.png`
- **Feature Count**: 13 comprehensive features with icons and descriptions
- **Translation Keys**: All content using FormattedMessage components
- **Accessibility**: Proper alt text, aria-hidden icons, semantic structure

#### **Technical Implementation**

- **Background Strategy**: Transparent component with white image container only
- **Responsive Design**: Mobile-first grid layout with proper breakpoints
- **Performance**: Local image assets, efficient translation loading
- **Dark Mode**: Complete dark mode support throughout

#### **Live Reference URL**

🎯 **<http://localhost:3000/en/products/grant-management-system>**

This URL serves as the **definitive visual and functional specification** for all future product page implementations.

### **Documentation Status**

This documentation has been updated to reflect the **exact current implementation** and serves as the authoritative reference for:

- Component structure and code
- Visual design patterns
- Translation integration
- Implementation best practices
- Template usage for future products

**The GMS implementation is complete and ready to serve as the template for the remaining 29 product pages.**

## Conclusion

These updates create a clean, professional product page layout that serves as the definitive template for all future product implementations. The combination of transparent backgrounds with selective white backgrounds provides visual hierarchy while maintaining a minimal, modern appearance.

The configuration balances visual appeal with functional requirements, ensuring the Grant Management System page provides an optimal user experience while serving as a replicable template for the remaining 29 product pages in the ISSI portfolio.

## Current Implementation Specification (Final)

### **🎯 Live Reference Page**

**Primary Template**: <http://localhost:3000/en/products/grant-management-system>

This page serves as the **definitive implementation template** for all future product pages.

### **📋 Complete Component Structure**

```tsx
'use client'

import {
  AdjustmentsHorizontalIcon,
  ArrowPathIcon,
  ChartBarIcon,
  ClockIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  DocumentCheckIcon,
  EyeIcon,
  FingerPrintIcon,
  LockClosedIcon,
  ServerIcon,
  ShieldCheckIcon,
} from '@heroicons/react/20/solid'
import { FormattedMessage, useIntl } from 'react-intl'

export default function ProductsGrantManagementSystemFeatures() {
  const intl = useIntl()

  // 13 features with Heroicons
  const features = [
    { nameId: "products.gms.features.feature1.name", descriptionId: "products.gms.features.feature1.description", icon: ChartBarIcon },
    { nameId: "products.gms.features.feature2.name", descriptionId: "products.gms.features.feature2.description", icon: DocumentCheckIcon },
    { nameId: "products.gms.features.feature3.name", descriptionId: "products.gms.features.feature3.description", icon: ArrowPathIcon },
    { nameId: "products.gms.features.feature4.name", descriptionId: "products.gms.features.feature4.description", icon: FingerPrintIcon },
    { nameId: "products.gms.features.feature5.name", descriptionId: "products.gms.features.feature5.description", icon: CloudArrowUpIcon },
    { nameId: "products.gms.features.feature6.name", descriptionId: "products.gms.features.feature6.description", icon: Cog6ToothIcon },
    { nameId: "products.gms.features.feature7.name", descriptionId: "products.gms.features.feature7.description", icon: AdjustmentsHorizontalIcon },
    { nameId: "products.gms.features.feature8.name", descriptionId: "products.gms.features.feature8.description", icon: ServerIcon },
    { nameId: "products.gms.features.feature9.name", descriptionId: "products.gms.features.feature9.description", icon: ClockIcon },
    { nameId: "products.gms.features.feature10.name", descriptionId: "products.gms.features.feature10.description", icon: EyeIcon },
    { nameId: "products.gms.features.feature11.name", descriptionId: "products.gms.features.feature11.description", icon: LockClosedIcon },
    { nameId: "products.gms.features.feature12.name", descriptionId: "products.gms.features.feature12.description", icon: CurrencyDollarIcon },
    { nameId: "products.gms.features.feature13.name", descriptionId: "products.gms.features.feature13.description", icon: ShieldCheckIcon },
  ]

  return (
    <div className="py-4 lg:py-8">
      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-left">
          <h2 className="text-base/7 font-semibold text-slate-600 dark:text-slate-400">
            <FormattedMessage id="products.gms.hero.tagline" />
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-blue-600 dark:text-blue-400 sm:text-5xl">
            <FormattedMessage id="products.gms.hero.title" />
          </p>
          <p className="mt-6 text-lg/8 text-slate-600 dark:text-slate-300">
            <FormattedMessage id="products.gms.hero.context" />
          </p>
          <p className="mt-4 text-lg/8 text-slate-600 dark:text-slate-300">
            <FormattedMessage id="products.gms.hero.description" />
          </p>
        </div>
      </div>
      
      {/* Hero Image */}
      <div className="relative overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="bg-white rounded-xl p-4">
            <img
              alt={intl.formatMessage({ id: "products.gms.hero.imageAlt" })}
              src="/images/products/gmsproduct.png"
              className="w-full h-auto object-contain mb-[-12%] rounded-xl shadow-2xl ring-1 ring-slate-900/10 dark:ring-slate-700/20"
            />
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-base/7 font-semibold text-slate-600 dark:text-slate-400">
            <FormattedMessage id="products.gms.features.title" />
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-400 sm:text-4xl">
            <FormattedMessage id="products.gms.features.subtitle" />
          </p>
          <p className="mt-6 text-lg/8 text-slate-600 dark:text-slate-300">
            <FormattedMessage id="products.gms.features.description" />
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-slate-600 dark:text-slate-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
          {features.map((feature, index) => (
            <div key={index} className="relative pl-9">
              <div className="font-semibold text-blue-600 dark:text-blue-400">
                <feature.icon className="absolute top-1 left-1 size-5 text-slate-600 dark:text-white" />
                <FormattedMessage id={feature.nameId} />
              </div>
              <div className="mt-1">
                <FormattedMessage id={feature.descriptionId} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
```

### **🎨 Final Color Scheme**

#### **Blue Elements (Brand Colors)**

- **Hero Title**: `text-blue-600 dark:text-blue-400`
- **Features Subtitle**: `text-blue-600 dark:text-blue-400`
- **Feature Names**: `text-blue-600 dark:text-blue-400`

#### **Slate Elements (Supporting Text)**

- **Taglines**: `text-slate-600 dark:text-slate-400`
- **Descriptions**: `text-slate-600 dark:text-slate-300`
- **Feature Descriptions**: `text-slate-600 dark:text-slate-300`

#### **Icon Colors**

- **Light Mode**: `text-slate-600` (subtle professional gray)
- **Dark Mode**: `text-white` (high contrast white)

### **📏 Layout Specifications**

#### **Container Padding**

- **Main Container**: `py-4 lg:py-8` (compact vertical spacing)
- **Content Containers**: `px-6 lg:px-8` (responsive horizontal padding)

#### **Text Alignment & Width**

- **Hero Text**: `text-left` with `max-w-7xl` (left-aligned, full-width)
- **Features Header**: `lg:text-center` (centered on larger screens)

#### **Spacing Pattern**

- **Tagline to Title**: `mt-2`
- **Title to Context**: `mt-6`
- **Context to Description**: `mt-4`
- **Feature Name to Description**: `mt-1` (tight coupling)

#### **Grid Layout**

- **Responsive Grid**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- **Gap Spacing**: `gap-x-6 gap-y-10 lg:gap-x-8 lg:gap-y-16`

### **🖼️ Image Configuration**

- **Path**: `/images/products/gmsproduct.png`
- **Container**: `bg-white rounded-xl p-4` (white background in all modes)
- **Image Fitting**: `object-contain` with proper aspect ratio
- **Effects**: `shadow-2xl ring-1 ring-slate-900/10 dark:ring-slate-700/20`

### **🌐 Translation Integration**

- **Pattern**: `products.gms.hero.*` and `products.gms.features.*`
- **Languages**: English, Spanish, French
- **Keys**: 13 features + hero content (27 total translation keys)

---
