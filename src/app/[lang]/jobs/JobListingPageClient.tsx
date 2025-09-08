"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import JobCard from "@/components/jobs/JobCard";
import JobSearchFilters from "@/components/jobs/JobSearchFilters";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { searchJobs } from "@/lib/jobs-api";
import type { JobPost, JobSearchParams } from "@/lib/jobs-api";
import type { Locale } from "@/lib/definitions";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";

interface JobListingPageClientProps {
  locale: Locale;
}

// Job Card Skeleton Component (following your existing patterns)
function JobCardSkeleton() {
  return (
    <div className="border rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-12 w-12 rounded-lg" />
      </div>
      <div className="space-y-2">
        <div className="flex gap-4">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
      <div className="flex justify-between items-center pt-3 border-t">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  );
}

function JobListingPageClientInternal({ locale }: JobListingPageClientProps) {
  const intl = useIntl();
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalJobs, setTotalJobs] = useState(0);
  const [filters, setFilters] = useState<JobSearchParams>({
    page: 1,
    limit: 12
  });

  const fetchJobs = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await searchJobs(filters);
      setJobs(response.jobs);
      setTotalJobs(response.pagination.totalDocs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching jobs');
      setJobs([]);
      setTotalJobs(0);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = Math.ceil(totalJobs / (filters.limit || 12));
  const currentPage = filters.page || 1;

  // Generate pagination numbers (following common pagination patterns)
  const getPaginationNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <Button onClick={fetchJobs} variant="outline">
          {intl.formatMessage({ id: "jobs.tryAgain", defaultMessage: "Try Again" })}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <JobSearchFilters 
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={() => setFilters({ page: 1, limit: 12 })}
        loading={isLoading}
      />

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="" text-caption4427>
          {isLoading ? (
            <Skeleton className="h-4 w-40" />
          ) : (
            intl.formatMessage(
              { 
                id: "jobs.resultsCount", 
                defaultMessage: "Showing {count} {count, plural, one {job} other {jobs}}" 
              },
              { count: totalJobs }
            )
          )}
        </p>
      </div>

      {/* Job Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <JobCardSkeleton key={index} />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            {intl.formatMessage({ 
              id: "jobs.noResults", 
              defaultMessage: "No jobs found matching your criteria." 
            })}
          </p>
          <Button 
            onClick={() => setFilters({ page: 1, limit: 12 })} 
            variant="outline"
          >
            {intl.formatMessage({ id: "jobs.clearFilters", defaultMessage: "Clear Filters" })}
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
            {intl.formatMessage({ id: "jobs.previous", defaultMessage: "Previous" })}
          </Button>
          
          {getPaginationNumbers().map((pageNumber, index) => (
            <Button
              key={index}
              variant={pageNumber === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => typeof pageNumber === 'number' && handlePageChange(pageNumber)}
              disabled={pageNumber === '...'}
              className="min-w-[40px]"
            >
              {pageNumber}
            </Button>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            {intl.formatMessage({ id: "jobs.next", defaultMessage: "Next" })}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default function JobListingPageClient(props: JobListingPageClientProps) {
  return (
    <ErrorBoundary>
      <JobListingPageClientInternal {...props} />
    </ErrorBoundary>
  );
}