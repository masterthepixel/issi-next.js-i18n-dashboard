## 💼 Job Portal Implementation Patterns (Story 4.1)

### Complete Application Management System Architecture

**Story 4.1 Implementation Overview**: Comprehensive job application and pipeline management system with full CRUD operations, email notifications, and multi-language support.

### Core Data Models & TypeScript Interfaces

#### Application Interface (src/lib/jobs-api.ts:13-45)

```typescript
export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: "APPLIED" | "UNDER_REVIEW" | "INTERVIEW" | "OFFER" | "HIRED" | "REJECTED" | "WITHDRAWN";
  coverLetter: string;
  resumeUrl: string;
  portfolioLinks: string[];
  expectedSalary?: number;
  availability?: string;
  appliedAt: string;
  updatedAt: string;
  notes?: string;
  interviews?: Interview[];
  score?: number;
  // Populated relationships
  job?: JobPost;
  applicant?: {
    id: string;
    name: string;
    email: string;
    userType: string;
  };
}
```

#### Interview Interface (src/lib/jobs-api.ts:47-62)

```typescript
export interface Interview {
  id: string;
  applicationId: string;
  type: "PHONE" | "VIDEO" | "IN_PERSON" | "TECHNICAL";
  scheduledFor: string;
  duration: number;
  location?: string;
  meetingLink?: string;
  interviewerIds: string[];
  notes?: string;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED" | "NO_SHOW";
  feedback?: string;
  rating?: number;
}
```

### Application Form Component Architecture

#### Complete Form with Validation (src/components/applications/ApplicationForm.tsx)

```tsx
// React Hook Form with Zod validation pattern
const formSchema = z.object({
  coverLetter: z.string().min(50, "Cover letter must be at least 50 characters"),
  portfolioLinks: z.array(z.string().url()).max(5),
  expectedSalary: z.number().positive().optional(),
  availability: z.string().optional(),
});

// File upload handling with proper validation
const handleFileUpload = async (file: File) => {
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload/resume", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) throw new Error("Upload failed");
  const result = await response.json();
  return result.url;
};
```

### API Endpoint Architecture Patterns

#### RESTful Application Management (src/app/api/applications/route.ts)

```typescript
// POST /api/applications - Create application with email notification
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = CreateApplicationSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ error: validation.error.errors }, { status: 400 });
  }

  const application = await createApplication(validation.data);

  // Send email notifications
  await emailService.sendApplicationSubmitted(
    validation.data.applicantEmail,
    validation.data.applicantName,
    jobDetails
  );

  return NextResponse.json(application, { status: 201 });
}
```

#### Individual Application Management (src/app/api/applications/[id]/route.ts)

```typescript
// PUT /api/applications/[id] - Update with status change notifications
export async function PUT(request: NextRequest, { params }) {
  const { id } = await params;
  const body = await request.json();

  const updatedApplication = await updateApplication(id, body);

  // Status change notifications
  if (body.status && body.status !== previousStatus) {
    await emailService.sendStatusUpdate(updatedApplication, body.status);
  }

  return NextResponse.json(updatedApplication);
}
```

### Email Notification System (src/lib/email-service.ts)

#### Template-Based Email System

```typescript
export const emailNotifications = {
  applicationSubmitted: (candidateEmail: string, candidateName: string, jobDetails: any) => ({
    to: candidateEmail,
    subject: `Application Received - ${jobDetails.jobTitle}`,
    html: generateEmailTemplate("applicationSubmitted", {
      candidateName,
      jobTitle: jobDetails.jobTitle,
      companyName: jobDetails.company.name,
    }),
    text: generatePlainTextEmail("applicationSubmitted", { candidateName, jobTitle: jobDetails.jobTitle }),
  }),

  statusUpdate: (application: Application, newStatus: string) => ({
    to: application.applicant?.email,
    subject: `Application Update - ${application.job?.jobTitle}`,
    html: generateEmailTemplate("statusUpdate", {
      candidateName: application.applicant?.name,
      jobTitle: application.job?.jobTitle,
      newStatus: statusLabels[newStatus],
      applicationId: application.id,
    }),
  }),
};
```

### Dashboard Component Patterns

#### Job Seeker Application Dashboard (src/app/[lang]/profile/applications/ApplicationDashboardClient.tsx)

```tsx
// Application status tracking with real-time updates
export default function ApplicationDashboardClient({ locale }: Props) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [filter, setFilter] = useState<ApplicationStatus | "all">("all");

  // Status-based filtering and sorting
  const filteredApplications = applications
    .filter((app) => filter === "all" || app.status === filter)
    .sort((a, b) => new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime());

  // Withdraw application with confirmation
  const handleWithdraw = async (applicationId: string) => {
    if (!confirm(t("applications.confirmWithdraw"))) return;

    const response = await fetch(`/api/applications/${applicationId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setApplications((prev) => prev.filter((app) => app.id !== applicationId));
      toast.success(t("applications.withdrawSuccess"));
    }
  };
}
```

#### HR Pipeline Management Interface (src/app/[lang]/jobs/manage/applications/HRApplicationsClient.tsx)

```tsx
// Kanban-style pipeline with drag-and-drop status updates
const statusColumns = ["APPLIED", "UNDER_REVIEW", "INTERVIEW", "OFFER", "HIRED", "REJECTED"] as const;

