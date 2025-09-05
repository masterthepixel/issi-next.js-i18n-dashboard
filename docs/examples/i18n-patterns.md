# Internationalization Patterns 🌍

This document provides examples of internationalization (i18n) patterns used in the ISSI Next.js i18n Dashboard, including client-side and server-side implementations, custom hooks, and middleware configurations.

## 🌐 Next.js i18n Configuration

### next-i18next Configuration

```typescript
// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es", "fr"],
    localeDetection: true,
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
  serializeConfig: false,
};
```

### Next.js Config with i18n

```typescript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "es", "fr"],
    defaultLocale: "en",
    localeDetection: true,
  },
  experimental: {
    serverComponentsExternalPackages: ["@payloadcms/db-postgres"],
  },
  images: {
    domains: ["localhost"],
  },
};

export default nextConfig;
```

## 🗂️ Custom i18n Implementation

### i18n Context Provider

```typescript
// contexts/I18nContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Locale = "en" | "es" | "fr";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, any>) => string;
  isLoading: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({
  children,
  initialLocale = "en",
}: {
  children: React.ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTranslations(locale);
  }, [locale]);

  const loadTranslations = async (targetLocale: Locale) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/translations/${targetLocale}`);
      const data = await response.json();
      setTranslations(data);
    } catch (error) {
      console.error("Failed to load translations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    // Update URL without page reload
    const url = new URL(window.location.href);
    url.pathname = url.pathname.replace(/^\/[a-z]{2}/, `/${newLocale}`);
    window.history.replaceState({}, "", url.toString());
  };

  const t = (key: string, params?: Record<string, any>): string => {
    const keys = key.split(".");
    let value = translations;

    for (const k of keys) {
      value = value?.[k];
    }

    if (typeof value !== "string") {
      return key; // Fallback to key if translation not found
    }

    // Simple parameter replacement
    if (params) {
      return Object.entries(params).reduce(
        (str, [paramKey, paramValue]) => str.replace(new RegExp(`{{${paramKey}}}`, "g"), String(paramValue)),
        value
      );
    }

    return value;
  };

  return <I18nContext.Provider value={{ locale, setLocale, t, isLoading }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
```

### Translation Files Structure

```typescript
// translations/en.ts
export const en = {
  common: {
    loading: "Loading...",
    error: "An error occurred",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    view: "View",
    back: "Back",
    next: "Next",
    previous: "Previous",
  },
  navigation: {
    home: "Home",
    blog: "Blog",
    about: "About",
    contact: "Contact",
  },
  blog: {
    title: "Blog",
    readMore: "Read More",
    publishedAt: "Published on {{date}}",
    author: "By {{author}}",
    categories: "Categories",
    tags: "Tags",
    relatedPosts: "Related Posts",
    noPosts: "No posts found",
  },
  forms: {
    required: "This field is required",
    email: "Please enter a valid email",
    minLength: "Must be at least {{min}} characters",
    maxLength: "Must be no more than {{max}} characters",
  },
};

// translations/es.ts
export const es = {
  common: {
    loading: "Cargando...",
    error: "Ocurrió un error",
    save: "Guardar",
    cancel: "Cancelar",
    delete: "Eliminar",
    edit: "Editar",
    view: "Ver",
    back: "Atrás",
    next: "Siguiente",
    previous: "Anterior",
  },
  navigation: {
    home: "Inicio",
    blog: "Blog",
    about: "Acerca de",
    contact: "Contacto",
  },
  blog: {
    title: "Blog",
    readMore: "Leer Más",
    publishedAt: "Publicado el {{date}}",
    author: "Por {{author}}",
    categories: "Categorías",
    tags: "Etiquetas",
    relatedPosts: "Publicaciones Relacionadas",
    noPosts: "No se encontraron publicaciones",
  },
  forms: {
    required: "Este campo es obligatorio",
    email: "Por favor ingrese un email válido",
    minLength: "Debe tener al menos {{min}} caracteres",
    maxLength: "No debe tener más de {{max}} caracteres",
  },
};

// translations/fr.ts
export const fr = {
  common: {
    loading: "Chargement...",
    error: "Une erreur s'est produite",
    save: "Enregistrer",
    cancel: "Annuler",
    delete: "Supprimer",
    edit: "Modifier",
    view: "Voir",
    back: "Retour",
    next: "Suivant",
    previous: "Précédent",
  },
  navigation: {
    home: "Accueil",
    blog: "Blog",
    about: "À Propos",
    contact: "Contact",
  },
  blog: {
    title: "Blog",
    readMore: "Lire Plus",
    publishedAt: "Publié le {{date}}",
    author: "Par {{author}}",
    categories: "Catégories",
    tags: "Étiquettes",
    relatedPosts: "Articles Connexes",
    noPosts: "Aucun article trouvé",
  },
  forms: {
    required: "Ce champ est obligatoire",
    email: "Veuillez saisir un email valide",
    minLength: "Doit contenir au moins {{min}} caractères",
    maxLength: "Ne doit pas dépasser {{max}} caractères",
  },
};
```

## 🪝 Custom i18n Hooks

### useTranslation Hook

```typescript
// hooks/useTranslation.ts
"use client";

import { useI18n } from "@/contexts/I18nContext";

export function useTranslation(namespace?: string) {
  const { t, locale, setLocale, isLoading } = useI18n();

  const tScoped = (key: string, params?: Record<string, any>) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    return t(fullKey, params);
  };

  return {
    t: tScoped,
    locale,
    setLocale,
    isLoading,
  };
}
```

### useLocalizedRoute Hook

```typescript
// hooks/useLocalizedRoute.ts
"use client";

import { usePathname, useRouter } from "next/navigation";
import { useI18n } from "@/contexts/I18nContext";

export function useLocalizedRoute() {
  const pathname = usePathname();
  const router = useRouter();
  const { locale, setLocale } = useI18n();

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/").filter(Boolean);
    const currentLocale = segments[0];

    if (["en", "es", "fr"].includes(currentLocale)) {
      segments[0] = newLocale;
    } else {
      segments.unshift(newLocale);
    }

    const newPath = "/" + segments.join("/");
    router.push(newPath);
    setLocale(newLocale as any);
  };

  const getLocalizedPath = (path: string, targetLocale?: string) => {
    const target = targetLocale || locale;
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;

    if (cleanPath === "") return `/${target}`;

    return `/${target}/${cleanPath}`;
  };

  return {
    switchLocale,
    getLocalizedPath,
    currentLocale: locale,
  };
}
```

### useDateFormatter Hook

```typescript
// hooks/useDateFormatter.ts
"use client";

