import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid';
import Image from "next/image";
import { Suspense } from "react";

import PrivacyContentWrapper from "@/components/PrivacyContentWrapper";
import Spinner from "@/components/Spinner";

import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";

export const metadata = {
  title: "Privacy Policy - ISSI - International Software Systems International",
  description: "Read ISSI's privacy policy to understand how we collect, use, and protect your personal information and data.",
};

interface Props {
  params: {
    lang: Locale;
  };
}

export default function Page({ params: { lang: locale } }: Props) {
  return (
    <Suspense fallback={<Spinner />}>
      <PageContent locale={locale} />
    </Suspense>
  );
}

interface PageContentProps {
  locale: Locale;
}

async function PageContent({ locale }: PageContentProps) {
  const intl = await getIntl(locale);

  // Get all messages for the current locale
  const messages = intl.messages as Record<string, string>;

  const profile = {
    backgroundImage:
      'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    avatar:
      'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  };
  return (
    <div className="relative">
      {/* Profile Header */}
      <div className="relative z-10 bg-white dark:bg-black pb-8">        <div>
          <Image 
            alt="Privacy Policy Header" 
            src={profile.backgroundImage} 
            width={1950} 
            height={400} 
            className="h-32 w-full object-cover lg:h-48" 
          />
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">            <div className="flex">
              <Image 
                alt="Privacy Policy Avatar" 
                src={profile.avatar} 
                width={128} 
                height={128} 
                className="size-24 rounded-full ring-4 ring-white sm:size-32" 
              />
            </div>
            <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
                <h1 className="truncate text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {intl.formatMessage({ id: "page.privacy.title" })}
                </h1>
              </div>
              <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md bg-white dark:bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 shadow-xs ring-1 ring-slate-300 dark:ring-slate-600 ring-inset hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  <EnvelopeIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5 text-slate-400" />
                  <span>Message</span>
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md bg-white dark:bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 shadow-xs ring-1 ring-slate-300 dark:ring-slate-600 ring-inset hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  <PhoneIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5 text-slate-400" />
                  <span>Call</span>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
            <h1 className="truncate text-2xl font-bold text-slate-900 dark:text-slate-100">
              {intl.formatMessage({ id: "page.privacy.title" })}
            </h1>
          </div>
        </div>
      </div>

      {/* Comprehensive Privacy Content */}
      <div className="mt-12">
        <PrivacyContentWrapper
          messages={messages}
          locale={locale}
          tocTitle={intl.formatMessage({ id: "privacy.toc.title" })}
          toggleAriaLabel={intl.formatMessage({ id: "privacy.toc.toggleAriaLabel" })}
          closeAriaLabel={intl.formatMessage({ id: "privacy.toc.closeAriaLabel" })}
        />
      </div>
    </div>
  );
}