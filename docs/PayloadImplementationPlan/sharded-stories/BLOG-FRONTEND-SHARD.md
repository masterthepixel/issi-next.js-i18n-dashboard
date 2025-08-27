# Sharded Story: Blog Frontend Shard

## Story Overview
**As a user,**  
**I want to browse and read blog posts**  
**So that I can consume content in my preferred language**

---

## 📋 Story Details

### **Shard Information**
- **Shard ID:** BLOG-FE-001
- **Shard Name:** Blog Frontend
- **Epic:** Company Blog Implementation
- **Priority:** High
- **Estimated Effort:** 3-5 days

### **Business Context**
Users need an intuitive, fast, and accessible way to browse, search, and read blog posts.
The interface must support multiple languages, provide rich content rendering, and offer
social sharing capabilities while maintaining excellent performance and SEO.

### **Stakeholders**
- **Primary:** End Users (Blog Readers)
- **Secondary:** Content Creators, SEO Specialist
- **Supporting:** Product Owner, Developers

---

## 🎯 Acceptance Criteria

### **Functional Requirements**
- [ ] **Blog Index Page**: Paginated list of published posts with featured images
- [ ] **Blog Post Detail**: Individual post pages with rich text rendering
- [ ] **Search & Filtering**: Client-side search with category/tag filtering
- [ ] **Social Sharing**: Share buttons for LinkedIn, Twitter, Facebook
- [ ] **Author Information**: Author bio and profile links
- [ ] **SEO Optimization**: Proper meta tags and structured data
- [ ] **Mobile Responsiveness**: Fully responsive design
- [ ] **Language Switching**: Seamless i18n support

### **Non-Functional Requirements**
- [ ] **Performance**: Pages load within 3 seconds
- [ ] **Accessibility**: WCAG 2.1 Level AA compliance
- [ ] **SEO**: Perfect Lighthouse scores
- [ ] **Scalability**: Support for 100+ posts efficiently

---

## 🏗️ Technical Implementation

### **Next.js Page Structure**

#### **Blog Index Page**

```typescript
// src/app/[lang]/blog/page.tsx
import { getPosts } from '@/lib/api/posts';
import { BlogPostCard } from '@/components/blog/BlogPostCard';
import { BlogSearch } from '@/components/blog/BlogSearch';

export const metadata = {
  title: 'Blog | Company Name',
  description: 'Latest insights and updates from our team',
};

interface BlogPageProps {
  params: { lang: string };
  searchParams: { page?: string; search?: string };
}

export default async function BlogPage({
  params,
  searchParams
}: BlogPageProps) {
  const page = parseInt(searchParams.page || '1');
  const search = searchParams.search || '';

  const { posts, totalPages } = await getPosts({
    locale: params.lang,
    page,
    search,
    limit: 10
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          Blog
        </h1>
        <BlogSearch initialSearch={search} />
      </div>

      <div className="grid gap-6 mb-8">
        {posts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          baseUrl={`/${params.lang}/blog`}
        />
      )}
    </div>
  );
}

// ISR Configuration
export const revalidate = 60; // Revalidate every minute
```

#### **Blog Post Detail Page**

