// ==========================================
// 📚 TypeScript Library Usage Examples
// ==========================================
// This file demonstrates how to use the ISSI TypeScript library
// Copy these patterns to your components for type safety

import {
    BentoGridItem,
    BreadcrumbItem,
    CardProps,
    GlobeConfig,
    UniversalBreadcrumbProps
} from '@/types/index';

// ==========================================
// 🧭 Breadcrumb Usage Examples
// ==========================================

/**
 * Example: Type-safe breadcrumb component
 */
interface MyBreadcrumbProps {
  items: BreadcrumbItem[];
  lang: Language;
  showGlobe?: boolean;
}

const MyBreadcrumb: React.FC<MyBreadcrumbProps> = ({ items, lang, showGlobe = true }) => {
  // TypeScript will enforce that 'lang' is only 'en' | 'fr' | 'es'
  // TypeScript will enforce that 'items' have the correct structure
  return (
    <nav aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={index}>
          {item.href ? (
            <a href={item.href}>{item.name}</a>
          ) : (
            <span aria-current={item.current ? 'page' : undefined}>
              {item.name}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
};

/**
 * Example: Universal breadcrumb with full type safety
 */
const TypeSafeBreadcrumb: React.FC<UniversalBreadcrumbProps> = (props) => {
  // All props are type-checked, you get IntelliSense
  return <div>Breadcrumb implementation here</div>;
};

// ==========================================
// 🌍 Globe Usage Examples
// ==========================================

/**
 * Example: Type-safe globe configuration
 */
const createGlobeConfig = (width: number, height: number): GlobeConfig => {
  return {
    width,
    height,
    devicePixelRatio: window.devicePixelRatio || 1,
    enableInteraction: true,
    autoRotate: true,
    rotationSpeed: 0.5
  };
};

/**
 * Example: Globe component with proper typing
 */
interface MyGlobeProps {
  config: GlobeConfig;
  className?: string;
}

const MyGlobe: React.FC<MyGlobeProps> = ({ config, className }) => {
  // TypeScript ensures 'config' has all required properties
  return (
    <div className={className} style={{ width: config.width, height: config.height }}>
      {/* Globe implementation */}
    </div>
  );
};

// ==========================================
// 🎨 UI Component Usage Examples
// ==========================================

/**
 * Example: Type-safe card component
 */
const ProductCard: React.FC<CardProps> = ({ 
  title, 
  description, 
  href, 
  category, 
  featured = false 
}) => {
  return (
    <div className={`card ${featured ? 'featured' : ''}`}>
      <h3>{title}</h3>
      <p>{description}</p>
      {href && <a href={href}>Learn More</a>}
      {category && <span className="category">{category}</span>}
    </div>
  );
};

/**
 * Example: Type-safe bento grid item
 */
const createBentoItem = (id: string, title: string): BentoGridItem => {
  return {
    id,
    title,
    description: "Auto-generated description",
    category: 'featured', // TypeScript enforces valid categories
    size: 'medium', // TypeScript enforces valid sizes
    featured: false,
    tags: ['typescript', 'safe']
  };
};

// ==========================================
// 🌐 Internationalization Usage Examples
// ==========================================

/**
 * Example: Type-safe language handling
 */
const getLanguageInfo = (lang: Language) => {
  // TypeScript ensures 'lang' is only valid language codes
  const languageMap = {
    en: { name: 'English', nativeName: 'English', flag: '🇺🇸' },
    fr: { name: 'French', nativeName: 'Français', flag: '🇫🇷' },
    es: { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' }
  };
  
  return languageMap[lang];
};

/**
 * Example: Type-safe message handling
 */
interface TypeSafeTranslationProps {
  messages: Messages;
  lang: Language;
}

const TypeSafeTranslation: React.FC<TypeSafeTranslationProps> = ({ messages, lang }) => {
  // TypeScript ensures 'messages' has correct structure
  const getText = (key: string): string => {
    const keys = key.split('.');
    let current: any = messages;
    
    for (const k of keys) {
      current = current?.[k];
    }
    
    return typeof current === 'string' ? current : key;
  };

  return (
    <div>
      <h1>{getText('nav.home')}</h1>
      <p>{getText('common.loading')}</p>
    </div>
  );
};

// ==========================================
// 📊 Data Handling Examples
// ==========================================

/**
 * Example: Type-safe product data
 */
const createProduct = (title: string, category: BentoGridItem['category']): Product => {
  return {
    id: `product-${Date.now()}`,
    title,
    description: "Product description",
    category, // TypeScript enforces valid categories
    featured: false,
    size: 'medium'
  };
};

/**
 * Example: Type-safe service data
 */
const createService = (title: string): Service => {
  return {
    id: `service-${Date.now()}`,
    title,
    description: "Service description",
    category: "consulting",
    features: ["Feature 1", "Feature 2"],
    pricing: {
      type: 'project', // TypeScript enforces valid pricing types
      description: "Contact for pricing"
    }
  };
};

// ==========================================
// 🔧 Utility Functions with Types
// ==========================================

/**
 * Example: Type-safe utility functions
 */
const isValidLanguage = (lang: string): lang is Language => {
  return ['en', 'fr', 'es'].includes(lang);
};

const createBreadcrumbItems = (pathSegments: string[], lang: Language): BreadcrumbItem[] => {
  return pathSegments.map((segment, index) => ({
    name: segment.charAt(0).toUpperCase() + segment.slice(1),
    href: index < pathSegments.length - 1 ? `/${lang}/${pathSegments.slice(0, index + 1).join('/')}` : undefined,
    current: index === pathSegments.length - 1,
    position: index + 1
  }));
};

// ==========================================
// 🎯 Advanced Type Usage
// ==========================================

/**
 * Example: Generic type-safe API response handler
 */
const handleApiResponse = <T,>(response: any): T | null => {
  try {
    // TypeScript will enforce the return type matches T
    return response.data as T;
  } catch (error) {
    console.error('API Error:', error);
    return null;
  }
};

// Usage examples:
// const products = handleApiResponse<Product[]>(apiResponse);
// const service = handleApiResponse<Service>(apiResponse);

/**
 * Example: Type-safe component factory
 */
const createTypedComponent = <T extends Record<string, any>>(
  defaultProps: T
) => {
  return (additionalProps: Partial<T>) => {
    const mergedProps = { ...defaultProps, ...additionalProps };
    // TypeScript ensures type safety throughout
    return mergedProps;
  };
};

// ==========================================
// 💡 Best Practices & Tips
// ==========================================

/*
1. **Always use the types**: Import types for all your components
   import { CardProps, Language, BreadcrumbItem } from '@/types';

2. **Extend base types**: Build on the provided types for custom components
   interface MyCustomCardProps extends CardProps {
     customProp: string;
   }

3. **Use generic types**: For reusable components
   interface ApiResponse<T> {
     data: T;
     success: boolean;
   }

4. **Type guards**: For runtime type checking
   const isLanguage = (value: string): value is Language => {
     return ['en', 'fr', 'es'].includes(value);
   }

5. **Const assertions**: For exact type inference
   const languages = ['en', 'fr', 'es'] as const;
   type Language = typeof languages[number];

6. **Utility types**: Use TypeScript's built-in utilities
   type PartialCardProps = Partial<CardProps>;
   type RequiredCardProps = Required<CardProps>;
   type CardTitle = Pick<CardProps, 'title'>;

7. **Template literal types**: For dynamic string types
   type BreadcrumbKey = `breadcrumb.${string}`;
   type PageKey = `pages.${string}.title`;
*/

export {
    createBentoItem, createBreadcrumbItems, createGlobeConfig, createProduct,
    createService, createTypedComponent, handleApiResponse, isValidLanguage, MyBreadcrumb, MyGlobe,
    ProductCard, TypeSafeBreadcrumb, TypeSafeTranslation
};

