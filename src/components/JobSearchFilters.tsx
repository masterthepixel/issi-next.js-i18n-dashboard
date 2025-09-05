"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { EMPLOYMENT_TYPE_OPTIONS, POPULAR_LOCATIONS } from "@/lib/jobs-api";
import type { JobSearchParams } from "@/lib/jobs-api";
import { cn } from "@/lib/utils";
import { Filter, Search, X } from "lucide-react";
import { useState } from "react";
import { useIntl } from "react-intl";

interface JobSearchFiltersProps {
  filters: JobSearchParams;
  onFiltersChange: (filters: JobSearchParams) => void;
  className?: string;
  isLoading?: boolean;
}

function JobSearchFiltersInternal({ 
  filters, 
  onFiltersChange, 
  className, 
  isLoading = false 
}: JobSearchFiltersProps) {
  const intl = useIntl();
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const updateFilter = (key: keyof JobSearchParams, value: string | number | undefined) => {
    onFiltersChange({
      ...filters,
      [key]: value,
      page: 1 // Reset to page 1 when filters change
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      page: 1,
      limit: filters.limit || 10
    });
  };

  const hasActiveFilters = Boolean(
    filters.query || 
    filters.location || 
    filters.employmentType || 
    filters.salaryMin || 
    filters.salaryMax
  );

  return (
    <Card className={cn("mb-6", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Search className="h-5 w-5" />
            {intl.formatMessage({ id: "jobs.searchJobs", defaultMessage: "Search Jobs" })}
          </CardTitle>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                disabled={isLoading}
              >
                <X className="h-4 w-4 mr-1" />
                {intl.formatMessage({ id: "jobs.clearFilters", defaultMessage: "Clear" })}
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              <Filter className="h-4 w-4 mr-1" />
              {intl.formatMessage({ 
                id: showAdvancedFilters ? "jobs.hideFilters" : "jobs.showFilters", 
                defaultMessage: showAdvancedFilters ? "Hide Filters" : "Advanced Filters" 
              })}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search Query */}
        <div className="space-y-2">
          <Label htmlFor="job-search">
            {intl.formatMessage({ id: "jobs.searchByKeyword", defaultMessage: "Search by keyword" })}
          </Label>
          <Input
            id="job-search"
            placeholder={intl.formatMessage({ 
              id: "jobs.searchPlaceholder", 
              defaultMessage: "Job title, company, or keywords..." 
            })}
            value={filters.query || ''}
            onChange={(e) => updateFilter('query', e.target.value)}
            disabled={isLoading}
          />
        </div>

        {/* Employment Type Toggle Group (following your ProductsBentoGrid pattern) */}
        <div className="space-y-3">
          <Label>
            {intl.formatMessage({ id: "jobs.employmentType", defaultMessage: "Employment Type" })}
          </Label>
          <ToggleGroup 
            type="single" 
            value={filters.employmentType || ''} 
            onValueChange={(value) => updateFilter('employmentType', value)}
            className="justify-start flex-wrap"
          >
            {EMPLOYMENT_TYPE_OPTIONS.map((option) => (
              <ToggleGroupItem 
                key={option.value} 
                value={option.value}
                className="text-sm"
                disabled={isLoading}
              >
                {option.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="space-y-4 pt-4 border-t">
            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location-select">
                {intl.formatMessage({ id: "jobs.location", defaultMessage: "Location" })}
              </Label>
              <Select 
                value={filters.location || ''} 
                onValueChange={(value) => updateFilter('location', value === '' ? undefined : value)}
                disabled={isLoading}
              >
                <SelectTrigger id="location-select">
                  <SelectValue placeholder={intl.formatMessage({ 
                    id: "jobs.selectLocation", 
                    defaultMessage: "Select location..." 
                  })} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">
                    {intl.formatMessage({ id: "jobs.allLocations", defaultMessage: "All Locations" })}
                  </SelectItem>
                  {POPULAR_LOCATIONS.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Salary Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salary-min">
                  {intl.formatMessage({ id: "jobs.salaryMin", defaultMessage: "Minimum Salary" })}
                </Label>
                <Input
                  id="salary-min"
                  type="number"
                  placeholder="50000"
                  value={filters.salaryMin || ''}
                  onChange={(e) => updateFilter('salaryMin', e.target.value ? Number(e.target.value) : undefined)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salary-max">
                  {intl.formatMessage({ id: "jobs.salaryMax", defaultMessage: "Maximum Salary" })}
                </Label>
                <Input
                  id="salary-max"
                  type="number"
                  placeholder="150000"
                  value={filters.salaryMax || ''}
                  onChange={(e) => updateFilter('salaryMax', e.target.value ? Number(e.target.value) : undefined)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function JobSearchFilters(props: JobSearchFiltersProps) {
  return (
    <ErrorBoundary>
      <JobSearchFiltersInternal {...props} />
    </ErrorBoundary>
  );
}