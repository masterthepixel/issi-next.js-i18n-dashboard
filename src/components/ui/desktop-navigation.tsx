'use client';

import { motion } from 'framer-motion';
import {
    Award,
    BookOpen,
    Briefcase,
    Building2,
    GraduationCap,
    MapPin,
    Menu,
    Package,
    Phone,
    ShieldCheck,
    User,
    Wrench,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { FormattedMessage } from 'react-intl';

import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { getNavigationItems } from '@/lib/navigation-constants';
import { cn } from '@/lib/utils';

interface DesktopNavigationProps {
    locale: string;
    bannerVisible?: boolean;
    additionalMenuItems?: Array<{
        label: string;
        href: string;
        icon: React.ComponentType<{ className?: string }>;
    }>;
}

const iconMap = {
    home: () => (
        <Image
            src="/images/issi_logo.webp"
            alt="ISSI Logo"
            width={56}
            height={56}
            className="rounded-sm"
        />
    ),
    services: Wrench,
    products: Package,
    government: Building2,
    eLearning: GraduationCap,
    compliance: ShieldCheck,
    careers: Briefcase,
    blog: BookOpen,
    about: User,
    contact: Phone,
};

const submenuIconMap = {
    'ISO 27001': ShieldCheck,
    'ISO 9001': ShieldCheck,
    'MDOT': MapPin,
    'CMMI Level 3': Award,
};

const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export function DesktopNavigation({
    locale,
    bannerVisible = false,
    additionalMenuItems = []
}: DesktopNavigationProps) {
    const pathname = usePathname();
    const params = useParams();
    const currentLocale = params?.locale as string || locale;

    // Get navigation items with proper icons
    const navigationItems = getNavigationItems(currentLocale).map((item) => ({
        ...item,
        title: <FormattedMessage id={`common.navigation.${item.id}`} defaultMessage={item.title as string} />,
        icon: iconMap[item.id as keyof typeof iconMap] || item.icon,
        submenu: item.submenu?.map((subItem) => ({
            ...subItem,
            icon: submenuIconMap[subItem.label as keyof typeof submenuIconMap] || ShieldCheck,
        })),
    }));

    const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];
    const otherLanguages = languages.filter(lang => lang.code !== currentLocale);

    return (
        <div
            className={cn(
                "hidden md:block fixed left-1/2 -translate-x-1/2 w-fit z-50",
                bannerVisible ? "top-12 md:top-16" : "top-0 md:top-4"
            )}
        >
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-4 w-fit mx-auto px-2 py-2 rounded-3xl bg-background/90 backdrop-blur-lg border border-border/80 shadow-lg md:shadow-xl relative"
            >
                {/* Main Navigation Menu */}
                <NavigationMenu>
                    <NavigationMenuList>
                        {navigationItems.map((item) => {
                            const IconComponent = item.icon;
                            const isActive = pathname === item.href;

                            if (item.submenu && item.submenu.length > 0) {
                                return (
                                    <NavigationMenuItem key={item.href}>
                                        <NavigationMenuTrigger
                                            className={cn(
                                                "h-10 px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 no-underline hover:no-underline",
                                                isActive && "bg-accent text-accent-foreground"
                                            )}
                                        >
                                            <div className="flex items-center gap-2">
                                                {typeof IconComponent === 'function' ? (
                                                    <IconComponent className="h-5 w-5" />
                                                ) : null}
                                                {item.title}
                                            </div>
                                        </NavigationMenuTrigger>
                                        <NavigationMenuContent>
                                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                                                {item.submenu.map((subItem) => {
                                                    const SubIconComponent = subItem.icon;
                                                    return (
                                                        <li key={subItem.href}>
                                                            <NavigationMenuLink asChild>
                                                                <Link
                                                                    href={subItem.href}
                                                                    className={cn(
                                                                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                                                        pathname === subItem.href && "bg-accent text-accent-foreground"
                                                                    )}
                                                                >
                                                                    <div className="flex items-center gap-3 mb-2">
                                                                        {typeof SubIconComponent === 'function' ? (
                                                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                                                                <SubIconComponent className="h-5 w-5 text-primary" />
                                                                            </div>
                                                                        ) : null}
                                                                        <div className="text-sm font-semibold leading-none">
                                                                            {subItem.label}
                                                                        </div>
                                                                    </div>
                                                                    <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                                                                        {subItem.description}
                                                                    </p>
                                                                </Link>
                                                            </NavigationMenuLink>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </NavigationMenuContent>
                                    </NavigationMenuItem>
                                );
                            }

                            return (
                                <NavigationMenuItem key={item.href}>
                                    <Link href={item.href} legacyBehavior passHref>
                                        <NavigationMenuLink
                                            className={cn(
                                                "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 no-underline hover:no-underline",
                                                isActive && "bg-accent text-accent-foreground"
                                            )}
                                        >
                                            <div className="flex items-center gap-2">
                                                {typeof IconComponent === 'function' ? (
                                                    <IconComponent className="h-5 w-5" />
                                                ) : null}
                                                {item.href !== `/${currentLocale}/home` && item.title}
                                            </div>
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            );
                        })}
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Hamburger Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-10 px-3">
                            <Menu className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        {/* Sign In */}
                        <DropdownMenuItem asChild>
                            <Link href={`/${currentLocale}/auth/signin`} className="cursor-pointer">
                                <User className="mr-2 h-4 w-4" />
                                <FormattedMessage id="common.auth.signIn" defaultMessage="Sign In" />
                            </Link>
                        </DropdownMenuItem>

                        <DropdownMenuSeparator />

                        {/* Current Language */}
                        <DropdownMenuItem disabled>
                            <span className="mr-2 text-base">{currentLanguage.flag}</span>
                            {currentLanguage.name}
                        </DropdownMenuItem>

                        {/* Other Languages */}
                        {otherLanguages.map((language) => (
                            <DropdownMenuItem key={language.code} asChild>
                                <Link
                                    href={pathname.replace(`/${currentLocale}`, `/${language.code}`)}
                                    className="cursor-pointer"
                                >
                                    <span className="mr-2 text-base">{language.flag}</span>
                                    {language.name}
                                </Link>
                            </DropdownMenuItem>
                        ))}

                        {/* Additional Menu Items */}
                        {additionalMenuItems.length > 0 && (
                            <>
                                <DropdownMenuSeparator />
                                {additionalMenuItems.map((item) => (
                                    <DropdownMenuItem key={item.href} asChild>
                                        <Link href={item.href} className="cursor-pointer">
                                            <item.icon className="mr-2 h-4 w-4" />
                                            {item.label}
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Animated Theme Toggle - Rightmost Position */}
                <AnimatedThemeToggler
                    className="ml-2"
                    duration={400}
                />
            </motion.nav>
        </div>
    );
}