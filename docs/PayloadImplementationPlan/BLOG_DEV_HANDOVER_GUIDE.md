# Blog Feature: Developer Handover & Kickoff Guide

### Document Information

*   **Feature:** Company Blog - MVP & Phase 2
*   **Version:** 1.0
*   **Author:** Product Owner / Lead Architect
*   **Date:** August 27, 2025
*   **Status:** Ready for Development

---

### 1. Introduction

This document serves as the primary handover guide for the development team. It consolidates all the planning, requirements, and technical designs for the blog feature into a single, actionable playbook. Your mission is to implement the blog feature, starting with the Minimum Viable Product (MVP) and then proceeding to the Phase 2 enhancements.

---

### 2. The Plan at a Glance

We have broken down the work into two main phases:

*   **Phase 1: MVP (Core Blog Functionality)**
    *   **Goal:** Launch a basic, functional blog.
    *   **Key Features:** PayloadCMS `Posts` collection, blog index page, individual post pages, basic components.
    *   **Timeline:** (To be estimated by dev team)
*   **Phase 2: Expansion (Enhanced UX & Organization)**
    *   **Goal:** Evolve the blog into a more robust and engaging platform.
    *   **Key Features:** Category/Tag system, author pages, related posts, post heroes, newsletter signups.
    *   **Timeline:** (To be estimated by dev team)

---

### 3. Required Reading & Key Documents

Before you write a single line of code, you **must** read the following documents in order. They contain the "why" and "what" behind your work.

1.  **[`BLOG_PRD.md`](BLOG_PRD.md):** The Product Requirements Document. Understand the business goals, target audience, and overall vision for the blog.
2.  **[`BLOG_USER_STORIES.md`](sharded-stories/BLOG_USER_STORIES.md):** The sharded user stories. These are your primary acceptance criteria. Each story defines a specific piece of functionality from a user's perspective.
3.  **[`BLOG_TECHNICAL_DESIGN.md`](technical-design/BLOG_TECHNICAL_DESIGN.md):** The high-level technical design. This covers the architecture, data models, and key technical decisions.
4.  **[`BLOG_DEV_COMPANION_GUIDE.md`](developer-companion/BLOG_DEV_COMPANION_GUIDE.md):** Your best friend during development. This guide provides specific, code-level instructions, file paths, and direct references to our example repositories (`payloadcms-localization-reference` and `job-marshal-finale-locale-main`). **Consult this document often.**
5.  **[`BLOG_PHASE_2_EXPANSION_PLAN.md`](BLOG_PHASE_2_EXPANSION_PLAN.md):** The detailed plan for Phase 2. Read this to understand the full roadmap, but focus on Phase 1 first.

---

### 4. The Developer's Roadmap: Phase 1 (MVP)

This is your primary task list for the MVP. Work through these items in order. The `update_todo_list` tool in your environment should be used to track your progress on these items.

#### **MVP Task List**

| # | Task Description | Status | Key Docs to Reference |
|---|---|---:|:---|
| 1 | **Analyze existing PayloadCMS configuration and collections.** Understand `payload.config.ts` and the existing `Users.ts` collection. | `Pending` | `BLOG_DEV_COMPANION_GUIDE.md` (Section 1) |
| 2 | **Create the `Posts` collection in PayloadCMS.** Define all fields (`title`, `slug`, `content`, `author`, etc.) as per the PRD and Technical Design. | `Pending` | `BLOG_USER_STORIES.md` (B-001), `BLOG_DEV_COMPANION_GUIDE.md` (Section 2) |
| 3 | **Update the main PayloadCMS config file (`payload.config.ts`)** to include the new `Posts` collection. | `Pending` | `BLOG_DEV_COMPANION_GUIDE.md` (Section 2) |
| 4 | **Create the blog index page at `src/app/[lang]/blog/page.tsx`**. This page should fetch and display a list of published posts. | `Pending` | `BLOG_USER_STORIES.md` (B-006), `BLOG_DEV_COMPANION_GUIDE.md` (Section 3) |
| 5 | **Create the dynamic blog post page at `src/app/[lang]/blog/[slug]/page.tsx`**. This page should fetch and display a single post. | `Pending` | `BLOG_USER_STORIES.md` (B-008), `BLOG_DEV_COMPANION_GUIDE.md` (Section 3) |
| 6 | **Implement data fetching from the PayloadCMS API** in the Next.js pages using `generateStaticParams` and the Payload Local API for SSG. | `Pending` | `BLOG_TECHNICAL_DESIGN.md` (Section 4), `BLOG_DEV_COMPANION_GUIDE.md` (Section 3) |
| 7 | **Create the core React components** to render the blog. This includes `BlogPostCard.tsx`, `RichTextRenderer.tsx`, `AuthorBio.tsx`, `SocialShareButtons.tsx`, `BlogSearch.tsx`, and `Pagination.tsx`. | `Pending` | `BLOG_USER_STORIES.md` (B-002 to B-005, B-007), `BLOG_DEV_COMPANION_GUIDE.md` (Section 4) |
| 8 | **Style the blog pages and components** to match the existing site design using Shadcn/ui and Tailwind CSS theme variables. | `Pending` | `BLOG_TECHNICAL_DESIGN.md` (Section 5) |
| 9 | **Test the end-to-end functionality.** This includes creating, editing, and viewing posts in both the PayloadCMS admin and the public frontend. | `Pending` | `BLOG_USER_STORIES.md` (All MVP stories) |

