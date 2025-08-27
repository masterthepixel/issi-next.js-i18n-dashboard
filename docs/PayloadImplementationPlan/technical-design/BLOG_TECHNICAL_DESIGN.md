# Blog Feature: Technical Design Document (TDD)

### Document Information

*   **Feature:** Company Blog
*   **Version:** 1.0
*   **Author:** Product Owner / Lead Architect
*   **Date:** August 27, 2025
*   **Status:** Draft

---

### 1. Introduction

This document provides the technical specifications and implementation details for the blog feature. It is intended for the development team and outlines the specific technologies, libraries, configurations, and architectural patterns to be used. This TDD ensures that all engineers have a clear and unambiguous understanding of how to build the feature, aligning with the strategic goals defined in the [`BLOG_PRD.md`](../BLOG_PRD.md) and the user stories in [`BLOG_USER_STORIES.md`](../sharded-stories/BLOG_USER_STORIES.md).

---

### 2. Technology Stack & Dependencies

The blog will be built using the existing project's stack, with specific additions for PayloadCMS and related functionalities.

#### 2.1. Core Existing Stack
*   **Framework:** Next.js 15 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS, Shadcn/ui
*   **Package Manager:** `pnpm`

#### 2.2. PayloadCMS Specifics

*   **PayloadCMS Core:** `payload`
*   **PayloadCMS Database Adapter:** `@payloadcms/db-postgres` (Assuming PostgreSQL is the target database, to be confirmed with `payload.config.ts`).
*   **PayloadCMS Rich Text Editor:** `@payloadcms/richtext-lexical`. This is the default and recommended editor for Payload 3.0+, offering a modern, extensible editing experience. It outputs JSON content, which is easily stored and rendered.
*   **PayloadCMS Localization Plugin:** `@payloadcms/translate`. This is the official plugin for managing multilingual content, which is a core requirement for our blog.

#### 2.3. New Frontend Dependencies

*   **Rich Text Rendering:** To render the JSON output from the Lexical editor on the frontend, we will use `@payloadcms/richtext-lexical-react`. This library provides React components to deserialize and display Lexical's JSON format.
*   **Form Handling (for future forms, e.g., comments):** `react-hook-form`, `@hookform/resolvers`, `zod`. While not needed for the initial blog display, this is the standard pattern we will adopt for any future interactive forms, as identified from the `job-marshal-finale-locale-main` reference.

#### 2.4. Development & DevOps

*   **Environment Variables:** All sensitive configurations (database URLs, API keys, etc.) will be managed via `.env` files. A `.env.example` file will be provided.
*   **Code Quality:** Existing tooling (Biome, ESLint) will be configured to lint and format all new code.

---

### 3. PayloadCMS Configuration (`payload.config.ts`)

The main Payload configuration file will be updated as follows:

*   **Database:** Configured to use the PostgreSQL adapter.
*   **Plugins:**
    *   The `translate` plugin will be initialized and configured with the supported languages (e.g., `en`, `fr`, `es`), matching the project's existing i18n setup.
    *   The `cloud-storage` plugin (e.g., `@payloadcms/plugin-cloud-storage` with an S3 provider) will be configured for handling media uploads if not already present.
*   **Collections:**
    *   The new `Posts` collection (`cms/collections/Posts.ts`) will be imported and registered.
    *   The existing `Users` and `Media` collections will be verified and configured if not already present.
*   **Admin UI:** The admin UI will be enabled and customized with the project's branding if necessary.
*   **CORS:** The `serverURL` and `cors` origins will be configured to allow requests from the Next.js frontend.

---

### 4. Data Model: `Posts` Collection (`cms/collections/Posts.ts`)

The `Posts` collection will be defined with the following fields, all adhering to Payload's field types:

*   `title` (Text):
    *   `required: true`
    *   `localized: true`
*   `slug` (Text):
    *   `required: true`
    *   `localized: true`
    *   `unique: true`
    *   `admin: { position: 'sidebar' }`
    *   `hooks: { beforeChange: [slugifyHook] }` (A custom hook to auto-generate slugs from titles).
*   `content` (RichText):
    *   `required: true`
    *   `localized: true`
    *   `editor: lexical` (Explicitly use the Lexical editor).
*   `excerpt` (Textarea):
    *   `localized: true`
*   `author` (Relationship):
    *   `relationTo: 'users'`
    *   `required: true`
    *   `access: { read: () => true }` (Publicly readable).
*   `featuredImage` (Relationship):
    *   `relationTo: 'media'`
    *   `access: { read: () => true }`
*   `publishedAt` (Date):
    *   `admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } }`
    *   `hooks: { beforeChange: [publishDateHook] }` (A hook to set default date if not provided).
*   `status` (Select):
    *   `options: ['draft', 'published']`
    *   `defaultValue: 'draft'`
    *   `admin: { position: 'sidebar' }`

---

### 5. Next.js Frontend Implementation

#### 5.1. File Structure

The frontend will follow the existing `src/app/[lang]` structure:

