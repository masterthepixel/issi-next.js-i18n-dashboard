# Story 4.1: PayloadCMS Requirements Document

> **Story**: Job Application & Pipeline Management  
> **Status**: ✅ **IMPLEMENTATION COMPLETE** - PayloadCMS Integration Pending  
> **Created**: September 4, 2025  
> **Purpose**: Define PayloadCMS collections, fields, and API requirements for production deployment

## Overview

This document specifies the exact PayloadCMS collections, field structures, and API endpoints required to replace the current mock implementation of Story 4.1 with a production-ready PayloadCMS backend. All data models and API patterns have been validated through the complete frontend implementation.

## Required PayloadCMS Collections

### 1. Applications Collection

**Collection Slug**: `applications`  
**Admin Label**: "Job Applications"  
**Description**: Stores all job application data and tracks application pipeline status

#### Field Structure

```typescript
// PayloadCMS Collection Config
export const Applications: CollectionConfig = {
  slug: 'applications',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['applicantName', 'jobTitle', 'status', 'appliedAt'],
    group: 'Job Portal',
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false;
      
      // Job seekers can only see their own applications
      if (user.userType === 'JOB_SEEKER') {
        return { userId: { equals: user.id } };
      }
      
      // HR/Company users can see applications for their company's jobs
      if (['COMPANY', 'HR_MANAGER'].includes(user.userType)) {
        return {
          'job.company': { equals: user.companyId }
        };
      }
      
      return false;
    },
    create: ({ req: { user } }) => {
      return user?.userType === 'JOB_SEEKER';
    },
    update: ({ req: { user } }) => {
      return ['COMPANY', 'HR_MANAGER'].includes(user?.userType);
    },
    delete: ({ req: { user } }) => {
      return user?.userType === 'JOB_SEEKER';
    },
  },
  fields: [
    // Core Application Fields
    {
      name: 'jobId',
      type: 'relationship',
      relationTo: 'jobposts',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'userId',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'APPLIED',
      options: [
        { label: 'Applied', value: 'APPLIED' },
        { label: 'Under Review', value: 'UNDER_REVIEW' },
        { label: 'Interview', value: 'INTERVIEW' },
        { label: 'Offer Extended', value: 'OFFER' },
        { label: 'Hired', value: 'HIRED' },
        { label: 'Rejected', value: 'REJECTED' },
        { label: 'Withdrawn', value: 'WITHDRAWN' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    
    // Application Content
    {
      name: 'coverLetter',
      type: 'textarea',
      required: true,
      minLength: 50,
      maxLength: 2000,
      admin: {
        description: 'Candidate cover letter (50-2000 characters)',
      },
    },
    {
      name: 'resumeUrl',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Uploaded resume file (PDF, DOC, DOCX)',
      },
    },
    {
      name: 'portfolioLinks',
      type: 'array',
      maxRows: 5,
      fields: [
        {
          name: 'url',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'https://portfolio-link.com',
          },
        },
        {
          name: 'title',
          type: 'text',
          admin: {
            placeholder: 'Portfolio Description (Optional)',
          },
        },
      ],
    },
    {
      name: 'expectedSalary',
      type: 'number',
      min: 0,
      admin: {
        step: 1000,
        description: 'Expected salary in USD (optional)',
      },
    },
    {
      name: 'availability',
      type: 'textarea',
      maxLength: 500,
      admin: {
        description: 'When can you start? Any scheduling constraints? (optional)',
      },
    },
    
    // Metadata Fields
    {
      name: 'appliedAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
      admin: {
        position: 'sidebar',
        date: {
          displayFormat: 'MMM d, yyyy h:mm a',
        },
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal HR notes (not visible to candidate)',
        condition: (_, siblingData, { user }) => {
          return ['COMPANY', 'HR_MANAGER'].includes(user?.userType);
        },
      },
    },
    {
      name: 'score',
      type: 'number',
      min: 1,
      max: 10,
      admin: {
        description: 'Application score (1-10, HR use only)',
        condition: (_, siblingData, { user }) => {
          return ['COMPANY', 'HR_MANAGER'].includes(user?.userType);
        },
      },
    },
    
    // Computed Fields for Frontend
    {
      name: 'applicantName',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Auto-populated from user relationship',
      },
      hooks: {
        beforeChange: [
          async ({ data, req }) => {
            if (data.userId) {
              const user = await req.payload.findByID({
                collection: 'users',
                id: data.userId,
              });
              return user?.name;
            }
            return data.applicantName;
          },
        ],
      },
    },
    {
      name: 'jobTitle',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Auto-populated from job relationship',
      },
      hooks: {
        beforeChange: [
          async ({ data, req }) => {
            if (data.jobId) {
              const job = await req.payload.findByID({
                collection: 'jobposts',
                id: data.jobId,
              });
              return job?.jobTitle;
            }
            return data.jobTitle;
          },
        ],
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, operation, req }) => {
        // Send email notifications on status changes
        if (operation === 'update' && doc.status !== previousDoc?.status) {
          await sendStatusChangeNotification(doc, req);
        }
        
        // Send application submitted notification for new applications
        if (operation === 'create') {
          await sendApplicationSubmittedNotification(doc, req);
        }
      },
    ],
  },
  timestamps: true,
};
```

