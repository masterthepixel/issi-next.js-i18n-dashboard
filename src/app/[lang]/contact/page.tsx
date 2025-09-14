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
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:items-start mt-16">
          <div className="lg:col-span-2">
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

          <aside className="space-y-6">
            <section className="p-6 rounded-lg bg-card">
              <h3 className="text-lg font-semibold mb-3">Our Locations</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h4 className="font-medium">Maryland Headquarters</h4>
                  <p>7337 Hanover Pkwy, Suite# A, Greenbelt, MD 20770</p>
                  <p>Business & Products: 301-982-9700</p>
                  <p>Fax: 301-982-0500</p>
                  <p>Toll Free: 1-888-810-3661</p>
                  <p>Email: info@issi-software.com</p>
                </div>
                <div>
                  <h4 className="font-medium">Florida Office</h4>
                  <p>See site for details</p>
                </div>
                <div>
                  <h4 className="font-medium">Dallas Office</h4>
                  <p>See site for details</p>
                </div>
                <div>
                  <h4 className="font-medium">Hyderabad Office</h4>
                  <p>See site for details</p>
                </div>
                <div>
                  <h4 className="font-medium">Visakhapatnam Office</h4>
                  <p>See site for details</p>
                </div>
              </div>
            </section>

            <section className="p-6 rounded-lg bg-card">
              <h3 className="text-lg font-semibold mb-3">Map</h3>
              <div className="aspect-[4/3] bg-muted" />
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}