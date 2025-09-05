import OnboardingForm from "@/components/auth/OnboardingForm";
import { Locale } from "@/lib/definitions";
import { Suspense } from "react";

interface OnboardingPageProps {
    params: {
        lang: Locale;
    };
}

export default function OnboardingPage({ params: { lang } }: OnboardingPageProps) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <OnboardingForm lang={lang} />
        </Suspense>
    );
}