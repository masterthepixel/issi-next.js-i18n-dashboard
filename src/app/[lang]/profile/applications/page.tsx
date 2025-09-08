import { Suspense } from "react";
import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";
import ErrorBoundary from "@/components/ErrorBoundary";
import Spinner from "@/components/Spinner";
import ApplicationDashboardClient from "./ApplicationDashboardClient";

export const metadata = {
  title: "My Applications - ISSI Jobs",
  description: "Track and manage your job applications",
};

interface Props {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function ApplicationsPage({ params }: Props) {
  const { lang: locale } = await params;
  const intl = await getIntl(locale);

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2">
            {intl.formatMessage({ 
              id: "applications.dashboard.title", 
              defaultMessage: "My Applications" 
            })}
          </h1>
          <p className="text-muted-foreground text-lg">
            {intl.formatMessage({ 
              id: "applications.dashboard.description", 
              defaultMessage: "Track the status of your job applications and manage your career opportunities." 
            })}
          </p>
        </div>

        <Suspense fallback={<Spinner />}>
          <ApplicationDashboardClient locale={locale} />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}