import { useRouter } from "next/navigation"
import { FormattedMessage } from "react-intl"

import { Announcement, AnnouncementTag, AnnouncementTitle } from "@/components/ui/announcement"

interface JobMarqueeItemProps {
    job: {
        id: string
        title: string
        slug: string
    }
    locale: string
}

export function JobMarqueeItem({ job, locale }: JobMarqueeItemProps) {
    const router = useRouter()

    const handleClick = () => {
        router.push(`/${locale}/careers/${job.slug}`)
    }

    return (
        <Announcement className="mx-4 flex-shrink-0">
            <AnnouncementTag variant="default">
                <FormattedMessage id="careers.banner.nowHiring" defaultMessage="Now Hiring" />
            </AnnouncementTag>
            <AnnouncementTitle onClick={handleClick}>
                {job.title}
            </AnnouncementTitle>
        </Announcement>
    )
}