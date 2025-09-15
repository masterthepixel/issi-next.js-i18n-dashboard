"use client";

import { careersAPI } from "@/lib/api/careers";
import type { Job } from "@/lib/schemas/job";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
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
  sort?: string;
  locale?: string;
}

export default function JobListings({
  currentPage,
  employmentType = [],
  location = "",
  keyword = "",
  minSalary = "",
  maxSalary = "",
  sort = "",
  locale = "en",
}: JobListingsProps) {
  const intl = useIntl();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalJobs, setTotalJobs] = useState(0);

  const fetchJobs = useCallback(async () => {
    console.log("🚀 JobListings: fetchJobs called with params:", {
      currentPage,
      keyword,
      employmentType,
      location,
      minSalary,
      maxSalary,
      sort
    });
    setIsLoading(true);

    try {
      const searchParams = {
        page: currentPage,
        limit: 7, // Match reference implementation
        q: keyword || undefined,
        employmentType: employmentType.length > 0 ? employmentType : undefined, // Pass all employment types
        location: location || undefined,
        salaryFrom: minSalary ? parseInt(minSalary) : undefined,
        salaryTo: maxSalary ? parseInt(maxSalary) : undefined,
        sort: sort || undefined,
      };

      // Filter out undefined values
      const cleanedParams = Object.fromEntries(
        Object.entries(searchParams).filter(([_, value]) => value !== undefined)
      );

      try {
        console.log("🔍 JobListings: Calling careersAPI.searchJobs with cleaned params:", cleanedParams);
        const result = await careersAPI.searchJobs(cleanedParams);
        console.log("✅ JobListings: API call successful:", {
          jobsCount: result.jobs.length,
          totalJobs: result.pagination.totalDocs,
          hasJobs: result.jobs.length > 0,
          firstJob: result.jobs[0]
        });

        let filteredJobs = result.jobs;

        // Apply date filtering on the frontend if sort parameter specifies a date range
        if (sort && sort !== "") {
          const now = new Date();
          let dateThreshold: Date | null = null;

          switch (sort) {
            case "1day":
              dateThreshold = new Date(now.getTime() - 24 * 60 * 60 * 1000);
              break;
            case "1week":
              dateThreshold = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
              break;
            case "1month":
              dateThreshold = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
              break;
            case "1year":
              dateThreshold = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
              break;
          }

          if (dateThreshold) {
            filteredJobs = result.jobs.filter(job => {
              const jobDate = new Date(job.createdAt);
              return jobDate >= dateThreshold!;
            });
          }
        }

        setJobs(filteredJobs);
        console.log("🔄 JobListings: State updated:", {
          jobsCount: filteredJobs.length,
          totalPages: result.pagination.totalPages,
          totalJobs: filteredJobs.length
        });
        setTotalPages(result.pagination.totalPages);
        setTotalJobs(filteredJobs.length); // Update total count based on filtered results
      } catch (apiError) {
        console.error("JobListings: API call failed:", apiError);
        throw apiError;
      }
    } catch (err) {
      console.error("JobListings: Error fetching jobs:", err);
      const error = err instanceof Error ? err : new Error("Failed to fetch jobs");
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, employmentType, location, keyword, minSalary, maxSalary, sort]);

  useEffect(() => {
    console.log("🔥 JobListings: useEffect triggered, calling fetchJobs");
    fetchJobs();
  }, [fetchJobs]);

  // Throw error during render so the error boundary can catch it
  if (error) {
    throw error;
  }

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

  console.log("🎯 JobListings: About to render with state:", { jobsCount: jobs.length, totalJobs, isLoading, error: !!error });

  return (
    <>
      {/* Results Summary */}
      {totalJobs > 0 && (
        <div className="mb-6">
          <p>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
