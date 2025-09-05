# Environment Variables Reference 🔧

This document provides a complete reference for all environment variables used in the ISSI Next.js i18n Dashboard project.

## 📋 Environment Files

### Development

- **`.env.local`**: Local development (highest priority)
- **`.env.development.local`**: Development environment specific
- **`.env`**: Default development values

### Production

- **`.env.production.local`**: Production overrides
- **`.env.production`**: Production defaults

### Testing

- **`.env.test.local`**: Test environment overrides
- **`.env.test`**: Test defaults

## 🔧 Core Application Variables

### Required Variables

| Variable               | Description          | Default                 | Example             |
| ---------------------- | -------------------- | ----------------------- | ------------------- |
| `NODE_ENV`             | Environment mode     | `development`           | `production`        |
| `NEXT_PUBLIC_BASE_URL` | Base application URL | `http://localhost:3000` | `https://myapp.com` |
| `NEXT_PUBLIC_SITE_URL` | Public site URL      | `http://localhost:3000` | `https://myapp.com` |

### Usage in Code

```typescript
// Access in components
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

// Access in API routes
const nodeEnv = process.env.NODE_ENV;
```

## 🌐 PayloadCMS Integration (Headless)

### Backend Connection

```env
# PayloadCMS Headless Backend URL
NEXT_PUBLIC_CMS_URL=http://localhost:3001

# API Endpoints
CMS_API_URL=http://localhost:3001/api
CMS_GRAPHQL_URL=http://localhost:3001/api/graphql
```

### Authentication (Optional)

```env
# PayloadCMS Admin Credentials (for development)
PAYLOAD_ADMIN_EMAIL=admin@issi.com
PAYLOAD_ADMIN_PASSWORD=password123!

# API Authentication
PAYLOAD_API_KEY=your_api_key_here
```

### Production CMS URLs

```env
# Production CMS Backend
NEXT_PUBLIC_CMS_URL=https://cms-myapp.vercel.app
CMS_API_URL=https://cms-myapp.vercel.app/api
CMS_GRAPHQL_URL=https://cms-myapp.vercel.app/api/graphql
```

## 🗄️ Database Configuration

### Neon PostgreSQL (Recommended)

```env
# Primary connection (with connection pooling)
DATABASE_URL=postgresql://username:password@host/database?sslmode=require

# Direct connection (without pooling)
DATABASE_URL_UNPOOLED=postgresql://username:password@host/database?sslmode=require

# Connection details
PGHOST=ep-small-host.us-east-1.aws.neon.tech
PGUSER=neondb_owner
PGDATABASE=neondb
PGPASSWORD=your_password_here
```

### Alternative Databases

```env
# PostgreSQL (self-hosted)
DATABASE_URL=postgresql://user:pass@localhost:5432/myapp

# MySQL
DATABASE_URL=mysql://user:pass@localhost:3306/myapp

# SQLite (development only)
DATABASE_URL=file:./dev.db
```

## 📦 Media Storage

### Vercel Blob Storage (Recommended)

```env
# Vercel Blob Token
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Alternative: AWS S3
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=myapp-media
AWS_REGION=us-east-1
```

### Local File Storage (Development)

```env
# Local media storage
PAYLOAD_PUBLIC_UPLOADS_DIR=public/uploads
PAYLOAD_UPLOADS_DIR=uploads
```

## 🔐 Authentication & Security

### Stack Auth (Recommended)

```env
# Stack Auth Configuration
NEXT_PUBLIC_STACK_PROJECT_ID=your_project_id
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=your_publishable_key
STACK_SECRET_SERVER_KEY=your_secret_key
```

### Alternative Auth Providers

```env
# Auth0
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_CLIENT_ID=your_client_id
AUTH0_CLIENT_SECRET=your_client_secret

# Clerk
CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxx
```

## 📊 Analytics & Monitoring

### Optional Variables

```env
# Sentry Error Tracking
SENTRY_DSN=https://your-dsn@sentry.io/project-id
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project
SENTRY_AUTH_TOKEN=your-auth-token

# Google Analytics
GA_TRACKING_ID=GA-XXXXXXXXXX
NEXT_PUBLIC_GA_TRACKING_ID=GA-XXXXXXXXXX

# Hotjar
HOTJAR_ID=your_hotjar_id
NEXT_PUBLIC_HOTJAR_ID=your_hotjar_id
```

## 🌐 Internationalization

### i18n Configuration

```env
# Default locale
NEXT_PUBLIC_DEFAULT_LOCALE=en

# Supported locales (comma-separated)
NEXT_PUBLIC_SUPPORTED_LOCALES=en,es,fr

# Locale detection
NEXT_PUBLIC_LOCALE_DETECTION=browser
```

