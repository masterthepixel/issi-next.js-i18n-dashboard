import { Metadata } from "next";
import { Suspense } from "react";

import AboutAwardsWrapper from "@/components/AboutAwardsWrapper";
import AboutPartnerNetworkWrapper from "@/components/AboutPartnerNetworkWrapper";
import ComplianceCertificationsWrapper from "@/components/ComplianceCertificationsWrapper";
import ComplianceIndustryCertificationsWrapper from "@/components/ComplianceIndustryCertificationsWrapper";
import ComplianceStatsWrapper from "@/components/ComplianceStatsWrapper";
import Spinner from "@/components/Spinner";

import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const messages = (await import(`../../../lang/${params.lang}.json`)).default;

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
      url: `https://issi-software.com/${params.lang}/compliance`,
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
      canonical: `https://issi-software.com/${params.lang}/compliance`,
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