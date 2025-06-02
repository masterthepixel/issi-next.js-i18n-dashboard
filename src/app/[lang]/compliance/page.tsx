import { Suspense } from "react";

import AboutAwardsWrapper from "@/components/AboutAwardsWrapper";
import AboutPartnerNetworkWrapper from "@/components/AboutPartnerNetworkWrapper";
import ComplianceCertificationsWrapper from "@/components/ComplianceCertificationsWrapper";
import ComplianceHeroWrapper from "@/components/ComplianceHeroWrapper";
import ComplianceIndustryCertificationsWrapper from "@/components/ComplianceIndustryCertificationsWrapper";
import ComplianceStatsWrapper from "@/components/ComplianceStatsWrapper";
import Spinner from "@/components/Spinner";

import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";

export const metadata = {
  title: "Compliance Solutions - ISSI - International Software Systems International",
  description: "ISSI's compliance software solutions and regulatory management tools for businesses and organizations.",
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

  return (
    <main>      {/* Hero section */}
      <ComplianceHeroWrapper locale={locale} messages={messages} />
      
      {/* ComplianceCertifications component - modern bento grid layout */}
      <ComplianceCertificationsWrapper
        locale={locale}
        messages={intl.messages}
      />
      
      {/* Stats section */}
      <ComplianceStatsWrapper locale={locale} messages={messages} />        {/* Partner Network / Logo Clouds section */}
      <AboutPartnerNetworkWrapper locale={locale} messages={messages} />
      
      {/* Industry Certifications section */}
      <ComplianceIndustryCertificationsWrapper locale={locale} messages={messages} />
      
      {/* Awards section - last section before footer */}
      <AboutAwardsWrapper locale={locale} messages={messages} />
    </main>
  );
}