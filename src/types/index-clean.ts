/**
 * 🎯 ISSI TypeScript Library - Main Index
 * 
 * Central hub for all TypeScript type definitions across the ISSI project.
 * This library provides type safety, IntelliSense, and compile-time error detection.
 * 
 * @example
 * ```typescript
 * import { BreadcrumbTypes, GlobeTypes, UITypes } from '@/types';
 * 
 * const breadcrumb: BreadcrumbTypes.BreadcrumbItem = {
 *   name: 'Home',
 *   href: '/',
 *   current: false
 * };
 * ```
 */

import React from 'react';

// ==========================================
// 🧭 Core Utility Types
// ==========================================

/**
 * Make all properties optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Component props with children
 */
export interface WithChildren {
  children: React.ReactNode;
}

/**
 * Component props with className
 */
export interface WithClassName {
  className?: string;
}

/**
 * Standard component props
 */
export interface StandardComponentProps extends WithChildren, WithClassName {
  id?: string;
  'data-testid'?: string;
}

// ==========================================
// 📱 Responsive & Layout Types
// ==========================================

/**
 * Responsive breakpoint values
 */
export interface ResponsiveValue<T> {
  default: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}

/**
 * Layout container types
 */
export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';

/**
 * Grid layout configuration
 */
export interface GridConfig {
  columns: ResponsiveValue<number>;
  gap: ResponsiveValue<string>;
  rows?: ResponsiveValue<number>;
}

// ==========================================
// 🔄 State Management Types
// ==========================================

/**
 * Loading states
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Generic async state
 */
export interface AsyncState<T = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastUpdated?: Date;
}

/**
 * Form validation state
 */
export interface ValidationState {
  isValid: boolean;
  errors: Record<string, string[]>;
  touched: Record<string, boolean>;
}

// ==========================================
// 🌟 Export Type Namespaces
// ==========================================

/**
 * All breadcrumb-related types
 * @example BreadcrumbTypes.BreadcrumbItem
 */
export * as BreadcrumbTypes from './breadcrumb';

/**
 * All 3D globe-related types  
 * @example GlobeTypes.GlobeConfig
 */
export * as GlobeTypes from './globe';

/**
 * All internationalization types
 * @example I18nTypes.Language
 */
export * as I18nTypes from './i18n';

/**
 * All UI component types
 * @example UITypes.CardProps
 */
export * as UITypes from './ui';
