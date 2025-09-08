import { Suspense } from "react";
import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";
import ErrorBoundary from "@/components/ErrorBoundary";
import Spinner from "@/components/Spinner";
import HRApplicationsClient from "./HRApplicationsClient";

export const metadata = {
  title: "Manage Applications - ISSI Jobs",
  description: "Manage and review job applications for your posted positions",
};

interface Props {
  params: Promise<{
    lang: Locale;
  }>;
  searchParams: Promise<{
    jobId?: string;
    status?: string;
    page?: string;
  }>;
}

export default async function HRApplicationsPage({ params, searchParams }: Props) {
  const { lang: locale } = await params;
  const { jobId, status, page } = await searchParams;
  const intl = await getIntl(locale);

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2">
            {intl.formatMessage({ 
              id: "hr.applications.title", 
              defaultMessage: "Application Management" 
            })}
          </h1>
          <p className="text-muted-foreground text-lg">
            {intl.formatMessage({ 
              id: "hr.applications.description", 
              defaultMessage: "Review and manage applications for your job postings. Move candidates through your hiring pipeline." 
            })}
          </p>
        </div>

        <Suspense fallback={<Spinner />}>
          <HRApplicationsClient 
            locale={locale} 
            initialJobId={jobId}
            initialStatus={status}
            initialPage={page ? parseInt(page, 10) : 1}
          />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}