/**
 * PayloadCMS Job Board API Client
 * Uses existing project patterns and utilities
 */

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'https://issi-dashboard-payloadcms.vercel.app';

// Authentication for PayloadCMS
const PAYLOAD_EMAIL = 'admin@issi.com';
const PAYLOAD_PASSWORD = 'password123!';

// Token management
let authToken: string | null = null;
let tokenExpiry: number | null = null;

// Job Board Types (following your project patterns)
export interface Company {
  id: number;
  name: string;
  location: string;
  logo?: string | null;
  website?: string | null;
  xAccount?: string | null;
  about?: string | null;
  user?: {
    id: number;
    name: string;
    email: string;
    userType: string;
  };
}

export interface JobPost {
  id: number;
  jobTitle: string;
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP';
  location: string;
  salaryFrom?: number;
  salaryTo?: number;
  jobDescription: {
    root: {
      type: 'root';
      children: Array<{
        type: string;
        children: Array<{ text: string;[key: string]: any }>;
      }>;
    };
  };
  listingDuration: number;
  benefits: string[];
  status: 'DRAFT' | 'PUBLISHED';
  company: Company;
  createdAt: string;
  updatedAt: string;
}

export interface JobSearchParams {
  query?: string;
  location?: string;
  employmentType?: string;
  salaryMin?: number;
  salaryMax?: number;
  page?: number;
  limit?: number;
}

// Alias for compatibility with existing components
export type SearchJobsParams = JobSearchParams;

export interface PaginationInfo {
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface JobsResponse {
  docs: JobPost[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface JobSearchResponse {
  jobs: JobPost[];
  pagination: PaginationInfo;
  filters: {
    query?: string;
    location?: string;
    employmentType?: string;
  };
}

// Application Types (Story 4.1)
export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: 'APPLIED' | 'UNDER_REVIEW' | 'INTERVIEW' | 'OFFER' | 'HIRED' | 'REJECTED' | 'WITHDRAWN';
  coverLetter: string; // Rich text content
  resumeUrl: string;
  portfolioLinks: string[];
  expectedSalary?: number;
  availability?: string;
  appliedAt: string;
  updatedAt: string;
  notes?: string;
  interviews?: Interview[];
  score?: number;
  // Related data
  job?: JobPost;
  applicant?: {
    id: string;
    name: string;
    email: string;
    userType: string;
  };
}

export interface Interview {
  id: string;
  applicationId: string;
  type: 'PHONE' | 'VIDEO' | 'ONSITE' | 'TECHNICAL';
  scheduledAt: string;
  duration: number; // minutes
  interviewerIds: string[];
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELED';
  feedback?: string;
  rating?: number;
  meetingUrl?: string;
  notes?: string;
}

export interface ApplicationFormData {
  coverLetter: string;
  resumeFile?: File;
  portfolioLinks: string[];
  expectedSalary?: number;
  availability?: string;
}

export interface ApplicationsResponse {
  docs: Application[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ApplicationStats {
  totalApplications: number;
  byStatus: {
    applied: number;
    underReview: number;
    interview: number;
    offer: number;
    hired: number;
    rejected: number;
    withdrawn: number;
  };
  averageTimeToHire: number;
  conversionRates: {
    applicationToInterview: number;
    interviewToOffer: number;
    offerToHire: number;
  };
}

// Custom Error Class (following your error boundary patterns)
export class JobAPIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'JobAPIError';
  }
}

// Authentication Functions
async function authenticate(): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: PAYLOAD_EMAIL,
      password: PAYLOAD_PASSWORD,
    }),
  });

  if (!response.ok) {
    throw new JobAPIError('Authentication failed', response.status);
  }

  const data = await response.json();
  authToken = data.token;
  tokenExpiry = Date.now() + (data.exp * 1000); // Convert to milliseconds
  return data.token;
}

async function getValidToken(): Promise<string> {
  // Check if we have a valid token
  if (authToken && tokenExpiry && Date.now() < tokenExpiry) {
    return authToken;
  }

  // Authenticate and get a new token
  return authenticate();
}

// API Helper Functions
async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = 'An error occurred';

    switch (response.status) {
      case 400:
        errorMessage = 'Invalid request. Please check your input.';
        break;
      case 401:
        errorMessage = 'API access is currently protected. The PayloadCMS instance needs to be configured to allow public API access for job listings.';
        break;
      case 404:
        errorMessage = 'Job not found.';
        break;
      case 409:
        errorMessage = 'Email already exists. Please use a different email.';
        break;
      case 500:
        errorMessage = 'Server error. Please try again later.';
        break;
      default:
        errorMessage = 'Something went wrong. Please try again.';
    }

    console.error('API Error:', {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      errorText: errorText.substring(0, 200)
    });

    throw new JobAPIError(errorMessage, response.status);
  }

  return response.json();
}

