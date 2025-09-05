# Product Requirements Document: Company Job Portal

### Document Information

- **PRD ID:** PRD-JOBPORTAL-001
- **Product:** Company Job Portal
- **Version:** 2.0
- **Author:** Product Owner
- **Date:** September 2, 2025
- **Status:** ✅ IMPLEMENTATION COMPLETE - September 3, 2025
- **Reference Implementation:** job-marshal-finale-locale-main
- **Implementation Details:** See [Job Board Implementation Complete](docs/PayloadImplementationPlan/JOB_BOARD_IMPLEMENTATION_COMPLETE.md)

## 🎉 Implementation Status: COMPLETE

**Completion Date:** September 3, 2025  
**Implementation Approach:** Custom development following ISSI patterns (not reference copy)  
**Result:** Fully functional job board integrated with existing PayloadCMS backend

### ✅ Completed Features
- **Job Listing Pages** with advanced search and filtering
- **Job Detail Pages** with company profiles and application CTAs  
- **Multi-language Support** (English, Spanish, French)
- **PayloadCMS Integration** with 44+ live job posts
- **Responsive Design** following ISSI design system
- **Next.js 15 Compatibility** with async params and proper SSR

### 🔗 Live URLs
- **Main Jobs:** `/[lang]/jobs` 
- **Job Details:** `/[lang]/jobs/[id]`
- **Career Redirect:** `/[lang]/careers` → `/[lang]/jobs`

**Status: Production Ready** ✅

---

### 10. Reference Implementation Analysis & Copy Strategy

#### | F-20 | **Payment Processing** | **Could-Have** | H-1 | Optional payment processing for premium job listings with tiered pricing based on duration (7/14/30 days). Integration with Stripe for checkout, success/cancel handling, and customer management. |

| F-31 | **Free Listing Management** | **Must-Have** | H-1 | HR Managers can create unlimited free job listings with full feature access. System tracks listing performance and usage analytics. |
| F-32 | **Premium Feature Foundation** | **Should-Have** | H-1 | Technical foundation for premium features (enhanced visibility, analytics, bulk operations) that can be enabled via payment processing in future releases. |0.1. Implementation Source

- **Location:** `C:\Users\kfiagbedzi\Documents\GitHub\issi-dashboard-payloadcms\docs\reference\job-marshal-finale-locale-main`
- **Technology Stack:** Next.js 15.1.5, React 19, Prisma, PostgreSQL, NextAuth.js 5.0
- **Advanced Features:** Stripe payments, UploadThing, Inngest, Arcjet, TipTap editor
- **Analysis Date:** September 2, 2025

#### 10.2. Copy Strategy Overview

**Goal:** Copy 85%+ of reference implementation with minimal modifications, adapting only for PayloadCMS integration and ISSI branding.

**Copy Priority:**

- **Direct Copy (90%+):** Components, utilities, configurations
- **Minor Adaptation (5-10%):** Database queries, API calls
- **Major Rewrite (0-5%):** Authentication, file storage integration

#### 10.3. Frontend Components to Copy

##### 10.3.1. Core UI Components (Direct Copy)

- **Location:** `app/components/`
- **Copy Candidates:**
  - `JobCard.tsx` - Job listing display component
  - `ApplicationForm.tsx` - Multi-step application form
  - `JobFilters.tsx` - Advanced search and filtering
  - `FileUpload.tsx` - Drag-and-drop file upload with progress
  - `RichTextEditor.tsx` - TipTap-based job description editor
  - `ToastNotifications.tsx` - Real-time notification system
  - `ThemeToggle.tsx` - Dark/light mode switcher
  - `LoadingStates.tsx` - Skeleton loaders and spinners
  - `ErrorBoundaries.tsx` - Error handling components
  - `Pagination.tsx` - Job listing pagination
  - `ModalDialogs.tsx` - Confirmation and form modals
  - `SkeletonComponents.tsx` - Reusable skeleton loading components
  - `StateStores/` - Zustand store definitions and hooks

##### 10.3.2. Page Components (Minor Adaptation)

- **Location:** `app/(mainLayout)/`
- **Adaptation Needed:**
  - `jobs/page.tsx` - Job search and listing page
  - `jobs/[id]/page.tsx` - Individual job detail page
  - `my-jobs/page.tsx` - User's job applications dashboard
  - `create-job/page.tsx` - Job posting form (HR only)
  - `profile/page.tsx` - User profile management
  - `applications/page.tsx` - Application management (HR/Hiring Manager)
  - `dashboard/page.tsx` - Analytics and overview dashboard

##### 10.3.3. Form Components (Direct Copy)

- **Location:** `app/components/forms/`
- **Copy Candidates:**
  - `JobPostForm.tsx` - Complete job posting form with validation
  - `UserOnboardingForm.tsx` - Multi-step user registration
  - `CompanyProfileForm.tsx` - Company information form
  - `ApplicationReviewForm.tsx` - Application status update form
  - `SearchForm.tsx` - Advanced job search form

##### 10.3.4. Internationalization & Styling Adaptation

- **i18n Integration Requirements:**

  - All copied components must use existing React-intl setup
  - Replace hardcoded strings with `<FormattedMessage>` components
  - Support EN/ES/FR languages with proper locale switching
  - Maintain consistent translation keys with existing patterns

- **Theme Integration Requirements:**

  - Replace all hardcoded colors with Tailwind theme variables
  - Use existing design tokens from `tailwind.config.ts`
  - Follow established component patterns from shadcn/ui
  - Maintain consistent spacing, typography, and interaction states
  - Adapt color schemes for dark/light mode compatibility

