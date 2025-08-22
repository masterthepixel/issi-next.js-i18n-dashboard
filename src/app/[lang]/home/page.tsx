import { Suspense } from "react";

import AboutAwardsWrapper from "@/components/AboutAwardsWrapper";
import AboutCertificationsWrapper from "@/components/AboutCertificationsWrapper";
import AboutPartnerNetworkWrapper from "@/components/AboutPartnerNetworkWrapper";
import HeroWrapper from "@/components/HeroWrapper";
import ISSIServicesShowcaseWrapper from "@/components/ISSIServicesShowcaseWrapper";
import Spinner from "@/components/Spinner";

import { Locale } from "@/lib/definitions";

interface Props {
  params: {
    lang: Locale;
  };
}

export default async function Page({ params }: Props) {
  const { lang: locale } = await params;
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
  const messages = (await import(`../../../lang/${locale}.json`)).default;

  return (
    <>
      <HeroWrapper locale={locale} messages={messages} />
      
      {/* Partner Network - Client Logos */}
      <AboutPartnerNetworkWrapper locale={locale} messages={messages} />
      
      {/* Services Showcase - Bento Grid Layout */}
      <ISSIServicesShowcaseWrapper locale={locale} messages={messages} />
      
      {/* Certifications - Show technology expertise */}
      <AboutCertificationsWrapper locale={locale} messages={messages} />
      
      {/* Awards - Additional credibility and trust */}
      <AboutAwardsWrapper locale={locale} messages={messages} />
    </>
  );
}
