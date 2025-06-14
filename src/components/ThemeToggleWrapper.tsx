'use client'

import ThemeToggle from "@/components/ThemeToggle";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

interface ThemeToggleWrapperProps {
  locale: Locale;
  messages: Record<string, string>;
}

export default function ThemeToggleWrapper({ locale, messages }: ThemeToggleWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
        <ThemeToggle />
    </IntlProvider>
  );
}
