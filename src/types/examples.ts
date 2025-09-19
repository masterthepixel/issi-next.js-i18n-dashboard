// ==========================================
// 📚 TypeScript Library Usage Examples
// ==========================================
// This file demonstrates how to use the ISSI TypeScript library
// Copy these patterns to your components for type safety

import {
  BentoGridItem,
  CardProps,
  GlobeConfig,
  ISSILanguage as Language,
  ISSIMessages as Messages
} from './index';

// Temporary type definitions for examples (these should be moved to proper type files)
interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  featured?: boolean;
  size?: string;
}

interface Service {
  id: string;
  title: string;
  description: string;
  category?: string;
  features?: string[];
  pricing?: {
    basic?: number;
    premium?: number;
    type?: string;
    description?: string;
  };
}

// Note: For React component examples, see the documentation
// This file focuses on pure TypeScript usage patterns

// ==========================================
// 🌍 Globe Usage Examples
// ==========================================

/**
 * Example: Type-safe globe configuration
 */
const createGlobeConfig = (width: number, height: number): GlobeConfig => {
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
  return {
    width,
    height,
    devicePixelRatio: dpr,
    enableInteraction: true,
    autoRotate: true,
    rotationSpeed: 0.5
  };
};

/**
 * Example: Validate globe settings
 */
const validateGlobeConfig = (config: GlobeConfig): boolean => {
  return config.width > 0 && config.height > 0;
};

// ==========================================
// 🎨 UI Component Usage Examples
// ==========================================

/**
 * Example: Type-safe bento grid item creation
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

/**
 * Example: Card props validation
 */
const validateCardProps = (props: CardProps): boolean => {
  return props.title !== undefined && props.title.length > 0;
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
 * Example: Type-safe message extraction
 */
const getTranslationText = (messages: Messages, key: string): string => {
  const keys = key.split('.');
  let current: any = messages;

  for (const k of keys) {
    current = current?.[k];
  }

  return typeof current === 'string' ? current : key;
};

// ==========================================
// 📊 Data Handling Examples
// ==========================================

/**
 * Example: Type-safe product creation
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
 * Example: Type-safe service creation
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
 * Example: Type guard for language validation
 */
const isValidLanguage = (lang: string): lang is Language => {
  return ['en', 'fr', 'es'].includes(lang);
};

/**
 * Example: Type-safe array filtering
 */
const filterProductsByCategory = (
  products: Product[],
  category: BentoGridItem['category']
): Product[] => {
  return products.filter(product => product.category === category);
};

// ==========================================
// 🎯 Advanced Type Usage
// ==========================================

/**
 * Example: Generic type-safe API response handler
 */
const handleApiResponse = <T>(response: any): T | null => {
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
 * Example: Type-safe configuration merger
 */
const mergeConfigurations = <T extends Record<string, any>>(
  defaultConfig: T,
  userConfig: Partial<T>
): T => {
  return { ...defaultConfig, ...userConfig };
};

// ==========================================
// 💡 Best Practices & Patterns
// ==========================================

/**
 * Example: Type-safe enum alternative
 */
const BentoCategories = {
  FEATURED: 'featured',
  PROJECT: 'project',
  HR: 'hr',
  COMPLIANCE: 'compliance',
  DATA: 'data',
  MODERNIZATION: 'modernization',
  TECHNOLOGY: 'technology',
  SECURITY: 'security'
} as const;

type BentoCategoryValues = typeof BentoCategories[keyof typeof BentoCategories];

/**
 * Example: Type-safe configuration object
 */
interface AppConfig {
  defaultLanguage: Language;
  supportedLanguages: Language[];
  enableGlobe: boolean;
  globeConfig: GlobeConfig;
}

const createAppConfig = (): AppConfig => {
  return {
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'fr', 'es'],
    enableGlobe: true,
    globeConfig: createGlobeConfig(920, 575)
  };
};

/**
 * Example: Type-safe error handling
 */
type ValidationError = {
  field: string;
  message: string;
  code: string;
};

const validateRequired = (value: string, fieldName: string): ValidationError | null => {
  if (!value || value.trim().length === 0) {
    return {
      field: fieldName,
      message: `${fieldName} is required`,
      code: 'REQUIRED'
    };
  }
  return null;
};

// Export all examples for use in documentation
export {
  BentoCategories,
  createAppConfig, createBentoItem, createGlobeConfig, createProduct,
  createService, filterProductsByCategory, getLanguageInfo,
  getTranslationText, handleApiResponse, isValidLanguage, mergeConfigurations, validateCardProps, validateGlobeConfig, validateRequired
};

export type {
  AppConfig, BentoCategoryValues, ValidationError
};

