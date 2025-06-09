import { Metadata } from "next";
import { Suspense } from "react";

import ELearningClientsWrapper from "@/components/ELearningClientsWrapper";
import ELearningFeaturesWrapper from "@/components/ELearningFeaturesWrapper";
import ELearningHeroWrapper from "@/components/ELearningHeroWrapper";
import ELearningServicesWrapper from "@/components/ELearningServicesWrapper";
import Spinner from "@/components/Spinner";

import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";

// Breadcrumb Schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://issi-software.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "eLearning Solutions",
      "item": "https://issi-software.com/eLearning"
    }
  ]
};

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const messages = (await import(`../../../lang/${params.lang}.json`)).default;

  return {
    title: messages["page.eLearning.meta.title"] || "eLearning Solutions - ISSI - International Software Systems International",
    description: messages["page.eLearning.meta.description"] || "ISSI's educational technology solutions and eLearning platforms for training and educational institutions.",
    keywords: messages["page.eLearning.meta.keywords"] || "eLearning, educational technology, training platforms, ISSI, software development",
    openGraph: {
      title: messages["page.eLearning.meta.title"] || "eLearning Solutions - ISSI",
      description: messages["page.eLearning.meta.description"] || "Educational technology solutions and eLearning platforms for training and educational institutions.",
      type: "website",
      url: `https://issi-software.com/${params.lang}/eLearning`,
      images: [
        {
          url: "https://issi-software.com/images/issi_logo.png",
          width: 800,
          height: 600,
          alt: "ISSI - International Software Systems, Inc."
        }
      ],
      siteName: "International Software Systems, Inc."
    },
    twitter: {
      card: "summary_large_image",
      title: messages["page.eLearning.meta.title"] || "eLearning Solutions - ISSI",
      description: messages["page.eLearning.meta.description"] || "Educational technology solutions and eLearning platforms for training and educational institutions."
    },
    alternates: {
      canonical: `https://issi-software.com/${params.lang}/eLearning`,
      languages: {
        'en': 'https://issi-software.com/en/eLearning',
        'fr': 'https://issi-software.com/fr/eLearning',
        'es': 'https://issi-software.com/es/eLearning'
      }
    },
    other: {
      "structured-data": JSON.stringify([breadcrumbSchema])
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema], null, 0)
        }}
      />
      <PageContent locale={locale} />
    </Suspense>
  );
}

interface PageContentProps {
  locale: Locale;
}

async function PageContent({ locale }: PageContentProps) {  const intl = await getIntl(locale);
  const messages = (await import(`../../../lang/${locale}.json`)).default;
  return (    <main>
      {/* Hero section */}
      <ELearningHeroWrapper locale={locale} messages={messages} />
      
      {/* Features section */}
      <ELearningFeaturesWrapper locale={locale} messages={messages} />
      
      {/* Services section */}
      <ELearningServicesWrapper locale={locale} messages={messages} />
      
      {/* Clients section */}
      <ELearningClientsWrapper locale={locale} messages={messages} />
    </main>
  );
}