import { Suspense } from "react";

import Card from "@/components/Card";
import CardBody from "@/components/CardBody";
import CardHeader from "@/components/CardHeader";
import Spinner from "@/components/Spinner";

import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";

export const metadata = {
  title: "Support - ISSI - International Software Systems International",
  description: "Get technical support and assistance from ISSI. Access documentation, resources, and contact our support team.",
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

  return (
    <div>
      {/* Negative top margin to eliminate gap between navbar and content */}
      <div className="-mt-20 grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <Card>
          <CardHeader>{intl.formatMessage({ id: "page.support.title" })}</CardHeader>
          <CardBody>
            <p className="text-base text-slate-700 dark:text-slate-300">
              {intl.formatMessage({ id: "page.support.description" })}
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}