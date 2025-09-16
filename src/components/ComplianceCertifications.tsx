"use client";

import { motion } from "motion/react";
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
        <h1 className="relative z-10 max-w-4xl text-left text-2xl font-normal text-foreground md:text-4xl lg:text-7xl">
          {intl.formatMessage({ id: "compliance.page.h1" })
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>
        <h2 className="mt-4 text-sm text-primary">
          {intl.formatMessage({ id: "compliance.bento.subtitle" })}
        </h2>
        <p className="mt-6 max-w-xl text-xl text-muted-foreground">
          {intl.formatMessage({ id: "compliance.page.description" })}
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">          <div className="flex p-px lg:col-span-4">
          <div className="overflow-hidden rounded-lg bg-card ring-1 ring-border max-lg:rounded-t-4xl lg:rounded-tl-4xl">
            <img
              alt={intl.formatMessage({ id: "compliance.bento.iso27001.imageAlt" })}
              src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-01-performance.png"
              className="h-80 w-full object-cover object-center"
            />
            <div className="p-8 lg:p-12">
              <h3 className="text-sm font-semibold text-primary">{intl.formatMessage({ id: "compliance.bento.iso27001.category" })}</h3>
              <p className="mt-3 text-lg font-medium tracking-tight text-card-foreground">{intl.formatMessage({ id: "compliance.bento.iso27001.title" })}</p>
              <p className="mt-4 text-sm text-muted-foreground leading-6">
                {intl.formatMessage({ id: "compliance.bento.iso27001.description" })}
              </p>
              <div className="mt-6">
                <Link
                  href={`/${locale}/compliance/iso27001`}
                  className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
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
            <div className="overflow-hidden rounded-lg bg-card ring-1 ring-border lg:rounded-tr-4xl">
              <img
                alt={intl.formatMessage({ id: "compliance.bento.iso9001.imageAlt" })}
                src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-01-releases.png"
                className="h-80 w-full object-cover object-center"
              />
              <div className="p-8 lg:p-12">
                <h3 className="text-sm font-semibold text-primary">{intl.formatMessage({ id: "compliance.bento.iso9001.category" })}</h3>
                <p className="mt-3 text-lg font-medium tracking-tight text-card-foreground">{intl.formatMessage({ id: "compliance.bento.iso9001.title" })}</p>
                <p className="mt-4 text-sm text-muted-foreground leading-6">
                  {intl.formatMessage({ id: "compliance.bento.iso9001.description" })}
                </p>
                <div className="mt-6">
                  <Link
                    href={`/${locale}/compliance/iso9001`}
                    className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
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
            <div className="overflow-hidden rounded-lg bg-card ring-1 ring-border lg:rounded-bl-4xl">
              <img
                alt={intl.formatMessage({ id: "compliance.bento.mdot.imageAlt" })}
                src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-01-speed.png"
                className="h-80 w-full object-cover object-center"
              />
              <div className="p-8 lg:p-12">
                <h3 className="text-sm font-semibold text-primary">{intl.formatMessage({ id: "compliance.bento.mdot.category" })}</h3>
                <p className="mt-3 text-lg font-medium tracking-tight text-card-foreground">{intl.formatMessage({ id: "compliance.bento.mdot.title" })}</p>
                <p className="mt-4 text-sm text-muted-foreground leading-6">
                  {intl.formatMessage({ id: "compliance.bento.mdot.description" })}
                </p>
                <div className="mt-6">
                  <Link
                    href={`/${locale}/compliance/mdot`}
                    className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
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
            <div className="overflow-hidden rounded-lg bg-card ring-1 ring-border max-lg:rounded-b-4xl lg:rounded-br-4xl">
              <img
                alt={intl.formatMessage({ id: "compliance.bento.cmmi3.imageAlt" })}
                src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-01-integrations.png"
                className="h-80 w-full object-cover object-center"
              />
              <div className="p-8 lg:p-12">
                <h3 className="text-sm font-semibold text-primary">{intl.formatMessage({ id: "compliance.bento.cmmi3.category" })}</h3>
                <p className="mt-3 text-lg font-medium tracking-tight text-card-foreground">{intl.formatMessage({ id: "compliance.bento.cmmi3.title" })}</p>
                <p className="mt-4 text-sm text-muted-foreground leading-6">
                  {intl.formatMessage({ id: "compliance.bento.cmmi3.description" })}
                </p>
                <div className="mt-6">
                  <Link
                    href={`/${locale}/compliance/cmmi3`}
                    className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
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
