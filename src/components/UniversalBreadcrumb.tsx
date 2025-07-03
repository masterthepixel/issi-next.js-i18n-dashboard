'use client';

import { isHomepage } from '@/utils/breadcrumbUtils';
import { SmartBreadcrumbGenerator, type BreadcrumbItem, type BreadcrumbStructuredData, type PageSEOData } from '@/utils/smartBreadcrumbGenerator';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
import BreadcrumbWithGlobe from './BreadcrumbWithGlobe';

interface UniversalBreadcrumbProps {
  lang: string;
  messages: any;
  className?: string;
  enableAutoGeneration?: boolean;
}

interface BreadcrumbData {
  items: BreadcrumbItem[];
  seoData: PageSEOData;
  structuredData: BreadcrumbStructuredData;
  currentPageTitle: string;
}

/**
 * UniversalBreadcrumb Component
 * 
 * Automatically generates breadcrumbs for all pages except homepage.
 * Features:
 * - Automatic homepage detection and exclusion
 * - Intelligent translation fallbacks with auto-generation
 * - Full SEO optimization with JSON-LD structured data
 */
export const UniversalBreadcrumb = ({
  lang,
  messages,
  className = '',
  enableAutoGeneration = true
}: UniversalBreadcrumbProps) => {
  const pathname = usePathname();
  const [breadcrumbData, setBreadcrumbData] = useState<BreadcrumbData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateBreadcrumb = () => {
      setIsLoading(true);      // Skip homepage - automatic detection
      if (!pathname || isHomepage(pathname, lang)) {
        setBreadcrumbData(null);
        setIsLoading(false);
        return;
      }

      // Generate breadcrumb data with smart fallbacks
      const generator = new SmartBreadcrumbGenerator(lang, pathname, messages);
      const items = generator.generateBreadcrumbItems();
      const seoData = generator.generateSEOData();
      const structuredData = generator.generateStructuredData();

      // Set breadcrumb data
      const data: BreadcrumbData = {
        items,
        seoData,
        structuredData,
        currentPageTitle: seoData.title
      };

      setBreadcrumbData(data);
      setIsLoading(false);


    };

    generateBreadcrumb();

  }, [pathname, lang, messages, enableAutoGeneration]);

  // Don't render during loading or on homepage
  if (isLoading || !breadcrumbData) {
    return null;
  }
  return (
    <div className={`max-w-7xl mx-auto px-2 py-8 ${className}`}>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData.structuredData)
        }}
      />
      {/* SEO Meta Tags - Note: These should ideally be in the page head, not here */}
      {/* This is a fallback for pages without proper metadata */}
      <div className="sr-only">
        <meta name="description" content={breadcrumbData.seoData.description} />
        <meta name="keywords" content={breadcrumbData.seoData.keywords} />
        <link rel="canonical" href={breadcrumbData.seoData.canonical} />
      </div>      {/* Breadcrumb Component with Globe */}
      <IntlProvider locale={lang} messages={messages}>
        <BreadcrumbWithGlobe
          items={breadcrumbData.items}
          title={breadcrumbData.currentPageTitle}
          description={breadcrumbData.seoData.description}
          backLabel={messages?.nav?.home || 'Home'}
          backHref={`/${lang}`}
        />
      </IntlProvider>
    </div>
  );
};

export default UniversalBreadcrumb;
