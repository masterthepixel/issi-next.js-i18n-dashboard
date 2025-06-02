"use client";

import React from "react";
import { FormattedMessage, IntlProvider, useIntl } from "react-intl";

interface TermsContentProps {
  messages: Record<string, string>;
  locale: string;
}

export default function TermsContent({ messages, locale }: TermsContentProps) {
  return (
    <IntlProvider messages={messages} locale={locale}>
      <TermsContentInner />
    </IntlProvider>
  );
}

function TermsContentInner() {
  const intl = useIntl();

  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      {/* Introduction */}
      <section id="introduction" className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          <FormattedMessage id="license.sections.introduction.title" />
        </h2>
        <div className="space-y-4">
          <p className="text-lg text-slate-700 dark:text-slate-300">
            <FormattedMessage id="license.sections.introduction.welcome" />
          </p>
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <p className="text-amber-800 dark:text-amber-200 m-0">
              <FormattedMessage
                id="license.sections.introduction.important"
                values={{
                  strong: (chunks: React.ReactNode) => <strong>{chunks}</strong>,
                }}
              />
            </p>
          </div>
        </div>
      </section>

      {/* Definitions */}
      <section id="definitions" className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          <FormattedMessage id="license.sections.definitions.title" />
        </h2>
        <div className="space-y-6">
          <p className="text-lg text-slate-700 dark:text-slate-300">
            <FormattedMessage id="license.sections.definitions.intro" />
          </p>
          <dl className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <dt className="font-semibold text-slate-900 dark:text-slate-100">
                <FormattedMessage id="license.sections.definitions.client.term" />
              </dt>
              <dd className="text-slate-700 dark:text-slate-300 mt-1">
                <FormattedMessage id="license.sections.definitions.client.definition" />
              </dd>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <dt className="font-semibold text-slate-900 dark:text-slate-100">
                <FormattedMessage id="license.sections.definitions.company.term" />
              </dt>
              <dd className="text-slate-700 dark:text-slate-300 mt-1">
                <FormattedMessage id="license.sections.definitions.company.definition" />
              </dd>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <dt className="font-semibold text-slate-900 dark:text-slate-100">
                <FormattedMessage id="license.sections.definitions.parties.term" />
              </dt>
              <dd className="text-slate-700 dark:text-slate-300 mt-1">
                <FormattedMessage id="license.sections.definitions.parties.definition" />
              </dd>
            </div>
          </dl>

          <p className="text-slate-700 dark:text-slate-300">
            <FormattedMessage id="license.sections.definitions.allTerms" />
          </p>
        </div>
      </section>

      {/* Cookies Policy */}
      <section id="cookies-policy" className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          <FormattedMessage id="license.sections.cookies.title" />
        </h2>
        <div className="space-y-4">
          <p className="text-lg text-slate-700 dark:text-slate-300">
            <FormattedMessage id="license.sections.cookies.consent" />
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            <FormattedMessage id="license.sections.cookies.description" />
          </p>
        </div>
      </section>

      {/* Hyperlinking Guidelines */}
      <section id="hyperlinking-guidelines" className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          <FormattedMessage id="license.sections.hyperlinking.title" />
        </h2>

        {/* Approved Organizations */}
        <div id="approved-organizations" className="mb-8">
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
            <FormattedMessage id="license.sections.hyperlinking.approved.title" />
          </h3>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            <FormattedMessage id="license.sections.hyperlinking.approved.intro" />
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <FormattedMessage id="license.sections.hyperlinking.approved.government" />
            </li>
            <li>
              <FormattedMessage id="license.sections.hyperlinking.approved.searchEngines" />
            </li>
            <li>
              <FormattedMessage id="license.sections.hyperlinking.approved.news" />
            </li>
            <li>
              <FormattedMessage id="license.sections.hyperlinking.approved.directories" />
            </li>
            <li>
              <FormattedMessage id="license.sections.hyperlinking.approved.accredited" />
            </li>
          </ul>
        </div>

        {/* Conditional Approval */}
        <div id="conditional-approval" className="mb-8">
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
            <FormattedMessage id="license.sections.hyperlinking.conditional.title" />
          </h3>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            <FormattedMessage id="license.sections.hyperlinking.conditional.intro" />
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <FormattedMessage id="license.sections.hyperlinking.conditional.consumer" />
            </li>
            <li>
              <FormattedMessage id="license.sections.hyperlinking.conditional.community" />
            </li>
            <li>
              <FormattedMessage id="license.sections.hyperlinking.conditional.charities" />
            </li>
            <li>
              <FormattedMessage id="license.sections.hyperlinking.conditional.portals" />
            </li>
            <li>
              <FormattedMessage id="license.sections.hyperlinking.conditional.professional" />
            </li>
            <li>
              <FormattedMessage id="license.sections.hyperlinking.conditional.educational" />
            </li>
          </ul>
        </div>

        {/* Link Request Process */}
        <div id="link-request-process" className="mb-8">
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
            <FormattedMessage id="license.sections.hyperlinking.process.title" />
          </h3>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            <FormattedMessage
              id="license.sections.hyperlinking.process.intro"
              values={{
                email: (
                  <a href="mailto:info@issi.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                    info@issi.com
                  </a>
                ),
              }}
            />
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <FormattedMessage id="license.sections.hyperlinking.process.name" />
            </li>
            <li>
              <FormattedMessage id="license.sections.hyperlinking.process.contact" />
            </li>
            <li>
              <FormattedMessage id="license.sections.hyperlinking.process.url" />
            </li>
            <li>
              <FormattedMessage id="license.sections.hyperlinking.process.linkUrls" />
            </li>
            <li>
              <FormattedMessage id="license.sections.hyperlinking.process.targetUrls" />
            </li>
          </ul>
          <p className="text-slate-700 dark:text-slate-300 mt-4">
            <FormattedMessage id="license.sections.hyperlinking.process.timeline" />
          </p>
        </div>

        {/* Linking Standards */}
        <div id="linking-standards" className="mb-8">
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
            <FormattedMessage id="license.sections.hyperlinking.standards.title" />
          </h3>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            <FormattedMessage id="license.sections.hyperlinking.standards.intro" />
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <FormattedMessage id="license.sections.hyperlinking.standards.corporateName" />
            </li>
            <li>
              <FormattedMessage id="license.sections.hyperlinking.standards.url" />
            </li>
            <li>
              <FormattedMessage id="license.sections.hyperlinking.standards.description" />
            </li>
          </ul>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
            <p className="text-blue-800 dark:text-blue-200 m-0">
              <FormattedMessage
                id="license.sections.hyperlinking.standards.note"
                values={{
                  strong: (chunks: React.ReactNode) => <strong>{chunks}</strong>,
                }}
              />
            </p>
          </div>
        </div>
      </section>

      {/* Iframes Policy */}
      <section id="iframes-policy" className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          <FormattedMessage id="license.sections.iframes.title" />
        </h2>
        <p className="text-lg text-slate-700 dark:text-slate-300">
          <FormattedMessage id="license.sections.iframes.content" />
        </p>
      </section>

      {/* Rights and Modifications */}
      <section id="rights-modifications" className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          <FormattedMessage id="license.sections.rights.title" />
        </h2>

        {/* Reservation Rights */}
        <div id="reservation-rights" className="mb-8">
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
            <FormattedMessage id="license.sections.rights.reservation.title" />
          </h3>
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300">
              <FormattedMessage id="license.sections.rights.reservation.removal" />
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              <FormattedMessage id="license.sections.rights.reservation.amendment" />
            </p>
          </div>
        </div>

        {/* Link Removal */}
        <div id="link-removal" className="mb-8">
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
            <FormattedMessage id="license.sections.rights.linkRemoval.title" />
          </h3>
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-300">
              <FormattedMessage id="license.sections.rights.linkRemoval.process" />
            </p>
            <p className="text-slate-700 dark:text-slate-300">
              <FormattedMessage id="license.sections.rights.linkRemoval.disclaimer" />
            </p>
          </div>
        </div>
      </section>

      {/* Content Liability */}
      <section id="content-liability" className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          <FormattedMessage id="license.sections.liability.title" />
        </h2>
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300">
            <FormattedMessage id="license.sections.liability.noResponsibility" />
          </p>
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-200 m-0">
              <FormattedMessage
                id="license.sections.liability.prohibited"
                values={{
                  strong: (chunks: React.ReactNode) => <strong>{chunks}</strong>,
                }}
              />
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer and Limitations */}
      <section id="disclaimer-limitations" className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          <FormattedMessage id="license.sections.disclaimer.title" />
        </h2>

        {/* Liability Exclusions */}
        <div id="liability-exclusions" className="mb-8">
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
            <FormattedMessage id="license.sections.disclaimer.exclusions.title" />
          </h3>
          <p className="text-slate-700 dark:text-slate-300">
            <FormattedMessage id="license.sections.disclaimer.exclusions.content" />
          </p>
        </div>

        {/* Legal Limitations */}
        <div id="legal-limitations" className="mb-8">
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
            <FormattedMessage id="license.sections.disclaimer.limitations.title" />
          </h3>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            <FormattedMessage id="license.sections.disclaimer.limitations.intro" />
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 dark:text-slate-300">
            <li>
              <FormattedMessage id="license.sections.disclaimer.limitations.negligence" />
            </li>
            <li>
              <FormattedMessage id="license.sections.disclaimer.limitations.fraud" />
            </li>
            <li>
              <FormattedMessage id="license.sections.disclaimer.limitations.notPermitted" />
            </li>
            <li>
              <FormattedMessage id="license.sections.disclaimer.limitations.notExcluded" />
            </li>
          </ul>
          <p className="text-slate-700 dark:text-slate-300 mt-4">
            <FormattedMessage id="license.sections.disclaimer.limitations.freeServices" />
          </p>
        </div>
      </section>
    </div>
  );
}
