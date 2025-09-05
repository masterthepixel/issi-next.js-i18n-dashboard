# API Usage Examples 💡

This document provides practical examples of how to integrate with the ISSI Next.js i18n Dashboard APIs, including both internal Next.js routes and external PayloadCMS endpoints.

## 🔧 API Client Setup

### Basic API Client

```typescript
// lib/api-client.ts
const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3001";

export class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${CMS_URL}/api`;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Posts endpoints
  async getPosts(params?: { limit?: number; page?: number; category?: string; status?: "draft" | "published" }) {
    const searchParams = new URLSearchParams();

    if (params?.status) searchParams.append("where[status][equals]", params.status);
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.category) searchParams.append("where[categories][in]", params.category);

    searchParams.append("sort", "-publishedAt");
    searchParams.append("populate", "author,categories,featuredImage");

    return this.request(`/posts?${searchParams}`);
  }

  async getPostBySlug(slug: string) {
    const searchParams = new URLSearchParams();
    searchParams.append("where[slug][equals]", slug);
    searchParams.append("limit", "1");
    searchParams.append("populate", "author,categories,featuredImage,meta.image");

    const data = await this.request(`/posts?${searchParams}`);
    return data.docs[0] || null;
  }

  // Categories endpoints
  async getCategories() {
    return this.request("/categories");
  }

  async getCategoryBySlug(slug: string) {
    const searchParams = new URLSearchParams();
    searchParams.append("where[slug][equals]", slug);
    searchParams.append("limit", "1");

    const data = await this.request(`/categories?${searchParams}`);
    return data.docs[0] || null;
  }

  // Media endpoints
  async uploadMedia(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return this.request("/media", {
      method: "POST",
      body: formData,
      headers: {}, // Let browser set content-type for FormData
    });
  }
}

export const apiClient = new ApiClient();
```

## 📝 Component Examples

### Blog Posts List Component

```typescript
// components/BlogPosts.tsx
"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { BlogPostCard } from "./BlogPostCard";

interface BlogPostsProps {
  limit?: number;
  category?: string;
}

