"use client";

import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";
import AboutScrollStack from "./AboutScrollStack";

interface AboutScrollStackWrapperProps {
    locale: Locale;
    messages: Record<string, string>;
}

export default function AboutScrollStackWrapper({ locale, messages }: AboutScrollStackWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <AboutScrollStack />
        </IntlProvider>
    );
}
