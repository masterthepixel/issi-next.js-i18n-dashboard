# Technical Design: Job Portal Frontend Shard

### Document Information
*   **Design ID:** TD-JOB-FE-001
*   **Shard:** `job-portal-frontend`
*   **Project:** PayloadCMS Blog & Job Portal
*   **Version:** 1.0
*   **Author:** Architect (bmad-architect)
*   **Date:** August 26, 2025
*   **Status:** Draft

---

### 1. Introduction

This document outlines the technical specifications for the `job-portal-frontend` shard. It covers the Next.js page structure for public and protected views, React components, data fetching strategies, authentication, and styling for the Company Job Portal.

---

### 2. Next.js Page Structure

The Job Portal will have both public-facing pages (for job seekers) and protected pages (for internal staff and applicants). The initial version will be in English, but the structure will support future i18n.

#### 2.1. File Structure

```
src/
├── (auth)/                      // Authentication pages (NextAuth convention)
│   ├── signin/
│   │   └── page.tsx            // Sign-in page
│   └── register/
│       └── page.tsx            // User registration page
│
└── app/
    ├── careers/                  // Public-facing pages
    │   ├── page.tsx              // Job listings index
    │   ├── [slug]/
    │   │   └── page.tsx          // Job detail page
    │   └── apply/
    │       └── [slug]/
    │           └── page.tsx      // Job application form (requires auth)
    │
    └── dashboard/                // Protected pages (requires auth)
        ├── layout.tsx            // Dashboard layout
        ├── hr-manager/
        │   ├── page.tsx          // HR Manager dashboard
        │   ├── applications/
        │   │   └── [id]/
        │   │       └── page.tsx  // Application detail view for HR
        │   └── jobs/
        │       └── manage/
        │           └── [slug]/
        │               └── page.tsx // Job management for HR
        │
        ├── hiring-manager/
        │   ├── page.tsx          // Hiring Manager dashboard
        │   └── applications/
        │       └── [id]/
        │           └── page.tsx  // Application detail/review for Hiring Manager
        │
        └── job-seeker/
            ├── page.tsx          // Job Seeker dashboard
            └── applications/
                └── page.tsx      // List of user's own applications
```

#### 2.2. Page Specifications

*   **`src/app/(auth)/signin/page.tsx` (Sign-In Page)**
    *   **Purpose:** Provides a form for existing users to sign in to their accounts.
    *   **Authentication:** This page is public but handles authentication. It will use NextAuth.js's `signIn` function.
    *   **URL:** `/signin`
    *   **Key UI Elements:**
        *   Input fields for `email` and `password`.
        *   "Sign In" button.
        *   Link to the registration page (`/register`) for new users.
        *   Link to a "Forgot Password" flow (can be a future enhancement, for MVP it can be a placeholder).
        *   Error message display area for authentication failures.

*   **`src/app/(auth)/register/page.tsx` (User Registration Page)**
    *   **Purpose:** Provides a form for new users, specifically "Job Seekers," to create an account. For MVP, self-registration for HR/Hiring Managers will be disabled; these accounts will be created by an Admin.
    *   **Authentication:** This page is public but creates a user. On successful submission, it will create a new user in the PayloadCMS `Users` collection via a Next.js API route.
    *   **URL:** `/register`
    *   **Key UI Elements:**
        *   Input fields for `name`, `email`, `password`, and `confirm password`.
        *   Checkbox to agree to terms and conditions.
        *   "Register" button.
        *   Link to the sign-in page (`/signin`) for existing users.
        *   Success message upon registration, instructing the user to check their email (if email verification is implemented) or simply informing them they can now sign in. For MVP, immediate sign-in might be preferred.
        *   Error message display area for validation/creation failures (e.g., email already exists).

*   **`src/app/careers/page.tsx` (Public Job Listings)**
    *   **Purpose:** Displays a searchable and filterable list of open job positions.
    *   **Data Fetching:** `getStaticProps` or client-side fetch for dynamic search/filter.
    *   **URL:** `/careers`
    *   **Key UI Elements:**
        *   Search input for job titles/keywords.
        *   Filter dropdowns (e.g., location, department, employment type).
        *   Grid/list of `JobCard` components.
        *   Pagination.

