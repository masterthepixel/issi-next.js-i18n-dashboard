# Blog Feature: Developer Companion Guide

### Document Information

*   **Feature:** Company Blog
*   **Version:** 1.0
*   **Author:** Lead Architect
*   **Date:** August 27, 2025
*   **Status:** Draft

---

### 1. Introduction

This guide is a companion to the [`BLOG_USER_STORIES.md`](../sharded-stories/BLOG_USER_STORIES.md) and [`BLOG_TECHNICAL_DESIGN.md`](../technical-design/BLOG_TECHNICAL_DESIGN.md). While those documents define the "what" and the "how" at a high level, this guide provides the "where to look" and "show me the code" details. It links user stories directly to working examples in our reference repositories and provides specific guidance on implementation.

---

### 2. Content Strategy: Categories and Tags

The initial user stories and TDD did not explicitly include categories or tags, deeming them P3/Could-Have. However, a robust content strategy often benefits from them. Here's how to implement them when the time comes.

#### 2.1. Content Modeling in PayloadCMS

You will create two new collections: `Categories` and `Tags`.

*   **`cms/collections/Categories.ts` (New Collection)**
    *   **Fields:**
        *   `title` (Text, `required`, `localized`)
        *   `slug` (Text, `required`, `unique`, `localized`, auto-generated from `title` using a slugify hook)
        *   `description` (Textarea, `localized`)
    *   **Reference to Look At:** The structure for a basic collection with localization can be inferred from `docs/reference-repos/payloadcms-localization-reference/src/collections/Posts/index.ts`. Adapt this pattern for a `Categories` collection.

*   **`cms/collections/Tags.ts` (New Collection)**
    *   **Fields:**
        *   `name` (Text, `required`, `localized`)
        *   `slug` (Text, `required`, `unique`, `localized`, auto-generated from `name`)
    *   This is a simpler, flat structure. Use the same basic collection pattern as `Categories`.

#### 2.2. Updating the `Posts` Collection

In `cms/collections/Posts.ts`, you will add two new relationship fields:

```typescript
// In the fields array of the Posts collection
{
  name: 'categories',
  type: 'relationship',
  relationTo: 'categories',
  hasMany: true, // A post can have multiple categories
  required: false,
},
{
  name: 'tags',
  type: 'relationship',
  relationTo: 'tags',
  hasMany: true, // A post can have multiple tags
  required: false,
},
```

#### 2.3. Frontend Implementation

*   **Filtering:** On the blog index page, you can add UI elements (e.g., dropdowns, lists of links) to allow users to filter posts by category or tag. This will involve modifying the API call to Payload to include a `where` clause.
    *   **Example API Call:** `/api/posts?where[categories][in][0]=category-slug&where[tags][in][0]=tag-slug`
*   **Display:** On the post detail page, you can display the list of associated categories and tags, linking to their respective filtered archive pages.

---

### 3. Analytics Integration: PostHog

Tracking user engagement on the blog is crucial for measuring success. We will use PostHog.

#### 3.1. Setup

1.  **Install PostHog:** `pnpm add posthog-js`
2.  **Initialize PostHog:** Create a `PostHogProvider` component and wrap your application in it, typically in your root layout (`src/app/[lang]/layout.tsx`).

    ```typescript
    // src/providers/PostHogProvider.tsx
    'use client';

    import posthog from 'posthog-js';
    import { PostHogProvider as PHProvider } from 'posthog-js/react';

    if (typeof window !== 'undefined') {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
        person_profiles: 'identified_only', // or 'always' to create anonymous profiles
      });
    }

    export function PostHogProvider({ children }: { children: React.ReactNode }) {
      return <PHProvider client={posthog}>{children}</PHProvider>;
    }
    ```

#### 3.2. Tracking Events

We will track specific events to understand user behavior.