### 2. Interviews Collection

**Collection Slug**: `interviews`  
**Admin Label**: "Interview Schedule"  
**Description**: Manages interview scheduling and feedback for applications

#### Field Structure

```typescript
export const Interviews: CollectionConfig = {
  slug: 'interviews',
  admin: {
    useAsTitle: 'id',
    defaultColumns: ['candidateName', 'jobTitle', 'type', 'scheduledFor', 'status'],
    group: 'Job Portal',
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false;
      
      // Job seekers can see interviews for their applications
      if (user.userType === 'JOB_SEEKER') {
        return {
          'application.userId': { equals: user.id }
        };
      }
      
      // HR can see all interviews for their company
      if (['COMPANY', 'HR_MANAGER'].includes(user.userType)) {
        return {
          'application.job.company': { equals: user.companyId }
        };
      }
      
      return false;
    },
    create: ({ req: { user } }) => {
      return ['COMPANY', 'HR_MANAGER'].includes(user?.userType);
    },
    update: ({ req: { user } }) => {
      return ['COMPANY', 'HR_MANAGER'].includes(user?.userType);
    },
    delete: ({ req: { user } }) => {
      return ['COMPANY', 'HR_MANAGER'].includes(user?.userType);
    },
  },
  fields: [
    // Core Interview Fields
    {
      name: 'applicationId',
      type: 'relationship',
      relationTo: 'applications',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Phone Interview', value: 'PHONE' },
        { label: 'Video Interview', value: 'VIDEO' },
        { label: 'In-Person Interview', value: 'IN_PERSON' },
        { label: 'Technical Interview', value: 'TECHNICAL' },
      ],
    },
    {
      name: 'scheduledFor',
      type: 'date',
      required: true,
      admin: {
        date: {
          displayFormat: 'MMM d, yyyy h:mm a',
        },
      },
    },
    {
      name: 'duration',
      type: 'number',
      required: true,
      defaultValue: 60,
      min: 15,
      max: 480,
      admin: {
        description: 'Duration in minutes',
      },
    },
    {
      name: 'location',
      type: 'text',
      admin: {
        description: 'Physical location or "Remote" for video interviews',
      },
    },
    {
      name: 'meetingLink',
      type: 'text',
      admin: {
        description: 'Video meeting URL (for VIDEO interviews)',
        condition: (data) => data.type === 'VIDEO',
      },
    },
    {
      name: 'interviewerIds',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      admin: {
        description: 'Select interviewers',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'SCHEDULED',
      options: [
        { label: 'Scheduled', value: 'SCHEDULED' },
        { label: 'Completed', value: 'COMPLETED' },
        { label: 'Cancelled', value: 'CANCELLED' },
        { label: 'No Show', value: 'NO_SHOW' },
      ],
    },
    
    // Interview Feedback
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Interview notes (visible to HR only)',
      },
    },
    {
      name: 'feedback',
      type: 'richText',
      admin: {
        description: 'Detailed interview feedback',
        condition: (data) => data.status === 'COMPLETED',
      },
    },
    {
      name: 'rating',
      type: 'number',
      min: 1,
      max: 5,
      admin: {
        description: 'Interview rating (1-5 scale)',
        condition: (data) => data.status === 'COMPLETED',
      },
    },
    
    // Computed Fields
    {
      name: 'candidateName',
      type: 'text',
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          async ({ data, req }) => {
            if (data.applicationId) {
              const application = await req.payload.findByID({
                collection: 'applications',
                id: data.applicationId,
                depth: 2,
              });
              const user = await req.payload.findByID({
                collection: 'users',
                id: application.userId,
              });
              return user?.name;
            }
            return data.candidateName;
          },
        ],
      },
    },
    {
      name: 'jobTitle',
      type: 'text',
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          async ({ data, req }) => {
            if (data.applicationId) {
              const application = await req.payload.findByID({
                collection: 'applications',
                id: data.applicationId,
                depth: 2,
              });
              const job = await req.payload.findByID({
                collection: 'jobposts',
                id: application.jobId,
              });
              return job?.jobTitle;
            }
            return data.jobTitle;
          },
        ],
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        // Send interview scheduled notification
        if (operation === 'create') {
          await sendInterviewScheduledNotification(doc, req);
        }
        
        // Send interview update notifications
        if (operation === 'update') {
          await sendInterviewUpdateNotification(doc, req);
        }
      },
    ],
  },
  timestamps: true,
};
```

