import { Suspense } from "react";
import { notFound } from "next/navigation";

import ErrorBoundary from "@/components/ErrorBoundary";
import Spinner from "@/components/Spinner";
import { getJobById } from "@/lib/jobs-api";
import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";
import JobDetailPageClient from "./JobDetailPageClient";
import JobDetailPageWrapper from "./JobDetailPageWrapper";

interface Props {
  params: Promise<{
    lang: Locale;
    id: string;
  }>;
}

// Generate metadata for the job page
export async function generateMetadata(props: Props) {
  const params = await props.params;
  const { id } = params;
  try {
    const job = await getJobById(id);
    
    return {
      title: `${job.jobTitle} at ${job.company.name} - ISSI Jobs`,
      description: `Apply for ${job.jobTitle} position at ${job.company.name}. ${job.location} | ${job.employmentType.replace('_', ' ')}`,
    };
  } catch (error) {
    return {
      title: "Job Not Found - ISSI Jobs",
      description: "The job posting you're looking for could not be found.",
    };
  }
}

export default async function JobDetailPage(props: Props) {
  const params = await props.params;
  const { lang: locale, id } = params;

  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        <JobDetailPageContent locale={locale} jobId={id} />
      </Suspense>
    </ErrorBoundary>
  );
}

interface JobDetailPageContentProps {
  locale: Locale;
  jobId: string;
}

async function JobDetailPageContent({ locale, jobId }: JobDetailPageContentProps) {
  const intl = await getIntl(locale);
  const messages = (await import(`../../../../lang/${locale}.json`)).default;
  
  try {
    const job = await getJobById(jobId);
    return (
      <JobDetailPageWrapper locale={locale} messages={messages}>
        <JobDetailPageClient locale={locale} job={job} />
      </JobDetailPageWrapper>
    );
  } catch (error) {
    notFound();
  }
}