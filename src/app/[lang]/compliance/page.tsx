import { Metadata } from "next";
import { Suspense, lazy } from "react";

import Spinner from "@/components/Spinner";

import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";

// Dynamic imports for heavy components to reduce initial bundle size
const AboutAwardsWrapper = lazy(() => import("@/components/AboutAwardsWrapper"));
const AboutPartnerNetworkWrapper = lazy(() => import("@/components/AboutPartnerNetworkWrapper"));
const ComplianceCertificationsWrapper = lazy(() => import("@/components/ComplianceCertificationsWrapper"));
const ComplianceIndustryCertificationsWrapper = lazy(() => import("@/components/ComplianceIndustryCertificationsWrapper"));
const ComplianceStatsWrapper = lazy(() => import("@/components/ComplianceStatsWrapper"));

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const messages = (await import(`../../../lang/${lang}.json`)).default;

  return {
    title: messages["page.compliance.meta.title"] || "Compliance & Certifications | ISO 27001, SOC 2, GDPR - ISSI",
    description: messages["page.compliance.meta.description"] || "ISSI's comprehensive compliance framework includes ISO 27001, ISO 9001, SOC 2 Type II, and GDPR certifications. Trusted compliance solutions for enterprise security.",
    keywords: [
      "ISO 27001 certification",
      "SOC 2 compliance",
      "GDPR compliance",
      "ISO 9001 quality management",
      "compliance software solutions",
      "regulatory compliance tools",
      "enterprise security compliance",
      "ISSI certifications"
    ].join(", "),
    openGraph: {
      title: messages["page.compliance.meta.title"] || "Compliance & Certifications - ISSI",
      description: messages["page.compliance.meta.description"] || "ISSI's comprehensive compliance framework includes ISO 27001, ISO 9001, SOC 2 Type II, and GDPR certifications.",
      type: "website",
      url: `https://issi-software.com/${lang}/compliance`,
      images: [
        {
          url: "https://issi-software.com/images/compliance/compliance-og-image.jpg",
          width: 1200,
          height: 630,
          alt: "ISSI Compliance Certifications - ISO 27001, SOC 2, GDPR"
        }
      ],
      siteName: "International Software Systems, Inc."
    },
    twitter: {
      card: "summary_large_image",
      title: messages["page.compliance.meta.title"] || "Compliance & Certifications - ISSI",
      description: messages["page.compliance.meta.description"] || "ISSI's comprehensive compliance framework includes ISO 27001, ISO 9001, SOC 2 Type II, and GDPR certifications.",
      images: ["https://issi-software.com/images/compliance/compliance-og-image.jpg"]
    },
    alternates: {
      canonical: `https://issi-software.com/${lang}/compliance`,
      languages: {
        'en': 'https://issi-software.com/en/compliance',
        'fr': 'https://issi-software.com/fr/compliance',
        'es': 'https://issi-software.com/es/compliance'
      }
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
      }
    }
  };
}

interface Props {
  params: Promise<{
    lang: Locale;
  }>;
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
  const intl = await getIntl(locale);
  const messages = (await import(`../../../lang/${locale}.json`)).default;

  // Structured data for compliance certifications
  const complianceSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "International Software Systems, Inc.",
    "url": "https://issi-software.com",
    "hasCredential": [
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "certification",
        "name": "ISO/IEC 27001:2022 Information Security Management",
        "recognizedBy": {
          "@type": "Organization",
          "name": "International Organization for Standardization"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "certification",
        "name": "SOC 2 Type II",
        "recognizedBy": {
          "@type": "Organization",
          "name": "American Institute of CPAs"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "certification",
        "name": "ISO 9001:2015 Quality Management System",
        "recognizedBy": {
          "@type": "Organization",
          "name": "International Organization for Standardization"
        }
      },
      {
        "@type": "EducationalOccupationalCredential",
        "credentialCategory": "compliance",
        "name": "GDPR Compliance",
        "recognizedBy": {
          "@type": "Organization",
          "name": "European Union"
        }
      }
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(complianceSchema) }}
      />

      {/* ComplianceCertifications component - modern bento grid layout */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center"><Spinner /></div>}>
        <ComplianceCertificationsWrapper
          locale={locale}
          messages={intl.messages}
        />
      </Suspense>

      {/* Stats section */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center"><Spinner /></div>}>
        <ComplianceStatsWrapper locale={locale} messages={messages} />
      </Suspense>

      {/* Partner Network / Logo Clouds section */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center"><Spinner /></div>}>
        <AboutPartnerNetworkWrapper locale={locale} messages={messages} />
      </Suspense>

      {/* Industry Certifications section */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center"><Spinner /></div>}>
        <ComplianceIndustryCertificationsWrapper locale={locale} messages={messages} />
      </Suspense>

      {/* Awards section - last section before footer */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center"><Spinner /></div>}>
        <AboutAwardsWrapper locale={locale} messages={messages} />
      </Suspense>
    </main>
  );
}