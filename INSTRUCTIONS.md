# ISSI Next.js Multilingual Website - Developer Instructions

This document provides detailed instructions for developers working on the ISSI Next.js Multilingual Website project.

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm 8.x or higher
- Git

### Initial Setup

1. Clone the repository:
   ```powershell
   git clone <repository-url>
   cd issi-next.js-i18n-dashboard
   ```

2. Install dependencies:
   ```powershell
   pnpm install
   ```

3. Approve build scripts when prompted:
   ```powershell
   pnpm approve unrs-resolver
   ```

4. Start the development server:
   ```powershell
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Project Structure

### Key Directories and Files

- **`src/app/[lang]`**: Contains the main page components organized by language
- **`src/components`**: Reusable UI components
- **`src/lang`**: Language files (JSON) for internationalization
- **`src/lib`**: Utility functions and data services
- **`i18n-config.ts`**: Configuration for supported languages
- **`middleware.ts`**: Handles language detection and redirects

### Important Components

- **`TopNav.tsx`**: Horizontal navigation for desktop displays
- **`NavbarContent.tsx`**: Contains the main navigation logic
- **`Content.tsx`**: Main content wrapper

## Internationalization (i18n)

### Supported Languages

The website currently supports three languages:
- English (`en`)
- French (`fr`)
- Spanish (`es`)

### Adding Translations

1. Locate the language files in `src/lang` directory
2. Add new translation keys and values to each language file
3. Use the same keys across all language files for consistency

### Using Translations in Components

Import and use the React Intl components:

```tsx
import { FormattedMessage } from "react-intl";

// In your component:
<FormattedMessage id="your.translation.key" />
```

## Development Workflow

### Making Changes

1. Create a new branch for your feature or fix:
   ```powershell
   git checkout -b feature/your-feature-name
   ```

2. Make your changes
3. Run the development server to test:
   ```powershell
   pnpm dev
   ```

4. Build the project to check for errors:
   ```powershell
   pnpm build
   ```

5. Update the CHANGELOG.md with your changes

### Common Tasks

#### Adding a New Page

1. Create a new directory under `src/app/[lang]/your-page-name`
2. Add a `page.tsx` file with your page content
3. Add necessary translations to all language files
4. Update navigation components to include links to the new page

#### Modifying Navigation

The main navigation is implemented in two components:
- `TopNav.tsx` for desktop navigation
- Mobile menu in `NavbarContent.tsx`

Update both components when adding or removing navigation items.

#### Styling Guidelines

- Use Tailwind CSS for styling components
- Follow responsive design principles
- Maintain consistent spacing and typography

## Building for Production

To create a production build:

```powershell
pnpm build
```

The build process will generate static HTML for all supported languages and routes.

## Troubleshooting

### Common Issues

#### Build Errors

If you encounter build errors related to missing dependencies:

1. Check the error message for the specific missing module
2. Install the dependency:
   ```powershell
   pnpm add <missing-dependency>
   ```

#### Language Detection Issues

If language detection or switching doesn't work:

1. Check the `i18n-config.ts` file for correct language configuration
2. Verify the middleware implementation in `middleware.ts`
3. Ensure all language files contain the necessary translations

## Deployment

The project is configured for deployment on Vercel:

1. Push your changes to the repository
2. Connect the repository to Vercel
3. Vercel will automatically build and deploy the website

## Contact and Support

For questions or support, contact:

**International Software Systems International (ISSI)**
- **Address**: 7337 Hanover Pkwy, Suite# A, Greenbelt, MD 20770
- **Phone**: 301-982-9700
- **Email**: [Add contact email]
