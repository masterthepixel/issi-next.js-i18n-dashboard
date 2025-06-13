"use client";

import GovernmentTestimonialsCarousel from "@/components/GovernmentTestimonialsCarousel";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

interface GovernmentTestimonialsCarouselWrapperProps {
    locale: Locale;
    messages: Record<string, string>;
}

export default function GovernmentTestimonialsCarouselWrapper({ locale, messages }: GovernmentTestimonialsCarouselWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <GovernmentTestimonialsCarousel />
        </IntlProvider>
    );
}