*   **Event: `blog_post_viewed`**
    *   **When to Track:** When a user lands on a blog post detail page.
    *   **Properties to Send:** `post_slug`, `post_title`, `post_author`, `post_category` (if available).
    *   **Where to Implement:** In `src/app/[lang]/blog/[slug]/page.tsx`, within a `useEffect` hook.

    ```typescript
    // In src/app/[lang]/blog/[slug]/page.tsx
    'use client';
    import { useEffect } from 'react';
    import posthog from 'posthog-js';

    // Assuming post data is fetched and passed as a prop, or available via a hook
    type BlogPostDetailPageProps = {
      params: { lang: string; slug: string };
      // searchParams: { [key: string]: string | string[] | undefined }; // if needed
    };

    async function getPostData(slug: string, lang: string) {
      // Fetch post data from PayloadCMS API
      // const res = await fetch(`${process.env.PAYLOAD_API_URL}/api/posts/${slug}?locale=${lang}&depth=1`);
      // const post = await res.json();
      // return post;
      // Placeholder for actual fetch logic
      return {
        slug: 'sample-post',
        title: 'Sample Post Title',
        author: { name: 'John Doe' },
        // categories: [{ title: 'Tech' }] // if available
      };
    }

    export default async function BlogPostDetailPage({ params }: BlogPostDetailPageProps) {
      const post = await getPostData(params.slug, params.lang);

      // This effect should be in a client component if posthog is client-side only
      // For simplicity, we'll imagine a client wrapper component here.
      // In a real app, you might pass post data to a client component for tracking.
      // For now, we'll assume this page can be a server component and tracking is handled elsewhere,
      // or we wrap the tracking part in a 'use client' component.

      // To make this work as a server component with client-side tracking,
      // you would create a separate client component for the tracking logic.
      // Example: <PostHogTracker post={post} />

      return (
        <div>
          <h1>{post.title}</h1>
          <p>Author: {post.author.name}</p>
          {/* Post content here */}
          {/* <PostHogTracker post={post} /> */}
        </div>
      );
    }

    // Example of a client-side tracking component
    // 'use client';
    // import { useEffect } from 'react';
    // import posthog from 'posthog-js';
    //
    // function PostHogTracker({ post }: { post: any }) {
    //   useEffect(() => {
    //     if (post && typeof window !== 'undefined') {
    //       posthog.capture('blog_post_viewed', {
    //         post_slug: post.slug,
    //         post_title: post.title,
    //         post_author: post.author.name,
    //         post_category: post.categories?.map((cat: any) => cat.title).join(', ') || 'N/A',
    //       });
    //     }
    //   }, [post]);
    //   return null;
    // }
    ```

*   **Event: `blog_search_performed`**
    *   **When to Track:** When a user submits a search query.
    *   **Properties to Send:** `search_query`, `number_of_results`.
    *   **Where to Implement:** In the Server Action or API route that handles the search logic.

---

### 4. What the Stories Don't Tell You: A Developer's Roadmap

This section maps user stories to concrete examples and code snippets from our reference repositories.

#### 4.1. Story B-001 & B-002: PayloadCMS `Posts` Collection & Admin UI

*   **What you need to do:** Define the `Posts` collection in PayloadCMS and ensure it appears in the admin UI.
*   **Where to find a working example:** `docs/reference-repos/payloadcms-localization-reference/src/collections/Posts/`.
*   **How the reference implements it:**
    *   The `index.ts` file in that directory defines the entire collection schema.
    *   It uses `payload.config.ts` to import and register this collection.
    *   It uses the `@payloadcms/translate` plugin to make fields like `title` and `content` localized.
    *   It uses the `@payloadcms/richtext-lexical` editor for the `content` field.
*   **Specific code snippet to copy/adapt:**
    *   The entire `Posts` collection definition from `docs/reference-repos/payloadcms-localization-reference/src/collections/Posts/index.ts`. Pay close attention to how fields are defined, how localization is enabled with the `@payloadcms/translate` plugin, and how the rich text editor is configured with `editor: lexical`.

#### 4.2. Story B-006 & B-008: Next.js Blog Pages (Index & Detail)

