# Sharded Story: Job Portal Frontend Shard

## Story Overview
**As a job seeker,**  
**I want to browse and apply for job opportunities**  
**So that I can find and pursue career opportunities**

---

## 📋 Story Details

### **Shard Information**
- **Shard ID:** JOB-FE-001
- **Shard Name:** Job Portal Frontend
- **Epic:** Job Portal Implementation
- **Priority:** High
- **Estimated Effort:** 5-7 days

### **Business Context**
Job seekers need an intuitive, fast, and comprehensive platform to discover job opportunities.
The interface must support advanced filtering, detailed job information display, seamless
application processes, and mobile-responsive design. This shard focuses on the user-facing
job portal that connects job seekers with employers.

### **Stakeholders**
- **Primary:** Job Seekers, Candidates
- **Secondary:** Employers, HR Teams
- **Supporting:** Product Owner, UX Designer

---

## 🎯 Acceptance Criteria

### **Functional Requirements**
- [ ] **Job Search Interface**: Advanced filtering by location, salary, company, role type
- [ ] **Job Listings Page**: Paginated job results with featured jobs
- [ ] **Job Detail Page**: Comprehensive job information with application form
- [ ] **Company Profiles**: Employer information and job listings
- [ ] **Application Process**: Multi-step application with file uploads
- [ ] **Saved Jobs**: Bookmark functionality for job seekers
- [ ] **Application Tracking**: Status updates and application history
- [ ] **Mobile Optimization**: Fully responsive design for mobile devices
- [ ] **Search Analytics**: Popular searches and trending jobs

### **Non-Functional Requirements**
- [ ] **Performance**: Job search results load within 2 seconds
- [ ] **Accessibility**: WCAG 2.1 Level AA compliance
- [ ] **SEO**: Job listings discoverable by search engines
- [ ] **Scalability**: Support for 1000+ concurrent users

---

## 🏗️ Technical Implementation

### **Next.js Page Structure**

#### **Job Search Page**

```typescript
// src/app/[lang]/jobs/page.tsx
import { getJobs } from '@/lib/api/jobs';
import { JobCard } from '@/components/jobs/JobCard';
import { JobSearchFilters } from '@/components/jobs/JobSearchFilters';
import { JobSearchBar } from '@/components/jobs/JobSearchBar';

export const metadata = {
  title: 'Job Opportunities | Company Name',
  description: 'Find your next career opportunity with our comprehensive job portal',
};

interface JobsPageProps {
  params: { lang: string };
  searchParams: {
    page?: string;
    search?: string;
    location?: string;
    company?: string;
    employmentType?: string;
    experienceLevel?: string;
    salaryMin?: string;
    salaryMax?: string;
    tags?: string;
  };
}

export default async function JobsPage({
  params,
  searchParams
}: JobsPageProps) {
  const page = parseInt(searchParams.page || '1');
  const filters = {
    search: searchParams.search,
    location: searchParams.location,
    company: searchParams.company,
    employmentType: searchParams.employmentType,
    experienceLevel: searchParams.experienceLevel,
    salaryMin: searchParams.salaryMin ? parseInt(searchParams.salaryMin) : undefined,
    salaryMax: searchParams.salaryMax ? parseInt(searchParams.salaryMax) : undefined,
    tags: searchParams.tags ? searchParams.tags.split(',') : undefined,
  };

  const { jobs, totalPages, totalJobs } = await getJobs({
    locale: params.lang,
    page,
    limit: 20,
    ...filters
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          Find Your Next Opportunity
        </h1>
        <p className="text-xl text-muted-foreground mb-6">
          Discover {totalJobs} job opportunities
        </p>
        <JobSearchBar initialSearch={filters.search || ''} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <JobSearchFilters initialFilters={filters} />
        </aside>

        <main className="lg:col-span-3">
          <div className="space-y-4 mb-8">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} locale={params.lang} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              baseUrl={`/${params.lang}/jobs`}
              searchParams={searchParams}
            />
          )}
        </main>
      </div>
    </div>
  );
}

// ISR Configuration
export const revalidate = 300; // Revalidate every 5 minutes
```

#### **Job Detail Page**

