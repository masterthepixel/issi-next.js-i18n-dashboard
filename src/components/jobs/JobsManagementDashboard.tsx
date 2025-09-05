"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Eye,
  Trash2,
  TrendingUp,
  Users,
  Clock,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { jobsAPI } from "@/lib/api/jobs";
import type { Job, JobsResponse } from "@/lib/schemas/job";
import { useIntl } from "react-intl";
import { formatDistanceToNow } from "date-fns";

interface JobsManagementDashboardProps {
  locale?: string;
}

interface JobStats {
  totalJobs: number;
  activeJobs: number;
  draftJobs: number;
  closedJobs: number;
  totalApplications: number;
}

interface JobFilters {
  status?: "DRAFT" | "ACTIVE" | "CLOSED" | "";
  search?: string;
  page: number;
  limit: number;
}

function JobRowSkeleton() {
  return (
    <div className="flex items-center space-x-4 p-4 border-b">
      <Skeleton className="h-4 w-4" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/4" />
      </div>
      <Skeleton className="h-6 w-16" />
      <Skeleton className="h-4 w-12" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-8 w-8" />
    </div>
  );
}

export default function JobsManagementDashboard({ locale = "en" }: JobsManagementDashboardProps) {
  const intl = useIntl();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [stats, setStats] = useState<JobStats>({
    totalJobs: 0,
    activeJobs: 0,
    draftJobs: 0,
    closedJobs: 0,
    totalApplications: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<JobFilters>({
    status: "",
    search: "",
    page: 1,
    limit: 10,
  });
  const [totalPages, setTotalPages] = useState(1);

  const fetchJobs = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Get auth token - in a real app, this would come from your auth system
      const token = localStorage.getItem("authToken") || "";
      
      const response: JobsResponse = await jobsAPI.getJobs({
        page: filters.page,
        limit: filters.limit,
        status: filters.status || undefined,
        token,
      });

      setJobs(response.docs);
      setTotalPages(response.totalPages);

      // Calculate stats
      const newStats: JobStats = {
        totalJobs: response.totalDocs,
        activeJobs: response.docs.filter(job => job.status === "ACTIVE").length,
        draftJobs: response.docs.filter(job => job.status === "DRAFT").length,
        closedJobs: response.docs.filter(job => job.status === "CLOSED").length,
        totalApplications: response.docs.reduce((sum, job) => sum + job.applications, 0),
      };
      setStats(newStats);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch jobs");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  const handleStatusUpdate = async (jobId: string, newStatus: "DRAFT" | "ACTIVE" | "CLOSED") => {
    try {
      const token = localStorage.getItem("authToken") || "";
      await jobsAPI.updateJobStatus(jobId, newStatus, token);
      
      // Update local state
      setJobs(prevJobs =>
        prevJobs.map(job =>
          job.id === jobId ? { ...job, status: newStatus } : job
        )
      );
    } catch (err) {
      console.error("Error updating job status:", err);
      // You might want to show a toast notification here
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm("Are you sure you want to delete this job? This action cannot be undone.")) {
      return;
    }

    try {
      const token = localStorage.getItem("authToken") || "";
      await jobsAPI.deleteJob(jobId, token);
      
      // Remove from local state
      setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
    } catch (err) {
      console.error("Error deleting job:", err);
      // You might want to show a toast notification here
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case "ACTIVE":
        return "default";
      case "DRAFT":
        return "secondary";
      case "CLOSED":
        return "destructive";
      default:
        return "outline";
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return "Unknown";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {intl.formatMessage({ id: "jobs.management.title", defaultMessage: "Jobs Management" })}
          </h1>
          <p className="text-muted-foreground">
            {intl.formatMessage({ 
              id: "jobs.management.description", 
              defaultMessage: "Manage your job listings, track applications, and optimize your hiring process" 
            })}
          </p>
        </div>
        <Button onClick={() => router.push(`/${locale}/jobs/create`)}>
          <Plus className="mr-2 h-4 w-4" />
          {intl.formatMessage({ id: "jobs.management.createJob", defaultMessage: "Create Job" })}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {intl.formatMessage({ id: "jobs.stats.total", defaultMessage: "Total Jobs" })}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-12" /> : stats.totalJobs}
            </div>
            <p className="text-xs text-muted-foreground">
              {intl.formatMessage({ id: "jobs.stats.totalDescription", defaultMessage: "All job listings" })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {intl.formatMessage({ id: "jobs.stats.active", defaultMessage: "Active Jobs" })}
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-12" /> : stats.activeJobs}
            </div>
            <p className="text-xs text-muted-foreground">
              {intl.formatMessage({ id: "jobs.stats.activeDescription", defaultMessage: "Currently published" })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {intl.formatMessage({ id: "jobs.stats.applications", defaultMessage: "Applications" })}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-12" /> : stats.totalApplications}
            </div>
            <p className="text-xs text-muted-foreground">
              {intl.formatMessage({ id: "jobs.stats.applicationsDescription", defaultMessage: "Total received" })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {intl.formatMessage({ id: "jobs.stats.drafts", defaultMessage: "Draft Jobs" })}
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? <Skeleton className="h-8 w-12" /> : stats.draftJobs}
            </div>
            <p className="text-xs text-muted-foreground">
              {intl.formatMessage({ id: "jobs.stats.draftsDescription", defaultMessage: "Pending review" })}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={intl.formatMessage({ id: "jobs.search.placeholder", defaultMessage: "Search jobs..." })}
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }))}
            className="pl-8"
          />
        </div>
        
        <Select
          value={filters.status}
          onValueChange={(value) => setFilters(prev => ({ ...prev, status: value as any, page: 1 }))}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder={intl.formatMessage({ id: "jobs.filter.status", defaultMessage: "All Statuses" })} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">
              {intl.formatMessage({ id: "jobs.filter.allStatuses", defaultMessage: "All Statuses" })}
            </SelectItem>
            <SelectItem value="ACTIVE">
              {intl.formatMessage({ id: "jobs.status.active", defaultMessage: "Active" })}
            </SelectItem>
            <SelectItem value="DRAFT">
              {intl.formatMessage({ id: "jobs.status.draft", defaultMessage: "Draft" })}
            </SelectItem>
            <SelectItem value="CLOSED">
              {intl.formatMessage({ id: "jobs.status.closed", defaultMessage: "Closed" })}
            </SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={fetchJobs} disabled={isLoading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          {intl.formatMessage({ id: "common.refresh", defaultMessage: "Refresh" })}
        </Button>
      </div>

      {/* Error State */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Jobs Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {intl.formatMessage({ id: "jobs.management.jobsList", defaultMessage: "Jobs List" })}
          </CardTitle>
          <CardDescription>
            {intl.formatMessage({ 
              id: "jobs.management.jobsListDescription", 
              defaultMessage: "Manage and monitor your job listings" 
            })}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="divide-y">
              {Array.from({ length: 5 }).map((_, index) => (
                <JobRowSkeleton key={index} />
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                {intl.formatMessage({ 
                  id: "jobs.management.noJobs", 
                  defaultMessage: "No jobs found matching your criteria." 
                })}
              </p>
              <Button onClick={() => router.push(`/${locale}/jobs/create`)}>
                <Plus className="mr-2 h-4 w-4" />
                {intl.formatMessage({ id: "jobs.management.createFirstJob", defaultMessage: "Create Your First Job" })}
              </Button>
            </div>
          ) : (
            <div className="divide-y">
              {jobs.map((job) => (
                <div key={job.id} className="flex items-center space-x-4 p-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium truncate">{job.jobTitle}</h3>
                      <Badge variant={getStatusVariant(job.status)}>
                        {job.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                      <span>{job.company.name}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.employmentType}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="text-center">
                      <div className="font-medium">{job.applications}</div>
                      <div className="text-muted-foreground">
                        {intl.formatMessage({ id: "jobs.applications", defaultMessage: "applications" })}
                      </div>
                    </div>
                    
                    <div className="text-right min-w-[80px]">
                      <div className="text-muted-foreground">
                        {intl.formatMessage({ id: "jobs.updated", defaultMessage: "Updated" })}
                      </div>
                      <div>{formatDate(job.updatedAt)}</div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>
                        {intl.formatMessage({ id: "common.actions", defaultMessage: "Actions" })}
                      </DropdownMenuLabel>
                      
                      <DropdownMenuItem onClick={() => router.push(`/${locale}/jobs/${job.id}`)}>
                        <Eye className="mr-2 h-4 w-4" />
                        {intl.formatMessage({ id: "common.view", defaultMessage: "View" })}
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem onClick={() => router.push(`/${locale}/jobs/${job.id}/edit`)}>
                        <Edit className="mr-2 h-4 w-4" />
                        {intl.formatMessage({ id: "common.edit", defaultMessage: "Edit" })}
                      </DropdownMenuItem>
                      
                      <DropdownMenuSeparator />
                      
                      {job.status !== "ACTIVE" && (
                        <DropdownMenuItem onClick={() => handleStatusUpdate(job.id, "ACTIVE")}>
                          <Eye className="mr-2 h-4 w-4" />
                          {intl.formatMessage({ id: "jobs.actions.publish", defaultMessage: "Publish" })}
                        </DropdownMenuItem>
                      )}
                      
                      {job.status !== "DRAFT" && (
                        <DropdownMenuItem onClick={() => handleStatusUpdate(job.id, "DRAFT")}>
                          <Clock className="mr-2 h-4 w-4" />
                          {intl.formatMessage({ id: "jobs.actions.draft", defaultMessage: "Move to Draft" })}
                        </DropdownMenuItem>
                      )}
                      
                      {job.status !== "CLOSED" && (
                        <DropdownMenuItem onClick={() => handleStatusUpdate(job.id, "CLOSED")}>
                          <AlertCircle className="mr-2 h-4 w-4" />
                          {intl.formatMessage({ id: "jobs.actions.close", defaultMessage: "Close" })}
                        </DropdownMenuItem>
                      )}
                      
                      <DropdownMenuSeparator />
                      
                      <DropdownMenuItem 
                        onClick={() => handleDeleteJob(job.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {intl.formatMessage({ id: "common.delete", defaultMessage: "Delete" })}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilters(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
              disabled={filters.page <= 1}
            >
              {intl.formatMessage({ id: "pagination.previous", defaultMessage: "Previous" })}
            </Button>
            
            <span className="text-sm text-muted-foreground">
              {intl.formatMessage(
                { id: "pagination.pageOfPages", defaultMessage: "Page {current} of {total}" },
                { current: filters.page, total: totalPages }
              )}
            </span>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFilters(prev => ({ ...prev, page: Math.min(totalPages, prev.page + 1) }))}
              disabled={filters.page >= totalPages}
            >
              {intl.formatMessage({ id: "pagination.next", defaultMessage: "Next" })}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}