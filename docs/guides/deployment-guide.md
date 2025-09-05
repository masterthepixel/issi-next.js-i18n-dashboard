# Deployment Guide 🚀

This guide covers how to deploy the ISSI Next.js i18n Dashboard to production environments.

## 📋 Deployment Options

### Recommended Platforms

| Platform        | Best For              | Setup Time | Cost                |
| --------------- | --------------------- | ---------- | ------------------- |
| **Vercel**      | Frontend + API routes | 5 minutes  | Free tier available |
| **Netlify**     | Static sites          | 10 minutes | Free tier available |
| **Railway**     | Full-stack apps       | 15 minutes | Paid                |
| **AWS Amplify** | Enterprise            | 30 minutes | Paid                |

### Architecture Considerations

- **Frontend**: Can be deployed to any static hosting
- **CMS Backend**: PayloadCMS needs separate deployment
- **Database**: Neon PostgreSQL (managed)
- **Media Storage**: Vercel Blob Storage (recommended)

## 🚀 Vercel Deployment (Recommended)

### Prerequisites

- Vercel account (free)
- GitHub repository connected to Vercel
- Environment variables configured

### Step 1: Connect Repository

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings

### Step 2: Configure Build Settings

```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "outputDirectory": ".next"
}
```

### Step 3: Environment Variables

Add these in Vercel dashboard:

```env
# Required for production
NEXT_PUBLIC_BASE_URL=https://your-app.vercel.app
NEXT_PUBLIC_SITE_URL=https://your-app.vercel.app
NODE_ENV=production

# CMS Integration (if using)
NEXT_PUBLIC_CMS_URL=https://your-cms-backend.vercel.app
CMS_API_URL=https://your-cms-backend.vercel.app/api
CMS_GRAPHQL_URL=https://your-cms-backend.vercel.app/api/graphql

# Database (if needed)
DATABASE_URL=your_production_database_url

# Media Storage
BLOB_READ_WRITE_TOKEN=your_vercel_blob_token
```

### Step 4: Deploy

```bash
# Push to main branch to trigger deployment
git add .
git commit -m "feat: prepare for production deployment"
git push origin main
```

### Step 5: Domain Configuration

1. Go to Vercel project settings
2. Add custom domain (optional)
3. Configure DNS records
4. Enable SSL (automatic)

## 🗄️ PayloadCMS Backend Deployment

### Separate Repository Setup

1. **Create new repository** for PayloadCMS backend
2. **Copy configuration** from `PAYLOADCMS_BLOG_EXPORT.md`
3. **Deploy to Vercel** with these settings:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "outputDirectory": "build"
}
```

### Environment Variables for CMS

```env
# PayloadCMS Configuration
PAYLOAD_SECRET=your_super_secret_key_here
PAYLOAD_CONFIG_PATH=payload.config.ts
PAYLOAD_PORT=3001

# Database
DATABASE_URL=your_production_postgres_url

# CORS Settings
PAYLOAD_PUBLIC_CMS_URL=https://your-cms-backend.vercel.app
```

## 🗃️ Database Setup

### Neon PostgreSQL (Recommended)

1. **Create account** at [neon.tech](https://neon.tech)
2. **Create new project**
3. **Get connection string**
4. **Add to environment variables**

### Production Database URL Format

```env
DATABASE_URL=postgresql://username:password@hostname/database?sslmode=require
```

## 📦 Media Storage Setup

### Vercel Blob Storage

1. **Enable Blob Storage** in Vercel dashboard
2. **Generate token**
3. **Add to environment variables**

```env
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 🔧 Build Optimization

### Next.js Configuration

```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    domains: ["your-cms-domain.vercel.app"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Internationalization
  i18n: {
    locales: ["en", "es", "fr"],
    defaultLocale: "en",
  },

  // Performance optimizations
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
```

### Package.json Optimizations

```json
{
  "scripts": {
    "build": "next build",
    "postbuild": "next-sitemap",
    "export": "next export"
  }
}
```

## 🌐 Domain & SSL Configuration

### Custom Domain Setup

1. **Purchase domain** from registrar
2. **Add to Vercel** project settings
3. **Configure DNS** records:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. **Enable SSL** (automatic with Vercel)

### Subdomain Strategy

```
www.yourapp.com     → Main application
cms.yourapp.com     → PayloadCMS admin
api.yourapp.com     → API routes (if needed)
```

## 🔍 Pre-Deployment Checklist

### Code Quality

- [ ] All tests pass: `pnpm test`
- [ ] No linting errors: `pnpm lint`
- [ ] Build succeeds: `pnpm build`
- [ ] TypeScript errors resolved

### Environment Configuration

- [ ] All required environment variables set
- [ ] Database connection tested
- [ ] CMS backend deployed and accessible
- [ ] Media storage configured

### Content & SEO

- [ ] Meta tags configured for all pages
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] Favicon and social media images set

### Performance

- [ ] Images optimized
- [ ] Bundle size checked
- [ ] Core Web Vitals tested
- [ ] Mobile responsiveness verified

## 🚨 Post-Deployment Tasks

### Immediate After Deployment

1. **Test all routes** in production
2. **Verify language switching** works
3. **Test CMS integration** if applicable
4. **Check media uploads** function
5. **Validate forms** and user interactions

### Monitoring Setup

1. **Enable Vercel Analytics**
2. **Set up error tracking** (Sentry recommended)
3. **Configure uptime monitoring**
4. **Set up log aggregation**

### Security Checklist

- [ ] Environment variables not exposed
- [ ] HTTPS enabled on all domains
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Security headers set

## 🐛 Troubleshooting Deployment Issues

### Common Issues

**Build Fails in Production**

```bash
# Check build logs in Vercel dashboard
# Common causes:
# - Missing environment variables
# - TypeScript errors
# - Missing dependencies
```

**CMS Connection Issues**

```bash
# Verify CMS backend is deployed
# Check CORS settings
# Validate API endpoints
```

**Database Connection Errors**

```bash
# Check DATABASE_URL format
# Verify SSL settings
# Test connection locally first
```

**Media Upload Issues**

```bash
# Check BLOB_READ_WRITE_TOKEN
# Verify storage permissions
# Test upload functionality
```

## 📊 Performance Monitoring

### Key Metrics to Monitor

- **Core Web Vitals** (Lighthouse scores)
- **Build time** and **bundle size**
- **API response times**
- **Error rates** and **uptime**

### Recommended Tools

- **Vercel Analytics**: Built-in performance monitoring
- **Sentry**: Error tracking and performance monitoring
- **Google Search Console**: SEO and indexing monitoring
- **GTmetrix/WebPageTest**: Performance testing

## 🔄 Deployment Automation

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "20"
      - run: npm ci
      - run: npm run build
      - run: npm run test
```

## 📞 Support & Rollback

### Emergency Rollback

```bash
# If deployment breaks production
git revert HEAD~1
git push origin main
```

### Support Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **PayloadCMS Deployment**: https://payloadcms.com/docs/production-deployment

---

**Last Updated**: September 2, 2025
**Tested Platforms**: Vercel, Netlify, Railway
