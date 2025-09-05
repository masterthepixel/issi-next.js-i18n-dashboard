import LoginForm from "@/components/auth/LoginForm";
import { Locale } from "@/lib/definitions";
import { Suspense } from "react";

interface LoginPageProps {
    params: {
        lang: Locale;
    };
}

export default function LoginPage({ params: { lang } }: LoginPageProps) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm lang={lang} />
        </Suspense>
    );
}