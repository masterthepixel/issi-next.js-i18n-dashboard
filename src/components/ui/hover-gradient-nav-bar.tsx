'use client'
import { motion, Variants } from 'framer-motion';
import {
  BookOpen,
  Briefcase,
  Building2,
  GraduationCap,
  Menu,
  Moon,
  Package,
  ShieldCheck,
  Sun,
  User,
  Wrench
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- HoverGradientNavBar Component ---

interface HoverGradientMenuItem {
  icon: React.ReactNode;
  label: string | React.ReactNode;
  href: string;
  gradient: string;
  iconColor: string;
}

interface HoverGradientNavBarProps {
  locale: string;
  messages?: Record<string, string>;
}

// Animation variants
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

function HoverGradientNavBar({ locale }: HoverGradientNavBarProps): React.JSX.Element {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const switchLanguage = (newLocale: string) => {
    const currentPath = pathname.replace(`/${locale}`, '');
    router.push(`/${newLocale}${currentPath}`);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleSignIn = () => {
    console.log('Sign in clicked');
    // Add your sign-in logic here
  };

  const menuItems: HoverGradientMenuItem[] = [
    {
      icon: <Image src="/images/issi_logo.png" alt="ISSI Logo" width={56} height={56} className="rounded-sm" />,
      label: <FormattedMessage id="common.navigation.home" defaultMessage="Home" />,
      href: `/${locale}/home`,
      gradient: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, hsl(var(--primary) / 0.06) 50%, hsl(var(--primary) / 0) 100%)",
      iconColor: "group-hover:text-primary"
    },
    {
      icon: <Wrench className="h-5 w-5" />,
      label: <FormattedMessage id="common.navigation.services" defaultMessage="Services" />,
      href: `/${locale}/services`,
      gradient: "radial-gradient(circle, hsl(var(--secondary) / 0.15) 0%, hsl(var(--secondary) / 0.06) 50%, hsl(var(--secondary) / 0) 100%)",
      iconColor: "group-hover:text-secondary-foreground"
    },
    {
      icon: <Package className="h-5 w-5" />,
      label: <FormattedMessage id="common.navigation.products" defaultMessage="Products" />,
      href: `/${locale}/products`,
      gradient: "radial-gradient(circle, hsl(var(--accent) / 0.15) 0%, hsl(var(--accent) / 0.06) 50%, hsl(var(--accent) / 0) 100%)",
      iconColor: "group-hover:text-accent-foreground"
    },
    {
      icon: <Building2 className="h-5 w-5" />,
      label: <FormattedMessage id="common.navigation.government" defaultMessage="Government" />,
      href: `/${locale}/government`,
      gradient: "radial-gradient(circle, hsl(var(--chart-2) / 0.15) 0%, hsl(var(--chart-2) / 0.06) 50%, hsl(var(--chart-2) / 0) 100%)",
      iconColor: "group-hover:text-primary"
    },
    {
      icon: <GraduationCap className="h-5 w-5" />,
      label: <FormattedMessage id="common.navigation.eLearning" defaultMessage="eLearning" />,
      href: `/${locale}/eLearning`,
      gradient: "radial-gradient(circle, hsl(var(--chart-3) / 0.15) 0%, hsl(var(--chart-3) / 0.06) 50%, hsl(var(--chart-3) / 0) 100%)",
      iconColor: "group-hover:text-primary"
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      label: <FormattedMessage id="common.navigation.compliance" defaultMessage="Compliance" />,
      href: `/${locale}/compliance`,
      gradient: "radial-gradient(circle, hsl(var(--chart-4) / 0.15) 0%, hsl(var(--chart-4) / 0.06) 50%, hsl(var(--chart-4) / 0) 100%)",
      iconColor: "group-hover:text-primary"
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      label: <FormattedMessage id="common.navigation.careers" defaultMessage="Careers" />,
      href: `/${locale}/careers`,
      gradient: "radial-gradient(circle, hsl(var(--chart-1) / 0.15) 0%, hsl(var(--chart-1) / 0.06) 50%, hsl(var(--chart-1) / 0) 100%)",
      iconColor: "group-hover:text-primary"
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      label: <FormattedMessage id="common.navigation.blog" defaultMessage="Blog" />,
      href: `/${locale}/blog`,
      gradient: "radial-gradient(circle, hsl(var(--chart-6) / 0.15) 0%, hsl(var(--chart-6) / 0.06) 50%, hsl(var(--chart-6) / 0) 100%)",
      iconColor: "group-hover:text-primary"
    },
    {
      icon: <User className="h-5 w-5" />,
      label: <FormattedMessage id="common.navigation.about" defaultMessage="About" />,
      href: `/${locale}/about`,
      gradient: "radial-gradient(circle, hsl(var(--chart-5) / 0.15) 0%, hsl(var(--chart-5) / 0.06) 50%, hsl(var(--chart-5) / 0) 100%)",
      iconColor: "group-hover:text-primary"
    },
  ];

  // Additional menu items for the dropdown hamburger menu
  const additionalMenuItems = [
    {
      icon: <ShieldCheck className="h-4 w-4" />,
      label: <FormattedMessage id="common.navigation.contact" defaultMessage="Contact" />,
      href: `/${locale}/contact`,
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-full md:top-4 md:left-1/2 md:-translate-x-1/2 z-50">
      <motion.nav
        className="w-full md:w-fit mx-auto px-1 md:px-2 py-1 md:py-2 rounded-none md:rounded-3xl
        bg-background/90 backdrop-blur-lg
        border-b md:border border-border/80
        shadow-lg md:shadow-xl relative"
        initial="initial"
        whileHover="hover"
      >
        <ul className="flex items-center justify-around md:justify-center gap-0 md:gap-0 relative z-10">
          {menuItems.map((item: HoverGradientMenuItem) => {
            const isActive = pathname === item.href;
            const isServicesItem = item.href === `/${locale}/services`;

            return (
              <motion.li key={item.href} className={`relative flex-1 md:flex-none ${isServicesItem ? 'ml-0.5 md:ml-0.5' : ''}`}>
                <motion.div
                  className={`block rounded-xl md:rounded-2xl overflow-visible group relative ${isActive ? 'bg-muted/50' : ''
                    }`}
                  style={{ perspective: "600px" }}
                  whileHover="hover"
                  initial="initial"
                >
                  {/* Per-item glow */}
                  <motion.div
                    className="absolute inset-0 z-0 pointer-events-none rounded-xl md:rounded-2xl"
                    variants={glowVariants}
                    style={{
                      background: item.gradient,
                      opacity: isActive ? 0.3 : 0,
                    }}
                  />
                  {/* Front-facing */}
                  <motion.div
                    className="flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-1.5
                    px-1.5 py-1 md:px-3 md:py-1.5 relative z-10
                    bg-transparent text-foreground
                    group-hover:text-foreground
                    transition-colors rounded-xl md:rounded-2xl text-xs md:text-sm"
                    variants={itemVariants}
                    transition={sharedTransition}
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "center bottom"
                    }}
                  >
                    <Link href={item.href} className="flex flex-col md:flex-row items-center gap-0.5 md:gap-1.5 no-underline">
                      <span className={`transition-colors duration-300 ${item.iconColor} ${isActive ? 'text-foreground' : ''
                        }`}>
                        {item.icon}
                      </span>
                      {item.href !== `/${locale}/home` && (
                        <span className="hidden md:inline text-foreground">{item.label}</span>
                      )}
                    </Link>
                  </motion.div>
                  {/* Back-facing */}
                  <motion.div
                    className="flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-1.5
                    px-1.5 py-1 md:px-3 md:py-1.5 absolute inset-0 z-10
                    bg-transparent text-foreground
                    group-hover:text-foreground
                    transition-colors rounded-xl md:rounded-2xl text-xs md:text-sm"
                    variants={backVariants}
                    transition={sharedTransition}
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "center top",
                      transform: "rotateX(90deg)"
                    }}
                  >
                    <Link href={item.href} className="flex flex-col md:flex-row items-center gap-0.5 md:gap-1.5 no-underline">
                      <span className={`transition-colors duration-300 ${item.iconColor} ${isActive ? 'text-foreground' : ''
                        }`}>
                        {item.icon}
                      </span>
                      {item.href !== `/${locale}/home` && (
                        <span className="hidden md:inline text-foreground">{item.label}</span>
                      )}
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.li>
            );
          })}

          {/* Hamburger Menu */}
          <motion.li className="relative flex-1 md:flex-none">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  className="block rounded-xl md:rounded-2xl overflow-visible group relative cursor-pointer"
                  style={{ perspective: "600px" }}
                  whileHover="hover"
                  initial="initial"
                >
                  {/* Per-item glow */}
                  <motion.div
                    className="absolute inset-0 z-0 pointer-events-none rounded-xl md:rounded-2xl"
                    variants={glowVariants}
                    style={{
                      background: "radial-gradient(circle, hsl(var(--muted) / 0.15) 0%, hsl(var(--muted) / 0.06) 50%, hsl(var(--muted) / 0) 100%)",
                    }}
                  />
                  {/* Front-facing */}
                  <motion.div
                    className="flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-1.5
                    px-1.5 py-1 md:px-3 md:py-1.5 relative z-10
                    bg-transparent text-muted-foreground
                    group-hover:text-foreground
                    transition-colors rounded-xl md:rounded-2xl text-xs md:text-sm"
                    variants={itemVariants}
                    transition={sharedTransition}
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "center bottom"
                    }}
                  >
                    <span className="transition-colors duration-300 group-hover:text-primary">
                      <Menu className="h-5 w-5" />
                    </span>
                  </motion.div>
                  {/* Back-facing */}
                  <motion.div
                    className="flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-1.5
                    px-1.5 py-1 md:px-3 md:py-1.5 absolute inset-0 z-10
                    bg-transparent text-muted-foreground
                    group-hover:text-foreground
                    transition-colors rounded-xl md:rounded-2xl text-xs md:text-sm"
                    variants={backVariants}
                    transition={sharedTransition}
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "center top",
                      transform: "rotateX(90deg)"
                    }}
                  >
                    <span className="transition-colors duration-300 group-hover:text-primary">
                      <Menu className="h-5 w-5" />
                    </span>
                  </motion.div>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {/* Sign In */}
                <DropdownMenuItem onClick={handleSignIn}>
                  <User className="h-4 w-4" />
                  <span>
                    <FormattedMessage id="common.auth.signIn" defaultMessage="Sign In" />
                  </span>
                </DropdownMenuItem>

                {/* Theme Toggle */}
                <DropdownMenuItem onClick={toggleTheme}>
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  <span>
                    {theme === 'dark' ? (
                      <FormattedMessage id="common.theme-switcher.light" defaultMessage="Light Mode" />
                    ) : (
                      <FormattedMessage id="common.theme-switcher.dark" defaultMessage="Dark Mode" />
                    )}
                  </span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Current Language Display */}
                <DropdownMenuItem disabled>
                  <span className="text-lg">{currentLanguage.flag}</span>
                  <span>{currentLanguage.name}</span>
                </DropdownMenuItem>

                {/* Language Options */}
                {languages.filter(lang => lang.code !== locale).map((language) => (
                  <DropdownMenuItem key={language.code} onClick={() => switchLanguage(language.code)}>
                    <span className="text-lg">{language.flag}</span>
                    <span>{language.name}</span>
                  </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />

                {/* Additional Menu Items */}
                {additionalMenuItems.map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="flex items-center gap-2 no-underline">
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.li>
        </ul>
      </motion.nav>
    </div>
  );
}

export default HoverGradientNavBar;
