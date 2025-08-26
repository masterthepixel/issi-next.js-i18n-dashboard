# Technical Design: Job Portal CMS Shard

### Document Information
*   **Design ID:** TD-JOB-CMS-001
*   **Shard:** `job-portal-cms`
*   **Project:** PayloadCMS Blog & Job Portal
*   **Version:** 1.0
*   **Author:** Architect (bmad-architect)
*   **Date:** August 26, 2025
*   **Status:** Draft

---

### 1. Introduction

This document details the technical specifications for the `job-portal-cms` shard. This shard encompasses all PayloadCMS configurations and logic related to the Company Job Portal, including the `Jobs`, `Applications`, and `ApplicationStatusLogs` collections, as well as the necessary access control and hooks.

---

### 2. PayloadCMS Collection Schemas

The Job Portal will require several new collections to be created in the `cms/collections/` directory. The existing `Users` collection will be extended to support the required roles.

#### 2.1. Extended `Users` Collection

The existing `Users` collection (`cms/collections/Users.ts`) will be modified to include a `roles` field. This field will be an array of strings to define the user's permissions within the Job Portal.

*   **New Field in `Users` Collection:**
    ```typescript
    {
      name: 'roles',
      type: 'array',
      required: true,
      defaultValue: ['job-seeker'], // Default role for new registrations
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'role',
          type: 'select',
          options: [
            { label: 'Job Seeker', value: 'job-seeker' },
            { label: 'HR Manager', value: 'hr-manager' },
            { label: 'Hiring Manager', value: 'hiring-manager' },
            { label: 'Admin', value: 'admin' },
          ],
        },
      ],
    }
    ```
*   **Registration Considerations:**
    *   The `Users` collection's `access` control should allow `create` permissions for the `register` API route, which will not be associated with a logged-in user. This can be handled by a specific API key or by temporarily allowing public creation for this specific route and validating the request.
    *   The `password` field in the `Users` collection must be configured to be hashed upon creation. Payload handles this automatically when a user is created via its API, but when creating users via a custom API route, the password must be hashed before being saved to Payload.

#### 2.2. `Jobs` Collection Schema

This collection will store all job listings.

```typescript
// cms/collections/Jobs.ts
import { CollectionConfig } from 'payload/types';

export const Jobs: CollectionConfig = {
  slug: 'jobs',
  admin: {
    useAsTitle: 'title',
    group: 'Job Portal',
  },
  access: {
    read: () => true, // Job listings are public
    create: ({ req }) => req.user?.roles?.includes('hr-manager') || req.user?.roles?.includes('admin'),
    update: ({ req }) => req.user?.roles?.includes('hr-manager') || req.user?.roles?.includes('admin'),
    delete: ({ req }) => req.user?.roles?.includes('admin'),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'responsibilities',
      type: 'richText',
    },
    {
      name: 'requirements',
      type: 'richText',
    },
    {
      name: 'location',
      type: 'text',
      required: true,
    },
    {
      name: 'salaryRange',
      type: 'text', // e.g., "$80,000 - $100,000"
    },
    {
      name: 'employmentType',
      type: 'select',
      required: true,
      options: [
        { label: 'Full-time', value: 'full-time' },
        { label: 'Part-time', value: 'part-time' },
        { label: 'Contract', value: 'contract' },
        { label: 'Internship', value: 'internship' },
      ],
    },
    {
      name: 'applicationDeadline',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Open', value: 'open' },
        { label: 'Closed', value: 'closed' },
        { label: 'On Hold', value: 'on-hold' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'hiringManager',
      type: 'relationship',
      relationTo: 'users',
      filterOptions: ({ req }) => ({
        roles: { contains: ['hiring-manager'] },
      }),
      admin: {
        position: 'sidebar',
        description: 'The primary person responsible for hiring for this role.',
      },
    },
    {
      name: 'department',
      type: 'text',
    },
  ],
};
```

#### 2.3. `Applications` Collection Schema

This collection will store all job applications submitted by users.

```typescript
// cms/collections/Applications.ts
import { CollectionConfig } from 'payload/types';

export const Applications: CollectionConfig = {
  slug: 'applications',
  admin: {
    useAsTitle: 'candidateName', // This will be a virtual field
    group: 'Job Portal',
    listSearchableFields: ['candidateName', 'job.title'],
  },
  access: {
    read: ({ req }) => {
      // Job seekers can read their own applications
      if (req.user?.roles?.includes('job-seeker')) {
        return {
          applicant: {
            equals: req.user.id,
          },
        };
      }
      // HR and Hiring Managers can read applications they are assigned to
      if (req.user?.roles?.includes('hr-manager') || req.user?.roles?.includes('hiring-manager')) {
        return true; // Simplified for now, can be more granular
      }
      // Admins can read all
      if (req.user?.roles?.includes('admin')) {
        return true;
      }
      return false;
    },
    create: ({ req }) => req.user?.roles?.includes('job-seeker'), // Only job seekers can apply
    update: ({ req }) => req.user?.roles?.includes('hr-manager') || req.user?.roles?.includes('hiring-manager') || req.user?.roles?.includes('admin'),
    delete: ({ req }) => req.user?.roles?.includes('admin'),
  },
  hooks: {
    afterChange: [
      ({ doc, req, operation }) => {
        if (operation === 'create') {
          // Send notification to HR/Hiring Manager
          // Example: req.payload.sendEmail(...)
          console.log(`New application received for job: ${doc.job} by user: ${doc.applicant}`);
        }
        if (operation === 'update' && doc.status) {
          // Send notification to applicant about status change
          // Log status change to ApplicationStatusLogs
          console.log(`Application ${doc.id} status changed to ${doc.status}`);
        }
      },
    ],
  },
  fields: [
    {
      name: 'applicant',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      access: {
        // Only job-seekers can be applicants, and they can only select themselves
        // This is typically handled in the form UI, not just access control
      },
      admin: {
        condition: (_, { user }) => user?.roles?.includes('job-seeker'), // Only show for job seekers
      },
    },
    {
      name: 'job',
      type: 'relationship',
      relationTo: 'jobs',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'applied',
      options: [
        { label: 'Applied', value: 'applied' },
        { label: 'Under Review (HR)', value: 'under-review-hr' },
        { label: 'Shortlisted', value: 'shortlisted' },
        { label: 'Interview', value: 'interview' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Hired', value: 'hired' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'coverLetter',
      type: 'textarea',
    },
    {
      name: 'resume',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, { user }) => user?.roles?.includes('job-seeker'), // Only show for job seekers
      },
    },
    // Virtual field for display purposes
    {
      name: 'candidateName',
      type: 'text',
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeRead: [
          ({ siblingData }) => {
            // This would need to be populated via a hook or API aggregation
            // For simplicity, we'll assume it's populated correctly
            return siblingData.applicant?.name || 'N/A';
          },
        ],
      },
    },
  ],
};
```

