'use client'
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  Home, 
  Wrench, 
  Package, 
  Building2, 
  GraduationCap, 
  ShieldCheck, 
  User 
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FormattedMessage } from 'react-intl';

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

  const menuItems: HoverGradientMenuItem[] = [
    { 
      icon: <Home className="h-5 w-5" />, 
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
      icon: <User className="h-5 w-5" />, 
      label: <FormattedMessage id="common.navigation.about" defaultMessage="About" />, 
      href: `/${locale}/about`, 
      gradient: "radial-gradient(circle, hsl(var(--chart-5) / 0.15) 0%, hsl(var(--chart-5) / 0.06) 50%, hsl(var(--chart-5) / 0) 100%)", 
      iconColor: "group-hover:text-primary" 
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
        <ul className="flex items-center justify-around md:justify-center gap-0.5 md:gap-1 relative z-10">
          {menuItems.map((item: HoverGradientMenuItem) => {
            const isActive = pathname === item.href;
            
            return (
              <motion.li key={item.href} className="relative flex-1 md:flex-none">
                <motion.div
                  className={`block rounded-xl md:rounded-2xl overflow-visible group relative ${
                    isActive ? 'bg-muted/50' : ''
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
                    <Link href={item.href} className="flex flex-col md:flex-row items-center gap-0.5 md:gap-1.5">
                      <span className={`transition-colors duration-300 ${item.iconColor} ${
                        isActive ? 'text-foreground' : ''
                      }`}>
                        {item.icon}
                      </span>
                      {item.href !== `/${locale}/home` && (
                        <span className="hidden md:inline font-medium">{item.label}</span>
                      )}
                    </Link>
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
                    <Link href={item.href} className="flex flex-col md:flex-row items-center gap-0.5 md:gap-1.5">
                      <span className={`transition-colors duration-300 ${item.iconColor} ${
                        isActive ? 'text-foreground' : ''
                      }`}>
                        {item.icon}
                      </span>
                      {item.href !== `/${locale}/home` && (
                        <span className="hidden md:inline font-medium">{item.label}</span>
                      )}
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.li>
            );
          })}
        </ul>
      </motion.nav>
    </div>
  );
}

export default HoverGradientNavBar;