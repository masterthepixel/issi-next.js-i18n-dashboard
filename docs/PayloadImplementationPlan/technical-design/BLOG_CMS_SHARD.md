# Technical Design: Blog CMS Shard

### Document Information

* **Design ID:** TD-BLOG-CMS-001
* **Shard:** `blog-cms`
* **Project:** PayloadCMS Blog & Job Portal
* **Version:** 1.0
* **Author:** Architect (bmad-architect)
* **Date:** August 26, 2025
* **Status:** Draft

---

### 1. Introduction

This document details the technical specifications for the `blog-cms` shard, which encompasses all PayloadCMS configurations and logic related to the Company Blog. This includes the `Posts` collection schema, access control, and API endpoint utilization.

---

### 2. PayloadCMS `Posts` Collection Schema

A new collection, `Posts`, will be created in `cms/collections/Posts.ts`. This collection will be fully localized to support English (`en`), French (`fr`), and Spanish (`es`).

#### 2.1. Schema Definition

```typescript
// cms/collections/Posts.ts
import { CollectionConfig } from 'payload/types';
import { revalidate } from '../utilities/revalidate'; // Assuming a revalidation utility exists or will be created

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    group: 'Blog', // Group in the Admin UI
  },
  access: {
    read: () => true, // Publicly readable
    create: ({ req }) => req.user?.roles?.includes('author') || req.user?.roles?.includes('admin'),
    update: ({ req }) => req.user?.roles?.includes('author') || req.user?.roles?.includes('admin'),
    delete: ({ req }) => req.user?.roles?.includes('admin'), // Only admins can delete
  },
  versions: {
    drafts: true, // Enable drafts
  },
  hooks: {
    afterChange: [
      ({ doc, req }) => {
        // Trigger a revalidation of the frontend pages
        // This is a placeholder for a more robust revalidation strategy
        if (req.payload && typeof revalidate === 'function') {
          revalidate(req.payload, doc);
        }
      },
    ],
  },
  fields: [
    // --- Localized Fields ---
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      localized: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
      editor: slateEditor({ /* inherits from global config, can be overridden */ }),
    },
    // --- Global Fields ---
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      access: {
        update: ({ req }) => req.user?.roles?.includes('admin'), // Only admins can change author
      },
    },
    {
      name: 'featuredImage',
      type: 'relationship',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    // --- SEO Fields (can be enhanced with a plugin) ---
    {
      name: 'meta',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
          label: 'Meta Title',
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          label: 'Meta Description',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Meta Image',
        },
      ],
    },
  ],
};
```

#### 2.2. Schema Justification

* **`title`, `slug`, `excerpt`, `content`:** Core content fields, all localized to support the i18n requirements.
* **`author`:** A relationship to the existing `Users` collection. This allows for author profiles and attributions.
* **`featuredImage`:** A relationship to the `Media` collection for consistent image handling.
* **`publishedAt`:** A timestamp for scheduling posts and ordering them chronologically.
* **`status`:** A simple draft/published state to control visibility on the frontend.
* **`tags`:** An array of text fields for categorizing posts, which can be used for filtering and search.
* **`meta`:** A group for SEO-specific metadata, allowing for customization of social sharing cards and search engine results. This is a simplified version; a dedicated SEO plugin (like the one already in use) could be extended to this collection.

---

### 3. Access Control Logic

Access to the `Posts` collection is governed by user roles defined in the `Users` collection.

* **Read:** Public. All posts with `status: 'published'` are readable by unauthenticated users via the API. Drafts are only readable by authenticated users with appropriate permissions.
* **Create:** Users with the `author` or `admin` role can create new posts.
* **Update:** Users with the `author` or `admin` role can update posts. The `author` field can only be changed by an `admin` to prevent authors from reassigning posts.
* **Delete:** Restricted to users with the `admin` role to prevent accidental or malicious deletion of content.

This logic is implemented directly in the `access` property of the `Posts` collection configuration.

---

### 4. API Endpoints

PayloadCMS will automatically generate REST and GraphQL endpoints for the `Posts` collection. The frontend will primarily use the REST API for simplicity.

#### 4.1. Key REST Endpoints

