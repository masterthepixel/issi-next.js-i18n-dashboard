# PayloadCMS Field Verification Request

## 📋 **DOCUMENT INFORMATION**

- **Request ID:** PAYLOAD-FIELD-VERIF-001
- **Purpose:** Verify existing PayloadCMS collections and fields for Story 4.1 implementation
- **Date:** September 4, 2025
- **Target:** PayloadCMS API Administrator

---

## 🎯 **OVERVIEW**

This document requests verification of existing PayloadCMS collections and fields required for **Story 4.1: Job Application & Pipeline Management**. Our frontend implementation assumes certain collections and API endpoints exist, but we need confirmation before proceeding with development.

---

## 📊 **REQUIRED COLLECTIONS VERIFICATION**

### **1. APPLICATIONS COLLECTION**

**Expected API Endpoint:** `https://issi-dashboard-payloadcms.vercel.app/api/applications`

#### **Required Fields:**

```typescript
{
  id: string;                    // Primary key
  jobId: string;                 // Reference to JobPosts collection
  userId: string;                // Reference to Users collection
  status: 'APPLIED' | 'UNDER_REVIEW' | 'INTERVIEW' | 'OFFER' | 'HIRED' | 'REJECTED' | 'WITHDRAWN';
  coverLetter: string;           // Rich text content
  resumeUrl: string;             // URL to uploaded resume file
  portfolioLinks: string[];      // Array of portfolio URLs
  expectedSalary?: number;       // Optional salary expectation
  availability?: string;         // Optional availability info
  appliedAt: string;             // Application timestamp
  updatedAt: string;             // Last update timestamp
  notes?: string;                // Internal notes
  interviews?: Interview[];      // Related interviews (nested)
  score?: number;                // Application scoring
  // Relationships
  job?: JobPost;                 // Populated job details
  applicant?: {                  // Populated user details
    id: string;
    name: string;
    email: string;
    userType: string;
  };
}
```

#### **Required API Endpoints:**

- `POST /api/applications` - Create new application
- `GET /api/applications?page=X&limit=Y` - List applications with pagination
- `GET /api/applications/{id}` - Get single application by ID
- `PUT /api/applications/{id}/status` - Update application status
- `DELETE /api/applications/{id}` - Withdraw/delete application

---

### **2. INTERVIEWS COLLECTION**

**Expected API Endpoint:** `https://issi-dashboard-payloadcms.vercel.app/api/applications/{id}/interviews`

#### **Required Fields:**

```typescript
{
  id: string;                    // Primary key
  applicationId: string;         // Reference to Applications collection
  type: 'PHONE' | 'VIDEO' | 'ONSITE' | 'TECHNICAL';
  scheduledAt: string;           // Interview datetime
  duration: number;             // Duration in minutes
  interviewerIds: string[];     // Array of interviewer user IDs
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELED';
  feedback?: string;             // Interview feedback
  rating?: number;               // Interview rating (1-5)
  meetingUrl?: string;           // Video meeting URL
  notes?: string;                // Additional notes
}
```

#### **Required API Endpoints:**

- `POST /api/applications/{id}/interviews` - Schedule new interview
- `GET /api/applications/{id}/interviews` - List interviews for application

---

### **3. JOBPOSTS COLLECTION (VERIFICATION NEEDED)**

**Expected API Endpoint:** `https://issi-dashboard-payloadcms.vercel.app/api/jobposts`

#### **Required Fields:**

```typescript
{
  id: number;                    // Primary key
  jobTitle: string;              // Job title
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERNSHIP';
  location: string;              // Job location
  salaryFrom?: number;           // Salary range start
  salaryTo?: number;             // Salary range end
  jobDescription: {               // Rich text content
    root: {
      children: Array<{
        type: string;
        children: Array<{ text: string; [key: string]: any }>;
      }>;
    };
  };
  listingDuration: number;       // Days to list job
  benefits: string[];            // Array of benefits
  status: 'DRAFT' | 'PUBLISHED';  // Job status
  company: Company;              // Related company object
  createdAt: string;             // Creation timestamp
  updatedAt: string;             // Last update timestamp
}
```

#### **Required API Endpoints:**

- `GET /api/jobposts/{id}` - Get single job by ID
- `GET /api/jobs/{id}/applications` - Get applications for specific job

---

### **4. COMPANIES COLLECTION (VERIFICATION NEEDED)**

**Expected API Endpoint:** `https://issi-dashboard-payloadcms.vercel.app/api/companies`

#### **Required Fields:**

```typescript
{
  id: number;                    // Primary key
  name: string;                  // Company name
  location: string;              // Company location
  logo?: string | null;          // Company logo URL
  website?: string | null;       // Company website
  xAccount?: string | null;       // Twitter/X account
  about?: string | null;         // Company description
  user?: {                       // Related user (company admin)
    id: number;
    name: string;
    email: string;
    userType: string;
  };
}
```

