'use client'
import React from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

// --- Logo Component (Cloned from HoverGradientNavBar) ---

interface LogoMenuItem {
  icon: React.ReactNode;
  label: string | React.ReactNode;
  href: string;
  gradient: string;
  iconColor: string;
}

interface LogoProps {
  locale: string;
}

// Animation variants (copied exactly from main navigation)
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

function Logo({ locale }: LogoProps): React.JSX.Element {
  const pathname = usePathname();
  
  const handleClick = (e: React.MouseEvent) => {
    console.log('Logo clicked!', e);
    console.log('Target:', e.target);
    console.log('CurrentTarget:', e.currentTarget);
  };

  // Single logo menu item
  const logoItem: LogoMenuItem = {
    icon: (
      <Image
        src="/images/issi_logo.png"
        alt="ISSI Logo"
        width={40}
        height={40}
        className="rounded-lg"
        priority
      />
    ),
    label: '',
    href: `/${locale}/home`,
    gradient: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, hsl(var(--primary) / 0.06) 50%, hsl(var(--primary) / 0) 100%)",
    iconColor: "group-hover:text-primary"
  };

  const isActive = pathname === logoItem.href;

  return (
    <div 
      className="fixed top-4 left-6 z-[999] hidden md:block" 
      style={{ pointerEvents: 'auto' }}
    >
      <motion.nav
        className="w-fit px-1 md:px-2 py-1 md:py-2 rounded-none md:rounded-3xl 
        bg-background/90 backdrop-blur-lg 
        border-b md:border border-border/80 
        shadow-lg md:shadow-xl relative"
        initial="initial"
        whileHover="hover"
      >
        <ul className="flex items-center justify-center gap-0.5 md:gap-1 relative z-10">
          <motion.li key={logoItem.href} className="relative">
            <Link href={logoItem.href} className="block" onClick={handleClick}>
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
                    background: logoItem.gradient,
                    opacity: isActive ? 0.3 : 0,
                  }}
                />
                {/* Front-facing */}
                <motion.div
                  className="flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-1.5 
                  px-1.5 py-1 md:px-3 md:py-1.5 relative z-10 
                  bg-transparent text-muted-foreground 
                  group-hover:text-foreground 
                  transition-colors rounded-xl md:rounded-2xl text-xs md:text-sm cursor-pointer"
                  variants={itemVariants}
                  transition={sharedTransition}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center bottom"
                  }}
                >
                  <span className={`transition-colors duration-300 ${logoItem.iconColor} ${
                    isActive ? 'text-foreground' : ''
                  }`}>
                    {logoItem.icon}
                  </span>
                </motion.div>
                {/* Back-facing */}
                <motion.div
                  className="flex flex-col md:flex-row items-center justify-center gap-0.5 md:gap-1.5 
                  px-1.5 py-1 md:px-3 md:py-1.5 absolute inset-0 z-10 
                  bg-transparent text-muted-foreground 
                  group-hover:text-foreground 
                  transition-colors rounded-xl md:rounded-2xl text-xs md:text-sm cursor-pointer"
                  variants={backVariants}
                  transition={sharedTransition}
                  style={{
                    transformStyle: "preserve-3d",
                    transformOrigin: "center top",
                    transform: "rotateX(90deg)"
                  }}
                >
                  <span className={`transition-colors duration-300 ${logoItem.iconColor} ${
                    isActive ? 'text-foreground' : ''
                  }`}>
                    {logoItem.icon}
                  </span>
                </motion.div>
              </motion.div>
            </Link>
          </motion.li>
        </ul>
      </motion.nav>
    </div>
  );
}

export default Logo;