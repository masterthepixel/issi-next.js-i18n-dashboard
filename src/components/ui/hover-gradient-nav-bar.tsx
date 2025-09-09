'use client'
import { motion, Variants } from 'framer-motion';
import {
  BookOpen,
  Briefcase,
  Building2,
  GraduationCap,
  Menu,
  Package,
  ShieldCheck,
  User,
  Wrench
} from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';

// --- HoverGradientNavBar Component ---

interface HoverGradientMenuItem {
  icon: React.ReactNode;
  label: string | React.ReactNode;
  href?: string;
  gradient: string;
  iconColor: string;
  noPadding?: boolean;
  isDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

interface DropdownItem {
  icon: React.ReactNode;
  label: string;
  action: () => void;
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
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const switchLanguage = (newLocale: string) => {
    const currentPath = pathname.replace(`/${locale}`, '');
    router.push(`/${newLocale}${currentPath}`);
    setDropdownOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    setDropdownOpen(false);
  };

  const handleSignIn = () => {
    console.log('Sign in clicked');
    setDropdownOpen(false);
  };

  const menuItems: HoverGradientMenuItem[] = [
    {
      icon: (
        <Image
          src="/images/issi_logo.png"
          alt="ISSI Logo"
          width={56}
          height={56}
          className="rounded mx-3"
        />
      ),
      label: <FormattedMessage id="common.navigation.home" defaultMessage="Home" />,
      href: `/${locale}/home`,
      gradient: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, hsl(var(--primary) / 0.06) 50%, hsl(var(--primary) / 0) 100%)",
      iconColor: "text-foreground",
      noPadding: true,
    },
    {
      icon: <Wrench className="h-3 w-3" />,
      label: <FormattedMessage id="common.navigation.services" defaultMessage="Services" />,
      href: `/${locale}/services`,
      gradient: "radial-gradient(circle, hsl(var(--secondary) / 0.15) 0%, hsl(var(--secondary) / 0.06) 50%, hsl(var(--secondary) / 0) 100%)",
      iconColor: "text-foreground"
    },
    {
      icon: <Package className="h-3 w-3" />,
      label: <FormattedMessage id="common.navigation.products" defaultMessage="Products" />,
      href: `/${locale}/products`,
      gradient: "radial-gradient(circle, hsl(var(--accent) / 0.15) 0%, hsl(var(--accent) / 0.06) 50%, hsl(var(--accent) / 0) 100%)",
      iconColor: "text-foreground"
    },
    {
      icon: <Building2 className="h-3 w-3" />,
      label: <FormattedMessage id="common.navigation.government" defaultMessage="Government" />,
      href: `/${locale}/government`,
      gradient: "radial-gradient(circle, hsl(var(--chart-2) / 0.15) 0%, hsl(var(--chart-2) / 0.06) 50%, hsl(var(--chart-2) / 0) 100%)",
      iconColor: "text-foreground"
    },
    {
      icon: <GraduationCap className="h-3 w-3" />,
      label: <FormattedMessage id="common.navigation.eLearning" defaultMessage="eLearning" />,
      href: `/${locale}/eLearning`,
      gradient: "radial-gradient(circle, hsl(var(--chart-3) / 0.15) 0%, hsl(var(--chart-3) / 0.06) 50%, hsl(var(--chart-3) / 0) 100%)",
      iconColor: "text-foreground"
    },
    {
      icon: <ShieldCheck className="h-3 w-3" />,
      label: <FormattedMessage id="common.navigation.compliance" defaultMessage="Compliance" />,
      href: `/${locale}/compliance`,
      gradient: "radial-gradient(circle, hsl(var(--chart-4) / 0.15) 0%, hsl(var(--chart-4) / 0.06) 50%, hsl(var(--chart-4) / 0) 100%)",
      iconColor: "text-foreground"
    },
    {
      icon: <Briefcase className="h-3 w-3" />,
      label: <FormattedMessage id="common.navigation.careers" defaultMessage="Careers" />,
      href: `/${locale}/jobs`,
      gradient: "radial-gradient(circle, hsl(var(--chart-1) / 0.15) 0%, hsl(var(--chart-1) / 0.06) 50%, hsl(var(--chart-1) / 0) 100%)",
      iconColor: "text-foreground"
    },
    {
      icon: <BookOpen className="h-3 w-3" />,
      label: <FormattedMessage id="common.navigation.blog" defaultMessage="Blog" />,
      href: `/${locale}/blog`,
      gradient: "radial-gradient(circle, hsl(var(--chart-1) / 0.15) 0%, hsl(var(--chart-1) / 0.06) 50%, hsl(var(--chart-1) / 0) 100%)",
      iconColor: "text-foreground"
    },
    {
      icon: <User className="h-3 w-3" />,
      label: <FormattedMessage id="common.navigation.about" defaultMessage="About" />,
      href: `/${locale}/about`,
      gradient: "radial-gradient(circle, hsl(var(--chart-5) / 0.15) 0%, hsl(var(--chart-5) / 0.06) 50%, hsl(var(--chart-5) / 0) 100%)",
      iconColor: "text-foreground"
    },
    {
      icon: <Menu className="h-5 w-5" />,
      label: '',
      gradient: "radial-gradient(circle, hsl(var(--muted) / 0.15) 0%, hsl(var(--muted) / 0.06) 50%, hsl(var(--muted) / 0) 100%)",
      iconColor: "text-foreground",
      isDropdown: true
    },
  ];

