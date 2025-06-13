"use client";

import React from 'react';
import { cn } from "@/lib/utils";
import Link from "next/link";
import { EvervaultCard } from "./evervault-card";
import { useMotionValue } from "motion/react";
import { useState, useEffect } from "react";

interface BentoGridProps {
  className?: string;
  children: React.ReactNode;
}

export function BentoGrid({
  className,
  children,
}: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto auto-rows-min",
        className
      )}
    >
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

export function BentoGridItem({
  title,
  description,
  header,
  icon,
  className,
  href,
}: BentoGridItemProps) {
  const [isHovered, setIsHovered] = useState(false);
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);
  const [randomString, setRandomString] = useState("");

  useEffect(() => {
    // Generate random string only when hovered to save resources
    if (isHovered) {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < 1500; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      setRandomString(result);
    }
  }, [isHovered]);

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  function onMouseEnter() {
    setIsHovered(true);
  }

  function onMouseLeave() {
    setIsHovered(false);
  }  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-300 shadow-input dark:shadow-none p-4 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col space-y-2 overflow-hidden",
        className
      )}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >      {header && <div className="flex-none">{header}</div>}
      
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
        <p className="text-slate-600 dark:text-slate-300 text-sm">
          {description}
        </p>
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
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </Link>
        </div>
      )}

      {/* Evervault Card Effect */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {isHovered && (
          <EvervaultCardContent 
            mouseX={mouseX} 
            mouseY={mouseY} 
            randomString={randomString} 
          />
        )}
      </div>
    </div>
  );
}

// Simplified version of the Evervault card pattern for the bento grid
function EvervaultCardContent({ mouseX, mouseY, randomString }: any) {
  const { useMotionTemplate, motion } = require("motion/react");
  let maskImage = useMotionTemplate`radial-gradient(300px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 [mask-image:linear-gradient(white,transparent)] opacity-30"></div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-indigo-600/40 to-blue-600/40 opacity-60 backdrop-blur-sm transition duration-300"
        style={style}
      />
      <motion.div
        className="absolute inset-0 mix-blend-overlay opacity-40"
        style={style}
      >
        <p className="absolute inset-x-0 text-[10px] h-full break-words whitespace-pre-wrap text-white font-mono font-bold transition duration-300">
          {randomString}
        </p>
      </motion.div>
    </div>
  );
}
