/**
 * Breadcrumb Development Helper
 * Provides development tools and utilities for managing breadcrumb translations
 */

import { AutoTranslationSystem } from './autoTranslation';
import { getPathSegments } from './breadcrumbUtils';

export class BreadcrumbDevHelper {
  /**
   * Generates missing translation keys for a given path
   * @param pathname - Current URL pathname
   * @param lang - Target language code
   * @returns Object containing missing translation keys and values
   */
  static generateMissingTranslations(pathname: string, lang: string): Record<string, string> {
    const segments = getPathSegments(pathname, lang);
    const missing: Record<string, string> = {};

    segments.forEach(segment => {
      const autoTitle = AutoTranslationSystem.getAutoTranslation(segment, lang);
      const autoSEO = AutoTranslationSystem.generateAutoSEO(segment, lang);

      // Navigation and page title translations
      missing[`nav.${segment}`] = autoTitle;
      missing[`pages.${segment}.title`] = autoTitle;
      
      // SEO-related translations
      missing[`pages.${segment}.seo.description`] = autoSEO.description;
      missing[`pages.${segment}.seo.keywords`] = autoSEO.keywords;
    });

    return missing;
  }

  /**
   * Console helper for developers - logs missing translations
   * @param pathname - Current URL pathname  
   * @param lang - Target language code
   */
  static logMissingTranslations(pathname: string, lang: string): void {
    if (process.env.NODE_ENV !== 'development') return;

    const missing = this.generateMissingTranslations(pathname, lang);
    if (Object.keys(missing).length > 0) {
      console.group(`🌍 Missing translations for ${pathname} (${lang})`);
      console.log('Add these to your language files:');
      console.log(JSON.stringify(missing, null, 2));
      console.groupEnd();
    }
  }

  /**
   * Generates a complete language file template for a new language
   * @param templateLang - Language to base the template on (default: 'en')
   * @param targetLang - Target language code for the new template
   * @returns Complete language file structure
   */
  static generateLanguageTemplate(templateLang = 'en', targetLang: string): Record<string, any> {
    // This would ideally load from an existing language file
    // For now, providing a basic structure
    const baseTemplate = {
      nav: {
        home: AutoTranslationSystem.getAutoTranslation('home', targetLang),
        services: AutoTranslationSystem.getAutoTranslation('services', targetLang),
        products: AutoTranslationSystem.getAutoTranslation('products', targetLang),
        government: AutoTranslationSystem.getAutoTranslation('government', targetLang),
        eLearning: AutoTranslationSystem.getAutoTranslation('elearning', targetLang),
        compliance: AutoTranslationSystem.getAutoTranslation('compliance', targetLang),
        about: AutoTranslationSystem.getAutoTranslation('about', targetLang),
        contact: AutoTranslationSystem.getAutoTranslation('contact', targetLang)
      },
      pages: {
        home: {
          title: AutoTranslationSystem.getAutoTranslation('home', targetLang),
          seo: AutoTranslationSystem.generateAutoSEO('home', targetLang)
        },
        services: {
          title: AutoTranslationSystem.getAutoTranslation('services', targetLang),
          seo: AutoTranslationSystem.generateAutoSEO('services', targetLang)
        },
        products: {
          title: AutoTranslationSystem.getAutoTranslation('products', targetLang),
          seo: AutoTranslationSystem.generateAutoSEO('products', targetLang)
        },
        government: {
          title: AutoTranslationSystem.getAutoTranslation('government', targetLang),
          seo: AutoTranslationSystem.generateAutoSEO('government', targetLang)
        },
        elearning: {
          title: AutoTranslationSystem.getAutoTranslation('elearning', targetLang),
          seo: AutoTranslationSystem.generateAutoSEO('elearning', targetLang)
        },
        compliance: {
          title: AutoTranslationSystem.getAutoTranslation('compliance', targetLang),
          seo: AutoTranslationSystem.generateAutoSEO('compliance', targetLang)
        },
        about: {
          title: AutoTranslationSystem.getAutoTranslation('about', targetLang),
          seo: AutoTranslationSystem.generateAutoSEO('about', targetLang)
        },
        contact: {
          title: AutoTranslationSystem.getAutoTranslation('contact', targetLang),
          seo: AutoTranslationSystem.generateAutoSEO('contact', targetLang)
        }
      },
      breadcrumb: {
        seo: {
          description: this.getBreadcrumbSEODescription(targetLang),
          keywords: this.getBreadcrumbSEOKeywords(targetLang)
        }
      }
    };

    return baseTemplate;
  }

