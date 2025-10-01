import LoginForm from "@/components/auth/LoginForm";
import { Locale } from "@/lib/definitions";
import { Suspense } from "react";

interface LoginPageProps {
    params: Promise<{
        lang: Locale;
    }>;
}

export default async function LoginPage({ params }: LoginPageProps) {
    const { lang } = await params;
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm lang={lang} />
        </Suspense>
    );
}