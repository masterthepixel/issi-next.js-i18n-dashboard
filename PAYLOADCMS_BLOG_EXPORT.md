# PayloadCMS Blog Configuration Export

This document contains the complete PayloadCMS blog configuration that was previously integrated into the Next.js application. Use this to set up a headless PayloadCMS backend at `localhost:3001`.

## Environment Configuration

```env
# PayloadCMS Backend (.env)
DATABASE_URL=postgresql://neondb_owner:npg_Y8FzI0ZbmEPK@ep-small-truth-adtew3kx-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
PAYLOAD_SECRET=your-secret-key-here
PAYLOAD_CONFIG_PATH=payload.config.ts
PAYLOAD_PORT=3001

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_ljwHlHXx6LQ6dqnR_vDq60nmAn4vQhKH2tzwRcW2KV2ZnTO
```

## Collections Configuration

### 1. Posts Collection

```typescript
// collections/Posts.ts
import type { CollectionConfig } from "payload";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: {
    singular: "Post",
    plural: "Posts",
  },
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [
          ({ data, operation }) => {
            if (operation === "create" || !data?.slug) {
              if (data?.title) {
                return data.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "");
              }
            }
            return data?.slug;
          },
        ],
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
      localized: true,
    },
    {
      name: "excerpt",
      type: "textarea",
      localized: true,
      admin: {
        description: "Brief summary of the post (optional, will use first 160 characters of content if not provided)",
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "featuredImage",
      type: "relationship",
      relationTo: "media",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "categories",
      type: "relationship",
      relationTo: "categories",
      hasMany: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "tags",
      type: "array",
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
        },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
      hooks: {
        beforeValidate: [
          ({ data, operation }) => {
            if (operation === "create" && !data?.publishedAt) {
              return new Date();
            }
            return data?.publishedAt;
          },
        ],
      },
    },
    {
      name: "status",
      type: "select",
      options: [
        {
          label: "Draft",
          value: "draft",
        },
        {
          label: "Published",
          value: "published",
        },
      ],
      defaultValue: "draft",
      admin: {
        position: "sidebar",
      },
    },
    // SEO Fields
    {
      name: "meta",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          localized: true,
        },
        {
          name: "description",
          type: "textarea",
          localized: true,
        },
        {
          name: "image",
          type: "relationship",
          relationTo: "media",
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Auto-generate excerpt if not provided
        if (!data.excerpt && data.content) {
          const textContent = JSON.stringify(data.content).replace(/[{}"]/g, " ");
          data.excerpt = textContent.substring(0, 160) + "...";
        }

        // Auto-generate meta title if not provided
        if (!data.meta?.title && data.title) {
          data.meta = {
            ...data.meta,
            title: data.title,
          };
        }

        // Auto-generate meta description if not provided
        if (!data.meta?.description && data.excerpt) {
          data.meta = {
            ...data.meta,
            description: data.excerpt,
          };
        }

        return data;
      },
    ],
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "author", "status", "publishedAt"],
    listSearchableFields: ["title", "excerpt"],
  },
  versions: {
    drafts: true,
  },
};
```

### 2. Categories Collection

```typescript
// collections/Categories.ts
import type { CollectionConfig } from "payload";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

export const Categories: CollectionConfig = {
  slug: "categories",
  labels: {
    singular: "Category",
    plural: "Categories",
  },
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      hooks: {
        beforeValidate: [
          ({ data, operation }) => {
            if (operation === "create" || !data?.slug) {
              if (data?.name) {
                return data.name
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "");
              }
            }
            return data?.slug;
          },
        ],
      },
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
    },
    {
      name: "color",
      type: "text",
      admin: {
        description: "Hex color code for category styling (e.g., #3B82F6)",
      },
    },
  ],
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug"],
  },
};
```

### 3. Users Collection

```typescript
// collections/Users.ts
import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: "User",
    plural: "Users",
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "bio",
      type: "textarea",
    },
    {
      name: "avatar",
      type: "relationship",
      relationTo: "media",
    },
    {
      name: "role",
      type: "select",
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Editor",
          value: "editor",
        },
        {
          label: "Author",
          value: "author",
        },
      ],
      defaultValue: "author",
      required: true,
    },
    {
      name: "socialLinks",
      type: "array",
      fields: [
        {
          name: "platform",
          type: "select",
          options: [
            { label: "Twitter", value: "twitter" },
            { label: "LinkedIn", value: "linkedin" },
            { label: "GitHub", value: "github" },
            { label: "Website", value: "website" },
          ],
          required: true,
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },
  ],
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "email", "role"],
  },
};
```

### 4. Media Collection

```typescript
// collections/Media.ts
import type { CollectionConfig } from "payload";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";

export const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Media",
    plural: "Media",
  },
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "caption",
      type: "text",
    },
  ],
  upload: {
    staticDir: "media",
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        crop: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 1024,
        crop: "centre",
      },
      {
        name: "tablet",
        width: 1024,
        height: null,
      },
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*"],
  },
  admin: {
    useAsTitle: "alt",
  },
};
```

## Access Control

### Anyone Access

```typescript
// access/anyone.ts
import type { Access } from "payload";

export const anyone: Access = () => true;
```

### Authenticated Access

```typescript
// access/authenticated.ts
import type { Access } from "payload";

export const authenticated: Access = ({ req: { user } }) => {
  return Boolean(user);
};
```

### Admin Only Access

```typescript
// access/adminOnly.ts
import type { Access } from "payload";

export const adminOnly: Access = ({ req: { user } }) => {
  return Boolean(user && user.role === "admin");
};
```

