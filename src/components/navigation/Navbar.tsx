"use client";

import "flag-icons/css/flag-icons.min.css";
import {
    Award,
    BookOpen,
    Briefcase,
    Building2,
    GraduationCap,
    MapPin,
    Menu,
    Moon,
    Package,
    ShieldCheck,
    Sun,
    User,
    Wrench,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, Variants } from "motion/react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
    locale: "en" | "fr" | "es";
    bannerVisible?: boolean;
}

interface MenuItem {
    icon: React.ReactNode;
    label: string | React.ReactNode;
    href: string;
    gradient: string;
    iconColor: string;
    submenu?: Array<{
        label: string | React.ReactNode;
        href: string;
    }>;
}

const itemVariants: Variants = {
    initial: { rotateX: 0, opacity: 1 },
    hover: { rotateX: -90, opacity: 0 },
};

const backVariants: Variants = {
    initial: { rotateX: 90, opacity: 0 },
    hover: { rotateX: 0, opacity: 1 },
};

const glowVariants: Variants = {
    initial: { opacity: 0, scale: 0.6 },
    hover: {
        opacity: 1,
        scale: 1.3,
        transition: {
            opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
            scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
        },
    },
};

const sharedTransition = {
    type: "spring" as const,
    stiffness: 100,
    damping: 20,
    duration: 0.5,
};

