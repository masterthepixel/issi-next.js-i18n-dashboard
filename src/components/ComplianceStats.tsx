'use client';

import Image from "next/image";
import { FormattedMessage } from "react-intl";

const stats = [
  { id: 1, nameKey: "compliance.stats.certifications.name", valueKey: "compliance.stats.certifications.value" },
  { id: 2, nameKey: "compliance.stats.audits.name", valueKey: "compliance.stats.audits.value" },
  { id: 3, nameKey: "compliance.stats.uptime.name", valueKey: "compliance.stats.uptime.value" },
  { id: 4, nameKey: "compliance.stats.incidents.name", valueKey: "compliance.stats.incidents.value" },
];

export default function ComplianceStats() {
  return (
    <section
      className="relative isolate overflow-hidden bg-slate-900 py-24 sm:py-32"
      aria-labelledby="compliance-stats-heading"
      role="region"
      aria-label="Compliance statistics and achievements"
    >
      <Image
        alt=""
        src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2850&q=80&blend=111827&blend-mode=multiply&sat=-100&exp=15"
        width={2850}
        height={1900}
        className="absolute inset-0 -z-10 size-full object-cover"
        loading="lazy"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute -bottom-8 -left-96 -z-10 transform-gpu blur-3xl sm:-bottom-64 sm:-left-40 lg:-bottom-32 lg:left-8 xl:-left-10"
        >
          <div
            className="aspect-1266/975 w-316.5 bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          />
        </div>
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
          <p className="text-base/8 font-semibold text-white">
            <FormattedMessage id="compliance.stats.title" defaultMessage="Our compliance record" />
          </p>
          <h2 id="compliance-stats-heading" className="mt-2 text-pretty text-white sm:text-5xl">
            <FormattedMessage id="compliance.stats.headline" defaultMessage="Trusted security and compliance" />
          </h2>
          <p className="mt-6 text-lg/8 text-white">
            <FormattedMessage id="compliance.stats.description" defaultMessage="Our comprehensive compliance framework ensures the highest standards of security, quality, and regulatory adherence across all operations." />
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-white sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4" role="list">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col gap-y-3 border-l border-white/10 pl-6" role="listitem">
              <div className="order-first text-3xl font-semibold tracking-tight text-white">
                <FormattedMessage id={stat.valueKey} defaultMessage="0" />
              </div>
              <div className="text-base text-white">
                <FormattedMessage id={stat.nameKey} defaultMessage="Metric" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
