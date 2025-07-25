"use client";

import GovernmentHero from "@/components/GovernmentHero";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

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