- **Loading State Requirements:**

  - Implement skeleton loaders for all components and pages
  - Create reusable skeleton components matching content layouts
  - Ensure skeletons appear within 100ms of loading states
  - Add smooth animations and accessibility features
  - Support reduced motion preferences for skeleton animations

- **State Management Requirements:**
  - Implement Zustand stores for client-side state management
  - Configure React Query for server state and caching
  - Set up optimistic updates for better UX
  - Implement proper error handling and retry logic
  - Add state persistence for critical user data
  - Ensure proper cleanup to prevent memory leaks

#### 10.4. Backend Integration Points

##### 10.4.1. Database Schema Conversion

- **Source:** `prisma/schema.prisma`
- **Target:** `cms/collections/`
- **Conversion Mapping:**
  ```
  Prisma Model → PayloadCMS Collection
  User → Users (extend existing)
  Company → Companies (new)
  JobSeeker → JobSeekers (new)
  JobPost → JobPosts (new)
  Application → JobApplications (new)
  SavedJob → SavedJobs (new)
  ApplicationStatusLog → ApplicationStatusLogs (new)
  ```

##### 10.4.2. API Endpoints (Adapt for PayloadCMS)

- **Source:** `app/api/`
- **Adaptation Strategy:**
  - Convert Prisma queries to PayloadCMS find/findByID operations
  - Update authentication middleware for PayloadCMS
  - Maintain same response formats for frontend compatibility
  - Preserve error handling and validation logic

##### 10.4.3. Authentication Flow

- **Source:** `lib/auth.ts`, `app/api/auth/[...nextauth]/route.ts`
- **Integration Strategy:**
  - Replace NextAuth Prisma adapter with PayloadCMS adapter
  - Maintain user roles and permissions structure
  - Preserve OAuth provider configurations
  - Keep session management and middleware

#### 10.5. Advanced Features Integration

##### 10.5.1. Payment Processing (Optional Integration)

- **Source:** `lib/stripe/`, `app/api/webhooks/stripe/`
- **Copy Strategy:**
  - Copy Stripe integration infrastructure for future use
  - **Skip payment enforcement** in initial implementation
  - Maintain pricing configuration for future premium features
  - Preserve payment success/failure handling for when enabled

##### 10.5.2. File Upload System (Adapt Storage)

- **Source:** `lib/uploadthing/`, `app/api/uploadthing/`
- **Integration Strategy:**
  - Copy UploadThing configuration and components
  - Update for Vercel Blob storage integration
  - Maintain file validation and security rules
  - Preserve upload progress and error handling

##### 10.5.3. Background Processing (Direct Copy)

- **Source:** `lib/inngest/`, `app/api/inngest/`
- **Copy Strategy:**
  - Copy all Inngest functions and workflows
  - Update database operations for PayloadCMS
  - Maintain job expiration and notification logic
  - Preserve error handling and retry mechanisms

##### 10.5.4. Security Features (Direct Copy)

- **Source:** `lib/arcjet/`, `middleware.ts`
- **Copy Strategy:**
  - Copy Arcjet configuration and rules
  - Maintain bot protection and rate limiting
  - Preserve input sanitization and validation
  - Keep security middleware structure

#### 10.6. Configuration Files to Copy

##### 10.6.1. Direct Copy Files

- **Location:** Root directory
- **Copy Candidates:**
  - `tailwind.config.ts` - Theme and styling configuration
  - `components.json` - shadcn/ui component configuration
  - `tsconfig.json` - TypeScript configuration
  - `next.config.mjs` - Next.js configuration
  - `postcss.config.mjs` - PostCSS configuration
  - `biome.jsonc` - Code formatting and linting

##### 10.6.2. Environment Variables

- **Source:** `.env.example`
- **Adaptation Needed:**
  - Update database connection for PayloadCMS
  - Configure PayloadCMS-specific variables
  - Maintain Stripe, UploadThing, Inngest keys
  - Add Vercel Blob configuration

#### 10.7. Utility Functions & Libraries

##### 10.7.1. Direct Copy Utilities

- **Location:** `lib/`
- **Copy Candidates:**
  - `utils.ts` - General utility functions
  - `constants.ts` - Application constants
  - `types.ts` - TypeScript type definitions
  - `validations.ts` - Form validation schemas
  - `formatters.ts` - Data formatting utilities
  - `date-utils.ts` - Date manipulation functions
  - `search-utils.ts` - Search and filtering logic
  - `state-utils.ts` - State management utilities and helpers
  - `cache-utils.ts` - Caching and persistence utilities

##### 10.7.2. Database Utilities (Adapt)

- **Source:** `lib/db/`
- **Adaptation Strategy:**
  - Convert Prisma client calls to PayloadCMS operations
  - Update query builders and filters
  - Maintain data transformation logic
  - Preserve caching and optimization patterns

#### 10.8. Styling & Theming

##### 10.8.1. Direct Copy Styles

- **Location:** `app/globals.css`, `styles/`
- **Copy Strategy:**
  - Copy all Tailwind CSS custom styles
  - Maintain dark/light theme configurations
  - Preserve component-specific styling
  - Keep responsive design utilities

##### 10.8.2. Theme Integration Requirements

- **Design System Adaptation:**

  - Replace all hardcoded colors (e.g., `#3b82f6`) with theme variables (e.g., `bg-primary`, `text-foreground`)
  - Use existing color palette from ISSI design system
  - Follow established spacing scale and typography hierarchy
  - Maintain consistent border radius and shadow patterns

- **Component Library Integration:**
  - Adapt components to use shadcn/ui variants and styles
  - Follow existing button, input, and card component patterns
  - Use consistent hover/focus/active states
  - Maintain accessibility color contrast ratios

