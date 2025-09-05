'use client';

import { FormattedMessage } from 'react-intl';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  MoreHorizontal 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import ErrorBoundary from '@/components/ErrorBoundary';

interface PaginationProps {
  pagination: {
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalDocs: number;
    limit: number;
  };
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({ pagination, onPageChange, className }: PaginationProps) {
  const { page, totalPages, hasNextPage, hasPrevPage, totalDocs, limit } = pagination;

  // Don't render if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  // Calculate page numbers to show
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    // Always show first page
    range.push(1);

    // Add pages around current page
    for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) {
      range.push(i);
    }

    // Always show last page if there are multiple pages
    if (totalPages > 1) {
      range.push(totalPages);
    }

    // Add dots where there are gaps
    let prev = 0;
    for (const i of range) {
      if (prev && i - prev > 1) {
        rangeWithDots.push('...');
      }
      rangeWithDots.push(i);
      prev = i;
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, totalDocs);

  return (
    <ErrorBoundary>
      <div className={cn("flex flex-col sm:flex-row items-center justify-between gap-4", className)}>
        {/* Results Info */}
        <div className="text-sm text-muted-foreground">
          <FormattedMessage
            id="pagination.showing"
            defaultMessage="Showing {start} to {end} of {total} results"
            values={{
              start: startItem,
              end: endItem,
              total: totalDocs,
            }}
          />
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-1">
          {/* First Page Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(1)}
            disabled={!hasPrevPage}
            className="hidden sm:flex h-8 w-8 p-0"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          {/* Previous Page Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page - 1)}
            disabled={!hasPrevPage}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {visiblePages.map((pageNum, index) => (
              <div key={index}>
                {pageNum === '...' ? (
                  <div className="flex h-8 w-8 items-center justify-center">
                    <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                  </div>
                ) : (
                  <Button
                    variant={pageNum === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => onPageChange(pageNum as number)}
                    className={cn(
                      "h-8 w-8 p-0",
                      pageNum === page && "bg-primary text-primary-foreground"
                    )}
                  >
                    {pageNum}
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Next Page Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(page + 1)}
            disabled={!hasNextPage}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Last Page Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(totalPages)}
            disabled={!hasNextPage}
            className="hidden sm:flex h-8 w-8 p-0"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Mobile Page Info */}
        <div className="sm:hidden text-xs text-muted-foreground">
          <FormattedMessage
            id="pagination.page"
            defaultMessage="Page {current} of {total}"
            values={{
              current: page,
              total: totalPages,
            }}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}