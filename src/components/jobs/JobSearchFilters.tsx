'use client';

import { useState, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  X, 
  Filter,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  EMPLOYMENT_TYPE_OPTIONS, 
  POPULAR_LOCATIONS, 
  type SearchJobsParams 
} from '@/lib/jobs-api';
import ErrorBoundary from '@/components/ErrorBoundary';
import { cn } from '@/lib/utils';

interface JobSearchFiltersProps {
  filters: SearchJobsParams;
  onFiltersChange: (filters: Partial<SearchJobsParams>) => void;
  onClearFilters: () => void;
  loading?: boolean;
  className?: string;
}

export default function JobSearchFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  loading = false,
  className
}: JobSearchFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [localQuery, setLocalQuery] = useState(filters.query || '');

  // Handle search input with debounced submission
  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onFiltersChange({ query: localQuery, page: 1 });
  }, [localQuery, onFiltersChange]);

  const handleSearchInputChange = useCallback((value: string) => {
    setLocalQuery(value);
  }, []);

  const handleFilterChange = useCallback((key: keyof SearchJobsParams, value: string | number | undefined) => {
    onFiltersChange({ [key]: value, page: 1 });
  }, [onFiltersChange]);

  const hasActiveFilters = Boolean(
    filters.query || 
    filters.location || 
    filters.employmentType || 
    filters.salaryMin || 
    filters.salaryMax
  );

  const salaryRanges = [
    { label: 'Any Salary', min: undefined, max: undefined },
    { label: '$40K - $60K', min: 40000, max: 60000 },
    { label: '$60K - $80K', min: 60000, max: 80000 },
    { label: '$80K - $100K', min: 80000, max: 100000 },
    { label: '$100K - $150K', min: 100000, max: 150000 },
    { label: '$150K+', min: 150000, max: undefined },
  ];

  const currentSalaryRange = salaryRanges.find(
    range => range.min === filters.salaryMin && range.max === filters.salaryMax
  )?.label || 'Any Salary';

  return (
    <ErrorBoundary>
      <div className={cn("space-y-4", className)}>
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search jobs by title, company, or keywords..."
                value={localQuery}
                onChange={(e) => handleSearchInputChange(e.target.value)}
                disabled={loading}
                className="pl-10"
              />
            </div>
            <Button 
              type="submit" 
              disabled={loading}
              className="px-8"
            >
              <FormattedMessage id="jobs.search.button" defaultMessage="Search" />
            </Button>
          </div>
        </form>

        {/* Filter Toggle for Mobile */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="md:hidden"
          >
            <Filter className="h-4 w-4 mr-2" />
            <FormattedMessage id="jobs.filters.toggle" defaultMessage="Filters" />
            {hasActiveFilters && (
              <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {Object.values(filters).filter(Boolean).length - 2} {/* Exclude page and limit */}
              </span>
            )}
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 ml-2" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-2" />
            )}
          </Button>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-2" />
              <FormattedMessage id="jobs.filters.clear" defaultMessage="Clear All" />
            </Button>
          )}
        </div>

        {/* Filters Grid */}
        <div className={cn(
          "grid gap-4",
          "md:grid-cols-3 lg:grid-cols-4",
          !isExpanded && "hidden md:grid"
        )}>
          {/* Location Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <FormattedMessage id="jobs.filters.location" defaultMessage="Location" />
            </Label>
            <Select
              value={filters.location || ''}
              onValueChange={(value) => handleFilterChange('location', value || undefined)}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">
                  <FormattedMessage id="jobs.filters.anyLocation" defaultMessage="Any Location" />
                </SelectItem>
                {POPULAR_LOCATIONS.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Employment Type Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <FormattedMessage id="jobs.filters.type" defaultMessage="Job Type" />
            </Label>
            <Select
              value={filters.employmentType || ''}
              onValueChange={(value) => handleFilterChange('employmentType', value || undefined)}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                {EMPLOYMENT_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Salary Range Filter */}
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <FormattedMessage id="jobs.filters.salary" defaultMessage="Salary Range" />
            </Label>
            <Select
              value={currentSalaryRange}
              onValueChange={(value) => {
                const range = salaryRanges.find(r => r.label === value);
                if (range) {
                  onFiltersChange({
                    salaryMin: range.min,
                    salaryMax: range.max,
                    page: 1
                  });
                }
              }}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any Salary" />
              </SelectTrigger>
              <SelectContent>
                {salaryRanges.map((range) => (
                  <SelectItem key={range.label} value={range.label}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Custom Salary Input (Optional) */}
          <div className="space-y-2 md:col-span-3 lg:col-span-1">
            <Label className="text-sm font-medium">
              <FormattedMessage id="jobs.filters.customSalary" defaultMessage="Custom Min Salary" />
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="number"
                placeholder="50000"
                value={filters.salaryMin || ''}
                onChange={(e) => {
                  const value = e.target.value ? parseInt(e.target.value) : undefined;
                  handleFilterChange('salaryMin', value);
                }}
                disabled={loading}
                className="pl-10"
                min="0"
                step="1000"
              />
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
            <span className="text-sm font-medium text-muted-foreground">
              <FormattedMessage id="jobs.filters.active" defaultMessage="Active filters:" />
            </span>
            
            {filters.query && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleFilterChange('query', undefined)}
                className="h-6 px-2 text-xs"
              >
                Search: "{filters.query}"
                <X className="h-3 w-3 ml-1" />
              </Button>
            )}
            
            {filters.location && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleFilterChange('location', undefined)}
                className="h-6 px-2 text-xs"
              >
                {filters.location}
                <X className="h-3 w-3 ml-1" />
              </Button>
            )}
            
            {filters.employmentType && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleFilterChange('employmentType', undefined)}
                className="h-6 px-2 text-xs"
              >
                {EMPLOYMENT_TYPE_OPTIONS.find(opt => opt.value === filters.employmentType)?.label}
                <X className="h-3 w-3 ml-1" />
              </Button>
            )}
            
            {(filters.salaryMin || filters.salaryMax) && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onFiltersChange({ salaryMin: undefined, salaryMax: undefined, page: 1 })}
                className="h-6 px-2 text-xs"
              >
                {currentSalaryRange}
                <X className="h-3 w-3 ml-1" />
              </Button>
            )}
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}