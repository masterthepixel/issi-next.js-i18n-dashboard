````markdown
# Internationalization Architecture

This document outlines the internationalization (i18n) architecture of the ISSI multilingual dashboard, including data flow diagrams and implementation details.

## High-Level Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Language Files │────▶│  i18n Provider  │────▶│    Components   │
│  (JSON)         │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         ▲                      │                        │
         │                      │                        │
         │                      ▼                        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│   Validation    │     │   Middleware    │◀───▶│  User Settings  │
│   Scripts       │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## Data Flow During Request Processing

```
┌───────────┐     ┌───────────┐     ┌───────────┐     ┌───────────┐
│           │     │           │     │           │     │           │
│  Request  │────▶│ Middleware│────▶│  Routing  │────▶│  Response │
│           │     │           │     │           │     │           │
└───────────┘     └───────────┘     └───────────┘     └───────────┘
                        │                 │
                        ▼                 ▼
                  ┌───────────┐    ┌───────────┐
                  │           │    │           │
                  │ Language  │    │   Page    │
                  │ Detection │    │ Component │
                  │           │    │           │
                  └───────────┘    └───────────┘
                                         │
                                         ▼
                                   ┌───────────┐
                                   │           │
                                   │Translation│
                                   │ Loading   │
                                   │           │
                                   └───────────┘
```

## Client-Side Translation Flow

```
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│               │     │               │     │               │
│ User Action   │────▶│ Language      │────▶│ Load New      │
│ (Switch Lang) │     │ Parameter     │     │ Translations  │
│               │     │ Update        │     │               │
└───────────────┘     └───────────────┘     └───────────────┘
                                                   │
                                                   ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│               │     │               │     │               │
│ Component     │◀───▶│ Translation   │◀────│ JSON          │
│ Re-rendering  │     │ Hook/Function │     │ Translation   │
│               │     │               │     │ Files         │
└───────────────┘     └───────────────┘     └───────────────┘
```

## Implementation Details

### 1. Translation Loading

We use a hybrid approach for translations:

- **Server Components**: Translations are loaded server-side using `getIntl`
- **Client Components**: Translations are loaded client-side using the `FormattedMessage` component with `IntlProvider`

This ensures optimal performance while maintaining flexibility.

### 2. Language Detection Logic

```
START
  |
  ▼
Is language specified in URL?
  |
  ├── YES → Use URL language
  |
  ▼
Is language in cookies?
  |
  ├── YES → Use cookie language
  |
  ▼
Check browser Accept-Language header
  |
  ├── Match found → Use browser language
  |
  ▼
Use default language (English)
  |
  ▼
END
```

### 3. Language Switching Process

When a user switches languages:

1. Update URL parameter
2. Store preference in cookie for future visits
3. Load new translation files
4. Re-render components with new translations

This approach provides a seamless experience while maintaining good SEO practices with language-specific URLs.

### 4. Translation File Structure

Each language file (`src/lang/*.json`) is structured as a flat key-value pair:

```json
{
  "namespace.componentName.elementName": "Translated text",
  "common.button.submit": "Submit",
  "page.home.title": "Welcome to our site"
}
```

This approach provides:
- Clear context for translators
- Easy lookup in code
- Flexibility for component reuse

### 5. Server vs. Client Implementation

#### Server Components

```tsx
// In a server component
import { getIntl } from '@/app/[lang]/i18n';

export default async function ServerComponent({ lang }: { lang: string }) {
  const intl = await getIntl(lang);
  
  return (
    <div>
      <h1>{intl.formatMessage({ id: 'component.title' })}</h1>
      <p>{intl.formatMessage({ id: 'component.description' })}</p>
    </div>
  );
}
```

#### Client Components

```tsx
// In a client component
'use client';

import { FormattedMessage } from 'react-intl';

export default function ClientComponent() {
  return (
    <div>
      <h1><FormattedMessage id="component.title" /></h1>
      <p><FormattedMessage id="component.description" /></p>
    </div>
  );
}

// In a wrapper for the client component
'use client';

import { IntlProvider } from "react-intl";
import ClientComponent from "./ClientComponent";

export default function ClientComponentWrapper({ 
  locale, 
  messages 
}: {
  locale: string;
  messages: Record<string, string>;
}) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <ClientComponent />
    </IntlProvider>
  );
}
```

### 6. Validation System

The JSON validation system ensures:
1. All language files have consistent keys
2. No missing translations
3. Proper JSON syntax

This is implemented via the custom script in `scripts/validate-json.js`.

## i18n Configuration

The project's internationalization is configured in the `i18n-config.ts` file:

```typescript
export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'es', 'fr'],
};

export type Locale = (typeof i18n)['locales'][number];
```

This configuration:
- Defines supported languages
- Sets the default language
- Provides TypeScript type safety

## Best Practices

1. **Use meaningful keys**: Follow the pattern `namespace.component.element` for clear organization
2. **Keep translations separate**: Don't mix translations with code logic
3. **Use variables for dynamic content**: Use ICU message format for complex translations
4. **Validate regularly**: Run the validation script before commits
5. **Test all languages**: Verify all supported languages when making changes
6. **Consider RTL languages**: Design components to support right-to-left languages if needed
7. **Use proper fallbacks**: Ensure graceful degradation if a translation is missing

## References

- [INTERNATIONALIZATION.md](./INTERNATIONALIZATION.md) - Detailed i18n implementation guide
- [COMPONENT_INTEGRATION_GUIDE.md](./COMPONENT_INTEGRATION_GUIDE.md) - Component integration with i18n
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Solutions for common i18n issues
- [React Intl Documentation](https://formatjs.io/docs/react-intl/)
- [Next.js Internationalization](https://nextjs.org/docs/advanced-features/i18n-routing)
````
