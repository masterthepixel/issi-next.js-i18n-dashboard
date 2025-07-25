'use client';

import LicenseTimelineContent from '@/components/LicenseTimelineContent';

interface LicenseTimelineWrapperProps {
  messages: Record<string, string>;
  locale: string;
}

export default function LicenseTimelineWrapper({ messages, locale }: LicenseTimelineWrapperProps) {
  return (
    <div className="bg-transparent">
      <LicenseTimelineContent messages={messages} locale={locale} />
    </div>
  );
}
