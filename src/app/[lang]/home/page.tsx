import { Suspense } from "react";

import AboutAwardsWrapper from "@/components/AboutAwardsWrapper";
import AboutCertificationsWrapper from "@/components/AboutCertificationsWrapper";
import AboutPartnerNetworkWrapper from "@/components/AboutPartnerNetworkWrapper";
import Card from "@/components/Card";
import CardBody from "@/components/CardBody";
import CardHeader from "@/components/CardHeader";
import HeroWrapper from "@/components/HeroWrapper";
import ISSIServicesShowcaseWrapper from "@/components/ISSIServicesShowcaseWrapper";
import Spinner from "@/components/Spinner";

import { getActivities } from "@/lib/data";
import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";

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
  const activities = await getActivities();
  const messages = (await import(`../../../lang/${locale}.json`)).default;

  return (
    <>
      <HeroWrapper locale={locale} messages={messages} />
      
      {/* Partner Network - Client Logos */}
      <AboutPartnerNetworkWrapper locale={locale} messages={messages} />
      
      {/* Services Showcase - Bento Grid Layout */}
      <ISSIServicesShowcaseWrapper locale={locale} messages={messages} />
      
      {/* Certifications - Show technology expertise */}
      <AboutCertificationsWrapper locale={locale} messages={messages} />
      
      {/* Awards - Additional credibility and trust */}
      <AboutAwardsWrapper locale={locale} messages={messages} />
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mt-8">
        <div>
          <Card>
            <CardHeader>{intl.formatMessage({ id: "page.home.activities" })}</CardHeader>
            <CardBody>
              {activities.map((activity) => (
                <div key={activity.ts} className="mt-3">
                  <div>{intl.formatMessage({ id: "page.home.activity" }, { action: activity.action })}</div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-slate-700">
                      {activity.firstName} {activity.lastName}
                    </div>
                    <div className="text-sm text-slate-700">
                      {intl.formatDate(new Date(activity.ts), {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
