# Technical Design: Blog Frontend Shard

### Document Information
*   **Design ID:** TD-BLOG-FE-001
*   **Shard:** `blog-frontend`
*   **Project:** PayloadCMS Blog & Job Portal
*   **Version:** 1.0
*   **Author:** Architect (bmad-architect)
*   **Date:** August 26, 2025
*   **Status:** Draft

---

### 1. Introduction

This document outlines the technical specifications for the `blog-frontend` shard. It covers the Next.js page structure, React components, data fetching strategies, and styling considerations for the Company Blog's user-facing interface.

---

### 2. Next.js Page Structure

The blog will be integrated into the existing Next.js App Router structure under the `src/app/[lang]` directory to leverage the internationalization setup.

#### 2.1. File Structure

```
src/
└── app/
    └── [lang]/
        ├── blog/
        │   ├── page.tsx          // Blog Index Page
        │   ├── search/
        │   │   └── page.tsx      // Blog Search Results Page (Optional, can be part of index)
        │   ├── [slug]/
        │   │   └── page.tsx      // Blog Post Detail Page
        │   └── layout.tsx        // (Optional) Blog-specific layout
        └── ...
```

#### 2.2. Page Specifications

*   **`src/app/[lang]/blog/page.tsx` (Blog Index Page)**
    *   **Purpose:** Displays a paginated list of published blog posts.
    *   **Data Fetching:** Uses `getStaticProps` (or `generateStaticParams` + `getStaticProps` for ISR/SSG) to fetch a list of posts from the PayloadCMS API.
        *   Fetches posts for the current `lang` parameter.
        *   Filters by `status: 'published'`.
        *   Sorts by `-publishedAt`.
        *   Implements pagination using `limit` and `page` query parameters.
    *   **URL:** `/:lang/blog` (e.g., `/en/blog`, `/fr/blog`, `/es/blog`).
    *   **Key UI Elements:**
        *   A hero section with a title and description for the blog.
        *   A search bar (can be a client component that filters the list or navigates to a search page).
        *   A grid or list of `BlogPostCard` components.
        *   Pagination controls.

*   **`src/app/[lang]/blog/[slug]/page.tsx` (Blog Post Detail Page)**
    *   **Purpose:** Displays the full content of a single blog post.
    *   **Data Fetching:** Uses `getStaticPaths` to generate paths for all published posts at build time and `getStaticProps` to fetch the specific post data.
        *   `getStaticPaths`: Fetches all `slug`s for all locales to pre-render pages.
        *   `getStaticProps`: Fetches the post data for the given `slug` and `lang`.
        *   Handles "not found" scenarios if the slug is invalid or the post is not published.
    *   **URL:** `/:lang/blog/:slug` (e.g., `/en/blog/my-first-post`).
    *   **Key UI Elements:**
        *   Post title, featured image, author name, publication date, and tags.
        *   The main content area, rendering the rich text from PayloadCMS.
        *   An `AuthorBio` component.
        *   Social sharing buttons.
        *   A "Back to Blog" link.

---

### 3. React Component Design

Components will be modular, reusable, and built using Shadcn UI primitives, styled with theme variables.

#### 3.1. Component List

*   **`BlogPostCard.tsx`**
    *   **Props:** `post` (object containing post data from API).
    *   **Purpose:** Renders a summary of a blog post for the index page.
    *   **UI:**
        *   Featured image (if available).
        *   Post title (linked to the detail page).
        *   Excerpt.
        *   Author name and publication date.
        *   Tags.
    *   **Styling:** Uses Shadcn `Card` component. Image, text, and link colors will use theme variables (e.g., `var(--foreground)`, `var(--muted-foreground)`).

*   **`BlogPostDetail.tsx`**
    *   **Props:** `post` (object containing full post data from API).
    *   **Purpose:** Renders the full blog post.
    *   **UI:**
        *   Displays the featured image at the top.
        *   Post title (H1).
        *   Meta information (author, date, tags).
        *   Renders the `content` field using a `RichTextRenderer` component.
        *   Includes the `AuthorBio` component.
        *   Includes `SocialShareButtons` component.
    *   **Styling:** Uses theme variables for text, spacing, and background colors.

