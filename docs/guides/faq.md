# Frequently Asked Questions 🤔

This FAQ covers common questions and issues encountered when working with the ISSI Next.js i18n Dashboard project.

## 🚀 Getting Started

### Q: What's the quickest way to get the project running?

**A:** For experienced developers:

```bash
git clone https://github.com/masterthepixel/issi-next.js-i18n-dashboard.git
cd issi-next.js-i18n-dashboard
pnpm install
cp .env.example .env.local
pnpm dev
```

Visit `http://localhost:3000` - that's it!

### Q: I'm new to this project. Where should I start?

**A:** Follow this learning path:

1. **[First Time Setup](../getting-started/first-time-setup.md)** - Complete setup guide
2. **[Local Development](../getting-started/local-development.md)** - Detailed development setup
3. **[Component Development Guide](../COMPONENT_DEVELOPMENT_GUIDE.md)** - How to build components
4. **[Troubleshooting](troubleshooting.md)** - Solutions to common problems

### Q: What are the system requirements?

**A:**

- **Node.js**: 18.0.0 or higher (20.x LTS recommended)
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 2GB free space
- **OS**: Windows 10+, macOS 10.15+, or Linux

## 🛠️ Development Issues

### Q: I'm getting "Module not found" errors. What should I do?

**A:** This usually means dependency issues. Try:

```bash
# Clear everything and reinstall
rm -rf node_modules .next package-lock.json
pnpm install
pnpm dev
```

### Q: Port 3000 is already in use. How do I fix this?

**A:** Kill the process using the port:

```bash
# Windows
npx kill-port 3000

# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Then restart
pnpm dev
```

Or use a different port:

```bash
pnpm dev --port 3001
```

### Q: The app starts but shows a blank page. What's wrong?

**A:** Check these common causes:

1. **Build errors**: Check terminal for TypeScript errors
2. **Environment variables**: Ensure `.env.local` exists and has correct values
3. **Browser cache**: Hard refresh (Ctrl+F5) or clear cache
4. **Console errors**: Check browser developer tools for JavaScript errors

### Q: I'm getting React version conflicts. How do I fix this?

**A:** The project uses React 19. Ensure all React-related packages match:

```bash
# Check versions
pnpm list react react-dom @types/react

# Update if needed
pnpm add react@19.0.0 react-dom@19.0.0 @types/react@19.0.13 @types/react-dom@19.0.2
```

## 🌐 Internationalization (i18n)

### Q: How does the multi-language system work?

**A:** The project supports English (EN), Spanish (ES), and French (FR):

- **URLs**: `/en/`, `/es/`, `/fr/` routes
- **Translations**: Stored in `src/lang/` directory
- **Components**: Use translation keys instead of hardcoded text
- **Switching**: Language selector in the UI

### Q: How do I add new text content?

**A:** For new text content:

1. Add translation keys to all language files:
   - `src/lang/en.json`
   - `src/lang/es.json`
   - `src/lang/fr.json`
2. Use the keys in your components
3. Test all three languages

### Q: Language switching isn't working. What could be wrong?

**A:** Check these:

1. **Translation files**: Ensure all keys exist in all language files
2. **Component usage**: Use proper translation hooks/functions
3. **URL structure**: Language should be in the URL path
4. **Browser cache**: Clear cache and try again

## 🎨 UI & Styling

### Q: How do I add new components?

**A:** Follow the established patterns:

1. Create component in `src/components/`
2. Use TypeScript with proper typing
3. Follow shadcn/ui patterns for consistency
4. Add to BentoGrid layout if needed
5. Test responsiveness across devices

### Q: The styling looks different on mobile. How do I fix this?

**A:** The project uses responsive design:

1. **Tailwind CSS**: Use responsive classes (`sm:`, `md:`, `lg:`)
2. **Debug screens**: Add `?debug=screens` to URL for breakpoint testing
3. **Mobile-first**: Design for mobile, then enhance for larger screens
4. **Test devices**: Use browser dev tools device emulation

### Q: How do I customize the color scheme?

**A:** The project uses Tailwind CSS:

1. **Colors**: Modify `tailwind.config.ts`
2. **CSS variables**: Update CSS custom properties
3. **shadcn/ui**: Follow the design system
4. **Consistency**: Test changes across all components

## 🔧 Technical Questions

### Q: What's the difference between embedded and headless PayloadCMS?

**A:**

- **Embedded**: CMS runs inside Next.js (causes conflicts with React 19)
- **Headless**: CMS runs separately (recommended for this project)
- **Current setup**: Uses headless architecture at `localhost:3001`

