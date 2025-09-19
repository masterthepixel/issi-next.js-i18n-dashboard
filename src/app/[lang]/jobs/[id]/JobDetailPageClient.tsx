"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Locale } from "@/lib/definitions";
import type { JobPost } from "@/lib/jobs-api";
import { formatBenefit, formatEmploymentType, formatSalary, getTimeAgo } from "@/lib/jobs-api";
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
import React, { useState } from "react";
import { useIntl } from "react-intl";

interface JobDetailPageClientProps {
  locale: Locale;
  job: JobPost;
}

// Rich Text Renderer Component (proper PayloadCMS rich text rendering)
interface RichTextNode {
  type?: string;
  text?: string;
  children?: RichTextNode[];
  tag?: number;
  listType?: string;
  url?: string;
  newTab?: boolean;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

function RichTextRenderer({ content }: { content: JobPost['jobDescription'] }) {
  if (!content?.root?.children) {
    return <div className="text-muted-foreground">No job description available.</div>;
  }

  const renderNode = (node: RichTextNode, index: number): React.ReactNode => {
    if (!node) return null;

    // Handle text nodes
    if (node.text !== undefined) {
      let textContent: React.ReactNode = node.text;

      // Apply text formatting
      if (node.bold) textContent = <strong key={index}>{textContent}</strong>;
      if (node.italic) textContent = <em key={index}>{textContent}</em>;
      if (node.underline) textContent = <u key={index}>{textContent}</u>;

      return textContent;
    }

    // Handle block nodes
    switch (node.type) {
      case 'paragraph':
        return (
          <p key={index} className="mb-4 leading-relaxed">
            {node.children?.map((child: RichTextNode, childIndex: number) => renderNode(child, childIndex))}
          </p>
        );

      case 'heading':
        const HeadingTag = `h${node.tag || 2}` as keyof JSX.IntrinsicElements;
        return React.createElement(
          HeadingTag,
          {
            key: index,
            className: `font-serif font-normal mt-6 mb-3 ${node.tag === 1 ? 'text-2xl' :
              node.tag === 2 ? 'text-xl' :
                node.tag === 3 ? 'text-lg' : 'text-base'
              }`
          },
          node.children?.map((child: RichTextNode, childIndex: number) => renderNode(child, childIndex))
        );

      case 'list':
        const ListTag = node.listType === 'number' ? 'ol' : 'ul';
        return React.createElement(
          ListTag,
          {
            key: index,
            className: `mb-4 pl-6 space-y-1 ${node.listType === 'number' ? 'list-decimal' : 'list-disc'
              }`
          },
          node.children?.map((child: RichTextNode, childIndex: number) => renderNode(child, childIndex))
        );

      case 'listItem':
        return (
          <li key={index} className="leading-relaxed">
            {node.children?.map((child: RichTextNode, childIndex: number) => renderNode(child, childIndex))}
          </li>
        );

      case 'quote':
        return (
          <blockquote key={index} className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground">
            {node.children?.map((child: RichTextNode, childIndex: number) => renderNode(child, childIndex))}
          </blockquote>
        );

      case 'link':
        return (
          <a
            key={index}
            href={node.url}
            className="text-primary hover:underline"
            target={node.newTab ? '_blank' : undefined}
            rel={node.newTab ? 'noopener noreferrer' : undefined}
          >
            {node.children?.map((child: RichTextNode, childIndex: number) => renderNode(child, childIndex))}
          </a>
        );

      default:
        // Fallback for unknown node types
        return (
          <div key={index}>
            {node.children?.map((child: RichTextNode, childIndex: number) => renderNode(child, childIndex))}
          </div>
        );
    }
  };

  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      {content.root.children.map((node, index) => renderNode(node as RichTextNode, index))}
    </div>
  );
}

