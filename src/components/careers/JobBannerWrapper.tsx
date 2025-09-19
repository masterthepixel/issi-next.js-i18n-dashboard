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

    useEffect(() => {
        const fetchActiveJobs = async () => {
            try {
                // Use careersAPI to search for jobs with limit of 20 for banner
                const result = await careersAPI.searchJobs({ limit: 20 })

                const activeJobs = result.jobs.map(job => ({
                    id: job.id,
                    title: job.jobTitle,
                    slug: job.id, // Use job ID for navigation
                }))

                // For testing: if no jobs, add mock data only in non-production
                if (activeJobs.length === 0) {
                    if (process.env.NODE_ENV !== 'production') {
                        setJobs([
                            { id: '1', title: 'Senior Software Engineer', slug: '1' },
                            { id: '2', title: 'Full Stack Developer', slug: '2' },
                            { id: '3', title: 'DevOps Engineer', slug: '3' },
                            { id: '4', title: 'Product Manager', slug: '4' },
                            { id: '5', title: 'UI/UX Designer', slug: '5' },
                        ])
                    } else {
                        // In production, don't show mock data — leave empty so banner will not render
                        setJobs([])
                    }
                } else {
                    setJobs(activeJobs)
                }
            } catch (error) {
                console.error('❌ Error fetching jobs from PayloadCMS:', error)
                // For testing: add mock data on error only in non-production
                if (process.env.NODE_ENV !== 'production') {
                    setJobs([
                        { id: '1', title: 'Senior Software Engineer', slug: '1' },
                        { id: '2', title: 'Full Stack Developer', slug: '2' },
                        { id: '3', title: 'DevOps Engineer', slug: '3' },
                    ])
                } else {
                    setJobs([])
                }
            } finally {
                setIsLoading(false)
            }
        }

        fetchActiveJobs()
    }, [])

    if (isLoading) {
        return null // Don't show banner while loading
    }

    return <JobMarqueeBanner jobs={jobs} locale={locale} onVisibilityChange={onVisibilityChange} />
}