```typescript
// src/app/[lang]/blog/[slug]/page.tsx
import { getPostBySlug } from '@/lib/api/posts';
import { RichTextRenderer } from '@/components/blog/RichTextRenderer';
import { AuthorBio } from '@/components/blog/AuthorBio';
import { SocialShareButtons } from '@/components/blog/SocialShareButtons';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: { lang: string; slug: string };
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug, params.lang);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.meta?.title?.[params.lang] || post.title[params.lang],
    description: post.meta?.description?.[params.lang] || post.excerpt?.[params.lang],
    openGraph: {
      title: post.meta?.title?.[params.lang] || post.title[params.lang],
      description: post.meta?.description?.[params.lang] || post.excerpt?.[params.lang],
      images: post.meta?.image ? [{ url: post.meta.image.url }] : [],
    },
  };
}

export default async function BlogPostPage({
  params
}: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug, params.lang);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Hero Section */}
      <header className="mb-8">
        {post.featuredImage && (
          <div className="mb-6">
            <img
              src={post.featuredImage.url}
              alt={post.featuredImage.alt || post.title[params.lang]}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold mb-4">
          {post.title[params.lang]}
        </h1>

        {post.excerpt && (
          <p className="text-xl text-muted-foreground mb-6">
            {post.excerpt[params.lang]}
          </p>
        )}

        <div className="flex items-center justify-between">
          <AuthorBio author={post.author} />
          <div className="text-sm text-muted-foreground">
            {new Date(post.publishedAt).toLocaleDateString(params.lang)}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none mb-8">
        <RichTextRenderer content={post.content[params.lang]} />
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
              >
                {tag.tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Social Sharing */}
      <div className="border-t pt-8">
        <SocialShareButtons
          url={`/${params.lang}/blog/${post.slug[params.lang]}`}
          title={post.title[params.lang]}
        />
      </div>
    </article>
  );
}

// ISR Configuration
export const revalidate = 60;
```

### **React Components**

#### **BlogPostCard Component**

```typescript
// src/components/blog/BlogPostCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/types/blog';

interface BlogPostCardProps {
  post: BlogPost;
  locale: string;
}

export function BlogPostCard({ post, locale }: BlogPostCardProps) {
  return (
    <article className="border rounded-lg p-6 hover:shadow-md transition-shadow">
      {post.featuredImage && (
        <div className="mb-4">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt || post.title[locale]}
            width={400}
            height={200}
            className="w-full h-48 object-cover rounded"
          />
        </div>
      )}

      <div className="space-y-2">
        <Link
          href={`/${locale}/blog/${post.slug[locale]}`}
          className="text-2xl font-bold hover:text-primary transition-colors"
        >
          {post.title[locale]}
        </Link>

        {post.excerpt && (
          <p className="text-muted-foreground">
            {post.excerpt[locale]}
          </p>
        )}

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{post.author.name}</span>
          <span>{new Date(post.publishedAt).toLocaleDateString(locale)}</span>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
              >
                {tag.tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
```

#### **RichTextRenderer Component**

```typescript
// src/components/blog/RichTextRenderer.tsx
'use client';

import { RichTextField } from '@payloadcms/richtext-slate';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface RichTextRendererProps {
  content: RichTextField;
}

export function RichTextRenderer({ content }: RichTextRendererProps) {
  // Custom renderer for PayloadCMS rich text
  const renderElement = (element: any, children: React.ReactNode) => {
    switch (element.type) {
      case 'h1':
        return <h1 className="text-3xl font-bold mb-4">{children}</h1>;
      case 'h2':
        return <h2 className="text-2xl font-bold mb-3">{children}</h2>;
      case 'h3':
        return <h3 className="text-xl font-bold mb-2">{children}</h3>;
      case 'blockquote':
        return (
          <blockquote className="border-l-4 border-primary pl-4 italic">
            {children}
          </blockquote>
        );
      case 'code':
        return (
          <code className="bg-muted px-1 py-0.5 rounded text-sm">
            {children}
          </code>
        );
      case 'link':
        return (
          <a
            href={element.url}
            className="text-primary hover:underline"
            target={element.newTab ? '_blank' : undefined}
          >
            {children}
          </a>
        );
      default:
        return <p className="mb-4">{children}</p>;
    }
  };

  const renderLeaf = (leaf: any) => {
    let children = <span>{leaf.text}</span>;

    if (leaf.bold) {
      children = <strong>{children}</strong>;
    }
    if (leaf.italic) {
      children = <em>{children}</em>;
    }
    if (leaf.underline) {
      children = <u>{children}</u>;
    }
    if (leaf.code) {
      children = <code className="bg-muted px-1 py-0.5 rounded">{children}</code>;
    }

    return children;
  };

  // Render the rich text content
  return (
    <div className="rich-text-content">
      {/* Custom rendering logic for PayloadCMS rich text */}
      {/* This would include recursive rendering of elements and leaves */}
    </div>
  );
}
```

#### **BlogSearch Component**

