'use client';

import { Timeline } from '@/components/ui/Timeline';
import { FormattedMessage, IntlProvider, useIntl } from 'react-intl';

interface LicenseTimelineContentProps {
  messages: Record<string, string>;
  locale: string;
}

export default function LicenseTimelineContent({ messages, locale }: LicenseTimelineContentProps) {
  return (
    <IntlProvider messages={messages} locale={locale}>
      <LicenseTimelineInner />
    </IntlProvider>
  );
}

function LicenseTimelineInner() {
  const intl = useIntl();

  const timelineData = [
    {
      title: intl.formatMessage({ id: "license.sections.introduction.title" }),
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-4">
            <p className="text-lg text-slate-700 dark:text-slate-100">
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
        </div>
      )
    },
    {
      title: intl.formatMessage({ id: "license.sections.definitions.title" }),
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-6">
            <p className="text-lg text-slate-700 dark:text-slate-100">
              <FormattedMessage id="license.sections.definitions.intro" />
            </p>
            <dl className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <dt className="font-semibold text-slate-900 dark:text-slate-100">
                  <FormattedMessage id="license.sections.definitions.client.term" />
                </dt>
                <dd className="text-slate-700 dark:text-slate-100 mt-1">
                  <FormattedMessage id="license.sections.definitions.client.definition" />
                </dd>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <dt className="font-semibold text-slate-900 dark:text-slate-100">
                  <FormattedMessage id="license.sections.definitions.company.term" />
                </dt>
                <dd className="text-slate-700 dark:text-slate-100 mt-1">
                  <FormattedMessage id="license.sections.definitions.company.definition" />
                </dd>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <dt className="font-semibold text-slate-900 dark:text-slate-100">
                  <FormattedMessage id="license.sections.definitions.parties.term" />
                </dt>
                <dd className="text-slate-700 dark:text-slate-100 mt-1">
                  <FormattedMessage id="license.sections.definitions.parties.definition" />
                </dd>
              </div>
            </dl>
            <p className="text-slate-700 dark:text-slate-100">
              <FormattedMessage id="license.sections.definitions.allTerms" />
            </p>
          </div>
        </div>
      )
    },
    {
      title: intl.formatMessage({ id: "license.sections.cookies.title" }),
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-4">
            <p className="text-lg text-slate-700 dark:text-slate-100">
              <FormattedMessage id="license.sections.cookies.consent" />
            </p>
            <p className="text-slate-700 dark:text-slate-100">
              <FormattedMessage id="license.sections.cookies.description" />
            </p>
          </div>
        </div>
      )
    },
    {
      title: intl.formatMessage({ id: "license.sections.hyperlinking.title" }),
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                <FormattedMessage id="license.sections.hyperlinking.approved.title" />
              </h4>
              <p className="text-slate-700 dark:text-slate-100 mb-3">
                <FormattedMessage id="license.sections.hyperlinking.approved.intro" />
              </p>
              <ul className="space-y-2">
                <li className="text-slate-700 dark:text-slate-100">
                  <FormattedMessage id="license.sections.hyperlinking.approved.government" />
                </li>
                <li className="text-slate-700 dark:text-slate-100">
                  <FormattedMessage id="license.sections.hyperlinking.approved.searchEngines" />
                </li>
                <li className="text-slate-700 dark:text-slate-100">
                  <FormattedMessage id="license.sections.hyperlinking.approved.news" />
                </li>
                <li className="text-slate-700 dark:text-slate-100">
                  <FormattedMessage id="license.sections.hyperlinking.approved.directories" />
                </li>
                <li className="text-slate-700 dark:text-slate-100">
                  <FormattedMessage id="license.sections.hyperlinking.approved.accredited" />
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                <FormattedMessage id="license.sections.hyperlinking.conditional.title" />
              </h4>
              <p className="text-slate-700 dark:text-slate-100 mb-3">
                <FormattedMessage id="license.sections.hyperlinking.conditional.intro" />
              </p>
              <ul className="space-y-2">
                <li className="text-slate-700 dark:text-slate-100">
                  <FormattedMessage id="license.sections.hyperlinking.conditional.consumer" />
                </li>
                <li className="text-slate-700 dark:text-slate-100">
                  <FormattedMessage id="license.sections.hyperlinking.conditional.community" />
                </li>
                <li className="text-slate-700 dark:text-slate-100">
                  <FormattedMessage id="license.sections.hyperlinking.conditional.charities" />
                </li>
                <li className="text-slate-700 dark:text-slate-100">
                  <FormattedMessage id="license.sections.hyperlinking.conditional.portals" />
                </li>
                <li className="text-slate-700 dark:text-slate-100">
                  <FormattedMessage id="license.sections.hyperlinking.conditional.professional" />
                </li>
                <li className="text-slate-700 dark:text-slate-100">
                  <FormattedMessage id="license.sections.hyperlinking.conditional.educational" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: intl.formatMessage({ id: "license.sections.hyperlinking.process.title" }),
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-100">
              <FormattedMessage
                id="license.sections.hyperlinking.process.intro"
                values={{
                  email: 'info@issi.com'
                }}
              />
            </p>
            <ul className="space-y-2">
              <li className="text-slate-700 dark:text-slate-100">
                <FormattedMessage id="license.sections.hyperlinking.process.name" />
              </li>
              <li className="text-slate-700 dark:text-slate-100">
                <FormattedMessage id="license.sections.hyperlinking.process.contact" />
              </li>
              <li className="text-slate-700 dark:text-slate-100">
                <FormattedMessage id="license.sections.hyperlinking.process.url" />
              </li>
              <li className="text-slate-700 dark:text-slate-100">
                <FormattedMessage id="license.sections.hyperlinking.process.linkUrls" />
              </li>
              <li className="text-slate-700 dark:text-slate-100">
                <FormattedMessage id="license.sections.hyperlinking.process.targetUrls" />
              </li>
            </ul>
            <p className="text-slate-700 dark:text-slate-100">
              <FormattedMessage id="license.sections.hyperlinking.process.timeline" />
            </p>
          </div>
        </div>
      )
    },
    {
      title: intl.formatMessage({ id: "license.sections.hyperlinking.standards.title" }),
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-100">
              <FormattedMessage id="license.sections.hyperlinking.standards.intro" />
            </p>
            <ul className="space-y-2">
              <li className="text-slate-700 dark:text-slate-100">
                <FormattedMessage id="license.sections.hyperlinking.standards.corporateName" />
              </li>
              <li className="text-slate-700 dark:text-slate-100">
                <FormattedMessage id="license.sections.hyperlinking.standards.url" />
              </li>
              <li className="text-slate-700 dark:text-slate-100">
                <FormattedMessage id="license.sections.hyperlinking.standards.description" />
              </li>
            </ul>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
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
        </div>
      )
    },
    {
      title: intl.formatMessage({ id: "license.sections.iframes.title" }),
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-100">
              <FormattedMessage id="license.sections.iframes.content" />
            </p>
          </div>
        </div>
      )
    },
    {
      title: intl.formatMessage({ id: "license.sections.rights.title" }),
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                <FormattedMessage id="license.sections.rights.reservation.title" />
              </h4>
              <p className="text-slate-700 dark:text-slate-100">
                <FormattedMessage id="license.sections.rights.reservation.removal" />
              </p>
              <p className="text-slate-700 dark:text-slate-100">
                <FormattedMessage id="license.sections.rights.reservation.amendment" />
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                <FormattedMessage id="license.sections.rights.removal.title" />
              </h4>
              <p className="text-slate-700 dark:text-slate-100">
                <FormattedMessage id="license.sections.rights.removal.content" />
              </p>
              <p className="text-slate-700 dark:text-slate-100">
                <FormattedMessage id="license.sections.rights.linkRemoval.process" />
              </p>
              <p className="text-slate-700 dark:text-slate-100">
                <FormattedMessage id="license.sections.rights.linkRemoval.disclaimer" />
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: intl.formatMessage({ id: "license.sections.liability.title" }),
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-4">
            <p className="text-slate-700 dark:text-slate-100">
              <FormattedMessage id="license.sections.liability.content" />
            </p>
            <p className="text-slate-700 dark:text-slate-100">
              <FormattedMessage id="license.sections.liability.noResponsibility" />
            </p>
            <p className="text-slate-700 dark:text-slate-100">
              <FormattedMessage id="license.sections.liability.prohibited" />
            </p>
          </div>
        </div>
      )
    },
    {
      title: intl.formatMessage({ id: "license.sections.disclaimer.title" }),
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                <FormattedMessage id="license.sections.disclaimer.exclusions.title" />
              </h4>
              <p className="text-slate-700 dark:text-slate-100">
                <FormattedMessage id="license.sections.disclaimer.exclusions.content" />
              </p>
            </div>

            <div>
              <h4 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                <FormattedMessage id="license.sections.disclaimer.limitations.title" />
              </h4>
              <p className="text-slate-700 dark:text-slate-100">
                <FormattedMessage id="license.sections.disclaimer.limitations.intro" />
              </p>
              <ul className="space-y-2">
                <li className="text-slate-700 dark:text-slate-100">
                  <FormattedMessage id="license.sections.disclaimer.limitations.negligence" />
                </li>
                <li className="text-slate-700 dark:text-slate-100">
                  <FormattedMessage id="license.sections.disclaimer.limitations.fraud" />
                </li>
                <li className="text-slate-700 dark:text-slate-100">
                  <FormattedMessage id="license.sections.disclaimer.limitations.notPermitted" />
                </li>
                <li className="text-slate-700 dark:text-slate-100">
                  <FormattedMessage id="license.sections.disclaimer.limitations.notExcluded" />
                </li>
              </ul>
              <p className="text-slate-700 dark:text-slate-100">
                <FormattedMessage id="license.sections.disclaimer.limitations.freeServices" />
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <Timeline
      data={timelineData}
      title={intl.formatMessage({ id: "license.timeline.title" })}
      subtitle={intl.formatMessage({ id: "license.timeline.subtitle" })}
    />
  );
}
