"use client";

import { HiHome } from 'react-icons/hi2';
import { FormattedMessage, useIntl } from 'react-intl';

interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

interface BreadcrumbWithGlobeProps {
  items: BreadcrumbItem[];
  title: string;
  description?: string;
  backLabel?: string;
  backHref?: string;
  _backLabel?: string;
  _backHref?: string;
  lang?: string;
  baseUrl?: string;
}

export default function BreadcrumbWithGlobe({ 
  items, 
  title, 
  description = "Explore our comprehensive solutions and services designed to meet your organization's technology needs.",
  _backLabel = "Back", 
  _backHref = "/",
  lang = "en",
  baseUrl = "https://issi.com"
}: BreadcrumbWithGlobeProps) {
  
  // Use useIntl hook safely - always call it
  const intl = useIntl();
  
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
  };  return (
    <div className="">
      <main>
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbStructuredData),
          }}
        />        {/* Breadcrumb section */}
        <div className="relative isolate overflow-visible">
          <div className="absolute top-10 left-[calc(50%-4rem)] -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:top-[calc(50%-30rem)] lg:left-48 xl:left-[calc(50%-24rem)]" aria-hidden="true">
          </div>
          
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between w-full overflow-visible">
              {/* Left side - Breadcrumb */}              <div className="flex-shrink-0">
                {/* Breadcrumb navigation - HIDDEN FOR NOW */}
                <nav aria-label="Breadcrumb" className="hidden flex" itemScope itemType="https://schema.org/BreadcrumbList">
                  <ol role="list" className="flex space-x-4 rounded-md bg-white px-6 shadow-sm">
                    {items.map((item, index) => (
                      <li key={index} className="flex" itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
                        {index === 0 ? (
                          // First item (Home) - with home icon
                          <div className="flex items-center">
                            {item.href ? (
                              <a 
                                href={item.href}
                                className="text-gray-400 hover:text-gray-500"
                                itemProp="item"
                                itemScope 
                                itemType="https://schema.org/WebPage"
                              >
                                <HiHome aria-hidden="true" className="size-5 shrink-0" />
                                <span className="sr-only" itemProp="name">{item.label}</span>
                              </a>
                            ) : (
                              <div className="text-gray-400">
                                <HiHome aria-hidden="true" className="size-5 shrink-0" />
                                <span className="sr-only" itemProp="name">{item.label}</span>
                              </div>
                            )}
                          </div>
                        ) : (
                          // Other items - with separator
                          <div className="flex items-center">
                            <svg
                              fill="currentColor"
                              viewBox="0 0 24 44"
                              preserveAspectRatio="none"
                              aria-hidden="true"
                              className="h-full w-6 shrink-0 text-gray-200"
                            >
                              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                            </svg>
                            {item.href ? (
                              <a
                                href={item.href}
                                aria-current={item.isActive ? 'page' : undefined}
                                className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                                itemProp="item"
                                itemScope 
                                itemType="https://schema.org/WebPage"
                              >
                                <span itemProp="name">{item.label}</span>
                              </a>
                            ) : (
                              <span 
                                aria-current={item.isActive ? 'page' : undefined}
                                className="ml-4 text-sm font-medium text-gray-500"
                                itemProp="name"
                              >
                                {item.label}
                              </span>
                            )}
                          </div>
                        )}
                        <meta itemProp="position" content={String(index + 1)} />
                      </li>
                    ))}                  </ol>
                </nav>
              
              {/* Page title - HIDDEN */}
              <h1 className="hidden mt-4 text-xl font-semibold tracking-tight text-pretty text-slate-900 dark:text-white sm:text-2xl"
                  itemProp="headline"
                  itemScope 
                  itemType="https://schema.org/WebPage">
                {title}
              </h1>
                {/* Page description - auto-generated SEO content - HIDDEN */}
              <p className="hidden mt-2 text-lg font-medium text-pretty text-slate-900/80 dark:text-slate-300/80 sm:text-xl/8">
                {description}
              </p>              {/* Action buttons - HIDDEN */}
              <div className="hidden mt-4 flex items-center gap-x-6">
                <a 
                  href="#contact" 
                  className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-green-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
                  title="Contact ISSI for more information"
                  aria-label="Contact us to learn more about our services"
                >
                  {intl ? (
                    <FormattedMessage id="breadcrumb.actions.contact" defaultMessage="Contact Us" />
                  ) : (
                    "Contact Us"
                  )}
                </a>
                <a 
                  href="#learn-more" 
                  className="text-sm/6 font-semibold text-slate-900 dark:text-white"
                  title="Learn more about our services and solutions"                  aria-label="Learn more about ISSI services and solutions"
                >
                  {intl ? (
                    <FormattedMessage id="breadcrumb.actions.learn-more" defaultMessage="Learn more" />
                  ) : (                    "Learn more"
                  )} <span aria-hidden="true">→</span>
                </a>
              </div>
              </div>              {/* Content area - right side */}
              <div className="flex-shrink-0 lg:-mt-36 overflow-visible">
                <div className="w-304 h-[300px] lg:w-[520px] lg:h-[390px] xl:w-[650px] xl:h-[488px]">
                  {/* Empty space where globe content was */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
