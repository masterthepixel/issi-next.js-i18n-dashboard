"use client";

import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";
import ELearningHero from "./ELearningHero";

interface ELearningHeroWrapperProps {
    locale: Locale;
    messages: Record<string, string>;
}

export default function ELearningHeroWrapper({ locale, messages }: ELearningHeroWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <ELearningHero />
        </IntlProvider>
    );
}
