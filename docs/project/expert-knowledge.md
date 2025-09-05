# Expert Knowledge Base 🧠

This document contains advanced technical knowledge, best practices, and expert-level insights for the ISSI Next.js i18n Dashboard project.

## 🎯 Advanced Concepts

### React 19 Deep Dive

#### Concurrent Rendering Patterns

```typescript
// Advanced concurrent patterns with React 19
"use client";

import { Suspense, useDeferredValue, useTransition } from "react";

export function AdvancedSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const deferredQuery = useDeferredValue(query);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);

    // Non-urgent update - can be interrupted
    startTransition(() => {
      // Expensive search operation
      const searchResults = performExpensiveSearch(deferredQuery);
      setResults(searchResults);
    });
  };

  return (
    <div>
      <input value={query} onChange={(e) => handleSearch(e.target.value)} placeholder="Search..." />

      <Suspense fallback={<div>Searching...</div>}>
        <SearchResults query={deferredQuery} results={results} isPending={isPending} />
      </Suspense>
    </div>
  );
}
```

#### React Compiler Integration

```typescript
// Leveraging React 19's compiler for optimization
"use client";

import { memo, useMemo } from "react";

// The compiler automatically memoizes this
function ExpensiveComponent({ data, filter }) {
  const filteredData = useMemo(() => {
    return data.filter((item) => item.category === filter);
  }, [data, filter]);

  return (
    <div>
      {filteredData.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}

// Manual memo when needed
export default memo(ExpensiveComponent);
```

### Next.js 15 Advanced Features

#### Advanced App Router Patterns

```typescript
// app/[locale]/products/[slug]/page.tsx
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  const product = await getProductBySlug(slug, locale);

  if (!product) {
    notFound();
  }

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { locale, slug } = await params;

  const product = await getProductBySlug(slug, locale);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} locale={locale} />;
}
```

#### Advanced Caching Strategies

```typescript
// lib/cache.ts
import { unstable_cache } from "next/cache";

export const getCachedProducts = unstable_cache(
  async (locale: string, category?: string) => {
    const products = await fetchProducts(locale, category);
    return products;
  },
  ["products"],
  {
    revalidate: 3600, // 1 hour
    tags: ["products"],
  }
);

// Usage in components
export default async function ProductList({ locale, category }) {
  const products = await getCachedProducts(locale, category);

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### PayloadCMS Advanced Integration

#### Custom Hooks for CMS Data

```typescript
// lib/cms-hooks.ts
"use client";

import { useState, useEffect } from "react";

export function usePosts(
  locale: string,
  options?: {
    limit?: number;
    category?: string;
  }
) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const searchParams = new URLSearchParams();
        searchParams.append("where[status][equals]", "published");
        searchParams.append("sort", "-publishedAt");
        searchParams.append("populate", "author,categories,featuredImage");

        if (options?.limit) searchParams.append("limit", options.limit.toString());
        if (options?.category) searchParams.append("where[categories][in]", options.category);

        const response = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/posts?${searchParams}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }

        const data = await response.json();
        setPosts(data.docs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [locale, options?.limit, options?.category]);

  return { posts, loading, error };
}
```

#### Advanced GraphQL Queries

```typescript
// lib/graphql-queries.ts
import { gql } from "graphql-request";

export const GET_POSTS_WITH_RELATIONS = gql`
  query GetPostsWithRelations($locale: String!, $limit: Int = 10, $category: String) {
    Posts(
      where: { status: { equals: published }, categories: { slug: { equals: $category } } }
      sort: "publishedAt"
      limit: $limit
      locale: $locale
    ) {
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
          socialLinks {
            platform
            url
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
      totalDocs
      hasNextPage
      hasPrevPage
      pagingCounter
      totalPages
    }
  }
`;
```

## 🎨 Advanced UI/UX Patterns

### BentoGrid Advanced Layouts

```typescript
// components/BentoGrid.tsx
"use client";

import { cn } from "@/lib/utils";

interface BentoItem {
  id: string;
  title: string;
  description: string;
  size: "small" | "medium" | "large" | "xlarge";
  color: string;
  href?: string;
}

interface BentoGridProps {
  items: BentoItem[];
  className?: string;
}

const sizeClasses = {
  small: "col-span-1 row-span-1",
  medium: "col-span-2 row-span-1",
  large: "col-span-2 row-span-2",
  xlarge: "col-span-3 row-span-2",
};

export function BentoGrid({ items, className }: BentoGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr", className)}>
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            "relative overflow-hidden rounded-lg p-6 transition-all duration-300 hover:scale-105",
            sizeClasses[item.size]
          )}
          style={{ backgroundColor: item.color + "10", borderColor: item.color + "20" }}
        >
          <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### Advanced 3D Globe Interactions

```typescript
// components/Globe.tsx
"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

function AnimatedGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 64, 64]}>
      <meshStandardMaterial map={earthTexture} normalMap={earthNormalTexture} roughnessMap={earthRoughnessTexture} />
    </Sphere>
  );
}

export function Globe() {
  return (
    <Canvas camera={{ position: [0, 0, 2.5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <AnimatedGlobe />
      <OrbitControls enableZoom={true} enablePan={false} minDistance={1.5} maxDistance={4} />
    </Canvas>
  );
}
```

## 🔧 Performance Optimization Techniques

### Advanced Bundle Analysis

