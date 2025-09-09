import { Metadata } from "next";
import { Suspense } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import Spinner from "@/components/Spinner";
import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";
import EditJobPageClient from "./EditJobPageClient";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Edit Job Listing - ISSI Jobs",
  description: "Edit your job listing to attract the right candidates.",
};

interface Props {
  params: Promise<{
    lang: Locale;
    id: string;
  }>;
}

export default async function EditJobPage(props: Props) {
  const params = await props.params;
  const locale = params.lang;
  const jobId = params.id;

  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <EditJobPageContent locale={locale} jobId={jobId} />
      </Suspense>
    </ErrorBoundary>
  );
}

interface EditJobPageContentProps {
  locale: Locale;
  jobId: string;
}

async function EditJobPageContent({ locale, jobId }: EditJobPageContentProps) {
  const intl = await getIntl(locale);

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link 
            href={`/${locale}/jobs/${jobId}`}
            className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {intl.formatMessage({ id: "common.back", defaultMessage: "Back to Job" })}
          </Link>
        </div>
      </div>
      
      <div className="container mx-auto py-8">
        <EditJobPageClient locale={locale} jobId={jobId} />
      </div>
    </div>
  );
}