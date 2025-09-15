"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { countryList, popularLocations } from "@/lib/utils/countriesList";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";

interface JobFiltersProps {
  locale?: string;
  totalJobs?: number;
  keyword?: string;
}

export function JobFilters({ locale = "en", totalJobs = 0, keyword = "" }: JobFiltersProps) {
  const intl = useIntl();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentTotalJobs, setCurrentTotalJobs] = useState(totalJobs);

  // Read totalJobs from sessionStorage and update state
  useEffect(() => {
    const checkTotalJobs = () => {
      if (typeof window !== 'undefined') {
        const storedTotalJobs = sessionStorage.getItem('careers_totalJobs');
        if (storedTotalJobs) {
          const parsedTotalJobs = parseInt(storedTotalJobs, 10);
          if (parsedTotalJobs !== currentTotalJobs) {
            setCurrentTotalJobs(parsedTotalJobs);
          }
        }
      }
    };

    // Check immediately
    checkTotalJobs();

    // Set up interval to check for updates
    const interval = setInterval(checkTotalJobs, 500);

    return () => clearInterval(interval);
  }, [currentTotalJobs]);

  const jobTypes = ["full-time", "part-time", "contract", "internship"];

  // Get current filters from URL
  const currentJobTypes = searchParams.get("employmentType")?.split(",") || [];
  const currentLocation = searchParams.get("location") || "";
  const currentMinSalary = searchParams.get("minSalary") || "";
  const currentMaxSalary = searchParams.get("maxSalary") || "";
  const currentKeyword = searchParams.get("q") || "";
  const currentSort = searchParams.get("sort") || "";

  const dateSortOptions = [
    { value: "1day", label: "careers.sort.today", defaultMessage: "Today" },
    { value: "1week", label: "careers.sort.thisWeek", defaultMessage: "This Week" },
    { value: "1month", label: "careers.sort.thisMonth", defaultMessage: "This Month" },
    { value: "1year", label: "careers.sort.thisYear", defaultMessage: "This Year" },
  ];

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      // Reset to page 1 when filters change
      if (name !== "page") {
        params.set("page", "1");
      }

      return params.toString();
    },
    [searchParams]
  );

  const handleJobTypeChange = (type: string, checked: boolean) => {
    const current = new Set(currentJobTypes);
    if (checked) {
      current.add(type);
    } else {
      current.delete(type);
    }

    const newValue = Array.from(current).join(",");
    router.push(`/${locale}/careers?${createQueryString("employmentType", newValue)}`);
  };

  const handleLocationChange = (location: string) => {
    router.push(`/${locale}/careers?${createQueryString("location", location)}`);
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(`/${locale}/careers?${createQueryString("q", e.target.value)}`);
  };

  const handleMinSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(`/${locale}/careers?${createQueryString("minSalary", e.target.value)}`);
  };

  const handleMaxSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    router.push(`/${locale}/careers?${createQueryString("maxSalary", e.target.value)}`);
  };

  const handleSortChange = (sortValue: string) => {
    router.push(`/${locale}/careers?${createQueryString("sort", sortValue)}`);
  };

  const clearFilters = () => {
    router.push(`/${locale}/careers`);
  };

  const getJobTypeLabel = (type: string): string => {
    const labels = {
      "full-time": intl.formatMessage({ id: "careers.jobType.fullTime", defaultMessage: "Full Time" }),
      "part-time": intl.formatMessage({ id: "careers.jobType.partTime", defaultMessage: "Part Time" }),
      "contract": intl.formatMessage({ id: "careers.jobType.contract", defaultMessage: "Contract" }),
      "internship": intl.formatMessage({ id: "careers.jobType.internship", defaultMessage: "Internship" }),
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <Card className="col-span-1 h-fit">
      <CardHeader className="space-y-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-semibold">
            {intl.formatMessage({ id: "careers.filters.title", defaultMessage: "Filter" })}
          </CardTitle>
          <Button
            variant="destructive"
            size="sm"
            className="h-8"
            onClick={clearFilters}
          >
            <span className="mr-2">
              {intl.formatMessage({ id: "careers.filters.clearAll", defaultMessage: "Clear all" })}
            </span>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Separator />
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Results Summary */}
        {currentTotalJobs > 0 && (
          <div className="pb-2 border-b">
            <p className="text-sm text-muted-foreground">
              {intl.formatMessage(
                {
                  id: "careers.resultsCount",
                  defaultMessage: "Showing {count} {count, plural, one {job} other {jobs}}"
                },
                { count: currentTotalJobs }
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

        {/* Keyword Search */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">
            {intl.formatMessage({ id: "careers.filters.keyword", defaultMessage: "Keyword" })}
          </Label>
          <Input
            placeholder={intl.formatMessage({
              id: "careers.filters.keywordPlaceholder",
              defaultMessage: "Search for jobs..."
            })}
            value={currentKeyword}
            onChange={handleKeywordChange}
            className="w-full"
          />
        </div>

        <Separator />

        {/* Date Posted Filter */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">
            {intl.formatMessage({ id: "careers.filters.datePosted", defaultMessage: "Date Posted" })}
          </Label>
          <div className="flex flex-wrap gap-2">
            {dateSortOptions.map((option) => (
              <Badge
                key={option.value}
                variant={currentSort === option.value ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${currentSort === option.value
                    ? "bg-primary text-primary-foreground hover:bg-primary/80"
                    : "bg-primary text-primary-foreground hover:bg-primary/80 border-primary"
                  }`}
                onClick={() => handleSortChange(option.value)}
              >
                {intl.formatMessage({
                  id: option.label,
                  defaultMessage: option.defaultMessage
                })}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Job Type Filter */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">
            {intl.formatMessage({ id: "careers.filters.jobType", defaultMessage: "Job Type" })}
          </Label>
          <div className="grid grid-cols-2 gap-4">
            {jobTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={type.toLowerCase()}
                  checked={currentJobTypes.includes(type)}
                  onCheckedChange={(checked) =>
                    handleJobTypeChange(type, checked as boolean)
                  }
                />
                <Label
                  htmlFor={type.toLowerCase()}

                >
                  {getJobTypeLabel(type)}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Location Filter */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">
            {intl.formatMessage({ id: "careers.filters.location", defaultMessage: "Location" })}
          </Label>
          <Select value={currentLocation} onValueChange={handleLocationChange}>
            <SelectTrigger>
              <SelectValue placeholder={intl.formatMessage({
                id: "careers.filters.selectLocation",
                defaultMessage: "Select Location"
              })} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>
                  {intl.formatMessage({ id: "careers.filters.remote", defaultMessage: "Remote" })}
                </SelectLabel>
                <SelectItem value="remote">
                  <span>🌍</span>
                  <span className="pl-2">
                    {intl.formatMessage({
                      id: "careers.filters.worldwide",
                      defaultMessage: "Worldwide / Remote"
                    })}
                  </span>
                </SelectItem>
              </SelectGroup>

              <SelectGroup>
                <SelectLabel>
                  {intl.formatMessage({ id: "careers.filters.popular", defaultMessage: "Popular" })}
                </SelectLabel>
                {popularLocations
                  .filter(location => location !== "Remote/Worldwide")
                  .map((location) => {
                    const country = countryList.find(c => c.name === location);
                    return (
                      <SelectItem value={location} key={location}>
                        <span>{country?.flagEmoji || "📍"}</span>
                        <span className="pl-2">{location}</span>
                      </SelectItem>
                    );
                  })}
              </SelectGroup>

              <SelectGroup>
                <SelectLabel>
                  {intl.formatMessage({ id: "careers.filters.allLocations", defaultMessage: "All Locations" })}
                </SelectLabel>
                {countryList
                  .filter(country => !popularLocations.includes(country.name))
                  .map((country) => (
                    <SelectItem value={country.name} key={country.name}>
                      <span>{country.flagEmoji}</span>
                      <span className="pl-2">{country.name}</span>
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Salary Range Filter */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">
            {intl.formatMessage({ id: "careers.filters.salaryRange", defaultMessage: "Salary Range" })}
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minSalary" className="">
                {intl.formatMessage({ id: "careers.filters.minSalary", defaultMessage: "Min Salary" })}
              </Label>
              <Input
                id="minSalary"
                type="number"
                placeholder="0"
                value={currentMinSalary}
                onChange={handleMinSalaryChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxSalary" className="">
                {intl.formatMessage({ id: "careers.filters.maxSalary", defaultMessage: "Max Salary" })}
              </Label>
              <Input
                id="maxSalary"
                type="number"
                placeholder="500,000"
                value={currentMaxSalary}
                onChange={handleMaxSalaryChange}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