*   **What you need to do:** Create the `src/app/[lang]/blog/page.tsx` and `src/app/[lang]/blog/[slug]/page.tsx` files.
*   **Where to find a working example:** `docs/reference-repos/payloadcms-localization-reference/src/app/(frontend)/[locale]/posts/`.
*   **How the reference implements it:**
    *   **Index Page (`page.tsx`):**
        *   It uses `generateStaticParams` to create paths for all locales.
        *   It fetches data from the Payload API using `payload.find()`.
        *   It uses a `Pagination` component to handle multiple pages of posts.
    *   **Detail Page (`[slug]/page.tsx`):**
        *   It uses `generateStaticParams` to pre-render all post slugs for all locales by fetching from Payload.
        *   It fetches a single post by its `slug` and `locale` using `payload.findByID()`.
        *   It handles the "not found" case.
*   **Specific code snippet to copy/adapt:**
    *   The `generateStaticParams` function from `docs/reference-repos/payloadcms-localization-reference/src/app/(frontend)/[locale]/posts/page.tsx` and `docs/reference-repos/payloadcms-localization-reference/src/app/(frontend)/[locale]/posts/[slug]/page.tsx`. This is critical for i18n SSG.
    *   The data fetching logic inside the page components, which uses the Payload Local API (`payload.find()` and `payload.findByID()`).
    *   The `notFound()` call for handling non-existent posts.

#### 4.3. Story B-008: Rich Text Rendering

*   **What you need to do:** Render the JSON content from the `content` field on the frontend.
*   **Where to find a working example:** `docs/reference-repos/payloadcms-localization-reference/src/components/RichText/`.
*   **How the reference implements it:**
    *   It provides a `RichText` component that takes `content` (the JSON from Payload) and `className` as props.
    *   This component uses `@payloadcms/richtext-lexical-react` to deserialize the JSON and render it as HTML.
*   **Specific code snippet to copy/adapt:**
    *   The entire `RichText` component. You can drop this into your `src/components/` directory and use it directly in your `BlogPostDetail` component.

#### 4.4. Story B-014: Search Functionality

*   **What you need to do:** Implement a search bar that queries PayloadCMS.
*   **Where to find a working example:** `docs/reference-repos/payloadcms-localization-reference/src/search/` and `docs/reference-repos/payloadcms-localization-reference/src/app/(frontend)/[locale]/search/page.tsx`.
*   **How the reference implements it:**
    *   It has a dedicated search page.
    *   It uses a Server Action (likely in `src/search/search.ts`) to perform the search query against Payload.
    *   The search logic uses Payload's `payload.find()` with a `where` clause that searches across multiple fields (`title`, `excerpt`) and respects the current locale.
*   **Specific code snippet to copy/adapt:**
    *   The Server Action in `docs/reference-repos/payloadcms-localization-reference/src/search/search.ts`. This is the core logic, showing how to use `payload.find()` with a `where` clause for searching across localized fields.
    *   The structure of the search results page at `docs/reference-repos/payloadcms-localization-reference/src/app/(frontend)/[locale]/search/page.tsx` to understand how to display the results and handle the search state.

#### 4.5. Story B-010 & B-011: Navigation and Styling

*   **What you need to do:** Add a "Blog" link to the navigation and style the blog pages.
*   **Where to find a working example for styling:** `docs/reference-repos/job-marshal-finale-locale-main/`.
*   **How the reference implements it:**
    *   This reference is excellent for general UI patterns. Look at `components/general/` for reusable card components that you can adapt for your `BlogPostCard`.
    *   Look at its `app/(mainLayout)/layout.tsx` to see how navigation is structured.
*   **Specific code snippet to copy/adapt:**
    *   The structure and styling of a card component from `job-marshal-finale-locale-main/components/general/` (e.g., `JobCard.tsx`) can be adapted for `BlogPostCard.tsx`.
    *   The way it uses Shadcn/ui components and Tailwind CSS classes for styling should be your guide for making the blog pages look consistent with the rest of the site.