// Bulk operations for HR efficiency
const handleBulkStatusUpdate = async (applicationIds: string[], newStatus: string) => {
  const updates = await Promise.all(
    applicationIds.map((id) =>
      fetch(`/api/applications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
    )
  );

  // Update local state and send notifications
  setApplications((prev) =>
    prev.map((app) =>
      applicationIds.includes(app.id) ? { ...app, status: newStatus, updatedAt: new Date().toISOString() } : app
    )
  );
};
```

### File Upload System (src/app/api/upload/resume/route.ts)

#### Resume Upload with Validation

```typescript
const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  // File validation
  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
  }

  // Generate unique filename and save
  const filename = `${userId}_${timestamp}_${sanitized}`;
  await writeFile(filepath, buffer);

  return NextResponse.json({
    filename,
    url: `/uploads/resumes/${filename}`,
    size: file.size,
    type: file.type,
  });
}
```

### Internationalization Pattern (Multi-language Support)

#### Comprehensive Translation Keys (src/lang/en.json, fr.json, es.json)

```json
{
  "applications": {
    "form": {
      "title": "Apply for Position",
      "coverLetter": "Cover Letter",
      "resumeUpload": "Upload Resume",
      "portfolioLinks": "Portfolio Links",
      "expectedSalary": "Expected Salary",
      "submit": "Submit Application"
    },
    "status": {
      "APPLIED": "Applied",
      "UNDER_REVIEW": "Under Review",
      "INTERVIEW": "Interview",
      "OFFER": "Offer Extended",
      "HIRED": "Hired",
      "REJECTED": "Not Selected",
      "WITHDRAWN": "Withdrawn"
    },
    "actions": {
      "withdraw": "Withdraw Application",
      "viewDetails": "View Details",
      "scheduleInterview": "Schedule Interview"
    }
  }
}
```

### Job Detail Integration (src/app/[lang]/jobs/[id]/JobDetailPageClient.tsx)

#### Modal Application Form Integration

```tsx
// Apply button with authentication check and modal
const handleApplyClick = () => {
  if (!user) {
    router.push(`/${locale}/auth/login?redirect=${encodeURIComponent(pathname)}`);
    return;
  }

  if (user.userType !== "JOB_SEEKER") {
    toast.error(t("jobs.onlyJobSeekersCanApply"));
    return;
  }

  setShowApplicationForm(true);
};

// Modal dialog with proper state management
{
  showApplicationForm && (
    <Dialog open={showApplicationForm} onOpenChange={setShowApplicationForm}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <ApplicationForm
          job={job}
          locale={locale}
          onSuccess={() => setShowApplicationForm(false)}
          onCancel={() => setShowApplicationForm(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
```

### Authentication Integration Pattern

#### User Type Validation

```typescript
// Authentication middleware pattern
const getCurrentUser = async (request: NextRequest) => {
  const token = request.headers.get("authorization");
  if (!token) return null;

  // Validate JWT and return user with type
  return {
    id: "user-id",
    email: "user@example.com",
    name: "User Name",
    userType: "JOB_SEEKER" | "COMPANY" | "HR_MANAGER",
  };
};

// Role-based access control in API endpoints
if (user.userType !== "JOB_SEEKER") {
  return NextResponse.json({ error: "Only job seekers can apply" }, { status: 403 });
}
```

### Error Handling & User Feedback

#### Toast Notification Integration

```tsx
// Success/error feedback with internationalization
const handleApplicationSubmit = async (data) => {
  try {
    const response = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Submission failed");

    toast.success(t("applications.submitSuccess"));
    onSuccess();
  } catch (error) {
    toast.error(t("applications.submitError"));
    console.error("Application submission error:", error);
  }
};
```

### Component Installation Commands Used

```bash
# Required shadcn/ui components for Story 4.1
npx shadcn@latest add alert-dialog
npx shadcn@latest add tabs
npx shadcn@latest add dialog
npx shadcn@latest add form
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add select
npx shadcn@latest add button
npx shadcn@latest add badge
npx shadcn@latest add card
npx shadcn@latest add avatar
```

### Key Implementation Lessons

#### 1. Form Validation with React Hook Form + Zod

- Always use controlled components with proper validation
- Implement file upload with progress feedback
- Handle form state management for complex multi-step flows

#### 2. API Design Patterns

- RESTful endpoints with proper HTTP methods
- Comprehensive error handling and status codes
- Email notifications triggered by state changes

#### 3. State Management

- Use React state for local component data
- Implement optimistic updates for better UX
- Handle loading states and error boundaries

#### 4. Authentication Flow

- Role-based access control at API and component level
- Redirect patterns for unauthenticated users
- Session management with proper token validation

#### 5. Multi-language Support

- Comprehensive translation keys for all user-facing text
- Consistent i18n patterns across components
- Locale-aware routing and formatting

**Story 4.1 Status**: ✅ **COMPLETE** - Full application lifecycle management system with email notifications, file uploads, and multi-language support implemented and tested.
