# PayloadCMS Project Overview

This document provides a high-level overview of the main components that constitute the PayloadCMS part of our project. The PayloadCMS instance is designed to support two primary, distinct features: a Company Blog and a Company Job Portal.

---

## 1. Project Components

The PayloadCMS project is structured around two main products, each with its own set of collections, user roles, and frontend interfaces.

### 1.1. Company Blog

The Company Blog is a content management system designed to publish articles, news, and insights. Its primary goal is to drive organic traffic, establish thought leadership, and engage with our audience.

* **Primary Objective:** Improve search engine rankings and drive organic traffic through high-quality, keyword-rich content.
* **Target Audience:** A diverse group including technical developers, potential customers, existing clients, and industry peers.
* **Key Features:**
  * Full internationalization (i18n) support for all content (title, slug, excerpt, body) across the project's languages (en, fr, de).
  * Rich text editing with code snippet embedding and syntax highlighting.
  * Author profiles and management.
  * SEO-optimized pages with social sharing.
  * Integration with the main site's homepage and navigation via a reusable component.
  * Adherence to WCAG 2.1 Level AA accessibility standards.
* **Content Entry Method:** Blog articles are authored and managed via the PayloadCMS Admin UI, using a rich text editor (e.g., Lexical) that supports advanced formatting, code snippets, and media embedding. This interface provides an intuitive workflow for content creators and ensures consistency in published articles.
* **Documentation:** For a detailed breakdown of requirements, user personas, and the development roadmap, please refer to the [**Blog Product Requirements Document (PRD)**](./BLOG_PRD.md).

### 1.2. Company Job Portal

The Company Job Portal is a comprehensive platform for managing our entire hiring process. It is intended to streamline internal workflows, attract top talent, and build a strong employer brand.

* **Primary Objective:** Streamline the internal hiring process, attract qualified candidates, and reduce reliance on third-party job boards.
* **Target Audience:** Internal HR/Hiring teams and a wide range of external job seekers (from recent graduates to experienced professionals and freelancers).
* **Key Features:**
  * Role-based access for Job Seekers, HR Managers, Hiring Managers, and Admins.
  * Job listing creation and management.
  * Advanced job search and filtering for candidates.
  * Application submission with resume uploads.
  * Configurable application review pipeline with notifications.
  * Dedicated dashboards for HR and Hiring Managers.
  * Audit trails for all status changes.
  * Adherence to WCAG 2.1 Level AA accessibility standards for all public-facing forms and pages.
* **Documentation:** For a complete specification of features, user stories, technical architecture, and phased rollout, please see the [**Job Portal Product Requirements Document (PRD)**](./JOB_PORTAL_PRD.md).

---

## 2. Shared Infrastructure & Integration

Both the Blog and the Job Portal are built upon a shared technology stack and infrastructure to ensure consistency, maintainability, and efficiency.

* **Backend:** PayloadCMS serves as the headless CMS for both components, managing all data models, users, and access control. The `Users` collection may be extended or unified to support both blog authors and job portal users.
* **Frontend:** Next.js is used to build the user-facing interfaces for both the blog and the job portal, leveraging the App Router.
* **Authentication & Authorization:** User management and authentication are centralized within PayloadCMS, with role-based permissions controlling access to different parts of each application. NextAuth.js will be used to manage sessions on the frontend.
* **Internationalization (i18n):** The existing Next.js i18n setup will be leveraged for the Blog to provide multilingual content. The Job Portal will be initially developed in English, with the frontend structured to support future i18n efforts.
* **Accessibility (a11y):** A core requirement for both projects is adherence to WCAG 2.1 Level AA standards. This includes semantic HTML, proper ARIA usage, keyboard navigability, and sufficient color contrast.
* **Design System:** Both frontend applications will adhere to the project's established design system (e.g., Shadcn UI) to ensure a consistent user experience.
* **Database:** A single database instance (as configured for PayloadCMS) stores all data for both the blog and the job portal, ensuring data integrity.

---

## 3. Technical Design Documentation

For a deeper dive into the technical architecture and implementation details of each shard, please refer to the technical design documents located in the `technical-design/` subdirectory:

* **[Architecture Overview (docs/PayloadImplementationPlan/technical-design/ARCHITECTURE_OVERVIEW.md)](./technical-design/ARCHITECTURE_OVERVIEW.md)**: High-level system design, sharding strategy, and data flow.
* **[Blog CMS Shard (docs/PayloadImplementationPlan/technical-design/BLOG_CMS_SHARD.md)](./technical-design/BLOG_CMS_SHARD.md)**: Detailed PayloadCMS configuration for the Blog.
* **[Blog Frontend Shard (docs/PayloadImplementationPlan/technical-design/BLOG_FRONTEND_SHARD.md)](./technical-design/BLOG_FRONTEND_SHARD.md)**: Detailed Next.js frontend implementation for the Blog.
* **[Job Portal CMS Shard (docs/PayloadImplementationPlan/technical-design/JOB_PORTAL_CMS_SHARD.md)](./technical-design/JOB_PORTAL_CMS_SHARD.md)**: Detailed PayloadCMS configuration for the Job Portal.
* **[Job Portal Frontend Shard (docs/PayloadImplementationPlan/technical-design/JOB_PORTAL_FRONTEND_SHARD.md)](./technical-design/JOB_PORTAL_FRONTEND_SHARD.md)**: Detailed Next.js frontend implementation for the Job Portal.

---

## 4. Navigating the Documentation

To understand the product requirements, user personas, and high-level features, please refer to the Product Requirements Documents (PRDs):

* **[Blog PRD (docs/PayloadImplementationPlan/BLOG_PRD.md)](./BLOG_PRD.md)**
* **[Job Portal PRD (docs/PayloadImplementationPlan/JOB_PORTAL_PRD.md)](./JOB_PORTAL_PRD.md)**

These documents, in conjunction with the technical design documents, provide the necessary detail for design, development, and testing teams to execute on each part of the project effectively.

---

## 4. Additional Resources

For a comprehensive view of the entire codebase structure, you may find the flattened codebase representation useful:

* **[Flattened Codebase XML (C:\Users\kfiagbedzi\AppData\Local\npm-cache\_npx\2d6bcd63982e6f85\node_modules\bmad-method\flattened-codebase.xml)](file:///C:/Users/kfiagbedzi/AppData/Local/npm-cache/_npx/2d6bcd63982e6f85/node_modules/bmad-method/flattened-codebase.xml)**

This XML file provides a flattened, hierarchical view of all files and directories within the project, which can be helpful for understanding the overall project architecture and locating specific files.
