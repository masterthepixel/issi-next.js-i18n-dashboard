"use client";
import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  motion
} from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

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
          "flex max-w-fit border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] pr-2 pl-8 py-2 items-center justify-center space-x-4 lg:flex",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => {
          const isActive = pathname?.includes(navItem.link.split('/').pop()) || false;

          return (
            <Link
              key={`link-${idx}`}
              href={navItem.link}
              className={cn(
                "relative text-neutral-600 dark:text-neutral-50 items-center flex space-x-1 rounded-full px-4 py-2 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-neutral-800",
                isActive ? "text-neutral-900 dark:text-white font-medium" : ""
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="text-sm !cursor-pointer">{navItem.name}</span>
            </Link>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};