##### 10.8.3. Theme Configuration

- **Source:** `lib/theme/`
- **Copy Candidates:**
  - Theme provider and context
  - Color scheme definitions
  - Typography configurations
  - Animation and transition styles

#### 10.14. Internationalization (i18n) Integration

##### 10.14.1. Language Support Requirements

- **Multi-language Implementation:**
  - All job board pages must support EN/ES/FR
  - Use existing React-intl infrastructure
  - Follow established translation key patterns
  - Support RTL languages if expanded in future

##### 10.14.2. Content Internationalization

- **Component Adaptation:**
  - Replace all hardcoded strings with `<FormattedMessage>` components
  - Use existing translation files structure
  - Maintain consistent message IDs across components
  - Support pluralization and formatting as needed

##### 10.14.3. Date/Number Localization

- **Locale-Specific Formatting:**
  - Use `Intl.DateTimeFormat` for date display
  - Use `Intl.NumberFormat` for salary ranges and statistics
  - Follow existing locale formatting patterns
  - Support currency formatting for future payment features

##### 10.14.4. SEO & Meta Tags

- **Multi-language SEO:**
  - Dynamic meta titles and descriptions per language
  - Hreflang tags for search engine optimization
  - Localized URL structures if needed
  - Social media meta tags in multiple languages

#### 10.9. Testing & Quality Assurance

##### 10.9.1. Test Files (Adapt)

- **Location:** `__tests__/`, `app/**/*.test.tsx`
- **Adaptation Strategy:**
  - Update database mocking for PayloadCMS
  - Maintain component and integration tests
  - Preserve testing utilities and helpers
  - Keep test data and fixtures

##### 10.9.2. Quality Tools

- **Copy Candidates:**
  - ESLint configuration
  - Prettier configuration
  - Testing library setup
  - CI/CD pipeline configuration

#### 10.10. Integration Points & Dependencies

##### 10.10.1. Package Dependencies

- **Compatible Packages (Direct Copy):**
  - All UI libraries (Radix UI, Lucide icons, etc.)
  - Form handling (React Hook Form, Zod)
  - State management (Zustand, React Query)
  - Animation libraries (Framer Motion)
  - Date handling (date-fns)
  - Utility libraries (clsx, tailwind-merge)

##### 10.10.2. External Service Integrations

- **Stripe:** 100% compatible, copy entire integration
- **UploadThing:** Adapt for Vercel Blob alternative
- **Inngest:** 100% compatible, copy with PayloadCMS updates
- **Arcjet:** 100% compatible, copy entire configuration
- **NextAuth:** Adapt adapter for PayloadCMS

#### 10.11. Migration Checklist

##### Phase 1: Foundation (Week 1-2)

- [ ] Copy all UI components and utilities
- [ ] Set up project structure and configuration
- [ ] Install and configure compatible dependencies
- [ ] Copy styling and theme configuration
- [ ] Set up basic routing structure

##### Phase 2: Core Integration (Week 3-4)

- [ ] Convert Prisma schema to PayloadCMS collections
- [ ] Adapt authentication for PayloadCMS
- [ ] **Set up payment infrastructure foundation** (optional integration)
- [ ] Set up file upload system (UploadThing → Vercel Blob)
- [ ] Configure Inngest background processing
- [ ] Implement Zustand stores for state management
- [ ] Set up React Query for server state management
- [ ] Configure WebSocket connections for real-time updates

##### Phase 3: UI Component Adaptation (Week 5-6)

- [ ] Copy job listing components with theme variable adaptation
- [ ] Adapt all components for React-intl integration
- [ ] Replace hardcoded colors with design system variables
- [ ] Implement responsive design patterns
- [ ] Add loading states and error handling
- [ ] Integrate with existing navigation structure
- [ ] Create comprehensive skeleton loading components
- [ ] Implement skeleton loaders for all job board pages
- [ ] Add skeleton animations and accessibility features

##### Phase 4: Internationalization & Theming (Week 7-8)

- [ ] Convert all hardcoded strings to i18n keys
- [ ] Add EN/ES/FR translations for all content
- [ ] Replace all hardcoded styles with theme variables
- [ ] Test theme switching functionality
- [ ] Validate i18n routing and locale switching
- [ ] Ensure proper date/number formatting per locale

##### Phase 5: Feature Implementation (Week 9-10)

- [ ] Update API endpoints for PayloadCMS
- [ ] Adapt database queries and operations
- [ ] Integrate Arcjet security features
- [ ] Set up real-time notifications
- [ ] Implement job search and filtering functionality
- [ ] Add company profile pages

##### Phase 6: Testing & Polish (Week 11-12)

- [ ] Comprehensive testing across all locales
- [ ] Performance optimization for job listings
- [ ] SEO optimization for multi-language content
- [ ] Accessibility testing (WCAG compliance)
- [ ] Cross-browser compatibility testing
- [ ] Mobile responsiveness validation

##### Phase 7: Production Deployment (Week 13-14)

- [ ] Update and run test suites
- [ ] Security hardening
- [ ] Documentation updates
- [ ] Production deployment preparation
- [ ] User training and documentation
- [ ] Launch marketing and communication

#### 10.12. Risk Assessment & Mitigation

##### High-Risk Areas:

- **Database Schema Conversion:** Mitigated by systematic field mapping
- **Authentication Integration:** Mitigated by maintaining NextAuth structure
- **File Storage Migration:** Mitigated by UploadThing to Vercel Blob mapping

##### Low-Risk Areas:

- **UI Components:** 95%+ direct copy compatibility
- **Styling:** 100% Tailwind/shadcn compatibility
- **External Services:** Stripe, Inngest, Arcjet fully compatible

#### 10.13. Success Metrics for Copy Strategy

- **Code Reuse:** Target 85%+ of reference code copied with minimal changes
- **Development Time:** 60% reduction vs. building from scratch
- **Bug Reduction:** 70% fewer bugs due to proven implementation
- **Feature Parity:** 95%+ feature compatibility maintained
- **Performance:** Maintain sub-2-second load times
- **Security:** Preserve enterprise-grade security features
- **Platform Adoption:** Focus on user growth and engagement over immediate monetization
- **Monetization Foundation:** Technical infrastructure ready for future premium features

### 1. Introduction

#### 1.1. Product Vision

To create a centralized, efficient, and branded job portal that streamlines our internal hiring process, attracts a high volume of qualified external talent, and establishes our company as a premier destination for industry professionals. The portal will serve as the primary channel for all our job postings, reducing reliance on third-party boards and building a strong talent pipeline for current and future openings.

#### 1.2. Problem Statement

Our current hiring process is fragmented, relying on multiple external job boards and manual tracking systems. This leads to inefficiencies, high costs, inconsistent candidate experience, and a lack of a centralized talent pool. We need a single, integrated platform to manage job postings, applications, and the review workflow effectively.

#### 1.3. Goals & OKRs (Objectives and Key Results)

- **Objective 1:** Streamline the internal hiring process and reduce time-to-hire.
  - **KR1:** Reduce the average time-to-hire by 25% within 6 months of portal launch.
  - **KR2:** Decrease cost-per-hire attributed to job board fees by 80% within 12 months.
- **Objective 2:** Attract a high volume of qualified and diverse candidates.
  - **KR1:** Increase the number of qualified applications per job opening by 50% within 6 months.
  - **KR2:** Achieve a 30% increase in applications from underrepresented groups within 12 months.
- **Objective 3:** Enhance our employer brand and build a strong talent community.
  - **KR1:** Achieve a 4.5/5 average satisfaction rating from candidates on the application experience within 6 months.
  - **KR2:** Grow the internal talent pipeline (candidate database) by 200% within 12 months.
- **Objective 4:** Establish a scalable platform with optional monetization.
  - **KR1:** Achieve 99.9% uptime with sub-2-second page load times.
  - **KR2:** Build foundation for premium features and payment processing.
  - **KR3:** Enable automated background job processing for enhanced user experience.

---

### 2. User Personas

#### 2.1. Persona 1: "Helen" the HR Manager

- **Demographics:** 40 years old, HR Manager, manages multiple roles simultaneously.
- **Goals:** Wants to post jobs quickly, efficiently screen applications, collaborate with hiring managers, and make data-driven hiring decisions. Values an organized system that saves time.
- **Frustrations:** Sifting through unqualified applications, manually tracking candidate status, chasing hiring managers for feedback, and using disparate systems that don't communicate.
- **Needs from the Portal:**
  - An intuitive dashboard to manage all job postings and applications.
  - Tools to easily create, edit, and close job listings.
  - A clear, configurable application review pipeline.
  - Ability to assign applications to hiring managers and track their progress.
  - Reporting and analytics on time-to-hire, source of hire, etc.

#### 2.2. Persona 2: "Mark" the Hiring Manager

- **Demographics:** 35 years old, Lead Software Engineer, responsible for building his team.
- **Goals:** Wants to find the best possible talent for his team quickly. Values a clear view of top candidates and an easy way to provide feedback.
- **Frustrations:** Being spammed with notifications for irrelevant candidates, having to log into multiple systems, and a lack of context on candidates before reviewing them.
- **Needs from the Portal:**
  - A simple interface to review assigned applications.
  - Ability to easily view candidate profiles, resumes, and application answers.
  - A straightforward way to update application status (e.g., shortlist, reject).
  - Clear communication channels with HR regarding candidates.

#### 2.3. Persona 3: "Pat" the Experienced Professional

- **Demographics:** 32 years old, Senior Developer, actively looking for a new challenge.
- **Goals:** Wants to find a role that matches their skills and career aspirations. Values a clear job description, an easy application process, and transparency on the application status.
- **Frustrations:** Long, complicated application forms, radio silence after applying, and job descriptions that are vague or misleading.
- **Needs from the Portal:**
  - Powerful search and filter functionality to find relevant roles.
  - A simple, fast, and mobile-friendly application process.
  - The ability to upload a resume and potentially a cover letter.
  - A personal dashboard to track the status of their applications.

#### 2.4. Persona 4: "Riley" the Recent Graduate

- **Demographics:** 22 years old, recent Computer Science graduate, looking for an entry-level role or internship.
- **Goals:** Wants to get their foot in the door at a reputable company. Values a clear path for application and opportunities to showcase their projects and potential.
- **Frustrations:** Job descriptions asking for 5 years of experience for entry-level roles, not hearing back from applications, and a lack of guidance on how to stand out.
- **Needs from the Portal:**
  - Easy-to-find entry-level and internship positions.
  - An application process that allows them to highlight projects and education, perhaps in addition to a resume.
  - A clean and encouraging user interface.

#### 2.5. Persona 5: "Finn" the Freelancer

- **Demographics:** 38 years old, freelance UX Designer, looking for short-term contract work.
- **Goals:** Wants to find interesting contract-based projects that fit their skills and schedule. Values flexibility and clear project scopes.
- **Frustrations:** Full-time job listings clogging up search results, and a lack of clarity on contract duration and rates in job descriptions.
- **Needs from the Portal:**
  - Specific filters for contract, freelance, or part-time roles.
  - Clear information on project duration, expected hours, and compensation range in job descriptions.
  - A profile that can highlight their freelance experience and portfolio.