import { useMemo } from "react";
import { useI18n } from "@/contexts/I18nContext";

export function useDateFormatter() {
  const { locale } = useI18n();

  const formatDate = useMemo(() => {
    return (date: Date | string, options?: Intl.DateTimeFormatOptions) => {
      const dateObj = typeof date === "string" ? new Date(date) : date;

      return new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
        ...options,
      }).format(dateObj);
    };
  }, [locale]);

  const formatRelativeTime = useMemo(() => {
    return (date: Date | string) => {
      const dateObj = typeof date === "string" ? new Date(date) : date;
      const now = new Date();
      const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

      const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

      if (diffInSeconds < 60) return rtf.format(-diffInSeconds, "second");
      if (diffInSeconds < 3600) return rtf.format(-Math.floor(diffInSeconds / 60), "minute");
      if (diffInSeconds < 86400) return rtf.format(-Math.floor(diffInSeconds / 3600), "hour");
      if (diffInSeconds < 604800) return rtf.format(-Math.floor(diffInSeconds / 86400), "day");

      return formatDate(dateObj);
    };
  }, [locale, formatDate]);

  return {
    formatDate,
    formatRelativeTime,
  };
}
```

## 🧩 i18n Components

### Language Switcher Component

```typescript
// components/LanguageSwitcher.tsx
"use client";

import { useState } from "react";
import { useLocalizedRoute } from "@/hooks/useLocalizedRoute";
import { useTranslation } from "@/hooks/useTranslation";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

export function LanguageSwitcher() {
  const { t } = useTranslation("common");
  const { switchLocale, currentLocale } = useLocalizedRoute();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find((lang) => lang.code === currentLocale);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <span>{currentLanguage?.flag}</span>
        <span>{currentLanguage?.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  switchLocale(language.code);
                  setIsOpen(false);
                }}
                className={`flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 ${
                  language.code === currentLocale ? "bg-blue-50 text-blue-700" : "text-gray-700"
                }`}
              >
                <span className="mr-3">{language.flag}</span>
                <span>{language.name}</span>
                {language.code === currentLocale && (
                  <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

### Localized Rich Text Component

```typescript
// components/LocalizedRichText.tsx
"use client";

import { useMemo } from "react";
import { useI18n } from "@/contexts/I18nContext";

interface LocalizedRichTextProps {
  content: {
    en?: any;
    es?: any;
    fr?: any;
  };
  className?: string;
}

export function LocalizedRichText({ content, className = "" }: LocalizedRichTextProps) {
  const { locale } = useI18n();

  const localizedContent = useMemo(() => {
    return content[locale] || content.en || "";
  }, [content, locale]);

  // Simple HTML rendering (in production, use a proper rich text renderer)
  return (
    <div className={`prose prose-lg max-w-none ${className}`} dangerouslySetInnerHTML={{ __html: localizedContent }} />
  );
}
```

### Form Field with Validation Messages

```typescript
// components/LocalizedFormField.tsx
"use client";

import { useTranslation } from "@/hooks/useTranslation";

interface LocalizedFormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export function LocalizedFormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  placeholder,
  className = "",
}: LocalizedFormFieldProps) {
  const { t } = useTranslation("forms");

  return (
    <div className={`space-y-1 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {t(label)}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ? t(placeholder) : undefined}
        required={required}
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error ? "border-red-300" : "border-gray-300"
        }`}
      />

      {error && <p className="text-sm text-red-600">{t(error)}</p>}
    </div>
  );
}
```

