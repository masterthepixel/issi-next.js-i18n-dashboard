'use client';

import PrivacyTimelineContent from '@/components/PrivacyTimelineContent';

interface PrivacyTimelineWrapperProps {
  messages: Record<string, string>;
  locale: string;
}

export default function PrivacyTimelineWrapper({
  messages,
  locale
}: PrivacyTimelineWrapperProps) {
  return (
    <div className="relative z-10 min-h-screen">
      <PrivacyTimelineContent
        messages={messages}
        locale={locale}
      />
    </div>
  );
}
