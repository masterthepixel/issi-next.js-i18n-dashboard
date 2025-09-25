import { Metadata } from "next";
import { Suspense, lazy } from "react";

import Spinner from "@/components/Spinner";

import { Locale } from "@/lib/definitions";

// Dynamic imports for heavy components to reduce initial bundle size
const ProductsBentoGridWrapper = lazy(() => import("@/components/ProductsBentoGridWrapper"));

export async function generateMetadata({ params }: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://issi.com';

  // Import messages for dynamic metadata
  const messages = (await import(`../../../lang/${lang}.json`)).default;

  const seoData = {
    en: {
      title: messages['page.products.meta.title'] || "Products & Software Solutions | Enterprise IT Services | ISSI",
      description: messages['page.products.meta.description'] || "Explore ISSI's comprehensive suite of 40+ enterprise software products including grant management, HR solutions, project management, and government IT systems. 30+ years experience.",
      keywords: messages['page.products.meta.keywords'] || "enterprise software, government IT solutions, grant management system, HR software, project management, compliance software, data management, IT modernization"
    },
    fr: {
      title: messages['page.products.meta.title'] || "Produits et Solutions Logicielles | Services IT d'Entreprise | ISSI",
      description: messages['page.products.meta.description'] || "Découvrez la suite complète de 40+ produits logiciels d'entreprise d'ISSI incluant gestion de subventions, solutions RH, gestion de projets et systèmes IT gouvernementaux.",
      keywords: messages['page.products.meta.keywords'] || "logiciels d'entreprise, solutions IT gouvernementales, système de gestion de subventions, logiciels RH, gestion de projets, logiciels de conformité"
    },
    es: {
      title: messages['page.products.meta.title'] || "Productos y Soluciones de Software | Servicios IT Empresariales | ISSI",
      description: messages['page.products.meta.description'] || "Explore la suite completa de 40+ productos de software empresarial de ISSI incluyendo gestión de subvenciones, soluciones de RRHH, gestión de proyectos y sistemas IT gubernamentales.",
      keywords: messages['page.products.meta.keywords'] || "software empresarial, soluciones IT gubernamentales, sistema de gestión de subvenciones, software de RRHH, gestión de proyectos, software de cumplimiento"
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
      url: `${baseUrl}/${lang}/products`,
      siteName: "ISSI - International Software Systems",
      images: [
        {
          url: `${baseUrl}/images/issi_logo.webp`,
          width: 1200,
          height: 630,
          alt: currentSeo.title,
        },
      ],
      locale: lang,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: currentSeo.title,
      description: currentSeo.description,
      images: [`${baseUrl}/images/issi_logo.webp`],
    },
    alternates: {
      canonical: `${baseUrl}/${lang}/products`,
      languages: {
        'en': `${baseUrl}/en/products`,
        'fr': `${baseUrl}/fr/products`,
        'es': `${baseUrl}/es/products`,
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

  // Structured data for products/services catalog
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/${locale}/products#webpage`,
        "url": `${baseUrl}/${locale}/products`,
        "name": locale === 'en' ? "Products & Software Solutions | Enterprise IT Services | ISSI" :
          locale === 'fr' ? "Produits et Solutions Logicielles | Services IT d'Entreprise | ISSI" :
            "Productos y Soluciones de Software | Servicios IT Empresariales | ISSI",
        "description": locale === 'en' ? "Explore ISSI's comprehensive suite of 40+ enterprise software products including grant management, HR solutions, project management, and government IT systems. 30+ years experience." :
          locale === 'fr' ? "Découvrez la suite complète de 40+ produits logiciels d'entreprise d'ISSI incluant gestion de subventions, solutions RH, gestion de projets et systèmes IT gouvernementaux." :
            "Explore la suite completa de 40+ productos de software empresarial de ISSI incluyendo gestión de subvenciones, soluciones de RRHH, gestión de proyectos y sistemas IT gubernamentales.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${baseUrl}#website`
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
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
              "name": locale === 'en' ? "Products" : locale === 'fr' ? "Produits" : "Productos",
              "item": `${baseUrl}/${locale}/products`
            }
          ]
        }
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}#organization`,
        "name": "International Software Systems, Inc. (ISSI)",
        "url": baseUrl,
        "logo": `${baseUrl}/images/issi_logo.webp`,
        "description": "Award-winning software development and IT support services company delivering high-quality, cost-effective solutions for government and enterprise clients since 1995.",
        "foundingDate": "1995",
        "sameAs": [
          "https://www.linkedin.com/company/international-software-systems-inc",
          "https://www.facebook.com/ISSITech",
          "https://www.youtube.com/channel/UCExample"
        ]
      },
      {
        "@type": "ItemList",
        "@id": `${baseUrl}/${locale}/products#servicelist`,
        "name": locale === 'en' ? "ISSI Software Products & Solutions" :
          locale === 'fr' ? "Produits et Solutions Logicielles ISSI" :
            "Productos y Soluciones de Software ISSI",
        "description": locale === 'en' ? "Comprehensive enterprise software solutions for government and business" :
          locale === 'fr' ? "Solutions logicielles d'entreprise complètes pour le gouvernement et les entreprises" :
            "Soluciones de software empresarial integrales para gobierno y empresas",
        "itemListElement": [
          {
            "@type": "Service",
            "position": 1,
            "name": "Grant Management System",
            "description": "Comprehensive solution to standardize, streamline, and automate the complete grant lifecycle from application to post-award activities.",
            "provider": {
              "@id": `${baseUrl}#organization`
            },
            "serviceType": "Software",
            "category": "Government Software"
          },
          {
            "@type": "Service",
            "position": 2,
            "name": "Enterprise Complaint Tracking System",
            "description": "User-friendly platform for processing consumer complaints securely and efficiently with automated workflows.",
            "provider": {
              "@id": `${baseUrl}#organization`
            },
            "serviceType": "Software",
            "category": "Enterprise Software"
          },
          {
            "@type": "Service",
            "position": 3,
            "name": "ePermitting System",
            "description": "Streamline environmental tracking, permit issuance, and compliance with federal regulations.",
            "provider": {
              "@id": `${baseUrl}#organization`
            },
            "serviceType": "Software",
            "category": "Compliance Software"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/${locale}/products#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": locale === 'en' ? "How many software products does ISSI offer?" :
              locale === 'fr' ? "Combien de produits logiciels ISSI offre-t-il?" :
                "¿Cuántos productos de software ofrece ISSI?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": locale === 'en' ? "ISSI offers over 40 enterprise software products spanning grant management, HR solutions, project management, compliance software, and government IT systems." :
                locale === 'fr' ? "ISSI offre plus de 40 produits logiciels d'entreprise couvrant la gestion de subventions, les solutions RH, la gestion de projets, les logiciels de conformité et les systèmes IT gouvernementaux." :
                  "ISSI ofrece más de 40 productos de software empresarial que abarcan gestión de subvenciones, soluciones de RRHH, gestión de proyectos, software de cumplimiento y sistemas IT gubernamentales."
            }
          },
          {
            "@type": "Question",
            "name": locale === 'en' ? "Are ISSI's products suitable for government agencies?" :
              locale === 'fr' ? "Les produits d'ISSI conviennent-ils aux agences gouvernementales?" :
                "¿Son los productos de ISSI adecuados para agencias gubernamentales?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": locale === 'en' ? "Yes, ISSI specializes in government and enterprise solutions with 30+ years of experience serving federal, state, and local government agencies with compliant, secure software systems." :
                locale === 'fr' ? "Oui, ISSI se spécialise dans les solutions gouvernementales et d'entreprise avec plus de 30 ans d'expérience au service des agences gouvernementales fédérales, étatiques et locales avec des systèmes logiciels conformes et sécurisés." :
                  "Sí, ISSI se especializa en soluciones gubernamentales y empresariales con más de 30 años de experiencia sirviendo a agencias gubernamentales federales, estatales y locales con sistemas de software conformes y seguros."
            }
          }
        ]
      }
    ]
  };

  return (
    <div>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Products Bento Grid */}
      <Suspense fallback={<Spinner />}>
        <ProductsBentoGridWrapper locale={locale} messages={messages} />
      </Suspense>
    </div>
  );
}