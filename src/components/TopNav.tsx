"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormattedMessage } from "react-intl";
import { Locale } from "@/lib/definitions";

interface Props {
  locale: Locale;
}

export default function TopNav({ locale }: Props) {
  const pathname = usePathname();    return (
    <div className="hidden lg:flex items-center justify-center flex-1 space-x-8">
      <Link        
        href={`/${locale}/services`}
        className={`flex items-center text-sm text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-5 border-b-2 transition-all ${
          pathname.includes('/services') ? 'border-blue-500 text-blue-600 dark:text-blue-400 font-medium' : 'border-transparent'
        }`}      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z"
          />
        </svg>
        <FormattedMessage id="common.navigation.services" />
      </Link>      <Link        
        href={`/${locale}/products`}
        className={`flex items-center text-sm text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-5 border-b-2 transition-all ${
          pathname.includes('/products') ? 'border-blue-500 text-blue-600 dark:text-blue-400 font-medium' : 'border-transparent'
        }`}      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
          />
        </svg>
        <FormattedMessage id="common.navigation.products" />
      </Link>      <Link        
        href={`/${locale}/government`}
        className={`flex items-center text-sm text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-5 border-b-2 transition-all ${
          pathname.includes('/government') ? 'border-blue-500 text-blue-600 dark:text-blue-400 font-medium' : 'border-transparent'
        }`}      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
          />
        </svg>
        <FormattedMessage id="common.navigation.government" />
      </Link>      <Link        
        href={`/${locale}/eLearning`}
        className={`flex items-center text-sm text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-5 border-b-2 transition-all ${
          pathname.includes('/eLearning') ? 'border-blue-500 text-blue-600 dark:text-blue-400 font-medium' : 'border-transparent'
        }`}      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
          />
        </svg>
        <FormattedMessage id="common.navigation.eLearning" />
      </Link>      <Link        
        href={`/${locale}/compliance`}
        className={`flex items-center text-sm text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-5 border-b-2 transition-all ${
          pathname.includes('/compliance') ? 'border-blue-500 text-blue-600 dark:text-blue-400 font-medium' : 'border-transparent'
        }`}      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
          />
        </svg>
        <FormattedMessage id="common.navigation.compliance" />
      </Link>      <Link        
        href={`/${locale}/about`}
        className={`flex items-center text-sm text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-5 border-b-2 transition-all ${
          pathname.includes('/about') ? 'border-blue-500 text-blue-600 dark:text-blue-400 font-medium' : 'border-transparent'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}          stroke="currentColor"
          className="size-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
          />
        </svg>
        <FormattedMessage id="common.navigation.about" />
      </Link>
    </div>
  );
}