```typescript
// src/app/[lang]/jobs/[slug]/page.tsx
import { getJobBySlug } from '@/lib/api/jobs';
import { JobHeader } from '@/components/jobs/JobHeader';
import { JobDescription } from '@/components/jobs/JobDescription';
import { JobApplicationForm } from '@/components/jobs/JobApplicationForm';
import { CompanyInfo } from '@/components/jobs/CompanyInfo';
import { SimilarJobs } from '@/components/jobs/SimilarJobs';
import { notFound } from 'next/navigation';

interface JobDetailPageProps {
  params: { lang: string; slug: string };
}

export async function generateMetadata({ params }: JobDetailPageProps) {
  const job = await getJobBySlug(params.slug, params.lang);

  if (!job) {
    return { title: 'Job Not Found' };
  }

  return {
    title: job.meta?.title?.[params.lang] || job.title[params.lang],
    description: job.meta?.description?.[params.lang] || job.description?.[params.lang]?.slice(0, 160),
    openGraph: {
      title: job.meta?.title?.[params.lang] || job.title[params.lang],
      description: job.meta?.description?.[params.lang] || job.description?.[params.lang]?.slice(0, 160),
      images: job.meta?.image ? [{ url: job.meta.image.url }] : [],
    },
  };
}

export default async function JobDetailPage({
  params
}: JobDetailPageProps) {
  const job = await getJobBySlug(params.slug, params.lang);

  if (!job) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <JobHeader job={job} locale={params.lang} />
          <JobDescription job={job} locale={params.lang} />
          <SimilarJobs
            currentJobId={job.id}
            tags={job.tags}
            locale={params.lang}
          />
        </div>

        <aside className="lg:col-span-1 space-y-6">
          <CompanyInfo company={job.company} locale={params.lang} />
          <JobApplicationForm job={job} locale={params.lang} />
        </aside>
      </div>
    </div>
  );
}

// ISR Configuration
export const revalidate = 300;
```

### **React Components**

#### **JobCard Component**

```typescript
// src/components/jobs/JobCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Job } from '@/types/job';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Building, Clock, DollarSign } from 'lucide-react';

interface JobCardProps {
  job: Job;
  locale: string;
}

export function JobCard({ job, locale }: JobCardProps) {
  const formatSalary = (salary: any) => {
    if (!salary || !salary.isPublic) return null;

    const currency = salary.currency || 'USD';
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    if (salary.min && salary.max) {
      return `${formatter.format(salary.min)} - ${formatter.format(salary.max)}`;
    } else if (salary.min) {
      return `${formatter.format(salary.min)}+`;
    } else if (salary.max) {
      return `Up to ${formatter.format(salary.max)}`;
    }
    return null;
  };

  const getLocationDisplay = (location: any) => {
    if (location.type === 'remote') return 'Remote';
    if (location.city && location.country) {
      return `${location.city}, ${location.country}`;
    }
    return location.city || location.country || 'Location not specified';
  };

  return (
    <article className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start space-x-4">
          {job.company.logo && (
            <Image
              src={job.company.logo.url}
              alt={job.company.name}
              width={48}
              height={48}
              className="rounded-lg"
            />
          )}
          <div className="flex-1">
            <Link
              href={`/${locale}/jobs/${job.slug[locale]}`}
              className="text-xl font-semibold hover:text-primary transition-colors"
            >
              {job.title[locale]}
            </Link>
            <div className="flex items-center space-x-2 text-muted-foreground mt-1">
              <Building className="h-4 w-4" />
              <span>{job.company.name}</span>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Save Job
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
        <div className="flex items-center space-x-1">
          <MapPin className="h-4 w-4" />
          <span>{getLocationDisplay(job.location)}</span>
        </div>

        <div className="flex items-center space-x-1">
          <Clock className="h-4 w-4" />
          <span>{job.employmentType}</span>
        </div>

        {formatSalary(job.salary) && (
          <div className="flex items-center space-x-1">
            <DollarSign className="h-4 w-4" />
            <span>{formatSalary(job.salary)}</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="secondary">{job.experienceLevel}</Badge>
        {job.tags.slice(0, 3).map((tag, index) => (
          <Badge key={index} variant="outline">
            {tag.tag}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Posted {new Date(job.publishedAt).toLocaleDateString(locale)}
          {job.applicationDeadline && (
            <span className="ml-2">
              • Deadline: {new Date(job.applicationDeadline).toLocaleDateString(locale)}
            </span>
          )}
        </div>
        <Link href={`/${locale}/jobs/${job.slug[locale]}`}>
          <Button>View Details</Button>
        </Link>
      </div>
    </article>
  );
}
```

#### **JobSearchFilters Component**

