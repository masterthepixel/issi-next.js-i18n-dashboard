"use client";

import { BookOpen, Briefcase, Code, Globe, GraduationCap, Info, Mail, Shield } from "lucide-react";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface MobileNavProps {
    locale: string;
    pathname: string;
}

const navItems = [
    {
        href: "/services",
        translationKey: "common.navigation.services",
        icon: Code,
    },
    {
        href: "/products",
        translationKey: "common.navigation.products",
        icon: Code,
    },
    {
        href: "/government",
        translationKey: "common.navigation.government",
        icon: Globe,
    },
    {
        href: "/eLearning",
        translationKey: "common.navigation.eLearning",
        icon: GraduationCap,
    },
    {
        href: "/compliance",
        translationKey: "common.navigation.compliance",
        icon: Shield,
    },
    {
        href: "/careers",
        translationKey: "common.navigation.careers",
        icon: Briefcase,
    },
    {
        href: "/blog",
        translationKey: "common.navigation.blog",
        icon: BookOpen,
    },
    {
        href: "/about",
        translationKey: "common.navigation.about",
        icon: Info,
    },
    {
        href: "/contact",
        translationKey: "common.navigation.contact",
        icon: Mail,
    },
];

export function MobileNav({ locale, pathname }: MobileNavProps) {
    return (
        <div className="flex flex-col gap-4 py-4">
            {/* Sign In Button */}
            <Button size="sm" className="w-full">
                <FormattedMessage id="common.auth.signIn" defaultMessage="Sign In" />
            </Button>

            <Separator />

            {/* Navigation Links */}
            <nav className="flex flex-col gap-2">
                {navItems.map((item) => {
                    const fullHref = `/${locale}${item.href}`;
                    const isActive = pathname === fullHref || pathname.startsWith(`${fullHref}/`);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={fullHref}
                            className={cn(
                                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                "hover:bg-accent hover:text-accent-foreground",
                                isActive && "bg-accent text-accent-foreground"
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            <FormattedMessage
                                id={item.translationKey}
                                defaultMessage={item.href.replace("/", "")}
                            />
                        </Link>
                    );
                })}
            </nav>

            <Separator />

            {/* Settings */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Language</span>
                    <LanguageSwitcher currentLocale={locale} />
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Theme</span>
                    <ThemeToggle />
                </div>
            </div>
        </div>
    );
}