  /**
   * Validates breadcrumb configuration for a given route
   * @param pathname - Route to validate
   * @param lang - Language to validate for
   * @param messages - Current language messages
   * @returns Validation result with suggestions
   */
  static validateBreadcrumbConfig(
    pathname: string, 
    lang: string, 
    messages: any
  ): {
    isValid: boolean;
    missing: string[];
    suggestions: Record<string, string>;
    warnings: string[];
  } {
    const segments = getPathSegments(pathname, lang);
    const missing: string[] = [];
    const suggestions: Record<string, string> = {};
    const warnings: string[] = [];

    segments.forEach(segment => {
      // Check for navigation translation
      const navKey = `nav.${segment}`;
      if (!this.getNestedValue(messages, navKey)) {
        missing.push(navKey);
        suggestions[navKey] = AutoTranslationSystem.getAutoTranslation(segment, lang);
      }

      // Check for page title
      const titleKey = `pages.${segment}.title`;
      if (!this.getNestedValue(messages, titleKey)) {
        missing.push(titleKey);
        suggestions[titleKey] = AutoTranslationSystem.getAutoTranslation(segment, lang);
      }

      // Check for SEO description
      const descKey = `pages.${segment}.seo.description`;
      if (!this.getNestedValue(messages, descKey)) {
        missing.push(descKey);
        const autoSEO = AutoTranslationSystem.generateAutoSEO(segment, lang);
        suggestions[descKey] = autoSEO.description;
      }

      // Check for SEO keywords
      const keywordsKey = `pages.${segment}.seo.keywords`;
      if (!this.getNestedValue(messages, keywordsKey)) {
        missing.push(keywordsKey);
        const autoSEO = AutoTranslationSystem.generateAutoSEO(segment, lang);
        suggestions[keywordsKey] = autoSEO.keywords;
      }
    });

    // Add warnings for auto-generated content
    if (missing.length > 0) {
      warnings.push(`${missing.length} translation keys are missing and will use auto-generated content.`);
      warnings.push('Consider adding proper translations for better SEO and user experience.');
    }

    return {
      isValid: missing.length === 0,
      missing,
      suggestions,
      warnings
    };
  }

  /**
   * Helper to safely access nested object properties
   */
  private static getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => {
      return current && typeof current === 'object' ? current[key] : undefined;
    }, obj);
  }

  /**
   * Gets breadcrumb SEO description for a language
   */
  private static getBreadcrumbSEODescription(lang: string): string {
    const descriptions = {
      en: 'Navigate through our website structure',
      fr: 'Naviguez dans la structure de notre site web',
      es: 'Navega por la estructura de nuestro sitio web'
    };
    return descriptions[lang as keyof typeof descriptions] || descriptions.en;
  }

  /**
   * Gets breadcrumb SEO keywords for a language
   */
  private static getBreadcrumbSEOKeywords(lang: string): string {
    const keywords = {
      en: 'navigation, breadcrumb, site structure, ISSI',
      fr: 'navigation, fil d\'ariane, structure du site, ISSI',
      es: 'navegación, migas de pan, estructura del sitio, ISSI'
    };
    return keywords[lang as keyof typeof keywords] || keywords.en;
  }

  /**
   * Performance helper - analyzes breadcrumb rendering performance
   */
  static measureBreadcrumbPerformance(callback: () => void): number {
    if (process.env.NODE_ENV !== 'development') {
      callback();
      return 0;
    }

    const start = performance.now();
    callback();
    const end = performance.now();
    const duration = end - start;

    if (duration > 10) {
      console.warn(`🐌 Breadcrumb rendering took ${duration.toFixed(2)}ms - consider optimization`);
    }

    return duration;
  }
}
