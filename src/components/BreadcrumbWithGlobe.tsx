"use client";

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import GeoGlobeInspira from './GeoGlobeInspira';

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
}

export default function BreadcrumbWithGlobe({ 
  items, 
  title, 
  backLabel = "Back", 
  backHref = "/" 
}: BreadcrumbWithGlobeProps) {
  return (
    <div>
      <div>
        {/* Mobile back button */}
        <nav aria-label="Back" className="sm:hidden">
          <a 
            href={backHref} 
            className="flex items-center text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
          >
            <ChevronLeftIcon aria-hidden="true" className="mr-1 -ml-1 size-5 shrink-0 text-slate-400 dark:text-slate-500" />
            {backLabel}
          </a>
        </nav>
          {/* Desktop breadcrumb */}
        <nav aria-label="Breadcrumb" className="hidden sm:flex">
          <ol role="list" className="flex items-center space-x-2">
            {items.map((item, index) => (
              <li key={index}>
                <div className={`flex ${index > 0 ? 'items-center' : ''}`}>
                  {index > 0 && (
                    <ChevronRightIcon aria-hidden="true" className="size-4 shrink-0 text-slate-400 dark:text-slate-500" />
                  )}
                  {item.href ? (
                    <a 
                      href={item.href} 
                      className={`${index > 0 ? 'ml-2' : ''} text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300`}
                      aria-current={item.isActive ? "page" : undefined}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span 
                      className={`${index > 0 ? 'ml-2' : ''} text-sm font-medium text-slate-500 dark:text-slate-400`}
                      aria-current={item.isActive ? "page" : undefined}
                    >
                      {item.label}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </nav>      </div>      <div className="mt-4 relative">
        <div className="min-w-0 flex-1 pr-2 relative z-10">
          <h2 className="text-3xl font-semibold tracking-tight text-balance text-slate-900 dark:text-white lg:text-4xl">
            {title}
          </h2>
        </div>        {/* GeoGlobe Component - positioned absolute to scroll with content */}
        <div className="absolute -top-48 right-0 sm:-top-48 z-0 pointer-events-none">
          <div className="w-[600px] h-[400px] lg:w-[920px] lg:h-[575px] transform translate-x-[40%] sm:translate-x-[25%]">
            <GeoGlobeInspira className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
