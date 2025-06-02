"use client";

import { useIntl } from "react-intl";

export function ComplianceCertifications() {
  const intl = useIntl();
  return (
    <div className="py-8">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl">
        <h2 className="text-base/7 font-semibold text-indigo-400">{intl.formatMessage({ id: "compliance.bento.subtitle" })}</h2>
        <p className="mt-2 max-w-lg text-4xl font-semibold tracking-tight text-pretty text-slate-900 dark:text-white sm:text-5xl">
          {intl.formatMessage({ id: "compliance.carousel.title" })}
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">          <div className="flex p-px lg:col-span-4">
            <div className="overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 max-lg:rounded-t-4xl lg:rounded-tl-4xl">
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-02-releases.png"
                className="h-80 object-cover object-left"
              />
              <div className="p-10">
                <h3 className="text-sm/4 font-semibold text-gray-400">{intl.formatMessage({ id: "compliance.bento.iso27001.category" })}</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-white">{intl.formatMessage({ id: "compliance.bento.iso27001.title" })}</p>
                <p className="mt-2 max-w-lg text-sm/6  text-slate-600 dark:text-slate-300">
                  {intl.formatMessage({ id: "compliance.bento.iso27001.description" })}
                </p>
              </div>
            </div>
          </div>
          <div className="flex p-px lg:col-span-2">
            <div className="overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 lg:rounded-tr-4xl">
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-02-integrations.png"
                className="h-80 object-cover"
              />
              <div className="p-10">
                <h3 className="text-sm/4 font-semibold text-gray-400">{intl.formatMessage({ id: "compliance.bento.iso9001.category" })}</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-white">{intl.formatMessage({ id: "compliance.bento.iso9001.title" })}</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-400">
                  {intl.formatMessage({ id: "compliance.bento.iso9001.description" })}
                </p>
              </div>
            </div>
          </div>
          <div className="flex p-px lg:col-span-2">
            <div className="overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 lg:rounded-bl-4xl">
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-02-security.png"
                className="h-80 object-cover"
              />
              <div className="p-10">
                <h3 className="text-sm/4 font-semibold text-gray-400">{intl.formatMessage({ id: "compliance.bento.gdpr.category" })}</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-white">{intl.formatMessage({ id: "compliance.bento.gdpr.title" })}</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-400">
                  {intl.formatMessage({ id: "compliance.bento.gdpr.description" })}
                </p>
              </div>
            </div>
          </div>
          <div className="flex p-px lg:col-span-4">
            <div className="overflow-hidden rounded-lg bg-gray-800 ring-1 ring-white/15 max-lg:rounded-b-4xl lg:rounded-br-4xl">
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/component-images/bento-02-performance.png"
                className="h-80 object-cover object-left"
              />
              <div className="p-10">
                <h3 className="text-sm/4 font-semibold text-gray-400">{intl.formatMessage({ id: "compliance.bento.soc2.category" })}</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-white">{intl.formatMessage({ id: "compliance.bento.soc2.title" })}</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-400">
                  {intl.formatMessage({ id: "compliance.bento.soc2.description" })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComplianceCertifications;
