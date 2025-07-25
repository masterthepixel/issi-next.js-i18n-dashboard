import { Suspense } from "react";

import AboutAwardsWrapper from "@/components/AboutAwardsWrapper";
import AboutCertificationsWrapper from "@/components/AboutCertificationsWrapper";
import AboutHeroWrapper from "@/components/AboutHeroWrapper";
import AboutPartnerNetworkWrapper from "@/components/AboutPartnerNetworkWrapper";
import AboutStatsWrapper from "@/components/AboutStatsWrapper";
import Spinner from "@/components/Spinner";
import TeamGridWrapper from "@/components/TeamGridWrapper";

import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";
import { Metadata } from "next";

// Organization Schema for SEO
const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "International Software Systems, Inc.",
    "alternateName": "ISSI",
    "url": "https://issi-software.com",
    "logo": "https://issi-software.com/images/issi_logo.png",
    "foundingDate": "1995",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "7337 Hanover Pkwy, Suite A",
        "addressLocality": "Greenbelt",
        "addressRegion": "MD",
        "postalCode": "20770",
        "addressCountry": "US"
    },
    "telephone": "+1-301-982-9700",
    "faxNumber": "+1-301-982-0500",
    "numberOfEmployees": "130+",
    "foundingLocation": {
        "@type": "Place",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Greenbelt",
            "addressRegion": "MD",
            "addressCountry": "US"
        }
    }
};

// Local Business Schema
const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "International Software Systems, Inc.",
    "telephone": "+1-301-982-9700",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "7337 Hanover Pkwy, Suite A",
        "addressLocality": "Greenbelt",
        "addressRegion": "MD",
        "postalCode": "20770",
        "addressCountry": "US"
    },
    "foundingDate": "1995"
};

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
            "name": "About Us",
            "item": "https://issi-software.com/about"
        }
    ]
};

export async function generateMetadata({ params }: { params: { lang: Locale } }): Promise<Metadata> {
    const _intl = await getIntl(params.lang);
    const messages = (await import(`../../../lang/${params.lang}.json`)).default;

    return {
        title: messages["about.meta.title"] || "About Us - ISSI | Award-Winning Software Development Since 1995",
        description: messages["about.meta.description"] || "Learn about International Software Systems, Inc. (ISSI) - 30+ years of award-winning software development and IT support services in Greenbelt, MD since 1995.",
        keywords: messages["about.meta.keywords"] || "ISSI, software development, IT support, ISO certified, CMMI Level 3, Maryland, Greenbelt, government contractor",
        openGraph: {
            title: messages["about.meta.title"] || "About Us - ISSI | Award-Winning Software Development",
            description: messages["about.meta.description"] || "30+ years of award-winning software development and IT support services since 1995",
            type: "website",
            url: `https://issi-software.com/${params.lang}/about`,
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
            title: messages["about.meta.title"] || "About Us - ISSI | Award-Winning Software Development",
            description: messages["about.meta.description"] || "30+ years of award-winning software development and IT support services since 1995"
        },
        alternates: {
            canonical: `https://issi-software.com/${params.lang}/about`,
            languages: {
                'en': 'https://issi-software.com/en/about',
                'fr': 'https://issi-software.com/fr/about',
                'es': 'https://issi-software.com/es/about'
            }
        },
        other: {
            "structured-data": JSON.stringify([organizationSchema, localBusinessSchema, breadcrumbSchema])
        }
    };
}

interface Props {
    params: {
        lang: Locale;
    };
}

export default function Page({ params: { lang: locale } }: Props) {
    const structuredData = [organizationSchema, localBusinessSchema, breadcrumbSchema];

    return (
        <Suspense fallback={<Spinner />}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData, null, 0)
                }}
            />
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
        <main>
            {/* Hero section */}
            <AboutHeroWrapper locale={locale} messages={messages} />

            {/* Team section */}
            <TeamGridWrapper locale={locale} messages={messages} />

            {/* Stats section */}
            <AboutStatsWrapper locale={locale} messages={messages} />

            {/* Certifications section */}
            <AboutCertificationsWrapper locale={locale} messages={messages} />

            {/* Awards section */}
            <AboutAwardsWrapper locale={locale} messages={messages} />

            {/* Partner Network section */}
            <AboutPartnerNetworkWrapper locale={locale} messages={messages} />
        </main>
    );
}