### 3. Enhanced Users Collection

**Collection Slug**: `users`  
**Admin Label**: "Users"  
**Description**: Enhanced user collection with job portal specific fields

#### Additional Fields Required

```typescript
// Add these fields to existing Users collection
{
  name: 'userType',
  type: 'select',
  required: true,
  defaultValue: 'JOB_SEEKER',
  options: [
    { label: 'Job Seeker', value: 'JOB_SEEKER' },
    { label: 'Company Admin', value: 'COMPANY' },
    { label: 'HR Manager', value: 'HR_MANAGER' },
    { label: 'System Admin', value: 'ADMIN' },
  ],
  admin: {
    position: 'sidebar',
  },
},
{
  name: 'companyId',
  type: 'relationship',
  relationTo: 'companies',
  admin: {
    condition: (data) => ['COMPANY', 'HR_MANAGER'].includes(data.userType),
    description: 'Required for company/HR users',
  },
},
{
  name: 'profile',
  type: 'group',
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'bio',
      type: 'textarea',
      maxLength: 500,
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
  ],
},
{
  name: 'preferences',
  type: 'group',
  fields: [
    {
      name: 'emailNotifications',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Receive email notifications for application updates',
      },
    },
    {
      name: 'preferredLanguage',
      type: 'select',
      defaultValue: 'en',
      options: [
        { label: 'English', value: 'en' },
        { label: 'French', value: 'fr' },
        { label: 'Spanish', value: 'es' },
      ],
    },
  ],
},
```

### 4. Enhanced JobPosts Collection

**Collection Slug**: `jobposts`  
**Admin Label**: "Job Posts"  
**Description**: Enhanced job posts collection with application tracking

#### Additional Fields Required

```typescript
// Add these fields to existing JobPosts collection
{
  name: 'applicationSettings',
  type: 'group',
  fields: [
    {
      name: 'acceptingApplications',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this job is currently accepting applications',
      },
    },
    {
      name: 'applicationDeadline',
      type: 'date',
      admin: {
        description: 'Last date to accept applications (optional)',
      },
    },
    {
      name: 'requiredDocuments',
      type: 'array',
      fields: [
        {
          name: 'document',
          type: 'select',
          options: [
            { label: 'Resume/CV', value: 'resume' },
            { label: 'Cover Letter', value: 'cover_letter' },
            { label: 'Portfolio', value: 'portfolio' },
            { label: 'References', value: 'references' },
          ],
        },
        {
          name: 'required',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'customQuestions',
      type: 'array',
      maxRows: 5,
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Text', value: 'text' },
            { label: 'Textarea', value: 'textarea' },
            { label: 'Yes/No', value: 'boolean' },
            { label: 'Multiple Choice', value: 'select' },
          ],
        },
        {
          name: 'required',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'options',
          type: 'array',
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'select',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
},
{
  name: 'applicationStats',
  type: 'group',
  admin: {
    readOnly: true,
    description: 'Automatically calculated statistics',
  },
  fields: [
    {
      name: 'totalApplications',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'newApplications',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'interviewsScheduled',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'hires',
      type: 'number',
      defaultValue: 0,
    },
  ],
},
```

