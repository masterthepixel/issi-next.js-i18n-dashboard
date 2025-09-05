# API Documentation 📡

This document provides comprehensive API documentation for the ISSI Next.js i18n Dashboard project, including both internal API routes and external CMS integration.

## 🏗️ API Architecture

### Internal APIs (Next.js)

- **Framework**: Next.js 15 App Router API routes
- **Location**: `src/app/api/`
- **Authentication**: Custom implementation
- **Response Format**: JSON

### External APIs (PayloadCMS)

- **Type**: Headless CMS API
- **Location**: `http://localhost:3001/api` (development)
- **Authentication**: API keys or session-based
- **Response Format**: JSON/GraphQL

## 🔧 Internal API Routes

### Base URL

```
http://localhost:3000/api
```

### Available Endpoints

#### Health Check

```http
GET /api/health
```

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2025-09-02T10:00:00.000Z",
  "version": "1.0.0"
}
```

#### Language Detection

```http
GET /api/language
```

**Response:**

```json
{
  "detected": "en",
  "supported": ["en", "es", "fr"],
  "current": "en"
}
```

#### Product Data

```http
GET /api/products
GET /api/products/[id]
```

**Parameters:**

- `locale` (optional): Language code
- `limit` (optional): Number of results
- `offset` (optional): Pagination offset

**Response:**

```json
{
  "products": [
    {
      "id": "1",
      "title": "Product Title",
      "description": "Product description",
      "locale": "en",
      "slug": "product-slug"
    }
  ],
  "total": 25,
  "hasMore": true
}
```

## 🌐 PayloadCMS API Integration

### Base URL (Development)

```
http://localhost:3001/api
```

### Authentication

```javascript
// API Key authentication
const headers = {
  Authorization: `Bearer ${process.env.PAYLOAD_API_KEY}`,
  "Content-Type": "application/json",
};
```

### REST API Endpoints

#### Posts Collection

**Get All Posts**

```http
GET /api/posts
```

**Parameters:**

- `where[status][equals]=published` - Only published posts
- `populate=author,categories,featuredImage` - Include relationships
- `sort=-publishedAt` - Sort by publish date
- `limit=10` - Limit results

**Example Request:**

```javascript
const response = await fetch(
  "/api/posts?where[status][equals]=published&populate=author,categories,featuredImage&sort=-publishedAt&limit=10"
);
const data = await response.json();
```

**Response:**

```json
{
  "docs": [
    {
      "id": "1",
      "title": "Blog Post Title",
      "slug": "blog-post-title",
      "content": "...",
      "excerpt": "Post excerpt...",
      "publishedAt": "2025-09-02T10:00:00.000Z",
      "status": "published",
      "author": {
        "name": "Author Name",
        "bio": "Author bio",
        "avatar": {
          "url": "/media/avatar.jpg",
          "alt": "Author avatar"
        }
      },
      "categories": [
        {
          "name": "Technology",
          "slug": "technology",
          "color": "#3B82F6"
        }
      ],
      "featuredImage": {
        "url": "/media/featured.jpg",
        "alt": "Featured image",
        "sizes": {
          "card": {
            "url": "/media/featured-card.jpg",
            "width": 768,
            "height": 432
          }
        }
      },
      "tags": [{ "tag": "react" }, { "tag": "nextjs" }]
    }
  ],
  "totalDocs": 25,
  "limit": 10,
  "totalPages": 3,
  "page": 1,
  "pagingCounter": 1,
  "hasPrevPage": false,
  "hasNextPage": true,
  "prevPage": null,
  "nextPage": 2
}
```

**Get Single Post**

```http
GET /api/posts/[id]
```

**Get Post by Slug**

```http
GET /api/posts?where[slug][equals]=blog-post-title
```

#### Categories Collection

**Get All Categories**

```http
GET /api/categories
```

**Response:**

```json
{
  "docs": [
    {
      "id": "1",
      "name": "Technology",
      "slug": "technology",
      "description": "Technology-related posts",
      "color": "#3B82F6"
    }
  ],
  "totalDocs": 5
}
```

#### Users Collection

**Get Authors**

```http
GET /api/users?where[role][equals]=author
```

**Response:**

```json
{
  "docs": [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john@example.com",
      "bio": "Content creator and developer",
      "role": "author",
      "avatar": {
        "url": "/media/avatar.jpg"
      },
      "socialLinks": [
        {
          "platform": "twitter",
          "url": "https://twitter.com/johndoe"
        }
      ]
    }
  ]
}
```

#### Media Collection

**Upload Media**

```http
POST /api/media
Content-Type: multipart/form-data
```

**Get Media**

```http
GET /api/media
GET /api/media/[id]
```

## 📊 GraphQL API

### Endpoint

```
http://localhost:3001/api/graphql
```

### Example Queries

**Get Published Posts with Relationships**

```graphql
query GetPosts {
  Posts(where: { status: { equals: published } }, sort: "publishedAt", limit: 10) {
    docs {
      id
      title
      slug
      excerpt
      content
      publishedAt
      author {
        name
        bio
        avatar {
          url
          alt
        }
      }
      featuredImage {
        url
        alt
        sizes {
          card {
            url
            width
            height
          }
        }
      }
      categories {
        name
        slug
        color
      }
      tags {
        tag
      }
      meta {
        title
        description
        image {
          url
          alt
        }
      }
    }
    totalDocs
    hasNextPage
    hasPrevPage
  }
}
```

**Get Single Post by Slug**

```graphql
query GetPostBySlug($slug: String!) {
  Posts(where: { slug: { equals: $slug } }, limit: 1) {
    docs {
      id
      title
      slug
      content
      excerpt
      publishedAt
      author {
        name
        bio
        avatar {
          url
          alt
        }
        socialLinks {
          platform
          url
        }
      }
      featuredImage {
        url
        alt
        sizes {
          tablet {
            url
            width
            height
          }
        }
      }
      categories {
        name
        slug
        color
        description
      }
      tags {
        tag
      }
      meta {
        title
        description
        image {
          url
          alt
        }
      }
    }
  }
}
```

## 🔧 API Client Implementation

### Frontend API Client

```typescript
// lib/api-client.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3001";

