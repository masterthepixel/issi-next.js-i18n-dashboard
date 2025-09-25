"use client";

import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";
import ELearningGallery from "./ELearningGallery";

interface ELearningGalleryWrapperProps {
    locale: Locale;
    messages: Record<string, string>;
}

export default function ELearningGalleryWrapper({ locale, messages }: ELearningGalleryWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <ELearningGallery />
        </IntlProvider>
    );
}
