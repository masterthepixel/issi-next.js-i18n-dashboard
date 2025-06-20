"use client";

import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { FormattedMessage, useIntl } from 'react-intl';

export default function NewHomePageHero() {
  const intl = useIntl();

  return (
    <div className="relative isolate overflow-hidden bg-white">
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200"
      >
        <defs>
          <pattern
            x="50%"
            y={-1}
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)" width="100%" height="100%" strokeWidth={0} />
      </svg>
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:shrink-0 lg:pt-8">
          <img
            alt="ISSI Logo"
            src="/images/issi_logo.png"
            className="h-11"
          />
          <div className="mt-24 sm:mt-32 lg:mt-16">            <a href="#news" className="inline-flex space-x-6" title="View latest news and updates">              <span className="rounded-full bg-blue-600/10 px-3 py-1 text-sm/6 font-semibold text-blue-600 ring-1 ring-blue-600/10 ring-inset">
                <FormattedMessage id="newhero.new.badge" defaultMessage="What's new" />
              </span>
              <span className="inline-flex items-center space-x-2 text-sm/6 font-medium text-gray-600">
                <span>
                  <FormattedMessage id="newhero.new.version" defaultMessage="Just shipped v2.0" />
                </span>
                <ChevronRightIcon aria-hidden="true" className="size-5 text-gray-400" />
              </span>
            </a>
          </div>          <h1 className="mt-10 text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl">
            <FormattedMessage 
              id="newhero.title" 
              defaultMessage="Deploy to the cloud with confidence" 
            />
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            <FormattedMessage 
              id="newhero.description" 
              defaultMessage="Leading government technology solutions with enterprise-grade security, compliance, and scalability. Trusted by agencies worldwide for mission-critical applications." 
            />
          </p><div className="mt-10 flex items-center gap-x-6">
            <a
              href="#contact"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              title="Get started with ISSI services"
            >
              <FormattedMessage id="hero.cta.primary" defaultMessage="Get started" />
            </a>
            <a href="#services" className="text-sm/6 font-semibold text-gray-900" title="Learn more about our services">
              <FormattedMessage id="hero.cta.secondary" defaultMessage="Learn more" /> <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:mt-0 lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-gray-900/10 ring-inset lg:-m-4 lg:rounded-2xl lg:p-4">
              <img
                alt="ISSI Technology Solutions Dashboard"
                src="https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png"
                width={2432}
                height={1442}
                className="w-304 rounded-md shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
