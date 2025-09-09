"use client";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion
} from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface NavItem {
  name: string | React.ReactNode | null;
  link: string;
  icon?: React.ReactNode;
  ariaLabel?: string;
}

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: NavItem[];
  className?: string;
}) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoize the nav items rendering to avoid recomputing classes on each render
  const rendered = React.useMemo(() => {
    return navItems.map((navItem: NavItem, idx: number) => {
      const link = navItem.link || "";
      // Prefer strict match or prefix match for the active state when mounted.
      const isActive = mounted && pathname
        ? pathname === link || pathname.startsWith(link)
        : false;

      return (
        <Link
          key={`link-${idx}`}
          href={link}
          className={cn(
            "relative text-neutral-600 dark:text-neutral-50 items-center flex space-x-1 rounded-full px-4 py-2 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-800",
            isActive ? "text-neutral-900 dark:text-white font-medium" : ""
          )}
          aria-label={navItem.ariaLabel ?? (typeof navItem.name === 'string' ? navItem.name : undefined)}
          aria-current={isActive ? 'page' : undefined}
        >
          <span className="block sm:hidden">{navItem.icon}</span>
          <span className="">{navItem.name}</span>
        </Link>
      );
    });
  }, [navItems, mounted, pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white pr-2 pl-8 py-2 items-center justify-center space-x-4 lg:flex",
          className
        )}
        style={{
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
        }}
      >
        {rendered}
      </motion.div>
    </AnimatePresence>
  );
};

