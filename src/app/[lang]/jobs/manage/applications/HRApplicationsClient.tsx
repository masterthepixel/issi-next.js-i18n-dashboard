"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useIntl } from "react-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  getJobApplications,
  getJobs,
  updateApplicationStatus,
  scheduleInterview,
  formatApplicationStatus, 
  getApplicationStatusColor,
  type Application,
  type JobPost
} from "@/lib/jobs-api";
import { useAuth } from "@/lib/auth";
import { Locale } from "@/lib/definitions";
import ErrorBoundary from "@/components/ErrorBoundary";
import {
  AlertCircle,
  Building2,
  Calendar,
  ChevronRight,
  Clock,
  DollarSign,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Filter,
  Loader2,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Search,
  Star,
  User,
  Users,
  Video
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface HRApplicationsClientProps {
  locale: Locale;
  initialJobId?: string;
  initialStatus?: string;
  initialPage?: number;
}

interface KanbanColumn {
  id: Application['status'];
  title: string;
  applications: Application[];
  count: number;
}

interface StatusUpdateDialog {
  open: boolean;
  application: Application | null;
  newStatus: Application['status'] | null;
  notes: string;
}

function HRApplicationsClientInternal({ 
  locale, 
  initialJobId, 
  initialStatus, 
  initialPage = 1 
}: HRApplicationsClientProps) {
  const intl = useIntl();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, userType } = useAuth();
  
  const [applications, setApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string>(initialJobId || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingAppId, setUpdatingAppId] = useState<string | null>(null);
  
  const [statusDialog, setStatusDialog] = useState<StatusUpdateDialog>({
    open: false,
    application: null,
    newStatus: null,
    notes: ''
  });

  // Pipeline columns configuration
  const pipelineColumns: Omit<KanbanColumn, 'applications' | 'count'>[] = [
    { id: 'APPLIED', title: intl.formatMessage({ id: 'hr.status.applied', defaultMessage: 'Applied' }) },
    { id: 'UNDER_REVIEW', title: intl.formatMessage({ id: 'hr.status.underReview', defaultMessage: 'Under Review' }) },
    { id: 'INTERVIEW', title: intl.formatMessage({ id: 'hr.status.interview', defaultMessage: 'Interview' }) },
    { id: 'OFFER', title: intl.formatMessage({ id: 'hr.status.offer', defaultMessage: 'Offer' }) },
    { id: 'HIRED', title: intl.formatMessage({ id: 'hr.status.hired', defaultMessage: 'Hired' }) },
    { id: 'REJECTED', title: intl.formatMessage({ id: 'hr.status.rejected', defaultMessage: 'Rejected' }) },
  ];

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated || userType !== 'COMPANY') {
      router.push(`/${locale}/auth/login`);
      return;
    }
    
    loadInitialData();
  }, [isAuthenticated, userType, locale, router]);

  const loadInitialData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Load company jobs first
      const jobsResponse = await getJobs();
      const companyJobs = jobsResponse.docs || [];
      setJobs(companyJobs);
      
      // Load applications for all jobs or specific job
      let allApplications: Application[] = [];
      if (selectedJobId === 'all') {
        // Load applications for all company jobs
        const applicationPromises = companyJobs.map(job => 
          getJobApplications(job.id.toString())
        );
        const responses = await Promise.all(applicationPromises);
        allApplications = responses.flatMap(response => response.docs || []);
      } else {
        const response = await getJobApplications(selectedJobId);
        allApplications = response.docs || [];
      }
      
      setApplications(allApplications);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load applications');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter applications based on search and job selection
  const filteredApplications = applications.filter(app => {
    const matchesSearch = !searchQuery || 
      (app.applicant?.name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (app.job?.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesJob = selectedJobId === 'all' || app.jobId === selectedJobId;
    
    return matchesSearch && matchesJob;
  });

  // Create Kanban columns with filtered applications
  const kanbanColumns: KanbanColumn[] = pipelineColumns.map(col => {
    const columnApplications = filteredApplications.filter(app => app.status === col.id);
    return {
      ...col,
      applications: columnApplications,
      count: columnApplications.length
    };
  });

  const handleStatusUpdate = async (application: Application, newStatus: Application['status'], notes?: string) => {
    if (!application.id) return;
    
    try {
      setUpdatingAppId(application.id);
      await updateApplicationStatus(application.id, newStatus, notes);
      
      // Update local state
      setApplications(prev => prev.map(app => 
        app.id === application.id 
          ? { ...app, status: newStatus, notes: notes || app.notes, updatedAt: new Date().toISOString() }
          : app
      ));
      
      setStatusDialog({ open: false, application: null, newStatus: null, notes: '' });
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update application status');
    } finally {
      setUpdatingAppId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Check authentication before rendering
  if (!isAuthenticated || userType !== 'COMPANY') {
    return (
      <div className="flex items-center justify-center py-12">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {intl.formatMessage({
                  id: "hr.loginRequired",
                  defaultMessage: "Please log in as a company to access application management."
                })}
              </AlertDescription>
            </Alert>
            <Button 
              className="w-full mt-4" 
              onClick={() => router.push(`/${locale}/auth/login`)}
            >
              {intl.formatMessage({ id: "common.login", defaultMessage: "Log In" })}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>{intl.formatMessage({ id: "common.loading", defaultMessage: "Loading..." })}</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          {/* Job Filter */}
          <Select value={selectedJobId} onValueChange={(value) => {
            setSelectedJobId(value);
            loadInitialData();
          }}>
            <SelectTrigger className="w-full sm:w-64">
              <SelectValue placeholder={intl.formatMessage({ id: "hr.selectJob", defaultMessage: "Select Job" })} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {intl.formatMessage({ id: "hr.allJobs", defaultMessage: "All Jobs" })} ({applications.length})
              </SelectItem>
              {jobs.map((job) => (
                <SelectItem key={job.id} value={job.id.toString()}>
                  {job.jobTitle} ({applications.filter(app => app.jobId === job.id.toString()).length})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Search */}
          <div className="relative flex-1 sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={intl.formatMessage({ 
                id: "hr.searchApplications", 
                defaultMessage: "Search applications..." 
              })}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* View Mode Toggle */}
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'kanban' | 'list')}>
          <TabsList>
            <TabsTrigger value="kanban">
              {intl.formatMessage({ id: "hr.kanbanView", defaultMessage: "Kanban" })}
            </TabsTrigger>
            <TabsTrigger value="list">
              {intl.formatMessage({ id: "hr.listView", defaultMessage: "List" })}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {kanbanColumns.map((column) => (
          <Card key={column.id}>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">{column.count}</div>
              <div className="text-sm text-muted-foreground">{column.title}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as 'kanban' | 'list')}>
        <TabsContent value="kanban" className="mt-6">
          {/* Kanban Pipeline */}
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {kanbanColumns.map((column) => (
              <Card key={column.id} className="flex flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center justify-between">
                    <span>{column.title}</span>
                    <Badge variant="secondary">{column.count}</Badge>
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex-1 space-y-3">
                  {column.applications.map((application) => (
                    <ApplicationCard
                      key={application.id}
                      application={application}
                      locale={locale}
                      onStatusUpdate={(newStatus) => {
                        setStatusDialog({
                          open: true,
                          application,
                          newStatus,
                          notes: ''
                        });
                      }}
                      isUpdating={updatingAppId === application.id}
                    />
                  ))}
                  
                  {column.applications.length === 0 && (
                    <div className="text-center py-6 text-muted-foreground text-sm">
                      {intl.formatMessage({ 
                        id: "hr.noApplicationsInColumn", 
                        defaultMessage: "No applications" 
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="mt-6">
          {/* List View */}
          <Card>
            <CardContent className="p-0">
              {filteredApplications.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {intl.formatMessage({
                      id: "hr.noApplications.title",
                      defaultMessage: "No Applications Found"
                    })}
                  </h3>
                  <p className="text-muted-foreground">
                    {intl.formatMessage({
                      id: "hr.noApplications.description",
                      defaultMessage: "No applications match your current filters."
                    })}
                  </p>
                </div>
              ) : (
                <div className="divide-y">
                  {filteredApplications.map((application, index) => (
                    <ApplicationListItem
                      key={application.id}
                      application={application}
                      locale={locale}
                      onStatusUpdate={(newStatus) => {
                        setStatusDialog({
                          open: true,
                          application,
                          newStatus,
                          notes: ''
                        });
                      }}
                      isUpdating={updatingAppId === application.id}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Status Update Dialog */}
      <Dialog 
        open={statusDialog.open} 
        onOpenChange={(open) => !open && setStatusDialog({ open: false, application: null, newStatus: null, notes: '' })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {intl.formatMessage({
                id: "hr.updateStatus",
                defaultMessage: "Update Application Status"
              })}
            </DialogTitle>
            <DialogDescription>
              {statusDialog.application?.applicant?.name && (
                <>
                  {intl.formatMessage(
                    {
                      id: "hr.updateStatusFor",
                      defaultMessage: "Update status for {candidateName}"
                    },
                    { candidateName: statusDialog.application.applicant.name }
                  )}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label>
                {intl.formatMessage({
                  id: "hr.newStatus",
                  defaultMessage: "New Status"
                })}
              </Label>
              <div className="mt-2">
                <Badge className={statusDialog.newStatus ? getApplicationStatusColor(statusDialog.newStatus) : ''}>
                  {statusDialog.newStatus ? formatApplicationStatus(statusDialog.newStatus) : ''}
                </Badge>
              </div>
            </div>
            
            <div>
              <Label htmlFor="statusNotes">
                {intl.formatMessage({
                  id: "hr.notes",
                  defaultMessage: "Notes (Optional)"
                })}
              </Label>
              <Textarea
                id="statusNotes"
                value={statusDialog.notes}
                onChange={(e) => setStatusDialog(prev => ({ ...prev, notes: e.target.value }))}
                placeholder={intl.formatMessage({
                  id: "hr.notesPlaceholder",
                  defaultMessage: "Add any notes about this status update..."
                })}
                className="mt-1"
              />
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setStatusDialog({ open: false, application: null, newStatus: null, notes: '' })}
            >
              {intl.formatMessage({ id: "common.cancel", defaultMessage: "Cancel" })}
            </Button>
            <Button 
              onClick={() => {
                if (statusDialog.application && statusDialog.newStatus) {
                  handleStatusUpdate(statusDialog.application, statusDialog.newStatus, statusDialog.notes);
                }
              }}
              disabled={!statusDialog.newStatus || !!updatingAppId}
            >
              {updatingAppId ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {intl.formatMessage({
                    id: "hr.updating",
                    defaultMessage: "Updating..."
                  })}
                </>
              ) : (
                intl.formatMessage({
                  id: "hr.updateStatus",
                  defaultMessage: "Update Status"
                })
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Application Card Component for Kanban View
function ApplicationCard({ 
  application, 
  locale, 
  onStatusUpdate, 
  isUpdating 
}: {
  application: Application;
  locale: Locale;
  onStatusUpdate: (status: Application['status']) => void;
  isUpdating: boolean;
}) {
  const intl = useIntl();

  const getNextStatuses = (currentStatus: Application['status']): Application['status'][] => {
    switch (currentStatus) {
      case 'APPLIED':
        return ['UNDER_REVIEW', 'REJECTED'];
      case 'UNDER_REVIEW':
        return ['INTERVIEW', 'REJECTED'];
      case 'INTERVIEW':
        return ['OFFER', 'REJECTED'];
      case 'OFFER':
        return ['HIRED', 'REJECTED'];
      default:
        return [];
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Card className="cursor-pointer hover:shadow-sm transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Candidate Info */}
          <div>
            <div className="font-medium text-sm">
              {application.applicant?.name || 'Unknown Candidate'}
            </div>
            <div className="text-xs text-muted-foreground">
              {application.job?.jobTitle || 'Position Not Available'}
            </div>
          </div>

          {/* Key Details */}
          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>{intl.formatMessage({ id: "applications.appliedOn", defaultMessage: "Applied" })}</span>
              <span>{formatDate(application.appliedAt)}</span>
            </div>
            
            {application.expectedSalary && (
              <div className="flex items-center justify-between">
                <span>{intl.formatMessage({ id: "applications.expectedSalary", defaultMessage: "Expected" })}</span>
                <span>${application.expectedSalary.toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-1">
            {getNextStatuses(application.status).map((status) => (
              <Button
                key={status}
                size="sm"
                variant="outline"
                className="flex-1 text-xs h-7"
                onClick={() => onStatusUpdate(status)}
                disabled={isUpdating}
              >
                {formatApplicationStatus(status)}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Application List Item Component for List View
function ApplicationListItem({ 
  application, 
  locale, 
  onStatusUpdate, 
  isUpdating 
}: {
  application: Application;
  locale: Locale;
  onStatusUpdate: (status: Application['status']) => void;
  isUpdating: boolean;
}) {
  const intl = useIntl();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="p-6 hover:bg-muted/50">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <div>
              <div className="font-medium">
                {application.applicant?.name || 'Unknown Candidate'}
              </div>
              <div className="text-sm text-muted-foreground">
                {application.job?.jobTitle || 'Position Not Available'}
              </div>
            </div>
            
            <Badge className={getApplicationStatusColor(application.status)}>
              {formatApplicationStatus(application.status)}
            </Badge>
          </div>
          
          <div className="flex items-center gap-6 mt-2 text-sm text-muted-foreground">
            <span>Applied {formatDate(application.appliedAt)}</span>
            {application.expectedSalary && (
              <span>${application.expectedSalary.toLocaleString()}</span>
            )}
          </div>
        </div>

        {/* Actions */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onStatusUpdate('UNDER_REVIEW')}>
              Move to Under Review
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusUpdate('INTERVIEW')}>
              Move to Interview
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusUpdate('OFFER')}>
              Move to Offer
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onStatusUpdate('REJECTED')} className="text-red-600">
              Reject Application
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default function HRApplicationsClient(props: HRApplicationsClientProps) {
  return (
    <ErrorBoundary>
      <HRApplicationsClientInternal {...props} />
    </ErrorBoundary>
  );
}