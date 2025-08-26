# PayloadCMS Project Overview

This document provides a high-level overview of the main components that constitute the PayloadCMS part of our project. The PayloadCMS instance is designed to support two primary, distinct features: a Company Blog and a Company Job Portal.

---

## 1. Project Components

The PayloadCMS project is structured around two main products, each with its own set of collections, user roles, and frontend interfaces.

### 1.1. Company Blog

The Company Blog is a content management system designed to publish articles, news, and insights. Its primary goal is to drive organic traffic, establish thought leadership, and engage with our audience.

*   **Primary Objective:** Improve search engine rankings and drive organic traffic through high-quality, keyword-rich content.
*   **Target Audience:** A diverse group including technical developers, potential customers, existing clients, and industry peers.
*   **Key Features:**
    *   Multilingual content support.
    *   Rich text editing with code snippet embedding.
    *   Author profiles and management.
    *   SEO-optimized pages with social sharing.
    *   Integration with the main site's homepage and navigation.
*   **Documentation:** For a detailed breakdown of requirements, user personas, and the development roadmap, please refer to the [**Blog Product Requirements Document (PRD)**](./BLOG_PRD.md).

### 1.2. Company Job Portal

The Company Job Portal is a comprehensive platform for managing our entire hiring process. It is intended to streamline internal workflows, attract top talent, and build a strong employer brand.

*   **Primary Objective:** Streamline the internal hiring process, attract qualified candidates, and reduce reliance on third-party job boards.
*   **Target Audience:** Internal HR/Hiring teams and a wide range of external job seekers (from recent graduates to experienced professionals and freelancers).
*   **Key Features:**
    *   Role-based access for Job Seekers, HR Managers, Hiring Managers, and Admins.
    *   Job listing creation and management.
    *   Advanced job search and filtering for candidates.
    *   Application submission with resume uploads.
    *   Configurable application review pipeline with notifications.
    *   Dedicated dashboards for HR and Hiring Managers.
    *   Audit trails for all status changes.
*   **Documentation:** For a complete specification of features, user stories, technical architecture, and phased rollout, please see the [**Job Portal Product Requirements Document (PRD)**](./JOB_PORTAL_PRD.md).

---

## 2. Shared Infrastructure

Both the Blog and the Job Portal are built upon a shared technology stack and infrastructure to ensure consistency, maintainability, and efficiency.

*   **Backend:** PayloadCMS serves as the headless CMS for both components, managing all data models, users, and access control.
*   **Frontend:** Next.js is used to build the user-facing interfaces for both the blog and the job portal.
*   **Authentication & Authorization:** User management and authentication are centralized within PayloadCMS, with role-based permissions controlling access to different parts of each application.
*   **Database:** A single database instance (as configured for PayloadCMS) stores all data for both the blog and the job portal, ensuring data integrity.

---

## 3. Navigating the Documentation

To understand the specifics of each component, please refer to their respective PRDs, located within this same directory:

*   **[Blog PRD (docs/PayloadImplementationPlan/BLOG_PRD.md)](./BLOG_PRD.md)**
*   **[Job Portal PRD (docs/PayloadImplementationPlan/JOB_PORTAL_PRD.md)](./JOB_PORTAL_PRD.md)**

These documents provide the necessary detail for design, development, and testing teams to execute on each part of the project effectively.