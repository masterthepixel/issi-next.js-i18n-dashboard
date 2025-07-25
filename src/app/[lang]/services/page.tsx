import { Suspense } from "react";

import ContactInfo from "@/components/ContactInfo";
import ContactSalesForm from "@/components/ContactSalesForm";
import ErrorBoundary from "@/components/ErrorBoundary";
import ISSIServicesMapWrapper from "@/components/ISSIServicesMapWrapper";
import ISSIServicesShowcaseWrapper from "@/components/ISSIServicesShowcaseWrapper";
import Spinner from "@/components/Spinner";

import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";
import { metadataBase } from "@/lib/metadata";

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

export default function Page({ params: { lang: locale } }: Props) {
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
      <ISSIServicesShowcaseWrapper locale={locale} messages={messages} />

      {/* Services Map with US coverage */}
      <ISSIServicesMapWrapper locale={locale} messages={messages} />
      {/* Contact Form */}
      <ContactSalesForm locale={locale} messages={messages} />

      {/* Contact Information */}
      <ContactInfo locale={locale} messages={messages} />
    </div>
  );
}