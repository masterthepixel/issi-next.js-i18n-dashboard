"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatBenefit, formatEmploymentType, formatSalary, getTimeAgo } from "@/lib/jobs-api";
import type { JobPost } from "@/lib/jobs-api";
import { cn } from "@/lib/utils";
import { Building2, Clock, DollarSign, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useIntl } from "react-intl";

interface JobCardProps {
  job: JobPost;
  className?: string;
}

function JobCardInternal({ job, className }: JobCardProps) {
  const intl = useIntl();

  return (
    <Card className={cn("group hover:shadow-lg transition-all duration-300 hover:-translate-y-1", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
              <Link href={`/jobs/${job.id}`}>
                {job.jobTitle}
              </Link>
            </CardTitle>
            <CardDescription className="mt-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="h-4 w-4" />
                {job.company.name}
              </div>
            </CardDescription>
          </div>
          
          {/* Company Logo */}
          {job.company.logo && (
            <div className="ml-4 flex-shrink-0">
              <Image
                src={job.company.logo}
                alt={`${job.company.name} logo`}
                width={48}
                height={48}
                className="rounded-lg object-contain"
              />
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        {/* Job Details */}
        <div className="space-y-2">
          {/* Location & Employment Type */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {job.location}
            </div>
            <Badge variant="secondary" className="text-xs">
              {formatEmploymentType(job.employmentType)}
            </Badge>
          </div>

          {/* Salary */}
          {(job.salaryFrom || job.salaryTo) && (
            <div className="flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400">
              <DollarSign className="h-4 w-4" />
              {formatSalary(job.salaryFrom, job.salaryTo)}
            </div>
          )}

          {/* Benefits */}
          {job.benefits && job.benefits.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {job.benefits.slice(0, 3).map((benefit) => (
                <Badge key={benefit} variant="outline" className="text-xs">
                  {formatBenefit(benefit)}
                </Badge>
              ))}
              {job.benefits.length > 3 && (
                <Badge variant="outline" className="text-xs text-muted-foreground">
                  +{job.benefits.length - 3} more
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-3 border-t">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {getTimeAgo(job.createdAt)}
        </div>
        
        <Button variant="outline" size="sm" asChild>
          <Link href={`/jobs/${job.id}`}>
            {intl.formatMessage({ id: "jobs.viewDetails", defaultMessage: "View Details" })}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function JobCard(props: JobCardProps) {
  return (
    <ErrorBoundary>
      <JobCardInternal {...props} />
    </ErrorBoundary>
  );
}