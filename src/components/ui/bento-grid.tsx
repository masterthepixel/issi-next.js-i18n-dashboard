"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface BentoGridProps {
  className?: string;
  children: React.ReactNode;
}

export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto auto-rows-min", className)}>
      {children}
    </div>
  );
}

interface BentoGridItemProps {
  title: string;
  description: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  href?: string;
}

export function BentoGridItem({ title, description, header, icon, className, href }: BentoGridItemProps) {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-300 shadow-input dark:shadow-none p-4 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col space-y-2 overflow-hidden cursor-pointer",
        className
      )}
    >
      {" "}
      {header && <div className="flex-none">{header}</div>}
      <div className="group-hover/bento:translate-x-2 transition duration-300 relative z-10">
        {icon && <div className="mb-2 transition duration-300">{icon}</div>}
        {href ? (
          <Link href={href} className="block">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 tracking-tight text-xl mb-2 group-hover/bento:text-indigo-600 dark:group-hover/bento:text-indigo-400 transition duration-300">
              {title}
            </h3>
          </Link>
        ) : (
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 tracking-tight text-xl mb-2 group-hover/bento:text-indigo-500 transition duration-300">
            {title}
          </h3>
        )}
        <p className="text-slate-600 dark:text-slate-300 text-sm">{description}</p>
      </div>
      {href && (
        <div className="mt-auto pt-2 relative z-10">
          <Link
            href={href}
            className="inline-flex items-center text-sm text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
          >
            Learn more
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
