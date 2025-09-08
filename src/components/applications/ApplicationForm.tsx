"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useIntl } from "react-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Upload, X, Plus, Loader2, FileText, DollarSign, Calendar } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { createApplication, type ApplicationFormData, type JobPost } from "@/lib/jobs-api";
import { useAuth } from "@/lib/auth";
import { Locale } from "@/lib/definitions";
import ErrorBoundary from "@/components/ErrorBoundary";

interface ApplicationFormProps {
  job: JobPost;
  locale: Locale;
  onSuccess?: () => void;
  onCancel?: () => void;
}

function ApplicationFormInternal({ job, locale, onSuccess, onCancel }: ApplicationFormProps) {
  const intl = useIntl();
  const router = useRouter();
  const { isAuthenticated, userType } = useAuth();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ApplicationFormData>({
    coverLetter: '',
    portfolioLinks: [''],
    expectedSalary: undefined,
    availability: '',
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  // Check if user is authenticated and is a job seeker
  if (!isAuthenticated || userType !== 'JOB_SEEKER') {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {intl.formatMessage({
                id: "applications.loginRequired",
                defaultMessage: "Please log in as a job seeker to apply for this position."
              })}
            </AlertDescription>
          </Alert>
          <div className="mt-4 flex gap-2">
            <Button onClick={() => router.push(`/${locale}/auth/login`)}>
              {intl.formatMessage({ id: "common.login", defaultMessage: "Log In" })}
            </Button>
            <Button variant="outline" onClick={onCancel}>
              {intl.formatMessage({ id: "common.cancel", defaultMessage: "Cancel" })}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setError(intl.formatMessage({
          id: "applications.invalidFileType",
          defaultMessage: "Please upload a PDF or Word document."
        }));
        return;
      }
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError(intl.formatMessage({
          id: "applications.fileTooLarge",
          defaultMessage: "File size must be less than 5MB."
        }));
        return;
      }
      
      setResumeFile(file);
      setError(null);
    }
  };

  const addPortfolioLink = () => {
    setFormData(prev => ({
      ...prev,
      portfolioLinks: [...prev.portfolioLinks, '']
    }));
  };

  const removePortfolioLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      portfolioLinks: prev.portfolioLinks.filter((_, i) => i !== index)
    }));
  };

  const updatePortfolioLink = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      portfolioLinks: prev.portfolioLinks.map((link, i) => i === index ? value : link)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.coverLetter.trim()) {
        throw new Error(intl.formatMessage({
          id: "applications.coverLetterRequired",
          defaultMessage: "Cover letter is required."
        }));
      }

      if (!resumeFile) {
        throw new Error(intl.formatMessage({
          id: "applications.resumeRequired",
          defaultMessage: "Resume upload is required."
        }));
      }

      // Filter out empty portfolio links
      const portfolioLinks = formData.portfolioLinks.filter(link => link.trim() !== '');

      const submitData: ApplicationFormData = {
        ...formData,
        portfolioLinks,
        resumeFile,
      };

      await createApplication(job.id.toString(), submitData);

      // Success - show success message or redirect
      onSuccess?.();
      
      // Redirect to applications dashboard
      router.push(`/${locale}/profile/applications`);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while submitting your application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">
          {intl.formatMessage({
            id: "applications.applyForPosition",
            defaultMessage: "Apply for Position"
          })}
        </CardTitle>
        <CardDescription>
          <strong>{job.jobTitle}</strong> at <strong>{job.company.name}</strong>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Cover Letter */}
          <div className="space-y-2">
            <Label htmlFor="coverLetter" className="text-base font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {intl.formatMessage({
                id: "applications.coverLetter",
                defaultMessage: "Cover Letter"
              })}
              <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="coverLetter"
              value={formData.coverLetter}
              onChange={(e) => setFormData(prev => ({ ...prev, coverLetter: e.target.value }))}
              placeholder={intl.formatMessage({
                id: "applications.coverLetterPlaceholder",
                defaultMessage: "Tell us why you're interested in this position and what makes you a great candidate..."
              })}
              className="min-h-32"
              required
            />
            <p className="" text-caption7160>
              {intl.formatMessage({
                id: "applications.coverLetterHelp",
                defaultMessage: "Share your passion for the role and highlight relevant experience."
              })}
            </p>
          </div>

          <Separator />

          {/* Resume Upload */}
          <div className="space-y-2">
            <Label className="text-base font-semibold flex items-center gap-2">
              <Upload className="h-4 w-4" />
              {intl.formatMessage({
                id: "applications.resume",
                defaultMessage: "Resume"
              })}
              <span className="text-red-500">*</span>
            </Label>
            
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              {resumeFile ? (
                <div className="flex items-center justify-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  <span className="font-medium">{resumeFile.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setResumeFile(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                  <div>
                    <Label htmlFor="resume" className="cursor-pointer">
                      <span className="text-primary hover:text-primary/80 font-medium">
                        {intl.formatMessage({
                          id: "applications.uploadResume",
                          defaultMessage: "Click to upload your resume"
                        })}
                      </span>
                      <Input
                        id="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                        className="hidden"
                      />
                    </Label>
                  </div>
                  <p className="" text-caption9490>
                    {intl.formatMessage({
                      id: "applications.resumeFormats",
                      defaultMessage: "PDF, DOC, or DOCX (max 5MB)"
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Portfolio Links */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">
              {intl.formatMessage({
                id: "applications.portfolioLinks",
                defaultMessage: "Portfolio Links (Optional)"
              })}
            </Label>
            
            {formData.portfolioLinks.map((link, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={link}
                  onChange={(e) => updatePortfolioLink(index, e.target.value)}
                  placeholder={intl.formatMessage({
                    id: "applications.portfolioPlaceholder",
                    defaultMessage: "https://your-portfolio.com"
                  })}
                  type="url"
                />
                {formData.portfolioLinks.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removePortfolioLink(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            
            <Button
              type="button"
              variant="outline"
              onClick={addPortfolioLink}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              {intl.formatMessage({
                id: "applications.addPortfolioLink",
                defaultMessage: "Add Portfolio Link"
              })}
            </Button>
          </div>

          <Separator />

          {/* Expected Salary */}
          <div className="space-y-2">
            <Label htmlFor="expectedSalary" className="text-base font-semibold flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              {intl.formatMessage({
                id: "applications.expectedSalary",
                defaultMessage: "Expected Salary (Optional)"
              })}
            </Label>
            <Input
              id="expectedSalary"
              type="number"
              value={formData.expectedSalary || ''}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                expectedSalary: e.target.value ? Number(e.target.value) : undefined 
              }))}
              placeholder="75000"
              min="0"
              step="1000"
            />
            <p className="" text-caption12452>
              {intl.formatMessage({
                id: "applications.expectedSalaryHelp",
                defaultMessage: "Annual salary in USD (optional)"
              })}
            </p>
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <Label htmlFor="availability" className="text-base font-semibold flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {intl.formatMessage({
                id: "applications.availability",
                defaultMessage: "Availability (Optional)"
              })}
            </Label>
            <Input
              id="availability"
              value={formData.availability}
              onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
              placeholder={intl.formatMessage({
                id: "applications.availabilityPlaceholder",
                defaultMessage: "Available immediately, 2 weeks notice, etc."
              })}
            />
          </div>

          <Separator />

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {intl.formatMessage({
                    id: "applications.submitting",
                    defaultMessage: "Submitting..."
                  })}
                </>
              ) : (
                intl.formatMessage({
                  id: "applications.submitApplication",
                  defaultMessage: "Submit Application"
                })
              )}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              {intl.formatMessage({ id: "common.cancel", defaultMessage: "Cancel" })}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default function ApplicationForm(props: ApplicationFormProps) {
  return (
    <ErrorBoundary>
      <ApplicationFormInternal {...props} />
    </ErrorBoundary>
  );
}