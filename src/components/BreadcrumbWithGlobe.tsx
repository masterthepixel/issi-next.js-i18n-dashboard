"use client";

import { Home } from 'lucide-react';
import dynamic from 'next/dynamic';
import { FormattedMessage, useIntl } from 'react-intl';

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
  ssr: false,
});

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

  // Globe configuration
  const globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 22.3193, lng: 114.1694 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  const colors = ["#06b6d4", "#3b82f6", "#6366f1"];
  const sampleArcs = [
    {
      order: 1,
      startLat: -19.885592,
      startLng: -43.951191,
      endLat: -22.9068,
      endLng: -43.1729,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: 28.6139,
      startLng: 77.209,
      endLat: 3.139,
      endLng: 101.6869,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 1,
      startLat: -33.8688,
      startLng: 151.2093,
      endLat: 22.3193,
      endLng: 114.1694,
      arcAlt: 0.3,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 19.4326,
      startLng: -99.1332,
      endLat: -15.7975,
      endLng: -47.8919,
      arcAlt: 0.1,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    },
    {
      order: 2,
      startLat: 10.1632,
      startLng: -84.5286,
      endLat: 9.6116,
      endLng: -84.1426,
      arcAlt: 0.2,
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
    }
  ];

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
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />      {/* Breadcrumb section */}
      <div className="relative isolate overflow-visible">
          <div className="absolute top-10 left-[calc(50%-4rem)] -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:top-[calc(50%-30rem)] lg:left-48 xl:left-[calc(50%-24rem)]" aria-hidden="true">
          </div>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-start w-full overflow-visible">
              {/* Left side - Breadcrumb */}              <div className="flex-shrink-0 w-full">
                {/* Breadcrumb navigation */}
                <nav aria-label="Breadcrumb" className="flex justify-start" itemScope itemType="https://schema.org/BreadcrumbList">
                  <ol role="list" className="flex space-x-4 rounded-full bg-white dark:bg-slate-800 px-6 py-3 shadow-sm dark:shadow-slate-700/20">
                    {items.map((item, index) => (
                      <li key={index} className="flex" itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
                        {index === 0 ? (
                          // First item (Home) - with home icon
                          <div className="flex items-center">
                            {item.href ? (
                              <a
                                href={item.href}
                                className="text-slate-400 hover:text-slate-500 dark:text-slate-400 dark:hover:text-slate-300"
                                itemProp="item"
                                itemScope
                                itemType="https://schema.org/WebPage"
                              >
                                <Home aria-hidden="true" className="size-5 shrink-0" />
                                <span className="sr-only" itemProp="name">{item.label}</span>
                              </a>
                            ) : (
                              <div className="text-slate-400 dark:text-slate-400">
                                <Home aria-hidden="true" className="size-5 shrink-0" />
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
                              className="h-full w-6 shrink-0 text-slate-200 dark:text-slate-600"
                            >
                              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                            </svg>
                            {item.href ? (
                              <a
                                href={item.href}
                                aria-current={item.isActive ? 'page' : undefined}
                                className="ml-4 text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                                itemProp="item"
                                itemScope
                                itemType="https://schema.org/WebPage"
                              >
                                <span itemProp="name">{item.label}</span>
                              </a>
                            ) : (
                              <span
                                aria-current={item.isActive ? 'page' : undefined}
                                className="ml-4 text-sm font-medium text-slate-500 dark:text-slate-400"
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
                <p className="hidden mt-2 text-lg font-medium text-pretty text-slate-900/80 dark:text-slate-300/80 sm:text-xl/8 max-w-3xl">
                  {description}
                </p>              {/* Action buttons - HIDDEN */}
                <div className="hidden mt-4">
                  <a
                    href="#contact"
                    className="rounded-md bg-blue-500 dark:bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-green-400 dark:hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 dark:focus-visible:outline-blue-500"
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
                    className="text-sm/6 font-semibold text-slate-900 dark:text-slate-200 hover:text-slate-700 dark:hover:text-white"
                    title="Learn more about our services and solutions" aria-label="Learn more about ISSI services and solutions"
                  >
                    {intl ? (
                      <FormattedMessage id="breadcrumb.actions.learn-more" defaultMessage="Learn more" />
                    ) : ("Learn more"
                    )} <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>              {/* Content area - right side with Globe */}
              <div className="flex-shrink-0 lg:-mt-36 overflow-visible">
                <div className="w-[304px] h-[300px] lg:w-[520px] lg:h-[390px] xl:w-[650px] xl:h-[488px]">
                  <World globeConfig={globeConfig} data={sampleArcs} />
                </div>
              </div>
          </div>
        </div>
    </>
  );
}
