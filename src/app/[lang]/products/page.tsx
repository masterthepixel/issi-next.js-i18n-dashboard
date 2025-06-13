import { Metadata } from "next";
import { Suspense } from "react";

import ProductsBentoGridWrapper from "@/components/ProductsBentoGridWrapper";
import Spinner from "@/components/Spinner";

import { Locale } from "@/lib/definitions";

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://issi.com';
  
  const seoData = {
    en: {
      title: "Products & Software Solutions | Enterprise IT Services | ISSI",
      description: "Explore ISSI's comprehensive suite of 40+ enterprise software products including grant management, HR solutions, project management, and government IT systems. 30+ years experience.",
      keywords: "enterprise software, government IT solutions, grant management system, HR software, project management, compliance software, data management, IT modernization"
    },
    fr: {
      title: "Produits et Solutions Logicielles | Services IT d'Entreprise | ISSI",
      description: "Découvrez la suite complète de 40+ produits logiciels d'entreprise d'ISSI incluant gestion de subventions, solutions RH, gestion de projets et systèmes IT gouvernementaux.",
      keywords: "logiciels d'entreprise, solutions IT gouvernementales, système de gestion de subventions, logiciels RH, gestion de projets, logiciels de conformité"
    },
    es: {
      title: "Productos y Soluciones de Software | Servicios IT Empresariales | ISSI",
      description: "Explore la suite completa de 40+ productos de software empresarial de ISSI incluyendo gestión de subvenciones, soluciones de RRHH, gestión de proyectos y sistemas IT gubernamentales.",
      keywords: "software empresarial, soluciones IT gubernamentales, sistema de gestión de subvenciones, software de RRHH, gestión de proyectos, software de cumplimiento"
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
      url: `${baseUrl}/${params.lang}/products`,
      siteName: "ISSI - International Software Systems",
      images: [
        {
          url: `${baseUrl}/images/products-og.jpg`,
          width: 1200,
          height: 630,
          alt: currentSeo.title,
        },
      ],
      locale: params.lang,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: currentSeo.title,
      description: currentSeo.description,
      images: [`${baseUrl}/images/products-og.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/${params.lang}/products`,
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
  const messages = (await import(`../../../lang/${locale}.json`)).default;
  
  return (
    <div>
      {/* Products Bento Grid */}
      <ProductsBentoGridWrapper locale={locale} messages={messages} />
    </div>
  );
}