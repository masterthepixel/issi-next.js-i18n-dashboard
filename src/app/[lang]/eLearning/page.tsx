import { Metadata } from "next";
import { Suspense } from "react";

import ELearningAceternityFeaturesWrapper from "@/components/ELearningAceternityFeaturesWrapper";
import ELearningAceternityHeroWrapper from "@/components/ELearningAceternityHeroWrapper";
import ELearningClientsWrapper from "@/components/ELearningClientsWrapper";
import ELearningFAQWrapper from "@/components/ELearningFAQWrapper";
import ELearningServicesWrapper from "@/components/ELearningServicesWrapper";
import Spinner from "@/components/Spinner";

import { Locale } from "@/lib/definitions";

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://issi.com';

  const seoData = {
    en: {
      title: "eLearning Solutions | LMS Development & Training Services | ISSI",
      description: "ISSI delivers comprehensive eLearning solutions including LMS development, content creation, and training services for educational institutions and corporations. 30+ years experience.",
      keywords: "eLearning solutions, LMS development, learning management system, online training, educational technology, corporate training, content development, SCORM compliance, Section 508"
    },
    fr: {
      title: "Solutions eLearning | Développement LMS et Services de Formation | ISSI",
      description: "ISSI fournit des solutions eLearning complètes incluant le développement LMS, la création de contenu et les services de formation pour les institutions éducatives et les entreprises.",
      keywords: "solutions eLearning, développement LMS, système de gestion d'apprentissage, formation en ligne, technologie éducative, formation d'entreprise, développement de contenu"
    },
    es: {
      title: "Soluciones eLearning | Desarrollo LMS y Servicios de Capacitación | ISSI",
      description: "ISSI ofrece soluciones eLearning integrales incluyendo desarrollo LMS, creación de contenido y servicios de capacitación para instituciones educativas y corporaciones.",
      keywords: "soluciones eLearning, desarrollo LMS, sistema de gestión de aprendizaje, entrenamiento en línea, tecnología educativa, capacitación corporativa, desarrollo de contenido"
    }
  };

  const currentSeo = seoData[lang] || seoData.en;

  return {
    title: currentSeo.title,
    description: currentSeo.description,
    keywords: currentSeo.keywords,
    openGraph: {
      title: currentSeo.title,
      description: currentSeo.description,
      url: `${baseUrl}/${lang}/eLearning`,
      siteName: "ISSI - International Software Systems",
      images: [
        {
          url: `${baseUrl}/images/elearning-solutions-og.jpg`,
          width: 1200,
          height: 630,
          alt: currentSeo.title,
        }
      ],
      locale: lang === 'en' ? 'en_US' : lang === 'fr' ? 'fr_FR' : 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: currentSeo.title,
      description: currentSeo.description,
      images: [`${baseUrl}/images/elearning-solutions-og.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/eLearning`,
      languages: {
        'en': `${baseUrl}/en/eLearning`,
        'fr': `${baseUrl}/fr/eLearning`,
        'es': `${baseUrl}/es/eLearning`,
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
  const messages = (await import(`../../../lang/${locale}.json`)).default;

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
        "description": "Leading provider of eLearning solutions, LMS development, and educational technology services for institutions and corporations worldwide.",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "US"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-301-220-2180",
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
        "@id": `${baseUrl}/eLearning/#service`,
        "name": "eLearning Solutions",
        "provider": {
          "@id": `${baseUrl}/#organization`
        },
        "description": "Comprehensive eLearning and LMS development services including custom platforms, content creation, SCORM compliance, and training solutions.",
        "serviceType": ["LMS Development", "eLearning Content Creation", "Educational Technology", "Training Services"],
        "areaServed": "Worldwide",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "eLearning Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Learning Management System Development",
                "description": "Custom LMS platforms with SCORM compliance and accessibility features"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Course Development",
                "description": "Interactive multimedia course development with instructional design"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Cloud Hosting Solutions",
                "description": "Secure, scalable cloud infrastructure for eLearning platforms"
              }
            }
          ]
        }
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/${locale}/eLearning/#webpage`,
        "url": `${baseUrl}/${locale}/eLearning`,
        "name": messages['page.eLearning.title'] || "eLearning Solutions",
        "description": messages['page.eLearning.hero.subtitle'] || "Educational technology solutions for modern learning environments",
        "isPartOf": {
          "@id": `${baseUrl}/#website`
        },
        "about": {
          "@id": `${baseUrl}/eLearning/#service`
        },
        "inLanguage": locale === 'en' ? 'en-US' : locale === 'fr' ? 'fr-FR' : 'es-ES'
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/${locale}/eLearning/#breadcrumblist`,
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
            "name": messages['page.eLearning.title'] || "eLearning Solutions"
          }
        ]
      }
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Breadcrumbs are handled by the layout */}

      {/* Aceternity Hero section - Advanced animated hero */}
      <ELearningAceternityHeroWrapper locale={locale} messages={messages} />

      {/* Aceternity Features section - Modern animated features */}
      <ELearningAceternityFeaturesWrapper locale={locale} messages={messages} />

      {/* Services section */}
      <ELearningServicesWrapper locale={locale} messages={messages} />

      {/* Clients section */}
      <ELearningClientsWrapper locale={locale} messages={messages} />

      {/* FAQ section */}
      <ELearningFAQWrapper locale={locale} messages={messages} />
    </main>
  );
}