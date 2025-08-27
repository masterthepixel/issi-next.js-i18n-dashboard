'use client'
import React, { useState } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { 
  Languages, 
  Moon, 
  Sun, 
  User,
  ChevronDown,
  Menu
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter, usePathname } from 'next/navigation';
import { FormattedMessage } from 'react-intl';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// --- Utility Menu Component ---

interface UtilityMenuItem {
  icon: React.ReactNode;
  label: string | React.ReactNode;
  action: () => void;
  gradient: string;
  iconColor: string;
}

interface UtilityMenuProps {
  locale: string;
}

// Animation variants
const itemVariants: Variants = {
  initial: { rotateY: 0, opacity: 1 },
  hover: { rotateY: -90, opacity: 0 },
};

const backVariants: Variants = {
  initial: { rotateY: 90, opacity: 0 },
  hover: { rotateY: 0, opacity: 1 },
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

function UtilityMenu({ locale }: UtilityMenuProps): React.JSX.Element {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleTestClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Utility menu clicked!', e);
    console.log('Target:', e.target);
  };
  
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const switchLanguage = (newLocale: string) => {
    console.log('Switching language from', locale, 'to', newLocale);
    const currentPath = pathname.replace(`/${locale}`, '');
    console.log('Current path:', currentPath, 'New URL:', `/${newLocale}${currentPath}`);
    router.push(`/${newLocale}${currentPath}`);
  };

  const toggleTheme = () => {
    console.log('Theme toggle clicked! Current theme:', theme);
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleSignIn = () => {
    // Implement sign-in logic here
    console.log('Sign in clicked');
  };

  const menuItems: UtilityMenuItem[] = [
    {
      icon: <Languages className="h-4 w-4" />,
      label: currentLanguage.flag,
      action: () => {}, // No action needed, handled by dropdown
      gradient: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, hsl(var(--primary) / 0.06) 50%, hsl(var(--primary) / 0) 100%)",
      iconColor: "group-hover:text-primary"
    },
    {
      icon: theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />,
      label: theme === 'dark' ? '☀️' : '🌙',
      action: toggleTheme,
      gradient: "radial-gradient(circle, hsl(var(--secondary) / 0.15) 0%, hsl(var(--secondary) / 0.06) 50%, hsl(var(--secondary) / 0) 100%)",
      iconColor: "group-hover:text-secondary-foreground"
    },
    {
      icon: <User className="h-4 w-4" />,
      label: '👤',
      action: handleSignIn,
      gradient: "radial-gradient(circle, hsl(var(--accent) / 0.15) 0%, hsl(var(--accent) / 0.06) 50%, hsl(var(--accent) / 0) 100%)",
      iconColor: "group-hover:text-accent-foreground"
    },
  ];

  return (
    <div 
      className="fixed top-4 right-4 md:top-4 md:right-4 z-[999]" 
      onClick={handleTestClick}
      style={{ pointerEvents: 'auto' }}
    >
      {/* Hamburger Toggle Button */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          console.log('Hamburger clicked! Current expanded state:', isExpanded);
          setIsExpanded(!isExpanded);
        }}
        className="w-10 h-10 rounded-full bg-background/90 backdrop-blur-lg border border-border/80 shadow-lg flex items-center justify-center hover:bg-muted/50 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Menu className="h-4 w-4 text-muted-foreground" />
      </motion.button>

      {/* Expanded Menu */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-12 right-0 flex flex-col gap-1 p-2 rounded-2xl bg-background/90 backdrop-blur-lg border border-border/80 shadow-lg min-w-[2.5rem]"
          >
            {/* Language Dropdown */}
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative flex items-center justify-center cursor-pointer bg-transparent border-none p-0 group outline-none hover:bg-muted/50 rounded-xl transition-colors w-full">
                    <div className="flex items-center justify-center gap-1 px-2 py-1.5 text-muted-foreground group-hover:text-foreground transition-colors text-sm min-w-[2.5rem]">
                      <span className="text-lg">
                        {currentLanguage.flag}
                      </span>
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="left" className="mr-2">
                  {languages.map((language) => (
                    <DropdownMenuItem
                      key={language.code}
                      onClick={() => switchLanguage(language.code)}
                      className="cursor-pointer"
                    >
                      <span className="mr-2">{language.flag}</span>
                      {language.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Theme Toggle */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                toggleTheme();
              }}
              className="relative flex items-center justify-center cursor-pointer bg-transparent border-none p-0 group outline-none hover:bg-muted/50 rounded-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center justify-center gap-1 px-2 py-1.5 text-muted-foreground group-hover:text-foreground transition-colors text-sm min-w-[2.5rem]">
                <span className="text-lg">
                  {theme === 'dark' ? '☀️' : '🌙'}
                </span>
              </div>
            </motion.button>

            {/* Sign In Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                handleSignIn();
              }}
              className="relative flex items-center justify-center cursor-pointer bg-transparent border-none p-0 group outline-none hover:bg-muted/50 rounded-xl transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center justify-center gap-1 px-2 py-1.5 text-muted-foreground group-hover:text-foreground transition-colors text-sm min-w-[2.5rem]">
                <span className="text-lg">
                  👤
                </span>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default UtilityMenu;