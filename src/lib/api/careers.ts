"use client";

import { JobAPIError, handleResponse } from "./jobs";
import type { Job, JobsResponse } from "@/lib/schemas/job";

// API Base URL
const API_BASE_URL = "https://issi-dashboard-payloadcms.vercel.app/api";

export interface JobSearchParams {
  q?: string; // keyword search
  employmentType?: string; // job type filter
  location?: string; // location filter  
  salaryFrom?: number; // minimum salary
  salaryTo?: number; // maximum salary
  benefits?: string; // benefits filter
  page?: number; // pagination
  limit?: number; // page size
}

export interface JobSearchResult {
  jobs: Job[];
  pagination: {
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}


// Careers Search API Functions
export const careersAPI = {
  // Search jobs with filters
  async searchJobs(params: JobSearchParams = {}): Promise<JobSearchResult> {
    const searchParams = new URLSearchParams();
    
    // Set default pagination
    searchParams.set("page", (params.page || 1).toString());
    searchParams.set("limit", (params.limit || 10).toString());
    
    // Add status filter to only show active jobs
    searchParams.set("where[status][equals]", "ACTIVE");
    
    // Add keyword search
    if (params.q && params.q.trim()) {
      // Search in both job title and description
      searchParams.set("where[or][0][jobTitle][contains]", params.q);
      searchParams.set("where[or][1][jobDescription][contains]", params.q);
    }
    
    // Add employment type filter
    if (params.employmentType && params.employmentType !== "") {
      searchParams.set("where[employmentType][equals]", params.employmentType);
    }
    
    // Add location filter
    if (params.location && params.location !== "" && params.location !== "worldwide") {
      searchParams.set("where[location][contains]", params.location);
    }
    
    // Add salary range filter
    if (params.salaryFrom) {
      searchParams.set("where[salaryFrom][greater_than_equal]", params.salaryFrom.toString());
    }
    if (params.salaryTo) {
      searchParams.set("where[salaryTo][less_than_equal]", params.salaryTo.toString());
    }
    
    // Add benefits filter
    if (params.benefits && params.benefits.trim()) {
      searchParams.set("where[benefits][contains]", params.benefits);
    }
    
    // Include company data
    searchParams.set("depth", "1");
    
    const response = await fetch(
      `${API_BASE_URL}/jobposts?${searchParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    
    const result: JobsResponse = await handleResponse<JobsResponse>(response);
    
    // Transform to expected format
    return {
      jobs: result.docs,
      pagination: {
        totalDocs: result.totalDocs,
        limit: result.limit,
        page: result.page,
        totalPages: result.totalPages,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage,
      },
    };
  },

  // Get job by ID (reuse from jobs API)
  async getJob(id: string): Promise<Job> {
    const response = await fetch(`${API_BASE_URL}/jobposts/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    return handleResponse<Job>(response);
  },

  // Get distinct employment types for filter options
  async getEmploymentTypes(): Promise<string[]> {
    // For now, return static list. In a real implementation,
    // this could query the API for distinct employment types
    return ["full-time", "part-time", "contract", "internship"];
  },

  // Get distinct locations for filter options
  async getLocations(): Promise<string[]> {
    // For now, return static list. In a real implementation,
    // this could query the API for distinct locations
    return [
      "Remote",
      "New York, NY",
      "San Francisco, CA", 
      "Los Angeles, CA",
      "Chicago, IL",
      "Seattle, WA",
      "Boston, MA",
      "Austin, TX",
      "Denver, CO",
      "Atlanta, GA",
      "Miami, FL",
      "London, UK",
      "Toronto, ON",
      "Berlin, Germany",
      "Amsterdam, Netherlands"
    ];
  },
};

// Mock data for development
export const mockJobSearchData: Job[] = [
  {
    id: "1",
    jobTitle: "Senior Frontend Developer",
    employmentType: "full-time",
    location: "San Francisco, CA",
    salaryFrom: 120000,
    salaryTo: 180000,
    jobDescription: {
      root: {
        children: [
          {
            type: "paragraph",
            children: [
              { text: "We are looking for a Senior Frontend Developer to join our team and build amazing user experiences..." }
            ]
          }
        ]
      }
    },
    listingDuration: 30,
    benefits: ["Health Insurance", "401k", "Remote Work"],
    status: "ACTIVE",
    applications: 5,
    company: {
      id: "company-1",
      name: "Tech Innovations Inc",
      location: "San Francisco, CA",
      logo: null,
      website: "https://techinnovations.com",
      xAccount: "@techinnovations",
      about: "Leading technology company focused on innovative web solutions and user experiences.",
      user: "user-1",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    jobTitle: "Full Stack Engineer",
    employmentType: "full-time",
    location: "Remote",
    salaryFrom: 100000,
    salaryTo: 150000,
    jobDescription: {
      root: {
        children: [
          {
            type: "paragraph",
            children: [
              { text: "Join our remote team as a Full Stack Engineer and work on cutting-edge projects..." }
            ]
          }
        ]
      }
    },
    listingDuration: 30,
    benefits: ["Health Insurance", "Remote Work", "Flexible Hours"],
    status: "ACTIVE",
    applications: 12,
    company: {
      id: "company-2",
      name: "Digital Solutions Ltd",
      location: "Remote",
      logo: null,
      website: "https://digitalsolutions.com",
      xAccount: "@digitalsolutions",
      about: "Remote-first company building digital solutions for modern businesses.",
      user: "user-2",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
];