#### **Required API Endpoints:**

- `GET /api/companies` - List companies
- `GET /api/companies/{id}` - Get single company by ID

---

### **5. USERS COLLECTION (VERIFICATION NEEDED)**

**Expected API Endpoint:** `https://issi-dashboard-payloadcms.vercel.app/api/users`

#### **Required Fields:**

```typescript
{
  id: string; // Primary key
  email: string; // User email
  name: string; // User name
  userType: string; // User type (job_seeker, hr_manager, hiring_manager, admin)
  // Additional user fields as needed
}
```

#### **Required API Endpoints:**

- `POST /api/users/login` - User authentication
- `GET /api/users/me` - Get current user info

---

### **6. ANALYTICS ENDPOINTS (VERIFICATION NEEDED)**

**Expected API Endpoint:** `https://issi-dashboard-payloadcms.vercel.app/api/applications/analytics`

#### **Required Response Structure:**

```typescript
{
  totalApplications: number;
  byStatus: {
    applied: number;
    underReview: number;
    interview: number;
    offer: number;
    hired: number;
    rejected: number;
    withdrawn: number;
  }
  averageTimeToHire: number;
  conversionRates: {
    applicationToInterview: number;
    interviewToOffer: number;
    offerToHire: number;
  }
}
```

#### **Required API Endpoints:**

- `GET /api/applications/analytics` - Get application statistics

---

## 🔍 **VERIFICATION REQUEST**

### **Please confirm:**

1. **Which collections exist in your PayloadCMS instance?**

   - [ ] `applications`
   - [ ] `interviews`
   - [ ] `jobposts`
   - [ ] `companies`
   - [ ] `users`

2. **Which API endpoints are available?**

   - [ ] `POST /api/applications`
   - [ ] `GET /api/applications`
   - [ ] `GET /api/applications/{id}`
   - [ ] `PUT /api/applications/{id}/status`
   - [ ] `DELETE /api/applications/{id}`
   - [ ] `POST /api/applications/{id}/interviews`
   - [ ] `GET /api/applications/{id}/interviews`
   - [ ] `GET /api/jobposts/{id}`
   - [ ] `GET /api/jobs/{id}/applications`
   - [ ] `GET /api/companies`
   - [ ] `GET /api/companies/{id}`
   - [ ] `POST /api/users/login`
   - [ ] `GET /api/users/me`
   - [ ] `GET /api/applications/analytics`

3. **Field Mismatches:**

   - For each existing collection, please provide the actual field structure
   - Highlight any missing fields or field type mismatches
   - Note any additional fields not listed above

4. **Authentication Requirements:**

   - What authentication method is required for each endpoint?
   - Are there any specific permissions or roles needed?

5. **File Upload Capabilities:**
   - Is resume upload supported via the applications collection?
   - What file types and size limits are configured?

---

## 📝 **RESPONSE FORMAT**

Please provide your response in the following format:

```markdown
## 📊 **PAYLOADCMS VERIFICATION RESULTS**

### **Existing Collections:**

- [x] `applications` - ✅ All fields match / ⚠️ Field mismatches / ❌ Missing
- [ ] `interviews` - Status: [✅/⚠️/❌]
- [ ] `jobposts` - Status: [✅/⚠️/❌]
- [ ] `companies` - Status: [✅/⚠️/❌]
- [ ] `users` - Status: [✅/⚠️/❌]

### **Available API Endpoints:**

- [x] `POST /api/applications` - ✅ Working / ⚠️ Issues / ❌ Not available
- [ ] `GET /api/applications` - Status: [✅/⚠️/❌]
- ... (continue for all endpoints)

### **Field Mismatches:**

#### Applications Collection:

- ✅ `id: string` - Matches expected
- ⚠️ `jobId: string` - Expected string, found: number
- ❌ `portfolioLinks: string[]` - Missing field
  ... (continue for all mismatched fields)

### **Authentication Requirements:**

- Applications API: JWT token required
- JobPosts API: Public access
  ... (continue for all endpoints)

### **File Upload Support:**

- ✅ Resume upload supported via FormData
- Max file size: 10MB
- Allowed types: PDF, DOC, DOCX

### **Next Steps:**

- [ ] Create missing collections
- [ ] Modify field types
- [ ] Add missing fields
- [ ] Configure authentication
- [ ] Set up file upload
```

---

## 🚀 **NEXT STEPS**

Based on your verification response, we will:

1. **If all collections exist and match:** Proceed with Story 4.1 frontend development
2. **If collections exist with mismatches:** Adapt frontend to match actual schema
3. **If collections are missing:** Create required collections and fields
4. **If endpoints are missing:** Implement missing API endpoints

---

## 📞 **CONTACT INFORMATION**

**Requester:** Product Owner - Job Portal Project
**Priority:** High - Blocking Story 4.1 development
**Expected Response Time:** 2-3 business days

**Thank you for your assistance in verifying our PayloadCMS setup!** 🙏
