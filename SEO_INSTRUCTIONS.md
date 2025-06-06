# SEO Optimization Guide for ISSI's Multilingual Website

This document outlines best practices and implementation guidelines for optimizing the SEO of ISSI's Next.js multilingual website. The guide provides general recommendations applicable to all pages, with the Maryland DOT MBE/DBE/SBE certification page used as a specific implementation example.

## Table of Contents

1. [Multilingual Metadata Implementation](#multilingual-metadata-implementation)
2. [Structured Data](#structured-data)
3. [Image Optimization](#image-optimization)
4. [URL Structure & Localization](#url-structure--localization)
5. [Performance Optimization](#performance-optimization)
6. [Content Enhancement](#content-enhancement)
7. [Language-Specific SEO](#language-specific-seo)
8. [Testing & Monitoring](#testing--monitoring)

## Multilingual Metadata Implementation

The current static metadata approach needs to be enhanced with dynamic, language-specific metadata for better SEO performance.

### Current Implementation

Many pages across the site currently use a static metadata approach, as seen in the MDOT page example:

```tsx
export const metadata: Metadata = {
  title: "Maryland DOT MBE/DBE/SBE Certification | ISSI Compliance",
  description:
    "Learn more about ISSI's Maryland Department of Transportation MBE/DBE/SBE certification. Minority, Disadvantaged, and Small Business Enterprise.",
};
```

### Recommended Implementation for All Pages

Replace static metadata with the `generateMetadata` function that uses the `intl` object. This pattern should be applied to **all pages** across the site:

```tsx
export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
  const intl = await getIntl(lang);
  const pageId = "page_identifier"; // e.g., "mdot", "about", "elearning", etc.
  const pageUrl = "page-specific-url"; // e.g., "compliance/mdot", "about", etc.
  
  return {
    title: intl.formatMessage({ id: `${pageId}.meta.title` }),
    description: intl.formatMessage({ id: `${pageId}.meta.description` }),
    keywords: intl.formatMessage({ id: `${pageId}.meta.keywords` }),
    alternates: {
      canonical: `https://issi.com/${lang}/${pageUrl}`,
      languages: {
        'en': `https://issi.com/en/${pageUrl}`,
        'fr': `https://issi.com/fr/${pageUrl}`,
        'es': `https://issi.com/es/${pageUrl}`,
      },
    },
    openGraph: {
      title: intl.formatMessage({ id: `${pageId}.meta.og.title` }),
      description: intl.formatMessage({ id: `${pageId}.meta.og.description` }),
      url: `https://issi.com/${lang}/${pageUrl}`,
      siteName: "ISSI",
      locale: lang,
      type: "website",
      images: [
        {
          url: `/images/${pageId}/${pageId}-og-${lang}.jpg`,
          width: 1200,
          height: 630,
          alt: intl.formatMessage({ id: `${pageId}.meta.og.image.alt` }),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: intl.formatMessage({ id: `${pageId}.meta.twitter.title` }),
      description: intl.formatMessage({ id: `${pageId}.meta.twitter.description` }),
      images: [`/images/${pageId}/${pageId}-twitter-${lang}.jpg`],
    },
  };
}
```

### Example: MDOT Page Implementation

```tsx
// src/app/[lang]/compliance/mdot/page.tsx
export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
  const intl = await getIntl(lang);
  
  return {
    title: intl.formatMessage({ id: "mdot.meta.title" }),
    description: intl.formatMessage({ id: "mdot.meta.description" }),
    keywords: intl.formatMessage({ id: "mdot.meta.keywords" }),
    alternates: {
      canonical: `https://issi.com/${lang}/compliance/mdot`,
      languages: {
        'en': `https://issi.com/en/compliance/mdot`,
        'fr': `https://issi.com/fr/compliance/mdot`,
        'es': `https://issi.com/es/compliance/mdot`,
      },
    },
    // Additional metadata properties...
  };
}
```

### Required Translation Keys for Each Page

Add the following translation keys to each language file for every page:

```json
{
  "pageId.meta.title": "Page Title | ISSI",
  "pageId.meta.description": "Comprehensive description of the page with relevant keywords.",
  "pageId.meta.keywords": "keyword1, keyword2, keyword3, ISSI, relevant-term",
  "pageId.meta.og.title": "Engaging Title for Social Sharing | ISSI",
  "pageId.meta.og.description": "Compelling description for social media sharing.",
  "pageId.meta.og.image.alt": "Descriptive alt text for the Open Graph image",
  "pageId.meta.twitter.title": "Concise Twitter Title | ISSI",
  "pageId.meta.twitter.description": "Brief description optimized for Twitter sharing."
}
```

## Structured Data

Implement JSON-LD structured data to improve search engine understanding of your content and enable rich search results. This should be applied to all pages across the site.

### General Pattern for All Pages

```tsx
export default async function Page({ params: { lang } }: Props) {
  const intl = await getIntl(lang);
  
  // Schema type should match page content
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage", // Change based on page type: Organization, Service, Article, etc.
    "name": intl.formatMessage({ id: "pageId.meta.title" }),
    "description": intl.formatMessage({ id: "pageId.meta.description" }),
    "url": `https://issi.com/${lang}/page-url`,
    "inLanguage": lang,
    // Additional schema properties relevant to the page
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <main>
        {/* Page content */}
      </main>
    </>
  );
}
```

### Schema Types by Page Category

Implement the appropriate schema type based on the page content:

1. **Service Pages** (MDOT, Compliance, etc.)
   ```json
   {
     "@type": "Service",
     "serviceType": "Service name",
     "provider": {
       "@type": "Organization",
       "name": "ISSI"
     }
   }
   ```

2. **About/Company Pages**
   ```json
   {
     "@type": "Organization",
     "name": "ISSI",
     "foundingDate": "1995",
     "description": "Description"
   }
   ```

3. **Blog/News Pages**
   ```json
   {
     "@type": "Article",
     "headline": "Article title",
     "datePublished": "2023-06-01",
     "author": {
       "@type": "Organization",
       "name": "ISSI"
     }
   }
   ```

### MDOT Page Example

```tsx
export default async function MDOTPage({ params: { lang } }: Props) {
  const intl = await getIntl(lang);
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": intl.formatMessage({ id: "mdot.meta.title" }),
    "description": intl.formatMessage({ id: "mdot.meta.description" }),
    "provider": {
      "@type": "Organization",
      "name": "ISSI",
      "url": "https://issi.com"
    },
    "serviceType": "Certification",
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "name": "Minority Business Enterprise (MBE)",
        "credentialCategory": "certification",
        "recognizedBy": {
          "@type": "GovernmentOrganization",
          "name": "Maryland Department of Transportation"
        }
      },
      // Additional credentials...
    ]
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <main className="-mt-20">
        {/* MDOT page content */}
      </main>
    </>
  );
}
```

## Image Optimization

Optimize images for SEO and performance by using Next.js Image component with proper alt text and sizing. Apply these practices to all images across the entire site.

### Implementation for All Pages

```tsx
import Image from 'next/image';

// Hero image pattern for all pages
<Image 
  src={`/images/${pageId}/${imageName}-${lang}.jpg`}
  alt={intl.formatMessage({ id: `${pageId}.images.${imageName}.alt` })}
  width={1200}
  height={600}
  priority // For above-the-fold images
  className="rounded-lg shadow-lg"
/>

// Content images pattern
<Image 
  src={`/images/${pageId}/${imageName}-${lang}.jpg`}
  alt={intl.formatMessage({ id: `${pageId}.images.${imageName}.alt` })}
  width={600}
  height={400}
  className="rounded-lg"
/>
```

### MDOT Page Example

```tsx
// In the Hero section of MDOT page
<div className="relative z-10 text-center max-w-4xl mx-auto px-6">
  <Image 
    src={`/images/compliance/mdot-certification-${lang}.jpg`}
    alt={intl.formatMessage({ id: "mdot.hero.image.alt" })}
    width={600}
    height={400}
    priority
    className="rounded-lg shadow-lg mb-8"
  />
  <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-[var(--h1-gradient-from)] to-[var(--h1-gradient-to)]">
    {intl.formatMessage({ id: "mdot.hero.title" })}
  </h1>
  {/* Rest of hero section */}
</div>
```

### Translation Keys for Image Alt Text

Each page should include appropriate translation keys for image alt text:

```json
{
  "pageId.images.hero.alt": "Descriptive alt text for hero image",
  "pageId.images.feature1.alt": "Descriptive alt text for feature 1 image",
  "pageId.images.testimonial.alt": "Descriptive alt text for testimonial image"
}
```

### Optimizing All Site Images

1. **Create a standardized image naming convention**:
   - `/images/[section]/[page]-[purpose]-[lang].[ext]`
   - Example: `/images/compliance/mdot-hero-en.jpg`

2. **Prepare responsive images**:
   - Create multiple sizes for different viewports
   - Use the `sizes` property to help the browser select the right image

3. **Optimize image formats**:
   - Use WebP for better compression with Next.js automatic format optimization
   - Set quality values for appropriate balance between quality and file size
```

## URL Structure & Localization

Maintain consistent URL structure across all pages and language variants throughout the site.

### URL Pattern for All Pages

```
https://issi.com/[lang]/[section]/[page]
```

Examples:
- English services: `https://issi.com/en/services/cloud-solutions`
- French about page: `https://issi.com/fr/about`
- Spanish compliance page: `https://issi.com/es/compliance/certifications`

### Implementation Across All Pages

Language-specific URLs are handled through the `[lang]` dynamic segment in the app router. Ensure all internal links across the entire site include the language parameter:

```tsx
// Correct implementation for all pages
<Link href={`/${lang}/services`}>
  {intl.formatMessage({ id: "common.navigation.services" })}
</Link>

// Avoid this pattern as it loses language context
<Link href="/services">
  {intl.formatMessage({ id: "common.navigation.services" })}
</Link>
```

### MDOT Page Example

```tsx
// In the MDOT page
<Link 
  href={`/${lang}/contact`}
  className="bg-primary text-primary-foreground px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
>
  {intl.formatMessage({ id: "mdot.hero.cta.primary" })}
</Link>
```

### Best Practices for All Pages

1. **Consistent URL Structure**: Use the same URL structure across all language variants
2. **Language Parameter**: Always include the language parameter in internal links
3. **Canonical URLs**: Each page should have a canonical URL for each language variant
4. **hreflang Tags**: Implement hreflang tags to indicate language variants of the same content
5. **Language Switcher**: Ensure the language switcher preserves the current page path

## Performance Optimization

Performance is a critical SEO factor. Implement these optimizations across all pages on the site:

### Priority Loading for All Key Pages

Use the `priority` attribute for above-the-fold images on all important pages:

```tsx
// For all hero images across the site
<Image 
  src={`/images/${section}/${page}-hero-${lang}.jpg`}
  alt={intl.formatMessage({ id: `${pageId}.hero.image.alt` })}
  width={1200}
  height={600}
  priority
/>
```

### Site-Wide Component-Level Code Splitting

Implement dynamic imports for below-the-fold sections across all pages:

```tsx
import dynamic from 'next/dynamic';

// For any complex, below-the-fold component across the site
const DynamicComponent = dynamic(() => import('@/components/ComplexComponent'), {
  loading: () => <div className="loading-placeholder">Loading...</div>
});

// Later in your JSX
<DynamicComponent lang={lang} />
```

### MDOT Page Example

```tsx
// In the MDOT page
import dynamic from 'next/dynamic';

const MDOTCapabilities = dynamic(() => import('@/components/MDOTCapabilities'), {
  loading: () => <div className="h-96 flex items-center justify-center">
    <p>Loading capabilities...</p>
  </div>
});

// In the JSX
<MDOTCapabilities lang={lang} />
```

### Global Font Optimization

Optimize font loading site-wide by implementing in the root layout:

```tsx
// In src/app/[lang]/layout.tsx
import { Inter, Roboto } from 'next/font/google';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
});

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-roboto',
});

export default function RootLayout({ children, params }) {
  return (
    <html lang={params.lang} className={`${inter.variable} ${roboto.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### Additional Site-Wide Optimizations

1. **Lazy Loading Non-Critical Content**:
   ```tsx
   import { Suspense } from 'react';
   
   // For all non-critical components across the site
   <Suspense fallback={<div>Loading...</div>}>
     <NonCriticalComponent />
   </Suspense>
   ```

2. **Script Loading Optimization**:
   ```tsx
   // For all external scripts
   <Script
     src="https://example.com/script.js"
     strategy="lazyOnload"
   />
   ```

3. **CSS Optimization**:
   - Use Tailwind's JIT compiler for smaller CSS bundles
   - Implement CSS code splitting by page
   - Consider critical CSS extraction

## Content Enhancement

Improve content structure and keyword optimization across all pages on the site.

### Semantic HTML Structure for All Pages

Use appropriate HTML5 semantic elements throughout the entire site:

```tsx
// Pattern for all pages
<article>
  <header>
    <h1>{intl.formatMessage({ id: "page.title" })}</h1>
  </header>
  <section aria-labelledby="section-id">
    <h2 id="section-id">{intl.formatMessage({ id: "page.section.title" })}</h2>
    <p>{intl.formatMessage({ id: "page.section.content" })}</p>
  </section>
  <aside aria-labelledby="sidebar-id">
    <h3 id="sidebar-id">{intl.formatMessage({ id: "page.sidebar.title" })}</h3>
    <p>{intl.formatMessage({ id: "page.sidebar.content" })}</p>
  </aside>
  <footer>
    <p>{intl.formatMessage({ id: "page.footer.content" })}</p>
  </footer>
</article>
```

### MDOT Page Example

```tsx
// In the MDOT capabilities section
<section aria-labelledby="capabilities-title" id="capabilities" className="container mx-auto py-16 px-6">
  <div className="text-center mb-12">
    <h2 id="capabilities-title" className="text-3xl font-bold mb-4">
      {intl.formatMessage({ id: "mdot.capabilities.title" })}
    </h2>
    <p className="text-muted-foreground max-w-2xl mx-auto">
      {intl.formatMessage({ id: "mdot.capabilities.subtitle" })}
    </p>
  </div>
  {/* Rest of content */}
</section>
```

### Page-Specific Keywords

Each page should have a strategic keyword plan. Here are examples for different page types:

1. **Home Page**:
   - Primary: IT services, software solutions, government contractor
   - Secondary: technology partner, enterprise solutions, federal contractor

2. **Services Pages**:
   - Primary: specific service name, solutions, implementation
   - Secondary: benefits, technologies, expertise

3. **Compliance/Certification Pages** (like MDOT):
   - Primary: certification name, compliance, diversity supplier
   - Secondary: government requirements, contracting, partnerships

4. **About Page**:
   - Primary: company history, leadership, values
   - Secondary: expertise, experience, mission

### Content Guidelines for All Pages

1. **Heading Hierarchy**: Maintain proper heading structure (h1 → h2 → h3) on all pages
2. **Keyword Density**: Ensure 1-2% keyword density in content without keyword stuffing
3. **Internal Linking**: Link to related content across the site
4. **Readable Content**: Use short paragraphs, bullets, and clear language
5. **Call to Action**: Include clear CTAs on every page

## Language-Specific SEO

Optimize content for each supported language by considering language-specific SEO factors across all pages.

### Language-Specific Optimization for All Pages

Each supported language should be optimized separately:

1. **English (en)**:
   - Focus on US/UK search terms and conventions
   - Target US-centric keywords and phrases
   - Consider American English spelling variations

2. **French (fr)**:
   - Adapt content for French-specific terminology
   - Use proper French grammar and conventions
   - Consider Quebec French vs. European French variations

3. **Spanish (es)**:
   - Consider regional variations (Latin American vs. European Spanish)
   - Use appropriate dialect-specific terms
   - Adapt content for Hispanic market preferences

### Language-Specific Content Sections

For country or region-specific content, create dedicated sections:

```tsx
// Pattern for all pages
{lang === 'fr' && (
  <section className="fr-specific-section">
    <h2>{intl.formatMessage({ id: "page.french_specific.title" })}</h2>
    <p>{intl.formatMessage({ id: "page.french_specific.content" })}</p>
  </section>
)}

{lang === 'es' && (
  <section className="es-specific-section">
    <h2>{intl.formatMessage({ id: "page.spanish_specific.title" })}</h2>
    <p>{intl.formatMessage({ id: "page.spanish_specific.content" })}</p>
  </section>
)}
```

### MDOT Page Example

```tsx
// In the MDOT page
{lang === 'fr' && (
  <section className="bg-accent/10 py-12">
    <div className="container mx-auto px-6">
      <h2 className="text-2xl font-bold mb-4">
        {intl.formatMessage({ id: "mdot.french_specific.title" })}
      </h2>
      <p className="text-muted-foreground">
        {intl.formatMessage({ id: "mdot.french_specific.content" })}
      </p>
    </div>
  </section>
)}
```

### Translation Quality Guidelines

1. **Use Professional Translation**: Avoid machine translation for SEO content
2. **Localization, Not Just Translation**: Adapt content to cultural context
3. **Keyword Research by Language**: Conduct separate keyword research for each language
4. **Local Search Considerations**: Optimize for local search factors in each language
5. **Language-Specific Meta Data**: Customize meta titles and descriptions for each language

## Testing & Monitoring

Implement comprehensive testing and monitoring for all pages across all language variants.

### SEO Testing for All Pages

1. Use Lighthouse to test SEO score for each page in each language variant
2. Verify structured data with Google's Rich Results Test for all pages
3. Check mobile usability with Google's Mobile-Friendly Test across the site

### Automated Testing Script for All Pages

Create an automated testing script to evaluate all key pages across all languages:

```js
// scripts/test-seo.js
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

// Define all key pages to test across languages
const pagesToTest = [
  { path: '', name: 'Home' },
  { path: 'about', name: 'About' },
  { path: 'services', name: 'Services' },
  { path: 'compliance/mdot', name: 'MDOT Compliance' },
  { path: 'compliance', name: 'Compliance' },
  { path: 'contact', name: 'Contact' },
  // Add all important pages
];

const languages = ['en', 'fr', 'es'];

// Generate all URLs to test
const urls = [];
for (const lang of languages) {
  for (const page of pagesToTest) {
    urls.push({
      url: `https://issi.com/${lang}/${page.path}`,
      name: `${page.name} (${lang})`
    });
  }
}

