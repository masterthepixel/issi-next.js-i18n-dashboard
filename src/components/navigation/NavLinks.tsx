"use client";

import { BookOpen, Briefcase, Code, Globe, GraduationCap, Info, Mail, Shield } from "lucide-react";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface NavLinksProps {
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

export function NavLinks({ locale, pathname }: NavLinksProps) {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                {navItems.map((item) => {
                    const fullHref = `/${locale}${item.href}`;
                    const isActive = pathname === fullHref || pathname.startsWith(`${fullHref}/`);

                    return (
                        <NavigationMenuItem key={item.href}>
                            <Link href={fullHref} legacyBehavior passHref>
                                <NavigationMenuLink
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        "font-sans text-sm font-medium",
                                        isActive && "bg-accent text-accent-foreground"
                                    )}
                                >
                                    <FormattedMessage
                                        id={item.translationKey}
                                        defaultMessage={item.href.replace("/", "")}
                                    />
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    );
                })}
            </NavigationMenuList>
        </NavigationMenu>
    );
}
