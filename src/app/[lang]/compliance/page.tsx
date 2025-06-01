import { Suspense } from "react";

import Card from "@/components/Card";
import CardBody from "@/components/CardBody";
import CardHeader from "@/components/CardHeader";
import ComplianceCarouselWrapper from "@/components/ComplianceCarouselWrapper";
import ComplianceStatsWrapper from "@/components/ComplianceStatsWrapper";
import Spinner from "@/components/Spinner";

import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";

export const metadata = {
  title: "Compliance Solutions - ISSI | Regulatory Compliance & Risk Management",
  description:
    "Comprehensive regulatory compliance solutions and risk management tools for businesses and organizations. Ensure adherence to industry standards and regulations.",
};

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

  return (
    <div>
      {/* Compliance Carousel Section */}
      {/* Negative top margin to eliminate gap between navbar and content */}
      <div className="-mt-20 mx-auto max-w-7xl px-6 py-12 sm:py-20 lg:px-8">
        <ComplianceCarouselWrapper locale={locale} messages={messages} />
      </div>

      {/* Hero Section */}
      {/* <ComplianceHeroWrapper locale={locale} messages={messages} /> */}

      {/* Stats Section */}
      <ComplianceStatsWrapper locale={locale} messages={messages} />

      {/* Existing Content */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <Card>
            <CardHeader>{intl.formatMessage({ id: "page.compliance.title" })}</CardHeader>
            <CardBody>
              <p className="text-base text-slate-700 dark:text-slate-300">
                {intl.formatMessage({ id: "page.compliance.description" })}
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
