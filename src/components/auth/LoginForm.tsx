"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { authService, getDashboardRoute } from "@/lib/auth";
import { Locale } from "@/lib/definitions";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface LoginFormProps {
    lang: Locale;
}

export default function LoginForm({ lang }: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();

    const translations = {
        en: {
            title: "Welcome Back",
            subtitle: "Sign in to your account",
            email: "Email",
            password: "Password",
            signIn: "Sign In",
            signingIn: "Signing In...",
            forgotPassword: "Forgot your password?",
            noAccount: "Don't have an account?",
            signUp: "Sign up",
            or: "or",
            continueAsGuest: "Continue as Guest",
            emailRequired: "Email is required",
            passwordRequired: "Password is required",
            invalidCredentials: "Invalid email or password",
            signInError: "Failed to sign in. Please try again."
        },
        fr: {
            title: "Bienvenue",
            subtitle: "Connectez-vous à votre compte",
            email: "Email",
            password: "Mot de passe",
            signIn: "Se connecter",
            signingIn: "Connexion...",
            forgotPassword: "Mot de passe oublié ?",
            noAccount: "Pas de compte ?",
            signUp: "S'inscrire",
            or: "ou",
            continueAsGuest: "Continuer en tant qu'invité",
            emailRequired: "L'email est requis",
            passwordRequired: "Le mot de passe est requis",
            invalidCredentials: "Email ou mot de passe invalide",
            signInError: "Échec de la connexion. Veuillez réessayer."
        },
        es: {
            title: "Bienvenido de Vuelta",
            subtitle: "Inicia sesión en tu cuenta",
            email: "Correo electrónico",
            password: "Contraseña",
            signIn: "Iniciar Sesión",
            signingIn: "Iniciando Sesión...",
            forgotPassword: "¿Olvidaste tu contraseña?",
            noAccount: "¿No tienes cuenta?",
            signUp: "Regístrate",
            or: "o",
            continueAsGuest: "Continuar como Invitado",
            emailRequired: "El correo electrónico es requerido",
            passwordRequired: "La contraseña es requerida",
            invalidCredentials: "Correo electrónico o contraseña inválidos",
            signInError: "Error al iniciar sesión. Por favor, inténtalo de nuevo."
        }
    };

    const t = (key: keyof typeof translations.en): string => {
        const localeTranslations = translations[lang];
        if (localeTranslations && key in localeTranslations) {
            return localeTranslations[key as keyof typeof localeTranslations] as string;
        }
        return translations.en[key];
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email.trim()) {
            setError(t("emailRequired"));
            return;
        }

        if (!password) {
            setError(t("passwordRequired"));
            return;
        }

        setIsLoading(true);

        try {
            const result = await authService.login({
                email: email.trim(),
                password,
            });

            if (!result.success) {
                throw new Error(result.message || t("invalidCredentials"));
            }

            // Redirect based on user type or to dashboard
            const user = result.user;
            if (user) {
                const redirectTo = searchParams.get("redirect") || getDashboardRoute(user.userType, lang);
                router.push(redirectTo);
            } else {
                router.push(`/${lang}`);
            }

        } catch (err) {
            setError(err instanceof Error ? err.message : t("signInError"));
        } finally {
            setIsLoading(false);
        }
    };

    const handleGuestContinue = () => {
        // For guest access, redirect to main site
        router.push(`/${lang}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">{t("title")}</CardTitle>
                    <CardDescription>{t("subtitle")}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">{t("email")}</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                disabled={isLoading}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">{t("password")}</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    disabled={isLoading}
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={isLoading}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {t("signingIn")}
                                </>
                            ) : (
                                t("signIn")
                            )}
                        </Button>
                    </form>

                    <div className="text-center">
                        <Link
                            href={`/${lang}/auth/forgot-password`}
                            className="" text-caption8704
                        >
                            {t("forgotPassword")}
                        </Link>
                    </div>

                    <Separator />

                    <div className="text-center space-y-2">
                        <p className="" text-caption9044 text-muted-foreground9044>
                            {t("noAccount")}{" "}
                            <Link
                                href={`/${lang}/auth/onboarding`}
                                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
                            >
                                {t("signUp")}
                            </Link>
                        </p>

                        <Separator />

                        <Button
                            variant="outline"
                            onClick={handleGuestContinue}
                            className="w-full"
                        >
                            {t("continueAsGuest")}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}