async function runLighthouse(pageInfo) {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {
    logLevel: 'info',
    output: 'html',
    onlyCategories: ['seo', 'performance', 'accessibility'],
    port: chrome.port
  };
  
  const runnerResult = await lighthouse(pageInfo.url, options);
  await chrome.kill();
  
  console.log(`SEO score for ${pageInfo.name}: ${runnerResult.lhr.categories.seo.score * 100}`);
  return runnerResult;
}

async function testAllUrls() {
  for (const pageInfo of urls) {
    await runLighthouse(pageInfo);
  }
}

testAllUrls();
```

### Site-Wide Monitoring Setup

Set up monitoring for all pages in all language variants:

1. **Search Console**:
   - Add all language variants as separate properties
   - Monitor indexing status for all key pages
   - Track search performance by language

2. **Analytics**:
   - Configure language tracking in your analytics platform
   - Set up conversion tracking by language
   - Create language-specific dashboards

3. **Uptime Monitoring**:
   - Monitor key pages in all languages
   - Set up alerts for any downtime

### Regular SEO Audit Schedule

Establish a regular SEO audit schedule for all language variants:

1. **Weekly**: Check Search Console for indexing issues
2. **Monthly**: Run Lighthouse tests on key pages
3. **Quarterly**: Conduct comprehensive SEO audits
4. **Annually**: Review and update SEO strategy

## Implementation by Page Type

### 1. Universal Implementation for All Pages

Every page on the site should implement:

- Language-specific metadata using `generateMetadata`
- Appropriate structured data schema
- Optimized images with Next.js Image component
- Proper internal linking with language parameter
- Semantic HTML structure with proper heading hierarchy
- Performance optimizations (code splitting, etc.)

### 2. Service Pages (like MDOT)

```tsx
// src/app/[lang]/services/[serviceId]/page.tsx
export async function generateMetadata({ params: { lang, serviceId } }: Props) {
  const intl = await getIntl(lang);
  
  return {
    title: intl.formatMessage({ id: `services.${serviceId}.meta.title` }),
    description: intl.formatMessage({ id: `services.${serviceId}.meta.description` }),
    // Other metadata
  };
}

