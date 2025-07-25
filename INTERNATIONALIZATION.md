# Next.js Internationalization (i18n) Implementation Guide

This document provides a technical deep-dive into the internationalization implementation of the ISSI Next.js Multilingual Website project, detailing the architecture, components, and data flow.

## Technical Architecture

### Core Libraries and Dependencies

```json
// From package.json
"dependencies": {
  "@formatjs/intl": "^3.1.6",         // Server-side internationalization utilities
  "@formatjs/intl-localematcher": "^0.5.4", // Language matching per HTTP spec
  "react-intl": "^6.7.0",             // React components for i18n
  "negotiator": "^0.6.3"              // HTTP content negotiation
}
```

### Configuration

The supported languages are defined in `i18n-config.ts`:

```typescript
// From i18n-config.ts
export const i18n = {
  locales: ["en", "fr", "es"],
  defaultLocale: "en",
} as const;
```

## Implementation Details

### 1. Routing Layer Implementation

#### Dynamic Route Segments

The App Router uses a `[lang]` dynamic segment to capture the current locale:

```
src/app/[lang]/layout.tsx  // Parent layout with language context
src/app/[lang]/home/       // Language-specific routes
src/app/[lang]/reports/
src/app/[lang]/discover/
```

#### Type Definitions

The locale parameter is strongly typed:

```typescript
// From src/lib/definitions.ts
import { i18n } from "../../i18n-config";

export type Locale = (typeof i18n)["locales"][number];
```

### 2. Middleware Implementation

The middleware intercepts requests to:
1. Detect the user's preferred language
2. Redirect to the appropriate language route
3. Handle pages without language prefix

```typescript
// From src/middleware.ts
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const fallbackPage = "home";

  // Check if pathname lacks locale prefix
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    const sanitizedPathname = pathname.startsWith("/") ? pathname.substring(1) : pathname;
    return NextResponse.redirect(
      new URL(`/${locale}/${sanitizedPathname || fallbackPage}`, request.url)
    );
  }
  
  // Additional logic for missing page paths...
}
```

Language detection uses the Accept-Language header and follows the HTTP spec:

```typescript
// From src/middleware.ts
function getLocale(request: NextRequest): string | undefined {
  // Transform headers for Negotiator
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: string[] = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(locales);
  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}
```

### 3. Message Storage Implementation

Translation messages are stored in JSON files with a flat structure of dot-notation keys:

```
src/lang/
  ├── en.json    // English translations
  ├── fr.json    // French translations
  ├── es.json    // Spanish translations
```

Message format follows ICU standards for handling variables and pluralization:

```json
// From src/lang/en.json (excerpt)
{
  "common.language-switcher": "{locale, select, en {English} fr {Français} es {Español} other {Unknown}}",
  "page.home.activity": "{action, select, COMMENT {Commented task} ACTIVATE {Activated job} STOP {Stopped job} other {Unkown activity}}"
}
```

### 4. Server Component Implementation

Server components use a utility function to load translations:

```typescript
// From src/lib/intl.ts
import "server-only";
import { createIntl } from "@formatjs/intl";
import type { Locale } from "@/lib/definitions";

export async function getIntl(locale: Locale) {
  return createIntl({
    locale: locale,
    messages: (await import(`../lang/${locale}.json`)).default,
  });
}
```

Implementation in server components:

```typescript
// From src/components/Sidebar.tsx (excerpt)
export default async function Sidebar({ locale }: Props) {
  const intl = await getIntl(locale);
  
  return (
    // ...component JSX
    <div>{intl.formatMessage({ id: "common.navigation.home" })}</div>
  );
}
```

### 5. Client Component Implementation

Client components receive translations via props and use the React Intl provider:

```typescript
// From src/components/Navbar.tsx
export default async function Navbar({ locale, user }: Props) {
  const messages = await getMessages(locale);
  return <NavbarContent locale={locale} messages={messages} user={user} />;
}

// Loads messages
async function getMessages(locale: string) {
  return (await import(`../lang/${locale}.json`)).default;
}
```

The client component implementation:

```tsx
// From src/components/NavbarContent.tsx (excerpt)
export default function NavbarContent({ user, locale, messages }: Props) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      {/* Component JSX */}
      <FormattedMessage id="common.navigation.home" />
    </IntlProvider>
  );
}
```

### 6. Language Switching Implementation

Language switching is URL-based, preserving the current path:

```tsx
// From src/components/NavbarContent.tsx (excerpt)
<MenuItem href={`/en/${pathname.split("/").slice(2).join("/")}`} active={locale === "en"}>
  <FormattedMessage id="common.language-switcher" values={{ locale: "en" }} />
</MenuItem>
<MenuItem href={`/fr/${pathname.split("/").slice(2).join("/")}`} active={locale === "fr"}>
  <FormattedMessage id="common.language-switcher" values={{ locale: "fr" }} />
</MenuItem>
<MenuItem href={`/es/${pathname.split("/").slice(2).join("/")}`} active={locale === "es"}>
  <FormattedMessage id="common.language-switcher" values={{ locale: "es" }} />
</MenuItem>
```

## Data Flow

The complete data flow for internationalized rendering:

1. **Request Interception**: Middleware intercepts all requests
2. **Language Detection**: Middleware detects preferred language
3. **Routing**: Request is routed to the appropriate language segment
4. **Layout Rendering**: The `[lang]/layout.tsx` receives the locale parameter
5. **Message Loading**:
   - For server components: Messages loaded via `getIntl`
   - For client components: Messages passed via props
6. **Component Rendering**:
   - Server components use `intl.formatMessage()`
   - Client components use `<FormattedMessage>` or `intl.formatMessage()`

## Production Build Optimizations

During the build process, Next.js optimizes internationalized routes:

1. **Static Generation**: Pre-renders all localized routes
2. **Route Grouping**: Groups routes by locale for efficient loading
3. **Edge Functions**: Middleware runs at the edge for fast language detection

## Translation Management

Translation management is configured via `localizely.yml`:

```yaml
# From localizely.yml (excerpt)
download:
  files:
    - file: src/lang/en.json
      locale_code: en
    - file: src/lang/fr.json
      locale_code: fr
    - file: src/lang/es.json
      locale_code: es
```

## Debugging and Common Issues

### Language Detection Issues

If language detection fails:
1. Check the `Accept-Language` header in the request
2. Verify the middleware implementation
3. Ensure all locales in `i18n-config.ts` are correct

### Missing Translations

If translations are missing:
1. Check the JSON files for the specific key
2. Verify that the key format matches exactly
3. Ensure the message is loaded properly in the component

### Performance Optimization

For large translation files:
1. Consider splitting translations by page/feature
2. Implement dynamic loading for client components
3. Use message extraction tools to detect unused translations

## References

- [Next.js Internationalization Documentation](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [React Intl Documentation](https://formatjs.io/docs/react-intl/)
- [FormatJS Documentation](https://formatjs.io/docs/intl)
- [ICU Message Format](https://unicode-org.github.io/icu/userguide/format_parse/messages/)
