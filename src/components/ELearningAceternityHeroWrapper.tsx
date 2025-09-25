"use client";

import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";
import ELearningAceternityHero from "./ELearningAceternityHero";

interface ELearningAceternityHeroWrapperProps {
    locale: Locale;
    messages: Record<string, string>;
}

export default function ELearningAceternityHeroWrapper({ locale, messages }: ELearningAceternityHeroWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <ELearningAceternityHero />
        </IntlProvider>
    );
}
