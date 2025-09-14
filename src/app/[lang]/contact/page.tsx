import ContactFormWrapper from "@/components/ContactFormWrapper";
import Spinner from "@/components/Spinner";
import { Locale } from "@/lib/definitions";
import { Suspense } from "react";

export const metadata = {
  title: "Contact ISSI - International Software Systems Inc.",
  description: "Contact ISSI for software development, IT support, and government solutions. Find our offices in Maryland, Florida, Dallas, Hyderabad, and Visakhapatnam. Get support, sales, and career information.",
  keywords: "contact ISSI, software development contact, IT support, government solutions, office locations, Maryland headquarters, Florida office, Dallas office, Hyderabad office, Visakhapatnam office",
  robots: "index, follow",
  openGraph: {
    title: "Contact ISSI - International Software Systems Inc.",
    description: "Get in touch with ISSI for your software development and IT needs. Multiple office locations across the US and India.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact ISSI",
    description: "Contact ISSI for software development and IT solutions.",
  },
};

interface Props {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function Page({ params }: Props) {
  const { lang: locale } = await params;
  return (
    <Suspense fallback={<Spinner />}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "International Software Systems, Inc.",
            "alternateName": "ISSI",
            "url": "https://www.issi-software.com",
            "logo": "https://www.issi-software.com/external/img/Internationallogo.png",
            "description": "Award-winning software development and IT support services company, CMMI Level 3 appraised, ISO 9001:2015, and ISO 27001 certified.",
            "address": [
              {
                "@type": "PostalAddress",
                "streetAddress": "7337 Hanover Pkwy, Suite# A",
                "addressLocality": "Greenbelt",
                "addressRegion": "MD",
                "postalCode": "20770",
                "addressCountry": "US"
              },
              {
                "@type": "PostalAddress",
                "streetAddress": "1301 Riverplace Blvd., Suite# 800",
                "addressLocality": "Jacksonville",
                "addressRegion": "FL",
                "postalCode": "32207",
                "addressCountry": "US"
              },
              {
                "@type": "PostalAddress",
                "streetAddress": "6565 N MacArthur Blvd Suite 225",
                "addressLocality": "Irving",
                "addressRegion": "TX",
                "postalCode": "75039",
                "addressCountry": "US"
              },
              {
                "@type": "PostalAddress",
                "streetAddress": "3-6-663/203, L.K.R. Arcade, Street #9 Himayathnagar",
                "addressLocality": "Hyderabad",
                "addressRegion": "Telangana",
                "postalCode": "500 029",
                "addressCountry": "IN"
              },
              {
                "@type": "PostalAddress",
                "streetAddress": "SriRama Nilayam, Door No.5-175/1A, Opposite to Sanskriti School, Endada",
                "addressLocality": "Visakhapatnam",
                "addressRegion": "Andhra Pradesh",
                "postalCode": "530 045",
                "addressCountry": "IN"
              }
            ],
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+1-301-982-9700",
                "contactType": "customer service",
                "areaServed": "US",
                "availableLanguage": "English"
              },
              {
                "@type": "ContactPoint",
                "telephone": "+1-888-810-3661",
                "contactType": "toll free",
                "areaServed": "US",
                "availableLanguage": "English"
              },
              {
                "@type": "ContactPoint",
                "email": "info@issi-software.com",
                "contactType": "general inquiry",
                "areaServed": "Worldwide",
                "availableLanguage": "English"
              },
              {
                "@type": "ContactPoint",
                "email": "support@issi-software.com",
                "contactType": "technical support",
                "areaServed": "Worldwide",
                "availableLanguage": "English"
              },
              {
                "@type": "ContactPoint",
                "email": "sales@issi-software.com",
                "contactType": "sales",
                "areaServed": "Worldwide",
                "availableLanguage": "English"
              },
              {
                "@type": "ContactPoint",
                "email": "careers@issi-software.com",
                "contactType": "recruiting",
                "areaServed": "Worldwide",
                "availableLanguage": "English"
              }
            ],
            "sameAs": [
              "https://www.facebook.com/issiusa",
              "https://www.youtube.com/channel/UC-I7GRxuzcLOZLcGVHV96bQ",
              "https://www.linkedin.com/company/international-software-systems-inc."
            ]
          })
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
  return <ContactFormWrapper locale={locale} />;
}