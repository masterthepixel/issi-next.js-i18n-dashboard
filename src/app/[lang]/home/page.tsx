import { Suspense, lazy } from "react";

import Spinner from "@/components/Spinner";

import { Locale } from "@/lib/definitions";

// Dynamic imports for heavy components to reduce initial bundle size
const AboutAwardsWrapper = lazy(() => import("@/components/AboutAwardsWrapper"));
const AboutCertificationsWrapper = lazy(() => import("@/components/AboutCertificationsWrapper"));
const AboutPartnerNetworkWrapper = lazy(() => import("@/components/AboutPartnerNetworkWrapper"));
const GovernmentClientsWrapper = lazy(() => import("@/components/GovernmentClientsWrapper"));
const GovernmentTestimonialsCarouselWrapper = lazy(() => import("@/components/GovernmentTestimonialsCarouselWrapper"));
const HeroWrapper = lazy(() => import("@/components/HeroWrapper"));
const ISSIAppleCardsCarouselWrapper = lazy(() => import("@/components/ISSIAppleCardsCarouselWrapper"));
const ISSIServicesShowcaseWrapper = lazy(() => import("@/components/ISSIServicesShowcaseWrapper"));

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
      {/* Hero Section - Above the fold, load immediately */}
      <Suspense fallback={<div className="h-screen flex items-center justify-center"><Spinner /></div>}>
        <HeroWrapper locale={locale} messages={messages} />
      </Suspense>

      {/* Apple Cards Carousel - Service Overview */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center"><Spinner /></div>}>
        <ISSIAppleCardsCarouselWrapper locale={locale} messages={messages} />
      </Suspense>

      {/* Partner Network - Client Logos */}
      <Suspense fallback={<div className="h-32 flex items-center justify-center"><Spinner /></div>}>
        <AboutPartnerNetworkWrapper locale={locale} messages={messages} />
      </Suspense>

      {/* Services Showcase - Bento Grid Layout */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center"><Spinner /></div>}>
        <ISSIServicesShowcaseWrapper locale={locale} messages={messages} />
      </Suspense>

      {/* Government Clients & Partners - Show credibility */}
      <Suspense fallback={<div className="h-32 flex items-center justify-center"><Spinner /></div>}>
        <GovernmentClientsWrapper locale={locale} messages={messages} />
      </Suspense>

      {/* Certifications - Show technology expertise */}
      <Suspense fallback={<div className="h-32 flex items-center justify-center"><Spinner /></div>}>
        <AboutCertificationsWrapper locale={locale} messages={messages} />
      </Suspense>

      {/* Government Testimonials - Reinforce trust */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center"><Spinner /></div>}>
        <GovernmentTestimonialsCarouselWrapper locale={locale} messages={messages} />
      </Suspense>

      {/* Awards - Additional credibility and trust */}
      <Suspense fallback={<div className="h-32 flex items-center justify-center"><Spinner /></div>}>
        <AboutAwardsWrapper locale={locale} messages={messages} />
      </Suspense>
    </>
  );
}
