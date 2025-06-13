"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline';
import { FormattedMessage, useIntl } from 'react-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ELearningFAQ() {
  const intl = useIntl();
  const params = useParams();
  const locale = params.lang as string;

  const faqKeys = [
    'elearning.faq.platforms.question',
    'elearning.faq.timeline.question',
    'elearning.faq.compliance.question',
    'elearning.faq.integration.question',
    'elearning.faq.customization.question',
    'elearning.faq.support.question',
    'elearning.faq.pricing.question',
    'elearning.faq.migration.question'
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-4">
              <FormattedMessage id="elearning.faq.title" />
            </h2>
            <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
              <FormattedMessage id="elearning.faq.subtitle" />
            </p>
          </div>
          
          <dl className="divide-y divide-gray-900/10 dark:divide-gray-100/10">
            {faqKeys.map((questionKey) => {
              const answerKey = questionKey.replace('.question', '.answer');
              return (
                <Disclosure key={questionKey} as="div" className="py-6 first:pt-0 last:pb-0">
                  <dt>
                    <DisclosureButton className="group flex w-full items-start justify-between text-left text-slate-900 dark:text-white">
                      <span className="text-base font-semibold leading-7">
                        <FormattedMessage id={questionKey} />
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        <PlusSmallIcon aria-hidden="true" className="size-6 group-data-open:hidden text-slate-600 dark:text-slate-400" />
                        <MinusSmallIcon aria-hidden="true" className="size-6 group-not-data-open:hidden text-slate-600 dark:text-slate-400" />
                      </span>
                    </DisclosureButton>
                  </dt>
                  <DisclosurePanel as="dd" className="mt-2 pr-12">
                    <p className="text-base leading-7 text-slate-600 dark:text-slate-300">
                      <FormattedMessage id={answerKey} />
                    </p>
                  </DisclosurePanel>
                </Disclosure>
              );
            })}
          </dl>
          
          {/* Contact CTA */}
          <div className="mt-16 text-center">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                <FormattedMessage id="elearning.faq.contact.title" />
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                <FormattedMessage id="elearning.faq.contact.description" />
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                  aria-label={intl.formatMessage({ id: 'elearning.faq.contact.consultation' })}
                >
                  <FormattedMessage id="elearning.faq.contact.consultation" />
                </Link>
                <a
                  href="mailto:elearning@issi.com"
                  className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 dark:bg-slate-800 dark:text-blue-400 dark:hover:bg-slate-700 transition-colors"
                  aria-label={intl.formatMessage({ id: 'elearning.faq.contact.email' })}
                >
                  <FormattedMessage id="elearning.faq.contact.email" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
