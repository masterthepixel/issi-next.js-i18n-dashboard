import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ISO 9001:2015 Certification | ISSI Compliance",
  description:
    "Learn more about ISSI's ISO 9001:2015 quality management certification. Internationally recognized for quality management systems.",
};

interface Props {
  params: { lang: Locale };
}

export default async function Page({ params: { lang } }: Props) {
  const intl = await getIntl(lang);

  const features = [
    {
      title: intl.formatMessage({ id: "iso9001.features.leadership.title" }),
      description: intl.formatMessage({ id: "iso9001.features.leadership.description" }),
    }, {
      title: intl.formatMessage({ id: "iso9001.features.customer.title" }),
      description: intl.formatMessage({ id: "iso9001.features.customer.description" }),
    }, {
      title: intl.formatMessage({ id: "iso9001.features.process.title" }),
      description: intl.formatMessage({ id: "iso9001.features.process.description" }),
    },
    {
      title: intl.formatMessage({ id: "iso9001.features.improvement.title" }),
      description: intl.formatMessage({ id: "iso9001.features.improvement.description" }),
    }, {
      title: intl.formatMessage({ id: "iso9001.features.evidence.title" }),
      description: intl.formatMessage({ id: "iso9001.features.evidence.description" }),
    }, {
      title: intl.formatMessage({ id: "iso9001.features.relationship.title" }),
      description: intl.formatMessage({ id: "iso9001.features.relationship.description" }),
    },
  ];

  const industryBenefits = [
    {
      title: intl.formatMessage({ id: "iso9001.benefits.government.title" }),
      items: [
        intl.formatMessage({ id: "iso9001.benefits.government.item1" }),
        intl.formatMessage({ id: "iso9001.benefits.government.item2" }),
        intl.formatMessage({ id: "iso9001.benefits.government.item3" }),
      ],
    },
    {
      title: intl.formatMessage({ id: "iso9001.benefits.energy.title" }),
      items: [
        intl.formatMessage({ id: "iso9001.benefits.energy.item1" }),
        intl.formatMessage({ id: "iso9001.benefits.energy.item2" }),
        intl.formatMessage({ id: "iso9001.benefits.energy.item3" }),
      ],
    },
    {
      title: intl.formatMessage({ id: "iso9001.benefits.commercial.title" }),
      items: [
        intl.formatMessage({ id: "iso9001.benefits.commercial.item1" }),
        intl.formatMessage({ id: "iso9001.benefits.commercial.item2" }),
        intl.formatMessage({ id: "iso9001.benefits.commercial.item3" }),
      ],
    },
  ];

  const pdcaProcess = [
    {
      title: intl.formatMessage({ id: "iso9001.process.plan.title" }),
      description: intl.formatMessage({ id: "iso9001.process.plan.description" }),
      color: "bg-blue-500",
    },
    {
      title: intl.formatMessage({ id: "iso9001.process.do.title" }),
      description: intl.formatMessage({ id: "iso9001.process.do.description" }),
      color: "bg-green-500",
    },
    {
      title: intl.formatMessage({ id: "iso9001.process.check.title" }),
      description: intl.formatMessage({ id: "iso9001.process.check.description" }),
      color: "bg-yellow-500",
    },
    {
      title: intl.formatMessage({ id: "iso9001.process.act.title" }),
      description: intl.formatMessage({ id: "iso9001.process.act.description" }),
      color: "bg-red-500",
    },
  ];

  const standards = [
    {
      title: intl.formatMessage({ id: "iso9001.standards.iso27001.title" }),
      description: intl.formatMessage({ id: "iso9001.standards.iso27001.description" }),
    },
    {
      title: intl.formatMessage({ id: "iso9001.standards.cmmi.title" }),
      description: intl.formatMessage({ id: "iso9001.standards.cmmi.description" }),
    },
    {
      title: intl.formatMessage({ id: "iso9001.standards.itil.title" }),
      description: intl.formatMessage({ id: "iso9001.standards.itil.description" }),
    },
  ];

  const metrics = [{
    title: intl.formatMessage({ id: "iso9001.metrics.satisfaction.label" }),
    value: intl.formatMessage({ id: "iso9001.metrics.satisfaction.value" }),
    description: intl.formatMessage({ id: "iso9001.metrics.satisfaction.description" }),
  }, {
    title: intl.formatMessage({ id: "iso9001.metrics.delivery.label" }),
    value: intl.formatMessage({ id: "iso9001.metrics.delivery.value" }),
    description: intl.formatMessage({ id: "iso9001.metrics.delivery.description" }),
  }, {
    title: intl.formatMessage({ id: "iso9001.metrics.defects.label" }),
    value: intl.formatMessage({ id: "iso9001.metrics.defects.value" }),
    description: intl.formatMessage({ id: "iso9001.metrics.defects.description" }),
  }, {
    title: intl.formatMessage({ id: "iso9001.metrics.improvement.label" }),
    value: intl.formatMessage({ id: "iso9001.metrics.improvement.value" }),
    description: intl.formatMessage({ id: "iso9001.metrics.improvement.description" }),
  },
  ];

  return (
    <div className="-mt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="grid-background-with-fade"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="text-balance bg-clip-text text-transparent bg-gradient-to-b from-[var(--h1-gradient-from)] to-[var(--h1-gradient-to)] sm:text-6xl mb-6">
              {intl.formatMessage({ id: "iso9001.hero.title" })}
            </h1>
            <p className="text-xl  " text-muted-foreground5738>
              {intl.formatMessage({ id: "iso9001.hero.subtitle" })}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="glass-card px-4 py-2 rounded-full">
                <span className="text-sm font-medium">
                  {intl.formatMessage({ id: "iso9001.hero.badge.certified" })}
                </span>
              </div>
              <div className="glass-card px-4 py-2 rounded-full">
                <span className="text-sm font-medium">
                  {intl.formatMessage({ id: "iso9001.hero.badge.continuous" })}
                </span>
              </div>
              <div className="glass-card px-4 py-2 rounded-full">
                <span className="text-sm font-medium">
                  {intl.formatMessage({ id: "iso9001.hero.badge.customer" })}
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
            <h2 className="dark:text-slate-100 sm:text-4xl mb-4">
              {intl.formatMessage({ id: "iso9001.features.title" })}
            </h2>
            <p className="text-lg  " text-muted-foreground7260>
              {intl.formatMessage({ id: "iso9001.features.subtitle" })}
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="glass-card p-6 rounded-xl">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircleIcon className="h-6 w-6 text-green-500" />
                  <h3 className="dark:text-slate-100">
                    {feature.title}
                  </h3>
                </div>
                <p className="" text-muted-foreground7918>
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
            <h2 className="dark:text-slate-100 sm:text-4xl mb-4">
              {intl.formatMessage({ id: "iso9001.benefits.title" })}
            </h2>
            <p className="text-lg  " text-muted-foreground8508>
              {intl.formatMessage({ id: "iso9001.benefits.subtitle" })}
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {industryBenefits.map((benefit, index) => (
              <div key={index} className="glass-card p-6 rounded-xl">
                <h3 className="dark:text-slate-100 mb-4">
                  {benefit.title}
                </h3>
                <ul className="space-y-3">
                  {benefit.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="" text-muted-foreground9301>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PDCA Process Section */}
      <section className="py-20 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="dark:text-slate-100 sm:text-4xl mb-4">
              {intl.formatMessage({ id: "iso9001.process.title" })}
            </h2>
            <p className="text-lg  " text-muted-foreground9875>
              {intl.formatMessage({ id: "iso9001.process.subtitle" })}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pdcaProcess.map((step, index) => (
              <div key={index} className="relative">
                <div className={`${step.color} rounded-xl p-6 text-white`}>
                  <h3 className="mb-3">{step.title}</h3>
                  <p className="text-sm opacity-90">{step.description}</p>
                </div>
                {index < pdcaProcess.length - 1 && (
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
            <h2 className="dark:text-slate-100 sm:text-4xl mb-4">
              {intl.formatMessage({ id: "iso9001.standards.title" })}
            </h2>
            <p className="text-lg  " text-muted-foreground11176>
              {intl.formatMessage({ id: "iso9001.standards.subtitle" })}
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {standards.map((standard, index) => (
              <div key={index} className="glass-card p-6 rounded-xl">
                <h3 className="dark:text-slate-100 mb-4">
                  {standard.title}
                </h3>
                <p className="" text-muted-foreground11675>
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
            <h2 className="dark:text-slate-100 sm:text-4xl mb-4">
              {intl.formatMessage({ id: "iso9001.certificate.title" })}
            </h2>
            <p className="text-lg  " text-muted-foreground12238>
              {intl.formatMessage({ id: "iso9001.certificate.subtitle" })}
            </p>
          </div>
          <div className="glass-card p-8 rounded-xl">
            <dl className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <dt className="font-semibold text-slate-900 dark:text-slate-100 mb-1 sm:mb-0">
                  {intl.formatMessage({ id: "iso9001.certificate.standard" })}
                </dt>
                <dd className="" text-muted-foreground12833>ISO 9001:2015</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <dt className="font-semibold text-slate-900 dark:text-slate-100 mb-1 sm:mb-0">
                  {intl.formatMessage({ id: "iso9001.certificate.number" })}
                </dt>
                <dd className="" text-muted-foreground13233>QMS-2024-001</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <dt className="font-semibold text-slate-900 dark:text-slate-100 mb-1 sm:mb-0">
                  {intl.formatMessage({ id: "iso9001.certificate.validity" })}
                </dt>
                <dd className="" text-muted-foreground13634>2024-2027</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                <dt className="font-semibold text-slate-900 dark:text-slate-100 mb-1 sm:mb-0">
                  {intl.formatMessage({ id: "iso9001.certificate.scope" })}
                </dt>
                <dd className="" text-muted-foreground14028>
                  {intl.formatMessage({ id: "iso9001.certificate.scopeValue" })}
                </dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <dt className="font-semibold text-slate-900 dark:text-slate-100 mb-1 sm:mb-0">
                  {intl.formatMessage({ id: "iso9001.certificate.body" })}
                </dt>
                <dd className="" text-muted-foreground14539>
                  {intl.formatMessage({ id: "iso9001.certificate.bodyValue" })}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Quality Metrics Section */}
      <section className="py-20 px-6 lg:px-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="dark:text-slate-100 sm:text-4xl mb-4">
              {intl.formatMessage({ id: "iso9001.metrics.title" })}
            </h2>
            <p className="text-lg  " text-muted-foreground15169>
              {intl.formatMessage({ id: "iso9001.metrics.subtitle" })}
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, index) => (
              <div key={index} className="glass-card p-6 rounded-xl text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {metric.value}
                </div>
                <h3 className="dark:text-slate-100 mb-2">
                  {metric.title}
                </h3>
                <p className="text-sm text-muted-foreground">
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
          <h2 className="dark:text-slate-100 sm:text-4xl mb-4">
            {intl.formatMessage({ id: "iso9001.contact.title" })}
          </h2>
          <p className="text-lg  " text-muted-foreground16347>
            {intl.formatMessage({ id: "iso9001.contact.subtitle" })}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              {intl.formatMessage({ id: "iso9001.contact.cta.primary" })}
            </button>
            <button className="btn-secondary">
              {intl.formatMessage({ id: "iso9001.contact.cta.secondary" })}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
