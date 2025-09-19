"use client"

import * as React from "react"
import { FormattedMessage, useIntl } from "react-intl"

import { Banner, BannerClose, BannerTitle } from "@/components/ui/banner"
import { cn } from "@/lib/utils"
import { JobMarqueeContent } from "./JobMarqueeContent"

interface JobMarqueeBannerProps {
    jobs: Array<{
        id: string
        title: string
        slug: string
    }>
    locale: string
    className?: string
    onVisibilityChange?: (visible: boolean) => void
}

const BANNER_DISMISSED_KEY = 'job-marquee-banner-dismissed'

export function JobMarqueeBanner({ jobs, locale, className, onVisibilityChange }: JobMarqueeBannerProps) {
    const [isVisible, setIsVisible] = React.useState(false)
    const intl = useIntl()

    React.useEffect(() => {
        // For testing: always show banner if there are jobs (ignore localStorage)
        if (jobs.length > 0) {
            setIsVisible(true)
            onVisibilityChange?.(true)
        }

        // TODO: Restore localStorage dismissal functionality later
        // const dismissed = localStorage.getItem(BANNER_DISMISSED_KEY)
        // if (!dismissed && jobs.length > 0) {
        //     setIsVisible(true)
        //     onVisibilityChange?.(true)
        // }
    }, [onVisibilityChange, jobs])

    const handleDismiss = () => {
        setIsVisible(false)
        localStorage.setItem(BANNER_DISMISSED_KEY, 'true')
        onVisibilityChange?.(false)
    }

    if (!isVisible) {
        return null
    }

    // Banner with proper theme styling
    return (
        <Banner
            variant="primary"
            inset
            className={cn(
                "relative top-0 left-0 w-full border-none bg-gradient-to-b from-black/40 via-black/10 to-transparent",
                className
            )}
        >
            <BannerTitle className="sr-only">
                <FormattedMessage id="careers.banner.nowHiring" defaultMessage="Now Hiring" />
            </BannerTitle>

            <JobMarqueeContent jobs={jobs} locale={locale} />

            <BannerClose onClick={handleDismiss} aria-label={intl.formatMessage({ id: 'careers.banner.close', defaultMessage: 'Close' })} />
        </Banner>
    )
}