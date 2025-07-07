import type { Metadata } from "next";
import { Suspense } from "react";

import AboutAwardsWrapper from "@/components/AboutAwardsWrapper";
import AboutPartnerNetworkWrapper from "@/components/AboutPartnerNetworkWrapper";
import AboutStatsWrapper from "@/components/AboutStatsWrapper";
import ComplianceCarouselWrapper from "@/components/ComplianceCarouselWrapper";
import GovernmentClientsWrapper from "@/components/GovernmentClientsWrapper";
import GovernmentFAQWrapper from "@/components/GovernmentFAQWrapper";
import GovernmentHeroWrapper from "@/components/GovernmentHeroWrapper";
import GovernmentNAICSTableWrapper from "@/components/GovernmentNAICSTableWrapper";
import GovernmentTestimonialsCarouselWrapper from "@/components/GovernmentTestimonialsCarouselWrapper";
import Spinner from "@/components/Spinner";

import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://issi.com';
  
  const seoData = {
    en: {
      title: "Government IT Services | Federal, State & Local Solutions | ISSI",
      description: "ISSI provides comprehensive IT services to government agencies. 30+ years experience serving federal, state, and local governments. NAICS certified. Contact us today.",
      keywords: "government IT services, federal IT contractor, state government IT, NAICS 541511, government software development, federal compliance, government consulting"
    },
    fr: {
      title: "Services Informatiques Gouvernementaux | Solutions Fédérales, d'État et Locales | ISSI",
      description: "ISSI fournit des services informatiques complets aux agences gouvernementales. 30+ années d'expérience au service des gouvernements fédéraux, d'État et locaux. Certifié NAICS.",
      keywords: "services informatiques gouvernementaux, contractant informatique fédéral, informatique gouvernement d'état, NAICS 541511, développement logiciel gouvernemental, conformité fédérale"
    },
    es: {
      title: "Servicios de TI Gubernamentales | Soluciones Federales, Estatales y Locales | ISSI",
      description: "ISSI proporciona servicios de TI integrales a agencias gubernamentales. 30+ años de experiencia sirviendo gobiernos federales, estatales y locales. Certificado NAICS.",
      keywords: "servicios TI gubernamentales, contratista TI federal, TI gobierno estatal, NAICS 541511, desarrollo software gubernamental, cumplimiento federal"
    }
  };

  const currentSeo = seoData[params.lang] || seoData.en;

  return {
    title: currentSeo.title,
    description: currentSeo.description,
    keywords: currentSeo.keywords,
    openGraph: {
      title: currentSeo.title,
      description: currentSeo.description,
      url: `${baseUrl}/${params.lang}/government`,
      siteName: "ISSI - International Software Systems",
      images: [
        {
          url: `${baseUrl}/images/government-solutions-og.jpg`,
          width: 1200,
          height: 630,
          alt: currentSeo.title,
        }
      ],
      locale: params.lang === 'en' ? 'en_US' : params.lang === 'fr' ? 'fr_FR' : 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: currentSeo.title,
      description: currentSeo.description,
      images: [`${baseUrl}/images/government-solutions-og.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/${params.lang}/government`,
      languages: {
        'en': `${baseUrl}/en/government`,
        'fr': `${baseUrl}/fr/government`,
        'es': `${baseUrl}/es/government`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

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
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://issi.com';
  
  // JSON-LD Structured Data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "ISSI - International Software Systems",
        "url": baseUrl,
        "logo": `${baseUrl}/images/issi_logo.png`,
        "description": "Leading provider of government IT services, software development, and digital transformation solutions for federal, state, and local agencies.",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "US"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-800-XXX-XXXX",
          "contactType": "sales",
          "availableLanguage": ["English", "French", "Spanish"]
        },
        "sameAs": [
          "https://www.linkedin.com/company/issi",
          "https://twitter.com/issi"
        ]
      },
      {
        "@type": "Service",
        "@id": `${baseUrl}/government/#service`,
        "name": "Government IT Services",
        "provider": {
          "@id": `${baseUrl}/#organization`
        },
        "description": "Comprehensive IT services for government agencies including software development, digital transformation, compliance, and consulting.",
        "serviceType": "Information Technology Services",
        "areaServed": {
          "@type": "Country",
          "name": "United States"
        },
        "audience": {
          "@type": "Audience",
          "audienceType": "Government Agencies"
        }
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/${locale}/government/#webpage`,
        "url": `${baseUrl}/${locale}/government`,
        "name": messages.government?.hero?.title || "Government IT Services",
        "description": messages.government?.hero?.subtitle || "Comprehensive IT solutions for government agencies",
        "isPartOf": {
          "@id": `${baseUrl}/#website`
        },
        "about": {
          "@id": `${baseUrl}/government/#service`
        },
        "inLanguage": locale === 'en' ? 'en-US' : locale === 'fr' ? 'fr-FR' : 'es-ES'
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/${locale}/government/#breadcrumblist`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `${baseUrl}/${locale}`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": messages.government?.hero?.title || "Government Services"
          }
        ]
      }
    ]
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Breadcrumbs are handled by the layout */}
      
      {/* Bento Grid Hero Section */}
      <GovernmentHeroWrapper locale={locale} messages={messages} />

      {/* NAICS Codes Table */}
      <GovernmentNAICSTableWrapper locale={locale} messages={messages} />

      {/* Government Client Testimonials - Government Clients */}
      <GovernmentClientsWrapper locale={locale} messages={messages} />      {/* Government Testimonials Carousel */}
      <GovernmentTestimonialsCarouselWrapper locale={locale} messages={messages} />

      {/* Government FAQ */}
      <GovernmentFAQWrapper locale={locale} messages={messages} />

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