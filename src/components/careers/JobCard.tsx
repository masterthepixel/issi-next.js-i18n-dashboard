"use client";

import { Card, CardHeader } from "@/components/ui/card";
import type { Job } from "@/lib/schemas/job";
import { formatSalaryRange } from "@/lib/utils/formatCurrency";
import { formatRelativeTime } from "@/lib/utils/formatRelativeTime";
import { useRouter } from "next/navigation";
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
          .map((child: { children?: { text?: string }[]; text?: string }) => {
            if (child.children) {
              return child.children
                .map((textNode: { text?: string }) => textNode.text || '')
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

  return (
    <Card
      className="hover:shadow-lg transition-all duration-300 hover:border-primary relative cursor-pointer"
      onClick={handleCardClick}
    >
      <CardHeader>
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-normal text-primary">{job.jobTitle}</h2>
          <p className="text-muted-foreground line-clamp-3 leading-relaxed">
            {getJobDescriptionPreview()}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-muted-foreground">
              {formatRelativeTime(job.createdAt)}
            </p>
            {(job.salaryFrom || job.salaryTo) && (
              <p className="font-medium">
                {formatSalaryRange(job.salaryFrom, job.salaryTo)}
              </p>
            )}
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
