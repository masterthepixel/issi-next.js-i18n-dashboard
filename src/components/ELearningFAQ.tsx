"use client";

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FormattedMessage, useIntl } from 'react-intl';

export default function ELearningFAQ() {  const intl = useIntl();
  const params = useParams();
  const locale = (params?.lang as string) || 'en';

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
            <h2 className="text-foreground sm:text-4xl mb-4">
              <FormattedMessage id="elearning.faq.title" />
            </h2>
            <p className="" text-lead1191>
              <FormattedMessage id="elearning.faq.subtitle" />
            </p>
          </div>
          
          <dl className="divide-y divide-border">
            {faqKeys.map((questionKey) => {
              const answerKey = questionKey.replace('.question', '.answer');
              return (
                <Disclosure key={questionKey} as="div" className="py-6 first:pt-0 last:pb-0">
                  <dt>
                    <DisclosureButton className="group flex w-full items-start justify-between text-left text-foreground">
                      <span className="text-base font-semibold leading-7">
                        <FormattedMessage id={questionKey} />
                      </span>
                      <span className="ml-6 flex h-7 items-center">
                        <PlusSmallIcon aria-hidden="true" className="size-6 group-data-open:hidden text-muted-foreground" />
                        <MinusSmallIcon aria-hidden="true" className="size-6 group-not-data-open:hidden text-muted-foreground" />
                      </span>
                    </DisclosureButton>
                  </dt>
                  <DisclosurePanel as="dd" className="mt-2 pr-12">
                    <p className="text-base leading-7 text-muted-foreground">
                      <FormattedMessage id={answerKey} />
                    </p>
                  </DisclosurePanel>
                </Disclosure>
              );
            })}
          </dl>
          
          {/* Contact CTA */}
          <div className="mt-16 text-center">
            <div className="bg-muted/50 rounded-lg p-8">
              <h3 className="text-foreground mb-4">
                <FormattedMessage id="elearning.faq.contact.title" />
              </h3>
              <p className="text-muted-foreground mb-6">
                <FormattedMessage id="elearning.faq.contact.description" />
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
                  aria-label={intl.formatMessage({ id: 'elearning.faq.contact.consultation' })}
                >
                  <FormattedMessage id="elearning.faq.contact.consultation" />
                </Link>
                <a
                  href="mailto:elearning@issi.com"
                  className="inline-flex items-center justify-center px-6 py-3 border border-primary text-base font-medium rounded-md text-primary bg-background hover:bg-muted/50 transition-colors"
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