function JobDetailPageClientInternal({ locale, job }: JobDetailPageClientProps) {
  const router = useRouter();
  const intl = useIntl();
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Helper function to get a safe logo URL
  const getSafeLogoUrl = (logo: string | { url?: string } | null | undefined): string => {
    if (!logo) return '/images/issi_logo.png';

    if (typeof logo === 'string') {
      // If it's a PayloadCMS API URL that might be broken, fallback to ISSI logo
      if (logo.includes('/api/media/file/') || logo.includes('logo_')) {
        return '/images/issi_logo.png';
      }
      return logo;
    }

    // If it's an object with url property
    const logoUrl = (logo as { url?: string })?.url;
    if (logoUrl && !logoUrl.includes('/api/media/file/') && !logoUrl.includes('logo_')) {
      return logoUrl;
    }

    return '/images/issi_logo.png';
  };

  // Debug logo URL
  React.useEffect(() => {
    if (job.company.logo) {
      console.log('Company logo URL:', job.company.logo);
    }
  }, [job.company.logo]);

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    try {
      const shareFn = (typeof navigator !== 'undefined')
        ? (navigator as unknown as { share?: (data: { title?: string; text?: string; url?: string }) => Promise<void> }).share
        : undefined;

      if (typeof shareFn === 'function') {
        await shareFn({
          title: `${job.jobTitle} at ${job.company.name}`,
          text: `Check out this job opportunity: ${job.jobTitle} at ${job.company.name}`,
          url,
        });
        return;
      }

      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }
    } catch (err) {
      console.error('Failed to share or copy URL:', err);
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
          <Card className="overflow-hidden">
            <CardHeader className="pb-6">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl sm:text-3xl font-serif font-normal mb-3 leading-tight break-words">
                    {job.jobTitle}
                  </h1>
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
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-background border rounded-xl p-2 shadow-sm">
                      <Image
                        src={getSafeLogoUrl(job.company.logo)}
                        alt={`${job.company.name} logo`}
                        width={88}
                        height={88}
                        className="w-full h-full rounded-lg object-contain"
                        unoptimized={true}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          console.error('Failed to load company logo:', job.company.logo);
                          target.src = '/images/issi_logo.png';
                        }}
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

              {/* Benefits & Perks */}
              {job.benefits && job.benefits.length > 0 && (
                <div className="pt-4">
                  <h4 className="text-sm font-serif font-normal text-muted-foreground mb-2">
                    {intl.formatMessage({ id: "jobs.benefits", defaultMessage: "Benefits & Perks" })}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {job.benefits.map((benefit) => (
                      <Badge key={benefit} variant="outline" className="bg-background">
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
              <h1 className="text-2xl sm:text-3xl font-serif font-normal mb-3 leading-tight break-words">
                {intl.formatMessage({ id: "jobs.description", defaultMessage: "Job Description" })}
              </h1>
            </CardHeader>
            <CardContent>
              <RichTextRenderer content={job.jobDescription} />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Apply Card */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
                onClick={() => router.push(`/${locale}/jobs/${job.id}/apply`)}
              >
                {intl.formatMessage({ id: "jobs.applyNow", defaultMessage: "Apply Now" })}
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4 mr-2" />
                {intl.formatMessage({ id: "jobs.shareJob", defaultMessage: "Share Job" })}
              </Button>
            </div>
          </div>

          {/* Company Info */}
          <Card>
            <CardHeader>
              <h1 className="text-2xl sm:text-3xl font-serif font-normal mb-3 leading-tight break-words">
                {intl.formatMessage({ id: "jobs.aboutCompany", defaultMessage: "About the Company" })}
              </h1>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="mb-2 font-serif font-normal">{job.company.name}</h4>
                {job.company.about && (
                  <div className="text-muted-foreground">
                    {job.company.about.length > 500 && !showFullDescription ? (
                      <>
                        <p className="leading-relaxed text-sm">
                          {job.company.about.slice(0, 500)}...
                        </p>
                        <button
                          onClick={() => setShowFullDescription(true)}
                          className="mt-2 text-primary hover:underline text-sm"
                        >
                          Read more
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="leading-relaxed text-sm">{job.company.about}</p>
                        {job.company.about.length > 500 && (
                          <button
                            onClick={() => setShowFullDescription(false)}
                            className="mt-2 text-primary hover:underline text-sm"
                          >
                            Show less
                          </button>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm">{job.company.location}</span>
                </div>

                {job.company.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <Link
                      href={job.company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1 text-sm"
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