'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { FormattedMessage } from 'react-intl';
import { 
  Menu, 
  Wrench, 
  Package, 
  Building2, 
  GraduationCap, 
  ShieldCheck, 
  Briefcase, 
  BookOpen, 
  User, 
  Phone,
  MapPin,
  Award
} from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { NavigationCard } from '@/components/ui/navigation-card';
import { getNavigationItems } from '@/lib/navigation-constants';

interface MobileCardNavigationProps {
  locale: string;
  bannerVisible?: boolean;
}

const iconMap = {
  home: () => (
    <Image 
      src="/images/issi_logo.webp" 
      alt="ISSI Logo" 
      width={24} 
      height={24} 
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

export function MobileCardNavigation({ locale, bannerVisible }: MobileCardNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSubmenu, setShowSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  // Get navigation items with proper icons
  const navigationItems = getNavigationItems(locale).map((item) => ({
    ...item,
    title: <FormattedMessage id={`common.navigation.${item.id}`} defaultMessage={item.title as string} />,
    icon: iconMap[item.id as keyof typeof iconMap] || item.icon,
    submenu: item.submenu?.map((subItem) => ({
      ...subItem,
      icon: submenuIconMap[subItem.label as keyof typeof submenuIconMap] || ShieldCheck,
    })),
  }));

  // Close sheet when route changes
  useEffect(() => {
    setIsOpen(false);
    setShowSubmenu(null);
  }, [pathname]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const submenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: {
        height: { duration: 0.3 },
        opacity: { duration: 0.2, delay: 0.1 },
      },
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: {
        opacity: { duration: 0.2 },
        height: { duration: 0.3, delay: 0.1 },
      },
    },
  };

  return (
    <div 
      className={`md:hidden fixed top-0 right-4 z-50 ${
        bannerVisible ? 'top-12' : 'top-4'
      }`}
    >
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="bg-background/90 backdrop-blur-lg border-border/80 shadow-lg"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">
              <FormattedMessage id="navigation.mobile.open" defaultMessage="Open navigation menu" />
            </span>
          </Button>
        </SheetTrigger>

        <SheetContent 
          side="right" 
          className="w-full sm:w-96 p-0"
        >
          <SheetHeader className="p-6 pb-4">
            <SheetTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image 
                  src="/images/issi_logo.webp" 
                  alt="ISSI Logo" 
                  width={32} 
                  height={32} 
                  className="rounded-sm" 
                />
                <span className="text-lg font-semibold">Navigation</span>
              </div>
            </SheetTitle>
          </SheetHeader>

          <div className="px-6 pb-6 h-full overflow-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-3"
            >
              {navigationItems.map((item) => (
                <motion.div key={item.href} variants={itemVariants}>
                  <NavigationCard
                    title={item.title}
                    href={item.href}
                    description={item.description}
                    icon={item.icon}
                    gradient={item.gradient}
                    isActive={pathname === item.href}
                    onClick={() => {
                      if (item.submenu) {
                        setShowSubmenu(showSubmenu === item.id ? null : item.id);
                      } else {
                        setIsOpen(false);
                      }
                    }}
                  />

                  {/* Submenu */}
                  {item.submenu && (
                    <AnimatePresence>
                      {showSubmenu === item.id && (
                        <motion.div
                          variants={submenuVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="ml-4 mt-2 space-y-2 overflow-hidden"
                        >
                          {item.submenu.map((subItem) => (
                            <NavigationCard
                              key={subItem.href}
                              title={subItem.label}
                              href={subItem.href}
                              description={subItem.description}
                              icon={subItem.icon}
                              gradient="radial-gradient(circle, hsl(var(--muted) / 0.1) 0%, transparent 50%)"
                              isActive={pathname === subItem.href}
                              onClick={() => setIsOpen(false)}
                            />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}