export function Navbar({ locale, bannerVisible = false }: NavbarProps) {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const router = useRouter();
    const shouldReduceMotion = useReducedMotion();
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show navbar when scrolling up or at the top
            if (currentScrollY < lastScrollY || currentScrollY < 10) {
                setVisible(true);
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Hide navbar when scrolling down past 100px
                setVisible(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const languages = [
        { code: "en", name: "English", flagCode: "gb" },
        { code: "fr", name: "Français", flagCode: "fr" },
        { code: "es", name: "Español", flagCode: "es" },
    ];

    const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

    const switchLanguage = (newLocale: string) => {
        const currentPath = pathname.replace(`/${locale}`, "");
        router.push(`/${newLocale}${currentPath}`);
    };

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    const handleSignIn = () => {
        router.push(`/${locale}/auth/login`);
    };

    const menuItems: MenuItem[] = [
        {
            icon: <Image src="/images/issi_logo.webp" alt="ISSI Logo" width={56} height={56} className="rounded-sm" />,
            label: <FormattedMessage id="common.navigation.home" defaultMessage="Home" />,
            href: `/${locale}/home`,
            gradient:
                "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, hsl(var(--primary) / 0.06) 50%, hsl(var(--primary) / 0) 100%)",
            iconColor: "text-primary group-hover:text-primary/80",
        },
        {
            icon: <Wrench className="h-5 w-5" />,
            label: <FormattedMessage id="common.navigation.services" defaultMessage="Services" />,
            href: `/${locale}/services`,
            gradient:
                "radial-gradient(circle, hsl(var(--secondary) / 0.15) 0%, hsl(var(--secondary) / 0.06) 50%, hsl(var(--secondary) / 0) 100%)",
            iconColor: "text-primary group-hover:text-primary/80",
        },
        {
            icon: <Package className="h-5 w-5" />,
            label: <FormattedMessage id="common.navigation.products" defaultMessage="Products" />,
            href: `/${locale}/products`,
            gradient:
                "radial-gradient(circle, hsl(var(--accent) / 0.15) 0%, hsl(var(--accent) / 0.06) 50%, hsl(var(--accent) / 0) 100%)",
            iconColor: "text-primary group-hover:text-primary/80",
        },
        {
            icon: <Building2 className="h-5 w-5" />,
            label: <FormattedMessage id="common.navigation.government" defaultMessage="Government" />,
            href: `/${locale}/government`,
            gradient:
                "radial-gradient(circle, hsl(var(--chart-2) / 0.15) 0%, hsl(var(--chart-2) / 0.06) 50%, hsl(var(--chart-2) / 0) 100%)",
            iconColor: "text-primary group-hover:text-primary/80",
        },
        {
            icon: <GraduationCap className="h-5 w-5" />,
            label: <FormattedMessage id="common.navigation.eLearning" defaultMessage="eLearning" />,
            href: `/${locale}/eLearning`,
            gradient:
                "radial-gradient(circle, hsl(var(--chart-3) / 0.15) 0%, hsl(var(--chart-3) / 0.06) 50%, hsl(var(--chart-3) / 0) 100%)",
            iconColor: "text-primary group-hover:text-primary/80",
        },
        {
            icon: <ShieldCheck className="h-5 w-5" />,
            label: <FormattedMessage id="common.navigation.compliance" defaultMessage="Compliance" />,
            href: `/${locale}/compliance`,
            gradient:
                "radial-gradient(circle, hsl(var(--chart-4) / 0.15) 0%, hsl(var(--chart-4) / 0.06) 50%, hsl(var(--chart-4) / 0) 100%)",
            iconColor: "text-primary group-hover:text-primary/80",
            submenu: [
                {
                    label: "ISO 27001",
                    href: `/${locale}/compliance/iso27001`,
                },
                {
                    label: "ISO 9001",
                    href: `/${locale}/compliance/iso9001`,
                },
                {
                    label: "MDOT",
                    href: `/${locale}/compliance/mdot`,
                },
                {
                    label: "CMMI Level 3",
                    href: `/${locale}/compliance/cmmi3`,
                },
            ],
        },
        {
            icon: <Briefcase className="h-5 w-5" />,
            label: <FormattedMessage id="common.navigation.careers" defaultMessage="Careers" />,
            href: `/${locale}/careers`,
            gradient:
                "radial-gradient(circle, hsl(var(--chart-1) / 0.15) 0%, hsl(var(--chart-1) / 0.06) 50%, hsl(var(--chart-1) / 0) 100%)",
            iconColor: "text-primary group-hover:text-primary/80",
        },
        {
            icon: <BookOpen className="h-5 w-5" />,
            label: <FormattedMessage id="common.navigation.blog" defaultMessage="Blog" />,
            href: `/${locale}/blog`,
            gradient:
                "radial-gradient(circle, hsl(var(--chart-6) / 0.15) 0%, hsl(var(--chart-6) / 0.06) 50%, hsl(var(--chart-6) / 0) 100%)",
            iconColor: "text-primary group-hover:text-primary/80",
        },
        {
            icon: <User className="h-5 w-5" />,
            label: <FormattedMessage id="common.navigation.about" defaultMessage="About" />,
            href: `/${locale}/about`,
            gradient:
                "radial-gradient(circle, hsl(var(--chart-5) / 0.15) 0%, hsl(var(--chart-5) / 0.06) 50%, hsl(var(--chart-5) / 0) 100%)",
            iconColor: "text-primary group-hover:text-primary/80",
        },
        {
            icon: <ShieldCheck className="h-5 w-5" />,
            label: <FormattedMessage id="common.navigation.contact" defaultMessage="Contact" />,
            href: `/${locale}/contact`,
            gradient:
                "radial-gradient(circle, hsl(var(--destructive) / 0.15) 0%, hsl(var(--destructive) / 0.06) 50%, hsl(var(--destructive) / 0) 100%)",
            iconColor: "text-primary group-hover:text-primary/80",
        },
    ];

    return (
        <AnimatePresence mode="wait">
            {visible && (
                <motion.div
                    initial={{
                        opacity: 1,
                        y: -100,
                    }}
                    animate={{
                        y: 0,
                        opacity: 1,
                    }}
                    exit={{
                        y: -100,
                        opacity: 0,
                    }}
                    transition={{
                        duration: 0.2,
                    }}
                    className={`hidden md:block fixed left-1/2 -translate-x-1/2 w-fit z-50 ${bannerVisible ? "top-12 md:top-16" : "top-4"
                        }`}
                >
                    <motion.nav
                        className="w-fit mx-auto px-3 py-2 rounded-3xl
        bg-background/90 backdrop-blur-lg
        border border-border/80
        shadow-lg md:shadow-xl relative"
                        initial="initial"
                        whileHover={shouldReduceMotion ? undefined : "hover"}
                    >
                        <ul className="flex items-center justify-center gap-0 relative z-10">
                            {menuItems.map((item: MenuItem) => {
                                const isActive = pathname === item.href;

                                return (
                                    <motion.li key={item.href} className="relative flex-1 md:flex-none">
                                        {item.submenu ? (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <motion.div
                                                        className={`block rounded-xl md:rounded-2xl overflow-visible group relative ${isActive ? "bg-muted/50" : ""
                                                            }`}
                                                        style={{ perspective: shouldReduceMotion ? undefined : "600px" }}
                                                        whileHover={shouldReduceMotion ? undefined : "hover"}
                                                        initial="initial"
                                                    >
                                                        <motion.div
                                                            className="absolute inset-0 z-0 pointer-events-none rounded-xl md:rounded-2xl"
                                                            variants={glowVariants}
                                                            style={{
                                                                background: item.gradient,
                                                                opacity: isActive ? 0.3 : 0,
                                                            }}
                                                        />
                                                        <motion.div
                                                            className="flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-1.5
                          px-1.5 py-1 md:px-3 md:py-1.5 relative z-10
                          bg-transparent text-foreground
                          group-hover:text-foreground
                          transition-colors rounded-xl md:rounded-2xl text-xs md:text-sm cursor-pointer"
                                                            variants={shouldReduceMotion ? undefined : itemVariants}
                                                            transition={shouldReduceMotion ? undefined : sharedTransition}
                                                            style={
                                                                shouldReduceMotion
                                                                    ? undefined
                                                                    : {
                                                                        transformStyle: "preserve-3d",
                                                                        transformOrigin: "center bottom",
                                                                    }
                                                            }
                                                        >
                                                            <span
                                                                className={`transition-colors duration-300 ${item.iconColor
                                                                    } ${isActive ? "text-foreground" : ""}`}
                                                            >
                                                                {item.icon}
                                                            </span>
                                                            {item.href !== `/${locale}/home` && (
                                                                <span className="hidden md:inline text-foreground">
                                                                    {item.label}
                                                                </span>
                                                            )}
                                                        </motion.div>
                                                        <motion.div
                                                            className="flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-1.5
                          px-1.5 py-1 md:px-3 md:py-1.5 absolute inset-0 z-10
                          bg-transparent text-foreground
                          group-hover:text-foreground
                          transition-colors rounded-xl md:rounded-2xl text-xs md:text-sm cursor-pointer"
                                                            variants={shouldReduceMotion ? undefined : backVariants}
                                                            transition={shouldReduceMotion ? undefined : sharedTransition}
                                                            style={
                                                                shouldReduceMotion
                                                                    ? { display: "none" }
                                                                    : {
                                                                        transformStyle: "preserve-3d",
                                                                        transformOrigin: "center top",
                                                                        transform: "rotateX(90deg)",
                                                                    }
                                                            }
                                                        >
                                                            <span
                                                                className={`transition-colors duration-300 ${item.iconColor
                                                                    } ${isActive ? "text-foreground" : ""}`}
                                                            >
                                                                {item.icon}
                                                            </span>
                                                            {item.href !== `/${locale}/home` && (
                                                                <span className="hidden md:inline text-foreground">
                                                                    {item.label}
                                                                </span>
                                                            )}
                                                        </motion.div>
                                                    </motion.div>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    align="center"
                                                    className="w-48 bg-background/90 backdrop-blur-lg border border-border/80 shadow-lg"
                                                >
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={item.href}
                                                            className="flex items-center gap-2 no-underline"
                                                        >
                                                            <ShieldCheck className="h-4 w-4" />
                                                            <span>Overview</span>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`${item.href}/iso27001`}
                                                            className="flex items-center gap-2 no-underline"
                                                        >
                                                            <ShieldCheck className="h-4 w-4" />
                                                            <span>ISO 27001</span>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`${item.href}/iso9001`}
                                                            className="flex items-center gap-2 no-underline"
                                                        >
                                                            <ShieldCheck className="h-4 w-4" />
                                                            <span>ISO 9001</span>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`${item.href}/mdot`}
                                                            className="flex items-center gap-2 no-underline"
                                                        >
                                                            <MapPin className="h-4 w-4" />
                                                            <span>MDOT</span>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link
                                                            href={`${item.href}/cmmi3`}
                                                            className="flex items-center gap-2 no-underline"
                                                        >
                                                            <Award className="h-4 w-4" />
                                                            <span>CMMI Level 3</span>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        ) : (
                                            <motion.div
                                                className={`block rounded-xl md:rounded-2xl overflow-visible group relative ${isActive ? "bg-muted/50" : ""
                                                    }`}
                                                style={{ perspective: shouldReduceMotion ? undefined : "600px" }}
                                                whileHover={shouldReduceMotion ? undefined : "hover"}
                                                initial="initial"
                                            >
                                                <motion.div
                                                    className="absolute inset-0 z-0 pointer-events-none rounded-xl md:rounded-2xl"
                                                    variants={glowVariants}
                                                    style={{
                                                        background: item.gradient,
                                                        opacity: isActive ? 0.3 : 0,
                                                    }}
                                                />
                                                <motion.div
                                                    className="flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-1.5
                          px-1.5 py-1 md:px-3 md:py-1.5 relative z-10
                          bg-transparent text-foreground
                          group-hover:text-foreground
                          transition-colors rounded-xl md:rounded-2xl text-xs md:text-sm"
                                                    variants={shouldReduceMotion ? undefined : itemVariants}
                                                    transition={shouldReduceMotion ? undefined : sharedTransition}
                                                    style={
                                                        shouldReduceMotion
                                                            ? undefined
                                                            : {
                                                                transformStyle: "preserve-3d",
                                                                transformOrigin: "center bottom",
                                                            }
                                                    }
                                                >
                                                    <Link
                                                        href={item.href}
                                                        className="flex flex-col md:flex-row items-center gap-0.5 md:gap-1.5 no-underline"
                                                        aria-label={
                                                            typeof item.label === "string"
                                                                ? item.label
                                                                : `Navigate to ${item.href.split("/").pop()}`
                                                        }
                                                    >
                                                        <span
                                                            className={`transition-colors duration-300 ${item.iconColor
                                                                } ${isActive ? "text-foreground" : ""}`}
                                                        >
                                                            {item.icon}
                                                        </span>
                                                        {item.href !== `/${locale}/home` && (
                                                            <span className="hidden md:inline text-foreground">
                                                                {item.label}
                                                            </span>
                                                        )}
                                                    </Link>
                                                </motion.div>
                                                <motion.div
                                                    className="flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-1.5
                          px-1.5 py-1 md:px-3 md:py-1.5 absolute inset-0 z-10
                          bg-transparent text-foreground
                          group-hover:text-foreground
                          transition-colors rounded-xl md:rounded-2xl text-xs md:text-sm"
                                                    variants={shouldReduceMotion ? undefined : backVariants}
                                                    transition={shouldReduceMotion ? undefined : sharedTransition}
                                                    style={
                                                        shouldReduceMotion
                                                            ? { display: "none" }
                                                            : {
                                                                transformStyle: "preserve-3d",
                                                                transformOrigin: "center top",
                                                                transform: "rotateX(90deg)",
                                                            }
                                                    }
                                                >
                                                    <Link
                                                        href={item.href}
                                                        className="flex flex-col md:flex-row items-center gap-0.5 md:gap-1.5 no-underline"
                                                        aria-label={
                                                            typeof item.label === "string"
                                                                ? item.label
                                                                : `Navigate to ${item.href.split("/").pop()}`
                                                        }
                                                    >
                                                        <span
                                                            className={`transition-colors duration-300 ${item.iconColor
                                                                } ${isActive ? "text-foreground" : ""}`}
                                                        >
                                                            {item.icon}
                                                        </span>
                                                        {item.href !== `/${locale}/home` && (
                                                            <span className="hidden md:inline text-foreground">
                                                                {item.label}
                                                            </span>
                                                        )}
                                                    </Link>
                                                </motion.div>
                                            </motion.div>
                                        )}
                                    </motion.li>
                                );
                            })}

                            {/* Hamburger Menu */}
                            <motion.li className="relative flex-1 md:flex-none">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button
                                            className="block rounded-xl md:rounded-2xl overflow-visible group relative cursor-pointer border-0 bg-transparent"
                                            style={{ perspective: "600px" }}
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            aria-label="Open navigation menu"
                                            type="button"
                                        >
                                            <motion.div
                                                className="w-full h-full"
                                                whileHover={shouldReduceMotion ? undefined : "hover"}
                                                initial="initial"
                                            >
                                                <motion.div
                                                    className="absolute inset-0 z-0 pointer-events-none rounded-xl md:rounded-2xl"
                                                    variants={shouldReduceMotion ? undefined : glowVariants}
                                                    style={{
                                                        background:
                                                            "radial-gradient(circle, hsl(var(--muted) / 0.15) 0%, hsl(var(--muted) / 0.06) 50%, hsl(var(--muted) / 0) 100%)",
                                                    }}
                                                />
                                                <motion.div
                                                    className="flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-1.5
                      px-1.5 py-1 md:px-3 md:py-1.5 relative z-10
                      bg-transparent text-muted-foreground
                      group-hover:text-foreground
                      transition-colors rounded-xl md:rounded-2xl text-xs md:text-sm"
                                                    variants={shouldReduceMotion ? undefined : itemVariants}
                                                    transition={shouldReduceMotion ? undefined : sharedTransition}
                                                    style={
                                                        shouldReduceMotion
                                                            ? undefined
                                                            : {
                                                                transformStyle: "preserve-3d",
                                                                transformOrigin: "center bottom",
                                                            }
                                                    }
                                                >
                                                    <span className="transition-colors duration-300 group-hover:text-primary">
                                                        <Menu className="h-5 w-5" />
                                                    </span>
                                                </motion.div>
                                                <motion.div
                                                    className="flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-1.5
                      px-1.5 py-1 md:px-3 md:py-1.5 absolute inset-0 z-10
                      bg-transparent text-muted-foreground
                      group-hover:text-foreground
                      transition-colors rounded-xl md:rounded-2xl text-xs md:text-sm"
                                                    variants={shouldReduceMotion ? undefined : backVariants}
                                                    transition={shouldReduceMotion ? undefined : sharedTransition}
                                                    style={
                                                        shouldReduceMotion
                                                            ? { display: "none" }
                                                            : {
                                                                transformStyle: "preserve-3d",
                                                                transformOrigin: "center top",
                                                                transform: "rotateX(90deg)",
                                                            }
                                                    }
                                                >
                                                    <span className="transition-colors duration-300 group-hover:text-primary">
                                                        <Menu className="h-5 w-5" />
                                                    </span>
                                                </motion.div>
                                            </motion.div>
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="w-48 bg-background/90 backdrop-blur-lg border border-border/80 shadow-lg"
                                    >
                                        {/* Sign In */}
                                        <DropdownMenuItem onClick={handleSignIn}>
                                            <User className="h-4 w-4" />
                                            <span>
                                                <FormattedMessage
                                                    id="common.auth.signIn"
                                                    defaultMessage="Sign In"
                                                />
                                            </span>
                                        </DropdownMenuItem>

                                        {/* Theme Toggle */}
                                        <DropdownMenuItem onClick={toggleTheme}>
                                            {theme === "dark" ? (
                                                <Sun className="h-4 w-4" />
                                            ) : (
                                                <Moon className="h-4 w-4" />
                                            )}
                                            <span>
                                                {theme === "dark" ? (
                                                    <FormattedMessage
                                                        id="common.theme-switcher.dark"
                                                        defaultMessage="Switch to light mode"
                                                    />
                                                ) : (
                                                    <FormattedMessage
                                                        id="common.theme-switcher.light"
                                                        defaultMessage="Switch to dark mode"
                                                    />
                                                )}
                                            </span>
                                        </DropdownMenuItem>

                                        <DropdownMenuSeparator />

                                        {/* Current Language Display */}
                                        <DropdownMenuItem disabled>
                                            <span
                                                className={`fi fi-${currentLanguage.flagCode} w-5 h-4 rounded-sm`}
                                            />
                                            <span>{currentLanguage.name}</span>
                                        </DropdownMenuItem>

                                        {/* Language Options */}
                                        {languages
                                            .filter((lang) => lang.code !== locale)
                                            .map((language) => (
                                                <DropdownMenuItem
                                                    key={language.code}
                                                    onClick={() => switchLanguage(language.code)}
                                                >
                                                    <span
                                                        className={`fi fi-${language.flagCode} w-5 h-4 rounded-sm`}
                                                    />
                                                    <span>{language.name}</span>
                                                </DropdownMenuItem>
                                            ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </motion.li>
                        </ul>
                    </motion.nav>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
