'use client'

import { IntlProvider } from "react-intl";
import ThemeToggle from "@/components/ThemeToggle";
import { Locale } from "@/lib/definitions";
import { ThemeProvider } from "@/contexts/ThemeContext";

interface ThemeToggleWrapperProps {
  locale: Locale;
  messages: Record<string, string>;
}

export default function ThemeToggleWrapper({ locale, messages }: ThemeToggleWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    </IntlProvider>
  );
}
