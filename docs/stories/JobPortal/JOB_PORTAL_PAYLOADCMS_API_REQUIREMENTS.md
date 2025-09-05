# Job Portal PayloadCMS API Requirements

> **Document Version**: 1.0.0  
> **Created**: January 2025  
> **Purpose**: Complete specification of PayloadCMS collections, fields, and API endpoints required for the ISSI Job Portal system

## Table of Contents

- [Collection Requirements](#collection-requirements)
- [API Endpoints](#api-endpoints)
- [Data Field Specifications](#data-field-specifications)
- [Authentication & Access Control](#authentication--access-control)
- [File Upload Requirements](#file-upload-requirements)
- [Internationalization Requirements](#internationalization-requirements)
- [Email & Notification Requirements](#email--notification-requirements)
- [Example API Responses](#example-api-responses)

## Collection Requirements

### 1. Job Posts Collection (`jobposts`)

**Collection Slug**: `jobposts`  
**Admin Interface**: Accessible at `/admin/collections/jobposts`  
**Public API**: `/api/jobposts`

#### Required Fields

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `jobTitle` | Text | Yes | Job position title (max 200 chars) |
| `slug` | Text | Yes | URL-friendly identifier (auto-generated) |
| `company` | Relationship | Yes | Link to Companies collection |
| `employmentType` | Select | Yes | `full-time`, `part-time`, `contract`, `internship` |
| `location` | Text | Yes | Job location (city, state/country) |
| `remote` | Select | No | `on-site`, `remote`, `hybrid` |
| `salaryFrom` | Number | No | Minimum salary range |
| `salaryTo` | Number | No | Maximum salary range |
| `salaryCurrency` | Select | No | `USD`, `EUR`, `CAD` |
| `description` | RichText | Yes | Detailed job description |
| `requirements` | RichText | No | Job requirements and qualifications |
| `benefits` | Array | No | Array of benefit strings |
| `applicationDeadline` | DateTime | No | Application deadline |
| `status` | Select | Yes | `draft`, `active`, `paused`, `closed` |
| `featured` | Boolean | No | Featured job listing |
| `hiringManager` | Relationship | No | Link to Users collection |
| `department` | Text | No | Department/team name |
| `experienceLevel` | Select | No | `entry`, `mid`, `senior`, `executive` |
| `locale` | Select | Yes | `en`, `es`, `fr` |
| `createdBy` | Relationship | Yes | Link to Users collection |
| `applicationCount` | Number | No | Count of applications (auto-calculated) |
| `viewCount` | Number | No | View counter (default: 0) |

#### Field Configurations

```typescript
// JobPosts Collection Configuration
{
  slug: 'jobposts',
  labels: {
    singular: 'Job Post',
    plural: 'Job Posts'
  },
  admin: {
    defaultColumns: ['jobTitle', 'company', 'employmentType', 'status', 'createdAt']
  },
  fields: [
    {
      name: 'jobTitle',
      type: 'text',
      required: true,
      maxLength: 200,
      localized: true
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar'
      },
      hooks: {
        beforeValidate: [formatSlug('jobTitle')]
      }
    },
    {
      name: 'company',
      type: 'relationship',
      relationTo: 'companies',
      required: true
    },
    {
      name: 'employmentType',
      type: 'select',
      required: true,
      options: [
        { label: 'Full-time', value: 'full-time' },
        { label: 'Part-time', value: 'part-time' },
        { label: 'Contract', value: 'contract' },
        { label: 'Internship', value: 'internship' }
      ]
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      localized: true
    },
    {
      name: 'remote',
      type: 'select',
      options: [
        { label: 'On-site', value: 'on-site' },
        { label: 'Remote', value: 'remote' },
        { label: 'Hybrid', value: 'hybrid' }
      ]
    },
    {
      name: 'salary',
      type: 'group',
      fields: [
        {
          name: 'from',
          type: 'number',
          min: 0
        },
        {
          name: 'to', 
          type: 'number',
          min: 0
        },
        {
          name: 'currency',
          type: 'select',
          defaultValue: 'USD',
          options: [
            { label: 'USD', value: 'USD' },
            { label: 'EUR', value: 'EUR' },
            { label: 'CAD', value: 'CAD' }
          ]
        }
      ]
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      localized: true
    },
    {
      name: 'requirements',
      type: 'richText',
      localized: true
    },
    {
      name: 'benefits',
      type: 'array',
      fields: [
        {
          name: 'benefit',
          type: 'text'
        }
      ]
    },
    {
      name: 'applicationDeadline',
      type: 'date',
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Active', value: 'active' },
        { label: 'Paused', value: 'paused' },
        { label: 'Closed', value: 'closed' }
      ],
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'hiringManager',
      type: 'relationship',
      relationTo: 'users',
      filterOptions: {
        userType: { equals: 'HR_MANAGER' }
      }
    },
    {
      name: 'department',
      type: 'text'
    },
    {
      name: 'experienceLevel',
      type: 'select',
      options: [
        { label: 'Entry Level', value: 'entry' },
        { label: 'Mid Level', value: 'mid' },
        { label: 'Senior Level', value: 'senior' },
        { label: 'Executive', value: 'executive' }
      ]
    },
    {
      name: 'locale',
      type: 'select',
      required: true,
      options: [
        { label: 'English', value: 'en' },
        { label: 'Spanish', value: 'es' },
        { label: 'French', value: 'fr' }
      ],
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'applicationCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        position: 'sidebar'
      }
    },
    {
      name: 'viewCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
        position: 'sidebar'
      }
    }
  ]
}
```

### 2. Companies Collection (`companies`)

**Collection Slug**: `companies`  
**Public API**: `/api/companies`

#### Required Fields

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `name` | Text | Yes | Company name |
| `slug` | Text | Yes | URL-friendly identifier |
| `logo` | Upload | No | Company logo (relationship to Media) |
| `description` | Textarea | No | Company description |
| `website` | Text | No | Company website URL |
| `location` | Text | No | Company headquarters location |
| `industry` | Text | No | Industry/sector |
| `size` | Select | No | `startup`, `small`, `medium`, `large`, `enterprise` |
| `founded` | Number | No | Year founded |
| `locale` | Select | Yes | `en`, `es`, `fr` |

### 3. Applications Collection (`applications`)

**Collection Slug**: `applications`  
**Admin Interface**: `/admin/collections/applications`  
**API**: `/api/applications`

#### Required Fields

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `job` | Relationship | Yes | Link to JobPosts collection |
| `applicant` | Relationship | Yes | Link to Users collection (JOB_SEEKER) |
| `status` | Select | Yes | Application status (pipeline stage) |
| `coverLetter` | Textarea | No | Cover letter text |
| `resume` | Upload | No | Resume file (PDF/DOCX) |
| `portfolioLinks` | Array | No | Array of portfolio URLs |
| `expectedSalary` | Number | No | Expected salary |
| `availabilityDate` | Date | No | Availability start date |
| `notes` | Textarea | No | HR notes (internal) |
| `score` | Number | No | Application rating (1-10) |
| `locale` | Select | Yes | `en`, `es`, `fr` |

#### Status Pipeline Options
```typescript
{
  name: 'status',
  type: 'select',
  required: true,
  defaultValue: 'APPLIED',
  options: [
    { label: 'Applied', value: 'APPLIED' },
    { label: 'Under Review', value: 'UNDER_REVIEW' },
    { label: 'Interview', value: 'INTERVIEW' },
    { label: 'Offer', value: 'OFFER' },
    { label: 'Hired', value: 'HIRED' },
    { label: 'Rejected', value: 'REJECTED' },
    { label: 'Withdrawn', value: 'WITHDRAWN' }
  ]
}
```

### 4. Interviews Collection (`interviews`)

**Collection Slug**: `interviews`  
**API**: `/api/interviews`

#### Required Fields

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `application` | Relationship | Yes | Link to Applications collection |
| `type` | Select | Yes | `PHONE`, `VIDEO`, `ONSITE`, `TECHNICAL` |
| `scheduledAt` | DateTime | Yes | Interview date/time |
| `duration` | Number | Yes | Duration in minutes |
| `interviewers` | Relationship | No | Link to Users (multiple) |
| `status` | Select | Yes | `SCHEDULED`, `COMPLETED`, `CANCELED` |
| `feedback` | Textarea | No | Interview feedback |
| `rating` | Number | No | Rating (1-10) |
| `meetingLink` | Text | No | Video call link |
| `location` | Text | No | Physical location for onsite |

### 5. Users Collection (Enhanced) (`users`)

**Collection Slug**: `users`  
**API**: `/api/users`

#### Required Fields (Job Portal Specific)

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `email` | Email | Yes | User email (unique) |
| `password` | Text | Yes | Hashed password |
| `firstName` | Text | Yes | First name |
| `lastName` | Text | Yes | Last name |
| `userType` | Select | Yes | `JOB_SEEKER`, `HR_MANAGER`, `COMPANY`, `ADMIN` |
| `profile` | Group | No | Job seeker profile data |
| `company` | Relationship | No | Link to Companies (for HR users) |
| `avatar` | Upload | No | Profile picture |
| `locale` | Select | Yes | `en`, `es`, `fr` |
| `onboardingCompleted` | Boolean | No | Profile setup completion |
| `lastLogin` | DateTime | No | Last login timestamp |
| `isActive` | Boolean | Yes | Account status |

#### Job Seeker Profile Fields
```typescript
{
  name: 'profile',
  type: 'group',
  fields: [
    {
      name: 'bio',
      type: 'textarea',
      maxLength: 500
    },
    {
      name: 'workExperience',
      type: 'array',
      fields: [
        { name: 'jobTitle', type: 'text', required: true },
        { name: 'company', type: 'text', required: true },
        { name: 'location', type: 'text' },
        { name: 'startDate', type: 'date', required: true },
        { name: 'endDate', type: 'date' },
        { name: 'current', type: 'checkbox' },
        { name: 'description', type: 'textarea' }
      ]
    },
    {
      name: 'education',
      type: 'array',
      fields: [
        { name: 'institution', type: 'text', required: true },
        { name: 'degree', type: 'text', required: true },
        { name: 'field', type: 'text' },
        { name: 'graduationDate', type: 'date' },
        { name: 'gpa', type: 'text' }
      ]
    },
    {
      name: 'skills',
      type: 'array',
      fields: [
        { name: 'skill', type: 'text' }
      ]
    },
    {
      name: 'resume',
      type: 'upload',
      relationTo: 'media'
    }
  ]
}
```

### 6. Media Collection (Enhanced) (`media`)

**Collection Slug**: `media`  
**API**: `/api/media`

#### File Types Supported
- **Images**: JPEG, PNG, WebP (company logos, avatars)
- **Documents**: PDF, DOC, DOCX (resumes)

## API Endpoints

### 1. Job Posts API

#### Get All Job Posts
```http
GET /api/jobposts?page=1&limit=10&locale=en&depth=2
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10, max: 50)
- `locale` (string): Language code (`en`, `es`, `fr`)
- `depth` (number): Relationship depth (default: 1, max: 3)
- `where` (object): Filter conditions (JSON encoded)
- `sort` (string): Sort field (e.g., `-createdAt`, `jobTitle`)

#### Filter Examples
```http
# Active jobs only
GET /api/jobposts?where={"status":{"equals":"active"}}&sort=-createdAt

# Full-time jobs in specific location
GET /api/jobposts?where={"status":{"equals":"active"},"employmentType":{"equals":"full-time"},"location":{"contains":"New York"}}

# Jobs by company
GET /api/jobposts?where={"company":{"equals":"COMPANY_ID"},"status":{"equals":"active"}}

# Featured jobs
GET /api/jobposts?where={"featured":{"equals":true},"status":{"equals":"active"}}&limit=5

# Jobs with salary range
GET /api/jobposts?where={"salary.from":{"greater_than":50000},"status":{"equals":"active"}}

# Jobs by employment type (multiple)
GET /api/jobposts?where={"employmentType":{"in":["full-time","contract"]},"status":{"equals":"active"}}
```

#### Get Single Job Post
```http
GET /api/jobposts/JOB_ID?depth=2
```

#### Get Job Post by Slug
```http
GET /api/jobposts?where={"slug":{"equals":"senior-developer-position"}}&limit=1&depth=2
```

#### Create Job Post (Admin/HR only)
```http
POST /api/jobposts
Authorization: Bearer JWT_TOKEN
Content-Type: application/json

{
  "jobTitle": "Senior Full-Stack Developer",
  "company": "COMPANY_ID",
  "employmentType": "full-time",
  "location": "New York, NY",
  "remote": "hybrid",
  "salary": {
    "from": 80000,
    "to": 120000,
    "currency": "USD"
  },
  "description": "We are seeking a talented Senior Full-Stack Developer...",
  "requirements": "- 5+ years experience...",
  "benefits": [
    { "benefit": "Health Insurance" },
    { "benefit": "401k Matching" },
    { "benefit": "Remote Work" }
  ],
  "status": "active",
  "locale": "en"
}
```

### 2. Applications API

#### Submit Application
```http
POST /api/applications
Authorization: Bearer JWT_TOKEN
Content-Type: application/json

{
  "job": "JOB_POST_ID",
  "applicant": "USER_ID",
  "coverLetter": "Dear Hiring Manager...",
  "resume": "MEDIA_ID",
  "portfolioLinks": [
    { "link": "https://portfolio.example.com" },
    { "link": "https://github.com/username" }
  ],
  "expectedSalary": 95000,
  "availabilityDate": "2025-02-01",
  "status": "APPLIED",
  "locale": "en"
}
```

#### Get Applications (for Job Seekers)
```http
GET /api/applications?where={"applicant":{"equals":"USER_ID"}}&depth=2
```

#### Get Applications for Job (HR only)
```http
GET /api/applications?where={"job":{"equals":"JOB_POST_ID"}}&depth=2
Authorization: Bearer JWT_TOKEN
```

#### Update Application Status (HR only)
```http
PATCH /api/applications/APPLICATION_ID
Authorization: Bearer JWT_TOKEN
Content-Type: application/json

{
  "status": "INTERVIEW",
  "notes": "Excellent candidate, schedule technical interview"
}
```

### 3. Users/Profile API

#### Get User Profile
```http
GET /api/users/USER_ID?depth=1
Authorization: Bearer JWT_TOKEN
```

#### Update Job Seeker Profile
```http
PATCH /api/users/USER_ID
Authorization: Bearer JWT_TOKEN
Content-Type: application/json

{
  "profile": {
    "bio": "Experienced full-stack developer...",
    "workExperience": [
      {
        "jobTitle": "Senior Developer",
        "company": "Tech Corp",
        "location": "San Francisco, CA",
        "startDate": "2020-01-01",
        "endDate": "2024-12-31",
        "current": false,
        "description": "Led development of..."
      }
    ],
    "education": [
      {
        "institution": "University of Technology",
        "degree": "Bachelor of Science",
        "field": "Computer Science",
        "graduationDate": "2019-05-15"
      }
    ],
    "skills": [
      { "skill": "JavaScript" },
      { "skill": "React" },
      { "skill": "Node.js" },
      { "skill": "Python" }
    ]
  }
}
```

### 4. Companies API

#### Get All Companies
```http
GET /api/companies?locale=en
```

#### Get Company by ID
```http
GET /api/companies/COMPANY_ID?depth=1
```

### 5. Interviews API

#### Schedule Interview (HR only)
```http
POST /api/interviews
Authorization: Bearer JWT_TOKEN
Content-Type: application/json

{
  "application": "APPLICATION_ID",
  "type": "VIDEO",
  "scheduledAt": "2025-01-15T14:00:00.000Z",
  "duration": 60,
  "interviewers": ["INTERVIEWER_USER_ID"],
  "status": "SCHEDULED",
  "meetingLink": "https://zoom.us/j/123456789"
}
```

#### Get Interviews for Application
```http
GET /api/interviews?where={"application":{"equals":"APPLICATION_ID"}}&depth=2
Authorization: Bearer JWT_TOKEN
```

## Data Field Specifications

### Job Description Rich Text Structure

```typescript
interface JobDescription {
  children: Array<{
    type: 'paragraph' | 'heading' | 'list' | 'quote';
    children: Array<{
      text?: string;
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
    }>;
    level?: 1 | 2 | 3 | 4 | 5 | 6; // For headings
    listType?: 'ordered' | 'unordered'; // For lists
  }>;
}
```

### Company Data Structure (with depth=1)

```typescript
interface CompanyData {
  id: string;
  name: string;
  slug: string;
  logo?: {
    id: string;
    url: string;
    alt: string;
  };
  description?: string;
  website?: string;
  location?: string;
  industry?: string;
  size?: 'startup' | 'small' | 'medium' | 'large' | 'enterprise';
  founded?: number;
}
```

## Authentication & Access Control

### Public Access (No Auth Required)
- `GET /api/jobposts` (active jobs only)
- `GET /api/companies`

### Job Seeker Access (Auth Required)
- `POST /api/applications` (submit application)
- `GET /api/applications` (own applications only)
- `PATCH /api/users/[own-id]` (update profile)

### HR Manager Access (Auth Required)
- All job post CRUD operations
- `GET /api/applications` (for their company's jobs)
- `PATCH /api/applications` (status updates)
- `POST /api/interviews` (schedule interviews)

### Admin Access (Auth Required)
- Full access to all collections
- User management
- System analytics

### Access Control Rules

```typescript
// JobPosts Collection Access
access: {
  create: ({ req: { user } }) => {
    return user && ['HR_MANAGER', 'ADMIN'].includes(user.userType);
  },
  read: ({ req: { user } }) => {
    // Public can read active jobs
    if (!user) {
      return { status: { equals: 'active' } };
    }
    // HR can read their company's jobs
    if (user.userType === 'HR_MANAGER') {
      return { company: { equals: user.company } };
    }
    // Admin can read all
    return true;
  },
  update: ({ req: { user } }) => {
    return user && ['HR_MANAGER', 'ADMIN'].includes(user.userType);
  },
  delete: ({ req: { user } }) => {
    return user && user.userType === 'ADMIN';
  }
}

// Applications Collection Access
access: {
  create: ({ req: { user } }) => {
    return user && user.userType === 'JOB_SEEKER';
  },
  read: ({ req: { user } }) => {
    if (!user) return false;
    
    // Job seekers can read their own applications
    if (user.userType === 'JOB_SEEKER') {
      return { applicant: { equals: user.id } };
    }
    
    // HR can read applications for their company's jobs
    if (user.userType === 'HR_MANAGER') {
      return {
        job: {
          company: { equals: user.company }
        }
      };
    }
    
    // Admin can read all
    return user.userType === 'ADMIN';
  },
  update: ({ req: { user } }) => {
    return user && ['HR_MANAGER', 'ADMIN'].includes(user.userType);
  }
}
```

## File Upload Requirements

### Resume Upload Specifications

```typescript
// Media Collection for Resumes
{
  slug: 'media',
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    mimeTypes: [
      'image/jpeg',
      'image/png', 
      'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 100,
        height: 100,
        crop: 'centre'
      },
      {
        name: 'card',
        width: 300,
        height: 300,
        crop: 'centre'
      }
    ]
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true
    },
    {
      name: 'fileType',
      type: 'select',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'Document', value: 'document' }
      ]
    }
  ]
}
```

### File Size Limits
- **Images**: 2MB max (logos, avatars)
- **Documents**: 5MB max (resumes)
- **Supported formats**: 
  - Images: JPEG, PNG, WebP
  - Documents: PDF, DOC, DOCX

## Email & Notification Requirements

### Email Hooks Configuration

```typescript
// Application Collection Hooks
{
  hooks: {
    afterChange: [
      async ({ doc, previousDoc, operation }) => {
        // Send email when application status changes
        if (operation === 'update' && doc.status !== previousDoc?.status) {
          await sendStatusChangeEmail({
            applicant: doc.applicant,
            job: doc.job,
            status: doc.status,
            locale: doc.locale
          });
        }
        
        // Send email when application is submitted
        if (operation === 'create') {
          await sendApplicationSubmittedEmail({
            applicant: doc.applicant,
            job: doc.job,
            locale: doc.locale
          });
        }
      }
    ]
  }
}
```

### Required Email Templates

1. **Application Submitted** (to applicant)
2. **Application Received** (to HR)
3. **Status Change Notifications** (to applicant)
4. **Interview Scheduled** (to applicant and interviewers)
5. **Interview Reminder** (1 day before)

## Example API Responses

### Get Job Posts Response
```json
{
  "docs": [
    {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "jobTitle": "Senior Full-Stack Developer",
      "slug": "senior-full-stack-developer",
      "company": {
        "id": "64f8a1b2c3d4e5f6a7b8c9d1",
        "name": "ISSI",
        "slug": "issi",
        "logo": {
          "id": "64f8a1b2c3d4e5f6a7b8c9d2",
          "url": "/media/issi-logo.png",
          "alt": "ISSI Logo"
        },
        "location": "Washington, DC",
        "website": "https://issi.com"
      },
      "employmentType": "full-time",
      "location": "Washington, DC",
      "remote": "hybrid",
      "salary": {
        "from": 80000,
        "to": 120000,
        "currency": "USD"
      },
      "description": [
        {
          "type": "paragraph",
          "children": [
            {
              "text": "We are seeking a talented Senior Full-Stack Developer to join our growing team..."
            }
          ]
        }
      ],
      "requirements": [
        {
          "type": "list",
          "listType": "unordered",
          "children": [
            {
              "type": "listItem",
              "children": [{ "text": "5+ years of experience in full-stack development" }]
            },
            {
              "type": "listItem", 
              "children": [{ "text": "Proficiency in React, Node.js, and TypeScript" }]
            }
          ]
        }
      ],
      "benefits": [
        { "benefit": "Health Insurance" },
        { "benefit": "401k Matching" },
        { "benefit": "Remote Work Options" },
        { "benefit": "Professional Development" }
      ],
      "applicationDeadline": "2025-02-15T23:59:59.000Z",
      "status": "active",
      "featured": false,
      "department": "Engineering",
      "experienceLevel": "senior",
      "locale": "en",
      "applicationCount": 23,
      "viewCount": 456,
      "createdAt": "2025-01-01T10:00:00.000Z",
      "updatedAt": "2025-01-03T14:30:00.000Z"
    }
  ],
  "totalDocs": 87,
  "limit": 10,
  "totalPages": 9,
  "page": 1,
  "pagingCounter": 1,
  "hasPrevPage": false,
  "hasNextPage": true,
  "prevPage": null,
  "nextPage": 2
}
```

### Get Applications Response (for HR)
```json
{
  "docs": [
    {
      "id": "64f8a1b2c3d4e5f6a7b8c9d3",
      "job": {
        "id": "64f8a1b2c3d4e5f6a7b8c9d0",
        "jobTitle": "Senior Full-Stack Developer",
        "company": {
          "id": "64f8a1b2c3d4e5f6a7b8c9d1",
          "name": "ISSI"
        }
      },
      "applicant": {
        "id": "64f8a1b2c3d4e5f6a7b8c9d4",
        "firstName": "John",
        "lastName": "Developer",
        "email": "john.developer@email.com",
        "profile": {
          "bio": "Experienced full-stack developer with 8 years...",
          "workExperience": [
            {
              "jobTitle": "Senior Developer",
              "company": "Tech Corp",
              "startDate": "2020-01-01",
              "endDate": "2024-12-31",
              "current": false
            }
          ],
          "skills": [
            { "skill": "React" },
            { "skill": "Node.js" },
            { "skill": "TypeScript" }
          ]
        }
      },
      "status": "UNDER_REVIEW",
      "coverLetter": "Dear ISSI Team, I am excited to apply...",
      "resume": {
        "id": "64f8a1b2c3d4e5f6a7b8c9d5",
        "url": "/media/john-developer-resume.pdf",
        "alt": "John Developer Resume"
      },
      "portfolioLinks": [
        { "link": "https://johndeveloper.com" },
        { "link": "https://github.com/johndeveloper" }
      ],
      "expectedSalary": 95000,
      "availabilityDate": "2025-02-01T00:00:00.000Z",
      "notes": "Strong candidate, technical skills align well",
      "score": 8,
      "locale": "en",
      "createdAt": "2025-01-02T09:15:00.000Z",
      "updatedAt": "2025-01-03T11:20:00.000Z"
    }
  ],
  "totalDocs": 23,
  "limit": 10,
  "page": 1,
  "hasNextPage": true
}
```

### Get User Profile Response
```json
{
  "id": "64f8a1b2c3d4e5f6a7b8c9d4",
  "email": "john.developer@email.com",
  "firstName": "John",
  "lastName": "Developer", 
  "userType": "JOB_SEEKER",
  "profile": {
    "bio": "Experienced full-stack developer passionate about creating scalable web applications...",
    "workExperience": [
      {
        "jobTitle": "Senior Full-Stack Developer",
        "company": "Tech Innovations Inc",
        "location": "San Francisco, CA",
        "startDate": "2020-01-01",
        "endDate": "2024-12-31", 
        "current": false,
        "description": "Led development of customer-facing web applications using React and Node.js..."
      },
      {
        "jobTitle": "Full-Stack Developer",
        "company": "StartupXYZ",
        "location": "Remote",
        "startDate": "2018-06-01",
        "endDate": "2019-12-31",
        "current": false,
        "description": "Developed and maintained multiple client projects..."
      }
    ],
    "education": [
      {
        "institution": "University of California, Berkeley",
        "degree": "Bachelor of Science",
        "field": "Computer Science",
        "graduationDate": "2018-05-15",
        "gpa": "3.7"
      }
    ],
    "skills": [
      { "skill": "JavaScript" },
      { "skill": "TypeScript" },
      { "skill": "React" },
      { "skill": "Next.js" },
      { "skill": "Node.js" },
      { "skill": "Python" },
      { "skill": "PostgreSQL" },
      { "skill": "AWS" }
    ],
    "resume": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d5",
      "url": "/media/john-developer-resume.pdf",
      "alt": "John Developer Resume"
    }
  },
  "avatar": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d6",
    "url": "/media/john-developer-avatar.jpg",
    "alt": "John Developer Avatar"
  },
  "locale": "en",
  "onboardingCompleted": true,
  "lastLogin": "2025-01-03T08:30:00.000Z",
  "isActive": true,
  "createdAt": "2024-11-15T12:00:00.000Z",
  "updatedAt": "2025-01-03T09:45:00.000Z"
}
```

## Implementation Checklist

### PayloadCMS Backend Setup
- [ ] Create `jobposts` collection with all required fields
- [ ] Create `companies` collection
- [ ] Create `applications` collection with status pipeline
- [ ] Create `interviews` collection
- [ ] Enhance `users` collection with job portal fields
- [ ] Configure `media` collection for resumes and logos
- [ ] Set up access control rules for each user type
- [ ] Configure file upload validation
- [ ] Set up email notification hooks
- [ ] Configure internationalization
- [ ] Test all API endpoints with proper authentication

### Frontend Integration
- [ ] Update all API functions to match PayloadCMS structure
- [ ] Handle relationship data population (depth parameter)
- [ ] Implement proper error handling for API failures
- [ ] Add loading states throughout the application
- [ ] Test file upload functionality
- [ ] Verify email notifications are triggered
- [ ] Test multi-language support
- [ ] Validate all user types and permissions
- [ ] Performance testing with large datasets

### Data Migration
- [ ] Export existing mock data to PayloadCMS format
- [ ] Create seed data for testing
- [ ] Migrate user accounts and profiles
- [ ] Set up sample job posts and companies
- [ ] Test application submission flow end-to-end
- [ ] Verify interview scheduling functionality

### Security & Testing
- [ ] Test access control for all user types
- [ ] Validate file upload security (virus scanning)
- [ ] Test API rate limiting
- [ ] Verify email template rendering
- [ ] Performance testing with concurrent users
- [ ] Test backup and restore procedures

---

**This document provides the complete specification for PayloadCMS integration with the ISSI Job Portal system. All collections, API endpoints, data structures, and security configurations must match these requirements exactly for proper functionality.**