---

### 3. User Stories

- **As an HR Manager (Helen),** I want to create unlimited free job listings, so that I can attract candidates without budget constraints.
- **As an HR Manager (Helen),** I want to see analytics on my job listing performance, so that I can optimize my hiring strategy.
- **As a Job Seeker (Pat/Riley/Finn),** I want to access all job listings without any restrictions, so that I can find the best opportunities.
- **As an Admin,** I want to track platform usage and growth metrics, so that I can plan for future monetization strategies.

---

### 4. Requirements

#### 4.1. Functional Requirements

| ID   | Requirement                     | Priority (MoSCoW) | User Story(s) | Acceptance Criteria                                                                                                                                                                                                                                                              |
| :--- | :------------------------------ | :---------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F-01 | **User Authentication & Roles** | **Must-Have**     | All           | The system must support distinct user roles: Job Seeker, HR Manager, Hiring Manager, and Admin. Users must authenticate via email/password or SSO. Access to features is restricted based on role.                                                                               |
| F-02 | **Job Seeker Profile**          | **Must-Have**     | J-3, J-4, J-5 | Job seekers can create a profile with personal information, work experience, education, skills, and a resume upload.                                                                                                                                                             |
| F-03 | **Job Listing Creation**        | **Must-Have**     | H-1           | HR Managers can create job listings with fields for: Title, Description, Responsibilities, Requirements (skills, experience), Location, Salary Range, Employment Type (Full-time, Part-time, Contract, Internship), and Application Deadline.                                    |
| F-04 | **Job Listing Management**      | **Must-Have**     | H-1           | HR Managers can edit, close, and re-open job listings. They can also manage who the hiring manager is for a specific post.                                                                                                                                                       |
| F-05 | **Job Browsing & Search**       | **Must-Have**     | J-3           | Job seekers can browse all active job listings. A search bar allows searching by keywords. Filters are available for Location, Job Type, and Department.                                                                                                                         |
| F-06 | **Job Detail Page**             | **Must-Have**     | J-3           | Each job has a dedicated page displaying all information from the listing, with a clear "Apply" button.                                                                                                                                                                          |
| F-07 | **Application Submission**      | **Must-Have**     | J-4           | Job seekers can apply for a role by submitting their profile and uploading a resume (PDF, DOCX). An optional cover letter text field can be included.                                                                                                                            |
| F-08 | **Application Review Pipeline** | **Must-Have**     | H-2, H-3      | Applications move through a configurable pipeline: `Applied` -> `Under Review (HR)` -> `Shortlisted` -> `Interview` -> `Rejected` -> `Hired`. Status changes trigger notifications.                                                                                              |
| F-09 | **Hiring Manager Dashboard**    | **Must-Have**     | H-3, H-4      | Hiring Managers see a dashboard of applications assigned to them. They can view candidate details, resume, and update the application status (e.g., Shortlist, Reject).                                                                                                          |
| F-10 | **HR Manager Dashboard**        | **Must-Have**     | H-1, H-2      | HR Managers have a dashboard to view all job postings, all applications, and overall hiring metrics. They can assign applications to hiring managers.                                                                                                                            |
| F-11 | **Application Status Tracking** | **Must-Have**     | J-5           | Job seekers have a dashboard showing all their applications and their current status in the pipeline.                                                                                                                                                                            |
| F-12 | **Admin Dashboard**             | **Must-Have**     | A-1           | Admins can manage all user accounts (create, edit, deactivate), manage job listings, and view system-wide analytics.                                                                                                                                                             |
| F-13 | **Secure File Handling**        | **Must-Have**     | J-4, H-4      | Resume uploads are restricted to specific file types (PDF, DOCX) and a maximum file size (e.g., 5MB). Files are stored securely and are only accessible to authorized users (HR, Hiring Managers).                                                                               |
| F-14 | **Notifications**               | **Must-Have**     | H-3, J-5      | Automated email (or in-app) notifications are sent to users on key events: new application assigned, application status change, new job posted matching profile.                                                                                                                 |
| F-15 | **Audit Trail**                 | **Must-Have**     | A-2           | All changes to application status are logged with a timestamp, the user who made the change, and the old/new status. This log is viewable by Admins and HR Managers.                                                                                                             |
| F-16 | **RESTful API**                 | **Should-Have**   | All           | A set of RESTful APIs is available for core functionalities (e.g., fetching jobs, submitting applications, updating status) to allow for potential future integration with external HR tools.                                                                                    |
| F-17 | **Company Branding**            | **Should-Have**   | H-1, J-3      | The portal's UI can be customized with our company's logo, colors, and branding elements to provide a consistent candidate experience.                                                                                                                                           |
| F-18 | **Advanced Search & Filters**   | **Could-Have**    | J-3           | Add more advanced filters like salary range, experience level, date posted, and remote/hybrid options.                                                                                                                                                                           |
| F-20 | **Payment Processing**          | **Must-Have**     | H-1           | Secure payment processing for job listings with tiered pricing based on duration (7, 14, 30 days). Integration with Stripe for checkout, success/cancel handling, and customer management.                                                                                       |
| F-21 | **Advanced File Upload**        | **Must-Have**     | J-4, H-4      | Secure file upload system supporting multiple formats (PDF, DOCX, images) with size limits, progress tracking, and cloud storage integration.                                                                                                                                    |
| F-22 | **Rich Text Editor**            | **Must-Have**     | H-1           | Professional rich text editor for job descriptions with formatting, links, lists, and media embedding capabilities.                                                                                                                                                              |
| F-23 | **Background Job Processing**   | **Must-Have**     | All           | Automated background processing for job expiration, notifications, and system maintenance tasks.                                                                                                                                                                                 |
| F-24 | **Advanced Security**           | **Must-Have**     | All           | Multi-layer security including bot protection, rate limiting, input sanitization, and real-time threat detection.                                                                                                                                                                |
| F-25 | **Theme Support**               | **Should-Have**   | All           | Dark/light mode support with system preference detection and manual toggle options.                                                                                                                                                                                              |
| F-26 | **Real-time Notifications**     | **Should-Have**   | H-3, J-5      | Toast notifications and in-app alerts for status changes, new applications, and system events.                                                                                                                                                                                   |
| F-27 | **Advanced Analytics**          | **Could-Have**    | A-1           | Comprehensive dashboard analytics including application trends, conversion rates, and performance metrics.                                                                                                                                                                       |
| F-28 | **Saved Jobs**                  | **Could-Have**    | J-3           | Job seekers can save favorite job postings for later review and comparison.                                                                                                                                                                                                      |
| F-29 | **Application Expiration**      | **Could-Have**    | H-2           | Automatic job posting expiration with configurable duration and renewal options.                                                                                                                                                                                                 |
| F-31 | **Loading Skeletons**           | **Must-Have**     | All           | All job board pages and components must display skeleton loaders during data fetching. Skeletons should match the actual content layout and provide smooth loading transitions. Include skeletons for job cards, job details, application forms, dashboards, and search results. |
| F-32 | **Skeleton Performance**        | **Must-Have**     | All           | Loading skeletons must appear within 100ms of navigation. Skeleton animations should be subtle and non-distracting. Skeletons should gracefully handle loading errors and fall back to appropriate error states.                                                                 |
| F-33 | **State Management**            | **Must-Have**     | All           | Comprehensive state management for job listings, user sessions, application data, and UI state. Support for optimistic updates, caching, and real-time synchronization.                                                                                                          |
| F-34 | **Data Synchronization**        | **Must-Have**     | All           | Real-time synchronization of job listings, application status updates, and user notifications across all connected clients.                                                                                                                                                      |