```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Bundle analyzer
    if (!dev && !isServer) {
      config.plugins.push(
        new webpack.DefinePlugin({
          __BUNDLE_ANALYZE__: JSON.stringify(process.env.ANALYZE === "true"),
        })
      );
    }

    return config;
  },

  // Advanced optimizations
  experimental: {
    optimizePackageImports: ["@payloadcms/ui", "lucide-react"],
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
};

export default nextConfig;
```

### Advanced Image Optimization

```typescript
// components/OptimizedImage.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 75,
  placeholder = "empty",
  blurDataURL,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative overflow-hidden">
      {isLoading && <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />}

      {!hasError ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          className={cn("transition-opacity duration-300", isLoading ? "opacity-0" : "opacity-100")}
        />
      ) : (
        <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
          <span className="text-gray-500">Failed to load image</span>
        </div>
      )}
    </div>
  );
}
```

## 🌐 Advanced Internationalization

### Dynamic Translation Loading

```typescript
// lib/i18n.ts
import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: () => import("../lang/en.json"),
  es: () => import("../lang/es.json"),
  fr: () => import("../lang/fr.json"),
};

export async function createI18nInstance(locale: string) {
  const i18n = createInstance();

  await i18n.use(initReactI18next).init({
    lng: locale,
    fallbackLng: "en",
    resources: {
      [locale]: await resources[locale](),
    },
    interpolation: {
      escapeValue: false,
    },
  });

  return i18n;
}
```

### Advanced Pluralization

```json
// lang/en.json
{
  "item": "item",
  "item_plural": "items",
  "itemWithCount": "{{count}} item",
  "itemWithCount_plural": "{{count}} items"
}
```

```typescript
// Usage
const { t } = useTranslation();
const itemCount = 5;

// Automatic pluralization
t("itemWithCount", { count: itemCount });
```

## 🔒 Advanced Security Patterns

### Content Security Policy

```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self'",
              "connect-src 'self' https://api.github.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

### Advanced Authentication Patterns

```typescript
// lib/auth.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function authenticateRequest(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

    return payload;
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
```

## 📊 Advanced Analytics & Monitoring

### Performance Monitoring

```typescript
// lib/performance.ts
"use client";

import { useEffect } from "react";

export function usePerformanceMonitoring() {
  useEffect(() => {
    // Core Web Vitals
    if (typeof window !== "undefined" && "web-vitals" in window) {
      import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(console.log);
        getFID(console.log);
        getFCP(console.log);
        getLCP(console.log);
        getTTFB(console.log);
      });
    }

    // Custom performance metrics
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log or send to analytics
        console.log("Performance entry:", entry);
      }
    });

    observer.observe({ entryTypes: ["measure", "navigation", "resource"] });

    return () => observer.disconnect();
  }, []);
}
```

### Error Boundary with Reporting

```typescript
// components/ErrorBoundary.tsx
"use client";

import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ComponentType<{ error: Error }> },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to error reporting service
    console.error("Error caught by boundary:", error, errorInfo);

    // Send to analytics/monitoring
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "exception", {
        description: error.toString(),
        fatal: false,
      });
    }
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback;

      if (FallbackComponent) {
        return <FallbackComponent error={this.state.error} />;
      }

      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>Please refresh the page or contact support if the problem persists.</p>
          <button onClick={() => window.location.reload()}>Refresh Page</button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## 🚀 Deployment & DevOps Excellence

### Advanced CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "20"
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build

  performance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run build
      - uses: codecov/codecov-action@v3
      - uses: Lighthouse-CI/action@v1
        with:
          urls: http://localhost:3000
          configPath: .lighthouserc.json

  deploy:
    needs: [test, performance]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

### Infrastructure as Code

```typescript
// infrastructure/deploy.ts
import { execSync } from "child_process";

export function deployToProduction() {
  try {
    // Pre-deployment checks
    execSync("npm run lint", { stdio: "inherit" });
    execSync("npm run test", { stdio: "inherit" });
    execSync("npm run build", { stdio: "inherit" });

    // Deploy to Vercel
    execSync("vercel --prod", { stdio: "inherit" });

    // Post-deployment verification
    execSync("curl -f https://your-app.vercel.app/api/health", { stdio: "inherit" });

    console.log("✅ Deployment successful!");
  } catch (error) {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  }
}
```

## 🎯 Best Practices & Patterns

### Code Organization Excellence

```typescript
// lib/patterns/
export * from "./api-patterns";
export * from "./component-patterns";
export * from "./data-patterns";
export * from "./error-patterns";
export * from "./performance-patterns";
export * from "./security-patterns";
export * from "./testing-patterns";
```

### Advanced TypeScript Patterns

```typescript
// types/advanced.ts
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Awaited<T> = T extends PromiseLike<infer U> ? U : T;

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
```

### Testing Excellence

```typescript
// __tests__/integration.test.ts
import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { BlogPosts } from "@/components/BlogPosts";

// Mock API server
const server = setupServer(
  rest.get("/api/posts", (req, res, ctx) => {
    return res(
      ctx.json({
        docs: [{ id: "1", title: "Test Post", excerpt: "Test excerpt" }],
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("BlogPosts Integration", () => {
  it("loads and displays posts", async () => {
    render(<BlogPosts />);

    await waitFor(() => {
      expect(screen.getByText("Test Post")).toBeInTheDocument();
      expect(screen.getByText("Test excerpt")).toBeInTheDocument();
    });
  });

  it("handles API errors gracefully", async () => {
    server.use(
      rest.get("/api/posts", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<BlogPosts />);

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
  });
});
```

---

**Last Updated**: September 2, 2025
**Expertise Level**: Senior/Lead Developer
**Focus Areas**: React 19, Next.js 15, Performance, Architecture
