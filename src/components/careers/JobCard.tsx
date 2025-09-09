"use client";

import { useRouter } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/card";
import { MapPin, User2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatSalaryRange } from "@/lib/utils/formatCurrency";
import { formatRelativeTime } from "@/lib/utils/formatRelativeTime";
import Image from "next/image";
import type { Job } from "@/lib/schemas/job";
import { useIntl } from "react-intl";

interface JobCardProps {
  job: Job;
  locale?: string;
}

export function JobCard({ job, locale = "en" }: JobCardProps) {
  const intl = useIntl();
  const router = useRouter();

  // Extract job description text for preview
  const getJobDescriptionPreview = (): string => {
    try {
      if (typeof job.jobDescription === 'string') {
        const desc = job.jobDescription as string;
        return desc.length > 150 ? desc.substring(0, 150) + "..." : desc;
      }
      
      if (job.jobDescription?.root?.children) {
        const textContent = job.jobDescription.root.children
          .map((child: any) => {
            if (child.children) {
              return child.children
                .map((textNode: any) => textNode.text || '')
                .join('');
            }
            return child.text || '';
          })
          .join(' ');
        return textContent.substring(0, 150) + (textContent.length > 150 ? "..." : "");
      }
    } catch (error) {
      console.error('Error extracting job description preview:', error);
    }
    
    return job.company.about || intl.formatMessage({ 
      id: "careers.jobCard.noDescription", 
      defaultMessage: "No description available" 
    });
  };

  const handleCardClick = () => {
    router.push(`/${locale}/jobs/${job.id}`);
  };

  const getEmploymentTypeLabel = (type: string): string => {
    const labels = {
      "full-time": intl.formatMessage({ id: "careers.jobType.fullTime", defaultMessage: "Full Time" }),
      "part-time": intl.formatMessage({ id: "careers.jobType.partTime", defaultMessage: "Part Time" }),
      "contract": intl.formatMessage({ id: "careers.jobType.contract", defaultMessage: "Contract" }),
      "internship": intl.formatMessage({ id: "careers.jobType.internship", defaultMessage: "Internship" }),
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <Card 
      className="hover:shadow-lg transition-all duration-300 hover:border-primary relative cursor-pointer"
      onClick={handleCardClick}
    >
      <CardHeader>
        <div className="flex flex-col md:flex-row gap-4">
          {job.company.logo ? (
            <Image
              src={job.company.logo}
              alt={job.company.name}
              width={48}
              height={48}
              className="size-12 rounded-lg"
            />
          ) : (
            <div className="bg-primary size-12 rounded-lg flex items-center justify-center">
              <User2 className="size-6 text-primary-foreground" />
            </div>
          )}
          
          <div className="flex flex-col flex-grow">
            <h2 className="md:text-2xl">{job.jobTitle}</h2>
            <div className="flex flex-wrap items-center gap-2 mt-1">
              <p className="">
                {job.company.name}
              </p>
              <span className="hidden md:inline text-muted-foreground">•</span>
              <Badge className="rounded-full" variant="secondary">
                {getEmploymentTypeLabel(job.employmentType)}
              </Badge>
              <span className="hidden md:inline text-muted-foreground">•</span>
              <Badge className="rounded-full" variant="outline">
                {job.location}
              </Badge>
              {(job.salaryFrom || job.salaryTo) && (
                <>
                  <span className="hidden md:inline text-muted-foreground">•</span>
                  <p className="">
                    {formatSalaryRange(job.salaryFrom, job.salaryTo)}
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="md:ml-auto">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="size-4 text-muted-foreground" />
              <h3 className="md:text-lg whitespace-nowrap">
                {job.location}
              </h3>
            </div>
            <p className="">
              {formatRelativeTime(job.createdAt)}
            </p>
            {job.applications > 0 && (
              <p className="text-xs text-muted-foreground md:text-right mt-1">
                {intl.formatMessage(
                  { 
                    id: "careers.jobCard.applications", 
                    defaultMessage: "{count} {count, plural, one {application} other {applications}}" 
                  },
                  { count: job.applications }
                )}
              </p>
            )}
          </div>
        </div>
        
        <div className="!mt-5">
          <p className="text-base text-muted-foreground line-clamp-2">
            {getJobDescriptionPreview()}
          </p>
        </div>
        
        {job.benefits && job.benefits.length > 0 && (
          <div className="!mt-4">
            <div className="flex flex-wrap gap-2">
              {job.benefits.slice(0, 3).map((benefit, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {benefit}
                </Badge>
              ))}
              {job.benefits.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{job.benefits.length - 3} {intl.formatMessage({ 
                    id: "careers.jobCard.moreBenefits", 
                    defaultMessage: "more" 
                  })}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardHeader>
    </Card>
  );
}
