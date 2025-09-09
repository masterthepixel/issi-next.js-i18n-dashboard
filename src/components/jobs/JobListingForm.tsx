"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Building, MapPin, DollarSign, Calendar, Briefcase, Users, AlertCircle } from "lucide-react";
import { jobSchema, type JobFormData, employmentTypeOptions, benefitsOptions } from "@/lib/schemas/job";
import { jobsAPI } from "@/lib/api/jobs";
import JobDescriptionEditor from "./JobDescriptionEditor";

interface JobListingFormProps {
  mode?: "create" | "edit";
  initialData?: Partial<JobFormData>;
  jobId?: string;
  onSuccess?: () => void;
}

export default function JobListingForm({ 
  mode = "create", 
  initialData, 
  jobId, 
  onSuccess 
}: JobListingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>(initialData?.benefits || []);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      jobTitle: initialData?.jobTitle || "",
      employmentType: initialData?.employmentType || "full-time",
      location: initialData?.location || "",
      salaryFrom: initialData?.salaryFrom || undefined,
      salaryTo: initialData?.salaryTo || undefined,
      jobDescription: initialData?.jobDescription || "",
      benefits: initialData?.benefits || [],
      listingDuration: initialData?.listingDuration || 30,
      status: initialData?.status || "DRAFT",
    },
    mode: "onChange"
  });

  const handleBenefitToggle = (benefit: string) => {
    const updatedBenefits = selectedBenefits.includes(benefit)
      ? selectedBenefits.filter(b => b !== benefit)
      : [...selectedBenefits, benefit];
    
    setSelectedBenefits(updatedBenefits);
    setValue("benefits", updatedBenefits, { shouldValidate: true });
  };

  const onSubmit = async (data: JobFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Get auth token - in a real app, this would come from your auth system
      const token = localStorage.getItem("authToken") || "";
      
      if (mode === "create") {
        const newJob = await jobsAPI.createJob(data, token);
        console.log("Job created successfully:", newJob);
      } else if (mode === "edit" && jobId) {
        const updatedJob = await jobsAPI.updateJob(jobId, data, token);
        console.log("Job updated successfully:", updatedJob);
      }

      // Success handling
      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/dashboard/jobs");
      }
    } catch (error) {
      console.error("Error submitting job:", error);
      setSubmitError(error instanceof Error ? error.message : "Failed to save job");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="">
          {mode === "create" ? "Create New Job Listing" : "Edit Job Listing"}
        </h1>
        <p className="text-muted-foreground">
          {mode === "create" 
            ? "Fill out the details below to create a new job posting" 
            : "Update your job listing details"
          }
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Basic Information
            </CardTitle>
            <CardDescription>
              Essential details about the position
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Controller
                  name="jobTitle"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="jobTitle"
                      placeholder="Senior Frontend Developer"
                      className={errors.jobTitle ? "border-destructive" : ""}
                    />
                  )}
                />
                {errors.jobTitle && (
                  <p className="">{errors.jobTitle.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="employmentType">Employment Type *</Label>
                <Controller
                  name="employmentType"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className={errors.employmentType ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select employment type" />
                      </SelectTrigger>
                      <SelectContent>
                        {employmentTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.employmentType && (
                  <p className="">{errors.employmentType.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="location"
                      placeholder="San Francisco, CA / Remote"
                      className={errors.location ? "border-destructive" : ""}
                    />
                  )}
                />
                {errors.location && (
                  <p className="">{errors.location.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="listingDuration">Listing Duration (days)</Label>
                <Controller
                  name="listingDuration"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="listingDuration"
                      type="number"
                      min="1"
                      max="90"
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 30)}
                      className={errors.listingDuration ? "border-destructive" : ""}
                    />
                  )}
                />
                {errors.listingDuration && (
                  <p className="">{errors.listingDuration.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compensation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Compensation
            </CardTitle>
            <CardDescription>
              Salary range information (optional but recommended)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="salaryFrom">Salary From (USD)</Label>
                <Controller
                  name="salaryFrom"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="salaryFrom"
                      type="number"
                      min="0"
                      step="1000"
                      placeholder="80000"
                      onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                      className={errors.salaryFrom ? "border-destructive" : ""}
                    />
                  )}
                />
                {errors.salaryFrom && (
                  <p className="">{errors.salaryFrom.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="salaryTo">Salary To (USD)</Label>
                <Controller
                  name="salaryTo"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="salaryTo"
                      type="number"
                      min="0"
                      step="1000"
                      placeholder="120000"
                      onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                      className={errors.salaryTo ? "border-destructive" : ""}
                    />
                  )}
                />
                {errors.salaryTo && (
                  <p className="">{errors.salaryTo.message}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Job Description */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Job Description
            </CardTitle>
            <CardDescription>
              Detailed description of the role, responsibilities, and requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Controller
              name="jobDescription"
              control={control}
              render={({ field }) => (
                <JobDescriptionEditor field={field} />
              )}
            />
            {errors.jobDescription && (
              <p className="">{errors.jobDescription.message}</p>
            )}
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Benefits & Perks
            </CardTitle>
            <CardDescription>
              Select all benefits that apply to this position
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {benefitsOptions.map((benefit) => (
                <div key={benefit} className="flex items-center space-x-2">
                  <Checkbox
                    id={benefit}
                    checked={selectedBenefits.includes(benefit)}
                    onCheckedChange={() => handleBenefitToggle(benefit)}
                  />
                  <Label
                    htmlFor={benefit}
                    className=""
                  >
                    {benefit}
                  </Label>
                </div>
              ))}
            </div>
            {errors.benefits && (
              <p className="">{errors.benefits.message}</p>
            )}
          </CardContent>
        </Card>

        {/* Submit Error */}
        {submitError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        {/* Form Actions */}
        <div className="flex flex-col-reverse sm:flex-row gap-4 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
            className="flex-1 sm:flex-initial"
          >
            Cancel
          </Button>
          
          <Button
            type="button"
            variant="secondary"
            onClick={handleSubmit((data) => onSubmit({ ...data, status: "DRAFT" }))}
            disabled={isSubmitting || !isValid}
            className="flex-1 sm:flex-initial"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            Save as Draft
          </Button>

          <Button
            type="submit"
            onClick={handleSubmit((data) => onSubmit({ ...data, status: "ACTIVE" }))}
            disabled={isSubmitting || !isValid}
            className="flex-1 sm:flex-initial"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            {mode === "create" ? "Publish Job" : "Update Job"}
          </Button>
        </div>
      </form>
    </div>
  );
}
