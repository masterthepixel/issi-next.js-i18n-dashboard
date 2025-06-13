"use client";

import GovernmentTestimonial from "@/components/GovernmentTestimonial";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

interface GovernmentTestimonialWrapperProps {
    locale: Locale;
    messages: Record<string, string>;
}

export default function GovernmentTestimonialWrapper({ locale, messages }: GovernmentTestimonialWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <GovernmentTestimonial />
        </IntlProvider>
    );
}
