"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline';
import { FormattedMessage } from 'react-intl';

export default function GovernmentFAQ() {
  const faqKeys = [
    'government.faq.naics.question',
    'government.faq.security.question',
    'government.faq.compliance.question',
    'government.faq.experience.question',
    'government.faq.contracting.question',
    'government.faq.certifications.question',
    'government.faq.timeline.question',
    'government.faq.support.question'
  ];

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-4">
              <FormattedMessage id="government.faq.title" />
            </h2>
            <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
              <FormattedMessage id="government.faq.subtitle" />
            </p>
          </div>
          <dl className="divide-y divide-gray-900/10 dark:divide-gray-100/10">
            {faqKeys.map((questionKey) => {
              const answerKey = questionKey.replace('.question', '.answer');
              return (
                <Disclosure key={questionKey} as="div" className="py-6 first:pt-0 last:pb-0">
                  <dt>
                    <DisclosureButton className="group flex w-full items-start justify-between text-left text-slate-900 dark:text-white">
                      <span className="text-base/7 font-semibold">
                        <FormattedMessage id={questionKey} />
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        <PlusSmallIcon aria-hidden="true" className="size-6 group-data-[open]:hidden text-slate-600 dark:text-slate-400" />
                        <MinusSmallIcon aria-hidden="true" className="size-6 group-[:not([data-open])]:hidden text-slate-600 dark:text-slate-400" />
                      </span>
                    </DisclosureButton>
                  </dt>
                  <DisclosurePanel as="dd" className="mt-2 pr-12">
                    <p className="text-base/7 text-slate-600 dark:text-slate-300">
                      <FormattedMessage id={answerKey} />
                    </p>
                  </DisclosurePanel>
                </Disclosure>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