```typescript
// src/components/jobs/JobSearchFilters.tsx
'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface JobSearchFiltersProps {
  initialFilters: {
    location?: string;
    company?: string;
    employmentType?: string;
    experienceLevel?: string;
    salaryMin?: string;
    salaryMax?: string;
    tags?: string[];
  };
}

export function JobSearchFilters({ initialFilters }: JobSearchFiltersProps) {
  const [filters, setFilters] = useState(initialFilters);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (key: string, value: string | string[]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1'); // Reset to first page

    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          params.set(key, value.join(','));
        } else {
          params.delete(key);
        }
      } else if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    setFilters({});
    const params = new URLSearchParams(searchParams);
    ['location', 'company', 'employmentType', 'experienceLevel', 'salaryMin', 'salaryMax', 'tags'].forEach(key => {
      params.delete(key);
    });
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="City, Country"
            value={filters.location || ''}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            placeholder="Company name"
            value={filters.company || ''}
            onChange={(e) => handleFilterChange('company', e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="employmentType">Employment Type</Label>
          <Select
            value={filters.employmentType || ''}
            onValueChange={(value) => handleFilterChange('employmentType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fulltime">Full-time</SelectItem>
              <SelectItem value="parttime">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="freelance">Freelance</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="experienceLevel">Experience Level</Label>
          <Select
            value={filters.experienceLevel || ''}
            onValueChange={(value) => handleFilterChange('experienceLevel', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">Entry Level</SelectItem>
              <SelectItem value="mid">Mid Level</SelectItem>
              <SelectItem value="senior">Senior Level</SelectItem>
              <SelectItem value="lead">Lead/Principal</SelectItem>
              <SelectItem value="executive">Executive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="salaryMin">Min Salary</Label>
            <Input
              id="salaryMin"
              type="number"
              placeholder="0"
              value={filters.salaryMin || ''}
              onChange={(e) => handleFilterChange('salaryMin', e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="salaryMax">Max Salary</Label>
            <Input
              id="salaryMax"
              type="number"
              placeholder="No limit"
              value={filters.salaryMax || ''}
              onChange={(e) => handleFilterChange('salaryMax', e.target.value)}
            />
          </div>
        </div>

        <div className="flex space-x-2">
          <Button onClick={applyFilters} className="flex-1">
            Apply Filters
          </Button>
          <Button onClick={clearFilters} variant="outline">
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

#### **JobApplicationForm Component**

```typescript
// src/components/jobs/JobApplicationForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Job } from '@/types/job';
import { Upload, FileText, Mail, User } from 'lucide-react';

interface JobApplicationFormProps {
  job: Job;
  locale: string;
}

