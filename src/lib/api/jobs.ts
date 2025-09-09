"use client";

import { JobFormData, Job, JobsResponse, Company, CompaniesResponse } from "@/lib/schemas/job";

// API Base URL
const API_BASE_URL = "https://issi-dashboard-payloadcms.vercel.app/api";

// API Error class
export class JobAPIError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "JobAPIError";
  }
}

// Helper function to handle API responses
export async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = `API Error: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // If we can't parse the error response, use the default message
    }
    throw new JobAPIError(errorMessage, response.status);
  }
  
  return response.json();
}

// Helper function to get auth headers
function getAuthHeaders(token?: string): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  
  return headers;
}

// Jobs API Functions
export const jobsAPI = {
  // Get all jobs with pagination and filters
  async getJobs(params?: {
    page?: number;
    limit?: number;
    status?: string;
    company?: string;
    token?: string;
  }): Promise<JobsResponse> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.limit) searchParams.set("limit", params.limit.toString());
    if (params?.status) searchParams.set("status", params.status);
    if (params?.company) searchParams.set("company", params.company);
    
    const response = await fetch(
      `${API_BASE_URL}/jobposts?${searchParams.toString()}`,
      {
        method: "GET",
        headers: getAuthHeaders(params?.token),
      }
    );
    
    return handleResponse<JobsResponse>(response);
  },

  // Get single job by ID
  async getJob(id: string, token?: string): Promise<Job> {
    const response = await fetch(`${API_BASE_URL}/jobposts/${id}`, {
      method: "GET",
      headers: getAuthHeaders(token),
    });
    
    return handleResponse<Job>(response);
  },

  // Create new job
  async createJob(jobData: JobFormData, token: string): Promise<Job> {
    const response = await fetch(`${API_BASE_URL}/jobposts`, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify(jobData),
    });
    
    return handleResponse<Job>(response);
  },

  // Update existing job
  async updateJob(id: string, jobData: Partial<JobFormData>, token: string): Promise<Job> {
    const response = await fetch(`${API_BASE_URL}/jobposts/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(token),
      body: JSON.stringify(jobData),
    });
    
    return handleResponse<Job>(response);
  },

  // Update job status
  async updateJobStatus(
    id: string, 
    status: "DRAFT" | "ACTIVE" | "CLOSED", 
    token: string
  ): Promise<Job> {
    const response = await fetch(`${API_BASE_URL}/jobposts/${id}/status`, {
      method: "PATCH",
      headers: getAuthHeaders(token),
      body: JSON.stringify({ status }),
    });
    
    return handleResponse<Job>(response);
  },

  // Delete job
  async deleteJob(id: string, token: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/jobposts/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(token),
    });
    
    if (!response.ok) {
      throw new JobAPIError(`Failed to delete job: ${response.status}`, response.status);
    }
  },
};

// Companies API Functions
export const companiesAPI = {
  // Get all companies
  async getCompanies(params?: {
    page?: number;
    limit?: number;
    token?: string;
  }): Promise<CompaniesResponse> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.limit) searchParams.set("limit", params.limit.toString());
    
    const response = await fetch(
      `${API_BASE_URL}/companies?${searchParams.toString()}`,
      {
        method: "GET",
        headers: getAuthHeaders(params?.token),
      }
    );
    
    return handleResponse<CompaniesResponse>(response);
  },

  // Get single company by ID
  async getCompany(id: string, token?: string): Promise<Company> {
    const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
      method: "GET",
      headers: getAuthHeaders(token),
    });
    
    return handleResponse<Company>(response);
  },

  // Create new company
  async createCompany(companyData: Omit<Company, "id" | "createdAt" | "updatedAt">, token: string): Promise<Company> {
    const response = await fetch(`${API_BASE_URL}/companies`, {
      method: "POST",
      headers: getAuthHeaders(token),
      body: JSON.stringify(companyData),
    });
    
    return handleResponse<Company>(response);
  },

  // Update existing company
  async updateCompany(
    id: string, 
    companyData: Partial<Omit<Company, "id" | "createdAt" | "updatedAt">>, 
    token: string
  ): Promise<Company> {
    const response = await fetch(`${API_BASE_URL}/companies/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(token),
      body: JSON.stringify(companyData),
    });
    
    return handleResponse<Company>(response);
  },
};

// Mock data for development/testing
export const mockJobsData: Job[] = [
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
              { text: "We are looking for a Senior Frontend Developer to join our team..." }
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
      name: "Tech Startup Inc",
      location: "San Francisco, CA",
      logo: null,
      website: "https://techstartup.com",
      xAccount: "@techstartup",
      about: "We're building the future of technology",
      user: "user-1",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];

export const mockCompaniesData: Company[] = [
  {
    id: "company-1",
    name: "Tech Startup Inc",
    location: "San Francisco, CA",
    logo: null,
    website: "https://techstartup.com",
    xAccount: "@techstartup", 
    about: "We're building the future of technology",
    user: "user-1",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
];