```typescript
// src/components/blog/BlogSearch.tsx
'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface BlogSearchProps {
  initialSearch?: string;
}

export function BlogSearch({ initialSearch = '' }: BlogSearchProps) {
  const [search, setSearch] = useState(initialSearch);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (search) {
        params.set('search', search);
      } else {
        params.delete('search');
      }
      params.set('page', '1'); // Reset to first page

      router.push(`?${params.toString()}`);
    });
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <Input
        type="text"
        placeholder="Search blog posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" disabled={isPending}>
        {isPending ? 'Searching...' : 'Search'}
      </Button>
    </form>
  );
}
```

---

## 🔄 State Management

### **Server-Side State (ISR/SSG)**

```typescript
// Server state through Next.js App Router
interface BlogPageState {
  posts: BlogPost[];
  totalPages: number;
  currentPage: number;
  searchQuery?: string;
}

// ISR with PayloadCMS
export const getStaticProps = async ({
  params,
  searchParams
}: {
  params: { lang: string };
  searchParams: { page?: string; search?: string };
}) => {
  const page = parseInt(searchParams.page || '1');
  const search = searchParams.search || '';

  const { posts, totalPages } = await getPosts({
    locale: params.lang,
    page,
    search,
    limit: 10
  });

  return {
    props: {
      posts,
      totalPages,
      currentPage: page,
      searchQuery: search
    },
    revalidate: 60 // ISR every minute
  };
};
```

### **Client-Side State**

```typescript
// src/hooks/useBlogSearch.ts
import { useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function useBlogSearch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const search = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams(searchParams);
      if (query) {
        params.set('search', query);
      } else {
        params.delete('search');
      }
      params.set('page', '1');

      router.push(`?${params.toString()}`);
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [router, searchParams]);

  return { search, isLoading, error };
}
```

### **Global State (Context)**

```typescript
// src/contexts/BlogContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface BlogContextType {
  featuredPosts: BlogPost[];
  setFeaturedPosts: (posts: BlogPost[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: ReactNode }) {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <BlogContext.Provider value={{
      featuredPosts,
      setFeaturedPosts,
      isLoading,
      setIsLoading
    }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
}
```

### **API State Management**

```typescript
// src/lib/api/posts.ts
import { BlogPost } from '@/types/blog';

export interface GetPostsParams {
  locale: string;
  page?: number;
  limit?: number;
  search?: string;
  tag?: string;
}

export async function getPosts({
  locale,
  page = 1,
  limit = 10,
  search = '',
  tag = ''
}: GetPostsParams) {
  const params = new URLSearchParams({
    'where[_status][equals]': 'published',
    'locale': locale,
    'page': page.toString(),
    'limit': limit.toString(),
    'sort': '-publishedAt'
  });

  if (search) {
    params.append('where[title][like]', search);
  }

  if (tag) {
    params.append('where[tags][in][tag]', tag);
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?${params}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  return response.json();
}

export async function getPostBySlug(slug: string, locale: string) {
  const params = new URLSearchParams({
    'where[slug][equals]': slug,
    'where[_status][equals]': 'published',
    'locale': locale
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?${params}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }

  const data = await response.json();
  return data.docs[0] || null;
}

export async function getFeaturedPosts(locale: string, limit = 3) {
  const params = new URLSearchParams({
    'where[_status][equals]': 'published',
    'where[featured][equals]': 'true',
    'locale': locale,
    'limit': limit.toString(),
    'sort': '-publishedAt'
  });

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/posts?${params}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch featured posts');
  }

  const data = await response.json();
  return data.docs;
}
```

---

## 🧪 Testing Scenarios

### **Unit Tests**

