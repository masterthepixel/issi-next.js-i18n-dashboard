"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { careersAPI, mockJobSearchData } from "@/lib/api/careers";
import type { Job } from "@/lib/schemas/job";
import { AlertCircle, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { EmptyState } from "./EmptyState";
import { JobCard } from "./JobCard";
import { PaginationComponent } from "./PaginationComponent";

interface JobListingsProps {
  currentPage: number;
  employmentType?: string[];
  location?: string;
  keyword?: string;
  minSalary?: string;
  maxSalary?: string;
  locale?: string;
}

export default function JobListings({
  currentPage,
  employmentType = [],
  location = "",
  keyword = "",
  minSalary = "",
  maxSalary = "",
  locale = "en",
}: JobListingsProps) {
  const intl = useIntl();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalJobs, setTotalJobs] = useState(0);

  const fetchJobs = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const searchParams = {
        page: currentPage,
        limit: 7, // Match reference implementation
        q: keyword || undefined,
        employmentType: employmentType.length > 0 ? employmentType.join(",") : undefined,
        location: location || undefined,
        minSalary: minSalary ? parseInt(minSalary) : undefined,
        maxSalary: maxSalary ? parseInt(maxSalary) : undefined,
      };

      // Filter out undefined values
      const cleanedParams = Object.fromEntries(
        Object.entries(searchParams).filter(([_, value]) => value !== undefined)
      );

      const result = await careersAPI.searchJobs(cleanedParams);

      setJobs(result.jobs);
      setTotalPages(result.pagination.totalPages);
      setTotalJobs(result.pagination.totalDocs);
    } catch (err) {
      console.error("Error fetching jobs:", err);

      // Fallback to mock data in development
      if (process.env.NODE_ENV === 'development') {
        console.log("Using mock data for development");
        setJobs(mockJobSearchData);
        setTotalPages(1);
        setTotalJobs(mockJobSearchData.length);
      } else {
        setError(err instanceof Error ? err.message : "Failed to fetch jobs");
        setJobs([]);
        setTotalPages(1);
        setTotalJobs(0);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [currentPage, employmentType, location, keyword, minSalary, maxSalary]);

  const handleRetry = () => {
    fetchJobs();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-center p-8">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">
              {intl.formatMessage({
                id: "careers.loading",
                defaultMessage: "Searching for jobs..."
              })}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button variant="outline" size="sm" onClick={handleRetry}>
              {intl.formatMessage({ id: "common.retry", defaultMessage: "Retry" })}
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <>
      {/* Results Summary */}
      {totalJobs > 0 && (
        <div className="mb-6">
          <p className="" text-caption4087="true">
            {intl.formatMessage(
              {
                id: "careers.resultsCount",
                defaultMessage: "Showing {count} {count, plural, one {job} other {jobs}}"
              },
              { count: totalJobs }
            )}
            {keyword && (
              <>
                {" "}
                {intl.formatMessage(
                  { id: "careers.searchResultsFor", defaultMessage: "for \"{keyword}\"" },
                  { keyword }
                )}
              </>
            )}
          </p>
        </div>
      )}

      {jobs.length > 0 ? (
        <div className="flex flex-col gap-6">
          <div className="space-y-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} locale={locale} />
            ))}
          </div>
        </div>
      ) : (
        <EmptyState
          title={intl.formatMessage({
            id: "careers.emptyState.title",
            defaultMessage: "No jobs found"
          })}
          description={intl.formatMessage({
            id: "careers.emptyState.description",
            defaultMessage: "Try searching for a different job title, location, or adjusting your filters."
          })}
          buttonText={intl.formatMessage({
            id: "careers.emptyState.clearFilters",
            defaultMessage: "Clear all filters"
          })}
          href={`/${locale}/careers`}
          locale={locale}
        />
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            locale={locale}
          />
        </div>
      )}
    </>
  );
}