export function BlogPosts({ limit = 10, category }: BlogPostsProps) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getPosts({
          limit,
          category,
          status: "published",
        });
        setPosts(data.docs);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [limit, category]);

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: limit }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-800 h-48 rounded-lg mb-4"></div>
            <div className="bg-gray-200 dark:bg-gray-800 h-4 rounded mb-2"></div>
            <div className="bg-gray-200 dark:bg-gray-800 h-4 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">Failed to load posts</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">No posts found</h3>
        <p className="text-gray-600 dark:text-gray-400">
          {category ? `No posts found in category "${category}"` : "No posts have been published yet."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
```

### Individual Blog Post Card

```typescript
// components/BlogPostCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

interface BlogPostCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    publishedAt: string;
    author: {
      name: string;
      avatar?: {
        url: string;
        alt: string;
      };
    };
    featuredImage?: {
      url: string;
      alt: string;
      sizes?: {
        card?: {
          url: string;
          width: number;
          height: number;
        };
      };
    };
    categories: Array<{
      name: string;
      slug: string;
      color?: string;
    }>;
  };
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const imageUrl = post.featuredImage?.sizes?.card?.url || post.featuredImage?.url;

  return (
    <article className="group bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/blog/${post.slug}`}>
        <div className="p-6">
          {imageUrl && (
            <div className="aspect-video relative mb-4 overflow-hidden rounded-lg">
              <Image
                src={imageUrl}
                alt={post.featuredImage?.alt || post.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          <div className="space-y-3">
            {post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <span
                    key={category.slug}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: category.color || "#3B82F6" }}
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            )}

            <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
              {post.title}
            </h3>

            {post.excerpt && <p className="text-gray-600 dark:text-gray-400 line-clamp-3">{post.excerpt}</p>}

            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              {post.author.avatar && (
                <Image
                  src={post.author.avatar.url}
                  alt={post.author.avatar.alt}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span className="font-medium">{post.author.name}</span>
              <span>•</span>
              <time dateTime={post.publishedAt}>{format(new Date(post.publishedAt), "MMM dd, yyyy")}</time>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
```

### Single Blog Post Page

```typescript
// app/[locale]/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { apiClient } from "@/lib/api-client";
import { BlogPostContent } from "@/components/BlogPostContent";

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  try {
    const post = await apiClient.getPostBySlug(slug);

    if (!post) {
      return {
        title: "Post Not Found",
      };
    }

    return {
      title: post.meta?.title || post.title,
      description: post.meta?.description || post.excerpt,
      openGraph: {
        title: post.meta?.title || post.title,
        description: post.meta?.description || post.excerpt,
        images: post.meta?.image ? [post.meta.image.url] : post.featuredImage ? [post.featuredImage.url] : [],
      },
    };
  } catch (error) {
    return {
      title: "Error Loading Post",
    };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;

  try {
    const post = await apiClient.getPostBySlug(slug);

    if (!post) {
      notFound();
    }

    return <BlogPostContent post={post} locale={locale} />;
  } catch (error) {
    throw new Error("Failed to load blog post");
  }
}
```

### Blog Post Content Component

```typescript
// components/BlogPostContent.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";

interface BlogPostContentProps {
  post: {
    id: string;
    title: string;
    content: any; // Rich text content from PayloadCMS
    publishedAt: string;
    author: {
      name: string;
      bio?: string;
      avatar?: {
        url: string;
        alt: string;
      };
      socialLinks?: Array<{
        platform: string;
        url: string;
      }>;
    };
    featuredImage?: {
      url: string;
      alt: string;
    };
    categories: Array<{
      name: string;
      slug: string;
      color?: string;
    }>;
    tags?: Array<{
      tag: string;
    }>;
  };
  locale: string;
}

export function BlogPostContent({ post, locale }: BlogPostContentProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Back button */}
      <Link
        href={`/${locale}/blog`}
        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Blog
      </Link>

      {/* Hero image */}
      {post.featuredImage && (
        <div className="aspect-video relative mb-8 overflow-hidden rounded-lg">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt || post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
      )}

      {/* Article header */}
      <header className="mb-8">
        {/* Categories */}
        {post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.categories.map((category) => (
              <Link
                key={category.slug}
                href={`/${locale}/blog/category/${category.slug}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white hover:opacity-80"
                style={{ backgroundColor: category.color || "#3B82F6" }}
              >
                {category.name}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        {/* Meta information */}
        <div className="flex items-center gap-6 text-gray-600 dark:text-gray-400 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.publishedAt}>{format(new Date(post.publishedAt), "MMMM dd, yyyy")}</time>
          </div>

          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{post.author.name}</span>
          </div>
        </div>

        {/* Author bio */}
        <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-8">
          {post.author.avatar && (
            <Image
              src={post.author.avatar.url}
              alt={post.author.avatar.alt}
              width={48}
              height={48}
              className="rounded-full"
            />
          )}
          <div className="flex-1">
            <div className="font-semibold mb-1">{post.author.name}</div>
            {post.author.bio && <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{post.author.bio}</p>}
            {post.author.socialLinks && post.author.socialLinks.length > 0 && (
              <div className="flex gap-2">
                {post.author.socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {link.platform}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Article content */}
      <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
        {/* Render rich text content from PayloadCMS */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex items-center gap-2 mb-8">
          <Tag className="w-4 h-4 text-gray-500" />
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <Link
                key={index}
                href={`/${locale}/blog/tag/${tag.tag}`}
                className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                #{tag.tag}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related posts or navigation could go here */}
    </article>
  );
}
```

## 🔄 Data Fetching Patterns

### Server-Side Rendering (SSR)

```typescript
// app/[locale]/blog/page.tsx
import { apiClient } from "@/lib/api-client";
import { BlogPosts } from "@/components/BlogPosts";

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const { locale } = await params;
  const { page = "1", category } = await searchParams;

  const posts = await apiClient.getPosts({
    limit: 12,
    page: parseInt(page),
    category,
    status: "published",
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <BlogPosts initialPosts={posts.docs} />
    </div>
  );
}
```

### Static Site Generation (SSG)

```typescript
// app/[locale]/blog/[slug]/page.tsx
export async function generateStaticParams() {
  try {
    const posts = await apiClient.getPosts({
      limit: 100,
      status: "published",
    });

    return posts.docs.map((post) => ({
      locale: "en", // Generate for default locale
      slug: post.slug,
    }));
  } catch (error) {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  try {
    const post = await apiClient.getPostBySlug(slug);

    if (!post) {
      return {
        title: "Post Not Found",
      };
    }

    return {
      title: post.meta?.title || post.title,
      description: post.meta?.description || post.excerpt,
    };
  } catch (error) {
    return {
      title: "Error Loading Post",
    };
  }
}
```

### Incremental Static Regeneration (ISR)

```typescript
// app/[locale]/blog/page.tsx
export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const posts = await apiClient.getPosts({
    limit: 12,
    status: "published",
  });

  return <BlogPosts posts={posts.docs} />;
}
```

## 🧪 Testing Examples

### API Client Testing

```typescript
// __tests__/api-client.test.ts
import { apiClient } from "@/lib/api-client";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.get("http://localhost:3001/api/posts", (req, res, ctx) => {
    return res(
      ctx.json({
        docs: [
          {
            id: "1",
            title: "Test Post",
            slug: "test-post",
            excerpt: "Test excerpt",
            publishedAt: "2025-09-02T10:00:00.000Z",
            author: { name: "Test Author" },
            categories: [{ name: "Test Category", slug: "test-category" }],
          },
        ],
        totalDocs: 1,
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("API Client", () => {
  it("fetches posts successfully", async () => {
    const data = await apiClient.getPosts({ limit: 10 });

    expect(data.docs).toHaveLength(1);
    expect(data.docs[0].title).toBe("Test Post");
  });

  it("handles API errors gracefully", async () => {
    server.use(
      rest.get("http://localhost:3001/api/posts", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    await expect(apiClient.getPosts()).rejects.toThrow();
  });
});
```

### Component Testing

```typescript
// __tests__/BlogPostCard.test.tsx
import { render, screen } from "@testing-library/react";
import { BlogPostCard } from "@/components/BlogPostCard";

const mockPost = {
  id: "1",
  title: "Test Post Title",
  slug: "test-post-title",
  excerpt: "This is a test post excerpt",
  publishedAt: "2025-09-02T10:00:00.000Z",
  author: {
    name: "Test Author",
    avatar: {
      url: "/avatar.jpg",
      alt: "Test Author Avatar",
    },
  },
  categories: [{ name: "Technology", slug: "technology", color: "#3B82F6" }],
};

describe("BlogPostCard", () => {
  it("renders post information correctly", () => {
    render(<BlogPostCard post={mockPost} />);

    expect(screen.getByText("Test Post Title")).toBeInTheDocument();
    expect(screen.getByText("This is a test post excerpt")).toBeInTheDocument();
    expect(screen.getByText("Test Author")).toBeInTheDocument();
    expect(screen.getByText("Technology")).toBeInTheDocument();
  });

  it("links to the correct post URL", () => {
    render(<BlogPostCard post={mockPost} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/blog/test-post-title");
  });
});
```

## 📊 Error Handling Examples

### Global Error Boundary

```typescript
// app/error.tsx
"use client";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-4">{error.message || "An unexpected error occurred"}</p>
        <button onClick={reset} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Try again
        </button>
      </div>
    </div>
  );
}
```

### API Error Handling Hook

```typescript
// hooks/use-api.ts
"use client";

import { useState, useCallback } from "react";

export function useApi<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (apiCall: () => Promise<T>) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, execute, reset };
}
```

---

**Last Updated**: September 2, 2025
**Examples**: REST API, GraphQL, React Components, Testing, Error Handling
