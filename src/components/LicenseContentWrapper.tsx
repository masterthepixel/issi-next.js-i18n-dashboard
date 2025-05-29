'use client';

import TableOfContents from '@/components/TableOfContents';
import TermsContent from '@/components/TermsContent';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface LicenseContentWrapperProps {
  messages: Record<string, string>;
  locale: string;
  tocTitle: string;
  toggleAriaLabel: string;
  closeAriaLabel: string;
}

export default function LicenseContentWrapper({ 
  messages, 
  locale, 
  tocTitle, 
  toggleAriaLabel, 
  closeAriaLabel 
}: LicenseContentWrapperProps) {
  // Define the sections for Table of Contents
  const tocItems = [
    { id: 'introduction', title: messages['license.toc.introduction'], level: 1 },
    { id: 'definitions', title: messages['license.toc.definitions'], level: 1 },
    { id: 'cookies-policy', title: messages['license.toc.cookiesPolicy'], level: 1 },
    { id: 'hyperlinking-guidelines', title: messages['license.toc.hyperlinkingGuidelines'], level: 1 },
    { id: 'approved-organizations', title: messages['license.toc.approvedOrganizations'], level: 2 },
    { id: 'conditional-approval', title: messages['license.toc.conditionalApproval'], level: 2 },
    { id: 'link-request-process', title: messages['license.toc.linkRequestProcess'], level: 2 },
    { id: 'linking-standards', title: messages['license.toc.linkingStandards'], level: 2 },
    { id: 'iframes-policy', title: messages['license.toc.iframesPolicy'], level: 1 },
    { id: 'rights-modifications', title: messages['license.toc.rightsModifications'], level: 1 },
    { id: 'reservation-rights', title: messages['license.toc.reservationRights'], level: 2 },
    { id: 'link-removal', title: messages['license.toc.linkRemoval'], level: 2 },
    { id: 'content-liability', title: messages['license.toc.contentLiability'], level: 1 },
    { id: 'disclaimer-limitations', title: messages['license.toc.disclaimerLimitations'], level: 1 },
    { id: 'liability-exclusions', title: messages['license.toc.liabilityExclusions'], level: 2 },
    { id: 'legal-limitations', title: messages['license.toc.legalLimitations'], level: 2 },
  ];

  // Track active section
  const activeId = useIntersectionObserver(tocItems.map(item => item.id));

  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 xl:pr-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                {messages['license.page.title']}
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400">
                {messages['license.page.subtitle']}
              </p>
            </div>
            
            <TermsContent messages={messages} locale={locale} />
          </div>

          {/* Table of Contents */}
          <div className="hidden xl:block xl:w-64 flex-shrink-0">
            <TableOfContents
              items={tocItems}
              activeId={activeId}
              title={tocTitle}
              toggleAriaLabel={toggleAriaLabel}
              closeAriaLabel={closeAriaLabel}
            />
          </div>
        </div>
      </div>

      {/* Mobile Table of Contents */}
      <div className="xl:hidden">
        <TableOfContents
          items={tocItems}
          activeId={activeId}
          title={tocTitle}
          toggleAriaLabel={toggleAriaLabel}
          closeAriaLabel={closeAriaLabel}
        />
      </div>
    </div>
  );
}