---

### 5. The Developer's Roadmap: Phase 2 (Expansion)

Once the MVP is complete and approved, you will move on to Phase 2. The detailed plan is in [`BLOG_PHASE_2_EXPANSION_PLAN.md`](BLOG_PHASE_2_EXPANSION_PLAN.md). The key tasks are summarized below.

#### **Phase 2 Task List (High-Level)**

| # | Task Description | Status | Key Docs to Reference |
|---|---|---:|:---|
| 1 | **Create `NewsletterSubscriptions`, `Categories`, and `Tags` collections** in PayloadCMS. Pre-seed with the defined initial data. | `Pending` | `BLOG_PHASE_2_EXPANSION_PLAN.md` (Section 4.1, 4.2, 4.3) |
| 2 | **Update the `Posts` collection** to include relationships to `Categories` and `Tags`. | `Pending` | `BLOG_PHASE_2_EXPANSION_PLAN.md` (Section 4.4) |
| 3 | **Extend the `users` collection** with author profile fields (`bio`, `avatar`, `socialLinks`). Create initial author accounts. | `Pending` | `BLOG_PHASE_2_EXPANSION_PLAN.md` (Section 4.5) |
| 4 | **Create new components:** `CategoryList.tsx`, `CategoryFilter.tsx`, `AuthorCard.tsx`, `RelatedPosts.tsx`, `PostHero.tsx`, `NewsletterSignup.tsx`. | `Pending` | `BLOG_PHASE_2_EXPANSION_PLAN.md` (Section 3) |
| 5 | **Create new page routes:** `category/[slug]/page.tsx` and `author/[slug]/page.tsx`. | `Pending` | `BLOG_PHASE_2_EXPANSION_PLAN.md` (Section 3) |
| 6 | **Integrate all new components and pages** into the blog, ensuring they adhere to the design system. | `Pending` | `BLOG_PHASE_2_EXPANSION_PLAN.md` (Section 5) |

---

### 6. How to Work: Best Practices & Guidelines

*   **Reference Repositories are Your Blueprint:** The `payloadcms-localization-reference` and `job-marshal-finale-locale-main` repos are not just inspiration; they are your source of truth for implementation patterns. The `BLOG_DEV_COMPANION_GUIDE.md` will point you to the exact files you need.
*   **Component-First:** Build reusable components. If you find yourself writing the same JSX twice, refactor it into a component.
*   **Shadcn/ui & Theme Variables:** Do not hardcode styles. Use the components from `src/components/ui/` and for custom styles, use Tailwind classes with the theme variables defined in `tailwind.config.ts`.
*   **Localization is Non-Negotiable:** Every piece of text and every data field that can be localized, should be. Follow the patterns in `payloadcms-localization-reference`.
*   **Test as You Go:** Don't wait until the end. After completing a user story, manually test it. Create a post, view it, check the links, etc.
*   **Communicate:** If a requirement is unclear, a technical decision is difficult, or you discover a blocker, raise it immediately. The planning docs are comprehensive, but unforeseen issues always arise.

---

### 7. Kickoff Meeting Agenda

To ensure everyone is aligned, we should hold a kickoff meeting. The agenda should be:

1.  **Quick Review:** Walkthrough of this handover document.
2.  **Q&A:** Open floor for any questions on the PRD, user stories, or technical design.
3.  **Task Breakdown & Estimation:** The dev team breaks down the Phase 1 task list into smaller sub-tasks and provides time estimates.
4.  **Define "Done":** Agree on the definition of "done" for each task and for the MVP as a whole.
5.  **Tooling & Process:** Confirm the process for task tracking (using the `update_todo_list` tool), code reviews, and merging.

---

### 8. Conclusion

You have a clear, well-researched plan and all the necessary documentation to build an excellent blog feature. The groundwork has been laid meticulously. Now it's time to build. Good luck!