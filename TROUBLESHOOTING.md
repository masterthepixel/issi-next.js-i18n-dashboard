````markdown
# Troubleshooting Common i18n Issues

This guide addresses common internationalization (i18n) issues you might encounter when working with the ISSI multilingual dashboard.

## Missing Translations

### Symptoms
- Text appears as translation keys (e.g., `common.welcome_title`)
- Console errors with messages like "Translation key not found"

### Solutions
1. Check if the key exists in all language files (`src/lang/*.json`)
2. Verify you're using the correct namespace
3. Run the JSON validation script:
   ```bash
   pnpm run validate:json
   ```
4. Check for typos in the translation key

## Language Detection Issues

### Symptoms
- Site always defaults to English regardless of browser settings
- Language switching doesn't work properly

### Solutions
1. Verify the middleware is correctly configured
2. Check that `Accept-Language` header is being processed correctly
3. Ensure the language parameter is being passed to all components
4. Clear browser cookies and local storage

## Character Encoding Problems

### Symptoms
- Special characters appear as boxes or question marks
- Non-Latin scripts render incorrectly

### Solutions
1. Ensure all language JSON files are saved with UTF-8 encoding
2. Verify HTML has proper meta charset tag:
   ```html
   <meta charset="UTF-8">
   ```
3. Check for correct font loading that supports all required character sets

## Date and Number Formatting

### Symptoms
- Dates appear in unexpected formats
- Number separators don't match the language convention

### Solutions
1. Use the Intl API for formatting:
   ```javascript
   // For dates
   new Intl.DateTimeFormat(lang, { dateStyle: 'full' }).format(date)
   
   // For numbers
   new Intl.NumberFormat(lang).format(number)
   ```
2. Verify the correct locale code is being passed (e.g., 'en-US' vs 'en')

## Performance Issues

### Symptoms
- Slow page transitions when changing languages
- High memory usage

### Solutions
1. Ensure translation files aren't too large
2. Consider splitting translations by page/section
3. Implement proper code-splitting to avoid loading unnecessary translations
4. Use React.memo for components that don't need to re-render on language change

## SEO Problems

### Symptoms
- Search engines only index one language version
- Incorrect language metadata in search results

### Solutions
1. Verify each page has the correct `lang` attribute on the HTML tag
2. Check that `hreflang` tags are properly implemented in the head
3. Ensure metadata (title, description) is translated for each language
4. Verify the sitemap includes all language variations with proper `hreflang` attributes

## IntlProvider Context Issues

### Symptoms
- "No provider found" errors in the console
- Components not receiving translations

### Solutions
1. Ensure each client component that uses `FormattedMessage` is wrapped with an `IntlProvider`
2. Check that the wrapper component is correctly receiving and passing the `locale` and `messages` props
3. Verify that no server components are trying to use `useIntl` hook or `FormattedMessage` directly

## Validation Script Failures

### Symptoms
- The `validate:json` script reports errors
- Build failures related to missing translations

### Solutions
1. Check the error message to identify the specific keys or files with issues
2. Ensure all language files have the same structure and keys
3. Fix any JSON syntax errors (missing commas, quotes, etc.)
4. Run the script again to verify your fixes

## Server/Client Component Boundary Issues

### Symptoms
- Errors about hooks being called in server components
- "React Context is not available in Server Components" errors

### Solutions
1. Ensure `'use client'` directive is added at the top of all client components
2. Follow the pattern of creating wrapper components for client-side components
3. Be careful with component imports - importing a client component into a server component requires proper isolation

## Language File Update Problems

### Symptoms
- New translations not appearing after deployment
- Outdated translations showing instead of updated ones

### Solutions
1. Check your build cache - you may need to clear it
2. Verify that language files are correctly included in the build process
3. Make sure language switching logic is checking for the most recent files
4. Consider implementing a versioning system for translation updates

## References

- [INTERNATIONALIZATION.md](./INTERNATIONALIZATION.md) - Detailed i18n implementation guide
- [I18N_ARCHITECTURE.md](./I18N_ARCHITECTURE.md) - Architecture and data flow diagrams
- [COMPONENT_INTEGRATION_GUIDE.md](./COMPONENT_INTEGRATION_GUIDE.md) - Component integration with i18n
- [React Intl Documentation](https://formatjs.io/docs/react-intl/)
````
