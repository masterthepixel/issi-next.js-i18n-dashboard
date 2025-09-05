# Database Seeding Patterns 🗃️

This document provides examples of database seeding patterns used in the ISSI Next.js i18n Dashboard project, including PayloadCMS seed scripts and data migration strategies.

## 📋 Seed Script Structure

### Base Seed Configuration

```typescript
// cms/seed/config.ts
export interface SeedConfig {
  collections: {
    users: boolean;
    categories: boolean;
    posts: boolean;
    media: boolean;
    pages: boolean;
  };
  locales: string[];
  defaultLocale: string;
  batchSize: number;
  dryRun: boolean;
}

export const defaultSeedConfig: SeedConfig = {
  collections: {
    users: true,
    categories: true,
    posts: true,
    media: true,
    pages: true,
  },
  locales: ["en", "es", "fr"],
  defaultLocale: "en",
  batchSize: 10,
  dryRun: false,
};
```

### Seed Runner

```typescript
// cms/seed/index.ts
import { Payload } from "payload";
import { defaultSeedConfig, SeedConfig } from "./config";
import { seedUsers } from "./users";
import { seedCategories } from "./categories";
import { seedPosts } from "./posts";
import { seedMedia } from "./media";
import { seedPages } from "./pages";

export async function seedDatabase(payload: Payload, config: Partial<SeedConfig> = {}) {
  const finalConfig = { ...defaultSeedConfig, ...config };

  console.log("🌱 Starting database seeding...");
  console.log("Configuration:", finalConfig);

  if (finalConfig.dryRun) {
    console.log("🔍 Running in dry-run mode - no data will be created");
  }

  try {
    // Seed in dependency order
    if (finalConfig.collections.users) {
      await seedUsers(payload, finalConfig);
    }

    if (finalConfig.collections.categories) {
      await seedCategories(payload, finalConfig);
    }

    if (finalConfig.collections.media) {
      await seedMedia(payload, finalConfig);
    }

    if (finalConfig.collections.posts) {
      await seedPosts(payload, finalConfig);
    }

    if (finalConfig.collections.pages) {
      await seedPages(payload, finalConfig);
    }

    console.log("✅ Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Database seeding failed:", error);
    throw error;
  }
}
```

## 👥 User Seeding

### User Seed Data

```typescript
// cms/seed/data/users.ts
export const userData = [
  {
    email: "admin@issi.com",
    password: process.env.ADMIN_PASSWORD || "admin123",
    firstName: "ISSI",
    lastName: "Admin",
    roles: ["admin"],
    status: "active",
  },
  {
    email: "editor@issi.com",
    password: process.env.EDITOR_PASSWORD || "editor123",
    firstName: "Content",
    lastName: "Editor",
    roles: ["editor"],
    status: "active",
  },
  {
    email: "author@issi.com",
    password: process.env.AUTHOR_PASSWORD || "author123",
    firstName: "Blog",
    lastName: "Author",
    roles: ["author"],
    status: "active",
  },
];
```

### User Seeding Implementation

```typescript
// cms/seed/users.ts
import { Payload } from "payload";
import { SeedConfig } from "./config";
import { userData } from "./data/users";

export async function seedUsers(payload: Payload, config: SeedConfig) {
  console.log("👤 Seeding users...");

  const results = [];

  for (const user of userData) {
    try {
      if (config.dryRun) {
        console.log(`🔍 Would create user: ${user.email}`);
        continue;
      }

      const existingUser = await payload.find({
        collection: "users",
        where: {
          email: {
            equals: user.email,
          },
        },
      });

      if (existingUser.docs.length > 0) {
        console.log(`⚠️  User ${user.email} already exists, skipping...`);
        continue;
      }

      const createdUser = await payload.create({
        collection: "users",
        data: {
          ...user,
          password: await payload.hashPassword(user.password),
        },
      });

      results.push(createdUser);
      console.log(`✅ Created user: ${user.email}`);
    } catch (error) {
      console.error(`❌ Failed to create user ${user.email}:`, error);
    }
  }

  return results;
}
```

## 📂 Categories Seeding

### Categories Data with Localization

