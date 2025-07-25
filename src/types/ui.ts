// ==========================================
// 🎨 UI Components Type Library
// ==========================================

import React from 'react';
import { Language } from './i18n';

/**
 * Base component props that all UI components should extend
 */
export interface BaseComponentProps {
  id?: string;
  className?: string;
  'data-testid'?: string;
  children?: React.ReactNode;
}

/**
 * Component size variants
 */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * Component color variants
 */
export type ComponentColor =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral';

/**
 * Component variant styles
 */
export type ComponentVariant =
  | 'solid'
  | 'outline'
  | 'ghost'
  | 'soft'
  | 'gradient';

/**
 * Responsive breakpoint system
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
 * Card component props
 */
export interface CardProps extends BaseComponentProps {
  title?: string;
  description?: string;
  icon?: React.ComponentType<any>;
  href?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  size?: ComponentSize;
  variant?: ComponentVariant;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

/**
 * Button component props
 */
export interface ButtonProps extends BaseComponentProps {
  variant?: ComponentVariant;
  size?: ComponentSize;
  color?: ComponentColor;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ComponentType<any>;
  rightIcon?: React.ComponentType<any>;
  onClick?: (_event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Input component props
 */
export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: string;
  helperText?: string;
  label?: string;
  size?: ComponentSize;
  leftIcon?: React.ComponentType<any>;
  rightIcon?: React.ComponentType<any>;
  onChange?: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (_event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (_event: React.FocusEvent<HTMLInputElement>) => void;
}

/**
 * Modal component props
 */
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  position?: 'center' | 'top' | 'bottom';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  preventBodyScroll?: boolean;
}

/**
 * Navigation menu item
 */
export interface NavMenuItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ComponentType<any>;
  children?: NavMenuItem[];
  disabled?: boolean;
  external?: boolean;
  badge?: string | number;
  onClick?: () => void;
}

/**
 * Navigation component props
 */
export interface NavigationProps extends BaseComponentProps {
  items: NavMenuItem[];
  currentPath?: string;
  variant?: 'horizontal' | 'vertical' | 'floating' | 'sidebar';
  size?: ComponentSize;
  showIcons?: boolean;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  onItemClick?: (_item: NavMenuItem) => void;
}

/**
 * Bento grid categories
 */
export type BentoCategory =
  | 'featured'
  | 'project'
  | 'hr'
  | 'compliance'
  | 'data'
  | 'modernization'
  | 'technology'
  | 'security';

/**
 * Bento grid item
 */
export interface BentoGridItem {
  id: string;
  title: string;
  description: string;
  icon?: React.ComponentType<any>;
  href?: string;
  category: BentoCategory;
  size: 'small' | 'medium' | 'large' | 'xlarge';
  featured?: boolean;
  tags?: string[];
  titleKey?: string;
  descriptionKey?: string;
  disabled?: boolean;
  comingSoon?: boolean;
}

/**
 * Bento grid props
 */
export interface BentoGridProps extends BaseComponentProps {
  items: BentoGridItem[];
  columns?: ResponsiveValue<number>;
  gap?: ResponsiveValue<string>;
  enableFiltering?: boolean;
  enableSearch?: boolean;
  defaultCategory?: BentoCategory | 'all';
  onItemClick?: (_item: BentoGridItem) => void;
  loading?: boolean;
  emptyState?: React.ReactNode;
}

/**
 * Category color scheme
 */
export interface CategoryColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  border: string;
  glow: string;
  text: string;
  textHover: string;
}

/**
 * Form field validation state
 */
export interface ValidationState {
  isValid: boolean;
  isDirty: boolean;
  isTouched: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Form component props
 */
export interface FormProps extends BaseComponentProps {
  onSubmit: (_data: Record<string, any>) => void | Promise<void>;
  validation?: Record<string, (_value: any) => ValidationState>;
  initialValues?: Record<string, any>;
  enableRealTimeValidation?: boolean;
  disabled?: boolean;
  loading?: boolean;
  resetOnSubmit?: boolean;
}

/**
 * Loading component props
 */
export interface LoadingProps extends BaseComponentProps {
  size?: ComponentSize;
  variant?: 'spinner' | 'dots' | 'bars' | 'pulse' | 'skeleton';
  color?: ComponentColor;
  text?: string;
  overlay?: boolean;
  fullScreen?: boolean;
}

/**
 * Alert/notification component props
 */
export interface AlertProps extends BaseComponentProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  description?: string;
  dismissible?: boolean;
  autoClose?: boolean;
  duration?: number;
  icon?: React.ComponentType<any>;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: ComponentVariant;
  }>;
}