export function JobApplicationForm({ job, locale }: JobApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null as File | null,
    portfolio: null as File | null,
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append('jobId', job.id);
      submitData.append('firstName', formData.firstName);
      submitData.append('lastName', formData.lastName);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('coverLetter', formData.coverLetter);

      if (formData.resume) {
        submitData.append('resume', formData.resume);
      }

      if (formData.portfolio) {
        submitData.append('portfolio', formData.portfolio);
      }

      const response = await fetch('/api/applications', {
        method: 'POST',
        body: submitData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit application');
      }

      router.push(`/${locale}/jobs/${job.slug[locale]}/application-success`);
    } catch (error) {
      console.error('Application submission error:', error);
      // Handle error (show toast, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>Apply for this position</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="coverLetter">Cover Letter</Label>
            <Textarea
              id="coverLetter"
              name="coverLetter"
              placeholder="Tell us why you're interested in this position..."
              value={formData.coverLetter}
              onChange={handleInputChange}
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="resume">Resume/CV *</Label>
            <Input
              id="resume"
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              required
              onChange={handleFileChange}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Accepted formats: PDF, DOC, DOCX
            </p>
          </div>

          <div>
            <Label htmlFor="portfolio">Portfolio/Additional Documents</Label>
            <Input
              id="portfolio"
              name="portfolio"
              type="file"
              accept=".pdf,.doc,.docx,.zip"
              onChange={handleFileChange}
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
```

---

## 🔄 State Management

### **Server-Side State**

```typescript
// Server-side data fetching for job portal
interface JobSearchParams {
  locale: string;
  page?: number;
  limit?: number;
  search?: string;
  location?: string;
  company?: string;
  employmentType?: string;
  experienceLevel?: string;
  salaryMin?: number;
  salaryMax?: number;
  tags?: string[];
}

export async function getJobs({
  locale,
  page = 1,
  limit = 20,
  search = '',
  location = '',
  company = '',
  employmentType = '',
  experienceLevel = '',
  salaryMin,
  salaryMax,
  tags = []
}: JobSearchParams) {
  const params = new URLSearchParams({
    'where[_status][equals]': 'published',
    'locale': locale,
    'page': page.toString(),
    'limit': limit.toString(),
    'sort': '-publishedAt'
  });

  if (search) {
    params.append('where[title][like]', search);
  }

  if (location) {
    params.append('where[location][city][like]', location);
  }

  if (company) {
    params.append('where[company][name][like]', company);
  }

  if (employmentType) {
    params.append('where[employmentType][equals]', employmentType);
  }

  if (experienceLevel) {
    params.append('where[experienceLevel][equals]', experienceLevel);
  }

  if (salaryMin !== undefined) {
    params.append('where[salary][min][greater_than_equal]', salaryMin.toString());
  }

  if (salaryMax !== undefined) {
    params.append('where[salary][max][less_than_equal]', salaryMax.toString());
  }

  if (tags.length > 0) {
    tags.forEach(tag => {
      params.append('where[tags][tag][equals]', tag);
    });
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/jobs?${params}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch jobs');
  }

  return response.json();
}

export async function getJobBySlug(slug: string, locale: string) {
  const params = new URLSearchParams({
    'where[slug][equals]': slug,
    'where[_status][equals]': 'published',
    'locale': locale
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/jobs?${params}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch job');
  }

  const data = await response.json();
  return data.docs[0] || null;
}

export async function getSimilarJobs(jobId: string, tags: any[], locale: string, limit = 3) {
  const tagNames = tags.map(tag => tag.tag);

  const params = new URLSearchParams({
    'where[_status][equals]': 'published',
    'where[id][not_equals]': jobId,
    'locale': locale,
    'limit': limit.toString(),
    'sort': '-publishedAt'
  });

  tagNames.forEach(tag => {
    params.append('where[tags][tag][equals]', tag);
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/jobs?${params}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch similar jobs');
  }

  const data = await response.json();
  return data.docs;
}
```

### **Client-Side State**

```typescript
// src/hooks/useJobSearch.ts
import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function useJobSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = useCallback(async (searchParams: Record<string, string | string[]>) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams(searchParams);

      // Reset to first page when searching
      params.set('page', '1');

      router.push(`?${params.toString()}`);
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  return { search, isLoading, error };
}
```

### **Global State (Context)**

```typescript
// src/contexts/JobPortalContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface SavedJob {
  id: string;
  title: string;
  company: string;
  savedAt: Date;
}

interface JobPortalContextType {
  savedJobs: SavedJob[];
  addSavedJob: (job: SavedJob) => void;
  removeSavedJob: (jobId: string) => void;
  isJobSaved: (jobId: string) => boolean;
  appliedJobs: string[];
  addAppliedJob: (jobId: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const JobPortalContext = createContext<JobPortalContextType | undefined>(undefined);

export function JobPortalProvider({ children }: { children: ReactNode }) {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addSavedJob = (job: SavedJob) => {
    setSavedJobs(prev => [...prev, job]);
    // Persist to localStorage
    localStorage.setItem('savedJobs', JSON.stringify([...savedJobs, job]));
  };

  const removeSavedJob = (jobId: string) => {
    setSavedJobs(prev => prev.filter(job => job.id !== jobId));
    const updated = savedJobs.filter(job => job.id !== jobId);
    localStorage.setItem('savedJobs', JSON.stringify(updated));
  };

  const isJobSaved = (jobId: string) => {
    return savedJobs.some(job => job.id === jobId);
  };

  const addAppliedJob = (jobId: string) => {
    setAppliedJobs(prev => [...prev, jobId]);
    localStorage.setItem('appliedJobs', JSON.stringify([...appliedJobs, jobId]));
  };

  return (
    <JobPortalContext.Provider value={{
      savedJobs,
      addSavedJob,
      removeSavedJob,
      isJobSaved,
      appliedJobs,
      addAppliedJob,
      isLoading,
      setIsLoading
    }}>
      {children}
    </JobPortalContext.Provider>
  );
}

export function useJobPortal() {
  const context = useContext(JobPortalContext);
  if (context === undefined) {
    throw new Error('useJobPortal must be used within a JobPortalProvider');
  }
  return context;
}
```

---

## 🧪 Testing Scenarios

### **Unit Tests**

```typescript
// tests/components/JobCard.test.tsx
import { render, screen } from '@testing-library/react';
import { JobCard } from '@/components/jobs/JobCard';

const mockJob = {
  id: '1',
  title: { en: 'Software Engineer', fr: 'Ingénieur Logiciel' },
  slug: { en: 'software-engineer', fr: 'ingenieur-logiciel' },
  company: {
    name: 'Tech Corp',
    logo: { url: '/logo.png' }
  },
  location: { type: 'remote', city: '', country: '' },
  employmentType: 'fulltime',
  experienceLevel: 'mid',
  salary: { min: 50000, max: 70000, currency: 'USD', isPublic: true },
  tags: [{ tag: 'React' }, { tag: 'TypeScript' }],
  publishedAt: '2025-01-01T00:00:00.000Z',
  applicationDeadline: '2025-02-01T00:00:00.000Z'
};

describe('JobCard', () => {
  test('renders job title and company', () => {
    render(<JobCard job={mockJob} locale="en" />);

    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
  });

  test('displays salary when public', () => {
    render(<JobCard job={mockJob} locale="en" />);

    expect(screen.getByText('$50,000 - $70,000')).toBeInTheDocument();
  });

  test('shows remote location correctly', () => {
    render(<JobCard job={mockJob} locale="en" />);

    expect(screen.getByText('Remote')).toBeInTheDocument();
  });
});
```

### **Integration Tests**

```typescript
// tests/integration/job-portal.test.ts
describe('Job Portal Integration', () => {
  test('job search page loads and displays jobs', async () => {
    // Test full page load with job listings
  });

  test('job detail page renders correctly', async () => {
    // Test individual job page rendering
  });

  test('job application form submits successfully', async () => {
    // Test application submission flow
  });

  test('search filters work correctly', async () => {
    // Test filtering functionality
  });
});
```

### **E2E Tests**

```typescript
// tests/e2e/job-seeker-journey.test.ts
describe('Job Seeker Journey', () => {
  test('user can search and filter jobs', async () => {
    // Navigate to jobs, search, apply filters
  });

  test('user can view job details', async () => {
    // Click job, view details, navigate back
  });

  test('user can apply for a job', async () => {
    // Fill application form, upload resume, submit
  });

  test('user can save and unsave jobs', async () => {
    // Save job, check saved jobs page, unsave
  });
});
```

---

## 📋 Dependencies & Assumptions

### **Dependencies**
- [ ] Job Portal CMS Shard (Jobs, Companies, Tags collections)
- [ ] Shared Infrastructure (Users, Media, Applications collections)
- [ ] Authentication System
- [ ] File upload handling
- [ ] Email notification system
- [ ] Search functionality implementation

### **Assumptions**
- [ ] PayloadCMS API is accessible and stable
- [ ] Job data structure is consistent
- [ ] File storage is properly configured
- [ ] Authentication system provides user context
- [ ] Email service is configured for notifications

---

## 🎯 Success Metrics

### **Functional Success**
- [ ] Job search loads within 2 seconds
- [ ] All job listings display correctly
- [ ] Application form submits successfully
- [ ] Search filters work accurately
- [ ] Mobile responsiveness is perfect

### **Performance Success**
- [ ] Lighthouse scores > 90 for all metrics
- [ ] Core Web Vitals within acceptable ranges
- [ ] Efficient job search and filtering
- [ ] Fast application form submission

### **Quality Success**
- [ ] WCAG 2.1 Level AA compliance
- [ ] Cross-browser compatibility
- [ ] Proper error handling for failed applications
- [ ] SEO metadata correctly implemented

---

## 📝 Implementation Notes

### **Performance Optimization**
1. Implement ISR for job pages
2. Use Next.js Image component for company logos
3. Implement caching strategies for job data
4. Lazy load job cards and components

### **SEO Implementation**
1. Dynamic meta tags for each job
2. Structured data (JSON-LD) for job postings
3. Open Graph tags for social sharing
4. Proper heading hierarchy and semantic HTML

### **Accessibility Implementation**
1. Keyboard navigation support
2. Screen reader compatibility
3. Color contrast compliance
4. Form validation and error messages

### **Mobile Optimization**
1. Responsive design patterns
2. Touch-friendly interactions
3. Optimized form inputs for mobile
4. Fast mobile performance

---

## 🔗 Related Stories

### **Depends On**
- [ ] Job Portal CMS Shard
- [ ] Shared Infrastructure Shard
- [ ] Authentication System

### **Enables**
- [ ] Job Application Management
- [ ] Company Profile Pages
- [ ] Job Seeker Dashboard
- [ ] Analytics and Reporting

### **Related**
- [ ] Job Search Optimization
- [ ] Application Tracking System
- [ ] Employer Dashboard
- [ ] Performance Monitoring

---

**Story Created:** August 27, 2025
**Last Updated:** August 27, 2025
**Status:** Ready for Implementation
**Assigned To:** Frontend Development Team
 
 
