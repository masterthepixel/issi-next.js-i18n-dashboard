/* eslint-disable @next/next/no-page-custom-font */
import ClientLayout from "@/components/ClientLayout";
import React from 'react';

import { fontClassNames } from "@/app/fonts";
import { getUser } from "@/lib/data";
import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";
import { defaultMetadata } from "@/lib/metadata";
import { criticalCssOptimizer } from "@/lib/critical-css";

import { i18n } from "../../../i18n-config";

import "@/styles/globals.css";

export const metadata = defaultMetadata;

interface Props {
  params: { lang: Locale };
  children: React.ReactNode;
}

export default async function Root({ params, children }: Props) {
  const { lang } = await params;
  const _user = await getUser();
  const intl = await getIntl(lang);
  const messages = (await import(`../../lang/${lang}.json`)).default;

  // Generate critical CSS for above-the-fold content
  const criticalCss = criticalCssOptimizer.getCriticalCssForComponents(['hero', 'navigation', 'buttons']);

  return (
    <html lang={lang} className={`h-full ${fontClassNames}`}>
      <head>
        {/* Critical CSS - Inline for fastest rendering */}
        <style dangerouslySetInnerHTML={{ __html: criticalCss }} />

        {/* Font preloading for critical fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700;800&display=swap"
          as="style"
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;1,400&display=swap"
          as="style"
        />

        {/* Performance optimizations */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://tailwindcss.com" />
        <link rel="dns-prefetch" href="https://issi-dashboard-payloadcms.vercel.app" />

        {/* Critical CSS inlining hint */}
        <link rel="preload" href="/images/project-app-screenshot.png" as="image" fetchPriority="high" />

        {/* Reduce render blocking */}
        <link rel="preload" href="/_next/static/css/app/layout.css" as="style" />
        <link rel="modulepreload" href="/_next/static/chunks/main.js" />

        {/* Viewport optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

        {/* Performance hints */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta name="format-detection" content="telephone=no" />

        {/* Reduce layout shift */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .debug-screens { contain: layout style; }
            .grid-background-with-fade { contain-intrinsic-size: 100vw 100vh; }
          `
        }} />
      </head>
      <body className="relative min-h-screen overflow-y-auto overflow-x-visible grid-background-with-fade flex flex-col debug-screens">
        <ClientLayout
          lang={lang}
          messages={messages}
          intlMessages={intl.messages}
        >
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