  return (
    <div className="fixed top-0 left-0 w-full md:top-4 md:left-1/2 md:-translate-x-1/2 z-[999]">
      <motion.nav
        className="w-full md:w-fit mx-auto px-1 md:px-2 py-1 md:py-2 rounded-none md:rounded-3xl 
        bg-background/90 backdrop-blur-lg 
        border-b md:border border-border/80 
        shadow-lg md:shadow-xl relative"
        initial="initial"
        whileHover="hover"
        style={{ pointerEvents: 'auto' }}
      >
        <ul className="flex items-center justify-around md:justify-center gap-0.5 md:gap-1 relative z-10">
          {menuItems.map((item: HoverGradientMenuItem, index) => {
            const isActive = item.href ? pathname === item.href : false;
            const key = item.href || `dropdown-${index}`;

            return (
              <motion.li key={key} className={`relative flex-1 md:flex-none ${index === 1 ? 'ml-2 md:ml-4' : ''}`}>
                <motion.div
                  className={`block rounded-xl md:rounded-2xl overflow-visible group relative ${isActive ? 'bg-muted/50' : ''
                    }`}
                  style={{ perspective: "600px", pointerEvents: 'auto' }}
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
                    className={`flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-1.5 
                    ${item.noPadding ? 'px-0 py-0 md:px-0 md:py-0' : 'px-1.5 py-1 md:px-3 md:py-1.5'} relative z-10 
                    bg-transparent text-muted-foreground 
                    group-hover:text-foreground 
                    transition-colors rounded-xl md:rounded-2xl text-xs md:`}
                    variants={itemVariants}
                    transition={sharedTransition}
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "center bottom"
                    }}
                  >
                    {item.isDropdown ? (
                      <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex flex-col md:flex-row items-center gap-0.5 md:gap-1.5 cursor-pointer"
                        style={{ pointerEvents: 'auto' }}
                      >
                        <span className={`transition-colors duration-300 ${item.iconColor}`}>
                          {item.icon}
                        </span>
                      </button>
                    ) : (
                      <Link href={item.href!} className="flex flex-col md:flex-row items-center gap-0.5 md:gap-1.5 cursor-pointer no-underline" style={{ pointerEvents: 'auto' }}>
                        <span className={`transition-colors duration-300 ${item.iconColor} ${isActive ? 'text-foreground' : ''
                          }`}>
                          {item.icon}
                        </span>
                        {item.href !== `/${locale}/home` && (
                          <span className="hidden md:inline text-sm md:text-base">{item.label}</span>
                        )}
                      </Link>
                    )}
                  </motion.div>
                  {/* Back-facing */}
                  <motion.div
                    className={`flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-1.5 
                    ${item.noPadding ? 'px-0 py-0 md:px-0 md:py-0' : 'px-1.5 py-1 md:px-3 md:py-1.5'} absolute inset-0 z-10 
                    bg-transparent text-muted-foreground 
                    group-hover:text-foreground 
                    transition-colors rounded-xl md:rounded-2xl text-xs md:`}
                    variants={backVariants}
                    transition={sharedTransition}
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "center top",
                      transform: "rotateX(90deg)"
                    }}
                  >
                    {item.isDropdown ? (
                      <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex flex-col md:flex-row items-center gap-0.5 md:gap-1.5 cursor-pointer"
                        style={{ pointerEvents: 'auto' }}
                      >
                        <span className={`transition-colors duration-300 ${item.iconColor}`}>
                          {item.icon}
                        </span>
                      </button>
                    ) : (
                      <Link href={item.href!} className="flex flex-col md:flex-row items-center gap-0.5 md:gap-1.5 cursor-pointer no-underline" style={{ pointerEvents: 'auto' }}>
                        <span className={`transition-colors duration-300 ${item.iconColor} ${isActive ? 'text-foreground' : ''
                          }`}>
                          {item.icon}
                        </span>
                        {item.href !== `/${locale}/home` && (
                          <span className="hidden md:inline text-sm md:text-base">{item.label}</span>
                        )}
                      </Link>
                    )}
                  </motion.div>
                </motion.div>
              </motion.li>
            );
          })}
        </ul>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full right-0 mt-2 w-48 rounded-2xl bg-background/90 backdrop-blur-lg border border-border/80 shadow-lg p-2 z-[1000]"
            style={{ pointerEvents: 'auto' }}
          >
            {/* Sign In */}
            <button
              onClick={handleSignIn}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm md:text-base hover:bg-accent/10 rounded-md transition-colors"
            >
              <span className="text-lg">👤</span>
              <span>Sign In</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm md:text-base hover:bg-accent/10 rounded-md transition-colors"
            >
              <span className="text-lg">{theme === 'dark' ? '☀️' : '🌙'}</span>
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            <div className="border-t border-border/50 my-2"></div>

            {/* Current Language */}
            <button
              onClick={() => setDropdownOpen(false)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm md:text-base hover:bg-accent/10 rounded-md transition-colors"
            >
              <span className="text-lg">{currentLanguage.flag}</span>
              <span>{currentLanguage.name}</span>
            </button>

            {/* Language Options */}
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => switchLanguage(language.code)}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm md:text-base hover:bg-accent/10 rounded-md transition-colors"
              >
                <span className="text-lg">{language.flag}</span>
                <span>{language.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </motion.nav>
    </div>
  );
}

export default HoverGradientNavBar;
