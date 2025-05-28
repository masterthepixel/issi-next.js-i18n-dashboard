"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormattedMessage } from "react-intl";
import { Locale } from "@/lib/definitions";

interface Props {
  locale: Locale;
}

export default function TopNav({ locale }: Props) {
  const pathname = usePathname();
    return (
    <div className="hidden lg:flex items-center space-x-8">
      <Link 
        href={`/${locale}/home`}
        className={`flex items-center text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-5 border-b-2 ${
          pathname.includes('/home') ? 'border-blue-500 text-blue-600 dark:text-blue-400 font-medium' : 'border-transparent'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        <FormattedMessage id="common.navigation.home" />
      </Link>
        <Link        href={`/${locale}/reports`}
        className={`flex items-center text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-5 border-b-2 ${
          pathname.includes('/reports') ? 'border-blue-500 text-blue-600 dark:text-blue-400 font-medium' : 'border-transparent'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
        <FormattedMessage id="common.navigation.reports" />
      </Link>
      
      <Link        href={`/${locale}/discover`}
        className={`flex items-center text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-5 border-b-2 ${
          pathname.includes('/discover') ? 'border-blue-500 text-blue-600 dark:text-blue-400 font-medium' : 'border-transparent'
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
          />
        </svg>
        <FormattedMessage id="common.navigation.discover" />
      </Link>
    </div>
  );
}