```typescript
// cms/seed/data/categories.ts
export const categoryData = [
  {
    name: {
      en: "Technology",
      es: "Tecnología",
      fr: "Technologie",
    },
    slug: "technology",
    description: {
      en: "Latest technology news and insights",
      es: "Últimas noticias e información tecnológica",
      fr: "Dernières nouvelles et insights technologiques",
    },
    color: "#3B82F6",
    status: "active",
  },
  {
    name: {
      en: "Business",
      es: "Negocios",
      fr: "Affaires",
    },
    slug: "business",
    description: {
      en: "Business strategies and market analysis",
      es: "Estrategias empresariales y análisis de mercado",
      fr: "Stratégies d'affaires et analyse de marché",
    },
    color: "#10B981",
    status: "active",
  },
  {
    name: {
      en: "Design",
      es: "Diseño",
      fr: "Design",
    },
    slug: "design",
    description: {
      en: "UI/UX design trends and best practices",
      es: "Tendencias y mejores prácticas de diseño UI/UX",
      fr: "Tendances et meilleures pratiques de design UI/UX",
    },
    color: "#F59E0B",
    status: "active",
  },
];
```

### Categories Seeding with Localization

```typescript
// cms/seed/categories.ts
import { Payload } from "payload";
import { SeedConfig } from "./config";
import { categoryData } from "./data/categories";

export async function seedCategories(payload: Payload, config: SeedConfig) {
  console.log("📂 Seeding categories...");

  const results = [];

  for (const category of categoryData) {
    try {
      if (config.dryRun) {
        console.log(`🔍 Would create category: ${category.slug}`);
        continue;
      }

      // Create category for each locale
      for (const locale of config.locales) {
        const localizedData = {
          name: category.name[locale] || category.name[config.defaultLocale],
          slug: category.slug,
          description: category.description[locale] || category.description[config.defaultLocale],
          color: category.color,
          status: category.status,
        };

        const existingCategory = await payload.find({
          collection: "categories",
          where: {
            slug: {
              equals: category.slug,
            },
          },
          locale,
        });

        if (existingCategory.docs.length > 0) {
          console.log(`⚠️  Category ${category.slug} (${locale}) already exists, skipping...`);
          continue;
        }

        const createdCategory = await payload.create({
          collection: "categories",
          data: localizedData,
          locale,
        });

        results.push(createdCategory);
        console.log(`✅ Created category: ${category.slug} (${locale})`);
      }
    } catch (error) {
      console.error(`❌ Failed to create category ${category.slug}:`, error);
    }
  }

  return results;
}
```

## 📝 Posts Seeding

### Posts Data with Rich Content

