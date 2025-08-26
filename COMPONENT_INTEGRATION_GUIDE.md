# Component Integration Guide for Multilingual Pages

This guide provides step-by-step instructions for creating and integrating client-side components with internationalization support in the ISSI Next.js multilingual website.

## Table of Contents

1. [Understanding the Architecture](#understanding-the-architecture)
2. [Creating a New Client Component](#creating-a-new-client-component)
3. [Creating a Wrapper Component](#creating-a-wrapper-component)
4. [Adding Translations](#adding-translations)
5. [Integrating into Pages](#integrating-into-pages)
6. [Testing](#testing)
7. [Troubleshooting Common Issues](#troubleshooting-common-issues)

## Understanding the Architecture

The ISSI website uses a hybrid approach to internationalization:

- **Server Components**: Use the `getIntl` function to directly access translations
- **Client Components**: Require a wrapper with `IntlProvider` to access translations via `FormattedMessage`

This architecture is necessary because client components cannot directly use the server-side `getIntl` function, and the React Context API used by `react-intl` only works within client components.

## Creating a New Client Component

1. **Create the component file** in the `src/components` directory:

```tsx
'use client'

import { Button } from '@/components/ui/button'
import { FormattedMessage } from 'react-intl'
import { useRouter } from 'next/navigation'

export default function MyComponent() {
  const router = useRouter();
  
  const handleAction = () => {
    // Handle button click - navigation, API call, etc.
    router.push('/target-page');
  };
  return (
    <div className="my-component">
      <h2>
        <FormattedMessage id="mycomponent.title" />
      </h2>
      <p>
        <FormattedMessage id="mycomponent.description" />
      </p>
      <Button onClick={handleAction}>
        <FormattedMessage id="mycomponent.button" />
      </Button>
    </div>
  )
}
```

2. **Important notes**:
   - Always include the `'use client'` directive at the top
   - Use `FormattedMessage` components for all text that needs to be translated
   - Use consistent ID patterns (e.g., `componentname.element`)
   - Add proper TypeScript props interface if the component accepts props

### ⚠️ CRITICAL: Button Usage Patterns

**NEVER use `asChild` with complex children** - This causes React.Children.only errors:

```tsx
// ❌ WRONG - Causes React.Children.only error
<Button asChild>
  <Link href="/contact">
    <span>
      <Mail className="h-4 w-4 mr-2" />
      <FormattedMessage id="button.contact" />
    </span>
  </Link>
</Button>

// ✅ CORRECT - Use onClick pattern
import { useRouter } from 'next/navigation';

const router = useRouter();

<Button onClick={() => router.push('/contact')}>
  <Mail className="h-4 w-4 mr-2" />
  <FormattedMessage id="button.contact" />
</Button>
```

**Required imports for Button usage**:
```tsx
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
```

## Creating a Wrapper Component

To use a client component with `FormattedMessage`, create a wrapper component that provides the `IntlProvider`:

```tsx
'use client'

import { IntlProvider } from "react-intl";
import MyComponent from "@/components/MyComponent";
import { Locale } from "@/lib/definitions";

interface MyComponentWrapperProps {
  locale: Locale;
  messages: Record<string, string>;
  // Add any additional props your component needs
}

export default function MyComponentWrapper({ 
  locale, 
  messages,
  // Destructure any additional props 
}: MyComponentWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <MyComponent />
    </IntlProvider>
  );
}
```

This pattern ensures that:
1. The component has access to the appropriate translations
2. The correct locale is set for formatting dates, numbers, etc.
3. The component is properly isolated from server components

## Adding Translations

For each new component, add translation strings to all language files:

1. **English** (`src/lang/en.json`):
```json
{
  "mycomponent.title": "My Component Title",
  "mycomponent.description": "This is a description of my component.",
  "mycomponent.button": "Click Me"
}
```

2. **French** (`src/lang/fr.json`):
```json
{
  "mycomponent.title": "Titre de Mon Composant",
  "mycomponent.description": "Ceci est une description de mon composant.",
  "mycomponent.button": "Cliquez-moi"
}
```

3. **Spanish** (`src/lang/es.json`):
```json
{
  "mycomponent.title": "Título de Mi Componente",
  "mycomponent.description": "Esta es una descripción de mi componente.",
  "mycomponent.button": "Haz clic aquí"
}
```

**Best Practices for Translation Keys**:
- Use a consistent naming pattern like `component.element` or `page.section.element`
- Keep keys descriptive but concise
- Group related translations together
- Use ICU message format for complex translations with variables:
  ```json
  "mycomponent.greeting": "Hello, {name}!"
  ```

## Integrating into Pages

To integrate the component into a page, follow these steps:

1. **Import the wrapper component** in your page file:

```tsx
import MyComponentWrapper from "@/components/MyComponentWrapper";
```

2. **Load the messages** in the page component:

```tsx
async function PageContent({ locale }: PageContentProps) {
  const intl = await getIntl(locale);
  // Other data loading...
  
  // Load the messages for the client component
  const messages = (await import(`../../../lang/${locale}.json`)).default;

  return (
    <>
      <MyComponentWrapper locale={locale} messages={messages} />
      {/* Rest of the page content */}
    </>
  );
}
```

3. **Positioning considerations**:
   - Consider where the component should appear in the page layout
   - Add appropriate CSS classes for spacing (e.g., `mt-8`, `mb-4`)
   - Ensure responsive design works correctly

## Testing

After integrating a new component, thorough testing is essential:

1. **Local Testing**:
   - Run the development server: `pnpm dev`
   - Check each language version (/en, /fr, /es)
   - Verify all translations are displayed correctly
   - Test responsive behavior on different screen sizes

2. **Build Testing**:
   - Run a production build: `pnpm build`
   - Check for any build errors related to the new component
   - Verify the static generation includes all language versions

3. **Accessibility Testing**:
   - Check that the component is keyboard navigable
   - Ensure proper contrast ratios
   - Verify screen reader compatibility

## Troubleshooting Common Issues

### Missing IntlProvider Error

**Error**: `Error: [React Intl] Could not find required 'intl' object. <IntlProvider> needs to exist in the component ancestry.`

**Solution**:
1. Ensure you're using the wrapper component and not the direct component
2. Check that messages are being properly loaded and passed to the wrapper
3. Verify the wrapper correctly implements the IntlProvider

```tsx
// Correct usage
<MyComponentWrapper locale={locale} messages={messages} />

// Incorrect usage
<MyComponent />
```

### Missing Translations

**Issue**: Component shows translation keys instead of translated text

**Solution**:
1. Verify translation keys exist in all language files
2. Check for typos in translation keys
3. Ensure messages are loaded correctly in the page component

### Server Component Errors

**Error**: `Error: Event handlers cannot be passed to Client Component props`

**Solution**:
1. Make sure the component has the `'use client'` directive
2. Check that all parent components that use hooks or event handlers are also client components
3. If using a mix of server and client components, ensure proper boundaries

### Component Not Rendering

**Issue**: Component doesn't appear on the page

**Solution**:
1. Check the import paths are correct
2. Verify the component is actually included in the JSX return
3. Check for CSS that might be hiding the component
4. Look for errors in the browser console

## Example: Hero Component Integration

Here's a complete example showing how the Hero component was integrated:

1. **Create Hero component** (`src/components/Hero.tsx`):
```tsx
'use client'

import { FormattedMessage } from 'react-intl'

export default function Hero() {
  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      {/* Component JSX */}
      <h1>
        <FormattedMessage id="hero.title" />
      </h1>
      {/* More JSX */}
    </div>
  )
}
```

2. **Create HeroWrapper** (`src/components/HeroWrapper.tsx`):
```tsx
'use client'

import { IntlProvider } from "react-intl";
import Hero from "@/components/Hero";
import { Locale } from "@/lib/definitions";

interface HeroWrapperProps {
  locale: Locale;
  messages: Record<string, string>;
}

export default function HeroWrapper({ locale, messages }: HeroWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <Hero />
    </IntlProvider>
  );
}
```

3. **Add translations** to language files:
```json
// en.json
{
  "hero.title": "Data to enrich your online business",
  "hero.description": "Anim aute id magna aliqua ad ad non deserunt sunt.",
  "hero.cta.get-started": "Get started"
}
```

4. **Integrate into page** (`src/app/[lang]/home/page.tsx`):
```tsx
async function PageContent({ locale }: PageContentProps) {
  const intl = await getIntl(locale);
  // Other data loading...
  const messages = (await import(`../../../lang/${locale}.json`)).default;

  return (
    <>
      <HeroWrapper locale={locale} messages={messages} />
      {/* Rest of page content */}
    </>
  );
}
```

## Advanced Code Examples

### Basic Component with i18n

```tsx
'use client';

import { FormattedMessage } from 'react-intl';

interface FeatureCardProps {
  icon?: React.ReactNode;
  title?: string;
}

export default function FeatureCard({ icon, title }: FeatureCardProps) {
  return (
    <div className="feature-card">
      {icon && <div className="feature-icon">{icon}</div>}
      <h3>{title || <FormattedMessage id="feature.default_title" />}</h3>
      <p><FormattedMessage id="feature.description" /></p>
    </div>
  );
}
```

### Server Component with i18n

```tsx
import { getIntl } from '@/app/[lang]/i18n';

export default async function WelcomeSection({ lang }: { lang: string }) {
  const intl = await getIntl(lang);
  
  return (
    <section className="welcome-section">
      <h1>{intl.formatMessage({ id: 'home.welcome_title' })}</h1>
      <p>{intl.formatMessage({ id: 'home.welcome_description' })}</p>
    </section>
  );
}
```

### Using Pluralization

```tsx
'use client';

import { FormattedMessage } from 'react-intl';

export default function Notification({ count }: { count: number }) {
  return (
    <div className="notification">
      <FormattedMessage 
        id="notifications.count" 
        values={{ count }} 
      />
    </div>
  );
}
```

This requires the following in your language files:

```json
// In en.json
{
  "notifications.count": "{count, plural, =0 {No notifications} one {# notification} other {# notifications}}"
}

// In fr.json
{
  "notifications.count": "{count, plural, =0 {Aucune notification} one {# notification} other {# notifications}}"
}

// In es.json
{
  "notifications.count": "{count, plural, =0 {Sin notificaciones} one {# notificación} other {# notificaciones}}"
}
```

### Formatting Dates and Numbers

```tsx
'use client';

import { FormattedDate, FormattedNumber, FormattedTime } from 'react-intl';

export default function EventDetails({ 
  date, 
  price 
}: { 
  date: Date; 
  price: number 
}) {
  return (
    <div className="event-details">
      <p>
        <FormattedDate 
          value={date} 
          year="numeric" 
          month="long" 
          day="numeric" 
        />
        {' at '}
        <FormattedTime value={date} />
      </p>
      <p>
        <FormattedNumber 
          value={price} 
          style="currency" 
          currency="USD" 
        />
      </p>
    </div>
  );
}
```

### Handling Rich Text with HTML

```tsx
'use client';

import { FormattedMessage } from 'react-intl';

export default function RichTextExample() {
  return (
    <div className="rich-text">
      <FormattedMessage
        id="richtext.example"
        values={{
          b: (chunks) => <strong>{chunks}</strong>,
          link: (chunks) => <a href="/terms">{chunks}</a>
        }}
      />
    </div>
  );
}
```

With this translation:

```json
{
  "richtext.example": "Please read our <link>terms and conditions</link> and <b>privacy policy</b>."
}
```

### Dynamic Translations with Variables

```tsx
'use client';

import { FormattedMessage } from 'react-intl';

export default function Greeting({ name, role }: { name: string; role: string }) {
  return (
    <div className="greeting">
      <FormattedMessage
        id="greeting.welcome"
        values={{ name, role }}
      />
    </div>
  );
}
```

With these translations:

```json
// en.json
{
  "greeting.welcome": "Welcome, {name}! You are logged in as {role}."
}

// fr.json
{
  "greeting.welcome": "Bienvenue, {name} ! Vous êtes connecté en tant que {role}."
}

// es.json
{
  "greeting.welcome": "¡Bienvenido, {name}! Has iniciado sesión como {role}."
}
```

## References

- [INTERNATIONALIZATION.md](./INTERNATIONALIZATION.md) - Detailed i18n implementation guide
- [I18N_ARCHITECTURE.md](./I18N_ARCHITECTURE.md) - Architecture and data flow diagrams
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Solutions for common i18n issues
- [React Intl Documentation](https://formatjs.io/docs/react-intl/)
- [Next.js Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)

- [ICU Message Format](https://unicode-org.github.io/icu/userguide/format_parse/messages/)

---

## Button Component Migration (2024)

- **Button**: All UI buttons now use the [enhanced-button](https://github.com/jakobhoeg/enhanced-button) implementation, replacing shadcn/ui's default Button.
- **Features**: Supports effects, icon placement (left/right), and full compatibility with shadcn/ui props and Tailwind theme variables.
- **Usage**: Import from `src/components/ui/button.tsx` for all button needs. See CLAUDE.md for usage examples.
- **Migration Rationale**: Enhanced-button provides improved accessibility, visual effects, and easier icon integration.
- **Theme Support**: Fully supports Tailwind CSS theme variables for colors, radii, and effects.
- **Documentation**: Refer to CLAUDE.md and CRUSH.md for migration details and usage patterns.
