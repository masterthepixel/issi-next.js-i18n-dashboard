import Link from 'next/link';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid';
import { Locale } from '@/lib/definitions';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  locale: Locale;
  backgroundImage?: string;
  title?: string;
  description?: string;
}

export default function Breadcrumb({ 
  items, 
  locale, 
  backgroundImage = 'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  title,
  description
}: BreadcrumbProps) {
  return (
    <div>
      <div>
        <img alt="" src={backgroundImage} className="h-32 w-full object-cover lg:h-48" />
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <nav aria-label="Breadcrumb" className="bg-white rounded-full ring-4 ring-white shadow-lg p-3">
              <ol role="list" className="flex items-center space-x-2">
                <li className="flex">
                  <div className="flex items-center">
                    <Link href={`/${locale}`} className="text-gray-400 hover:text-gray-500">
                      <HomeIcon aria-hidden="true" className="size-5 flex-shrink-0" />
                      <span className="sr-only">Home</span>
                    </Link>
                  </div>
                </li>
                {items.map((item, index) => (
                  <li key={item.name} className="flex">
                    <div className="flex items-center">
                      <ChevronRightIcon
                        aria-hidden="true"
                        className="size-4 flex-shrink-0 text-gray-300 mx-2"
                      />
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="text-sm font-medium text-gray-600 hover:text-gray-900"
                          aria-current={index === items.length - 1 ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <span
                          className="text-sm font-medium text-gray-900"
                          aria-current="page"
                        >
                          {item.name}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
              {title && (
                <h1 className="truncate text-2xl font-bold text-gray-900">{title}</h1>
              )}
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              {/* Add action buttons here if needed */}
            </div>
          </div>
        </div>
        <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
          {title && (
            <h1 className="truncate text-2xl font-bold text-gray-900">{title}</h1>
          )}
        </div>
      </div>
    </div>
  );
}
