"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Locale } from "@/lib/definitions";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UserTypeSelectionProps {
    locale: Locale;
    onSelect?: (userType: "JOB_SEEKER" | "COMPANY") => void;
}

export default function UserTypeSelection({ locale, onSelect }: UserTypeSelectionProps) {
    const [selectedType, setSelectedType] = useState<"JOB_SEEKER" | "COMPANY" | null>(null);
    const router = useRouter();

    const translations = {
        en: {
            title: "Choose Your Account Type",
            subtitle: "Select how you'll be using our platform",
            jobSeeker: "Job Seeker",
            jobSeekerDesc: "Find your dream job and connect with top companies",
            company: "Company",
            companyDesc: "Post jobs and find talented professionals",
            continue: "Continue",
            features: "Features",
            jobSeekerFeatures: ["Browse job listings", "Apply to positions", "Track applications", "Build your profile"],
            companyFeatures: ["Post job openings", "Review applications", "Manage company profile", "Find top talent"]
        },
        fr: {
            title: "Choisissez votre type de compte",
            subtitle: "Sélectionnez comment vous utiliserez notre plateforme",
            jobSeeker: "Chercheur d'emploi",
            jobSeekerDesc: "Trouvez votre emploi de rêve et connectez-vous avec les meilleures entreprises",
            company: "Entreprise",
            companyDesc: "Publiez des offres d'emploi et trouvez des professionnels talentueux",
            continue: "Continuer",
            features: "Fonctionnalités",
            jobSeekerFeatures: ["Parcourir les offres", "Postuler aux postes", "Suivre les candidatures", "Construire votre profil"],
            companyFeatures: ["Publier des offres", "Examiner les candidatures", "Gérer le profil entreprise", "Trouver les meilleurs talents"]
        },
        es: {
            title: "Elija su tipo de cuenta",
            subtitle: "Seleccione cómo utilizará nuestra plataforma",
            jobSeeker: "Buscador de empleo",
            jobSeekerDesc: "Encuentre su trabajo ideal y conéctese con las mejores empresas",
            company: "Empresa",
            companyDesc: "Publique ofertas de trabajo y encuentre profesionales talentosos",
            continue: "Continuar",
            features: "Características",
            jobSeekerFeatures: ["Buscar ofertas", "Aplicar a posiciones", "Rastrear aplicaciones", "Construir su perfil"],
            companyFeatures: ["Publicar vacantes", "Revisar aplicaciones", "Administrar perfil", "Encontrar talento"]
        }
    };

    const getLocalizedText = (key: keyof typeof translations.en): string | string[] => {
        const localeTranslations = translations[locale];
        if (localeTranslations && key in localeTranslations) {
            return localeTranslations[key as keyof typeof localeTranslations];
        }
        return translations.en[key];
    };

    const handleSelection = (userType: "JOB_SEEKER" | "COMPANY") => {
        setSelectedType(userType);
        if (onSelect) {
            onSelect(userType);
        } else {
            // Default behavior: navigate to onboarding with user type
            router.push(`/${locale}/auth/onboarding?type=${userType.toLowerCase()}`);
        }
    };

    const renderFeatures = (features: string | string[]) => {
        if (Array.isArray(features)) {
            return features.map((feature: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                    {feature}
                </Badge>
            ));
        }
        return null;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
            <div className="w-full max-w-4xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {getLocalizedText("title") as string}
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        {getLocalizedText("subtitle") as string}
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Job Seeker Card */}
                    <Card
                        className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${selectedType === "JOB_SEEKER"
                                ? "ring-2 ring-blue-500 shadow-lg"
                                : "hover:shadow-md"
                            }`}
                        onClick={() => handleSelection("JOB_SEEKER")}
                    >
                        <CardHeader className="text-center">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <CardTitle className="text-xl">{getLocalizedText("jobSeeker") as string}</CardTitle>
                            <CardDescription className="text-base">
                                {getLocalizedText("jobSeekerDesc") as string}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                                    {getLocalizedText("features") as string}:
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {renderFeatures(getLocalizedText("jobSeekerFeatures"))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Company Card */}
                    <Card
                        className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${selectedType === "COMPANY"
                                ? "ring-2 ring-green-500 shadow-lg"
                                : "hover:shadow-md"
                            }`}
                        onClick={() => handleSelection("COMPANY")}
                    >
                        <CardHeader className="text-center">
                            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <CardTitle className="text-xl">{getLocalizedText("company") as string}</CardTitle>
                            <CardDescription className="text-base">
                                {getLocalizedText("companyDesc") as string}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300">
                                    {getLocalizedText("features") as string}:
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {renderFeatures(getLocalizedText("companyFeatures"))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {selectedType && (
                    <div className="text-center mt-8">
                        <Button
                            size="lg"
                            onClick={() => handleSelection(selectedType)}
                            className="px-8"
                        >
                            {getLocalizedText("continue") as string}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}