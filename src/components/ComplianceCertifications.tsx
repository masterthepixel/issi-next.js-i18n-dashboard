"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useIntl } from "react-intl";

export function ComplianceCertifications() {
  const intl = useIntl();
  const params = useParams();
  const locale = params?.lang || 'en';
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
          {intl.formatMessage({ id: "compliance.page.h1" })}
        </h1>
        <h2 className="mt-4 text-base/7 font-semibold text-indigo-400">
          {intl.formatMessage({ id: "compliance.bento.subtitle" })}
        </h2>
        <p className="mt-6 max-w-xl text-xl text-slate-600 dark:text-slate-300">
          {intl.formatMessage({ id: "compliance.page.description" })}
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">          <div className="flex p-px lg:col-span-4">
          <div className="overflow-hidden rounded-lg bg-slate-800 ring-1 ring-white/15 max-lg:rounded-t-4xl lg:rounded-tl-4xl">
            <img
              alt={intl.formatMessage({ id: "compliance.bento.iso27001.imageAlt" })}
              src="https://tailwindcss.com/plus-assets/img/component-images/bento-02-releases.png"
              className="h-80 object-cover object-left"
            />
            <div className="p-10">
              <h3 className="text-sm/4 font-semibold text-slate-400">{intl.formatMessage({ id: "compliance.bento.iso27001.category" })}</h3>
              <p className="mt-2 text-lg font-medium tracking-tight text-white">{intl.formatMessage({ id: "compliance.bento.iso27001.title" })}</p>
              <p className="mt-2 max-w-lg text-sm/6  text-slate-600 dark:text-slate-300">
                {intl.formatMessage({ id: "compliance.bento.iso27001.description" })}
              </p>
              <div className="mt-4">
                <Link
                  href={`/${locale}/compliance/iso27001`}
                  className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
                >
                  Learn More
                  <svg className="ml-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>          <div className="flex p-px lg:col-span-2">
            <div className="overflow-hidden rounded-lg bg-slate-800 ring-1 ring-white/15 lg:rounded-tr-4xl">
              <img
                alt={intl.formatMessage({ id: "compliance.bento.iso9001.imageAlt" })}
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-02-integrations.png"
                className="h-80 object-cover"
              />
              <div className="p-10">
                <h3 className="text-sm/4 font-semibold text-slate-400">{intl.formatMessage({ id: "compliance.bento.iso9001.category" })}</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-white">{intl.formatMessage({ id: "compliance.bento.iso9001.title" })}</p>
                <p className="mt-2 max-w-lg text-sm/6 text-slate-400">
                  {intl.formatMessage({ id: "compliance.bento.iso9001.description" })}
                </p>
                <div className="mt-4">
                  <Link
                    href={`/${locale}/compliance/iso9001`}
                    className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
                  >
                    Learn More
                    <svg className="ml-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>          <div className="flex p-px lg:col-span-2">
            <div className="overflow-hidden rounded-lg bg-slate-800 ring-1 ring-white/15 lg:rounded-bl-4xl">
              <img
                alt={intl.formatMessage({ id: "compliance.bento.mdot.imageAlt" })}
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-02-security.png"
                className="h-80 object-cover"
              />
              <div className="p-10">
                <h3 className="text-sm/4 font-semibold text-slate-400">{intl.formatMessage({ id: "compliance.bento.mdot.category" })}</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-white">{intl.formatMessage({ id: "compliance.bento.mdot.title" })}</p>
                <p className="mt-2 max-w-lg text-sm/6 text-slate-400">
                  {intl.formatMessage({ id: "compliance.bento.mdot.description" })}
                </p>
                <div className="mt-4">
                  <Link
                    href={`/${locale}/compliance/mdot`}
                    className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
                  >
                    Learn More
                    <svg className="ml-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>          <div className="flex p-px lg:col-span-4">
            <div className="overflow-hidden rounded-lg bg-slate-800 ring-1 ring-white/15 max-lg:rounded-b-4xl lg:rounded-br-4xl">
              <img
                alt={intl.formatMessage({ id: "compliance.bento.cmmi3.imageAlt" })}
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-02-performance.png"
                className="h-80 object-cover object-left"
              />
              <div className="p-10">
                <h3 className="text-sm/4 font-semibold text-slate-400">{intl.formatMessage({ id: "compliance.bento.cmmi3.category" })}</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-white">{intl.formatMessage({ id: "compliance.bento.cmmi3.title" })}</p>
                <p className="mt-2 max-w-lg text-sm/6 text-slate-400">
                  {intl.formatMessage({ id: "compliance.bento.cmmi3.description" })}
                </p>
                <div className="mt-4">
                  <Link
                    href={`/${locale}/compliance/cmmi3`}
                    className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
                  >
                    Learn More
                    <svg className="ml-1.5 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplianceCertifications;
