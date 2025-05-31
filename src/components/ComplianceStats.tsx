'use client';

import { FormattedMessage } from 'react-intl';

const stats = [
  { id: 1, valueKey: "compliance.stats.certifications.value", labelKey: "compliance.stats.certifications.label" },
  { id: 2, valueKey: "compliance.stats.clients.value", labelKey: "compliance.stats.clients.label" },
  { id: 3, valueKey: "compliance.stats.frameworks.value", labelKey: "compliance.stats.frameworks.label" },
  { id: 4, valueKey: "compliance.stats.uptime.value", labelKey: "compliance.stats.uptime.label" },
];

export default function ComplianceStats() {
  return (
    <section className=" py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
              <FormattedMessage id="compliance.stats.title" />
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
              <FormattedMessage id="compliance.stats.subtitle" />
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-white dark:bg-slate-800 p-8">
                <dt className="text-sm font-semibold leading-6 text-slate-600 dark:text-slate-400">
                  <FormattedMessage id={stat.labelKey} />
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                  <FormattedMessage id={stat.valueKey} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