### 5. Enhanced Companies Collection

**Collection Slug**: `companies`  
**Admin Label**: "Companies"  
**Description**: Enhanced companies collection with HR settings

#### Additional Fields Required

```typescript
// Add these fields to existing Companies collection
{
  name: 'hrSettings',
  type: 'group',
  fields: [
    {
      name: 'hrEmails',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          admin: {
            placeholder: 'HR Manager, Recruiter, etc.',
          },
        },
        {
          name: 'primary',
          type: 'checkbox',
          admin: {
            description: 'Primary contact for application notifications',
          },
        },
      ],
    },
    {
      name: 'applicationWorkflow',
      type: 'group',
      fields: [
        {
          name: 'autoReviewEnabled',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Automatically move applications to review after submission',
          },
        },
        {
          name: 'customStatuses',
          type: 'array',
          maxRows: 3,
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
            {
              name: 'color',
              type: 'text',
              defaultValue: '#6b7280',
            },
          ],
        },
      ],
    },
    {
      name: 'emailTemplates',
      type: 'group',
      fields: [
        {
          name: 'applicationReceived',
          type: 'richText',
        },
        {
          name: 'statusUpdate',
          type: 'richText',
        },
        {
          name: 'interviewScheduled',
          type: 'richText',
        },
        {
          name: 'offerExtended',
          type: 'richText',
        },
        {
          name: 'applicationRejected',
          type: 'richText',
        },
      ],
    },
  ],
},
```

## Required API Endpoints

### 1. Applications Endpoints

| Method | Endpoint | Purpose | PayloadCMS Equivalent |
|--------|----------|---------|----------------------|
| `POST` | `/api/applications` | Create new application | `POST /api/applications` |
| `GET` | `/api/applications` | List applications (filtered) | `GET /api/applications?where[userId][equals]=user_id` |
| `GET` | `/api/applications/{id}` | Get single application | `GET /api/applications/{id}?depth=2` |
| `PUT` | `/api/applications/{id}` | Update application | `PATCH /api/applications/{id}` |
| `DELETE` | `/api/applications/{id}` | Delete/withdraw application | `DELETE /api/applications/{id}` |

### 2. Interviews Endpoints

| Method | Endpoint | Purpose | PayloadCMS Equivalent |
|--------|----------|---------|----------------------|
| `POST` | `/api/interviews` | Schedule interview | `POST /api/interviews` |
| `GET` | `/api/interviews` | List interviews | `GET /api/interviews?where[applicationId][equals]=app_id` |
| `GET` | `/api/interviews/{id}` | Get single interview | `GET /api/interviews/{id}?depth=2` |
| `PUT` | `/api/interviews/{id}` | Update interview | `PATCH /api/interviews/{id}` |
| `DELETE` | `/api/interviews/{id}` | Cancel interview | `DELETE /api/interviews/{id}` |

### 3. Analytics Endpoints

| Method | Endpoint | Purpose | PayloadCMS Implementation |
|--------|----------|---------|--------------------------|
| `GET` | `/api/applications/analytics` | Application statistics | Custom endpoint using PayloadCMS Local API |
| `GET` | `/api/jobs/{id}/analytics` | Job-specific analytics | Custom endpoint with aggregation queries |

## PayloadCMS Configuration Requirements

### 1. Media Collection Configuration

