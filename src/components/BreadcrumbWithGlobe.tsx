"use client";

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import dynamic from 'next/dynamic';

// Dynamic import with SSR disabled to prevent window errors
const GeoGlobeInspira = dynamic(() => import('./GeoGlobeInspira'), {
  ssr: false,
  loading: () => <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse" />
});

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbWithGlobeProps {
  items: BreadcrumbItem[];
  title: string;
  backLabel?: string;
  backHref?: string;
  lang?: string;
  baseUrl?: string;
}

export default function BreadcrumbWithGlobe({ 
  items, 
  title, 
  backLabel = "Back", 
  backHref = "/",
  lang = "en",
  baseUrl = "https://issi.com"
}: BreadcrumbWithGlobeProps) {
  
  // Generate structured data for breadcrumbs (SEO)
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "inLanguage": lang,
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      ...(item.href && { "item": `${baseUrl}${item.href}` })
    }))
  };

  return (
    <div>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      
      <div>        {/* Mobile back button */}
        <nav aria-label="Back navigation" className="sm:hidden">
          <a 
            href={backHref} 
            className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
            rel="prev"
            itemProp="url"
          >
            <ChevronLeftIcon aria-hidden="true" className="mr-1 -ml-1 size-5 shrink-0 text-slate-400 dark:text-slate-500" />
            <span itemProp="name">{backLabel}</span>
          </a>
        </nav>
          {/* Desktop breadcrumb */}
        <nav aria-label="Breadcrumb navigation" className="hidden sm:flex" itemScope itemType="https://schema.org/BreadcrumbList">
          <ol role="list" className="flex items-center space-x-2">            {items.map((item, index) => (
              <li key={index} itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
                <div className={`flex ${index > 0 ? 'items-center' : ''}`}>
                  {index > 0 && (
                    <ChevronRightIcon aria-hidden="true" className="size-4 shrink-0 text-slate-400 dark:text-slate-500" />
                  )}
                  {item.href ? (
                    <a 
                      href={item.href} 
                      className={`${index > 0 ? 'ml-2' : ''} text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300`}
                      aria-current={item.isActive ? "page" : undefined}
                      itemProp="item"
                      itemScope 
                      itemType="https://schema.org/WebPage"
                    >
                      <span itemProp="name">{item.label}</span>
                    </a>
                  ) : (
                    <span 
                      className={`${index > 0 ? 'ml-2' : ''} text-sm font-medium text-slate-500 dark:text-slate-400`}
                      aria-current={item.isActive ? "page" : undefined}
                      itemProp="name"
                    >
                      {item.label}
                    </span>
                  )}
                  <meta itemProp="position" content={String(index + 1)} />
                </div>
              </li>
            ))}
          </ol>
        </nav>      </div>      <div className="mt-4 relative">
        <div className="min-w-0 flex-1 pr-2 relative z-10">
          <h1 className="text-3xl font-semibold tracking-tight text-balance text-slate-900 dark:text-white lg:text-4xl" 
              itemProp="headline"
              itemScope 
              itemType="https://schema.org/WebPage">
            {title}
          </h1>
        </div>{/* GeoGlobe Component - positioned absolute to scroll with content */}
        <div className="absolute -top-48 right-0 sm:-top-48 z-0 pointer-events-none">
          <div className="w-[600px] h-[400px] lg:w-[920px] lg:h-[575px] transform translate-x-[40%] sm:translate-x-[25%]">
            <GeoGlobeInspira className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