*   **`src/app/careers/[slug]/page.tsx` (Public Job Detail)**
    *   **Purpose:** Displays the full details of a specific job.
    *   **Data Fetching:** `getStaticProps` (with `getStaticPaths`) or `getServerSideProps`.
    *   **URL:** `/careers/:slug`
    *   **Key UI Elements:**
        *   Job title, description, requirements, responsibilities.
        *   Location, salary range, employment type, application deadline.
        *   "Apply for this Job" button (links to the application form).

*   **`src/app/careers/apply/[slug]/page.tsx` (Application Form)**
    *   **Purpose:** A form for authenticated job seekers to apply for a job.
    *   **Authentication:** Protected route using NextAuth.js middleware. Redirects unauthenticated users to a login page.
    *   **Data Fetching:** `getServerSideProps` to fetch job details and pre-fill user info if available.
    *   **URL:** `/careers/apply/:slug`
    *   **Key UI Elements:**
        *   Form fields: Cover letter (textarea), Resume upload (`FileUpload` component).
        *   Submit button.
        *   Displays job title being applied for.

*   **`src/app/dashboard/layout.tsx` (Dashboard Layout)**
    *   **Purpose:** A common layout for all protected dashboard pages.
    *   **Authentication:** Checks for a valid session.
    *   **UI:** A sidebar or top navigation with links to role-specific dashboards. Displays user info and a logout button.

*   **`src/app/dashboard/hr-manager/page.tsx` (HR Manager Dashboard)**
    *   **Purpose:** Overview for HR Managers.
    *   **Authentication:** Protected route, role-based access (`hr-manager`).
    *   **Data Fetching:** Client-side fetch of relevant data (e.g., new applications, open jobs).
    *   **URL:** `/dashboard/hr-manager`
    *   **Key UI Elements:**
        *   Summary cards (total open jobs, new applications today).
        *   List of recent applications.
        *   Links to manage jobs and view all applications.

*   **`src/app/dashboard/hiring-manager/page.tsx` (Hiring Manager Dashboard)**
    *   **Purpose:** Overview for Hiring Managers.
    *   **Authentication:** Protected route, role-based access (`hiring-manager`).
    *   **Data Fetching:** Client-side fetch of applications assigned to them.
    *   **URL:** `/dashboard/hiring-manager`
    *   **Key UI Elements:**
        *   List of applications assigned to them.
        *   Quick stats on their pipeline.
        *   Links to review assigned applications.

*   **`src/app/dashboard/job-seeker/page.tsx` (Job Seeker Dashboard)**
    *   **Purpose:** Overview for Job Seekers to track their applications.
    *   **Authentication:** Protected route, role-based access (`job-seeker`).
    *   **Data Fetching:** Client-side fetch of their own applications.
    *   **URL:** `/dashboard/job-seeker`
    *   **Key UI Elements:**
        *   List of their submitted applications and their current status.
        *   Link to their profile management.

---

### 3. React Component Design

Components will be modular and built with Shadcn UI.

#### 3.1. Component List

*   **`SignInForm.tsx`**
    *   **Props:** `callbackUrl` (optional, URL to redirect to after sign-in).
    *   **UI:** A form with email and password fields. Uses NextAuth.js's `signIn` action. Handles client-side validation and displays server-side errors.

*   **`RegisterForm.tsx`**
    *   **Props:** None.
    *   **UI:** A form with name, email, password, and confirm password fields. Includes a terms and conditions checkbox. On submit, it sends a `POST` request to a Next.js API route (e.g., `/api/register`) to create the user in PayloadCMS. Handles client-side validation and displays server-side errors.

*   **`JobCard.tsx`**
    *   **Props:** `job` (object from API).
    *   **UI:** Summarizes a job (title, location, type). Links to the job detail page.

*   **`JobDetail.tsx`**
    *   **Props:** `job` (object from API).
    *   **UI:** Displays all details of a job. Includes the "Apply" button.

*   **`ApplicationForm.tsx`**
    *   **Props:** `jobId`, `userId` (from session).
    *   **UI:** Form with cover letter text area and file upload for resume. Manages form state and submission to `/api/applications`.

*   **`FileUpload.tsx`**
    *   **Props:** `onFileSelect` (callback), `acceptedFileTypes`, `maxSize`.
    *   **UI:** A styled file input button and display for the selected file name. Handles client-side validation.

*   **`DashboardLayout.tsx`**
    *   **Props:** `children`, `user` (from session).
    *   **UI:** Renders the common dashboard structure (sidebar, header) and conditionally renders navigation items based on `user.roles`.

