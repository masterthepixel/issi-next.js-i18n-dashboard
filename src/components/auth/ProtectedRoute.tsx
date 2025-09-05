"use client";

import { authService } from "@/lib/auth";
import { Locale } from "@/lib/definitions";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
    lang: Locale;
    requiredUserType?: "JOB_SEEKER" | "COMPANY";
    requireOnboarding?: boolean;
}

export default function ProtectedRoute({
    children,
    lang,
    requiredUserType,
    requireOnboarding = false,
}: ProtectedRouteProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const token = authService.getToken();
            const user = authService.getUser();

            if (!token || !user) {
                router.push(`/${lang}/auth`);
                return;
            }

            // Validate session with server
            const isValid = await authService.validateSession();
            if (!isValid) {
                authService.logout();
                router.push(`/${lang}/auth`);
                return;
            }

            // Check user type if required
            if (requiredUserType && user.userType !== requiredUserType) {
                router.push(`/${lang}/auth`);
                return;
            }

            // Check onboarding completion if required
            if (requireOnboarding && !user.onboardingCompleted) {
                if (user.userType === "JOB_SEEKER") {
                    router.push(`/${lang}/profile/setup`);
                } else {
                    router.push(`/${lang}/company/setup`);
                }
                return;
            }

            setIsAuthenticated(true);
            setIsLoading(false);
        };

        checkAuth();
    }, [lang, requiredUserType, requireOnboarding, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">Verifying authentication...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // Will redirect in useEffect
    }

    return <>{children}</>;
}