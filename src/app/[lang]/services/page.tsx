import { Suspense, lazy } from "react";

import ErrorBoundary from "@/components/ErrorBoundary";
import Spinner from "@/components/Spinner";

import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";
import { metadataBase } from "@/lib/metadata";

// Dynamic imports for heavy components to reduce initial bundle size
const ContactInfo = lazy(() => import("@/components/ContactInfo"));
const ContactSalesForm = lazy(() => import("@/components/ContactSalesForm"));
const ISSIServicesMapWrapper = lazy(() => import("@/components/ISSIServicesMapWrapper"));
const ISSIServicesShowcaseWrapper = lazy(() => import("@/components/ISSIServicesShowcaseWrapper"));

export const metadata = {
  metadataBase,
  title: "IT Services & Solutions - ISSI - International Software Systems International",
  description: "Comprehensive IT services including software development, cloud computing, cybersecurity, and government solutions by ISSI.",
};

interface Props {
  params: {
    lang: Locale;
  };
}

export default async function Page({ params }: Props) {
  const { lang: locale } = await params;
  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <PageContent locale={locale} />
      </Suspense>
    </ErrorBoundary>
  );
}

interface PageContentProps {
  locale: Locale;
}

async function PageContent({ locale }: PageContentProps) {
  const _intl = await getIntl(locale);
  const messages = (await import(`../../../lang/${locale}.json`)).default;

  return (
    <div>
      {/* Services Showcase - Bento Grid Layout */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center"><Spinner /></div>}>
        <ISSIServicesShowcaseWrapper locale={locale} messages={messages} />
      </Suspense>

      {/* Services Map with US coverage */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center"><Spinner /></div>}>
        <ISSIServicesMapWrapper locale={locale} messages={messages} />
      </Suspense>

      {/* Contact Form */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center"><Spinner /></div>}>
        <ContactSalesForm locale={locale} messages={messages} />
      </Suspense>

      {/* Contact Information */}
      <Suspense fallback={<div className="h-32 flex items-center justify-center"><Spinner /></div>}>
        <ContactInfo locale={locale} messages={messages} />
      </Suspense>
    </div>
  );
}