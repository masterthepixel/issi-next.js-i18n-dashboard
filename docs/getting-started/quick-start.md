# Quick Start Guide ⚡

Get the ISSI Next.js i18n Dashboard running in under 5 minutes. This guide is for experienced developers who want to skip the details and get coding immediately.

## 🚀 One-Command Setup

```bash
# Clone, install, and start in one go
git clone https://github.com/masterthepixel/issi-next.js-i18n-dashboard.git && \
cd issi-next.js-i18n-dashboard && \
pnpm install && \
cp .env.example .env.local && \
pnpm dev
```

That's it! Visit `http://localhost:3000` 🎉

## 📋 Prerequisites Check

Make sure you have these installed:

- ✅ **Node.js 18+** (`node --version`)
- ✅ **pnpm** (`pnpm --version`)
- ✅ **Git** (`git --version`)

If any are missing, see **[Local Development Setup](./local-development.md)** for installation instructions.

## 🏃‍♂️ Development Workflow

### Start Development

```bash
pnpm dev
```

### Available Ports

- **Frontend**: `http://localhost:3000`
- **PayloadCMS Admin** (if running): `http://localhost:3001/admin`

### Key Scripts

```bash
pnpm dev          # Development server
pnpm build        # Production build
pnpm lint         # Code linting
pnpm test         # Run tests
```

## 🔧 Environment Setup

### Minimal Configuration

For basic development, you only need:

```env
# .env.local
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
```

### Full Configuration

For CMS integration, uncomment these in `.env.local`:

```env
# PayloadCMS Headless Backend
NEXT_PUBLIC_CMS_URL=http://localhost:3001
CMS_API_URL=http://localhost:3001/api
CMS_GRAPHQL_URL=http://localhost:3001/api/graphql
```

## 🧪 Testing Your Setup

### Quick Tests

1. **Homepage loads**: `http://localhost:3000`
2. **Language routes work**: `/en`, `/es`, `/fr`
3. **No console errors**: Check browser dev tools
4. **Responsive design**: Test on mobile/desktop

### Advanced Tests

```bash
# Run all tests
pnpm test

# Check for linting issues
pnpm lint

# Build for production
pnpm build
```

## 🐛 Common Issues & Fixes

| Issue              | Quick Fix                                   |
| ------------------ | ------------------------------------------- |
| Port 3000 in use   | `npx kill-port 3000 && pnpm dev`            |
| Dependencies fail  | `rm -rf node_modules && pnpm install`       |
| Build errors       | `rm -rf .next && pnpm dev`                  |
| CMS not connecting | Check if PayloadCMS is running on port 3001 |

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── (payload)/       # CMS-related routes
│   ├── [locale]/        # Internationalized routes
│   └── globals.css      # Global styles
├── components/          # Reusable components
│   ├── ui/             # shadcn/ui components
│   └── icons/          # Icon components
├── lib/                # Utilities and configurations
└── lang/               # i18n translation files
```

## 🎯 What to Explore First

### For Frontend Developers

1. **Components**: `src/components/` - shadcn/ui patterns
2. **Pages**: `src/app/[locale]/` - Internationalized routes
3. **Styling**: `tailwind.config.ts` - Design system

### For Full-Stack Developers

1. **API Routes**: `src/app/api/` - Backend endpoints
2. **CMS Integration**: Check `PAYLOADCMS_BLOG_EXPORT.md`
3. **Database**: Environment variables for Neon PostgreSQL

## 🔗 Essential Links

- **[Full Setup Guide](./local-development.md)** - Detailed instructions
- **[Troubleshooting](../guides/troubleshooting.md)** - Solutions to problems
- **[API Docs](../reference/api-documentation.md)** - Integration details
- **[Component Guide](../COMPONENT_DEVELOPMENT_GUIDE.md)** - Development patterns

## ⚡ Pro Tips

- **Auto-reload**: Changes hot-reload automatically
- **TypeScript**: Full type safety with IntelliSense
- **Debug screens**: Use `?debug=screens` for responsive testing
- **Environment**: Keep `.env.local` variables commented unless needed
- **Commits**: Commit every 30 minutes during active development

---

**Need more details?** See **[Local Development Setup](./local-development.md)**

**Last Updated**: September 2, 2025
