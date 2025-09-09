'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormattedMessage } from 'react-intl';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  DollarSign,
  Building,
  ExternalLink,
  Share2,
  Bookmark,
  BookmarkCheck,
  Clock,
  Users,
  Globe,
} from 'lucide-react';
import { type JobPost, jobsUtils } from '@/lib/jobs-api';
import RichTextRenderer from './RichTextRenderer';
import ErrorBoundary from '@/components/ErrorBoundary';
import { cn } from '@/lib/utils';

interface JobDetailPageProps {
  job: JobPost;
  onSave?: (jobId: number) => Promise<void>;
  onUnsave?: (jobId: number) => Promise<void>;
  isSaved?: boolean;
  className?: string;
}

export default function JobDetailPage({ 
  job, 
  onSave, 
  onUnsave, 
  isSaved = false,
  className 
}: JobDetailPageProps) {
  const router = useRouter();
  const [savingJob, setSavingJob] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleSaveJob = async () => {
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

  const handleShare = async () => {
    const url = window.location.href;
    const title = `${job.jobTitle} at ${job.company.name}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: jobsUtils.createExcerpt(job.jobDescription, 160),
          url,
        });
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback to copying URL
      try {
        await navigator.clipboard.writeText(url);
        // Could add toast notification here
      } catch (error) {
        console.error('Failed to copy URL:', error);
      }
    }
  };

  const formattedSalary = jobsUtils.formatSalary(job.salaryFrom, job.salaryTo);
  const formattedType = jobsUtils.formatEmploymentType(job.employmentType);
  const formattedDate = jobsUtils.formatDate(job.createdAt);
  const relativeDate = jobsUtils.formatRelativeDate(job.createdAt);
  const companyInitials = job.company.name.split(' ').map(word => word[0]).join('').slice(0, 2);

  return (
    <ErrorBoundary>
      <div className={cn("min-h-screen bg-background", className)}>
        <div className="container mx-auto px-4 py-6">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <FormattedMessage id="jobs.detail.back" defaultMessage="Back to Jobs" />
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Header */}
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h1 className="sm:text-3xl text-foreground mb-3">
                        {job.jobTitle}
                      </h1>
                      
                      {/* Company Info */}
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage 
                            src={job.company.logo || undefined} 
                            alt={job.company.name}
                          />
                          <AvatarFallback className="bg-primary/10 text-primary font-medium">
                            {companyInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <h2 className="text-foreground">
                            {job.company.name}
                          </h2>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Building className="h-4 w-4" />
                            <span>{job.company.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Job Meta */}
                      <div className="flex flex-wrap items-center gap-4  ">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Posted {relativeDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Expires in {job.listingDuration} days</span>
                        </div>
                      </div>

                      {/* Employment Type & Salary */}
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {formattedType}
                        </Badge>
                        {(job.salaryFrom || job.salaryTo) && (
                          <div className="flex items-center gap-1 text-foreground font-medium">
                            <DollarSign className="h-4 w-4" />
                            <span>{formattedSalary}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleShare}
                        className="gap-2"
                      >
                        <Share2 className="h-4 w-4" />
                        <span className="hidden sm:inline">
                          <FormattedMessage id="jobs.detail.share" defaultMessage="Share" />
                        </span>
                      </Button>
                      
                      {(onSave || onUnsave) && (
                        <Button
                          variant={isSaved ? "default" : "outline"}
                          size="sm"
                          onClick={handleSaveJob}
                          disabled={savingJob}
                          className="gap-2"
                        >
                          {isSaved ? (
                            <BookmarkCheck className="h-4 w-4" />
                          ) : (
                            <Bookmark className="h-4 w-4" />
                          )}
                          <span className="hidden sm:inline">
                            {isSaved ? (
                              <FormattedMessage id="jobs.detail.saved" defaultMessage="Saved" />
                            ) : (
                              <FormattedMessage id="jobs.detail.save" defaultMessage="Save Job" />
                            )}
                          </span>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Benefits */}
                  {job.benefits.length > 0 && (
                    <div>
                      <h3 className="mb-3">
                        <FormattedMessage id="jobs.detail.benefits" defaultMessage="Benefits & Perks" />
                      </h3>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {job.benefits.map((benefit) => (
                          <Badge 
                            key={benefit} 
                            variant="outline"
                            className=""
                          >
                            {jobsUtils.formatBenefit(benefit)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <Separator className="my-6" />

                  {/* Job Description */}
                  <div>
                    <h3 className="mb-4">
                      <FormattedMessage id="jobs.detail.description" defaultMessage="Job Description" />
                    </h3>
                    <div className="prose prose-sm max-w-none">
                      <RichTextRenderer content={job.jobDescription} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply Card */}
              <Card className="sticky top-6">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="mb-2">
                      <FormattedMessage id="jobs.detail.apply.title" defaultMessage="Ready to Apply?" />
                    </h3>
                    <p className="">
                      <FormattedMessage 
                        id="jobs.detail.apply.description" 
                        defaultMessage="Submit your application for this position" 
                      />
                    </p>
                  </div>
                  
                  <Button 
                    className="w-full mb-4" 
                    size="lg"
                    // onClick={() => router.push(`/jobs/${job.id}/apply`)}
                  >
                    <FormattedMessage id="jobs.detail.apply.button" defaultMessage="Apply Now" />
                  </Button>
                  
                  <div className="text-xs text-muted-foreground text-center">
                    <FormattedMessage 
                      id="jobs.detail.apply.note" 
                      defaultMessage="You'll be able to review your application before submitting" 
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Company Info Card */}
              <Card>
                <CardHeader>
                  <h3 className="">
                    <FormattedMessage id="jobs.detail.company.about" defaultMessage="About the Company" />
                  </h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-16 w-16">
                      <AvatarImage 
                        src={job.company.logo || undefined} 
                        alt={job.company.name}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-medium text-lg">
                        {companyInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="">{job.company.name}</h4>
                      <p className="">{job.company.location}</p>
                    </div>
                  </div>

                  {job.company.about && (
                    <div>
                      <p className="">
                        {job.company.about}
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    {job.company.website && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start gap-2"
                        onClick={() => window.open(job.company.website || '', '_blank')}
                      >
                        <Globe className="h-4 w-4" />
                        <FormattedMessage id="jobs.detail.company.website" defaultMessage="Visit Website" />
                        <ExternalLink className="h-3 w-3 ml-auto" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Job Details Card */}
              <Card>
                <CardHeader>
                  <h3 className="">
                    <FormattedMessage id="jobs.detail.info.title" defaultMessage="Job Information" />
                  </h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="">
                      <FormattedMessage id="jobs.detail.info.posted" defaultMessage="Posted Date" />
                    </span>
                    <span className="">{formattedDate}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="">
                      <FormattedMessage id="jobs.detail.info.type" defaultMessage="Employment Type" />
                    </span>
                    <span className="">{formattedType}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="">
                      <FormattedMessage id="jobs.detail.info.location" defaultMessage="Location" />
                    </span>
                    <span className="">{job.location}</span>
                  </div>
                  
                  {(job.salaryFrom || job.salaryTo) && (
                    <div className="flex justify-between items-center">
                      <span className="">
                        <FormattedMessage id="jobs.detail.info.salary" defaultMessage="Salary Range" />
                      </span>
                      <span className="">{formattedSalary}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
