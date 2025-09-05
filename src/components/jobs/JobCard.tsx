'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormattedMessage } from 'react-intl';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Building,
} from 'lucide-react';
import { type JobPost, jobsUtils } from '@/lib/jobs-api';
import ErrorBoundary from '@/components/ErrorBoundary';
import { cn } from '@/lib/utils';

interface JobCardProps {
  job: JobPost;
  onSave?: (jobId: number) => Promise<void>;
  onUnsave?: (jobId: number) => Promise<void>;
  isSaved?: boolean;
  className?: string;
}

export default function JobCard({ 
  job, 
  onSave, 
  onUnsave, 
  isSaved = false, 
  className 
}: JobCardProps) {
  const router = useRouter();
  const [savingJob, setSavingJob] = useState(false);

  const handleSaveJob = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (savingJob) return;
    
    setSavingJob(true);
    try {
      if (isSaved && onUnsave) {
        await onUnsave(job.id);
      } else if (!isSaved && onSave) {
        await onSave(job.id);
      }
    } catch (error) {
      console.error('Error saving/unsaving job:', error);
    } finally {
      setSavingJob(false);
    }
  };

  const handleCardClick = () => {
    router.push(`/jobs/${job.id}`);
  };

  const handleCompanyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Future: Navigate to company page
    // router.push(`/companies/${job.company.id}`);
  };

  const excerpt = jobsUtils.createExcerpt(job.jobDescription, 120);
  const formattedSalary = jobsUtils.formatSalary(job.salaryFrom, job.salaryTo);
  const formattedType = jobsUtils.formatEmploymentType(job.employmentType);
  const relativeDate = jobsUtils.formatRelativeDate(job.createdAt);
  const companyInitials = job.company.name.split(' ').map(word => word[0]).join('').slice(0, 2);

  return (
    <ErrorBoundary>
      <Card 
        className={cn(
          "group cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 hover:-translate-y-1",
          "bg-card border border-border",
          className
        )}
        onClick={handleCardClick}
      >
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {job.jobTitle}
              </h3>
              
              {/* Company Info */}
              <div 
                className="flex items-center gap-2 mb-3 cursor-pointer hover:text-primary transition-colors"
                onClick={handleCompanyClick}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage 
                    src={job.company.logo || undefined} 
                    alt={job.company.name}
                  />
                  <AvatarFallback className="text-xs bg-primary/10 text-primary">
                    {companyInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm text-foreground truncate">
                    {job.company.name}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Building className="h-3 w-3" />
                    <span className="truncate">{job.company.location}</span>
                  </div>
                </div>
              </div>

              {/* Job Details */}
              <div className="space-y-2">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{relativeDate}</span>
                  </div>
                </div>

                {(job.salaryFrom || job.salaryTo) && (
                  <div className="flex items-center gap-1 text-sm text-foreground">
                    <DollarSign className="h-3 w-3" />
                    <span className="font-medium">{formattedSalary}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Save Button */}
            {(onSave || onUnsave) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSaveJob}
                disabled={savingJob}
                className="shrink-0 h-8 w-8 p-0 hover:bg-primary/10"
              >
                {isSaved ? (
                  <BookmarkCheck className="h-4 w-4 text-primary" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Employment Type Badge */}
          <div className="mb-3">
            <Badge 
              variant="secondary" 
              className="bg-primary/10 text-primary hover:bg-primary/20"
            >
              {formattedType}
            </Badge>
          </div>

          {/* Job Description Excerpt */}
          {excerpt && (
            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {excerpt}
            </p>
          )}

          {/* Benefits */}
          {job.benefits.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {job.benefits.slice(0, 3).map((benefit) => (
                  <Badge 
                    key={benefit} 
                    variant="outline" 
                    className="text-xs px-2 py-1 border-muted-foreground/20"
                  >
                    {jobsUtils.formatBenefit(benefit)}
                  </Badge>
                ))}
                {job.benefits.length > 3 && (
                  <Badge 
                    variant="outline" 
                    className="text-xs px-2 py-1 border-muted-foreground/20"
                  >
                    +{job.benefits.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
              className="group-hover:border-primary group-hover:text-primary transition-colors"
            >
              <FormattedMessage id="jobs.card.viewDetails" defaultMessage="View Details" />
              <ExternalLink className="ml-2 h-3 w-3" />
            </Button>

            <div className="text-xs text-muted-foreground">
              <FormattedMessage
                id="jobs.card.expires"
                defaultMessage="Expires in {days} days"
                values={{ days: job.listingDuration || 30 }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </ErrorBoundary>
  );
}