"use client";

/**
 * Data Transformation Utilities for PayloadCMS Integration
 *
 * This module handles the transformation of data from PayloadCMS format
 * to the format expected by our frontend components.
 */

import type { Job, JobsResponse } from "@/lib/schemas/job";

// Employment type mapping from PayloadCMS to frontend format
const EMPLOYMENT_TYPE_MAPPING = {
    FULL_TIME: "full-time",
    PART_TIME: "part-time",
    CONTRACT: "contract",
    INTERNSHIP: "internship",
} as const;

// Benefits mapping from PayloadCMS to frontend format
const BENEFITS_MAPPING = {
    HEALTH_INSURANCE: "Health Insurance",
    DENTAL_INSURANCE: "Dental Insurance",
    VISION_INSURANCE: "Vision Insurance",
    PAID_TIME_OFF: "Paid Time Off",
    RETIREMENT_401K: "401k",
    REMOTE_WORK: "Remote Work",
    FLEXIBLE_HOURS: "Flexible Hours",
    PROFESSIONAL_DEVELOPMENT: "Professional Development",
    STOCK_OPTIONS: "Stock Options",
    BONUS: "Bonus",
    HEALTH_SAVINGS: "Health Savings Account",
    LIFE_INSURANCE: "Life Insurance",
    DISABILITY_INSURANCE: "Disability Insurance",
    GYM_MEMBERSHIP: "Gym Membership",
    COMMUTE_ALLOWANCE: "Commute Allowance",
    CHILDCARE: "Childcare Support",
    TUITION_REIMBURSEMENT: "Tuition Reimbursement",
} as const;

/**
 * Transform a single job from PayloadCMS format to frontend format
 */
export function transformJobFromPayload(job: any): Job {
    return {
        id: job.id.toString(),
        jobTitle: job.jobTitle,
        employmentType: EMPLOYMENT_TYPE_MAPPING[job.employmentType as keyof typeof EMPLOYMENT_TYPE_MAPPING] || job.employmentType,
        location: job.location,
        salaryFrom: job.salaryFrom,
        salaryTo: job.salaryTo,
        jobDescription: job.jobDescription,
        listingDuration: job.listingDuration,
        benefits: job.benefits?.map((benefit: string) => BENEFITS_MAPPING[benefit as keyof typeof BENEFITS_MAPPING] || benefit) || [],
        status: job.status,
        applications: job.applications || job.applicationCount || 0,
        company: {
            id: job.company.id.toString(),
            name: job.company.name,
            location: job.company.location,
            logo: job.company.logo?.url || null,
            website: job.company.website,
            xAccount: job.company.xAccount,
            about: job.company.about,
            user: job.company.user?.toString(),
            createdAt: job.company.createdAt,
            updatedAt: job.company.updatedAt,
        },
        createdAt: job.createdAt,
        updatedAt: job.updatedAt,
    };
}

/**
 * Transform jobs response from PayloadCMS format to frontend format
 */
export function transformJobsResponseFromPayload(response: any): JobsResponse {
    return {
        docs: response.docs.map(transformJobFromPayload),
        totalDocs: response.totalDocs,
        limit: response.limit,
        page: response.page,
        totalPages: response.totalPages,
        hasNextPage: response.hasNextPage,
        hasPrevPage: response.hasPrevPage,
    };
}

/**
 * Transform employment type from frontend to PayloadCMS format
 */
export function transformEmploymentTypeToPayload(employmentType: string): string {
    const reverseMapping = Object.entries(EMPLOYMENT_TYPE_MAPPING).find(
        ([_, value]) => value === employmentType
    );
    return reverseMapping ? reverseMapping[0] : employmentType.toUpperCase().replace(/-/g, "_");
}

/**
 * Transform benefits from frontend to PayloadCMS format
 */
export function transformBenefitsToPayload(benefits: string[]): string[] {
    return benefits.map(benefit => {
        const reverseMapping = Object.entries(BENEFITS_MAPPING).find(
            ([_, value]) => value === benefit
        );
        return reverseMapping ? reverseMapping[0] : benefit.toUpperCase().replace(/\s+/g, "_");
    });
}

/**
 * Extract plain text from Lexical rich text format
 * Used for search functionality and previews
 */
export function extractTextFromLexical(lexicalData: any): string {
    if (!lexicalData?.root?.children) return "";

    const extractText = (children: any[], joinWith: string = ""): string => {
        return children.map(child => {
            if (child.text !== undefined) {
                return child.text || "";
            }
            if (child.type === "paragraph" && child.children) {
                return extractText(child.children, "");
            }
            if (child.children) {
                return extractText(child.children, "");
            }
            return "";
        }).filter(text => text.length > 0).join(joinWith);
    };

    return extractText(lexicalData.root.children, " ").trim();
}

/**
 * Validate job data structure
 */
export function validateJobData(job: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!job.id) errors.push("Job ID is required");
    if (!job.jobTitle?.trim()) errors.push("Job title is required");
    if (!job.employmentType) errors.push("Employment type is required");
    if (!job.location?.trim()) errors.push("Location is required");
    if (!job.jobDescription?.root) errors.push("Job description is required");
    if (!job.company?.name?.trim()) errors.push("Company name is required");

    // Validate salary range if provided
    if (job.salaryFrom && job.salaryTo && job.salaryFrom > job.salaryTo) {
        errors.push("Salary from cannot be greater than salary to");
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}