```typescript
export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticURL: '/uploads',
    staticDir: 'uploads',
    mimeTypes: [
      'image/*',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    adminThumbnail: ({ doc }) => {
      if (doc.mimeType?.startsWith('image/')) {
        return `/uploads/${doc.filename}`;
      }
      return null;
    },
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
};
```

### 2. Email Integration

```typescript
// payload.config.ts email configuration
export default buildConfig({
  // ... other config
  email: {
    transport: {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
    fromAddress: process.env.FROM_EMAIL,
    fromName: process.env.FROM_NAME || 'ISSI Job Portal',
  },
});
```

### 3. Hooks for Email Notifications

```typescript
// Email notification hooks
export const sendApplicationSubmittedNotification = async (doc, req) => {
  const application = await req.payload.findByID({
    collection: 'applications',
    id: doc.id,
    depth: 2,
  });
  
  const user = await req.payload.findByID({
    collection: 'users',
    id: application.userId,
  });
  
  const job = await req.payload.findByID({
    collection: 'jobposts',
    id: application.jobId,
    depth: 1,
  });
  
  // Send email to candidate
  await req.payload.sendEmail({
    to: user.email,
    subject: `Application Received - ${job.jobTitle}`,
    template: 'applicationSubmitted',
    data: {
      candidateName: user.profile.firstName,
      jobTitle: job.jobTitle,
      companyName: job.company.name,
    },
  });
  
  // Send email to HR team
  const hrEmails = job.company.hrSettings.hrEmails
    .filter(hr => hr.primary)
    .map(hr => hr.email);
    
  if (hrEmails.length > 0) {
    await req.payload.sendEmail({
      to: hrEmails,
      subject: `New Application - ${job.jobTitle}`,
      template: 'newApplication',
      data: {
        candidateName: user.profile.firstName,
        jobTitle: job.jobTitle,
        applicationId: application.id,
      },
    });
  }
};

export const sendStatusChangeNotification = async (doc, req) => {
  const application = await req.payload.findByID({
    collection: 'applications',
    id: doc.id,
    depth: 2,
  });
  
  const user = await req.payload.findByID({
    collection: 'users',
    id: application.userId,
  });
  
  const job = await req.payload.findByID({
    collection: 'jobposts',
    id: application.jobId,
    depth: 1,
  });
  
  // Only send email if user wants notifications
  if (user.preferences.emailNotifications) {
    await req.payload.sendEmail({
      to: user.email,
      subject: `Application Update - ${job.jobTitle}`,
      template: 'statusUpdate',
      data: {
        candidateName: user.profile.firstName,
        jobTitle: job.jobTitle,
        companyName: job.company.name,
        newStatus: application.status,
        applicationId: application.id,
      },
    });
  }
};
```

## Database Indexes Required

```sql
-- Applications collection indexes
CREATE INDEX idx_applications_user ON applications(userId, appliedAt DESC);
CREATE INDEX idx_applications_job ON applications(jobId, status, appliedAt DESC);
CREATE INDEX idx_applications_status ON applications(status, appliedAt DESC);
CREATE INDEX idx_applications_company ON applications(jobId, status) WHERE status != 'WITHDRAWN';

-- Interviews collection indexes
CREATE INDEX idx_interviews_application ON interviews(applicationId, scheduledFor);
CREATE INDEX idx_interviews_scheduled ON interviews(scheduledFor, status);
CREATE INDEX idx_interviews_interviewer ON interviews USING GIN(interviewerIds);

-- Users collection indexes
CREATE INDEX idx_users_type ON users(userType, companyId);
CREATE INDEX idx_users_company ON users(companyId) WHERE userType IN ('COMPANY', 'HR_MANAGER');

-- JobPosts collection indexes
CREATE INDEX idx_jobposts_company ON jobposts(companyId, status);
CREATE INDEX idx_jobposts_applications ON jobposts(id, status) WHERE status = 'PUBLISHED';
```

## Environment Variables Required

