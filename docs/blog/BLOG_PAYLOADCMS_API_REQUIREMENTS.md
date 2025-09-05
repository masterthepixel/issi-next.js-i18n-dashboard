# Blog System PayloadCMS API Requirements

> **Document Version**: 1.0.0  
> **Created**: January 2025  
> **Purpose**: Complete specification of PayloadCMS collections, fields, and API endpoints required for the ISSI blog system

## Table of Contents

- [Collection Requirements](#collection-requirements)
- [API Endpoints](#api-endpoints)
- [Data Field Specifications](#data-field-specifications)
- [Authentication & Access Control](#authentication--access-control)
- [File Upload Requirements](#file-upload-requirements)
- [Internationalization Requirements](#internationalization-requirements)
- [SEO & Meta Data](#seo--meta-data)
- [Example API Responses](#example-api-responses)

## Collection Requirements

### 1. Posts Collection (`posts`)

**Collection Slug**: `posts`  
**Admin Interface**: Accessible at `/admin/collections/posts`  
**Public API**: `/api/posts`

#### Required Fields

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `title` | Text | Yes | Blog post title (max 200 chars) |
| `slug` | Text | Yes | URL-friendly identifier (auto-generated from title) |
| `excerpt` | Textarea | No | Short description/preview (max 300 chars) |
| `content` | RichText | Yes | Main blog content with formatting |
| `featuredImage` | Upload | No | Main post image (relationship to Media) |
| `author` | Relationship | Yes | Link to Users collection |
| `category` | Relationship | No | Link to Categories collection |
| `tags` | Text | No | Comma-separated tags |
| `publishedAt` | DateTime | No | Publication date/time |
| `status` | Select | Yes | `draft`, `published`, `archived` |
| `metaTitle` | Text | No | SEO meta title (max 60 chars) |
| `metaDescription` | Textarea | No | SEO meta description (max 160 chars) |
| `readingTime` | Number | No | Estimated reading time in minutes |
| `views` | Number | No | View counter (default: 0) |
| `locale` | Select | Yes | `en`, `es`, `fr` |

#### Field Configurations

```typescript
// Posts Collection Configuration
{
  slug: 'posts',
  labels: {
    singular: 'Post',
    plural: 'Posts'
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 200,
      localized: true
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar'
      },
      hooks: {
        beforeValidate: [formatSlug('title')]
      }
    },
    {
      name: 'excerpt',
      type: 'textarea',
      maxLength: 300,
      localized: true
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: false
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      required: true
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: false
    },
    {
      name: 'tags',
      type: 'text',
      hasMany: true
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' }
      ],
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'metaTitle',
      type: 'text',
      maxLength: 60,
      localized: true
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      maxLength: 160,
      localized: true
    },
    {
      name: 'readingTime',
      type: 'number',
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'views',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar'
      }
    },
    {
      name: 'locale',
      type: 'select',
      required: true,
      options: [
        { label: 'English', value: 'en' },
        { label: 'Spanish', value: 'es' },
        { label: 'French', value: 'fr' }
      ],
      admin: {
        position: 'sidebar'
      }
    }
  ]
}
```

### 2. Categories Collection (`categories`)

**Collection Slug**: `categories`  
**Public API**: `/api/categories`

#### Required Fields

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `name` | Text | Yes | Category name |
| `slug` | Text | Yes | URL-friendly identifier |
| `description` | Textarea | No | Category description |
| `color` | Text | No | Hex color for UI display |
| `locale` | Select | Yes | `en`, `es`, `fr` |

### 3. Media Collection (`media`)

**Collection Slug**: `media`  
**Public API**: `/api/media`

#### Required Fields

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| `alt` | Text | Yes | Alt text for accessibility |
| `caption` | Text | No | Image caption |
| `sizes` | JSON | Auto | Different image sizes |

## API Endpoints

### 1. Blog Posts API

#### Get All Posts
```http
GET /api/posts?page=1&limit=10&locale=en&depth=2
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10, max: 50)
- `locale` (string): Language code (`en`, `es`, `fr`)
- `depth` (number): Relationship depth (default: 1, max: 3)
- `where` (object): Filter conditions (JSON encoded)
- `sort` (string): Sort field (e.g., `-publishedAt`, `title`)

**Example with Filters:**
```http
GET /api/posts?page=1&limit=10&locale=en&depth=2&where={"status":{"equals":"published"}}&sort=-publishedAt
```

#### Get Single Post by Slug
```http
GET /api/posts?where={"slug":{"equals":"blog-post-title"}}&limit=1&locale=en&depth=2
```

#### Get Posts by Category
```http
GET /api/posts?where={"category":{"equals":"CATEGORY_ID"},"status":{"equals":"published"}}&locale=en
```

#### Get Recent Posts
```http
GET /api/posts?where={"status":{"equals":"published"},"publishedAt":{"less_than":"2025-01-05T00:00:00.000Z"}}&sort=-publishedAt&limit=5
```

### 2. Categories API

#### Get All Categories
```http
GET /api/categories?locale=en
```

#### Get Category by Slug
```http
GET /api/categories?where={"slug":{"equals":"technology"}}&limit=1
```

### 3. Media API

#### Get Media by ID
```http
GET /api/media/MEDIA_ID
```

## Data Field Specifications

### Post Content Structure

The `content` field should support rich text with these elements:

```typescript
interface PostContent {
  // Rich text blocks
  children: Array<{
    type: 'paragraph' | 'heading' | 'list' | 'quote' | 'code' | 'image';
    children: Array<{
      text?: string;
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
      code?: boolean;
    }>;
    // For headings
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    // For lists
    listType?: 'ordered' | 'unordered';
    // For images
    relationTo?: 'media';
    value?: string; // Media ID
  }>;
}
```

### Author Information

When `depth=2` is used, author information should be populated:

```typescript
interface AuthorData {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: {
    id: string;
    url: string;
    alt: string;
  };
}
```

### Featured Image Structure

```typescript
interface FeaturedImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  sizes?: {
    thumbnail?: {
      url: string;
      width: number;
      height: number;
    };
    card?: {
      url: string;
      width: number;
      height: number;
    };
    tablet?: {
      url: string;
      width: number;
      height: number;
    };
  };
}
```

## Authentication & Access Control

### Public Access (No Auth Required)
- `GET /api/posts` (published posts only)
- `GET /api/categories`
- `GET /api/media` (for public images)

### Admin Access (Auth Required)
- All CRUD operations on posts
- Draft post access
- User management
- Media uploads

### Access Control Rules

```typescript
// Posts Collection Access
access: {
  create: ({ req: { user } }) => {
    return user && (user.role === 'admin' || user.role === 'editor');
  },
  read: ({ req: { user } }) => {
    // Public can read published posts
    if (!user) {
      return {
        status: { equals: 'published' }
      };
    }
    // Authenticated users can read all
    return true;
  },
  update: ({ req: { user } }) => {
    return user && (user.role === 'admin' || user.role === 'editor');
  },
  delete: ({ req: { user } }) => {
    return user && user.role === 'admin';
  }
}
```

## File Upload Requirements

### Image Upload Specifications

```typescript
// Media Collection Configuration
{
  slug: 'media',
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 300,
        height: 200,
        crop: 'centre'
      },
      {
        name: 'card',
        width: 600,
        height: 400,
        crop: 'centre'
      },
      {
        name: 'tablet',
        width: 800,
        height: 600,
        crop: 'centre'
      },
      {
        name: 'desktop',
        width: 1200,
        height: 800,
        crop: 'centre'
      }
    ],
    adminThumbnail: 'thumbnail'
  }
}
```

### File Size Limits
- **Max file size**: 5MB per image
- **Supported formats**: JPEG, PNG, WebP, SVG
- **Automatic optimization**: Generate multiple sizes
- **CDN integration**: Support for external storage (S3, Cloudinary)

## Internationalization Requirements

### Locale Configuration

```typescript
// PayloadCMS Config
{
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en'
      },
      {
        label: 'Spanish', 
        code: 'es'
      },
      {
        label: 'French',
        code: 'fr'
      }
    ],
    defaultLocale: 'en',
    fallback: true
  }
}
```

### Localized Fields
These fields must support localization:
- `title`
- `excerpt` 
- `content`
- `metaTitle`
- `metaDescription`

### API Locale Handling
```http
# Get posts in specific locale
GET /api/posts?locale=es

# Get posts with fallback to default locale
GET /api/posts?locale=fr&fallbackLocale=en
```

## SEO & Meta Data

### Required SEO Fields
- `metaTitle`: Custom meta title (fallback to `title`)
- `metaDescription`: Meta description for search engines
- `slug`: SEO-friendly URL
- `featuredImage`: Open Graph image

### Structured Data Requirements
Posts should include structured data for:
- Article schema
- Author schema
- Organization schema
- Breadcrumb schema

## Example API Responses

### Get Posts Response
```json
{
  "docs": [
    {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "title": "Getting Started with Next.js",
      "slug": "getting-started-nextjs",
      "excerpt": "Learn the fundamentals of Next.js development...",
      "content": [
        {
          "type": "paragraph",
          "children": [
            {
              "text": "Next.js is a powerful React framework..."
            }
          ]
        }
      ],
      "featuredImage": {
        "id": "64f8a1b2c3d4e5f6a7b8c9d1",
        "url": "/media/nextjs-hero.jpg",
        "alt": "Next.js Logo",
        "width": 1200,
        "height": 600,
        "sizes": {
          "thumbnail": {
            "url": "/media/nextjs-hero-300x200.jpg",
            "width": 300,
            "height": 200
          },
          "card": {
            "url": "/media/nextjs-hero-600x400.jpg", 
            "width": 600,
            "height": 400
          }
        }
      },
      "author": {
        "id": "64f8a1b2c3d4e5f6a7b8c9d2",
        "name": "John Developer",
        "email": "john@issi.com",
        "bio": "Senior Full-Stack Developer at ISSI"
      },
      "category": {
        "id": "64f8a1b2c3d4e5f6a7b8c9d3",
        "name": "Technology",
        "slug": "technology",
        "color": "#3B82F6"
      },
      "tags": ["nextjs", "react", "frontend", "javascript"],
      "publishedAt": "2025-01-01T10:00:00.000Z",
      "status": "published",
      "metaTitle": "Getting Started with Next.js - ISSI Blog",
      "metaDescription": "Learn the fundamentals of Next.js development with this comprehensive guide from ISSI's expert developers.",
      "readingTime": 8,
      "views": 1250,
      "locale": "en",
      "createdAt": "2024-12-28T14:30:00.000Z",
      "updatedAt": "2025-01-01T10:00:00.000Z"
    }
  ],
  "totalDocs": 45,
  "limit": 10,
  "totalPages": 5,
  "page": 1,
  "pagingCounter": 1,
  "hasPrevPage": false,
  "hasNextPage": true,
  "prevPage": null,
  "nextPage": 2
}
```

### Get Single Post Response
```json
{
  "docs": [
    {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "title": "Getting Started with Next.js",
      "slug": "getting-started-nextjs",
      // ... full post data as above
    }
  ],
  "totalDocs": 1,
  "limit": 1,
  "totalPages": 1,
  "page": 1,
  "pagingCounter": 1,
  "hasPrevPage": false,
  "hasNextPage": false,
  "prevPage": null,
  "nextPage": null
}
```

### Categories Response
```json
{
  "docs": [
    {
      "id": "64f8a1b2c3d4e5f6a7b8c9d3",
      "name": "Technology",
      "slug": "technology", 
      "description": "Latest technology insights and tutorials",
      "color": "#3B82F6",
      "locale": "en",
      "createdAt": "2024-12-01T00:00:00.000Z",
      "updatedAt": "2024-12-01T00:00:00.000Z"
    },
    {
      "id": "64f8a1b2c3d4e5f6a7b8c9d4",
      "name": "Business",
      "slug": "business",
      "description": "Business strategy and industry analysis", 
      "color": "#10B981",
      "locale": "en",
      "createdAt": "2024-12-01T00:00:00.000Z",
      "updatedAt": "2024-12-01T00:00:00.000Z"
    }
  ],
  "totalDocs": 6,
  "limit": 10,
  "page": 1,
  "hasNextPage": false
}
```

## Implementation Checklist

### PayloadCMS Backend Setup
- [ ] Create `posts` collection with all required fields
- [ ] Create `categories` collection
- [ ] Configure `media` collection with image sizes
- [ ] Set up localization for EN/ES/FR
- [ ] Configure access control rules
- [ ] Set up file upload handling
- [ ] Configure SEO plugins
- [ ] Test all API endpoints

### Frontend Integration
- [ ] Update `fetchPosts()` function parameters
- [ ] Handle pagination correctly
- [ ] Process rich text content rendering
- [ ] Implement image optimization
- [ ] Add SEO meta tag generation
- [ ] Support multi-language content
- [ ] Error handling for API failures
- [ ] Loading states for better UX

### Testing Requirements
- [ ] Test post creation/editing in admin
- [ ] Verify public API responses
- [ ] Test image uploads and sizes
- [ ] Validate SEO meta data
- [ ] Test localization switching
- [ ] Performance testing with large datasets
- [ ] Error handling edge cases

---

**This document provides the complete specification for PayloadCMS integration with the ISSI blog system. All API endpoints, data structures, and configurations must match these requirements exactly for proper functionality.**