```typescript
// cms/seed/data/posts.ts
export const postData = [
  {
    title: {
      en: "Welcome to ISSI Dashboard",
      es: "Bienvenido al Panel de ISSI",
      fr: "Bienvenue sur le Tableau de Bord ISSI",
    },
    slug: "welcome-to-issi-dashboard",
    excerpt: {
      en: "Discover the powerful features of our internationalized dashboard",
      es: "Descubre las poderosas características de nuestro panel internacionalizado",
      fr: "Découvrez les puissantes fonctionnalités de notre tableau de bord internationalisé",
    },
    content: {
      en: `
        <h2>Getting Started</h2>
        <p>Welcome to the ISSI Next.js i18n Dashboard! This powerful platform combines modern web technologies with comprehensive internationalization support.</p>

        <h3>Key Features</h3>
        <ul>
          <li>Multi-language support (English, Spanish, French)</li>
          <li>Modern React 19 with Next.js 15</li>
          <li>PayloadCMS headless architecture</li>
          <li>Real-time content management</li>
        </ul>

        <p>Explore the dashboard and discover how easy it is to manage content across multiple languages.</p>
      `,
      es: `
        <h2>Primeros Pasos</h2>
        <p>¡Bienvenido al Panel de ISSI Next.js i18n! Esta poderosa plataforma combina tecnologías web modernas con soporte integral de internacionalización.</p>

        <h3>Características Principales</h3>
        <ul>
          <li>Soporte multiidioma (Inglés, Español, Francés)</li>
          <li>React 19 moderno con Next.js 15</li>
          <li>Arquitectura headless PayloadCMS</li>
          <li>Gestión de contenido en tiempo real</li>
        </ul>

        <p>Explora el panel y descubre lo fácil que es gestionar contenido en múltiples idiomas.</p>
      `,
      fr: `
        <h2>Premiers Pas</h2>
        <p>Bienvenue sur le Tableau de Bord ISSI Next.js i18n ! Cette plateforme puissante combine les technologies web modernes avec un support complet d'internationalisation.</p>

        <h3>Fonctionnalités Clés</h3>
        <ul>
          <li>Support multi-langues (Anglais, Espagnol, Français)</li>
          <li>React 19 moderne avec Next.js 15</li>
          <li>Architecture headless PayloadCMS</li>
          <li>Gestion de contenu en temps réel</li>
        </ul>

        <p>Explorez le tableau de bord et découvrez à quel point il est facile de gérer le contenu dans plusieurs langues.</p>
      `,
    },
    status: "published",
    publishedAt: new Date().toISOString(),
    author: "admin@issi.com", // Will be resolved to user ID
    categories: ["technology"], // Will be resolved to category IDs
    featuredImage: null,
    meta: {
      title: {
        en: "Welcome to ISSI Dashboard",
        es: "Bienvenido al Panel de ISSI",
        fr: "Bienvenue sur le Tableau de Bord ISSI",
      },
      description: {
        en: "Discover the powerful features of our internationalized dashboard",
        es: "Descubre las poderosas características de nuestro panel internacionalizado",
        fr: "Découvrez les puissantes fonctionnalités de notre tableau de bord internationalisé",
      },
    },
  },
];
```

### Posts Seeding with Relationships

```typescript
// cms/seed/posts.ts
import { Payload } from "payload";
import { SeedConfig } from "./config";
import { postData } from "./data/posts";

export async function seedPosts(payload: Payload, config: SeedConfig) {
  console.log("📝 Seeding posts...");

  const results = [];

  // Get admin user for authorship
  const adminUser = await payload.find({
    collection: "users",
    where: {
      email: {
        equals: "admin@issi.com",
      },
    },
  });

  if (adminUser.docs.length === 0) {
    throw new Error("Admin user not found. Please seed users first.");
  }

  const authorId = adminUser.docs[0].id;

  for (const post of postData) {
    try {
      if (config.dryRun) {
        console.log(`🔍 Would create post: ${post.slug}`);
        continue;
      }

      // Resolve category relationships
      const categoryIds = [];
      for (const categorySlug of post.categories) {
        const category = await payload.find({
          collection: "categories",
          where: {
            slug: {
              equals: categorySlug,
            },
          },
        });

        if (category.docs.length > 0) {
          categoryIds.push(category.docs[0].id);
        }
      }

      // Create post for each locale
      for (const locale of config.locales) {
        const localizedData = {
          title: post.title[locale] || post.title[config.defaultLocale],
          slug: post.slug,
          excerpt: post.excerpt[locale] || post.excerpt[config.defaultLocale],
          content: post.content[locale] || post.content[config.defaultLocale],
          status: post.status,
          publishedAt: post.publishedAt,
          author: authorId,
          categories: categoryIds,
          featuredImage: post.featuredImage,
          meta: {
            title: post.meta.title[locale] || post.meta.title[config.defaultLocale],
            description: post.meta.description[locale] || post.meta.description[config.defaultLocale],
          },
        };

        const existingPost = await payload.find({
          collection: "posts",
          where: {
            slug: {
              equals: post.slug,
            },
          },
          locale,
        });

        if (existingPost.docs.length > 0) {
          console.log(`⚠️  Post ${post.slug} (${locale}) already exists, skipping...`);
          continue;
        }

        const createdPost = await payload.create({
          collection: "posts",
          data: localizedData,
          locale,
        });

        results.push(createdPost);
        console.log(`✅ Created post: ${post.slug} (${locale})`);
      }
    } catch (error) {
      console.error(`❌ Failed to create post ${post.slug}:`, error);
    }
  }

  return results;
}
```

## 🖼️ Media Seeding

### Media Upload Helper

