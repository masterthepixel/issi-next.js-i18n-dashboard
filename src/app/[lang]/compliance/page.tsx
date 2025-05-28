import React, { Suspense } from "react";

import Card from "@/components/Card";
import CardHeader from "@/components/CardHeader";
import CardBody from "@/components/CardBody";
import Spinner from "@/components/Spinner";

import { getIntl } from "@/lib/intl";
import { Locale } from "@/lib/definitions";

export const metadata = {
  title: "Compliance Solutions - ISSI - International Software Systems International",
  description: "ISSI's compliance software solutions and regulatory management tools for businesses and organizations.",
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
  );
}