*   **`ApplicationPipeline.tsx`**
    *   **Props:** `applications` (array of application objects), `onStatusChange` (callback to update status).
    *   **UI:** A Kanban-style board or a table showing applications, allowing HR/Hiring Managers to drag-and-drop or select to change the application status (e.g., Applied, Under Review, Interview, Rejected).

*   **`ApplicationDetail.tsx`**
    *   **Props:** `application` (object from API).
    *   **UI:** Shows full application details: candidate info, cover letter, resume download link, current status, and an audit log (from `ApplicationStatusLogs`). Allows HR/Hiring Managers to update status and add notes.

---

### 4. Data Fetching Strategy

*   **Public Pages (Job Listings/Details):**
    *   **SSG/SSR:** Use `getStaticProps` (with ISR for listings) or `getServerSideProps` for job details to ensure data is fresh.
*   **Protected Pages (Dashboard, Forms):**
    *   **Client-Side Fetching:** Most dashboard data will be fetched on the client side after authentication. This is suitable for data that changes frequently and is user-specific.
    *   **Server-Side Props for Initial Data:** For pages like the application form, `getServerSideProps` can be used to fetch initial data (like job details) and pass it to the client component, improving initial load performance.
*   **API Client:** The same centralized `src/lib/api.ts` client from the blog shard will be extended to handle requests for the Job Portal collections (`jobs`, `applications`, etc.). It will automatically include the authentication token (JWT from NextAuth.js session) in the headers for protected requests.

---

### 5. Authentication & Authorization

*   **NextAuth.js:** Will be the primary mechanism for handling user authentication (login, registration, sessions).
    *   **Credentials Provider:** Will be configured to authenticate users against the PayloadCMS `Users` collection. This provider will be used by the `SignInForm.tsx` component.
    *   **Session Callback:** Will populate the session object with user data, including the `roles` array from PayloadCMS, which is crucial for role-based access control.
*   **User Registration:**
    *   The `RegisterForm.tsx` component will submit data to a dedicated Next.js API route (e.g., `src/app/api/register/route.ts`).
    *   This API route will handle:
        *   Validating input data.
        *   Hashing the password (using a library like `bcryptjs`).
        *   Creating a new user document in the PayloadCMS `Users` collection with the `job-seeker` role by default.
        *   Returning a success or error response.
    *   Upon successful registration, the user can then be redirected to the sign-in page or automatically signed in.
*   **Middleware:**
    *   A `middleware.ts` file will be created at the root of the `src` directory (or within `src/app` for App Router middleware) to protect routes under `/dashboard` and `/careers/apply`.
    *   It will check for a valid NextAuth.js session and redirect unauthenticated users to the `/signin` page.
*   **Role-Based UI Rendering:**
    *   Inside dashboard components, the `user` object from the session will be inspected to conditionally render UI elements.
    *   Example: In `DashboardLayout.tsx`, the navigation links will change based on whether the user is an `hr-manager`, `hiring-manager`, or `job-seeker`.
    *   Data fetching on the client will also be filtered based on the user's role and ID (e.g., a job-seeker only fetches their own applications).

---

### 6. Styling & Theme Adherence

*   **Design System:** Strict adherence to the Shadcn UI design system.
*   **Theme Variables:** Consistent use of CSS custom properties for all styling.
*   **Responsive Design:** Full responsiveness using Tailwind CSS utilities.
*   **Accessibility (a11y):**
    *   Forms will have proper labels and ARIA attributes.
    *   Interactive elements will be keyboard navigable.
    *   Sufficient color contrast and semantic HTML will be maintained.
    *   File upload components will be accessible.

---

### 7. File Upload Handling

*   **Client-Side:** The `FileUpload` component will handle file selection and client-side validation (file type, size).
*   **Server-Side (API Route):**
    *   A Next.js API route (e.g., `src/app/api/upload/route.ts`) will be created to handle the actual file upload.
    *   This route will receive the file, and then make a `POST` request to the PayloadCMS media upload endpoint (`/api/media`), passing the file and the Payload API token.
    *   This two-step process (Client -> Next.js API -> Payload API) is a common pattern to keep Payload credentials off the client.
    *   The API route will return the URL or ID of the uploaded media from Payload, which can then be used when submitting the application form.