```env
# PayloadCMS Configuration
PAYLOAD_SECRET=your-super-secret-key
DATABASE_URI=mongodb://localhost:27017/issi-job-portal

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@company.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@issi-dashboard.com
FROM_NAME=ISSI Job Portal

# File Upload Configuration
UPLOAD_MAX_SIZE=5242880
ALLOWED_UPLOAD_TYPES=image/jpeg,image/png,image/webp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document

# Application Configuration
MAX_PORTFOLIO_LINKS=5
APPLICATION_EXPIRY_DAYS=90
DEFAULT_PAGINATION_LIMIT=20
```

## Custom API Endpoints

### 1. Application Analytics Endpoint

```typescript
// Custom endpoint: /api/applications/analytics
export const applicationsAnalytics: Endpoint = {
  path: '/applications/analytics',
  method: 'get',
  handler: async (req, res) => {
    try {
      const { user } = req;
      
      if (!user || !['COMPANY', 'HR_MANAGER'].includes(user.userType)) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
      
      const whereClause = {
        'job.company': { equals: user.companyId }
      };
      
      // Get total applications
      const totalApplications = await req.payload.count({
        collection: 'applications',
        where: whereClause,
      });
      
      // Get applications by status
      const applicationsByStatus = {};
      const statuses = ['APPLIED', 'UNDER_REVIEW', 'INTERVIEW', 'OFFER', 'HIRED', 'REJECTED', 'WITHDRAWN'];
      
      for (const status of statuses) {
        const count = await req.payload.count({
          collection: 'applications',
          where: {
            ...whereClause,
            status: { equals: status }
          }
        });
        applicationsByStatus[status.toLowerCase()] = count.totalDocs;
      }
      
      // Calculate conversion rates
      const applied = applicationsByStatus.applied;
      const interviews = applicationsByStatus.interview;
      const offers = applicationsByStatus.offer;
      const hired = applicationsByStatus.hired;
      
      const conversionRates = {
        applicationToInterview: applied > 0 ? (interviews / applied) * 100 : 0,
        interviewToOffer: interviews > 0 ? (offers / interviews) * 100 : 0,
        offerToHire: offers > 0 ? (hired / offers) * 100 : 0,
      };
      
      // Calculate average time to hire
      const hiredApplications = await req.payload.find({
        collection: 'applications',
        where: {
          ...whereClause,
          status: { equals: 'HIRED' }
        },
        limit: 100,
      });
      
      let averageTimeToHire = 0;
      if (hiredApplications.docs.length > 0) {
        const totalDays = hiredApplications.docs.reduce((sum, app) => {
          const applied = new Date(app.appliedAt);
          const hired = new Date(app.updatedAt);
          const days = Math.ceil((hired - applied) / (1000 * 60 * 60 * 24));
          return sum + days;
        }, 0);
        
        averageTimeToHire = Math.round(totalDays / hiredApplications.docs.length);
      }
      
      return res.json({
        totalApplications: totalApplications.totalDocs,
        byStatus: applicationsByStatus,
        averageTimeToHire,
        conversionRates,
      });
      
    } catch (error) {
      console.error('Analytics error:', error);
      return res.status(500).json({ error: 'Failed to fetch analytics' });
    }
  },
};
```

### 2. Bulk Status Update Endpoint

```typescript
// Custom endpoint: /api/applications/bulk-update
export const bulkUpdateApplications: Endpoint = {
  path: '/applications/bulk-update',
  method: 'post',
  handler: async (req, res) => {
    try {
      const { user } = req;
      const { applicationIds, status, notes } = req.body;
      
      if (!user || !['COMPANY', 'HR_MANAGER'].includes(user.userType)) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
      
      if (!applicationIds || !Array.isArray(applicationIds) || !status) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      
      const updates = [];
      const errors = [];
      
      for (const applicationId of applicationIds) {
        try {
          const updatedApplication = await req.payload.update({
            collection: 'applications',
            id: applicationId,
            data: {
              status,
              notes,
              updatedAt: new Date().toISOString(),
            },
          });
          
          updates.push(updatedApplication);
          
          // Send status change notification
          await sendStatusChangeNotification(updatedApplication, req);
          
        } catch (error) {
          errors.push({ applicationId, error: error.message });
        }
      }
      
      return res.json({
        success: updates.length,
        errors: errors.length,
        updates,
        errors,
      });
      
    } catch (error) {
      console.error('Bulk update error:', error);
      return res.status(500).json({ error: 'Bulk update failed' });
    }
  },
};
```