#### 2.4. `ApplicationStatusLogs` Collection Schema

This collection will serve as an audit trail for all status changes to applications.

```typescript
// cms/collections/ApplicationStatusLogs.ts
import { CollectionConfig } from 'payload/types';

export const ApplicationStatusLogs: CollectionConfig = {
  slug: 'application-status-logs',
  admin: {
    useAsTitle: 'id',
    group: 'Job Portal',
    hidden: true, // Typically not directly managed in the admin UI
  },
  access: {
    read: ({ req }) => req.user?.roles?.includes('hr-manager') || req.user?.roles?.includes('hiring-manager') || req.user?.roles?.includes('admin'),
    create: ({ req }) => req.user?.roles?.includes('hr-manager') || req.user?.roles?.includes('hiring-manager') || req.user?.roles?.includes('admin'), // Created via hooks
    update: () => false, // No updates allowed
    delete: ({ req }) => req.user?.roles?.includes('admin'),
  },
  fields: [
    {
      name: 'application',
      type: 'relationship',
      relationTo: 'applications',
      required: true,
    },
    {
      name: 'fromStatus',
      type: 'text',
      required: true,
    },
    {
      name: 'toStatus',
      type: 'text',
      required: true,
    },
    {
      name: 'changedBy',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      access: {
        // Automatically set to the user who made the change
      },
    },
    {
      name: 'timestamp',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'notes',
      type: 'textarea',
    },
  ],
};
```

---

### 3. Access Control Logic

Access control is role-based and defined within each collection's `access` property.

*   **`Users`:**
    *   Read/Update: Users can update their own profile. Admins can manage all users.
*   **`Jobs`:**
    *   Read: Public.
    *   Create/Update: `hr-manager`, `admin`.
    *   Delete: `admin`.
*   **`Applications`:**
    *   Read: `job-seeker` (own applications only), `hr-manager`, `hiring-manager`, `admin`.
    *   Create: `job-seeker`.
    *   Update: `hr-manager`, `hiring-manager`, `admin`.
    *   Delete: `admin`.
*   **`ApplicationStatusLogs`:**
    *   Read/Create: `hr-manager`, `hiring-manager`, `admin` (creation typically automated via hooks).
    *   Delete: `admin`.

---

### 4. API Endpoints

PayloadCMS will generate standard REST/GraphQL endpoints for these collections. Key interactions include:

*   **Fetching Jobs:** `GET /api/jobs?where[status][equals]=open`
*   **Applying for a Job:** `POST /api/applications` (authenticated job-seeker).
*   **Updating Application Status:** `PATCH /api/applications/:id` (authenticated HR/Hiring Manager/Admin).
*   **Fetching User Applications:** `GET /api/applications?where[applicant][equals]=:userId` (authenticated job-seeker).
*   **Fetching Applications for HR/Hiring Manager:** `GET /api/applications` (with appropriate role-based filtering).

---

### 5. Payload Hooks for Automation

Hooks will be used to automate key business logic.

*   **`Applications.afterChange`:**
    *   **On Create:** Trigger a notification (e.g., email, in-app) to the relevant `hiringManager` and `hr-manager`s associated with the job.
    *   **On Update (Status Change):**
        *   Trigger a notification to the `applicant` about their application's new status.
        *   Create a new entry in the `ApplicationStatusLogs` collection to record the change, including the user who made the change and a timestamp.
*   **`Jobs.afterChange`:**
    *   **On Status Change to 'Closed':** Optionally, notify applicants who have applied to this job that it is no longer open.

---

### 6. Integration with `payload.config.ts`

The new collections must be imported and added to the `payload.config.ts` file.

```typescript
// payload.config.ts
// ... other imports
import { Jobs } from './cms/collections/Jobs';
import { Applications } from './cms/collections/Applications';
import { ApplicationStatusLogs } from './cms/collections/ApplicationStatusLogs';
// Assuming Users collection is already imported and extended

export default buildConfig({
  // ... other config
  collections: [
    // ... other collections
    // Users, // Ensure Users is present
    Jobs,
    Applications,
    ApplicationStatusLogs,
  ],
  // ... other config
});