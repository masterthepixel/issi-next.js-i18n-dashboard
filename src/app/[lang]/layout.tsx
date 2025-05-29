import { AnimatedBackground } from "@/components/AnimatedBackground";
import Content from "@/components/Content";
import FooterWrapper from "@/components/FooterWrapper";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/contexts/ThemeContext";

import { getUser } from "@/lib/data";
import { Locale } from "@/lib/definitions";

import { i18n } from "../../../i18n-config";

import "@/app/globals.css";

export const metadata = {
  title: "ISSI - International Software Systems International",
  description: "International Software Systems International official website",
};

interface Props {
  params: { lang: Locale };
  children: React.ReactNode;
}

export default async function Root({ params, children }: Props) {
  const user = await getUser();  return (
    <html lang={params.lang} className="h-full">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var storageTheme = localStorage.getItem('theme');
                  var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  if (storageTheme === 'dark' || (!storageTheme && systemPrefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  console.error('Failed to apply dark mode on load:', e);
                }
              })();
            `
          }}
        />
      </head>      <body className="relative min-h-screen overflow-y-auto grid-background-with-fade flex flex-col">
        <ThemeProvider>
          <AnimatedBackground />
          <Navbar locale={params.lang} user={user} />
          <Content>{children}</Content>
          <FooterWrapper locale={params.lang} />
        </ThemeProvider>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