* **List Posts:** `GET /api/posts`
  * **Query Params:**
    * `where[status][equals]=published` (to fetch only live posts)
    * `locale=en` (or `fr`, `de`) to fetch content for a specific language.
    * `sort=-publishedAt` (to get the latest posts first).
    * `limit=10` (for pagination).
    * `page=1` (for pagination).
  * **Usage:** To fetch posts for the blog index page.
* **Get Single Post by Slug:** `GET /api/posts?where[slug][equals]=my-post-slug&locale=en`
  * **Usage:** To fetch data for a single blog post detail page. Since slugs are unique per locale, this query is effective.
* **Create Post:** `POST /api/posts`
  * **Auth:** Requires a valid PayloadCMS authentication token for a user with `create` permissions. Used by the Admin UI and potentially a headless CMS client.
* **Update Post:** `PATCH /api/posts/:id`
  * **Auth:** Requires a valid PayloadCMS authentication token for a user with `update` permissions.
* **Delete Post:** `DELETE /api/posts/:id`
  * **Auth:** Requires a valid PayloadCMS authentication token for a user with `delete` permissions.

#### 4.2. API Response Structure (Example for List)

```json
{
  "docs": [
    {
      "id": "64f8a9b8c9d1e8f7a6b5c4d3",
      "title": { "en": "My First Post", "fr": "Mon Premier Article", "de": "Mein Erster Beitrag" },
      "slug": { "en": "my-first-post", "fr": "mon-premier-article", "de": "mein-erster-beitrag" },
      "excerpt": { "en": "This is an excerpt...", "fr": "Ceci est un extrait...", "de": "Dies ist ein Auszug..." },
      "content": { "en": "[...rich text JSON...]", "fr": "[...rich text JSON...]", "de": "[...rich text JSON...]" },
      "author": { "id": "user-id-123", "name": "Author Name" },
      "featuredImage": { "id": "media-id-456", "url": "https://.../image.jpg" },
      "publishedAt": "2023-09-05T10:00:00.000Z",
      "status": "published",
      "tags": [{ "tag": "technology" }, { "tag": "payloadcms" }],
      "meta": {
        "title": { "en": "SEO Title", "fr": "Titre SEO", "de": "SEO-Titel" },
        "description": { "en": "SEO Description...", "fr": "Description SEO...", "de": "SEO-Beschreibung..." }
      },
      "createdAt": "2023-09-05T09:00:00.000Z",
      "updatedAt": "2023-09-05T10:00:00.000Z"
    }
  ],
  "totalDocs": 1,
  "limit": 10,
  "page": 1,
  "totalPages": 1
}
```

---

### 5. Admin UI Customization

The Payload Admin UI will be customized to provide an optimal experience for content creators.

* **Grouping:** The `Posts` collection will be grouped under a "Blog" section in the main navigation of the Admin UI for better organization.
* **Field Positioning:** Key fields like `slug`, `excerpt`, `featuredImage`, `publishedAt`, and `status` will be positioned in the sidebar for quick access, as defined in the schema.
* **Rich Text Editor:** The `content` field will use the globally configured `slateEditor`. The existing configuration for elements and leaves is suitable for blog content. If code snippet highlighting is a priority for the MVP, a plugin or custom slate element for code blocks should be considered.
* **List View:** The default list view for posts in the Admin UI will be customized to display key columns: `Title`, `Status`, `Published At`, and `Author`.

---

### 6. Integration with `payload.config.ts`

The `Posts` collection must be imported and added to the `collections` array in the main Payload configuration file.

```typescript
// payload.config.ts
// ... other imports
import { Posts } from './cms/collections/Posts'; // Add this import

export default buildConfig({
  // ... other config
  collections: [
    // ... other collections
    Posts, // Add the Posts collection here
  ],
  // ... other config
});
```

Additionally, the `seoPlugin` should be updated to include the `posts` collection:

```typescript
// payload.config.ts
plugins: [
  // ... other plugins
  seoPlugin({
    collections: ['products', 'pages', 'posts'], // Add 'posts'
    uploadsCollection: 'media',
    // ... other seoPlugin config
  }),
  // ... other plugins
],
