# Strategy for Stripe Integration and Internal Cost Tracking

## 1. Introduction

This document outlines the strategy for handling the Stripe integration from the
reference repository, given the updated requirements. The key changes are:

1. No external users will post jobs; this is an internal-only process.
2. No real payments will be processed for job postings or blog content.
3. The Stripe-related code structure will be retained for potential future use
   but will be dormant.
4. An internal system for tracking the cost associated with each job posting
   will be implemented for budgeting and analytical purposes.
5. **CRITICAL ADDITION:** A simplified user registration system will be
   implemented to enable job application tracking and status management.

## 2. Analysis of the New Requirements

* **Dormant Stripe Integration:** The code for Stripe (Checkout, Webhooks, etc.)
  will be kept in the codebase but will not be exposed or triggered by any
  user-facing flows. This allows for easy reactivation in the future if the
  business model changes (e.g., if we decide to monetize premium content later).
* **Internal Cost Tracking:** The primary business need is to associate a cost
  with each job posting. This is for internal accounting, not for charging
  external parties. This cost could represent marketing spend, recruiter fees,
  or any other internal cost associated with filling a position.
* **No Paywalls:** All job postings and blog content will be freely accessible
  to all site visitors. There will be no payment gateways or access control
  based on purchases.
* **Job Application Tracking:** A user registration system is required to track
  job applications, application status, and enable communication between
  applicants and recruiters.

## 3. Proposed Strategy

### 3.1. Handling the Stripe Code

* **Action:** Retain but do not connect.
* **Details:**
  * The Stripe-related API routes, webhook handlers, and utility functions from
    the reference repository can be brought into the project.
  * However, they will not be linked to any UI elements or application logic.
    For example, there will be no "Pay Now" buttons that trigger Stripe Checkout.
  * The environment variables for Stripe (e.g., `STRIPE_PUBLISHABLE_KEY`,
    `STRIPE_SECRET_KEY`) can be left blank or set to test keys that are not
    used in production.
  * This approach preserves the investment in the integration logic and makes
    it trivial to turn on payments in the future without a major rewrite.

### 3.2. Implementing Internal Cost Tracking for Jobs

* **Action:** Add cost tracking fields to the `jobs` collection in PayloadCMS.
* **Details:**
  * **PayloadCMS Data Model:** When creating the `jobs` collection in
    PayloadCMS, include the following fields:
    * `internalCost` (Number): A field to store the monetary cost associated
      with the job posting (e.g., 5000 for a $5,000 cost).
    * `costCurrency` (Text): A field to store the currency for the cost
      (e.g., "USD", "EUR"). This can have a default value.
    * `costNotes` (Textarea): An optional field for internal notes about the
      cost (e.g., "Includes recruiter fee and ad spend").
  * **PayloadCMS Admin Panel:** These fields will be visible and editable by
    internal users (e.g., HR or administrators) when they create or edit a job
    posting within the PayloadCMS admin interface.
  * **Frontend Display:** The cost information is **for internal use only** and
    should **not** be displayed on the public-facing job detail pages
    (`/[lang]/careers/[jobSlug]`).
* **User Flow (Internal):**
    1. An internal user creates a new job posting in the PayloadCMS admin panel.
    2. They fill in the job details (title, description, etc.).
    3. In a dedicated "Internal Cost Tracking" section of the form, they enter the
       `internalCost`, select the `costCurrency`, and optionally add `costNotes`.
    4. Upon saving, this cost data is stored alongside the job post in the database.
* **Reporting and Analysis (Future Enhancement):**
  * With this data stored, it becomes possible to build internal reports or
    dashboard views to analyze hiring costs over time, by department, or by
    role. This would be a separate feature development task.

### 3.3. Implementing User Registration for Job Applications

* **Action:** Create a simplified user registration and authentication system
  focused specifically on job application tracking.
* **Details:**
  * **Purpose:** Enable job seekers to create accounts, track their applications,
    and communicate with recruiters, while allowing internal users to manage
    the hiring process.
  * **Scope:** This is NOT a full user management system like the reference
    repository's NextAuth.js implementation. It will be a minimal system
    tailored to the job application workflow.
  * **Technical Approach:** Use PayloadCMS's built-in authentication capabilities
    combined with custom API routes for user-facing registration and login.
  * **Data Model:**
    * A basic user model will be created to support registration, login, and
      profile management.
    * User information will be stored in a new `users` collection in PayloadCMS,
      with the following fields:
      * `email` (Text): The user's email address, used for login and
        communication.
      * `passwordHash` (Text): A hashed version of the user's password for
        secure authentication.
      * `name` (Text): The user's full name, for display and communication
        purposes.
      * `role` (Text): To differentiate between regular users (job seekers)
        and internal admin users.
      * `createdAt` (Date): When the user account was created.
      * `updatedAt` (Date): When the user profile was last updated.
  * **PayloadCMS Admin Panel:** Admin users will be able to manage (view, edit,
    delete) user accounts through the PayloadCMS admin interface.
  * **Frontend User Flows:**
    * **Registration:** A public registration form will allow new users to
      create accounts with email, password, and basic profile information.
    * **Login:** A login form for returning users to access their accounts.
    * **Profile Management (Internal):** Admin users can view and edit user
      profiles through the admin panel.
  * **Security Considerations:** Passwords will be stored securely using hashing.
    User sessions will be managed with secure HTTP-only cookies. Rate limiting
    will be implemented to prevent abuse.
  * **Integration with Job Applications:** Once users are registered, they can
    apply to jobs, and their applications will be linked to their user accounts
    for tracking and status management.

## 4. Recommendation

This strategy of **"Dormant Stripe, Active Cost Tracking, and Essential User
Registration"** is the recommended approach. It perfectly aligns with the
updated requirements by:

* **Future-Proofing:** Keeping the Stripe code intact avoids rework if
  monetization is ever desired.
* **Simplicity:** Avoids the complexity and security overhead of a live payment
  system that is not currently needed.
* **Meeting Business Needs:** Directly addresses the requirement for internal
  cost tracking by integrating it seamlessly into the content management
  workflow via PayloadCMS.
* **Enabling Application Tracking:** Provides the essential user registration
  system needed for job application management without the complexity of full
  user management.
* **Maintaining Focus:** Keeps the public-facing site clean and focused on
  providing free access to content and job listings, which supports the primary
  goal of driving traffic and improving SEO.

## 5. Impact on Existing Plan

This strategy significantly refines the integration plan:

* **Simplified Authentication:** A basic user registration system replaces the
  complex NextAuth.js integration, focusing only on what's needed for job
  applications.
* **Streamlined User Management:** User accounts are managed through PayloadCMS
  rather than a separate authentication service.
* **Focused Scope:** The system is designed specifically for job application
  tracking rather than general user management.
* **Reduced Complexity:** Eliminates payment processing while maintaining the
  essential functionality for application tracking.
* **PayloadCMS Focus:** The main backend effort shifts to correctly defining
  the `jobs`, `applications`, and `users` collections with appropriate
  relationships and access controls.