/**
 * Tooltip component props
 */
export interface TooltipProps extends BaseComponentProps {
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click' | 'focus';
  delay?: number;
  arrow?: boolean;
  maxWidth?: string;
  disabled?: boolean;
}

/**
 * Dropdown component props
 */
export interface DropdownProps extends BaseComponentProps {
  items: Array<{
    id: string;
    label: string;
    value: any;
    icon?: React.ComponentType<any>;
    disabled?: boolean;
    divider?: boolean;
  }>;
  value?: any;
  placeholder?: string;
  disabled?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  multiple?: boolean;
  size?: ComponentSize;
  onSelect?: (_value: any) => void;
  onSearch?: (_query: string) => void;
}

/**
 * Tab component props
 */
export interface TabsProps extends BaseComponentProps {
  tabs: Array<{
    id: string;
    label: string;
    content: React.ReactNode;
    icon?: React.ComponentType<any>;
    disabled?: boolean;
    badge?: string | number;
  }>;
  defaultActiveTab?: string;
  activeTab?: string;
  onTabChange?: (_tabId: string) => void;
  variant?: 'line' | 'enclosed' | 'soft-rounded' | 'solid-rounded';
  size?: ComponentSize;
  orientation?: 'horizontal' | 'vertical';
}

/**
 * Pagination component props
 */
export interface PaginationProps extends BaseComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (_page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  showPageNumbers?: boolean;
  maxVisiblePages?: number;
  size?: ComponentSize;
  disabled?: boolean;
}

/**
 * Search component props
 */
export interface SearchProps extends BaseComponentProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  size?: ComponentSize;
  suggestions?: string[];
  showRecentSearches?: boolean;
  onSearch?: (_query: string) => void;
  onSuggestionSelect?: (_suggestion: string) => void;
  onClear?: () => void;
}

/**
 * Badge component props
 */
export interface BadgeProps extends BaseComponentProps {
  variant?: ComponentVariant;
  color?: ComponentColor;
  size?: ComponentSize;
  dot?: boolean;
  pulse?: boolean;
  removable?: boolean;
  onRemove?: () => void;
}

/**
 * Avatar component props
 */
export interface AvatarProps extends BaseComponentProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: ComponentSize;
  shape?: 'circle' | 'square' | 'rounded';
  fallbackIcon?: React.ComponentType<any>;
  status?: 'online' | 'offline' | 'away' | 'busy';
  showStatus?: boolean;
}

/**
 * Theme configuration
 */
export interface ThemeConfig {
  name: string;
  colors: {
    primary: Record<string, string>;
    secondary: Record<string, string>;
    accent: Record<string, string>;
    neutral: Record<string, string>;
    success: Record<string, string>;
    warning: Record<string, string>;
    error: Record<string, string>;
    info: Record<string, string>;
  };
  typography: {
    fontFamily: {
      sans: string[];
      serif: string[];
      mono: string[];
    };
    fontSize: Record<ComponentSize, string>;
    fontWeight: Record<string, string>;
    lineHeight: Record<string, string>;
  };
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
  breakpoints: Record<string, string>;
}

/**
 * Accessibility props
 */
export interface AccessibilityProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-selected'?: boolean;
  'aria-disabled'?: boolean;
  'aria-hidden'?: boolean;
  'aria-live'?: 'polite' | 'assertive' | 'off';
  role?: string;
  tabIndex?: number;
}

/**
 * Animation configuration
 */
export interface AnimationConfig {
  duration: number;
  timing: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
  delay?: number;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  iterations?: number | 'infinite';
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both';
}

/**
 * Internationalized UI component props
 */
export interface InternationalizedUIProps {
  lang: Language; direction?: 'ltr' | 'rtl';
  translations?: Record<string, string>;
}

// All types are already exported individually above
