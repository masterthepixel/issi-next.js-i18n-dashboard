"use client";

import ApplicationForm from "@/components/applications/ApplicationForm";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Locale } from "@/lib/definitions";
import type { JobPost } from "@/lib/jobs-api";
import { formatEmploymentType, formatSalary, getTimeAgo } from "@/lib/jobs-api";
import { useAuth } from "@/lib/auth";
import {
  ArrowLeft,
  Building2,
  Clock,
  DollarSign,
  MapPin
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useIntl } from "react-intl";

interface JobApplicationPageClientProps {
  locale: Locale;
  job: JobPost;
}

function JobApplicationPageClientInternal({ locale, job }: JobApplicationPageClientProps) {
  const router = useRouter();
  const intl = useIntl();
  const { isAuthenticated, userType } = useAuth();

  const handleApplicationSuccess = () => {
    // Redirect to applications dashboard after successful submission
    router.push(`/${locale}/profile/applications`);
  };

  const handleCancel = () => {
    // Go back to job details
    router.push(`/${locale}/jobs/${job.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Back to Job Details Link */}
      <div className="mb-6">
        <Button variant="ghost" className="p-0" onClick={handleCancel}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {intl.formatMessage({ id: "jobs.backToJobDetails", defaultMessage: "Back to Job Details" })}
        </Button>
      </div>

      {/* Job Summary Card */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-xl font-serif font-normal mb-2 leading-tight break-words">
                {intl.formatMessage({
                  id: "applications.applyingFor",
                  defaultMessage: "Applying for:"
                })}
              </CardTitle>
              <h2 className="text-2xl font-serif font-normal mb-3 leading-tight break-words">
                {job.jobTitle}
              </h2>
              <CardDescription className="text-lg mb-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium">{job.company.name}</span>
                </div>
              </CardDescription>
            </div>

            {/* Company Logo */}
            {job.company.logo && (
              <div className="flex-shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-background border rounded-xl p-2 shadow-sm">
                  <Image
                    src={job.company.logo}
                    alt={`${job.company.name} logo`}
                    width={80}
                    height={80}
                    className="w-full h-full rounded-lg object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Job Meta Info */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm font-medium">{job.location}</span>
            </div>

            <Badge variant="secondary" className="font-medium">
              {formatEmploymentType(job.employmentType)}
            </Badge>

            {(job.salaryFrom || job.salaryTo) && (
              <div className="flex items-center gap-2 font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-3 py-1.5 rounded-full">
                <DollarSign className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{formatSalary(job.salaryFrom, job.salaryTo)}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm">
                {intl.formatMessage({
                  id: "jobs.postedTime",
                  defaultMessage: "Posted {time}"
                }, { time: getTimeAgo(job.createdAt) })}
              </span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Application Form */}
      <ApplicationForm
        job={job}
        locale={locale}
        onSuccess={handleApplicationSuccess}
        onCancel={handleCancel}
      />

      {/* Help Text */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          {intl.formatMessage({
            id: "applications.helpText",
            defaultMessage: "Need help? Contact us at support@company.com"
          })}
        </p>
      </div>
    </div>
  );
}

export default function JobApplicationPageClient(props: JobApplicationPageClientProps) {
  return (
    <ErrorBoundary>
      <JobApplicationPageClientInternal {...props} />
    </ErrorBoundary>
  );
}