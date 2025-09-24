"use client"

import { JobMarqueeBanner } from "@/components/careers/JobMarqueeBanner"
import { careersAPI } from "@/lib/api/careers"
import { Locale } from "@/lib/definitions"
import { useEffect, useState } from "react"

interface JobBannerWrapperProps {
    locale: Locale
    onVisibilityChange?: (visible: boolean) => void
}

export function JobBannerWrapper({ locale, onVisibilityChange }: JobBannerWrapperProps) {
    const [jobs, setJobs] = useState<Array<{ id: string; title: string; slug: string }>>([])
    const [isLoading, setIsLoading] = useState(true)

    const DEV_MOCK_JOBS = [
        { id: '1', title: 'Senior Software Engineer', slug: '1' },
        { id: '2', title: 'Full Stack Developer', slug: '2' },
        { id: '3', title: 'DevOps Engineer', slug: '3' },
        { id: '4', title: 'Product Manager', slug: '4' },
        { id: '5', title: 'UI/UX Designer', slug: '5' },
    ];

    useEffect(() => {
        const fetchActiveJobs = async () => {
            try {
                const result = await careersAPI.searchJobs({ limit: 20 });
                const activeJobs = result.jobs.map(job => ({
                    id: job.id,
                    title: job.jobTitle,
                    slug: job.id,
                }));
                if (activeJobs.length === 0) {
                    if (process.env.NODE_ENV !== "production") {
                        setJobs(DEV_MOCK_JOBS);
                    } else {
                        setJobs([]);
                    }
                } else {
                    setJobs(activeJobs);
                }
            } catch (error) {
                console.error("❌ Error fetching jobs from PayloadCMS:", error);
                if (process.env.NODE_ENV !== "production") {
                    setJobs(DEV_MOCK_JOBS.slice(0, 3));
                } else {
                    setJobs([]);
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchActiveJobs();
    }, []);

    if (isLoading) {
        return null // Don't show banner while loading
    }

    return <JobMarqueeBanner jobs={jobs} locale={locale} onVisibilityChange={onVisibilityChange} />
}