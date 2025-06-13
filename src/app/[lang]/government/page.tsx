import { Suspense } from "react";

import AboutAwardsWrapper from "@/components/AboutAwardsWrapper";
import AboutPartnerNetworkWrapper from "@/components/AboutPartnerNetworkWrapper";
import AboutStatsWrapper from "@/components/AboutStatsWrapper";
import ComplianceCarouselWrapper from "@/components/ComplianceCarouselWrapper";
import GovernmentClientsWrapper from "@/components/GovernmentClientsWrapper";
import GovernmentHeroWrapper from "@/components/GovernmentHeroWrapper";
import GovernmentNAICSTableWrapper from "@/components/GovernmentNAICSTableWrapper";
import GovernmentTestimonialsCarouselWrapper from "@/components/GovernmentTestimonialsCarouselWrapper";
import Spinner from "@/components/Spinner";

import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";

export const metadata = {
  title: "Government Solutions - ISSI - International Software Systems International",
  description: "ISSI's specialized government software solutions and services for public sector organizations and agencies.",
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
  const messages = await import(`@/lang/${locale}.json`).then(module => module.default);
  return (    <div>      {/* Bento Grid Hero Section */}
      <GovernmentHeroWrapper locale={locale} messages={messages} />

      {/* NAICS Codes Table */}
      <GovernmentNAICSTableWrapper locale={locale} messages={messages} />{/* Government Client Testimonials - Government Clients */}
      <GovernmentClientsWrapper locale={locale} messages={messages} />      {/* Government Testimonials Carousel */}
      <GovernmentTestimonialsCarouselWrapper locale={locale} messages={messages} />

      {/* Track Record and Statistics */}
      <AboutStatsWrapper locale={locale} messages={messages} />

      {/* Industry Awards and Recognition */}
      <AboutAwardsWrapper locale={locale} messages={messages} />

      {/* Partner Network Testimonials */}
      <AboutPartnerNetworkWrapper locale={locale} messages={messages} />

      {/* Compliance and Certification Testimonials */}
      <ComplianceCarouselWrapper locale={locale} messages={messages} />
    </div>
  );
}