import { Metadata } from "next";
import { Suspense } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import Spinner from "@/components/Spinner";
import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";
import JobListingForm from "@/components/jobs/JobListingForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create Job Listing - ISSI Jobs",
  description: "Create a new job listing to attract qualified candidates to your organization.",
};

interface Props {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function CreateJobPage(props: Props) {
  const params = await props.params;
  const locale = params.lang;

  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <CreateJobPageContent locale={locale} />
      </Suspense>
    </ErrorBoundary>
  );
}

interface CreateJobPageContentProps {
  locale: Locale;
}

async function CreateJobPageContent({ locale }: CreateJobPageContentProps) {
  const intl = await getIntl(locale);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link 
            href={`/${locale}/jobs`}
            className="inline-flex items-center justify-center rounded-md  " text-caption1440
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {intl.formatMessage({ id: "common.back", defaultMessage: "Back to Jobs" })}
          </Link>
        </div>
      </div>
      
      <div className="container mx-auto py-8">
        <JobListingForm mode="create" />
      </div>
    </div>
  );
}