#### 4.2. Non-Functional Requirements

| ID    | Requirement                 | Priority (MoSCoW) | Acceptance Criteria                                                                                                                                                                                                 |
| :---- | :-------------------------- | :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| NF-01 | **Performance**             | **Must-Have**     | Key pages (job search, job details, application form) must load in under 2 seconds. The system must handle peak traffic (e.g., after a new job post) without degradation.                                           |
| NF-02 | **Security**                | **Must-Have**     | All data transmission must be over HTTPS. User passwords must be hashed. Role-based access control must be strictly enforced. The system must be protected against common web vulnerabilities (SQL injection, XSS). |
| NF-03 | **Usability**               | **Must-Have**     | The interface for all user roles must be intuitive, clean, and easy to navigate. The application process for job seekers should be as simple and quick as possible.                                                 |
| NF-04 | **Accessibility (a11y)**    | **Must-Have**     | The public-facing parts of the portal (job search, application form) must conform to WCAG 2.1 Level AA standards.                                                                                                   |
| NF-05 | **Reliability**             | **Must-Have**     | The system must have high uptime (e.g., 99.9%). Notifications must be sent reliably and in a timely manner.                                                                                                         |
| NF-06 | **Scalability**             | **Should-Have**   | The architecture should be able to scale to handle a growing number of job postings, applications, and users over time.                                                                                             |
| NF-08 | **Bot Protection**          | **Must-Have**     | Advanced bot detection and prevention using Arcjet or similar service to protect against automated attacks and spam.                                                                                                |
| NF-09 | **File Security**           | **Must-Have**     | All uploaded files must be scanned for malware, validated for type/size, and stored securely with access controls.                                                                                                  |
| NF-10 | **Payment Security**        | **Must-Have**     | PCI DSS compliance for payment processing with encrypted data transmission and secure token handling.                                                                                                               |
| NF-11 | **Background Processing**   | **Must-Have**     | Reliable background job processing with error handling, retries, and monitoring capabilities.                                                                                                                       |
| NF-12 | **Internationalization**    | **Must-Have**     | Full i18n support for EN/ES/FR with RTL language support and localized content management.                                                                                                                          |
| NF-13 | **Progressive Enhancement** | **Should-Have**   | Graceful degradation for users with JavaScript disabled and progressive loading of features.                                                                                                                        |
| NF-15 | **Loading Performance**     | **Must-Have**     | Loading skeletons must appear within 100ms of user interaction. Content should load within 2 seconds with skeleton placeholders. Skeleton animations should be smooth (60fps) and not cause layout shift.           |
| NF-16 | **Skeleton Accessibility**  | **Must-Have**     | Skeleton loaders must meet WCAG guidelines with appropriate ARIA labels and reduced motion support for users with vestibular disorders.                                                                             |
| NF-17 | **State Performance**       | **Must-Have**     | State updates must be processed within 16ms for smooth 60fps animations. State synchronization should not block the main thread. Memory leaks must be prevented through proper cleanup.                             |
| NF-18 | **Data Consistency**        | **Must-Have**     | All state changes must maintain data consistency across components. Optimistic updates should gracefully handle conflicts and rollbacks.                                                                            |

---

### 5. Success Metrics & KPIs

