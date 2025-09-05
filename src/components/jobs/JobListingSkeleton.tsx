import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function JobListingSkeleton() {
  return (
    <Card className="bg-card border border-border">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0 space-y-3">
            {/* Job Title */}
            <Skeleton className="h-6 w-3/4" />
            
            {/* Company Info */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>

            {/* Job Details */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>
              <Skeleton className="h-4 w-28" />
            </div>
          </div>

          {/* Save Button */}
          <Skeleton className="h-8 w-8 shrink-0" />
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Employment Type Badge */}
        <Skeleton className="h-6 w-20" />

        {/* Job Description Excerpt */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Benefits */}
        <div className="flex flex-wrap gap-1">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-14" />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}