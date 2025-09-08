"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useIntl } from "react-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  getApplications, 
  formatApplicationStatus, 
  getApplicationStatusColor,
  withdrawApplication,
  type Application 
} from "@/lib/jobs-api";
import { useAuth } from "@/lib/auth";
import { Locale } from "@/lib/definitions";
import ErrorBoundary from "@/components/ErrorBoundary";
import {
  AlertCircle,
  Building2,
  Calendar,
  DollarSign,
  ExternalLink,
  Eye,
  Loader2,
  MapPin,
  MoreHorizontal,
  Trash2,
  FileText,
  Clock
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

interface ApplicationDashboardClientProps {
  locale: Locale;
}

function ApplicationDashboardClientInternal({ locale }: ApplicationDashboardClientProps) {
  const intl = useIntl();
  const router = useRouter();
  const { isAuthenticated, userType } = useAuth();
  
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [withdrawingId, setWithdrawingId] = useState<string | null>(null);
  const [withdrawDialog, setWithdrawDialog] = useState<{
    open: boolean;
    application: Application | null;
  }>({ open: false, application: null });

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated || userType !== 'JOB_SEEKER') {
      router.push(`/${locale}/auth/login`);
      return;
    }
    
    loadApplications();
  }, [isAuthenticated, userType, locale, router]);

  const loadApplications = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getApplications();
      setApplications(response.docs || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load applications');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdrawApplication = async (application: Application) => {
    if (!application.id) return;
    
    try {
      setWithdrawingId(application.id);
      await withdrawApplication(application.id);
      
      // Remove from local state
      setApplications(prev => prev.filter(app => app.id !== application.id));
      setWithdrawDialog({ open: false, application: null });
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to withdraw application');
    } finally {
      setWithdrawingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusIcon = (status: Application['status']) => {
    switch (status) {
      case 'APPLIED':
        return <FileText className="h-4 w-4" />;
      case 'UNDER_REVIEW':
        return <Eye className="h-4 w-4" />;
      case 'INTERVIEW':
        return <Calendar className="h-4 w-4" />;
      case 'OFFER':
        return <DollarSign className="h-4 w-4" />;
      case 'HIRED':
        return <Building2 className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  // Check authentication before rendering
  if (!isAuthenticated || userType !== 'JOB_SEEKER') {
    return (
      <div className="flex items-center justify-center py-12">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {intl.formatMessage({
                  id: "applications.loginRequired",
                  defaultMessage: "Please log in as a job seeker to view your applications."
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

  if (applications.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto max-w-md">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="mb-2">
            {intl.formatMessage({
              id: "applications.noApplications.title",
              defaultMessage: "No Applications Yet"
            })}
          </h3>
          <p className="text-muted-foreground mb-4">
            {intl.formatMessage({
              id: "applications.noApplications.description",
              defaultMessage: "You haven't applied for any jobs yet. Start exploring opportunities and submit your first application."
            })}
          </p>
          <Button asChild>
            <Link href={`/${locale}/jobs`}>
              {intl.formatMessage({
                id: "applications.browseJobs",
                defaultMessage: "Browse Jobs"
              })}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Applications Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {applications.map((application) => (
          <Card key={application.id} className="relative">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg line-clamp-2 mb-2">
                    {application.job?.jobTitle || 'Job Title Not Available'}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <Building2 className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">
                      {application.job?.company?.name || 'Company Not Available'}
                    </span>
                  </CardDescription>
                </div>
                
                {/* Actions Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {application.job && (
                      <>
                        <DropdownMenuItem asChild>
                          <Link href={`/${locale}/jobs/${application.job.id}`}>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            {intl.formatMessage({
                              id: "applications.viewJob",
                              defaultMessage: "View Job"
                            })}
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                      </>
                    )}
                    {application.status === 'APPLIED' && (
                      <DropdownMenuItem
                        onClick={() => setWithdrawDialog({ 
                          open: true, 
                          application 
                        })}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        {intl.formatMessage({
                          id: "applications.withdraw",
                          defaultMessage: "Withdraw Application"
                        })}
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 mt-3">
                <Badge className={getApplicationStatusColor(application.status)}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(application.status)}
                    {formatApplicationStatus(application.status)}
                  </div>
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              {/* Job Details */}
              {application.job && (
                <>
                  <div className="flex items-center gap-2  " text-caption10007>
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{application.job.location}</span>
                  </div>
                  
                  {(application.job.salaryFrom || application.job.salaryTo) && (
                    <div className="flex items-center gap-2  " text-caption10376>
                      <DollarSign className="h-4 w-4 flex-shrink-0" />
                      <span>
                        {application.job.salaryFrom && application.job.salaryTo
                          ? `$${application.job.salaryFrom.toLocaleString()} - $${application.job.salaryTo.toLocaleString()}`
                          : `$${(application.job.salaryFrom || application.job.salaryTo)?.toLocaleString()}+`}
                      </span>
                    </div>
                  )}
                </>
              )}

              <Separator />

              {/* Application Info */}
              <div className="space-y-2  " text-caption11091>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {intl.formatMessage({
                      id: "applications.appliedOn",
                      defaultMessage: "Applied On"
                    })}
                  </span>
                  <span>{formatDate(application.appliedAt)}</span>
                </div>
                
                {application.updatedAt !== application.appliedAt && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {intl.formatMessage({
                        id: "applications.lastUpdated",
                        defaultMessage: "Last Updated"
                      })}
                    </span>
                    <span>{formatDate(application.updatedAt)}</span>
                  </div>
                )}

                {application.expectedSalary && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {intl.formatMessage({
                        id: "applications.expectedSalary",
                        defaultMessage: "Expected Salary"
                      })}
                    </span>
                    <span>${application.expectedSalary.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {/* Notes */}
              {application.notes && (
                <>
                  <Separator />
                  <div className="" text-caption12757>
                    <div className="text-muted-foreground mb-1">
                      {intl.formatMessage({
                        id: "applications.notes",
                        defaultMessage: "Notes"
                      })}
                    </div>
                    <p className="text-foreground line-clamp-3">
                      {application.notes}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Withdraw Confirmation Dialog */}
      <AlertDialog 
        open={withdrawDialog.open} 
        onOpenChange={(open) => setWithdrawDialog({ open, application: null })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {intl.formatMessage({
                id: "applications.withdrawConfirmTitle",
                defaultMessage: "Withdraw Application"
              })}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {intl.formatMessage({
                id: "applications.withdrawConfirmDescription",
                defaultMessage: "Are you sure you want to withdraw your application? This action cannot be undone."
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              {intl.formatMessage({ id: "common.cancel", defaultMessage: "Cancel" })}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => withdrawDialog.application && handleWithdrawApplication(withdrawDialog.application)}
              disabled={!!withdrawingId}
            >
              {withdrawingId ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {intl.formatMessage({
                    id: "applications.withdrawing",
                    defaultMessage: "Withdrawing..."
                  })}
                </>
              ) : (
                intl.formatMessage({
                  id: "applications.confirmWithdraw",
                  defaultMessage: "Withdraw Application"
                })
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function ApplicationDashboardClient(props: ApplicationDashboardClientProps) {
  return (
    <ErrorBoundary>
      <ApplicationDashboardClientInternal {...props} />
    </ErrorBoundary>
  );
}