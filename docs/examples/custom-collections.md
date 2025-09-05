# Custom Collections Examples 🛠️

This document provides examples of custom PayloadCMS collections used in the ISSI Next.js i18n Dashboard, including advanced field configurations, hooks, and access control patterns.

## 📋 Collection Configuration

### Base Collection Structure

```typescript
// cms/collections/base-collection.ts
import { CollectionConfig } from "payload/types";

export interface BaseCollectionConfig extends Omit<CollectionConfig, "fields"> {
  fields: Field[];
}

export const baseCollectionDefaults: Partial<CollectionConfig> = {
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "updatedAt"],
  },
  versions: {
    drafts: true,
  },
  timestamps: true,
};
```

### Localized Collection Helper

```typescript
// cms/collections/localized-collection.ts
import { CollectionConfig, Field } from "payload/types";

export function createLocalizedCollection(config: CollectionConfig, localizedFields: Field[] = []): CollectionConfig {
  return {
    ...config,
    fields: [
      ...localizedFields.map((field) => ({
        ...field,
        localized: true,
      })),
      // Add non-localized fields here
    ],
  };
}
```

## 📰 Blog Posts Collection

### Posts Collection Configuration

```typescript
// cms/collections/Posts.ts
import { CollectionConfig } from "payload/types";
import { populatePublishedAt } from "../hooks/populatePublishedAt";
import { revalidatePost } from "../hooks/revalidatePost";

const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "categories", "publishedAt", "updatedAt"],
    group: "Content",
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
  access: {
    read: () => true, // Public read access
    create: ({ req: { user } }) => {
      return Boolean(user && ["admin", "editor", "author"].includes(user.role));
    },
    update: ({ req: { user }, id }) => {
      if (!user) return false;
      if (user.role === "admin") return true;

      // Authors can only update their own posts
      return {
        author: {
          equals: user.id,
        },
      };
    },
    delete: ({ req: { user } }) => {
      return Boolean(user && user.role === "admin");
    },
  },
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidatePost],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      admin: {
        description: "The main title of the blog post",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "URL-friendly version of the title",
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data.title) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "");
            }
            return value;
          },
        ],
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      localized: true,
      admin: {
        description: "Brief summary of the post (used in previews)",
        rows: 3,
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
      localized: true,
      admin: {
        description: "Main content of the blog post",
        elements: ["h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "ul", "ol", "link", "upload", "relationship"],
        leaves: ["bold", "italic", "underline", "strikethrough", "code"],
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
        { label: "Archived", value: "archived" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        description: "Publication date (auto-populated when status changes to published)",
        position: "sidebar",
        date: {
          pickerAppearance: "dayOnly",
        },
      },
      hooks: {
        beforeChange: [
          ({ value, siblingData }) => {
            if (siblingData.status === "published" && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      required: true,
      admin: {
        description: "Author of the post",
        position: "sidebar",
      },
      hooks: {
        beforeChange: [
          ({ value, req }) => {
            // Auto-populate author if not set
            if (!value && req.user) {
              return req.user.id;
            }
            return value;
          },
        ],
      },
    },
    {
      name: "categories",
      type: "relationship",
      relationTo: "categories",
      hasMany: true,
      admin: {
        description: "Categories this post belongs to",
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
        description: "Tags for better organization",
      },
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Hero image for the post",
        position: "sidebar",
      },
    },
    {
      name: "meta",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          localized: true,
          admin: {
            description: "SEO title (defaults to post title)",
          },
        },
        {
          name: "description",
          type: "textarea",
          localized: true,
          admin: {
            description: "SEO description",
            rows: 2,
          },
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          admin: {
            description: "Social media preview image",
          },
        },
      ],
    },
  ],
};

export default Posts;
```

## 📂 Categories Collection

### Categories with Color Coding

```typescript
// cms/collections/Categories.ts
import { CollectionConfig } from "payload/types";

const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "color", "status"],
    group: "Content",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      return Boolean(user && ["admin", "editor"].includes(user.role));
    },
    update: ({ req: { user } }) => {
      return Boolean(user && ["admin", "editor"].includes(user.role));
    },
    delete: ({ req: { user } }) => {
      return Boolean(user && user.role === "admin");
    },
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
      admin: {
        description: "Display name of the category",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "URL-friendly identifier",
        position: "sidebar",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data.name) {
              return data.name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "");
            }
            return value;
          },
        ],
      },
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
      admin: {
        description: "Brief description of the category",
        rows: 3,
      },
    },
    {
      name: "color",
      type: "text",
      required: true,
      defaultValue: "#3B82F6",
      admin: {
        description: "Hex color code for category styling",
        position: "sidebar",
      },
      validate: (value: string) => {
        if (!/^#[0-9A-F]{6}$/i.test(value)) {
          return "Please enter a valid hex color code (e.g., #3B82F6)";
        }
        return true;
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "active",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "parent",
      type: "relationship",
      relationTo: "categories",
      admin: {
        description: "Parent category (for hierarchical organization)",
        position: "sidebar",
      },
      filterOptions: ({ id }) => ({
        id: {
          not_equals: id,
        },
      }),
    },
  ],
};

export default Categories;
```

