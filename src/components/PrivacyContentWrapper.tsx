'use client';

import React from 'react';
import TableOfContents from '@/components/TableOfContents';
import PrivacyContent from '@/components/PrivacyContent';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface PrivacyContentWrapperProps {
  messages: Record<string, string>;
  locale: string;
  tocTitle: string;
  toggleAriaLabel: string;
  closeAriaLabel: string;
}

export default function PrivacyContentWrapper({ 
  messages, 
  locale, 
  tocTitle, 
  toggleAriaLabel, 
  closeAriaLabel 
}: PrivacyContentWrapperProps) {  // Define the sections for Table of Contents
  const tocItems = [
    { id: 'notice', title: messages['privacy.toc.notice'], level: 1 },
    { id: 'overview', title: messages['privacy.toc.overview'], level: 1 },
    { id: 'registration', title: messages['privacy.toc.registration'], level: 1 },
    { id: 'cookies', title: messages['privacy.toc.cookies'], level: 1 },
    { id: 'anonymous-data', title: messages['privacy.toc.anonymousData'], level: 1 },
    { id: 'links', title: messages['privacy.toc.links'], level: 1 },
    { id: 'delete-deactivate', title: messages['privacy.toc.deleteDeactivate'], level: 1 },
    { id: 'change-modify', title: messages['privacy.toc.changeModify'], level: 1 },
    { id: 'contact', title: messages['privacy.toc.contact'], level: 1 },
  ];
  // Use intersection observer to track active sections
  const activeId = useIntersectionObserver(tocItems.map(item => item.id));

  return (
    <div className="relative z-10 bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative lg:grid lg:grid-cols-4 lg:gap-8">          {/* Desktop Table of Contents */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <TableOfContents
                items={tocItems}
                activeId={activeId}
                title={tocTitle}
                toggleAriaLabel={toggleAriaLabel}
                closeAriaLabel={closeAriaLabel}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Mobile Table of Contents Button */}
            <div className="lg:hidden mb-8">
              <TableOfContents
                items={tocItems}
                activeId={activeId}
                title={tocTitle}
                toggleAriaLabel={toggleAriaLabel}
                closeAriaLabel={closeAriaLabel}
              />
            </div>

            {/* Privacy Content */}
            <PrivacyContent 
              messages={messages} 
              locale={locale} 
            />
          </main>
        </div>
      </div>
    </div>
  );
}