## 🚀 Build & Development

### Build Configuration

```env
# Build optimization
NEXT_TELEMETRY_DISABLED=1
GENERATE_SOURCEMAP=false

# Development settings
NEXT_PUBLIC_DEBUG=true
NEXT_PUBLIC_DEV_TOOLS=true
```

### Performance Monitoring

```env
# Bundle analyzer
ANALYZE=true

# Performance budgets
NEXT_PUBLIC_PERFORMANCE_BUDGET=1000000
```

## 🔧 Development Tools

### Debug Configuration

```env
# Debug screens for responsive design
NEXT_PUBLIC_DEBUG_SCREENS=true

# Component debugging
NEXT_PUBLIC_DEBUG_COMPONENTS=true

# API debugging
NEXT_PUBLIC_DEBUG_API=true
```

### Development Servers

```env
# Custom ports
PORT=3000
CMS_PORT=3001

# HTTPS in development
HTTPS=true
SSL_CRT_FILE=path/to/cert.pem
SSL_KEY_FILE=path/to/key.pem
```

## 📱 Mobile & PWA

### Progressive Web App

```env
# PWA Configuration
NEXT_PUBLIC_PWA_ENABLED=true
PWA_SW_PATH=sw.js

# Mobile-specific
NEXT_PUBLIC_MOBILE_BREAKPOINT=768
NEXT_PUBLIC_TABLET_BREAKPOINT=1024
```

## 🔗 External Services

### CDN & Assets

```env
# CDN Configuration
NEXT_PUBLIC_CDN_URL=https://cdn.myapp.com
CDN_UPLOAD_KEY=your_upload_key

# Font loading
NEXT_PUBLIC_FONT_DISPLAY=swap
GOOGLE_FONTS_API_KEY=your_api_key
```

### Third-party APIs

```env
# Email service
EMAIL_API_KEY=your_email_api_key
EMAIL_FROM=noreply@myapp.com

# Payment processing
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxx

# Social media
TWITTER_API_KEY=your_twitter_key
FACEBOOK_APP_ID=your_facebook_app_id
```

## ⚙️ Advanced Configuration

### Caching & Performance

```env
# Redis (optional)
REDIS_URL=redis://localhost:6379
CACHE_TTL=3600

# CDN caching
CDN_CACHE_TTL=86400
CDN_PURGE_KEY=your_purge_key
```

### Feature Flags

```env
# Feature toggles
NEXT_PUBLIC_ENABLE_CMS=true
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_PWA=false
NEXT_PUBLIC_ENABLE_DEBUG=false
```

## 🔒 Security Settings

### Content Security Policy

```env
# CSP Configuration
CSP_DEFAULT_SRC=self
CSP_SCRIPT_SRC=self 'unsafe-inline'
CSP_STYLE_SRC=self 'unsafe-inline'
```

### Rate Limiting

```env
# API rate limits
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100
```

## 📋 Environment Setup Scripts

### Quick Setup (Development)

```bash
# Copy template
cp .env.example .env.local

# Edit with your values
code .env.local
```

### Production Setup

```bash
# Production environment
cp .env.example .env.production

# Override sensitive values
code .env.production.local
```

## 🚨 Critical Variables Checklist

### Must-Have for Development

- [ ] `NODE_ENV`
- [ ] `NEXT_PUBLIC_BASE_URL`
- [ ] `NEXT_PUBLIC_SITE_URL`

### Must-Have for CMS Integration

- [ ] `NEXT_PUBLIC_CMS_URL`
- [ ] `CMS_API_URL`
- [ ] `DATABASE_URL`

### Must-Have for Production

- [ ] All development variables
- [ ] `DATABASE_URL` (production)
- [ ] `BLOB_READ_WRITE_TOKEN` (if using media)
- [ ] Security-related variables

## 🐛 Troubleshooting

### Common Issues

**Variables not loading?**

- Ensure `.env.local` exists in project root
- Restart development server: `pnpm dev`
- Check variable names (no spaces, no quotes unless needed)

**Production variables not working?**

- Variables must be set in hosting platform (Vercel, etc.)
- Check variable casing and spelling
- Some variables need `NEXT_PUBLIC_` prefix for client access

**Database connection failing?**

- Verify `DATABASE_URL` format
- Check SSL settings: `?sslmode=require`
- Test connection with database client

---

**Last Updated**: September 2, 2025
**Note**: Keep sensitive values (passwords, API keys) out of version control. Use `.env.local` for local development and hosting platform environment variables for production.
