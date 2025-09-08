'use client';

import { Timeline } from '@/components/ui/Timeline';
import { FormattedMessage, IntlProvider, useIntl } from 'react-intl';

interface PrivacyTimelineContentProps {
  messages: Record<string, string>;
  locale: string;
}

export default function PrivacyTimelineContent({ messages, locale }: PrivacyTimelineContentProps) {
  return (
    <IntlProvider messages={messages} locale={locale}>
      <PrivacyTimelineInner />
    </IntlProvider>
  );
}

function PrivacyTimelineInner() {
  const intl = useIntl();

  const timelineData = [
    {
      title: intl.formatMessage({ id: "privacy.sections.notice.title" }),
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-4">
            <p className="text-lg  " text-muted-foreground797>
              <FormattedMessage id="privacy.sections.notice.commitment" />
            </p>
          </div>
        </div>
      )
    },
    {
      title: intl.formatMessage({ id: "privacy.sections.overview.title" }),
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-4">
            <p className="" text-muted-foreground1229>
              <FormattedMessage id="privacy.sections.overview.anonymous" />
            </p>
            <p className="" text-muted-foreground1388>
              <FormattedMessage id="privacy.sections.overview.ipAddress" />
            </p>
          </div>
        </div>
      )
    },
    {
      title: intl.formatMessage({ id: "privacy.sections.registration.title" }),
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-4">
            <p className="" text-muted-foreground1817>
              <FormattedMessage id="privacy.sections.registration.voluntary" />
            </p>
            <p className="" text-muted-foreground1980>
              <FormattedMessage id="privacy.sections.registration.dataUse" />
            </p>
            <p className="" text-muted-foreground2141>
              <FormattedMessage id="privacy.sections.registration.transfer" />
            </p>
            <p className="" text-muted-foreground2303>
              <FormattedMessage id="privacy.sections.registration.storage" />
            </p>
          </div>
        </div>
      )
    },
    {
      title: intl.formatMessage({ id: "privacy.sections.cookies.title" }),
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-4">
            <p className="" text-muted-foreground2729>
              <FormattedMessage id="privacy.sections.cookies.definition" />
            </p>
            <p className="" text-muted-foreground2888>
              <FormattedMessage id="privacy.sections.cookies.currentUse" />
            </p>
            <p className="" text-muted-foreground3047>
              <FormattedMessage id="privacy.sections.cookies.control" />
            </p>
          </div>
        </div>
      )
    },
    {
      title: intl.formatMessage({ id: "privacy.sections.anonymous.title" }),
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-4">
            <p className="" text-muted-foreground3470>
              <FormattedMessage id="privacy.sections.cookies.anonymousData" />
            </p>
            <p className="" text-muted-foreground3632>
              <FormattedMessage id="privacy.sections.cookies.dataAnalysis" />
            </p>
          </div>
        </div>
      )
    },
    {
      title: intl.formatMessage({ id: "privacy.sections.links.title" }),
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-4">
            <p className="" text-muted-foreground4056>
              <FormattedMessage id="privacy.sections.links.disclaimer" />
            </p>
          </div>
        </div>
      )
    },
    {
      title: intl.formatMessage({ id: "privacy.sections.deleteDeactivate.title" }),
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-4">
            <p className="" text-muted-foreground4487>
              <FormattedMessage id="privacy.sections.deleteDeactivate.options" />
            </p>
            <p className="" text-muted-foreground4652>
              <FormattedMessage
                id="privacy.sections.deleteDeactivate.process"
                values={{
                  email: intl.formatMessage({ id: 'privacy.email.webinfo' })
                }}
              />
            </p>
          </div>
        </div>
      )
    },
    {
      title: intl.formatMessage({ id: "privacy.sections.changeModify.title" }),
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-4">
            <p className="" text-muted-foreground5244>
              <FormattedMessage id="privacy.sections.changeModify.options" />
            </p>
            <p className="" text-muted-foreground5405>
              <FormattedMessage
                id="privacy.sections.changeModify.process"
                values={{
                  email: intl.formatMessage({ id: 'privacy.email.webinfo' })
                }}
              />
            </p>
            <p className="" text-muted-foreground5723>
              <FormattedMessage id="privacy.sections.changeModify.policyUpdates" />
            </p>
          </div>
        </div>
      )
    },
    {
      title: intl.formatMessage({ id: "privacy.sections.contact.title" }),
      content: (
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="space-y-4">
            <p className="" text-muted-foreground6155>
              <FormattedMessage id="privacy.sections.contact.questions" />
            </p>
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <p className="" text-muted-foreground6391>
                <FormattedMessage id="privacy.sections.contact.address" />
              </p>
              <p className="" text-muted-foreground6565>
                <FormattedMessage id="privacy.sections.contact.phone" />
              </p>
              <p className="" text-muted-foreground6725>
                <FormattedMessage id="privacy.sections.contact.email" />
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
      title={intl.formatMessage({ id: "privacy.timeline.title" })}
      subtitle={intl.formatMessage({ id: "privacy.timeline.subtitle" })}
    />
  );
}