*   **`RichTextRenderer.tsx`**
    *   **Props:** `content` (the JSON from Payload's `richText` field).
    *   **Purpose:** Safely renders the rich text content from PayloadCMS.
    *   **Implementation:** This component will map over the JSON structure from Slate (or the configured rich text editor) and render the appropriate HTML elements (`h1`, `h2`, `p`, `ul`, `li`, `a`, `code`, etc.).
    *   **Code Highlighting:** For MVP, if code snippets are a "Must-Have", this component will need to handle `code` blocks and integrate a library like `prismjs` or `react-syntax-highlighter` for syntax highlighting. This is a critical component for the "Devon the Developer" persona.

*   **`AuthorBio.tsx`**
    *   **Props:** `author` (object containing author data, fetched from the `Users` collection via the post's `author` relationship).
    *   **Purpose:** Displays a short bio and photo of the author.
    *   **UI:**
        *   Author's profile picture.
        *   Author's name (linked to their author detail page if implemented).
        *   Short bio text.
    *   **Styling:** Styled consistently with the rest of the site.

*   **`BlogSearch.tsx`**
    *   **Props:** `onSearch` (function to handle search input).
    *   **Purpose:** A client component for the search input field.
    *   **UI:** A simple input field, potentially with a search icon. Uses Shadcn `Input` component.
    *   **Functionality:** Can be a controlled component that filters the list of posts on the client side (if all posts are fetched) or triggers a navigation to a search results page with a query parameter.

*   **`SocialShareButtons.tsx`**
    *   **Props:** `url` (URL of the current post), `title` (title of the post).
    *   **Purpose:** Provides buttons for sharing the post on social media.
    *   **UI:** Icons for LinkedIn, Twitter/X, Facebook, etc. Uses Shadcn `Button` component with icons.
    *   **Functionality:** Uses `window.open` to share to the respective social media sites with pre-filled URLs.

#### 3.2. Homepage Integration: `FeaturedPosts.tsx`
*   **Props:** `locale` (current language).
*   **Purpose:** A reusable component to display a curated list of recent or featured blog posts on the homepage.
*   **Data Fetching:** This component will be a client component that fetches a small number of posts (e.g., 3) from the PayloadCMS API when it mounts, filtering by the current `locale` and `status: 'published'`, sorted by `-publishedAt`.
*   **UI:** A horizontal or vertical list of `BlogPostCard` components, possibly with a "View All Posts" link.
*   **Integration:** This component will be placed within the `src/app/[lang]/home/page.tsx` file.

---

### 4. Data Fetching Strategy

The primary strategy is Static Site Generation (SSG) with Incremental Static Regeneration (ISR) for optimal performance and SEO.

*   **Blog Index Page (`/blog`):**
    *   `getStaticProps`: Fetches the first page of posts at build time.
    *   **ISR:** Configure `revalidate: 60` (or a suitable interval) in `getStaticProps` to allow Next.js to regenerate the page in the background when new posts are published. The PayloadCMS `afterChange` hook can be used to trigger an on-demand revalidation via an API route if immediate updates are critical.

*   **Blog Post Detail Page (`/blog/[slug]`):**
    *   `getStaticPaths`: At build time, fetches all slugs for all locales from PayloadCMS to generate all possible post pages.
    *   `getStaticProps`: Fetches the data for a single post.
    *   **ISR:** Configure `revalidate: 60` (or a suitable interval) to allow for content updates. On-demand revalidation is also applicable here.

*   **API Client:**
    *   A centralized API client utility (`src/lib/api.ts`) should be created or extended to handle requests to the PayloadCMS API. This client will manage the base URL, headers, and error handling.
    *   Example function within the API client:
        ```typescript
        // src/lib/api.ts
        export async function getPosts(locale: string, page = 1, limit = 10) {
          const res = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/posts?where[status][equals]=published&locale=${locale}&sort=-publishedAt&page=${page}&limit=${limit}`);
          if (!res.ok) {
            // Handle error
            throw new Error('Failed to fetch posts');
          }
          return res.json();
        }
        ```

---

### 5. Styling & Theme Adherence

*   **Design System:** All components must strictly adhere to the existing Shadcn UI design system.
*   **Theme Variables:** Use CSS custom properties (theme variables) for all styling instead of hardcoding values. This ensures consistency across light/dark modes and allows for global theme changes.
    *   **Colors:** `var(--background)`, `var(--foreground)`, `var(--card)`, `var(--card-foreground)`, `var(--primary)`, `var(--primary-foreground)`, `var(--muted)`, `var(--muted-foreground)`, `var(--accent)`, `var(--accent-foreground)`, `var(--destructive)`, `var(--destructive-foreground)`, `var(--border)`, `var(--input)`, `var(--ring)`.
    *   **Typography:** Use the existing font classes and size variables (e.g., `text-lg`, `font-semibold`). Headings should use the semantic `h1`-`h6` tags and be styled accordingly.
    *   **Spacing:** Use Tailwind's spacing utilities (e.g., `p-4`, `m-2`, `space-y-4`) which are often based on a theme's spacing scale.
*   **Responsive Design:** All pages and components must be fully responsive using Tailwind CSS's responsive modifiers (e.g., `md:flex`, `lg:text-xl`).
*   **Accessibility (a11y):**
    *   All interactive elements must be accessible via keyboard.
    *   Images must have descriptive `alt` text.
    *   Use semantic HTML5 tags.
    *   Ensure sufficient color contrast as defined by the theme.
    *   Rich text content must be rendered with proper heading structure.

---

### 6. Navigation Integration

The main navigation component (`src/components/Navbar.tsx`) must be updated to include a link to the blog.

*   **Link:** The link should point to `/${lang}/blog`.
*   **Internationalization:** The link text should be fetched from the respective language JSON files (e.g., `src/lang/en.json`, `src/lang/fr.json`, `src/lang/es.json`).
    *   Example `en.json` entry: `"common.navigation.blog": "Blog"`
    *   The `navigationItems` array in `src/app/[lang]/layout.tsx` will be updated to include this new link.