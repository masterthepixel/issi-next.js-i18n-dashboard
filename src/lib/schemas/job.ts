import { z } from "zod";

// Job creation/editing schema
export const jobSchema = z.object({
  jobTitle: z.string().min(2, "Job title must be at least 2 characters"),
  employmentType: z.enum(["full-time", "part-time", "contract", "internship"], {
    required_error: "Please select an employment type",
  }),
  location: z.string().min(1, "Please select a location"),
  salaryFrom: z.number().min(0, "Salary from must be a positive number").optional(),
  salaryTo: z.number().min(0, "Salary to must be a positive number").optional(),
  jobDescription: z.object({
    root: z.any(), // PayloadCMS rich text structure
  }).or(z.string().min(10, "Job description must be at least 10 characters")),
  benefits: z.array(z.string()).min(0, "Benefits are optional"),
  listingDuration: z.number().min(1, "Listing duration is required").default(30),
  status: z.enum(["DRAFT", "ACTIVE", "CLOSED"]).default("DRAFT"),
  // Company information (will be populated from user's company profile)
  company: z.string().optional(), // Company ID for API
}).refine((data) => {
  if (data.salaryFrom && data.salaryTo) {
    return data.salaryTo >= data.salaryFrom;
  }
  return true;
}, {
  message: "Salary to must be greater than or equal to salary from",
  path: ["salaryTo"],
});

// Company schema for integration
export const companySchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  logo: z.string().nullable(),
  website: z.string().nullable(),
  xAccount: z.string().nullable(),
  about: z.string().nullable(),
  user: z.string().or(z.object({})), // User ID or nested user object
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Job response schema from API
export const jobResponseSchema = z.object({
  id: z.string(),
  jobTitle: z.string(),
  employmentType: z.string(),
  location: z.string(),
  salaryFrom: z.number().nullable(),
  salaryTo: z.number().nullable(),
  jobDescription: z.object({
    root: z.any(),
  }),
  listingDuration: z.number(),
  benefits: z.array(z.string()),
  status: z.enum(["DRAFT", "ACTIVE", "CLOSED"]),
  applications: z.number().default(0),
  company: companySchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

// API response schemas
export const jobsResponseSchema = z.object({
  docs: z.array(jobResponseSchema),
  totalDocs: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
  page: z.number(),
  limit: z.number(),
});

export const companiesResponseSchema = z.object({
  docs: z.array(companySchema),
  totalDocs: z.number(),
  totalPages: z.number(),
  hasNextPage: z.boolean(),
  hasPrevPage: z.boolean(),
  page: z.number(),
  limit: z.number(),
});

// Type exports
export type JobFormData = z.infer<typeof jobSchema>;
export type Job = z.infer<typeof jobResponseSchema>;
export type Company = z.infer<typeof companySchema>;
export type JobsResponse = z.infer<typeof jobsResponseSchema>;
export type CompaniesResponse = z.infer<typeof companiesResponseSchema>;

// Employment type options
export const employmentTypeOptions = [
  { value: "full-time", label: "Full Time" },
  { value: "part-time", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
] as const;

// Job status options
export const jobStatusOptions = [
  { value: "DRAFT", label: "Draft" },
  { value: "ACTIVE", label: "Active" },
  { value: "CLOSED", label: "Closed" },
] as const;

// Common benefits options
export const benefitsOptions = [
  "Health Insurance",
  "Dental Insurance",
  "Vision Insurance",
  "401k",
  "Paid Time Off",
  "Remote Work",
  "Flexible Hours",
  "Stock Options",
  "Professional Development",
  "Gym Membership",
  "Free Lunch",
  "Parking",
  "Commuter Benefits",
  "Life Insurance",
  "Disability Insurance",
] as const;