### Q: How do I connect to the CMS backend?

**A:** For headless CMS integration:

```env
# In .env.local
NEXT_PUBLIC_CMS_URL=http://localhost:3001
CMS_API_URL=http://localhost:3001/api
CMS_GRAPHQL_URL=http://localhost:3001/api/graphql
```

### Q: I'm getting database connection errors. What should I do?

**A:** For Neon PostgreSQL:

1. **Check connection string** in `.env.local`
2. **Verify SSL settings**: `?sslmode=require`
3. **Test connection** with a database client
4. **Check firewall** and network settings

### Q: How do I add new API routes?

**A:** Add to `src/app/api/` directory:

```
src/app/api/
├── your-endpoint/
│   └── route.ts
```

Use Next.js 15 App Router patterns with proper TypeScript typing.

## 🚀 Deployment

### Q: What's the easiest way to deploy this project?

**A:** Vercel is recommended:

1. Connect GitHub repository to Vercel
2. Auto-detects Next.js settings
3. Add environment variables
4. Deploy automatically on git push

### Q: How do I deploy the CMS backend separately?

**A:** Create separate repository:

1. Copy PayloadCMS config from `PAYLOADCMS_BLOG_EXPORT.md`
2. Deploy to Vercel with different port
3. Update frontend environment variables
4. Configure CORS for cross-origin requests

### Q: My deployment is failing. What could be wrong?

**A:** Common deployment issues:

1. **Environment variables**: Missing or incorrect in production
2. **Build errors**: Check build logs for TypeScript errors
3. **Dependencies**: Some packages may not work in production
4. **Database**: Production database not accessible

## 📊 Performance

### Q: How do I optimize the build size?

**A:** Several optimization techniques:

1. **Code splitting**: Use dynamic imports
2. **Image optimization**: Use Next.js Image component
3. **Bundle analysis**: Check bundle size with `pnpm build --analyze`
4. **Tree shaking**: Remove unused code

### Q: The app feels slow. How can I improve performance?

**A:** Performance optimizations:

1. **Images**: Optimize with Next.js Image component
2. **Caching**: Implement proper caching strategies
3. **Bundle size**: Reduce JavaScript bundle size
4. **Database queries**: Optimize API calls
5. **CDN**: Use CDN for static assets

## 🐛 Debugging

### Q: How do I debug the 3D globe component?

**A:** For Three.js/React Three Fiber issues:

1. **Browser console**: Check for WebGL errors
2. **React DevTools**: Inspect component tree
3. **Network tab**: Check asset loading
4. **Performance tab**: Monitor frame rates

### Q: I'm getting hydration errors. What causes this?

**A:** Hydration mismatches occur when:

1. **Server and client render differently**
2. **Dynamic content** loads after initial render
3. **Environment differences** between server and client
4. **Timing issues** with data fetching

### Q: How do I debug i18n issues?

**A:** For translation problems:

1. **Check translation files** for missing keys
2. **Browser network tab** for failed translation loads
3. **Console logs** for translation hook errors
4. **URL structure** for correct language routing

## 🤝 Contributing

### Q: How do I contribute to the project?

**A:** Contribution process:

1. **Fork** the repository
2. **Create feature branch**: `git checkout -b feature/your-feature`
3. **Make changes** following project patterns
4. **Test thoroughly** across all languages
5. **Create pull request** with description

### Q: What are the coding standards?

**A:** Follow these standards:

1. **TypeScript**: Strict typing required
2. **ESLint**: No linting errors allowed
3. **Prettier**: Consistent code formatting
4. **Component patterns**: Follow shadcn/ui conventions
5. **Git commits**: Meaningful commit messages

### Q: How do I report a bug?

**A:** When reporting bugs:

1. **Clear description** of the issue
2. **Steps to reproduce** the problem
3. **Expected vs actual behavior**
4. **Browser and OS information**
5. **Screenshots** if applicable

## 📚 Additional Resources

### Documentation

- **[Local Development Setup](../getting-started/local-development.md)**
- **[Troubleshooting Guide](troubleshooting.md)**
- **[Component Development Guide](../COMPONENT_DEVELOPMENT_GUIDE.md)**
- **[API Documentation](../reference/api-documentation.md)**

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React 19 Release Notes](https://react.dev/blog/2024/04/25/react-19)
- [PayloadCMS Documentation](https://payloadcms.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Last Updated**: September 2, 2025
**Still have questions?** Check the [Troubleshooting Guide](troubleshooting.md) or create an issue on GitHub.
