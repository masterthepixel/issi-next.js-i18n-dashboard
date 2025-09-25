'use client';

import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";
import ISSIAppleCardsCarousel from "./ISSIAppleCardsCarousel";

interface ISSIAppleCardsCarouselWrapperProps {
    locale: Locale;
    messages: Record<string, string>;
}

export default function ISSIAppleCardsCarouselWrapper({ locale, messages }: ISSIAppleCardsCarouselWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <ISSIAppleCardsCarousel />
        </IntlProvider>
    );
}