## 🌐 Server-Side i18n

### API Route for Translations

```typescript
// app/api/translations/[locale]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { en } from "@/translations/en";
import { es } from "@/translations/es";
import { fr } from "@/translations/fr";

const translations = {
  en,
  es,
  fr,
};

export async function GET(request: NextRequest, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  if (!translations[locale as keyof typeof translations]) {
    return NextResponse.json({ error: "Locale not found" }, { status: 404 });
  }

  return NextResponse.json(translations[locale as keyof typeof translations]);
}
```

### Localized API Responses

```typescript
// lib/api-responses.ts
import { en } from "@/translations/en";
import { es } from "@/translations/es";
import { fr } from "@/translations/fr";

const translations = { en, es, fr };

export function getLocalizedMessage(key: string, locale: string = "en", params?: Record<string, any>): string {
  const localeTranslations = translations[locale as keyof typeof translations] || translations.en;

  const keys = key.split(".");
  let message = localeTranslations;

  for (const k of keys) {
    message = message?.[k];
  }

  if (typeof message !== "string") {
    return key;
  }

  if (params) {
    return Object.entries(params).reduce(
      (str, [paramKey, paramValue]) => str.replace(new RegExp(`{{${paramKey}}}`, "g"), String(paramValue)),
      message
    );
  }

  return message;
}

export function createApiResponse(success: boolean, messageKey: string, data?: any, locale: string = "en") {
  const message = getLocalizedMessage(messageKey, locale);

  return {
    success,
    message,
    data,
    timestamp: new Date().toISOString(),
  };
}
```

## 🛡️ Middleware for i18n

### i18n Middleware

```typescript
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "es", "fr"];
const defaultLocale = "en";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the pathname starts with a locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect to default locale if no locale is present
  const locale = getLocaleFromRequest(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}

function getLocaleFromRequest(request: NextRequest): string {
  // Check for locale in cookies
  const cookieLocale = request.cookies.get("locale")?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // Check for locale in Accept-Language header
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim().split("-")[0])
      .find((lang) => locales.includes(lang));

    if (preferredLocale) {
      return preferredLocale;
    }
  }

  return defaultLocale;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
```

## 📱 Client-Side Routing

### Localized Link Component

```typescript
// components/LocalizedLink.tsx
"use client";

import Link from "next/link";
import { useLocalizedRoute } from "@/hooks/useLocalizedRoute";

interface LocalizedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  locale?: string;
}

export function LocalizedLink({ href, children, className, locale, ...props }: LocalizedLinkProps) {
  const { getLocalizedPath } = useLocalizedRoute();

  const localizedHref = getLocalizedPath(href, locale);

  return (
    <Link href={localizedHref} className={className} {...props}>
      {children}
    </Link>
  );
}
```

### Localized Navigation

```typescript
// components/LocalizedNavigation.tsx
"use client";

import { LocalizedLink } from "./LocalizedLink";
import { useTranslation } from "@/hooks/useTranslation";

const navigationItems = [
  { href: "/", key: "home" },
  { href: "/blog", key: "blog" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
];

export function LocalizedNavigation() {
  const { t } = useTranslation("navigation");

  return (
    <nav className="flex space-x-6">
      {navigationItems.map((item) => (
        <LocalizedLink key={item.key} href={item.href} className="text-gray-700 hover:text-blue-600 transition-colors">
          {t(item.key)}
        </LocalizedLink>
      ))}
    </nav>
  );
}
```

---

**Last Updated**: September 2, 2025
**Examples**: Next.js i18n config, Custom i18n context, Translation hooks, i18n components, Server-side i18n, Middleware, Client-side routing
