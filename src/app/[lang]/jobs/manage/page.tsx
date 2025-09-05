import { Metadata } from "next";
import { Suspense } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import Spinner from "@/components/Spinner";
import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";
import JobsManagementDashboard from "@/components/jobs/JobsManagementDashboard";

export const metadata: Metadata = {
  title: "Manage Jobs - ISSI Jobs Dashboard",
  description: "Manage your job listings, track applications, and optimize your hiring process.",
};

interface Props {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function ManageJobsPage(props: Props) {
  const params = await props.params;
  const locale = params.lang;

  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <ManageJobsPageContent locale={locale} />
      </Suspense>
    </ErrorBoundary>
  );
}

interface ManageJobsPageContentProps {
  locale: Locale;
}

async function ManageJobsPageContent({ locale }: ManageJobsPageContentProps) {
  const intl = await getIntl(locale);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <JobsManagementDashboard locale={locale} />
      </div>
    </div>
  );
}