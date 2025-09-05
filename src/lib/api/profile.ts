/**
 * Job Seeker Profile API Functions
 * External PayloadCMS integration for profile management
 */

import { authService } from "../auth";

const API_BASE_URL = "https://issi-dashboard-payloadcms.vercel.app/api";

// Profile data structures (based on API documentation gaps)
export interface JobSeekerProfile {
    id: string;
    name: string;
    email: string;
    about?: string; // Gap: Not confirmed in API test response
    resume?: string; // Gap: Not confirmed in API test response, assume URL
    userId: string;
    userType: "JOB_SEEKER";
    onboardingCompleted: boolean;
    // Additional fields that may need to be handled differently
    workExperience?: WorkExperience[];
    education?: Education[];
    skills?: string[];
    updatedAt: string;
    createdAt: string;
}

export interface WorkExperience {
    id?: string;
    jobTitle: string;
    company: string;
    location: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
}

export interface Education {
    id?: string;
    institution: string;
    degree: string;
    field: string;
    graduationDate: string;
    gpa?: string;
}

export interface ProfileUpdateData {
    name?: string;
    about?: string;
    workExperience?: WorkExperience[];
    education?: Education[];
    skills?: string[];
}

class ProfileAPI {
    private getAuthorizedHeaders(): Record<string, string> {
        const token = authService.getToken();

        return {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };
    }

    async getMyProfile(): Promise<JobSeekerProfile | null> {
        try {
            const response = await fetch(`${API_BASE_URL}/jobseekers/me`, {
                headers: this.getAuthorizedHeaders(),
            });

            if (!response.ok) {
                if (response.status === 404) {
                    // Profile doesn't exist yet
                    return null;
                }
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const profile = await response.json();
            return profile;
        } catch (error) {
            console.error("Error fetching profile:", error);
            throw new Error("Failed to load profile");
        }
    }

    async createProfile(profileData: Partial<JobSeekerProfile>): Promise<JobSeekerProfile> {
        try {
            // For now, we'll update the user record since jobseekers collection might not exist
            // TODO: Confirm if separate jobseekers endpoint exists or use users endpoint

            const response = await fetch(`${API_BASE_URL}/users/me`, {
                method: "PUT",
                headers: this.getAuthorizedHeaders(),
                body: JSON.stringify(profileData),
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const profile = await response.json();
            return profile;
        } catch (error) {
            console.error("Error creating profile:", error);
            throw new Error("Failed to create profile");
        }
    }

    async updateProfile(profileData: ProfileUpdateData): Promise<JobSeekerProfile> {
        try {
            const response = await fetch(`${API_BASE_URL}/users/me`, {
                method: "PUT",
                headers: this.getAuthorizedHeaders(),
                body: JSON.stringify(profileData),
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const profile = await response.json();
            return profile;
        } catch (error) {
            console.error("Error updating profile:", error);
            throw new Error("Failed to update profile");
        }
    }

    async uploadResume(file: File): Promise<{ resumeUrl: string }> {
        try {
            // Assume FormData upload for files (gap in API documentation)
            const formData = new FormData();
            formData.append("file", file);
            formData.append("purpose", "resume");

            const response = await fetch(`${API_BASE_URL}/upload/resume`, {
                method: "POST",
                headers: {
                    ...(authService.getToken() ?
                        { Authorization: `Bearer ${authService.getToken()}` } : {}),
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const result = await response.json();
            return result;
        } catch (error) {
            console.error("Error uploading resume:", error);
            throw new Error("Failed to upload resume");
        }
    }

    // Calculate profile completion percentage
    calculateProfileCompletion(profile: Partial<JobSeekerProfile>): number {
        let completedFields = 0;
        const totalFields = 6; // Base completion criteria

        // Required fields
        if (profile.name) completedFields++;
        if (profile.email) completedFields++;
        if (profile.about && profile.about.trim()) completedFields++;

        // Optional but encouraged fields
        if (profile.resume) completedFields++;
        if (profile.workExperience && profile.workExperience.length > 0) completedFields++;
        if (profile.education && profile.education.length > 0) completedFields++;

        return Math.round((completedFields / totalFields) * 100);
    }
}

// Export singleton instance
export const profileAPI = new ProfileAPI();

// Utility functions
export function validateResumeFile(file: File): { valid: boolean; error?: string } {
    // Validate file type
    const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword'
    ];

    if (!allowedTypes.includes(file.type)) {
        return { valid: false, error: "Only PDF, DOCX, and DOC files are allowed" };
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
        return { valid: false, error: "Resume file must be less than 5MB" };
    }

    return { valid: true };
}

// Hook pattern for profile management (compatible with existing auth hook)
export const useProfile = () => {
    return {
        profile: authService.getUser(), // For now, profile is stored in user data
        isAuthenticated: authService.isAuthenticated(),
        isOnboardingCompleted: authService.getUser()?.onboardingCompleted || false,
        getProfile: () => profileAPI.getMyProfile(),
        updateProfile: (data: ProfileUpdateData) => profileAPI.updateProfile(data),
        uploadResume: (file: File) => profileAPI.uploadResume(file),
        calculateCompletion: (profile: Partial<JobSeekerProfile>) => profileAPI.calculateProfileCompletion(profile),
    };
};