// Core API Functions
export async function getJobs(page = 1, limit = 10): Promise<JobsResponse> {
  // The API is public, no authentication needed for reading job posts
  const response = await fetch(`${API_BASE_URL}/api/jobposts?page=${page}&limit=${limit}`);
  return handleApiResponse<JobsResponse>(response);
}

export async function getJobById(jobId: string | number): Promise<JobPost> {
  const response = await fetch(`${API_BASE_URL}/api/jobposts/${jobId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return handleApiResponse<JobPost>(response);
}

export async function searchJobs(searchParams: JobSearchParams): Promise<JobSearchResponse> {
  const token = await getValidToken();
  const params = new URLSearchParams();

  if (searchParams.query) params.append('q', searchParams.query);
  if (searchParams.location) params.append('location', searchParams.location);
  if (searchParams.employmentType) params.append('employmentType', searchParams.employmentType);
  if (searchParams.salaryMin) params.append('salaryMin', searchParams.salaryMin.toString());
  if (searchParams.salaryMax) params.append('salaryMax', searchParams.salaryMax.toString());
  params.append('page', (searchParams.page || 1).toString());
  params.append('limit', (searchParams.limit || 10).toString());

  const response = await fetch(`${API_BASE_URL}/api/search/jobs?${params}`, {
    headers: {
      'Authorization': `JWT ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return handleApiResponse<JobSearchResponse>(response);
}

export async function getCompanies(): Promise<{ docs: Company[] }> {
  const token = await getValidToken();
  const response = await fetch(`${API_BASE_URL}/api/companies`, {
    headers: {
      'Authorization': `JWT ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return handleApiResponse<{ docs: Company[] }>(response);
}

export async function getCompanyJobs(companyId: number): Promise<JobsResponse> {
  const token = await getValidToken();
  const response = await fetch(`${API_BASE_URL}/api/jobposts?where[company][equals]=${companyId}`, {
    headers: {
      'Authorization': `JWT ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return handleApiResponse<JobsResponse>(response);
}

// Utility Functions (following your existing patterns in /lib/utils.ts)
export function formatSalary(from?: number, to?: number): string {
  if (!from && !to) return 'Salary not specified';
  if (!to) return `$${from?.toLocaleString()}+`;
  return `$${from?.toLocaleString()} - $${to?.toLocaleString()}`;
}

export function formatEmploymentType(type: string): string {
  const employmentTypeLabels: Record<string, string> = {
    FULL_TIME: 'Full Time',
    PART_TIME: 'Part Time',
    CONTRACT: 'Contract',
    INTERNSHIP: 'Internship'
  };
  return employmentTypeLabels[type] || type;
}

export function formatBenefit(benefit: string): string {
  const benefitLabels: Record<string, string> = {
    HEALTH_INSURANCE: 'Health Insurance',
    DENTAL: 'Dental',
    VISION: 'Vision',
    '401K': '401(k)',
    REMOTE_WORK: 'Remote Work',
    FLEXIBLE_HOURS: 'Flexible Hours',
    PAID_TIME_OFF: 'Paid Time Off',
    PROFESSIONAL_DEVELOPMENT: 'Professional Development'
  };
  return benefitLabels[benefit] || benefit.replace('_', ' ');
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return '1 day ago';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 14) return '1 week ago';
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  return formatDate(dateString);
}

// Filter Options (for use in UI components)
export const EMPLOYMENT_TYPE_OPTIONS = [
  { value: '', label: 'All Types' },
  { value: 'FULL_TIME', label: 'Full Time' },
  { value: 'PART_TIME', label: 'Part Time' },
  { value: 'CONTRACT', label: 'Contract' },
  { value: 'INTERNSHIP', label: 'Internship' }
];

export const POPULAR_LOCATIONS = [
  'Remote',
  'Seattle',
  'San Francisco',
  'New York',
  'Austin',
  'Denver',
  'Boston',
  'Chicago',
  'Los Angeles',
  'Washington DC'
];

// Rich Text Renderer Helper (for job descriptions)
export function extractTextFromRichText(richText: JobPost['jobDescription']): string {
  if (!richText?.root?.children) return '';

  return richText.root.children
    .map(child =>
      child.children
        ?.map(textNode => textNode.text || '')
        .join(' ') || ''
    )
    .join(' ')
    .trim();
}

// API client object for compatibility with existing components
export const jobsAPI = {
  getJobs,
  getJobById,
  searchJobs,
  getCompanies,
  getCompanyJobs,
};

// Additional utility functions for job components
export function createExcerpt(richText: JobPost['jobDescription'] | string, maxLength: number = 150): string {
  if (!richText) return '';

  // If it's already a string, use it directly
  if (typeof richText === 'string') {
    if (richText.length <= maxLength) return richText;
    return richText.slice(0, maxLength).trim() + '...';
  }

  // If it's a rich text object, extract the text first
  const plainText = extractTextFromRichText(richText);
  if (plainText.length <= maxLength) return plainText;
  return plainText.slice(0, maxLength).trim() + '...';
}

export function formatRelativeDate(dateString: string): string {
  return getTimeAgo(dateString);
}

// Application API Functions (Story 4.1) - Using local API endpoints
export async function createApplication(jobId: string, formData: ApplicationFormData): Promise<Application> {
  // First upload resume if provided
  let resumeUrl = '';
  if (formData.resumeFile) {
    const uploadFormData = new FormData();
    uploadFormData.append('file', formData.resumeFile);

    const uploadResponse = await fetch('/api/upload/resume', {
      method: 'POST',
      body: uploadFormData,
    });

    if (!uploadResponse.ok) {
      throw new Error('Failed to upload resume');
    }

    const uploadResult = await uploadResponse.json();
    resumeUrl = uploadResult.url;
  }

  // Create application with local API
  const response = await fetch('/api/applications', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jobId,
      coverLetter: formData.coverLetter,
      resumeUrl,
      portfolioLinks: formData.portfolioLinks,
      expectedSalary: formData.expectedSalary,
      availableStartDate: formData.availability,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create application');
  }

  return response.json();
}

export async function getApplications(page = 1, limit = 10): Promise<ApplicationsResponse> {
  const response = await fetch(`/api/applications?page=${page}&limit=${limit}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch applications');
  }

  return response.json();
}

export async function getApplicationById(applicationId: string): Promise<Application> {
  const response = await fetch(`/api/applications/${applicationId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch application');
  }

  return response.json();
}

export async function updateApplicationStatus(applicationId: string, status: Application['status'], notes?: string): Promise<Application> {
  const response = await fetch(`/api/applications/${applicationId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status, hrNotes: notes }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update application status');
  }

  return response.json();
}

export async function withdrawApplication(applicationId: string): Promise<void> {
  const response = await fetch(`/api/applications/${applicationId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to withdraw application');
  }
}

export async function getJobApplications(jobId: string, page = 1, limit = 10): Promise<ApplicationsResponse> {
  const response = await fetch(`/api/applications?jobId=${jobId}&page=${page}&limit=${limit}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch job applications');
  }

  return response.json();
}

export async function scheduleInterview(applicationId: string, interviewData: Omit<Interview, 'id' | 'applicationId'>): Promise<Interview> {
  const response = await fetch('/api/interviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      applicationId,
      ...interviewData,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to schedule interview');
  }

  return response.json();
}

export async function getApplicationStats(): Promise<ApplicationStats> {
  const response = await fetch('/api/applications/analytics', {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch application stats');
  }

  return response.json();
}

// Utility functions for applications
export function formatApplicationStatus(status: Application['status']): string {
  const statusLabels: Record<Application['status'], string> = {
    'APPLIED': 'Applied',
    'UNDER_REVIEW': 'Under Review',
    'INTERVIEW': 'Interview Stage',
    'OFFER': 'Offer Extended',
    'HIRED': 'Hired',
    'REJECTED': 'Rejected',
    'WITHDRAWN': 'Withdrawn'
  };
  return statusLabels[status];
}

export function getApplicationStatusColor(status: Application['status']): string {
  const statusColors: Record<Application['status'], string> = {
    'APPLIED': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'UNDER_REVIEW': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    'INTERVIEW': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'OFFER': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'HIRED': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
    'REJECTED': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'WITHDRAWN': 'bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200'
  };
  return statusColors[status];
}

export function formatInterviewType(type: Interview['type']): string {
  const typeLabels: Record<Interview['type'], string> = {
    'PHONE': 'Phone Interview',
    'VIDEO': 'Video Interview',
    'ONSITE': 'On-site Interview',
    'TECHNICAL': 'Technical Interview'
  };
  return typeLabels[type];
}

// Application utilities object
export const applicationUtils = {
  formatApplicationStatus,
  getApplicationStatusColor,
  formatInterviewType,
};

// Application API client object
export const applicationsAPI = {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
  withdrawApplication,
  getJobApplications,
  scheduleInterview,
  getApplicationStats,
};

// Utility functions object for compatibility with existing components
export const jobsUtils = {
  formatSalary,
  formatEmploymentType,
  formatBenefit,
  formatDate,
  getTimeAgo,
  extractTextFromRichText,
  createExcerpt,
  formatRelativeDate,
};