## Migration Scripts

### 1. Migrate Existing Job Posts

```typescript
// Migration script to add application settings to existing job posts
export const migrateJobPostsForApplications = async (payload) => {
  const jobs = await payload.find({
    collection: 'jobposts',
    limit: 1000,
  });
  
  for (const job of jobs.docs) {
    if (!job.applicationSettings) {
      await payload.update({
        collection: 'jobposts',
        id: job.id,
        data: {
          applicationSettings: {
            acceptingApplications: job.status === 'PUBLISHED',
            requiredDocuments: [
              { document: 'resume', required: true },
              { document: 'cover_letter', required: true },
            ],
            customQuestions: [],
          },
          applicationStats: {
            totalApplications: 0,
            newApplications: 0,
            interviewsScheduled: 0,
            hires: 0,
          },
        },
      });
    }
  }
};
```

### 2. Migrate Users for Job Portal

```typescript
// Migration script to add job portal fields to existing users
export const migrateUsersForJobPortal = async (payload) => {
  const users = await payload.find({
    collection: 'users',
    limit: 1000,
  });
  
  for (const user of users.docs) {
    if (!user.userType) {
      // Set default user type based on existing data
      const userType = user.email.includes('@company.') ? 'COMPANY' : 'JOB_SEEKER';
      
      await payload.update({
        collection: 'users',
        id: user.id,
        data: {
          userType,
          profile: {
            firstName: user.name?.split(' ')[0] || '',
            lastName: user.name?.split(' ')[1] || '',
            phone: '',
            location: '',
            bio: '',
          },
          preferences: {
            emailNotifications: true,
            preferredLanguage: 'en',
          },
        },
      });
    }
  }
};
```

## Deployment Checklist

### PayloadCMS Setup

- [ ] Create all required collections (applications, interviews)
- [ ] Add required fields to existing collections (users, jobposts, companies)
- [ ] Configure media collection for file uploads
- [ ] Set up email service configuration
- [ ] Create custom API endpoints for analytics and bulk operations
- [ ] Configure access control for all collections
- [ ] Set up database indexes for performance
- [ ] Create email templates for notifications

### Environment Configuration

- [ ] Set up environment variables
- [ ] Configure SMTP for email notifications
- [ ] Set up file upload directories and permissions
- [ ] Configure database connection
- [ ] Set up PayloadCMS secret keys
- [ ] Configure CORS for frontend API calls

### Data Migration

- [ ] Run migration scripts for existing data
- [ ] Test email notification system
- [ ] Verify file upload functionality
- [ ] Test all API endpoints with frontend
- [ ] Validate access control permissions
- [ ] Test application workflow end-to-end

### Integration Testing

- [ ] Test frontend integration with PayloadCMS APIs
- [ ] Verify email notifications are sent correctly
- [ ] Test file upload and storage
- [ ] Validate user permissions and access control
- [ ] Test application status workflow
- [ ] Verify interview scheduling functionality
- [ ] Test analytics and reporting features

---

## Summary

This document defines the complete PayloadCMS backend requirements for Story 4.1, including:

**✅ 5 Collection Configurations**
- Applications (new collection)
- Interviews (new collection)
- Enhanced Users collection
- Enhanced JobPosts collection
- Enhanced Companies collection

**✅ Complete Field Specifications**
- 25+ new fields across collections
- Proper validation and constraints
- Admin UI configuration
- Access control rules

**✅ API Endpoint Mapping**
- RESTful endpoints for all operations
- Custom analytics endpoints
- Bulk operation endpoints
- File upload endpoints

**✅ Integration Requirements**
- Email notification system
- File upload configuration
- Database indexes
- Migration scripts

**✅ Production Ready Configuration**
- Environment variables
- Security settings
- Performance optimizations
- Deployment checklist

The frontend implementation is complete and tested with mock data. This PayloadCMS configuration will provide a production-ready backend that exactly matches the frontend requirements.