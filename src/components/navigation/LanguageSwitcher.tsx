"use client";

import { Check, ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LanguageSwitcherProps {
    currentLocale: string;
}

const languages = [
    { code: "en", name: "English", flagCode: "gb" },
    { code: "fr", name: "Français", flagCode: "fr" },
    { code: "es", name: "Español", flagCode: "es" },
];

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
    const pathname = usePathname();
    const router = useRouter();

    const currentLanguage = languages.find((lang) => lang.code === currentLocale) || languages[0];

    const switchLanguage = (newLocale: string) => {
        const currentPath = pathname.replace(`/${currentLocale}`, "");
        router.push(`/${newLocale}${currentPath}`);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 font-sans">
                    <span className={`fi fi-${currentLanguage.flagCode} rounded-sm`}></span>
                    <span className="hidden sm:inline">{currentLanguage.name}</span>
                    <span className="sm:hidden">{currentLanguage.code.toUpperCase()}</span>
                    <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => switchLanguage(lang.code)}
                        disabled={lang.code === currentLocale}
                        className="gap-2"
                    >
                        <span className={`fi fi-${lang.flagCode} rounded-sm`}></span>
                        <span>{lang.name}</span>
                        {lang.code === currentLocale && <Check className="ml-auto h-4 w-4" />}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
