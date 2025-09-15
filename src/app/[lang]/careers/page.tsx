import APIErrorBoundary from "@/components/APIErrorBoundary";
import { JobFilters } from "@/components/careers/JobFilters";
import JobListings from "@/components/careers/JobListings";
import JobListingsLoading from "@/components/careers/JobListingsLoading";
import ErrorBoundary from "@/components/ErrorBoundary";
import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";
import { Suspense } from "react";

export const metadata = {
  title: "Careers - ISSI - International Software Systems International",
  description: "Join ISSI's team of talented professionals. Explore career opportunities and grow with us in software development and technology.",
};

// ISR: Regenerate page every 5 minutes (300 seconds)
export const revalidate = 300;

interface SearchParamsProps {
  params: Promise<{
    lang: Locale;
  }>;
  searchParams: Promise<{
    page?: string;
    employmentType?: string;
    location?: string;
    q?: string;
    minSalary?: string;
    maxSalary?: string;
    sort?: string;
  }>;
}

export default async function CareersPage({ params, searchParams }: SearchParamsProps) {
  const { lang } = await params;
  const searchParamsResolved = await searchParams;

  const intl = await getIntl(lang);

  const currentPage = Number(searchParamsResolved.page) || 1;
  const employmentTypes = searchParamsResolved.employmentType?.split(",") || [];
  const location = searchParamsResolved.location || "";
  const keyword = searchParamsResolved.q || "";
  const minSalary = searchParamsResolved.minSalary || "";
  const maxSalary = searchParamsResolved.maxSalary || "";
  const sort = searchParamsResolved.sort || "";

  // Create a composite key from all filter parameters for Suspense
  const filterKey = `page=${currentPage};types=${employmentTypes.join(",")};location=${location};q=${keyword};minSalary=${minSalary};maxSalary=${maxSalary};sort=${sort}`;

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            {intl.formatMessage({
              id: "careers.title",
              defaultMessage: "Career Opportunities"
            })}
          </h1>
          <p className="text-muted-foreground text-lg">
            {intl.formatMessage({
              id: "careers.description",
              defaultMessage: "Discover your next career opportunity with ISSI. Join our team of talented professionals building innovative software solutions."
            })}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <JobFiltersWrapper
              locale={lang}
              keyword={keyword}
            />
          </div>

          <div className="col-span-1 lg:col-span-3 flex flex-col gap-6">
            <Suspense key={filterKey} fallback={<JobListingsLoading />}>
              <APIErrorBoundary>
                <JobListingsClient
                  currentPage={currentPage}
                  employmentType={employmentTypes}
                  location={location}
                  keyword={keyword}
                  minSalary={minSalary}
                  maxSalary={maxSalary}
                  sort={sort}
                  locale={lang}
                />
              </APIErrorBoundary>
            </Suspense>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

// Client wrapper component for JobListings
function JobListingsClient(props: {
  currentPage: number;
  employmentType: string[];
  location: string;
  keyword: string;
  minSalary: string;
  maxSalary: string;
  sort: string;
  locale: string;
}) {
  return <JobListings {...props} />;
}

// Client wrapper component for JobFilters with shared state
function JobFiltersWrapper(props: {
  locale: string;
  keyword: string;
}) {
  return <JobFilters locale={props.locale} keyword={props.keyword} />;
}