## 👥 Users Collection

### Extended Users with Roles

```typescript
// cms/collections/Users.ts
import { CollectionConfig } from "payload/types";

const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "firstName", "lastName", "role", "status"],
    group: "Admin",
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false;
      return {
        or: [
          {
            id: {
              equals: user.id,
            },
          },
          {
            role: {
              equals: "admin",
            },
          },
        ],
      };
    },
    create: ({ req: { user } }) => {
      return Boolean(user && user.role === "admin");
    },
    update: ({ req: { user }, id }) => {
      if (!user) return false;
      if (user.role === "admin") return true;

      // Users can only update themselves
      return {
        id: {
          equals: user.id,
        },
      };
    },
    delete: ({ req: { user } }) => {
      return Boolean(user && user.role === "admin");
    },
  },
  fields: [
    {
      name: "firstName",
      type: "text",
      required: true,
      admin: {
        description: "User's first name",
      },
    },
    {
      name: "lastName",
      type: "text",
      required: true,
      admin: {
        description: "User's last name",
      },
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "author",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "Author", value: "author" },
      ],
      access: {
        update: ({ req: { user } }) => {
          return Boolean(user && user.role === "admin");
        },
      },
      admin: {
        description: "User role and permissions level",
        position: "sidebar",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "active",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
        { label: "Suspended", value: "suspended" },
      ],
      admin: {
        description: "Account status",
        position: "sidebar",
      },
    },
    {
      name: "bio",
      type: "textarea",
      admin: {
        description: "Short biography for the user",
        rows: 4,
      },
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Profile picture",
        position: "sidebar",
      },
    },
    {
      name: "socialLinks",
      type: "array",
      fields: [
        {
          name: "platform",
          type: "select",
          required: true,
          options: [
            { label: "Twitter", value: "twitter" },
            { label: "LinkedIn", value: "linkedin" },
            { label: "GitHub", value: "github" },
            { label: "Website", value: "website" },
          ],
        },
        {
          name: "url",
          type: "text",
          required: true,
          validate: (value: string) => {
            try {
              new URL(value);
              return true;
            } catch {
              return "Please enter a valid URL";
            }
          },
        },
      ],
      admin: {
        description: "Social media and external links",
      },
    },
  ],
};

export default Users;
```

## 📄 Pages Collection

### Static Pages with SEO

```typescript
// cms/collections/Pages.ts
import { CollectionConfig } from "payload/types";
import { revalidatePage } from "../hooks/revalidatePage";

const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "status", "updatedAt"],
    group: "Content",
  },
  versions: {
    drafts: true,
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      return Boolean(user && ["admin", "editor"].includes(user.role));
    },
    update: ({ req: { user } }) => {
      return Boolean(user && ["admin", "editor"].includes(user.role));
    },
    delete: ({ req: { user } }) => {
      return Boolean(user && user.role === "admin");
    },
  },
  hooks: {
    afterChange: [revalidatePage],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
      admin: {
        description: "Page title",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "URL path for the page",
        position: "sidebar",
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
      localized: true,
      admin: {
        description: "Page content",
        elements: ["h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "ul", "ol", "link", "upload", "relationship"],
        leaves: ["bold", "italic", "underline", "strikethrough", "code"],
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
        { label: "Archived", value: "archived" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "template",
      type: "select",
      defaultValue: "default",
      options: [
        { label: "Default", value: "default" },
        { label: "Landing Page", value: "landing" },
        { label: "About Page", value: "about" },
        { label: "Contact Page", value: "contact" },
      ],
      admin: {
        description: "Page template/layout",
        position: "sidebar",
      },
    },
    {
      name: "hero",
      type: "group",
      fields: [
        {
          name: "showHero",
          type: "checkbox",
          defaultValue: true,
          admin: {
            description: "Display hero section",
          },
        },
        {
          name: "heroTitle",
          type: "text",
          localized: true,
          admin: {
            description: "Hero section title",
            condition: (_, siblingData) => siblingData?.showHero,
          },
        },
        {
          name: "heroSubtitle",
          type: "textarea",
          localized: true,
          admin: {
            description: "Hero section subtitle",
            condition: (_, siblingData) => siblingData?.showHero,
          },
        },
        {
          name: "heroImage",
          type: "upload",
          relationTo: "media",
          admin: {
            description: "Hero background image",
            condition: (_, siblingData) => siblingData?.showHero,
          },
        },
      ],
    },
    {
      name: "meta",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          localized: true,
          admin: {
            description: "SEO title",
          },
        },
        {
          name: "description",
          type: "textarea",
          localized: true,
          admin: {
            description: "SEO description",
            rows: 2,
          },
        },
        {
          name: "keywords",
          type: "text",
          localized: true,
          admin: {
            description: "SEO keywords (comma-separated)",
          },
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          admin: {
            description: "Social media preview image",
          },
        },
      ],
    },
  ],
};

export default Pages;
```

