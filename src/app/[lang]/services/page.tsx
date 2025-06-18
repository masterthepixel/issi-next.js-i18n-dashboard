import { Suspense } from "react";

import BreadcrumbWithGlobeWrapper from "@/components/BreadcrumbWithGlobeWrapper";
import ContactInfo from "@/components/ContactInfo";
import ContactSalesForm from "@/components/ContactSalesForm";
import ISSIServicesMapWrapper from "@/components/ISSIServicesMapWrapper";
import ISSIServicesShowcaseWrapper from "@/components/ISSIServicesShowcaseWrapper";
import Spinner from "@/components/Spinner";

import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";

export const metadata = {
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
    <Suspense fallback={<Spinner />}>
      <PageContent locale={locale} />
    </Suspense>
  );
}

interface PageContentProps {
  locale: Locale;
}

async function PageContent({ locale }: PageContentProps) {
  const intl = await getIntl(locale);
  const messages = (await import(`../../../lang/${locale}.json`)).default;
  
  // Define breadcrumb items
  const breadcrumbItems = [
    { label: intl.formatMessage({ id: "breadcrumb.home" }), href: `/${locale}` },
    { label: intl.formatMessage({ id: "breadcrumb.services" }), isActive: true }
  ];
  return (
    <div>
      {/* Breadcrumb with GeoGlobe - full width, aligned to left */}
      <div className="max-w-7xl mx-auto px-2 py-8">
        <BreadcrumbWithGlobeWrapper
          locale={locale}
          messages={messages}
          items={breadcrumbItems}
          title={intl.formatMessage({ id: "services.page.title" })}
          backLabel={intl.formatMessage({ id: "breadcrumb.back" })}
          backHref={`/${locale}`}
        />
      </div>
      
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