"use client";

import { IntlProvider } from "react-intl";
import GovernmentHero from "@/components/GovernmentHero";
import { Locale } from "@/lib/definitions";

interface GovernmentHeroWrapperProps {
    locale: Locale;
    messages: Record<string, string>;
}

export default function GovernmentHeroWrapper({ locale, messages }: GovernmentHeroWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <GovernmentHero />
        </IntlProvider>
    );
}