```typescript
// cms/seed/media.ts
import { Payload } from "payload";
import { SeedConfig } from "./config";
import fs from "fs";
import path from "path";

export async function seedMedia(payload: Payload, config: SeedConfig) {
  console.log("🖼️ Seeding media...");

  const results = [];
  const mediaDir = path.join(process.cwd(), "cms", "seed", "assets");

  // Sample images to seed
  const sampleImages = [
    {
      filename: "hero-image.jpg",
      alt: "Hero image for ISSI Dashboard",
    },
    {
      filename: "logo.png",
      alt: "ISSI Logo",
    },
  ];

  for (const image of sampleImages) {
    try {
      if (config.dryRun) {
        console.log(`🔍 Would upload media: ${image.filename}`);
        continue;
      }

      const filePath = path.join(mediaDir, image.filename);

      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Media file ${image.filename} not found, skipping...`);
        continue;
      }

      const fileBuffer = fs.readFileSync(filePath);
      const file = new File([fileBuffer], image.filename, {
        type: getMimeType(image.filename),
      });

      const existingMedia = await payload.find({
        collection: "media",
        where: {
          filename: {
            equals: image.filename,
          },
        },
      });

      if (existingMedia.docs.length > 0) {
        console.log(`⚠️  Media ${image.filename} already exists, skipping...`);
        continue;
      }

      const createdMedia = await payload.create({
        collection: "media",
        data: {
          alt: image.alt,
        },
        file,
      });

      results.push(createdMedia);
      console.log(`✅ Uploaded media: ${image.filename}`);
    } catch (error) {
      console.error(`❌ Failed to upload media ${image.filename}:`, error);
    }
  }

  return results;
}

function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  const mimeTypes: Record<string, string> = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
  };

  return mimeTypes[ext] || "application/octet-stream";
}
```

## 📄 Pages Seeding

### Static Pages Data

```typescript
// cms/seed/data/pages.ts
export const pageData = [
  {
    title: {
      en: 'About Us',
      es: 'Sobre Nosotros',
      fr: 'À Propos',
    },
    slug: 'about',
    content: {
      en: `
        <h1>About ISSI</h1>
        <p>ISSI is a leading provider of internationalized web solutions...</p>
      `,
      es: `
        <h1>Sobre ISSI</h1>
        <p>ISSI es un proveedor líder de soluciones web internacionalizadas...</p>
      `,
      fr: `
        <h1>À Propos d'ISSI</h1>
        <p>ISSI est un fournisseur leader de solutions web internationalisées...</p>
      `,
    },
    status: 'published',
    publishedAt: new Date().toISOString(),
    meta: {
      title: {
        en: 'About ISSI',
        es: 'Sobre ISSI',
        fr: 'À Propos d'ISSI',
      },
      description: {
        en: 'Learn more about ISSI and our mission',
        es: 'Conoce más sobre ISSI y nuestra misión',
        fr: 'En savoir plus sur ISSI et notre mission',
      },
    },
  },
]
```

## 🚀 CLI Runner

### Command Line Interface

```typescript
// cms/seed/cli.ts
#!/usr/bin/env node

import { program } from 'commander'
import { seedDatabase } from './index'
import { defaultSeedConfig } from './config'
import payload from '../payload'

program
  .name('seed')
  .description('Seed the ISSI database with sample data')
  .version('1.0.0')

