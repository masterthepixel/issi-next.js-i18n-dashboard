"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ErrorBoundary from "@/components/ErrorBoundary";
import JobListingForm from "@/components/jobs/JobListingForm";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { jobsAPI } from "@/lib/api/jobs";
import type { JobFormData } from "@/lib/schemas/job";
import type { Locale } from "@/lib/definitions";
import { useIntl } from "react-intl";

interface EditJobPageClientProps {
  locale: Locale;
  jobId: string;
}

function JobFormSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <Skeleton className="h-8 w-48 mx-auto" />
        <Skeleton className="h-4 w-96 mx-auto" />
      </div>
      
      <div className="space-y-6">
        <div className="border rounded-lg p-6 space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        
        <div className="border rounded-lg p-6 space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  );
}

function EditJobPageClientInternal({ locale, jobId }: EditJobPageClientProps) {
  const intl = useIntl();
  const router = useRouter();
  const [jobData, setJobData] = useState<JobFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Get auth token - in a real app, this would come from your auth system
        const token = localStorage.getItem("authToken") || "";
        const job = await jobsAPI.getJob(jobId, token);
        
        // Transform API response to form data
        const formData: JobFormData = {
          jobTitle: job.jobTitle,
          employmentType: job.employmentType as JobFormData["employmentType"],
          location: job.location,
          salaryFrom: job.salaryFrom ?? undefined,
          salaryTo: job.salaryTo ?? undefined,
          jobDescription: job.jobDescription,
          benefits: job.benefits,
          listingDuration: job.listingDuration,
          status: job.status,
          company: job.company.id,
        };
        
        setJobData(formData);
      } catch (err) {
        console.error("Error fetching job:", err);
        setError(err instanceof Error ? err.message : "Failed to load job data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobData();
  }, [jobId]);

  const handleSuccess = () => {
    // Navigate back to the job detail page
    router.push(`/${locale}/jobs/${jobId}`);
  };

  if (isLoading) {
    return <JobFormSkeleton />;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {intl.formatMessage(
              { id: "jobs.edit.errorLoading", defaultMessage: "Error loading job: {error}" },
              { error }
            )}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!jobData) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {intl.formatMessage({
              id: "jobs.edit.notFound",
              defaultMessage: "Job not found or you don't have permission to edit it."
            })}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <JobListingForm
      mode="edit"
      initialData={jobData}
      jobId={jobId}
      onSuccess={handleSuccess}
    />
  );
}

export default function EditJobPageClient(props: EditJobPageClientProps) {
  return (
    <ErrorBoundary>
      <EditJobPageClientInternal {...props} />
    </ErrorBoundary>
  );
}