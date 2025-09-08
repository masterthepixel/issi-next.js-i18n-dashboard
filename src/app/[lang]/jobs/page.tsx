import { Suspense } from "react";

import ErrorBoundary from "@/components/ErrorBoundary";
import Spinner from "@/components/Spinner";
import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";
import JobListingPageClient from "./JobListingPageClient";
import JobPageWrapper from "./JobPageWrapper";

export const metadata = {
  title: "Jobs - ISSI - International Software Systems International",
  description: "Explore career opportunities at ISSI. Find your next role in software development, technology consulting, and government solutions.",
};

interface Props {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function JobsPage(props: Props) {
  const params = await props.params;
  const locale = params.lang;

  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <JobsPageContent locale={locale} />
      </Suspense>
    </ErrorBoundary>
  );
}

interface JobsPageContentProps {
  locale: Locale;
}

async function JobsPageContent({ locale }: JobsPageContentProps) {
  const intl = await getIntl(locale);
  const messages = (await import(`../../../lang/${locale}.json`)).default;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2">
          {intl.formatMessage({ id: "page.jobs.title", defaultMessage: "Career Opportunities" })}
        </h1>
        <p className="text-muted-foreground text-lg">
          {intl.formatMessage({ 
            id: "page.jobs.description", 
            defaultMessage: "Discover your next career opportunity with ISSI. Join our team of talented professionals building innovative software solutions." 
          })}
        </p>
      </div>
      
      <JobPageWrapper locale={locale} messages={messages}>
        <JobListingPageClient locale={locale} />
      </JobPageWrapper>
    </div>
  );
}