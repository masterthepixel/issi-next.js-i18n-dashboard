"use client";

import { ChevronRightIcon } from '@heroicons/react/20/solid';
import { FormattedMessage, useIntl } from 'react-intl';

interface NewAlternativeHeroProps {
  lang?: string;
}

export default function NewAlternativeHero({ lang = "en" }: NewAlternativeHeroProps) {
  const intl = useIntl();  return (
    <div className="relative isolate overflow-hidden">      <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:shrink-0 lg:max-w-xl">
            {/* Announcement Badge */}
          <div className="">
            <a href="/about" className="inline-flex space-x-6"
               title="Learn more about ISSI's achievements">
              <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm/6 font-semibold text-indigo-600 dark:text-indigo-400 ring-1 ring-indigo-600/10 ring-inset">
                <FormattedMessage id="newhero.announcement.badge" />
              </span>
              <span className="inline-flex items-center space-x-2 text-sm/6 font-medium text-gray-600 dark:text-gray-300">
                <span>
                  <FormattedMessage id="newhero.announcement.text" />
                </span>
                <ChevronRightIcon aria-hidden="true" className="size-5 text-gray-400" />
              </span>
            </a>
          </div>          {/* Main Heading - Matching current hero text size (text-3xl sm:text-4xl) */}
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-pretty text-slate-900 dark:text-slate-100 sm:text-4xl">
            <FormattedMessage id="newhero.title" />
          </h1>          {/* Description - Matching current hero text size (text-sm sm:text-base lg:text-lg) */}
          <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            <FormattedMessage 
              id="newhero.description"
              values={{
                innovativeTechnology: (chunks) => (
                  <a 
                    href="/services" 
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-blue-200 hover:decoration-blue-400 transition-colors"
                    title="Explore our innovative technology services"
                  >
                    {chunks}
                  </a>
                ),
                government: (chunks) => (
                  <a 
                    href="/government" 
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-blue-200 hover:decoration-blue-400 transition-colors"
                    title="Government solutions and services"
                  >
                    {chunks}
                  </a>
                ),
                enterprise: (chunks) => (
                  <a 
                    href="/products" 
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-blue-200 hover:decoration-blue-400 transition-colors"
                    title="Enterprise products and solutions"
                  >
                    {chunks}
                  </a>
                ),
              }}
            />
          </p>          {/* CTA Buttons - Matching current hero styling */}
          <div className="mt-6 flex items-center gap-x-6">
            <a
              href="/contact"
              title="Contact ISSI to get started with our solutions"
              className="bg-indigo-600 text-white px-3 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg text-center text-sm sm:text-base"
            >
              <FormattedMessage id="newhero.cta.get-started" />
            </a>
            <a 
              href="/services" 
              title="Explore ISSI's software solutions and services"
              className="text-sm/6 font-semibold text-slate-900 dark:text-slate-100"
            >
              <FormattedMessage id="newhero.cta.learn-more" /> <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>        {/* Right side - Featured Image */}
        <div className="mx-auto flex max-w-2xl lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="-m-2 rounded-xl bg-gray-900/5 dark:bg-gray-100/5 p-2 ring-1 ring-gray-900/10 dark:ring-gray-100/10 ring-inset lg:-m-4 lg:rounded-2xl lg:p-4">
              <img
                alt="ISSI technology solutions dashboard and services overview"
                src="https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png"
                width={2432}
                height={1442}
                className="w-full max-w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10 dark:ring-gray-100/10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
