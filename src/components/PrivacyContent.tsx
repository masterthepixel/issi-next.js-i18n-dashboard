'use client';

import React from 'react';
import { IntlProvider, FormattedMessage, useIntl } from 'react-intl';

interface PrivacyContentProps {
  messages: Record<string, string>;
  locale: string;
}

export default function PrivacyContent({ messages, locale }: PrivacyContentProps) {
  return (
    <IntlProvider messages={messages} locale={locale}>
      <PrivacyContentInner />
    </IntlProvider>
  );
}

function PrivacyContentInner() {
  const intl = useIntl();

  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      {/* Notice */}
      <section id="notice" className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          <FormattedMessage id="privacy.sections.notice.title" />
        </h2>
        <div className="space-y-4">
          <p className="text-lg text-slate-700 dark:text-slate-300">
            <FormattedMessage id="privacy.sections.notice.commitment" />
          </p>
        </div>
      </section>

      {/* Overview */}
      <section id="overview" className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          <FormattedMessage id="privacy.sections.overview.title" />
        </h2>
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300">
            <FormattedMessage id="privacy.sections.overview.anonymous" />
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            <FormattedMessage id="privacy.sections.overview.ipAddress" />
          </p>
        </div>
      </section>

      {/* Registration */}
      <section id="registration" className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          <FormattedMessage id="privacy.sections.registration.title" />
        </h2>
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300">
            <FormattedMessage id="privacy.sections.registration.voluntary" />
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            <FormattedMessage id="privacy.sections.registration.dataUse" />
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            <FormattedMessage id="privacy.sections.registration.transfer" />
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            <FormattedMessage id="privacy.sections.registration.storage" />
          </p>
        </div>
      </section>      {/* Cookies */}
      <section id="cookies" className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          <FormattedMessage id="privacy.sections.cookies.title" />
        </h2>
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300">
            <FormattedMessage id="privacy.sections.cookies.definition" />
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            <FormattedMessage id="privacy.sections.cookies.currentUse" />
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            <FormattedMessage id="privacy.sections.cookies.control" />
          </p>
        </div>
      </section>      {/* Anonymous Data Collection */}
      <section id="anonymous-data" className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          <FormattedMessage id="privacy.sections.anonymous.title" />
        </h2>
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300">
            <FormattedMessage id="privacy.sections.cookies.anonymousData" />
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            <FormattedMessage id="privacy.sections.cookies.dataAnalysis" />
          </p>
        </div>
      </section>

      {/* Links to Other Websites */}
      <section id="links" className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          <FormattedMessage id="privacy.sections.links.title" />
        </h2>
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300">
            <FormattedMessage id="privacy.sections.links.disclaimer" />
          </p>
        </div>
      </section>

      {/* Delete/Deactivate */}
      <section id="delete-deactivate" className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          <FormattedMessage id="privacy.sections.deleteDeactivate.title" />
        </h2>
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300">
            <FormattedMessage id="privacy.sections.deleteDeactivate.options" />
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            <FormattedMessage 
              id="privacy.sections.deleteDeactivate.process" 
              values={{
                email: intl.formatMessage({ id: 'privacy.email.webinfo' })
              }}
            />
          </p>
        </div>
      </section>

      {/* Change/Modify */}
      <section id="change-modify" className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          <FormattedMessage id="privacy.sections.changeModify.title" />
        </h2>
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300">
            <FormattedMessage id="privacy.sections.changeModify.options" />
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            <FormattedMessage 
              id="privacy.sections.changeModify.process" 
              values={{
                email: intl.formatMessage({ id: 'privacy.email.webinfo' })
              }}
            />
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            <FormattedMessage id="privacy.sections.changeModify.policyUpdates" />
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section id="contact" className="mb-12">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
          <FormattedMessage id="privacy.sections.contact.title" />
        </h2>
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300">
            <FormattedMessage id="privacy.sections.contact.questions" />
          </p>
          <p className="text-slate-700 dark:text-slate-300">
            <FormattedMessage 
              id="privacy.sections.contact.email" 
              values={{
                email: intl.formatMessage({ id: 'privacy.email.webinfo' })
              }}
            />
          </p>
        </div>
      </section>
    </div>
  );
}