## 🖼️ Media Collection

### Enhanced Media with Metadata

```typescript
// cms/collections/Media.ts
import { CollectionConfig } from "payload/types";

const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticURL: "/media",
    staticDir: "media",
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 432,
        position: "centre",
      },
      {
        name: "hero",
        width: 1200,
        height: 600,
        position: "centre",
      },
    ],
    adminThumbnail: "thumbnail",
    mimeTypes: ["image/*", "application/pdf"],
  },
  admin: {
    defaultColumns: ["filename", "alt", "filesize", "width", "height", "updatedAt"],
    group: "Content",
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => {
      return Boolean(user && ["admin", "editor", "author"].includes(user.role));
    },
    update: ({ req: { user } }) => {
      return Boolean(user && ["admin", "editor"].includes(user.role));
    },
    delete: ({ req: { user } }) => {
      return Boolean(user && user.role === "admin");
    },
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      localized: true,
      admin: {
        description: "Alt text for accessibility",
      },
    },
    {
      name: "caption",
      type: "textarea",
      localized: true,
      admin: {
        description: "Optional caption for the image",
        rows: 2,
      },
    },
    {
      name: "credit",
      type: "text",
      admin: {
        description: "Photo credit or source",
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
        description: "Tags for organization",
      },
    },
  ],
};

export default Media;
```

## 🎯 Custom Hooks

### Populate Published At Hook

```typescript
// cms/hooks/populatePublishedAt.ts
import { FieldHook } from "payload/types";

export const populatePublishedAt: FieldHook = async ({ value, siblingData }) => {
  if (siblingData.status === "published" && !value) {
    return new Date();
  }

  return value;
};
```

### Revalidation Hooks

```typescript
// cms/hooks/revalidatePost.ts
import { AfterChangeHook } from "payload/types";
import { revalidateTag } from "next/cache";

export const revalidatePost: AfterChangeHook = async ({ doc, previousDoc, req: { payload } }) => {
  // Revalidate the post page
  revalidateTag(`post-${doc.slug}`);

  // Revalidate blog listing if status changed
  if (doc.status !== previousDoc?.status) {
    revalidateTag("blog-posts");
  }

  // Revalidate categories if they changed
  if (JSON.stringify(doc.categories) !== JSON.stringify(previousDoc?.categories)) {
    revalidateTag("categories");
  }
};
```

### Slug Generation Hook

```typescript
// cms/hooks/generateSlug.ts
import { FieldHook } from "payload/types";

export const generateSlug: FieldHook = async ({ value, data, originalDoc }) => {
  if (!value && data.title) {
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    // Ensure uniqueness
    let uniqueSlug = slug;
    let counter = 1;

    while (await checkSlugExists(uniqueSlug, originalDoc?.id)) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    return uniqueSlug;
  }

  return value;
};

async function checkSlugExists(slug: string, excludeId?: string): Promise<boolean> {
  // Implementation would check database for existing slug
  return false;
}
```

## 🔐 Access Control Patterns

### Role-Based Access Control

```typescript
// cms/access/roleAccess.ts
import { Access } from "payload/config";

export const adminOnly: Access = ({ req: { user } }) => {
  return Boolean(user && user.role === "admin");
};

export const editorOrAbove: Access = ({ req: { user } }) => {
  return Boolean(user && ["admin", "editor"].includes(user.role));
};

export const authorOrAbove: Access = ({ req: { user } }) => {
  return Boolean(user && ["admin", "editor", "author"].includes(user.role));
};

export const ownerOrAdmin: Access = ({ req: { user }, id }) => {
  if (!user) return false;
  if (user.role === "admin") return true;

  return {
    author: {
      equals: user.id,
    },
  };
};
```

### Field-Level Permissions

```typescript
// cms/fields/conditionalFields.ts
import { Field } from "payload/types";

export const adminOnlyField = (field: Field): Field => ({
  ...field,
  access: {
    read: ({ req: { user } }) => Boolean(user && user.role === "admin"),
    update: ({ req: { user } }) => Boolean(user && user.role === "admin"),
  },
});

export const editorOnlyField = (field: Field): Field => ({
  ...field,
  access: {
    read: ({ req: { user } }) => Boolean(user && ["admin", "editor"].includes(user.role)),
    update: ({ req: { user } }) => Boolean(user && ["admin", "editor"].includes(user.role)),
  },
});
```

---

**Last Updated**: September 2, 2025
**Examples**: Blog posts, Categories, Users, Pages, Media, Custom hooks, Access control, Field-level permissions