export default async function ServicePage({ params: { lang, serviceId } }) {
  const intl = await getIntl(lang);
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": intl.formatMessage({ id: `services.${serviceId}.title` }),
    "description": intl.formatMessage({ id: `services.${serviceId}.description` }),
    "provider": {
      "@type": "Organization",
      "name": "ISSI",
      "url": "https://issi.com"
    }
    // Service-specific schema
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      {/* Service page content */}
    </>
  );
}
```

### 3. Compliance/Certification Pages (like MDOT)

Apply the MDOT example strategies to all certification pages:

- Use appropriate schema for credentials
- Highlight certification details
- Include relevant authority information
- Focus on certification-specific keywords

### 4. Home Page

```tsx
// src/app/[lang]/page.tsx
export async function generateMetadata({ params: { lang } }: Props) {
  const intl = await getIntl(lang);
  
  return {
    title: intl.formatMessage({ id: "home.meta.title" }),
    description: intl.formatMessage({ id: "home.meta.description" }),
    // Other metadata
  };
}

export default async function HomePage({ params: { lang } }) {
  const intl = await getIntl(lang);
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "url": `https://issi.com/${lang}`,
    "name": intl.formatMessage({ id: "home.meta.title" }),
    "description": intl.formatMessage({ id: "home.meta.description" }),
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `https://issi.com/${lang}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      {/* Home page content */}
    </>
  );
}
```

## Implementation Checklist

Use this checklist for every page that needs SEO optimization:

- [ ] Add `generateMetadata` function with language-specific metadata
- [ ] Add translation keys for all metadata fields
- [ ] Implement appropriate structured data schema
- [ ] Optimize images with Next.js Image component and alt text
- [ ] Apply semantic HTML structure
- [ ] Ensure proper heading hierarchy (h1 → h2 → h3)
- [ ] Verify internal links include language parameter
- [ ] Implement performance optimizations
- [ ] Add appropriate keywords in content
- [ ] Create language-specific content sections if needed
- [ ] Test with Lighthouse and other SEO tools
- [ ] Set up monitoring in Search Console

## References

- [Next.js Metadata API Documentation](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Google's SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Schema.org Documentation](https://schema.org/docs/documents.html)
- [Internationalization SEO Best Practices](https://developers.google.com/search/docs/specialty/international)
- [Next.js Image Optimization](https://nextjs.org/docs/pages/building-your-application/optimizing/images)
- [Web Vitals](https://web.dev/vitals/)
