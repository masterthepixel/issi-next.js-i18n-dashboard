import { Announcement, AnnouncementTag, AnnouncementTitle } from "@/components/ui/announcement"
import { ArrowUpRightIcon } from 'lucide-react'
import { useRouter } from "next/navigation"

interface JobMarqueeContentProps {
    jobs: Array<{
        id: string
        title: string
        slug: string
    }>
    locale: string
}

export function JobMarqueeContent({ jobs, locale }: JobMarqueeContentProps) {
    const router = useRouter()

    const handleJobClick = (jobId: string) => {
        router.push(`/${locale}/careers/${jobId}`)
    }

    if (jobs.length === 0) {
        return (
            <div className="flex items-center justify-center py-4 text-sm text-muted-foreground">
                No current job openings
            </div>
        )
    }

    return (
        <div className="py-2 overflow-hidden">
            <div className="flex animate-marquee gap-8 whitespace-nowrap font-mono hover:[animation-play-state:paused]">
                {jobs.concat(jobs).map((job, index) => (
                    <Announcement
                        key={`${job.id}-${index}`}
                        className="cursor-pointer hover:shadow-md transition-all duration-200 bg-white"
                        onClick={() => handleJobClick(job.id)}
                    >
                        <AnnouncementTag className="bg-blue-600 text-white hover:bg-green-600">
                            Apply Now
                        </AnnouncementTag>
                        <AnnouncementTitle className="text-black dark:text-white">
                            {job.title}
                            <ArrowUpRightIcon className="shrink-0 text-muted-foreground" size={16} />
                        </AnnouncementTitle>
                    </Announcement>
                ))}
            </div>
        </div>
    )
}