export class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${API_BASE_URL}/api`;
  }

  async getPosts(params?: { limit?: number; page?: number; category?: string; populate?: string[] }) {
    const searchParams = new URLSearchParams();

    // Only published posts
    searchParams.append("where[status][equals]", "published");
    searchParams.append("sort", "-publishedAt");

    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.category) searchParams.append("where[categories][in]", params.category);
    if (params?.populate) searchParams.append("populate", params.populate.join(","));

    const response = await fetch(`${this.baseUrl}/posts?${searchParams}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    return response.json();
  }

  async getPostBySlug(slug: string) {
    const searchParams = new URLSearchParams();
    searchParams.append("where[slug][equals]", slug);
    searchParams.append("limit", "1");
    searchParams.append("populate", "author,categories,featuredImage,meta.image");

    const response = await fetch(`${this.baseUrl}/posts?${searchParams}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.statusText}`);
    }

    const data = await response.json();
    return data.docs[0] || null;
  }

  async getCategories() {
    const response = await fetch(`${this.baseUrl}/categories`);

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }

    return response.json();
  }
}

export const apiClient = new ApiClient();
```

### Usage in Components

```typescript
// components/BlogPosts.tsx
"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";

export function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await apiClient.getPosts({ limit: 10 });
        setPosts(data.docs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

## 🚨 Error Handling

### Common HTTP Status Codes

| Status Code | Meaning               | Action                   |
| ----------- | --------------------- | ------------------------ |
| 200         | OK                    | Success                  |
| 400         | Bad Request           | Check request parameters |
| 401         | Unauthorized          | Check authentication     |
| 403         | Forbidden             | Check permissions        |
| 404         | Not Found             | Check endpoint URL       |
| 429         | Too Many Requests     | Implement rate limiting  |
| 500         | Internal Server Error | Check server logs        |

### Error Response Format

```json
{
  "errors": [
    {
      "message": "Post not found",
      "name": "NotFound",
      "data": null
    }
  ]
}
```

## 🔐 Authentication & Security

### API Key Authentication

```javascript
const headers = {
  Authorization: `Bearer ${process.env.PAYLOAD_API_KEY}`,
  "Content-Type": "application/json",
};
```

### CORS Configuration

```javascript
// For cross-origin requests
const response = await fetch("/api/posts", {
  headers: {
    "Content-Type": "application/json",
  },
  mode: "cors",
});
```

## 📊 Rate Limiting

### Default Limits

- **Authenticated requests**: 1000 per hour
- **Unauthenticated requests**: 100 per hour
- **File uploads**: 10 per hour

### Rate Limit Headers

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1638360000
```

## 🧪 Testing APIs

### Using cURL

```bash
# Get posts
curl -X GET "http://localhost:3001/api/posts?where[status][equals]=published" \
  -H "Content-Type: application/json"

# Create post (requires auth)
curl -X POST "http://localhost:3001/api/posts" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"title": "Test Post", "content": "Test content"}'
```

### Using JavaScript

```javascript
// Test API connection
const testApi = async () => {
  try {
    const response = await fetch("/api/health");
    const data = await response.json();
    console.log("API Status:", data);
  } catch (error) {
    console.error("API Error:", error);
  }
};
```

## 📚 Additional Resources

- **[Environment Variables](../reference/environment-variables.md)** - API configuration
- **[Troubleshooting](../guides/troubleshooting.md)** - API debugging
- **[PayloadCMS Documentation](https://payloadcms.com/docs)** - Official CMS docs
- **[GraphQL Documentation](https://graphql.org/learn/)** - GraphQL reference

---

**Last Updated**: September 2, 2025
**API Version**: 1.0.0
**Base URL**: `http://localhost:3001/api` (development)
