import { Locale } from "@/lib/definitions";
import { getJobById } from "@/lib/jobs-api";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import JobApplicationPageClient from "./JobApplicationPageClient";

interface JobApplicationPageProps {
  params: Promise<{
    lang: Locale;
    id: string;
  }>;
}

export default async function JobApplicationPage({ params }: JobApplicationPageProps) {
  // Await params in Next.js 15
  const { lang, id } = await params;
  
  // Fetch the job data
  const job = await getJobById(id);
  
  if (!job) {
    notFound();
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JobApplicationPageClient locale={lang} job={job} />
    </Suspense>
  );
}