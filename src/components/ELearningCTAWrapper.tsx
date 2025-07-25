"use client";

import ELearningCTA from "@/components/ELearningCTA";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

interface ELearningCTAWrapperProps {
    locale: Locale;
    messages: Record<string, string>;
}

export default function ELearningCTAWrapper({ locale, messages }: ELearningCTAWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <ELearningCTA />
        </IntlProvider>
    );
}