```typescript
// tests/components/BlogPostCard.test.tsx
import { render, screen } from '@testing-library/react';
import { BlogPostCard } from '@/components/blog/BlogPostCard';

const mockPost = {
  id: '1',
  title: { en: 'Test Post', fr: 'Article Test' },
  slug: { en: 'test-post', fr: 'article-test' },
  excerpt: { en: 'Test excerpt', fr: 'Extrait test' },
  featuredImage: {
    url: '/test-image.jpg',
    alt: 'Test image'
  },
  author: { name: 'Test Author' },
  publishedAt: '2025-01-01T00:00:00.000Z',
  tags: [{ tag: 'test' }, { tag: 'blog' }]
};

describe('BlogPostCard', () => {
  test('renders post title and links correctly', () => {
    render(<BlogPostCard post={mockPost} locale="en" />);

    const titleLink = screen.getByRole('link', { name: /test post/i });
    expect(titleLink).toHaveAttribute('href', '/en/blog/test-post');
  });

  test('displays author and date', () => {
    render(<BlogPostCard post={mockPost} locale="en" />);

    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('1/1/2025')).toBeInTheDocument();
  });

  test('shows tags when present', () => {
    render(<BlogPostCard post={mockPost} locale="en" />);

    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByText('blog')).toBeInTheDocument();
  });
});
```

### **Integration Tests**

```typescript
// tests/integration/blog-frontend.test.ts
describe('Blog Frontend Integration', () => {
  test('blog index page loads and displays posts', async () => {
    // Test full page load with posts
  });

  test('blog post detail page renders correctly', async () => {
    // Test individual post page rendering
  });

  test('search functionality filters posts', async () => {
    // Test search and filtering
  });
});
```

### **E2E Tests**

```typescript
// tests/e2e/blog-user-journey.test.ts
describe('Blog User Journey', () => {
  test('user can browse blog posts', async () => {
    // Navigate to blog, view posts, click through
  });

  test('user can search for specific content', async () => {
    // Use search functionality
  });

  test('user can share blog post on social media', async () => {
    // Test social sharing buttons
  });
});
```

---

## 📋 Dependencies & Assumptions

### **Dependencies**
- [ ] Blog CMS Shard (Posts collection)
- [ ] Shared Infrastructure (Users, Media collections)
- [ ] Authentication System
- [ ] Rich text renderer library
- [ ] Social sharing library
- [ ] Search functionality implementation

### **Assumptions**
- [ ] PayloadCMS API is accessible and stable
- [ ] Rich text content structure is consistent
- [ ] Media files are properly served
- [ ] Authentication system provides user context
- [ ] Search functionality is implemented at API level

---

## 🎯 Success Metrics

### **Functional Success**
- [ ] Blog index loads within 3 seconds
- [ ] All blog posts render correctly
- [ ] Search functionality works accurately
- [ ] Social sharing buttons function properly
- [ ] Mobile responsiveness is perfect

### **Performance Success**
- [ ] Lighthouse scores > 90 for all metrics
- [ ] Core Web Vitals within acceptable ranges
- [ ] No layout shifts during loading
- [ ] Efficient image loading and optimization

### **Quality Success**
- [ ] WCAG 2.1 Level AA compliance
- [ ] Cross-browser compatibility
- [ ] Proper error handling for missing posts
- [ ] SEO metadata correctly implemented

---

## 📝 Implementation Notes

### **Performance Optimization**
1. Implement ISR for blog pages
2. Use Next.js Image component for optimization
3. Implement proper caching strategies
4. Lazy load non-critical components

### **SEO Implementation**
1. Dynamic meta tags for each post
2. Structured data (JSON-LD) for blog posts
3. Open Graph tags for social sharing
4. Proper heading hierarchy

### **Accessibility Implementation**
1. Semantic HTML structure
2. Keyboard navigation support
3. Screen reader compatibility
4. Color contrast compliance

### **Mobile Optimization**
1. Responsive design patterns
2. Touch-friendly interactions
3. Optimized image loading
4. Fast mobile performance

---

## 🔗 Related Stories

### **Depends On**
- [ ] Blog CMS Shard
- [ ] Shared Infrastructure Shard
- [ ] Authentication System

### **Enables**
- [ ] Homepage Blog Integration
- [ ] Content Marketing Features
- [ ] User Engagement Analytics

### **Related**
- [ ] SEO Enhancement Features
- [ ] Performance Monitoring
- [ ] Content Analytics

---

**Story Created:** August 27, 2025
**Last Updated:** August 27, 2025
**Status:** Ready for Implementation
**Assigned To:** Frontend Development Team