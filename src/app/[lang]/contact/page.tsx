import ContactFormWrapper from "@/components/ContactFormWrapper";
import ErrorBoundary from "@/components/ErrorBoundary";
import Spinner from "@/components/Spinner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";
import { Suspense } from "react";

export const metadata = {
  title: "Contact - ISSI - International Software Systems International",
  description: "Get in touch with ISSI for your software development needs. Contact information, office locations, and support resources.",
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
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-foreground sm:text-4xl">
            {intl.formatMessage({ id: "page.contact.title" })}
          </h2>
          <p className="mt-2  " text-lead1411>
            {intl.formatMessage({ id: "page.contact.description" })}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-xl sm:mt-20">
          <Card>
            <CardHeader>
              <CardTitle>{intl.formatMessage({ id: "contact.form.title" })}</CardTitle>
              <CardDescription>
                {intl.formatMessage({ id: "contact.form.description" })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ErrorBoundary>
                <ContactFormWrapper locale={locale} />
              </ErrorBoundary>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}