"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { authService, getDashboardRoute } from "@/lib/auth";
import { Locale } from "@/lib/definitions";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface OnboardingFormProps {
    lang: Locale;
}

export default function OnboardingForm({ lang }: OnboardingFormProps) {
    const [userType, setUserType] = useState<"job_seeker" | "company" | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        // Job Seeker specific
        about: "",
        skills: "",
        experience: "",
        // Company specific
        companyName: "",
        industry: "",
        companySize: "",
        website: "",
        description: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();

    const translations = {
        en: {
            chooseRole: "Choose Your Role",
            roleDescription: "Select how you'd like to use our platform",
            jobSeeker: "Job Seeker",
            jobSeekerDesc: "Looking for your next opportunity",
            company: "Company",
            companyDesc: "Looking to hire talented professionals",
            createAccount: "Create Your Account",
            back: "Back",
            name: "Full Name",
            email: "Email",
            password: "Password",
            confirmPassword: "Confirm Password",
            signUp: "Sign Up",
            signingUp: "Creating Account...",
            alreadyHave: "Already have an account?",
            signIn: "Sign in",
            // Job Seeker fields
            about: "About Me",
            aboutPlaceholder: "Tell us about yourself and your career goals",
            skills: "Skills",
            skillsPlaceholder: "e.g. JavaScript, React, Node.js",
            experience: "Experience Level",
            experienceOptions: {
                junior: "Junior (0-2 years)",
                mid: "Mid-level (3-5 years)",
                senior: "Senior (6+ years)"
            },
            // Company fields
            companyName: "Company Name",
            industry: "Industry",
            industryPlaceholder: "e.g. Technology, Healthcare, Finance",
            companySize: "Company Size",
            companySizeOptions: {
                startup: "Startup (1-10 employees)",
                small: "Small (11-50 employees)",
                medium: "Medium (51-200 employees)",
                large: "Large (201+ employees)"
            },
            website: "Company Website (Optional)",
            description: "Company Description",
            descriptionPlaceholder: "Tell job seekers about your company",
            // Validation
            nameRequired: "Name is required",
            emailRequired: "Email is required",
            passwordRequired: "Password is required",
            passwordTooShort: "Password must be at least 6 characters",
            passwordMismatch: "Passwords don't match",
            signUpError: "Failed to create account. Please try again."
        },
        fr: {
            chooseRole: "Choisissez Votre Rôle",
            roleDescription: "Sélectionnez comment vous souhaitez utiliser notre plateforme",
            jobSeeker: "Demandeur d'Emploi",
            jobSeekerDesc: "À la recherche de votre prochaine opportunité",
            company: "Entreprise",
            companyDesc: "À la recherche de professionnels talentueux",
            createAccount: "Créer Votre Compte",
            back: "Retour",
            name: "Nom Complet",
            email: "Email",
            password: "Mot de Passe",
            confirmPassword: "Confirmer le Mot de Passe",
            signUp: "S'inscrire",
            signingUp: "Création du Compte...",
            alreadyHave: "Vous avez déjà un compte ?",
            signIn: "Se connecter",
            // Job Seeker fields
            about: "À Propos de Moi",
            aboutPlaceholder: "Parlez-nous de vous et de vos objectifs de carrière",
            skills: "Compétences",
            skillsPlaceholder: "ex. JavaScript, React, Node.js",
            experience: "Niveau d'Expérience",
            experienceOptions: {
                junior: "Junior (0-2 ans)",
                mid: "Intermédiaire (3-5 ans)",
                senior: "Senior (6+ ans)"
            },
            // Company fields
            companyName: "Nom de l'Entreprise",
            industry: "Industrie",
            industryPlaceholder: "ex. Technologie, Santé, Finance",
            companySize: "Taille de l'Entreprise",
            companySizeOptions: {
                startup: "Startup (1-10 employés)",
                small: "Petite (11-50 employés)",
                medium: "Moyenne (51-200 employés)",
                large: "Grande (201+ employés)"
            },
            website: "Site Web de l'Entreprise (Optionnel)",
            description: "Description de l'Entreprise",
            descriptionPlaceholder: "Parlez aux demandeurs d'emploi de votre entreprise",
            // Validation
            nameRequired: "Le nom est requis",
            emailRequired: "L'email est requis",
            passwordRequired: "Le mot de passe est requis",
            passwordTooShort: "Le mot de passe doit contenir au moins 6 caractères",
            passwordMismatch: "Les mots de passe ne correspondent pas",
            signUpError: "Échec de la création du compte. Veuillez réessayer."
        },
        es: {
            chooseRole: "Elige Tu Rol",
            roleDescription: "Selecciona cómo te gustaría usar nuestra plataforma",
            jobSeeker: "Buscador de Empleo",
            jobSeekerDesc: "Buscando tu próxima oportunidad",
            company: "Empresa",
            companyDesc: "Buscando contratar profesionales talentosos",
            createAccount: "Crear Tu Cuenta",
            back: "Atrás",
            name: "Nombre Completo",
            email: "Correo Electrónico",
            password: "Contraseña",
            confirmPassword: "Confirmar Contraseña",
            signUp: "Registrarse",
            signingUp: "Creando Cuenta...",
            alreadyHave: "¿Ya tienes una cuenta?",
            signIn: "Iniciar sesión",
            // Job Seeker fields
            about: "Acerca de Mí",
            aboutPlaceholder: "Cuéntanos sobre ti y tus objetivos profesionales",
            skills: "Habilidades",
            skillsPlaceholder: "ej. JavaScript, React, Node.js",
            experience: "Nivel de Experiencia",
            experienceOptions: {
                junior: "Junior (0-2 años)",
                mid: "Intermedio (3-5 años)",
                senior: "Senior (6+ años)"
            },
            // Company fields
            companyName: "Nombre de la Empresa",
            industry: "Industria",
            industryPlaceholder: "ej. Tecnología, Salud, Finanzas",
            companySize: "Tamaño de la Empresa",
            companySizeOptions: {
                startup: "Startup (1-10 empleados)",
                small: "Pequeña (11-50 empleados)",
                medium: "Mediana (51-200 empleados)",
                large: "Grande (201+ empleados)"
            },
            website: "Sitio Web de la Empresa (Opcional)",
            description: "Descripción de la Empresa",
            descriptionPlaceholder: "Cuéntale a los buscadores de empleo sobre tu empresa",
            // Validation
            nameRequired: "El nombre es requerido",
            emailRequired: "El correo electrónico es requerido",
            passwordRequired: "La contraseña es requerida",
            passwordTooShort: "La contraseña debe tener al menos 6 caracteres",
            passwordMismatch: "Las contraseñas no coinciden",
            signUpError: "Error al crear la cuenta. Por favor, inténtalo de nuevo."
        }
    };

    const t = (key: keyof typeof translations.en): string => {
        const localeTranslations = translations[lang];
        if (localeTranslations && key in localeTranslations) {
            const value = localeTranslations[key as keyof typeof localeTranslations];
            if (typeof value === 'string') {
                return value;
            }
        }
        const enValue = translations.en[key];
        return typeof enValue === 'string' ? enValue : '';
    };

    // Check for redirect parameter to determine user type
    useEffect(() => {
        const redirectParam = searchParams.get("type");
        if (redirectParam === "job_seeker" || redirectParam === "company") {
            setUserType(redirectParam as "job_seeker" | "company");
        }
    }, [searchParams]);

    const validateForm = () => {
        if (!formData.name.trim()) {
            return t("nameRequired");
        }
        if (!formData.email.trim()) {
            return t("emailRequired");
        }
        if (!formData.password) {
            return t("passwordRequired");
        }
        if (formData.password.length < 6) {
            return t("passwordTooShort");
        }
        if (formData.password !== formData.confirmPassword) {
            return t("passwordMismatch");
        }
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        if (!userType) {
            setError("Please select a user type");
            return;
        }

        setIsLoading(true);

        try {
            const registrationData = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                password: formData.password,
                userType: (userType === "job_seeker" ? "JOB_SEEKER" : "COMPANY") as "JOB_SEEKER" | "COMPANY",
                profile: userType === "job_seeker"
                    ? {
                        about: formData.about,
                        skills: formData.skills,
                        experience: formData.experience,
                    }
                    : {
                        companyName: formData.companyName,
                        industry: formData.industry,
                        companySize: formData.companySize,
                        website: formData.website,
                        description: formData.description,
                    }
            };

            const result = await authService.register(registrationData);

            if (!result.success) {
                throw new Error(result.message || t("signUpError"));
            }

            // Redirect to specified page or dashboard
            const redirectTo = searchParams.get("redirect") || getDashboardRoute(userType === "job_seeker" ? "JOB_SEEKER" : "COMPANY", lang);
            router.push(redirectTo);

        } catch (err) {
            setError(err instanceof Error ? err.message : t("signUpError"));
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Step 1: Choose user type
    if (!userType) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 p-4">
                <Card className="w-full max-w-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">{t("chooseRole")}</CardTitle>
                        <CardDescription>{t("roleDescription")}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4">
                            <Button
                                variant="outline"
                                className="h-auto p-6 flex flex-col items-center text-center hover:bg-blue-50 dark:hover:bg-blue-950"
                                onClick={() => setUserType("job_seeker")}
                            >
                                <div className="text-3xl mb-2">👨‍💼</div>
                                <div className="font-semibold">{t("jobSeeker")}</div>
                                <div className="">{t("jobSeekerDesc")}</div>
                            </Button>

                            <Button
                                variant="outline"
                                className="h-auto p-6 flex flex-col items-center text-center hover:bg-green-50 dark:hover:bg-green-950"
                                onClick={() => setUserType("company")}
                            >
                                <div className="text-3xl mb-2">🏢</div>
                                <div className="font-semibold">{t("company")}</div>
                                <div className="">{t("companyDesc")}</div>
                            </Button>
                        </div>

                        <div className="text-center">
                            <p className="">
                                {t("alreadyHave")}{" "}
                                <Link
                                    href={`/${lang}/auth/login`}
                                    className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
                                >
                                    {t("signIn")}
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Step 2: Registration form
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 p-4">
            <Card className="w-full max-w-2xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center mb-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setUserType(null)}
                            className="mr-auto"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {t("back")}
                        </Button>
                        <CardTitle className="text-2xl font-bold flex-1">
                            {t("createAccount")}
                        </CardTitle>
                        <div className="w-16" /> {/* Spacer for centering */}
                    </div>
                    <CardDescription>
                        {userType === "job_seeker" ? t("jobSeekerDesc") : t("companyDesc")}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Basic Information */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">{t("name")}</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => handleInputChange("name", e.target.value)}
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">{t("email")}</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">{t("password")}</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={(e) => handleInputChange("password", e.target.value)}
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
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                                        disabled={isLoading}
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        disabled={isLoading}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* User Type Specific Fields */}
                        {userType === "job_seeker" && (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="about">{t("about")}</Label>
                                    <Textarea
                                        id="about"
                                        value={formData.about}
                                        onChange={(e) => handleInputChange("about", e.target.value)}
                                        placeholder={t("aboutPlaceholder")}
                                        disabled={isLoading}
                                        rows={3}
                                    />
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="skills">{t("skills")}</Label>
                                        <Input
                                            id="skills"
                                            type="text"
                                            value={formData.skills}
                                            onChange={(e) => handleInputChange("skills", e.target.value)}
                                            placeholder={t("skillsPlaceholder")}
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="experience">{t("experience")}</Label>
                                        <select
                                            id="experience"
                                            value={formData.experience}
                                            onChange={(e) => handleInputChange("experience", e.target.value)}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2  ring-offset-background file:border-0 file:bg-transparent file: "
                                            disabled={isLoading}
                                        >
                                            <option value="">Select experience level</option>
                                            <option value="junior">{translations[lang]?.experienceOptions?.junior || translations.en.experienceOptions.junior}</option>
                                            <option value="mid">{translations[lang]?.experienceOptions?.mid || translations.en.experienceOptions.mid}</option>
                                            <option value="senior">{translations[lang]?.experienceOptions?.senior || translations.en.experienceOptions.senior}</option>
                                        </select>
                                    </div>
                                </div>
                            </>
                        )}

                        {userType === "company" && (
                            <>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="companyName">{t("companyName")}</Label>
                                        <Input
                                            id="companyName"
                                            type="text"
                                            value={formData.companyName}
                                            onChange={(e) => handleInputChange("companyName", e.target.value)}
                                            disabled={isLoading}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="industry">{t("industry")}</Label>
                                        <Input
                                            id="industry"
                                            type="text"
                                            value={formData.industry}
                                            onChange={(e) => handleInputChange("industry", e.target.value)}
                                            placeholder={t("industryPlaceholder")}
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="companySize">{t("companySize")}</Label>
                                        <select
                                            id="companySize"
                                            value={formData.companySize}
                                            onChange={(e) => handleInputChange("companySize", e.target.value)}
                                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2  ring-offset-background file:border-0 file:bg-transparent file: "
                                            disabled={isLoading}
                                        >
                                            <option value="">Select company size</option>
                                            <option value="startup">{translations[lang]?.companySizeOptions?.startup || translations.en.companySizeOptions.startup}</option>
                                            <option value="small">{translations[lang]?.companySizeOptions?.small || translations.en.companySizeOptions.small}</option>
                                            <option value="medium">{translations[lang]?.companySizeOptions?.medium || translations.en.companySizeOptions.medium}</option>
                                            <option value="large">{translations[lang]?.companySizeOptions?.large || translations.en.companySizeOptions.large}</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="website">{t("website")}</Label>
                                        <Input
                                            id="website"
                                            type="url"
                                            value={formData.website}
                                            onChange={(e) => handleInputChange("website", e.target.value)}
                                            placeholder="https://example.com"
                                            disabled={isLoading}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">{t("description")}</Label>
                                    <Textarea
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => handleInputChange("description", e.target.value)}
                                        placeholder={t("descriptionPlaceholder")}
                                        disabled={isLoading}
                                        rows={3}
                                    />
                                </div>
                            </>
                        )}

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {t("signingUp")}
                                </>
                            ) : (
                                t("signUp")
                            )}
                        </Button>
                    </form>

                    <div className="text-center">
                        <p className="">
                            {t("alreadyHave")}{" "}
                            <Link
                                href={`/${lang}/auth/login`}
                                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 font-medium"
                            >
                                {t("signIn")}
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
