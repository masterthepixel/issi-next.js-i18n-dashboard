import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";
import { Metadata } from "next";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

export const metadata: Metadata = {
  title: "CMMI Level 3 Certification | ISSI Compliance",
  description:
    "Learn more about ISSI's CMMI Level 3 certification. Demonstrates defined processes and continuous improvement in project delivery and quality management.",
};

interface Props {
  params: { lang: Locale };
}

export default async function Page({ params: { lang } }: Props) {
  const intl = await getIntl(lang);

  const features = [
    {
      title: intl.formatMessage({ id: "cmmi.features.requirements.title" }),
      description: intl.formatMessage({ id: "cmmi.features.requirements.description" }),
    },
    {
      title: intl.formatMessage({ id: "cmmi.features.planning.title" }),
      description: intl.formatMessage({ id: "cmmi.features.planning.description" }),
    },
    {
      title: intl.formatMessage({ id: "cmmi.features.monitoring.title" }),
      description: intl.formatMessage({ id: "cmmi.features.monitoring.description" }),
    },
    {
      title: intl.formatMessage({ id: "cmmi.features.measurement.title" }),
      description: intl.formatMessage({ id: "cmmi.features.measurement.description" }),
    },
    {
      title: intl.formatMessage({ id: "cmmi.features.quality.title" }),
      description: intl.formatMessage({ id: "cmmi.features.quality.description" }),
    },
    {
      title: intl.formatMessage({ id: "cmmi.features.configuration.title" }),
      description: intl.formatMessage({ id: "cmmi.features.configuration.description" }),
    },
  ];

  const industryBenefits = [
    {
      title: intl.formatMessage({ id: "cmmi.benefits.government.title" }),
      items: [
        intl.formatMessage({ id: "cmmi.benefits.government.item1" }),
        intl.formatMessage({ id: "cmmi.benefits.government.item2" }),
        intl.formatMessage({ id: "cmmi.benefits.government.item3" }),
      ],
    },
    {
      title: intl.formatMessage({ id: "cmmi.benefits.commercial.title" }),
      items: [
        intl.formatMessage({ id: "cmmi.benefits.commercial.item1" }),
        intl.formatMessage({ id: "cmmi.benefits.commercial.item2" }),
        intl.formatMessage({ id: "cmmi.benefits.commercial.item3" }),
      ],
    },
    {
      title: intl.formatMessage({ id: "cmmi.benefits.energy.title" }),
      items: [
        intl.formatMessage({ id: "cmmi.benefits.energy.item1" }),
        intl.formatMessage({ id: "cmmi.benefits.energy.item2" }),
        intl.formatMessage({ id: "cmmi.benefits.energy.item3" }),
      ],
    },
  ];

  const processMaturity = [
    {
      title: intl.formatMessage({ id: "cmmi.process.level1.title" }),
      description: intl.formatMessage({ id: "cmmi.process.level1.description" }),
      color: "bg-red-500",
    },
    {
      title: intl.formatMessage({ id: "cmmi.process.level2.title" }),
      description: intl.formatMessage({ id: "cmmi.process.level2.description" }),
      color: "bg-orange-500",
    },
    {
      title: intl.formatMessage({ id: "cmmi.process.level3.title" }),
      description: intl.formatMessage({ id: "cmmi.process.level3.description" }),
      color: "bg-blue-500",
    },
    {
      title: intl.formatMessage({ id: "cmmi.process.level4.title" }),
      description: intl.formatMessage({ id: "cmmi.process.level4.description" }),
      color: "bg-green-500",
    },
    {
      title: intl.formatMessage({ id: "cmmi.process.level5.title" }),
      description: intl.formatMessage({ id: "cmmi.process.level5.description" }),
      color: "bg-purple-500",
    },
  ];

  const standards = [
    {
      title: intl.formatMessage({ id: "cmmi.integration.iso9001.title" }),
      description: intl.formatMessage({ id: "cmmi.integration.iso9001.description" }),
    },
    {
      title: intl.formatMessage({ id: "cmmi.integration.iso27001.title" }),
      description: intl.formatMessage({ id: "cmmi.integration.iso27001.description" }),
    },
    {
      title: intl.formatMessage({ id: "cmmi.integration.agile.title" }),
      description: intl.formatMessage({ id: "cmmi.integration.agile.description" }),
    },
  ];

  const metrics = [
    {
      title: intl.formatMessage({ id: "cmmi.metrics.delivery.label" }),
      value: intl.formatMessage({ id: "cmmi.metrics.delivery.value" }),
      description: intl.formatMessage({ id: "cmmi.metrics.delivery.description" }),
    },
    {
      title: intl.formatMessage({ id: "cmmi.metrics.quality.label" }),
      value: intl.formatMessage({ id: "cmmi.metrics.quality.value" }),
      description: intl.formatMessage({ id: "cmmi.metrics.quality.description" }),
    },
    {
      title: intl.formatMessage({ id: "cmmi.metrics.defects.label" }),
      value: intl.formatMessage({ id: "cmmi.metrics.defects.value" }),
      description: intl.formatMessage({ id: "cmmi.metrics.defects.description" }),
    },
    {
      title: intl.formatMessage({ id: "cmmi.metrics.productivity.label" }),
      value: intl.formatMessage({ id: "cmmi.metrics.productivity.value" }),
      description: intl.formatMessage({ id: "cmmi.metrics.productivity.description" }),
    },
  ];

  return (
    <div className="-mt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="grid-background-with-fade"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-balance bg-clip-text text-transparent bg-gradient-to-b from-[var(--h1-gradient-from)] to-[var(--h1-gradient-to)] sm:text-6xl mb-6">
              {intl.formatMessage({ id: "cmmi.hero.title" })}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-8 mb-8">
              {intl.formatMessage({ id: "cmmi.hero.subtitle" })}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="glass-card px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {intl.formatMessage({ id: "cmmi.hero.badge.maturity" })}
                </span>
              </div>
              <div className="glass-card px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {intl.formatMessage({ id: "cmmi.hero.badge.processes" })}
                </span>
              </div>
              <div className="glass-card px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {intl.formatMessage({ id: "cmmi.hero.badge.capability" })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl mb-4">
              {intl.formatMessage({ id: "cmmi.features.title" })}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              {intl.formatMessage({ id: "cmmi.features.subtitle" })}
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="glass-card p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Benefits Section */}
      <section className="py-20 px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl mb-4">
              {intl.formatMessage({ id: "cmmi.benefits.title" })}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              {intl.formatMessage({ id: "cmmi.benefits.subtitle" })}
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {industryBenefits.map((benefit, index) => (
              <div key={index} className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  {benefit.title}
                </h3>
                <ul className="space-y-3">
                  {benefit.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600 dark:text-slate-400">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Maturity Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl mb-4">
              {intl.formatMessage({ id: "cmmi.process.title" })}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              {intl.formatMessage({ id: "cmmi.process.subtitle" })}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {processMaturity.map((level, index) => (
              <div key={index} className="relative">
                <div className={`${level.color} rounded-xl p-6 text-white ${index === 2 ? 'ring-4 ring-yellow-400' : ''}`}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold">{level.title}</h3>
                    <span className="text-2xl font-bold opacity-90">{index + 1}</span>
                  </div>
                  <p className="text-sm opacity-90">{level.description}</p>
                  {index === 2 && (
                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                      Current
                    </div>
                  )}
                </div>
                {index < processMaturity.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-slate-300 dark:bg-slate-600 transform -translate-y-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Standards Integration Section */}
      <section className="py-20 px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl mb-4">
              {intl.formatMessage({ id: "cmmi.integration.title" })}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              {intl.formatMessage({ id: "cmmi.integration.subtitle" })}
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {standards.map((standard, index) => (
              <div key={index} className="glass-card p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  {standard.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {standard.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Details Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl mb-4">
              {intl.formatMessage({ id: "cmmi.certificate.title" })}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              {intl.formatMessage({ id: "cmmi.certificate.subtitle" })}
            </p>
          </div>
          <div className="glass-card p-8 rounded-xl">
            <dl className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <dt className="font-semibold text-slate-900 dark:text-slate-100 mb-1 sm:mb-0">
                  {intl.formatMessage({ id: "cmmi.certificate.standard" })}
                </dt>
                <dd className="text-slate-600 dark:text-slate-400">
                  {intl.formatMessage({ id: "cmmi.certificate.standard.value" })}
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <dt className="font-semibold text-slate-900 dark:text-slate-100 mb-1 sm:mb-0">
                  {intl.formatMessage({ id: "cmmi.certificate.level" })}
                </dt>
                <dd className="text-slate-600 dark:text-slate-400">
                  {intl.formatMessage({ id: "cmmi.certificate.level.value" })}
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <dt className="font-semibold text-slate-900 dark:text-slate-100 mb-1 sm:mb-0">
                  {intl.formatMessage({ id: "cmmi.certificate.appraisal" })}
                </dt>
                <dd className="text-slate-600 dark:text-slate-400">
                  {intl.formatMessage({ id: "cmmi.certificate.appraisal.value" })}
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <dt className="font-semibold text-slate-900 dark:text-slate-100 mb-1 sm:mb-0">
                  {intl.formatMessage({ id: "cmmi.certificate.validity" })}
                </dt>
                <dd className="text-slate-600 dark:text-slate-400">
                  {intl.formatMessage({ id: "cmmi.certificate.validity.value" })}
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                <dt className="font-semibold text-slate-900 dark:text-slate-100 mb-1 sm:mb-0">
                  {intl.formatMessage({ id: "cmmi.certificate.scope" })}
                </dt>
                <dd className="text-slate-600 dark:text-slate-400 sm:text-right sm:max-w-md">
                  {intl.formatMessage({ id: "cmmi.certificate.scope.value" })}
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <dt className="font-semibold text-slate-900 dark:text-slate-100 mb-1 sm:mb-0">
                  {intl.formatMessage({ id: "cmmi.certificate.organization" })}
                </dt>
                <dd className="text-slate-600 dark:text-slate-400">
                  {intl.formatMessage({ id: "cmmi.certificate.organization.value" })}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Performance Metrics Section */}
      <section className="py-20 px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl mb-4">
              {intl.formatMessage({ id: "cmmi.metrics.title" })}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              {intl.formatMessage({ id: "cmmi.metrics.subtitle" })}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, index) => (
              <div key={index} className="glass-card p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {metric.value}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  {metric.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl mb-4">
            {intl.formatMessage({ id: "cmmi.contact.title" })}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            {intl.formatMessage({ id: "cmmi.contact.subtitle" })}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              {intl.formatMessage({ id: "cmmi.contact.cta.primary" })}
            </button>
            <button className="btn-secondary">
              {intl.formatMessage({ id: "cmmi.contact.cta.secondary" })}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