- **Hiring Efficiency:**

  - **Time-to-Hire:** Average number of days from job posting to offer acceptance. (Target: 25% reduction)
  - **Cost-per-Hire:** Total cost of hiring divided by the number of hires. (Target: 80% reduction in job board fees)
  - **Offer Acceptance Rate:** Percentage of offers made that are accepted. (Target: > 90%)
  - **Application-to-Hire Ratio:** Average applications per successful hire. (Target: < 50)

- **Candidate Attraction & Quality:**

  - **Number of Applications:** Total applications received per month. (Target: 200+ monthly)
  - **Qualified Application Rate:** Percentage meeting basic requirements. (Target: 60% increase)
  - **Source of Hire:** Percentage from portal vs. other channels. (Target: 70%+)
  - **Time-to-Fill:** Average days to fill positions. (Target: < 30 days)

- **User Experience:**

  - **Candidate Satisfaction (CSAT):** Post-application surveys. (Target: 4.5/5)
  - **Application Completion Rate:** Users finishing applications. (Target: > 85%)
  - **HR Satisfaction:** Internal feedback on portal effectiveness. (Target: 4.5/5)
  - **Mobile Usage:** Percentage of sessions from mobile devices. (Target: > 40%)

- **System Performance:**

  - **Uptime/Downtime:** System availability. (Target: 99.9%)
  - **Page Load Speed:** Average load time for key pages. (Target: < 1.5s)
  - **Skeleton Load Time:** Time to display loading skeletons. (Target: < 100ms)
  - **State Update Time:** Time for state updates to reflect in UI. (Target: < 16ms)
  - **Search Response Time:** Job search query response. (Target: < 500ms)
  - **File Upload Success:** Successful resume uploads. (Target: > 98%)

- **Business Impact:**

  - **Platform Adoption:** Number of active job listings and registered users. (Target: 500+ active listings, 1000+ users)
  - **Cost Savings:** Reduction in third-party job board fees. (Target: 85%)
  - **User Acquisition:** New job seekers and companies registered monthly. (Target: 200+ new users/month)
  - **Employer Satisfaction:** Company satisfaction with platform. (Target: 4.5/5)
  - **Revenue Foundation:** Technical readiness for monetization features. (Target: 100% infrastructure in place)

- **Technical Excellence:**
  - **Security Incidents:** Number of security breaches. (Target: 0)
  - **Bug Rate:** Critical bugs per release. (Target: < 2)
  - **Performance Score:** Lighthouse performance score. (Target: > 90)
  - **Accessibility Score:** WCAG compliance score. (Target: AA level)

---

### 6. Constraints & Dependencies

#### 6.1. Constraints

- **Technology Stack:** Must use existing ISSI stack: Next.js 15.5.2, React 19, PayloadCMS, TypeScript, Tailwind CSS, shadcn/ui
- **Internationalization:** Must support EN/ES/FR with existing i18n infrastructure
- **Database:** PostgreSQL via Neon (existing infrastructure)
- **File Storage:** Must integrate with existing Vercel Blob or implement UploadThing
- **Payment Processing:** Optional - foundation to be built but not required for initial launch
- **Security:** Must meet existing security standards and integrate with Arcjet
- **Internal Use Only:** Job postings exclusively for ISSI's own positions
- **Budget:** Development within allocated resources with focus on high ROI features
- **Timeline:** Complete implementation within 20-28 weeks with phased releases

#### 6.2. Dependencies

- **PayloadCMS:** Core backend for data management and API generation
- **Next.js 15.5.2:** Frontend framework with App Router
- **Existing Authentication:** Integration with current auth system
- **Stripe Integration:** For payment processing (existing setup)
- **File Storage:** UploadThing or Vercel Blob integration
- **Background Processing:** Inngest for automated tasks
- **Security Services:** Arcjet for bot protection
- **UI Components:** shadcn/ui component library
- **i18n System:** Existing React-intl setup for EN/ES/FR
- **Database:** Existing Neon PostgreSQL instance

---

### 7. High-Level Technical Architecture Overview

The Job Portal will be a new application within the existing Next.js and PayloadCMS monorepo, leveraging the reference implementation's advanced features and production-ready architecture.

- **Technology Stack:**

  - **Frontend:** Next.js 15.5.2 with App Router, React 19, TypeScript
  - **Backend:** PayloadCMS with PostgreSQL (Neon)
  - **Authentication:** NextAuth.js 5.0 with multiple providers
  - **Payments:** Stripe integration with webhooks
  - **File Storage:** UploadThing or Vercel Blob for secure file handling
  - **Background Jobs:** Inngest for automated processing
  - **Security:** Arcjet for bot protection and rate limiting
  - **UI:** Tailwind CSS with shadcn/ui components
  - **Rich Text:** TipTap editor for job descriptions
  - **Internationalization:** React-intl with EN/ES/FR support

- **Backend (PayloadCMS):**

  - **Collections:** Extended Payload collections:
    - `Users`: Multi-role support (COMPANY, JOB_SEEKER) with onboarding
    - `Companies`: Company profiles with branding and settings
    - `JobSeekers`: Candidate profiles with resume management
    - `JobPosts`: Rich job listings with status tracking and expiration
    - `Applications`: Application pipeline with status management
    - `SavedJobs`: User job bookmarking functionality
    - `ApplicationStatusLogs`: Complete audit trail
  - **Access Control:** Role-based permissions with granular access control
  - **Hooks:** Automated processing for notifications, expirations, and integrations
  - **APIs:** REST/GraphQL endpoints for all core functionalities

