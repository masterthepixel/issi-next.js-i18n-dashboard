'use client';

import { AcademicCapIcon, DocumentCheckIcon, ShieldCheckIcon } from '@heroicons/react/20/solid';
import Image from "next/image";
import { FormattedMessage } from "react-intl";

const features = [
  {
    name: <FormattedMessage id="compliance.hero.security.title" defaultMessage="Information Security" />,
    description: <FormattedMessage id="compliance.hero.security.description" defaultMessage="ISO 27001:2022 certified Information Security Management System ensures the highest standards of data protection and security controls across all our operations." />,
    icon: ShieldCheckIcon,
  },
  {
    name: <FormattedMessage id="compliance.hero.quality.title" defaultMessage="Quality Management" />,
    description: <FormattedMessage id="compliance.hero.quality.description" defaultMessage="ISO 9001:2015 Quality Management certification demonstrates our commitment to delivering consistent, high-quality services that meet customer and regulatory requirements." />,
    icon: DocumentCheckIcon,
  },
  {
    name: <FormattedMessage id="compliance.hero.process.title" defaultMessage="Process Excellence" />,
    description: <FormattedMessage id="compliance.hero.process.description" defaultMessage="CMMI Level 3 Development certification validates our advanced process maturity and capability in software development, ensuring predictable project outcomes." />,
    icon: AcademicCapIcon,
  },
];

export default function ComplianceHero() {
  return (
    <section className="overflow-hidden py-24 sm:py-32" aria-labelledby="compliance-hero-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <p className="text-base/7 font-semibold text-primary">
                <FormattedMessage id="compliance.hero.subtitle" defaultMessage="Security & Compliance" />
              </p>
              <h1 id="compliance-hero-heading" className="mt-2 text-pretty text-foreground sm:text-5xl">
                <FormattedMessage id="compliance.hero.title" defaultMessage="Enterprise-Grade Compliance Solutions" />
              </h1>
              <p className="mt-6 text-lg/8 text-muted-foreground">
                <FormattedMessage id="compliance.hero.description" defaultMessage="Comprehensive compliance frameworks ensuring security, quality, and regulatory adherence across all business operations." />
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-muted-foreground lg:max-w-none">
                {features.map((feature, idx) => (
                  <div key={idx}>
                    <dt className="inline font-semibold text-foreground relative pl-9">
                      <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-primary" />
                      {feature.name}
                    </dt>
                    <dd className="inline"> {feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="flex items-start justify-end lg:order-first">
            <Image
              alt="Compliance and security certifications"
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2826&q=80"
              width={2432}
              height={1442}
              className="w-[48rem] max-w-none rounded-xl bg-muted shadow-xl ring-1 ring-border sm:w-[57rem]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}