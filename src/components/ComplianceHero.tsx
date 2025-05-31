'use client';

import { ClipboardDocumentCheckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { FormattedMessage } from 'react-intl';

export default function ComplianceHero() {
  return (
    <div className="relative isolate overflow-hidden ">
      {/* Background gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-gradient-to-tr from-[#4f46e5] to-[#06b6d4] opacity-20 sm:left-[calc(50%-30rem)] sm:w-288.75"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {/* Experience badge */}
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm/6 text-indigo-600 dark:text-indigo-400 ring-1 ring-indigo-900/10 dark:ring-indigo-100/20 hover:ring-indigo-900/20 dark:hover:ring-indigo-100/30">
              <FormattedMessage id="page.compliance.hero.experience" />
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl font-semibold tracking-tight text-balance text-slate-900 dark:text-slate-100 sm:text-6xl">
            <FormattedMessage id="page.compliance.hero.title" />
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-400">
            <FormattedMessage id="page.compliance.hero.subtitle" />
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-700 dark:hover:bg-indigo-600"
            >
              Get started
            </a>
            <a href="#" className="text-sm font-semibold leading-6 text-slate-900 dark:text-slate-100">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* Feature icons */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="flex gap-x-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 p-6">
            <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-indigo-600">
              <ShieldCheckIcon aria-hidden="true" className="h-6 w-6 text-white" />
            </div>
            <div className="text-sm leading-6">
              <p className="font-semibold text-slate-900 dark:text-slate-100">Risk Management</p>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Automated risk assessment and mitigation strategies to protect your organization.
              </p>
            </div>
          </div>
          <div className="flex gap-x-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 p-6">
            <div className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-indigo-600">
              <ClipboardDocumentCheckIcon aria-hidden="true" className="h-6 w-6 text-white" />
            </div>
            <div className="text-sm leading-6">
              <p className="font-semibold text-slate-900 dark:text-slate-100">Regulatory Compliance</p>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                Stay compliant with industry standards and regulatory requirements automatically.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background gradient bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-gradient-to-tr from-[#06b6d4] to-[#4f46e5] opacity-20 sm:left-[calc(50%+36rem)] sm:w-288.75"
        />
      </div>
    </div>
  );
}