```
src/
└── app/
    └── [lang]/
        ├── blog/
        │   ├── page.tsx          // Blog Index Page
        │   └── [slug]/
        │       └── page.tsx      // Blog Post Detail Page
        ├── layout.tsx            // Root layout for language
        └── ...
```

#### 5.2. Data Fetching

*   **Strategy:** Static Site Generation (SSG) with Incremental Static Regeneration (ISR). This provides the best performance and SEO.
*   **Blog Index (`page.tsx`):**
    *   `generateStaticParams`: Will be used to generate static paths for all supported languages.
    *   `getStaticProps` (or its App Router equivalent): Will fetch a paginated list of published posts from the PayloadCMS API (`/api/posts?locale=${lang}&page=1&limit=10`).
*   **Blog Post Detail (`[slug]/page.tsx`):**
    *   `generateStaticParams`: Will fetch all post slugs for all languages from PayloadCMS to pre-render all post pages.
    *   `getStaticProps`: Will fetch the specific post data using its `slug` and `lang` from the PayloadCMS API (`/api/posts/${slug}?locale=${lang}`).
    *   **Fallback:** If a post is not found during `getStaticProps`, a `notFound` function will be called to render the 404 page.

#### 5.3. Component Architecture

*   **`BlogPostCard.tsx`:** A reusable component to display a single post's summary (title, excerpt, image, author, date) on the index page.
*   **`BlogPostDetail.tsx`:** The main component for the post detail page, responsible for rendering the title, meta info, and the rich text content.
*   **`RichTextRenderer.tsx`:** A component that uses `@payloadcms/richtext-lexical-react` to deserialize and render the JSON content from the `content` field.
*   **`Pagination.tsx`:** A component for navigating between pages of blog posts on the index page.
*   **`SearchBar.tsx`:** A component for the search functionality, likely using a Server Action to query the PayloadCMS API.

---

### 6. Internationalization (i18n) Implementation

*   **PayloadCMS:** The `@payloadcms/translate` plugin will handle the storage and retrieval of localized content. All necessary fields in the `Posts` collection will be marked as `localized: true`.
*   **Next.js:** The existing `[lang]` dynamic route structure will be used. The `lang` parameter will be passed to all PayloadCMS API calls to fetch the correct localized data.
*   **Content Fallback:** A strategy will be implemented (e.g., in the API call or in the component) to handle cases where a post does not have a translation for the requested language. This could involve falling back to a primary language (e.g., 'en') or displaying a message.

---

### 7. Search Functionality

*   **Implementation:** A custom Server Action will be created, for example, `searchPosts.ts`.
*   **Flow:**
    1.  The user submits a search query from the `SearchBar.tsx` component.
    2.  The form action calls the `searchPosts` Server Action, passing the query and the current `lang`.
    3.  The Server Action uses the Payload Local API to perform a search against the `Posts` collection, filtering by the current locale and searching within `title`, `excerpt`, and `content` fields.
    4.  The Server Action returns an array of matching post documents.
    5.  The blog index page re-renders, displaying the search results instead of the default post list.
*   **Highlighting:** Keyword highlighting in search results is a P3 feature and can be implemented in a later iteration.

---

### 8. SEO Implementation

*   **Dynamic Meta Tags:** The `BlogPostDetail` page will use the Next.js `metadata` object to dynamically set the page title and meta description based on the post's data.
*   **Open Graph Tags:** Similarly, `og:title`, `og:description`, and `og:image` (using the `featuredImage` URL) will be set for rich social media sharing.
*   **Sitemap:** A `sitemap.xml` will be generated, likely using a library like `next-sitemap`, which will include all the static blog post URLs for all languages. This will be configured to run as a post-build step.

---

### 9. Security Considerations

*   **API Access:** PayloadCMS's built-in access control functions will be used to ensure that only `published` posts are accessible via the public API.
*   **Environment Variables:** Database credentials and other secrets will never be hardcoded.
*   **XSS Prevention:** The rich text renderer (`@payloadcms/richtext-lexical-react`) is designed to sanitize content and prevent XSS attacks. We will rely on this and ensure it's kept up to date.

---

### 10. Initial Setup Checklist

Before development begins, the following setup tasks must be completed:

1.  **Install Dependencies:**
    ```bash
    pnpm add payload @payloadcms/db-postgres @payloadcms/richtext-lexical @payloadcms/translate @payloadcms/richtext-lexical-react
    ```
2.  **Configure `payload.config.ts`:**
    *   Set up the database adapter.
    *   Initialize and configure the `translate` plugin with supported languages.
    *   Register the `Posts` collection.
3.  **Create `cms/collections/Posts.ts`:** Define the collection schema as per Section 4.
4.  **Create `cms/collections/Media.ts` (if not exists):** Define the media collection for uploads.
5.  **Update `.env.example`:** Add necessary PayloadCMS environment variables (`PAYLOAD_SECRET`, `DATABASE_URI`).
6.  **Seed Initial Data (Optional):** Create a script to seed the database with a few sample posts and a user for testing.