import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ISO 27001:2013 Certification | ISSI Compliance",
  description:
    "Learn more about ISSI’s ISO 27001:2013 information security management certification. Highest standards of information security and risk management.",
};

interface Props {
  params: { lang: Locale };
}

export default async function Page({ params: { lang } }: Props) {
  const intl = await getIntl(lang);
  return (
    <div className="-mt-20">
      {/* Hero Section with Background */}
      <section className="relative overflow-hidden">
        <div className="grid-background-with-fade"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-balance bg-clip-text text-transparent bg-gradient-to-b from-[var(--h1-gradient-from)] to-[var(--h1-gradient-to)] sm:text-6xl mb-6">
              {intl.formatMessage({ id: "iso27001.hero.title" })}
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-8 mb-8">
              {intl.formatMessage({ id: "iso27001.hero.subtitle" })}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="glass-card px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-green-600 dark:text-green-400">{intl.formatMessage({ id: "iso27001.hero.badge.certified" })}</span>
              </div>
              <div className="glass-card px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{intl.formatMessage({ id: "iso27001.hero.badge.audits" })}</span>
              </div>
              <div className="glass-card px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-purple-600 dark:text-purple-400">{intl.formatMessage({ id: "iso27001.hero.badge.monitoring" })}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-4">
              {intl.formatMessage({ id: "iso27001.features.title" })}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              {intl.formatMessage({ id: "iso27001.features.subtitle" })}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{intl.formatMessage({ id: "iso27001.features.risk.title" })}</h3>
              <p className="text-slate-600 dark:text-slate-400">
                {intl.formatMessage({ id: "iso27001.features.risk.description" })}
              </p>
            </div>

            <div className="glass-card p-8 rounded-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{intl.formatMessage({ id: "iso27001.features.access.title" })}</h3>
              <p className="text-slate-600 dark:text-slate-400">
                {intl.formatMessage({ id: "iso27001.features.access.description" })}
              </p>
            </div>

            <div className="glass-card p-8 rounded-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 00-2-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{intl.formatMessage({ id: "iso27001.features.monitoring.title" })}</h3>
              <p className="text-slate-600 dark:text-slate-400">
                {intl.formatMessage({ id: "iso27001.features.monitoring.description" })}
              </p>
            </div>

            <div className="glass-card p-8 rounded-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{intl.formatMessage({ id: "iso27001.features.incident.title" })}</h3>
              <p className="text-slate-600 dark:text-slate-400">
                {intl.formatMessage({ id: "iso27001.features.incident.description" })}
              </p>
            </div>

            <div className="glass-card p-8 rounded-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{intl.formatMessage({ id: "iso27001.features.continuity.title" })}</h3>
              <p className="text-slate-600 dark:text-slate-400">
                {intl.formatMessage({ id: "iso27001.features.continuity.description" })}
              </p>
            </div>

            <div className="glass-card p-8 rounded-xl transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{intl.formatMessage({ id: "iso27001.features.training.title" })}</h3>
              <p className="text-slate-600 dark:text-slate-400">
                {intl.formatMessage({ id: "iso27001.features.training.description" })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certification Details */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-6">
                {intl.formatMessage({ id: "iso27001.certification.title" })}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{intl.formatMessage({ id: "iso27001.certification.initial.title" })}</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {intl.formatMessage({ id: "iso27001.certification.initial.description" })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{intl.formatMessage({ id: "iso27001.certification.surveillance.title" })}</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {intl.formatMessage({ id: "iso27001.certification.surveillance.description" })}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{intl.formatMessage({ id: "iso27001.certification.renewal.title" })}</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {intl.formatMessage({ id: "iso27001.certification.renewal.description" })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-effect-strong p-8 rounded-2xl">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{intl.formatMessage({ id: "iso27001.certificate.title" })}</h3>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">{intl.formatMessage({ id: "iso27001.certificate.standard" })}</span>
                    <span className="font-medium text-slate-900 dark:text-white">{intl.formatMessage({ id: "iso27001.certificate.standard.value" })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">{intl.formatMessage({ id: "iso27001.certificate.number" })}</span>
                    <span className="font-medium text-slate-900 dark:text-white">{intl.formatMessage({ id: "iso27001.certificate.number.value" })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">{intl.formatMessage({ id: "iso27001.certificate.valid" })}</span>
                    <span className="font-medium text-slate-900 dark:text-white">{intl.formatMessage({ id: "iso27001.certificate.valid.value" })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">{intl.formatMessage({ id: "iso27001.certificate.scope" })}</span>
                    <span className="font-medium text-slate-900 dark:text-white">{intl.formatMessage({ id: "iso27001.certificate.scope.value" })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">{intl.formatMessage({ id: "iso27001.certificate.body" })}</span>
                    <span className="font-medium text-slate-900 dark:text-white">{intl.formatMessage({ id: "iso27001.certificate.body.value" })}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Framework Process */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-4">
              {intl.formatMessage({ id: "iso27001.process.title" })}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              {intl.formatMessage({ id: "iso27001.process.subtitle" })}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{intl.formatMessage({ id: "iso27001.process.plan.title" })}</h3>
              <p className="text-slate-600 dark:text-slate-400">
                {intl.formatMessage({ id: "iso27001.process.plan.description" })}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{intl.formatMessage({ id: "iso27001.process.do.title" })}</h3>
              <p className="text-slate-600 dark:text-slate-400">
                {intl.formatMessage({ id: "iso27001.process.do.description" })}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{intl.formatMessage({ id: "iso27001.process.check.title" })}</h3>
              <p className="text-slate-600 dark:text-slate-400">
                {intl.formatMessage({ id: "iso27001.process.check.description" })}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{intl.formatMessage({ id: "iso27001.process.act.title" })}</h3>
              <p className="text-slate-600 dark:text-slate-400">
                {intl.formatMessage({ id: "iso27001.process.act.description" })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Benefits Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-4">
              {intl.formatMessage({ id: "iso27001.benefits.title" })}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              {intl.formatMessage({ id: "iso27001.benefits.subtitle" })}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">{intl.formatMessage({ id: "iso27001.benefits.government.title" })}</h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {intl.formatMessage({ id: "iso27001.benefits.government.item1" })}
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {intl.formatMessage({ id: "iso27001.benefits.government.item2" })}
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {intl.formatMessage({ id: "iso27001.benefits.government.item3" })}
                </li>
              </ul>
            </div>
            
            <div className="glass-card p-8 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">{intl.formatMessage({ id: "iso27001.benefits.energy.title" })}</h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {intl.formatMessage({ id: "iso27001.benefits.energy.item1" })}
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {intl.formatMessage({ id: "iso27001.benefits.energy.item2" })}
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {intl.formatMessage({ id: "iso27001.benefits.energy.item3" })}
                </li>
              </ul>
            </div>
            
            <div className="glass-card p-8 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">{intl.formatMessage({ id: "iso27001.benefits.commercial.title" })}</h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {intl.formatMessage({ id: "iso27001.benefits.commercial.item1" })}
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {intl.formatMessage({ id: "iso27001.benefits.commercial.item2" })}
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {intl.formatMessage({ id: "iso27001.benefits.commercial.item3" })}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-4">
              {intl.formatMessage({ id: "iso27001.trust.title" })}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              {intl.formatMessage({ id: "iso27001.trust.subtitle" })}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">{intl.formatMessage({ id: "iso27001.trust.years.value" })}</div>
              <div className="text-slate-900 dark:text-white font-semibold mb-1">{intl.formatMessage({ id: "iso27001.trust.years.label" })}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{intl.formatMessage({ id: "iso27001.trust.years.description" })}</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">{intl.formatMessage({ id: "iso27001.trust.breaches.value" })}</div>
              <div className="text-slate-900 dark:text-white font-semibold mb-1">{intl.formatMessage({ id: "iso27001.trust.breaches.label" })}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{intl.formatMessage({ id: "iso27001.trust.breaches.description" })}</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">{intl.formatMessage({ id: "iso27001.trust.monitoring.value" })}</div>
              <div className="text-slate-900 dark:text-white font-semibold mb-1">{intl.formatMessage({ id: "iso27001.trust.monitoring.label" })}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{intl.formatMessage({ id: "iso27001.trust.monitoring.description" })}</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">{intl.formatMessage({ id: "iso27001.trust.uptime.value" })}</div>
              <div className="text-slate-900 dark:text-white font-semibold mb-1">{intl.formatMessage({ id: "iso27001.trust.uptime.label" })}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">{intl.formatMessage({ id: "iso27001.trust.uptime.description" })}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-4">
              {intl.formatMessage({ id: "iso27001.contact.title" })}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
              {intl.formatMessage({ id: "iso27001.contact.subtitle" })}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                {intl.formatMessage({ id: "iso27001.contact.cta.primary" })}
              </a>
              <a
                href="/support"
                className="inline-flex items-center justify-center px-6 py-3 border border-slate-300 dark:border-slate-600 text-base font-medium rounded-md text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200"
              >
                {intl.formatMessage({ id: "iso27001.contact.cta.secondary" })}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