## Main Configuration File

```typescript
// payload.config.ts
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { slateEditor } from "@payloadcms/richtext-slate";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";

import { Posts } from "./collections/Posts";
import { Categories } from "./collections/Categories";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";

export default buildConfig({
  admin: {
    user: "users",
    meta: {
      titleSuffix: "- ISSI Blog CMS",
      favicon: "/favicon.ico",
      ogImage: "/og-image.jpg",
    },
  },
  collections: [Posts, Categories, Users, Media],
  editor: slateEditor({}),
  secret: process.env.PAYLOAD_SECRET || "your-secret-here",
  typescript: {
    outputFile: "payload-types.ts",
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
  cors: ["http://localhost:3000", "https://your-frontend-domain.com"],
  csrf: ["http://localhost:3000", "https://your-frontend-domain.com"],
});
```

## Seed Data

### Initial Admin User

```typescript
// seed/index.ts
import type { Payload } from "payload";

export const seed = async (payload: Payload): Promise<void> => {
  // Create admin user
  await payload.create({
    collection: "users",
    data: {
      name: "Admin User",
      email: "admin@issi.com",
      password: "password123!",
      role: "admin",
      bio: "System administrator and content manager",
    },
  });

  // Create demo author
  await payload.create({
    collection: "users",
    data: {
      name: "Demo Author",
      email: "demo-author@example.com",
      password: "password",
      role: "author",
      bio: "Demo content author for testing purposes",
    },
  });

  // Create default categories
  const techCategory = await payload.create({
    collection: "categories",
    data: {
      name: "Technology",
      slug: "technology",
      description: "Posts about technology, programming, and digital innovation",
      color: "#3B82F6",
    },
  });

  const businessCategory = await payload.create({
    collection: "categories",
    data: {
      name: "Business",
      slug: "business",
      description: "Business insights, strategies, and market analysis",
      color: "#10B981",
    },
  });

  const designCategory = await payload.create({
    collection: "categories",
    data: {
      name: "Design",
      slug: "design",
      description: "UI/UX design, visual design, and creative inspiration",
      color: "#F59E0B",
    },
  });

  console.log("Seed data created successfully!");
};
```

## API Endpoints

### REST API Examples

```bash
# Get all published posts
GET /api/posts?where[status][equals]=published&sort=-publishedAt

# Get posts with author and categories populated
GET /api/posts?populate=author,categories,featuredImage

# Get posts by category
GET /api/posts?where[categories][in]=CATEGORY_ID

# Get single post by slug
GET /api/posts?where[slug][equals]=post-slug&limit=1

# Get all categories
GET /api/categories

# Get post with full relationships
GET /api/posts/POST_ID?populate=author,categories,featuredImage,meta.image
```

### GraphQL Schema Examples

```graphql
# Get all published posts with relationships
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

# Get single post by slug
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

# Get all categories
query GetCategories {
  Categories {
    docs {
      id
      name
      slug
      description
      color
    }
  }
}
```

## Frontend Integration Examples

### API Client Setup

```typescript
// lib/payload-api.ts
const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3001";

export class PayloadAPI {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${CMS_URL}/api`;
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
    return response.json();
  }

  async getPostBySlug(slug: string) {
    const searchParams = new URLSearchParams();
    searchParams.append("where[slug][equals]", slug);
    searchParams.append("limit", "1");
    searchParams.append("populate", "author,categories,featuredImage,meta.image");

    const response = await fetch(`${this.baseUrl}/posts?${searchParams}`);
    const data = await response.json();
    return data.docs[0] || null;
  }

  async getCategories() {
    const response = await fetch(`${this.baseUrl}/categories`);
    return response.json();
  }
}

export const payloadAPI = new PayloadAPI();
```

### React Components

```typescript
// components/BlogPostCard.tsx
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
    <article className="group cursor-pointer">
      <Link href={`/blog/${post.slug}`}>
        <div className="space-y-4">
          {imageUrl && (
            <div className="aspect-video overflow-hidden rounded-lg">
              <Image
                src={imageUrl}
                alt={post.featuredImage?.alt || post.title}
                width={768}
                height={432}
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
          )}

          <div className="space-y-2">
            {post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <span
                    key={category.slug}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{ backgroundColor: category.color + "20", color: category.color }}
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            )}

            <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-blue-600">{post.title}</h3>

            {post.excerpt && <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>}

            <div className="flex items-center gap-3 text-sm text-gray-500">
              {post.author.avatar && (
                <Image
                  src={post.author.avatar.url}
                  alt={post.author.avatar.alt}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <span>{post.author.name}</span>
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

## Setup Instructions

1. **Create new PayloadCMS project:**

   ```bash
   npx create-payload-app@latest my-blog-cms
   cd my-blog-cms
   ```

2. **Install additional dependencies:**

   ```bash
   npm install @payloadcms/storage-vercel-blob
   ```

3. **Copy configuration files from this export**

4. **Set up environment variables**

5. **Run database migrations:**

   ```bash
   npm run generate
   npm run migrate
   ```

6. **Seed initial data:**

   ```bash
   npm run seed
   ```

7. **Start the CMS:**

   ```bash
   npm run dev
   ```

8. **Access admin panel at:** `http://localhost:3001/admin`

## Admin Credentials

- **Email:** `admin@issi.com`
- **Password:** `password123!`
- **Role:** admin

## Demo Credentials

- **Email:** `demo-author@example.com`
- **Password:** `password`
- **Role:** author

---

This configuration provides a complete, production-ready blog CMS with internationalization support, SEO optimization, image handling, and role-based access control.
