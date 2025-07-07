// ==========================================
// 🏗️ ISSI TypeScript Library
// ==========================================
// Comprehensive type definitions for the ISSI Next.js application
// This file provides type safety and IntelliSense for all major data structures

// ==========================================
// 📦 Module Re-exports
// ==========================================
// This file serves as the main entry point for the type library
// All types are defined in their respective modules and re-exported here

// Individual module re-exports (namespace approach to avoid conflicts)
export * as GlobeTypes from './globe';
export * as I18nTypes from './i18n';
export * as UITypes from './ui';

// ==========================================
// 🎯 Commonly Used Types (Direct Exports)
// ==========================================
// These are the most frequently used types, exported directly for convenience

// Globe types
export type {
    GlobeAnimationConfig, GlobeComponentProps, GlobeConfig
} from './globe';

// UI types
export type {
    BentoGridItem, ButtonProps, CardProps
} from './ui';

// I18n types (with prefix to avoid conflicts)
export type {
    Language as ISSILanguage,
    LanguageInfo as ISSILanguageInfo,
    Messages as ISSIMessages,
    I18nPageParams as ISSIPageParams
} from './i18n';

// ==========================================
// 🎯 Usage Examples
// ==========================================
// Import examples for common use cases

/**
 * Example: Using globe types
 * ```typescript
 * import { GlobeTypes } from '@/types';
 * 
 * const config: GlobeTypes.GlobeConfig = {
 *   width: 300,
 *   height: 300,
 *   autoRotate: true
 * };
 * ```
 */

/**
 * Example: Using I18n types
 * ```typescript
 * import { I18nTypes } from '@/types';
 * 
 * const params: I18nTypes.PageParams = {
 *   lang: 'en'
 * };
 * ```
 */

/**
 * Example: Using UI types
 * ```typescript
 * import { UITypes } from '@/types';
 * 
 * const card: UITypes.CardProps = {
 *   title: 'Example Card',
 *   description: 'This is an example'
 * };
 * ```
 */

/**
 * Example: Direct imports for commonly used types
 * ```typescript
 * import { GlobeConfig, ISSILanguage } from '@/types';
 * 
 * const globe: GlobeConfig = { width: 200, height: 200 };
 * const lang: ISSILanguage = 'en';
 * ```
 */
