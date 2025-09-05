import ClientLayout from "@/components/ClientLayout";
import React from 'react';

import { fontClassNames } from "@/app/fonts";
import { getUser } from "@/lib/data";
import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";
import { defaultMetadata } from "@/lib/metadata";

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

  return (
    <html lang={lang} className={`h-full ${fontClassNames}`}>
      <head />
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
