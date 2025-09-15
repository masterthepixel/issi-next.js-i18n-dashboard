"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Job } from "@/lib/schemas/job";
import { formatTimeBadge } from "@/lib/utils/formatRelativeTime";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

interface JobCardProps {
  job: Job;
  locale?: string;
}

export function JobCard({ job, locale = "en" }: JobCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/${locale}/jobs/${job.id}`);
  };

  // Extract job description text for preview
  const getJobDescriptionPreview = (): string => {
    try {
      if (typeof job.jobDescription === 'string') {
        const desc = job.jobDescription as string;
        return desc.length > 300 ? desc.substring(0, 300) + "..." : desc;
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
        return textContent.substring(0, 300) + (textContent.length > 300 ? "..." : "");
      }
    } catch (error) {
      console.error('Error extracting job description preview:', error);
    }

    return "No description available";
  }; return (
    <Card
      className="hover:shadow-lg transition-all duration-300 hover:border-link relative cursor-pointer group"
      onClick={handleCardClick}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            {/* Time Badge */}
            <div className="flex items-center justify-start mb-3">
              <Badge className="!bg-blue-600 !text-white text-xs font-light">
                {formatTimeBadge(job.createdAt)}
              </Badge>
            </div>

            <h2 className="text-xl lg:text-2xl font-normal text-primary">{job.jobTitle}</h2>

            {/* Job Address */}
            <div className="flex items-center gap-2 mt-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{job.location}</span>
            </div>

            {/* Divider */}
            <Separator className="my-2 bg-border" />

            {/* Job Description */}
            <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3 w-full">
              {getJobDescriptionPreview()}
            </p>
          </div>
        </div>
      </CardHeader>
      <div className="absolute top-4 right-4">
        <div className="rounded-full p-2 bg-card border border-border text-card-foreground shadow-sm transition-colors duration-300 hover:bg-accent">
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
    </Card>
  );
}
