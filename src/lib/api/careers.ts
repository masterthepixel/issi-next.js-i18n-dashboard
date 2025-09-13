"use client";

import type { Job, JobsResponse } from "@/lib/schemas/job";
import {
  transformJobFromPayload,
  transformJobsResponseFromPayload
} from "@/lib/utils/data-transforms";
import { cache } from "react";
import { handleResponse } from "./jobs";

// API Base URL
const API_BASE_URL = "/api";

export interface JobSearchParams {
  q?: string; // keyword search
  employmentType?: string | string[]; // job type filter - can be single string or array
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


// Cached API functions to prevent duplicate requests
const searchJobs = async (params: JobSearchParams = {}): Promise<JobSearchResult> => {
  const searchParams = new URLSearchParams();

  // Set default pagination
  searchParams.set("page", (params.page || 1).toString());
  searchParams.set("limit", (params.limit || 10).toString());

  // Add keyword search
  if (params.q && params.q.trim()) {
    // Search in both job title and description
    searchParams.set("where[or][0][jobTitle][contains]", params.q);
    searchParams.set("where[or][1][jobDescription][contains]", params.q);
  }

  // Add employment type filter - handle both single string and array
  if (params.employmentType) {
    if (Array.isArray(params.employmentType) && params.employmentType.length > 0) {
      // Multiple employment types - use 'in' operator
      searchParams.set("where[employmentType][in]", JSON.stringify(params.employmentType));
    } else if (typeof params.employmentType === 'string' && params.employmentType !== "") {
      // Single employment type
      searchParams.set("where[employmentType][equals]", params.employmentType);
    }
  }

  // Add location filter
  if (params.location && params.location !== "" && params.location !== "remote" && params.location !== "worldwide") {
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

  const url = `${API_BASE_URL}/jobposts?${searchParams.toString()}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const result: JobsResponse = await response.json();

    // Transform to expected format
    const transformedResult = transformJobsResponseFromPayload(result);
    return {
      jobs: transformedResult.docs,
      pagination: {
        totalDocs: transformedResult.totalDocs,
        limit: transformedResult.limit,
        page: transformedResult.page,
        totalPages: transformedResult.totalPages,
        hasNextPage: transformedResult.hasNextPage,
        hasPrevPage: transformedResult.hasPrevPage,
      },
    };
  } catch (error) {
    console.error("Error in searchJobs:", error);
    throw error;
  }
};

const cachedGetJob = cache(async (id: string): Promise<Job> => {
  const response = await fetch(`${API_BASE_URL}/jobposts/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 300 }, // Cache for 5 minutes
  });

  const job = await handleResponse<Record<string, unknown>>(response);
  return transformJobFromPayload(job);
});

// Careers Search API Functions
export const careersAPI = {
  // Search jobs with filters
  searchJobs,

  // Get job by ID
  getJob: cachedGetJob,

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