program
  .command('run')
  .description('Run the database seeding process')
  .option('--dry-run', 'Run in dry-run mode (no data will be created)')
  .option('--users-only', 'Only seed users collection')
  .option('--categories-only', 'Only seed categories collection')
  .option('--posts-only', 'Only seed posts collection')
  .option('--media-only', 'Only seed media collection')
  .option('--pages-only', 'Only seed pages collection')
  .option('--batch-size <size>', 'Batch size for operations', parseInt)
  .action(async (options) => {
    try {
      const config = {
        ...defaultSeedConfig,
        dryRun: options.dryRun || false,
        batchSize: options.batchSize || defaultSeedConfig.batchSize,
        collections: {
          users: options.usersOnly || !options.categoriesOnly && !options.postsOnly && !options.mediaOnly && !options.pagesOnly,
          categories: options.categoriesOnly || !options.usersOnly && !options.postsOnly && !options.mediaOnly && !options.pagesOnly,
          posts: options.postsOnly || !options.usersOnly && !options.categoriesOnly && !options.mediaOnly && !options.pagesOnly,
          media: options.mediaOnly || !options.usersOnly && !options.categoriesOnly && !options.postsOnly && !options.pagesOnly,
          pages: options.pagesOnly || !options.usersOnly && !options.categoriesOnly && !options.postsOnly && !options.mediaOnly,
        },
      }

      await payload.init()
      await seedDatabase(payload, config)
      await payload.destroy()

      console.log('🎉 Seeding completed successfully!')
    } catch (error) {
      console.error('💥 Seeding failed:', error)
      process.exit(1)
    }
  })

program.parse()
```

### Package.json Script

```json
{
  "scripts": {
    "seed": "tsx cms/seed/cli.ts run",
    "seed:dry": "tsx cms/seed/cli.ts run --dry-run",
    "seed:users": "tsx cms/seed/cli.ts run --users-only",
    "seed:categories": "tsx cms/seed/cli.ts run --categories-only",
    "seed:posts": "tsx cms/seed/cli.ts run --posts-only"
  }
}
```

## 🔄 Migration Patterns

### Data Migration Helper

```typescript
// cms/migrations/migrate-posts.ts
import { Payload } from "payload";

export async function migratePosts(payload: Payload) {
  console.log("🔄 Migrating posts data...");

  // Example: Add new field to existing posts
  const posts = await payload.find({
    collection: "posts",
    limit: 1000,
  });

  for (const post of posts.docs) {
    try {
      await payload.update({
        collection: "posts",
        id: post.id,
        data: {
          // Add new fields or transform existing data
          migratedAt: new Date().toISOString(),
          // Transform old field to new format
          // oldField: post.oldField -> newField: transform(post.oldField)
        },
      });

      console.log(`✅ Migrated post: ${post.title}`);
    } catch (error) {
      console.error(`❌ Failed to migrate post ${post.id}:`, error);
    }
  }
}
```

### Version-Based Migration Runner

```typescript
// cms/migrations/index.ts
import { Payload } from "payload";
import { migratePosts } from "./migrate-posts";

const MIGRATIONS = [
  {
    version: "1.1.0",
    description: "Add migratedAt field to posts",
    up: migratePosts,
  },
];

export async function runMigrations(payload: Payload) {
  console.log("🚀 Running database migrations...");

  for (const migration of MIGRATIONS) {
    try {
      console.log(`📦 Running migration ${migration.version}: ${migration.description}`);
      await migration.up(payload);
      console.log(`✅ Migration ${migration.version} completed`);
    } catch (error) {
      console.error(`❌ Migration ${migration.version} failed:`, error);
      throw error;
    }
  }

  console.log("🎉 All migrations completed successfully!");
}
```

## 🧪 Testing Seed Data

### Seed Test Helper

```typescript
// __tests__/seed.test.ts
import { seedDatabase } from "../cms/seed";
import payload from "../cms/payload";

describe("Database Seeding", () => {
  beforeEach(async () => {
    // Clear test database
    await payload.init();
  });

  afterEach(async () => {
    await payload.destroy();
  });

  it("should seed users successfully", async () => {
    const config = {
      collections: {
        users: true,
        categories: false,
        posts: false,
        media: false,
        pages: false,
      },
      dryRun: false,
    };

    await seedDatabase(payload, config);

    const users = await payload.find({ collection: "users" });
    expect(users.docs.length).toBeGreaterThan(0);
  });

  it("should handle dry run mode", async () => {
    const config = {
      collections: {
        users: true,
        categories: false,
        posts: false,
        media: false,
        pages: false,
      },
      dryRun: true,
    };

    await seedDatabase(payload, config);

    const users = await payload.find({ collection: "users" });
    expect(users.docs.length).toBe(0);
  });
});
```

---

**Last Updated**: September 2, 2025
**Examples**: User seeding, Categories with i18n, Posts with relationships, Media uploads, CLI interface, Migrations, Testing