- **Frontend (Next.js):**

  - **Routing:** App Router with dynamic routes (`/jobs`, `/jobs/[id]`, `/my-jobs`, etc.)
  - **Authentication:** NextAuth integration with PayloadCMS
  - **State Management:** Advanced state management with Zustand stores for:
  - **User State:** Authentication, profile data, preferences
  - **Job State:** Listings, filters, search results, saved jobs
  - **Application State:** User applications, status tracking, notifications
  - **UI State:** Modals, loading states, theme preferences
  - **Server State:** React Query for API data caching and synchronization
  - **Real-time Updates:** WebSocket integration for live notifications
  - **Components:** Reusable component library with role-based rendering
  - **File Uploads:** Secure upload with progress tracking and validation
  - **Real-time Features:** Toast notifications and live updates
  - **Responsive Design:** Mobile-first with dark/light theme support
  - **Loading States:** Comprehensive skeleton loading system for all components

- **Advanced Features:**

  - **Optional Payment Processing:** Stripe integration ready for premium features
  - **Background Jobs:** Inngest for automated tasks (expiration, notifications)
  - **Security:** Arcjet bot protection, rate limiting, input validation
  - **File Management:** UploadThing integration with secure storage
  - **Rich Text Editing:** TipTap editor for professional job descriptions
  - **Analytics:** Comprehensive tracking and reporting
  - **Internationalization:** Full i18n support with translation management
  - **Loading Experience:** Skeleton loading system for optimal perceived performance
  - **State Management:** Advanced Zustand + React Query for optimal data flow
  - **Real-time Features:** WebSocket integration for live updates
  - **Premium Feature Foundation:** Technical infrastructure for future monetization

- **Data Flow:**
  1.  Companies complete onboarding and create unlimited free job listings
  2.  HR creates job posts with rich content and full feature access
  3.  Job seekers browse, filter, and save interesting positions
  4.  Applications submitted with file uploads and tracked through pipeline
  5.  Automated notifications and status updates via background processing
  6.  State management handles real-time UI updates and data synchronization
  7.  Analytics and reporting for continuous improvement
  8.  Optional premium features available for enhanced functionality

---

### 8. Phased Rollout Plan & Release Criteria

#### 8.1. Phase 1: Core Platform (8-10 Weeks)

- **Features Included:**
  - User authentication and role management (COMPANY, JOB_SEEKER)
  - Company onboarding with profile creation
  - Job seeker profile creation with resume upload
  - **Unlimited free job posting** with rich text editor
  - Job browsing and search functionality
  - Application submission with file uploads
  - Basic dashboard for job management
  - **Payment infrastructure foundation** (optional)
  - Security features (Arcjet, input validation)
  - File upload system (UploadThing)
  - Background job processing setup
- **Release Criteria:**
  - All core user flows functional (post job → browse → apply → manage)
  - **Free job listings working seamlessly**
  - File uploads secure and functional
  - Basic security measures implemented
  - Performance meets sub-2-second target
  - **Foundation for premium features established**

#### 8.2. Enhanced User Experience (4-6 Weeks)

- **Features Included:**
  - Advanced search and filtering (salary, benefits, location)
  - Saved jobs functionality
  - Application status tracking dashboard
  - Real-time notifications and alerts
  - Theme support (dark/light mode)
  - Mobile optimization improvements
  - Bulk operations for HR managers
  - Advanced analytics dashboard
  - Audit trail and compliance features
- **Release Criteria:**
  - Enhanced user experience with 95%+ user satisfaction
  - All notification systems functional
  - Advanced filtering working seamlessly
  - Mobile experience optimized
  - Analytics providing actionable insights

#### 8.3. Advanced Features & Scale (6-8 Weeks)

- **Features Included:**
  - Full internationalization (EN/ES/FR)
  - Advanced analytics and reporting
  - API integrations for external HR tools
  - Performance optimization and caching
  - Advanced security features
  - Automated job expiration and renewal
  - Candidate sourcing and tagging
  - Advanced background processing
  - Scalability improvements
- **Release Criteria:**
  - Full i18n support across all languages
  - System handling 10x current load
  - Advanced analytics operational
  - All security measures at production level
  - API documentation complete

#### 8.4. Production Launch & Monitoring (2-4 Weeks)

- **Features Included:**
  - Production deployment and monitoring
  - Performance optimization
  - Security hardening
  - User training and documentation
  - Launch marketing and communication
  - Post-launch support and monitoring
- **Release Criteria:**
  - 99.9% uptime achieved
  - All performance targets met
  - Security audit passed
  - User adoption metrics positive

---

### 9. Future Considerations (Post-V2.0)

- **AI-Powered Features:**

  - AI candidate-job matching algorithms
  - Automated resume parsing and candidate scoring
  - Smart job description generation
  - Predictive analytics for hiring success

- **Advanced Integrations:**

  - ATS (Applicant Tracking System) integrations
  - Background check service connections
  - Calendar integration for interview scheduling
  - HRIS (Human Resource Information System) sync
  - LinkedIn and social media integrations

- **Enhanced User Experience:**

  - Progressive Web App (PWA) capabilities
  - Offline application drafting
  - Advanced video interviewing features
  - Virtual career fairs and events

- **Enterprise Features:**

  - Multi-company support for staffing agencies
  - Advanced reporting and analytics dashboards
  - Custom branding and white-label options
  - API access for third-party integrations
  - Advanced user management and permissions

- **Mobile Applications:**

  - Native iOS and Android apps
  - Push notifications for application updates
  - Mobile-optimized application process
  - Offline job browsing capabilities

- **Global Expansion:**

  - Additional language support beyond EN/ES/FR
  - Region-specific job markets and regulations
  - Localized payment processing
  - International talent pool access

- **Advanced Analytics:**
  - Diversity and inclusion analytics
  - Predictive hiring analytics
  - Market compensation insights
  - Competitor analysis and benchmarking
