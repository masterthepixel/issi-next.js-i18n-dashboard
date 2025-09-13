"use client";

import ApplicationForm from "@/components/applications/ApplicationForm";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/lib/definitions";
import type { JobPost } from "@/lib/jobs-api";
import { extractTextFromRichText, formatBenefit, formatEmploymentType, formatSalary, getTimeAgo } from "@/lib/jobs-api";
import {
  ArrowLeft,
  Building2,
  Clock,
  DollarSign,
  ExternalLink,
  Globe,
  MapPin,
  Share2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useIntl } from "react-intl";

interface JobDetailPageClientProps {
  locale: Locale;
  job: JobPost;
}

// Rich Text Renderer Component (simplified for now, can be enhanced later)
function RichTextRenderer({ content }: { content: JobPost['jobDescription'] }) {
  // For now, extract plain text - can be enhanced with proper rich text rendering
  const textContent = extractTextFromRichText(content);

  return (
    <div className="prose prose-sm max-w-none dark:prose-invert">
      <div className="whitespace-pre-wrap">{textContent}</div>
    </div>
  );
}

function JobDetailPageClientInternal({ locale, job }: JobDetailPageClientProps) {
  const router = useRouter();
  const intl = useIntl();
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${job.jobTitle} at ${job.company.name}`,
          text: `Check out this job opportunity: ${job.jobTitle} at ${job.company.name}`,
          url: window.location.href,
        });
      } catch {
        // Fallback to copying to clipboard
        navigator.clipboard?.writeText(window.location.href);
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard?.writeText(window.location.href);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Back to Jobs Link */}
      <div className="mb-6">
        <Button variant="ghost" className="p-0" onClick={() => router.push(`/${locale}/careers`)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          {intl.formatMessage({ id: "jobs.backToJobs", defaultMessage: "Back to Jobs" })}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Job Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-2xl font-bold mb-2">
                    {job.jobTitle}
                  </CardTitle>
                  <CardDescription className="text-lg">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      {job.company.name}
                    </div>
                  </CardDescription>
                </div>

                {/* Company Logo */}
                {job.company.logo && (
                  <div className="ml-6 flex-shrink-0">
                    <Image
                      src={job.company.logo}
                      alt={`${job.company.name} logo`}
                      width={80}
                      height={80}
                      className="rounded-lg object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Job Meta Info */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </div>

                <Badge variant="secondary">
                  {formatEmploymentType(job.employmentType)}
                </Badge>

                {(job.salaryFrom || job.salaryTo) && (
                  <div className="flex items-center gap-2 font-medium text-green-600 dark:text-green-400">
                    <DollarSign className="h-4 w-4" />
                    {formatSalary(job.salaryFrom, job.salaryTo)}
                  </div>
                )}

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {intl.formatMessage({
                    id: "jobs.postedTime",
                    defaultMessage: "Posted {time}"
                  }, { time: getTimeAgo(job.createdAt) })}
                </div>
              </div>

              {/* Benefits & Perks */}
              {job.benefits && job.benefits.length > 0 && (
                <div className="pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    {intl.formatMessage({ id: "jobs.benefits", defaultMessage: "Benefits & Perks" })}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {job.benefits.map((benefit) => (
                      <Badge key={benefit} variant="outline">
                        {formatBenefit(benefit)}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardHeader>
          </Card>

          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle>
                {intl.formatMessage({ id: "jobs.description", defaultMessage: "Job Description" })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RichTextRenderer content={job.jobDescription} />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Apply Card */}
          <Card>
            <CardHeader>
              <CardTitle>
                {intl.formatMessage({ id: "jobs.applyNow", defaultMessage: "Apply Now" })}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full"
                size="lg"
                onClick={() => setShowApplicationForm(true)}
              >
                {intl.formatMessage({ id: "jobs.applyForPosition", defaultMessage: "Apply for this Position" })}
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-2" />
                {intl.formatMessage({ id: "jobs.shareJob", defaultMessage: "Share Job" })}
              </Button>
            </CardContent>
          </Card>

          {/* Company Info */}
          <Card>
            <CardHeader>
              <CardTitle>
                {intl.formatMessage({ id: "jobs.aboutCompany", defaultMessage: "About the Company" })}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="mb-2">{job.company.name}</h4>
                {job.company.about && (
                  <p className="text-muted-foreground">
                    {job.company.about}
                  </p>
                )}
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{job.company.location}</span>
                </div>

                {job.company.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <Link
                      href={job.company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1"
                    >
                      {intl.formatMessage({ id: "jobs.visitWebsite", defaultMessage: "Visit Website" })}
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Application Form Dialog */}
      <Dialog open={showApplicationForm} onOpenChange={setShowApplicationForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="sr-only">
            <DialogTitle>
              {intl.formatMessage({ id: "jobs.applyForPosition", defaultMessage: "Apply for this Position" })}
            </DialogTitle>
            <DialogDescription>
              {intl.formatMessage({ id: "applications.fillOutForm", defaultMessage: "Fill out the application form below to apply for this position." })}
            </DialogDescription>
          </DialogHeader>
          <ApplicationForm
            job={job}
            locale={locale}
            onSuccess={() => setShowApplicationForm(false)}
            onCancel={() => setShowApplicationForm(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function JobDetailPageClient(props: JobDetailPageClientProps) {
  return (
    <ErrorBoundary>
      <JobDetailPageClientInternal {...props} />
    </ErrorBoundary>
  );
}