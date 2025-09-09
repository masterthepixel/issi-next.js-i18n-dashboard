'use client';

import { Timeline } from '@/components/ui/Timeline';
import { FormattedMessage, IntlProvider, useIntl } from 'react-intl';

interface TermsTimelineContentProps {
  messages: Record<string, string>;
  locale: string;
}

export default function TermsTimelineContent({ messages, locale }: TermsTimelineContentProps) {
  return (
    <IntlProvider messages={messages} locale={locale}>
      <TermsTimelineInner />
    </IntlProvider>
  );
}

function TermsTimelineInner() {
  const intl = useIntl();

  const timelineData = [
    {
      title: intl.formatMessage({ id: "terms.sections.introduction.title" }),
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-4">
            <p className="text-lg  ">
              <FormattedMessage id="terms.sections.introduction.welcome" />
            </p>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <p className="text-amber-800 dark:text-amber-200 m-0">
                <FormattedMessage
                  id="terms.sections.introduction.important"
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
      title: intl.formatMessage({ id: "terms.sections.definitions.title" }),
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-6">
            <p className="text-lg  ">
              <FormattedMessage id="terms.sections.definitions.intro" />
            </p>
            <dl className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <dt className="font-semibold text-slate-900 dark:text-slate-100">
                  <FormattedMessage id="terms.sections.definitions.client.term" />
                </dt>
                <dd className="">
                  <FormattedMessage id="terms.sections.definitions.client.definition" />
                </dd>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <dt className="font-semibold text-slate-900 dark:text-slate-100">
                  <FormattedMessage id="terms.sections.definitions.company.term" />
                </dt>
                <dd className="">
                  <FormattedMessage id="terms.sections.definitions.company.definition" />
                </dd>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <dt className="font-semibold text-slate-900 dark:text-slate-100">
                  <FormattedMessage id="terms.sections.definitions.parties.term" />
                </dt>
                <dd className="">
                  <FormattedMessage id="terms.sections.definitions.parties.definition" />
                </dd>
              </div>
            </dl>
          </div>
        </div>
      )
    },
    {
      title: intl.formatMessage({ id: "terms.sections.websiteUse.title" }),
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-4">
            <p className="text-lg  ">
              <FormattedMessage id="terms.sections.websiteUse.license" />
            </p>
            <p className="">
              <FormattedMessage id="terms.sections.websiteUse.restrictions" />
            </p>
            <p className="">
              <FormattedMessage id="terms.sections.websiteUse.termination" />
            </p>
          </div>
        </div>
      )
    },
    {
      title: intl.formatMessage({ id: "terms.sections.disclaimer.title" }),
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-4">
            <p className="text-lg  ">
              <FormattedMessage id="terms.sections.disclaimer.accuracy" />
            </p>
            <p className="">
              <FormattedMessage id="terms.sections.disclaimer.reliability" />
            </p>
          </div>
        </div>
      )
    },
    {
      title: intl.formatMessage({ id: "terms.sections.limitations.title" }),
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-4">
            <p className="">
              <FormattedMessage id="terms.sections.limitations.liability" />
            </p>
            <p className="">
              <FormattedMessage id="terms.sections.limitations.jurisdiction" />
            </p>
          </div>
        </div>
      )
    },
    {
      title: intl.formatMessage({ id: "terms.sections.revisions.title" }),
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-4">
            <p className="">
              <FormattedMessage id="terms.sections.revisions.materials" />
            </p>
            <p className="">
              <FormattedMessage id="terms.sections.revisions.changes" />
            </p>
          </div>
        </div>
      )
    },
    {
      title: intl.formatMessage({ id: "terms.sections.links.title" }),
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-4">
            <p className="">
              <FormattedMessage id="terms.sections.links.responsibility" />
            </p>
            <p className="">
              <FormattedMessage id="terms.sections.links.inclusion" />
            </p>
          </div>
        </div>
      )
    },
    {
      title: intl.formatMessage({ id: "terms.sections.modifications.title" }),
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-4">
            <p className="">
              <FormattedMessage id="terms.sections.modifications.content" />
            </p>
          </div>
        </div>
      )
    },
    {
      title: intl.formatMessage({ id: "terms.sections.governingLaw.title" }),
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-4">
            <p className="">
              <FormattedMessage id="terms.sections.governingLaw.content" />
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <Timeline
      data={timelineData}
      title={intl.formatMessage({ id: "terms.timeline.title" })}
      subtitle={intl.formatMessage({ id: "terms.timeline.subtitle" })}
    />
  );
}
