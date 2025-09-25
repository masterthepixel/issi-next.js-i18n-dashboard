"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useIntl } from "react-intl";

interface PaginationComponentProps {
  totalPages: number;
  currentPage: number;
  locale?: string;
}

export function PaginationComponent({ 
  totalPages, 
  currentPage, 
  locale = "en" 
}: PaginationComponentProps) {
  const intl = useIntl();
  const router = useRouter();
  const searchParams = useSearchParams();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `/${locale}/careers?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      router.push(createPageUrl(page));
    }
  };

  // Generate page numbers to display
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, -1); // -1 represents "..."
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push(-2, totalPages); // -2 represents "..."
    } else {
      if (totalPages > 1) {
        rangeWithDots.push(totalPages);
      }
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages();

  return (
    <nav aria-label="Pagination navigation" className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex items-center gap-1"
      >
        <ChevronLeft className="h-4 w-4" />
        {intl.formatMessage({ id: "pagination.previous", defaultMessage: "Previous" })}
      </Button>

      <div className="flex items-center space-x-1">
        {visiblePages.map((page, index) => {
          if (page === -1 || page === -2) {
            return (
              <Button
                key={`dots-${index}`}
                variant="ghost"
                size="sm"
                disabled
                className="w-9 h-9"
                aria-label="More pages"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            );
          }

          return (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageChange(page)}
              className="w-9 h-9"
              aria-label={currentPage === page ? `Current page ${page}` : `Go to page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex items-center gap-1"
      >
        {intl.formatMessage({ id: "pagination.next", defaultMessage: "Next" })}
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  );
}
