'use client';

import TermsTimelineContent from '@/components/TermsTimelineContent';

interface TermsTimelineWrapperProps {
  messages: Record<string, string>;
  locale: string;
}

export default function TermsTimelineWrapper({ messages, locale }: TermsTimelineWrapperProps) {
  return (
    <div className="bg-transparent">
      <TermsTimelineContent messages={messages} locale={locale} />
    </div>
  );
}
