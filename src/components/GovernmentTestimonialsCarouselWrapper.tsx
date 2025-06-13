"use client";

import { IntlProvider } from "react-intl";
import GovernmentTestimonialsCarousel from "@/components/GovernmentTestimonialsCarousel";
import { Locale } from "@/lib/definitions";

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
