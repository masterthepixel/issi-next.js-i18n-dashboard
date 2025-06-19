/**
 * Auto Translation System
 * Provides intelligent fallbacks for missing translations and automatic SEO generation
 */

type SupportedLanguage = 'en' | 'fr' | 'es';

interface TranslationEntry {
  en: string;
  fr: string;
  es: string;
}

interface TranslationMap {
  [key: string]: TranslationEntry;
}

interface AutoSEOContent {
  description: string;
  keywords: string;
}

export class AutoTranslationSystem {
  /**
   * Predefined translations for common technology and business terms
   */
  private static translationMap: TranslationMap = {
    // Technology Terms
    'api': { en: 'API', fr: 'API', es: 'API' },
    'dashboard': { en: 'Dashboard', fr: 'Tableau de Bord', es: 'Panel de Control' },
    'analytics': { en: 'Analytics', fr: 'Analytique', es: 'Analítica' },
    'reports': { en: 'Reports', fr: 'Rapports', es: 'Informes' },
    'settings': { en: 'Settings', fr: 'Paramètres', es: 'Configuración' },
    'profile': { en: 'Profile', fr: 'Profil', es: 'Perfil' },
    'documentation': { en: 'Documentation', fr: 'Documentation', es: 'Documentación' },
    'support': { en: 'Support', fr: 'Support', es: 'Soporte' },
    'training': { en: 'Training', fr: 'Formation', es: 'Formación' },
    'consulting': { en: 'Consulting', fr: 'Conseil', es: 'Consultoría' },
    
    // Business Terms
    'portal': { en: 'Portal', fr: 'Portail', es: 'Portal' },
    'platform': { en: 'Platform', fr: 'Plateforme', es: 'Plataforma' },
    'solutions': { en: 'Solutions', fr: 'Solutions', es: 'Soluciones' },
    'resources': { en: 'Resources', fr: 'Ressources', es: 'Recursos' },
    'download': { en: 'Download', fr: 'Télécharger', es: 'Descargar' },
    'upload': { en: 'Upload', fr: 'Téléverser', es: 'Subir' },
    'management': { en: 'Management', fr: 'Gestion', es: 'Gestión' },
    'administration': { en: 'Administration', fr: 'Administration', es: 'Administración' },
    
    // Common Pages
    'help': { en: 'Help', fr: 'Aide', es: 'Ayuda' },
    'faq': { en: 'FAQ', fr: 'FAQ', es: 'FAQ' },
    'news': { en: 'News', fr: 'Actualités', es: 'Noticias' },
    'blog': { en: 'Blog', fr: 'Blog', es: 'Blog' },
    'careers': { en: 'Careers', fr: 'Carrières', es: 'Carreras' },
    'team': { en: 'Team', fr: 'Équipe', es: 'Equipo' },
    'history': { en: 'History', fr: 'Histoire', es: 'Historia' },
    'mission': { en: 'Mission', fr: 'Mission', es: 'Misión' },
    'vision': { en: 'Vision', fr: 'Vision', es: 'Visión' },
    'values': { en: 'Values', fr: 'Valeurs', es: 'Valores' }
  };

  /**
   * Gets automatic translation for a segment, with intelligent fallbacks
   * @param segment - URL segment to translate
   * @param lang - Target language code
   * @returns Translated string
   */
  static getAutoTranslation(segment: string, lang: string): string {
    const supportedLang = this.getSupportedLanguage(lang);
    
    // Check if we have a predefined translation
    const translation = this.translationMap[segment.toLowerCase()];
    if (translation) {
      return translation[supportedLang];
    }

    // Handle compound terms (e.g., "customer-portal" → "customer portal")
    const parts = segment.split('-');
    if (parts.length > 1) {
      const translatedParts = parts.map(part => {
        const partTranslation = this.translationMap[part.toLowerCase()];
        return partTranslation 
          ? partTranslation[supportedLang]
          : part.charAt(0).toUpperCase() + part.slice(1);
      });
      return translatedParts.join(' ');
    }

    // Fallback to slug-to-title conversion
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Generates automatic SEO content for pages
   * @param segment - URL segment for the page
   * @param lang - Target language code
   * @returns SEO content object with description and keywords
   */
  static generateAutoSEO(segment: string, lang: string): AutoSEOContent {
    const supportedLang = this.getSupportedLanguage(lang);
    const title = this.getAutoTranslation(segment, lang);
    
    const seoTemplates: Record<SupportedLanguage, AutoSEOContent> = {
      en: {
        description: `Discover ${title.toLowerCase()} solutions and services at ISSI. Professional technology services tailored to your business needs.`,
        keywords: `${title.toLowerCase()}, ISSI, technology solutions, business services, enterprise solutions`
      },
      fr: {
        description: `Découvrez les solutions ${title.toLowerCase()} chez ISSI. Services technologiques professionnels adaptés à vos besoins d'entreprise.`,
        keywords: `${title.toLowerCase()}, ISSI, solutions technologiques, services d'entreprise, solutions d'entreprise`
      },
      es: {
        description: `Descubre las soluciones ${title.toLowerCase()} en ISSI. Servicios tecnológicos profesionales adaptados a sus necesidades empresariales.`,
        keywords: `${title.toLowerCase()}, ISSI, soluciones tecnológicas, servicios empresariales, soluciones empresariales`
      }
    };

    return seoTemplates[supportedLang];
  }

  /**
   * Ensures the language is supported, defaults to English
   * @param lang - Language code to validate
   * @returns Valid supported language code
   */
  private static getSupportedLanguage(lang: string): SupportedLanguage {
    const supportedLanguages: SupportedLanguage[] = ['en', 'fr', 'es'];
    return supportedLanguages.includes(lang as SupportedLanguage) ? lang as SupportedLanguage : 'en';
  }

  /**
   * Adds new translation mappings (for extending the system)
   * @param mappings - Object containing new translation mappings
   */
  static addTranslationMappings(mappings: TranslationMap): void {
    this.translationMap = { ...this.translationMap, ...mappings };
  }

  /**
   * Gets all available translation mappings (for debugging)
   * @returns Complete translation map
   */
  static getTranslationMap(): TranslationMap {
    return { ...this.translationMap };
  }
}
