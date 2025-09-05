'use client';

import { useState, useEffect, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { jobsAPI, type JobPost, type SearchJobsParams, JobAPIError } from '@/lib/jobs-api';
import JobCard from './JobCard';
import JobSearchFilters from './JobSearchFilters';
import JobListingSkeleton from './JobListingSkeleton';
import Pagination from './Pagination';
import ErrorBoundary from '@/components/ErrorBoundary';
import { Button } from '@/components/ui/button';
import { AlertCircle, Wifi } from 'lucide-react';

interface JobListingPageProps {
  initialFilters?: Partial<SearchJobsParams>;
}

export default function JobListingPage({ initialFilters = {} }: JobListingPageProps) {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    totalDocs: 0,
    limit: 12,
    page: 1,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const [filters, setFilters] = useState<SearchJobsParams>({
    query: '',
    location: '',
    employmentType: '',
    salaryMin: undefined,
    salaryMax: undefined,
    page: 1,
    limit: 12,
    ...initialFilters,
  });

  const fetchJobs = useCallback(async (searchFilters: SearchJobsParams) => {
    setLoading(true);
    setError(null);

    try {
      const data = await jobsAPI.searchJobs(searchFilters);
      setJobs(data.jobs);
      setPagination(data.pagination);
    } catch (err) {
      if (err instanceof JobAPIError) {
        setError(err.message);
      } else {
        setError('Failed to load jobs. Please try again.');
      }
      setJobs([]);
      setPagination({
        totalDocs: 0,
        limit: 12,
        page: 1,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load and when filters change
  useEffect(() => {
    fetchJobs(filters);
  }, [fetchJobs, filters]);

  const handleFiltersChange = useCallback((newFilters: Partial<SearchJobsParams>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: newFilters.page ?? 1, // Reset to page 1 unless page is explicitly set
    }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters(prev => ({ ...prev, page }));
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleRetry = useCallback(() => {
    fetchJobs(filters);
  }, [fetchJobs, filters]);

  const handleClearFilters = useCallback(() => {
    setFilters({
      query: '',
      location: '',
      employmentType: '',
      salaryMin: undefined,
      salaryMax: undefined,
      page: 1,
      limit: 12,
    });
  }, []);

  return (
    <ErrorBoundary>
      <div className="w-full space-y-8">
        {/* Search and Filters */}
        <div className="bg-card rounded-lg border p-6">
          <JobSearchFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
            loading={loading}
          />
        </div>

        {/* Results Summary */}
        {!loading && !error && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {pagination.totalDocs > 0 ? (
                <FormattedMessage
                  id="jobs.results.showing"
                  defaultMessage="Showing {start}-{end} of {total} jobs"
                  values={{
                    start: ((pagination.page - 1) * pagination.limit) + 1,
                    end: Math.min(pagination.page * pagination.limit, pagination.totalDocs),
                    total: pagination.totalDocs,
                  }}
                />
              ) : (
                <FormattedMessage
                  id="jobs.results.none"
                  defaultMessage="No jobs found matching your criteria"
                />
              )}
            </div>
            
            {pagination.totalDocs > 0 && (
              <div className="text-sm text-muted-foreground">
                <FormattedMessage
                  id="jobs.results.page"
                  defaultMessage="Page {current} of {total}"
                  values={{
                    current: pagination.page,
                    total: pagination.totalPages,
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="flex justify-center mb-4">
                {error.includes('Network') ? (
                  <Wifi className="h-12 w-12 text-muted-foreground" />
                ) : (
                  <AlertCircle className="h-12 w-12 text-destructive" />
                )}
              </div>
              <h3 className="text-lg font-semibold mb-2">
                <FormattedMessage
                  id="jobs.error.title"
                  defaultMessage="Unable to Load Jobs"
                />
              </h3>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Button onClick={handleRetry} variant="outline">
                <FormattedMessage
                  id="jobs.error.retry"
                  defaultMessage="Try Again"
                />
              </Button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <JobListingSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Jobs Grid */}
        {!loading && !error && jobs.length > 0 && (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && !error && jobs.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold mb-2">
                <FormattedMessage
                  id="jobs.empty.title"
                  defaultMessage="No Jobs Found"
                />
              </h3>
              <p className="text-muted-foreground mb-6">
                <FormattedMessage
                  id="jobs.empty.description"
                  defaultMessage="Try adjusting your search criteria or check back later for new opportunities."
                />
              </p>
              <Button onClick={handleClearFilters} variant="outline">
                <FormattedMessage
                  id="jobs.empty.clear"
                  defaultMessage="Clear All Filters"
                />
              </Button>
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}