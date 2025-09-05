import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobListingsLoading() {
  return (
    <div className="flex flex-col gap-6">
      {[...Array(7)].map((_, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-start gap-4">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <div className="space-y-3 flex-1">
              <Skeleton className="h-6 w-[300px]" />
              <div className="flex gap-2">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-4 w-[80px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[60%]" />
              <div className="flex gap-2 mt-4">
                <Skeleton className="h-6 w-[80px]" />
                <Skeleton className="h-6 w-[90px]" />
                <Skeleton className="h-6 w-[70px]" />
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-[80px]" />
              <Skeleton className="h-3 w-[60px]" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}