"use client";

import { GlowEffect } from '@/components/motion-primitives/glow-effect';
import useClickOutside from '@/components/motion-primitives/useClickOutside';
import { getMenuItems } from '@/components/ui/hover-gradient-nav-bar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import 'flag-icons/css/flag-icons.min.css';
import {
    ArrowUp,
    Box,
    Briefcase,
    Home,
    Mail,
    Menu,
    Moon,
    Sun,
    User
} from 'lucide-react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FormattedMessage } from 'react-intl';
import useMeasure from 'react-use-measure';

const transition = {
    type: 'spring' as const,
    bounce: 0.1,
    duration: 0.25,
};

// Main navigation buttons for the dock
const DOCK_ITEMS = [
    {
        id: 'home',
        label: 'nav.home',
        icon: Home,
        href: '/home',
        color: 'text-blue-600 dark:text-blue-400',
    },
    {
        id: 'services',
        label: 'nav.services',
        icon: Briefcase,
        href: '/services',
        color: 'text-green-600 dark:text-green-400',
    },
    {
        id: 'products',
        label: 'nav.products',
        icon: Box,
        href: '/products',
        color: 'text-purple-600 dark:text-purple-400',
    },
    {
        id: 'contact',
        label: 'nav.contact',
        icon: Mail,
        href: '/contact',
        color: 'text-orange-600 dark:text-orange-400',
    },
    {
        id: 'careers',
        label: 'nav.careers',
        icon: User,
        href: '/careers',
        color: 'text-red-600 dark:text-red-400',
    },
];

export default function NewBottomActionBar() {
    const [_active, setActive] = useState<string | null>(null);
    const [contentRef, { height: heightContent }] = useMeasure();
    const [menuRef, { width: widthContainer }] = useMeasure();
    const [mounted, setMounted] = useState(false);
    const [maxWidth, setMaxWidth] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const portalRef = useRef<HTMLDivElement | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    const menuItems = getMenuItems("en");

    // Portal setup for body attachment
    useEffect(() => {
        let root = document.getElementById('bottom-action-bar-portal') as HTMLDivElement | null;
        if (!root) {
            root = document.createElement('div');
            root.id = 'bottom-action-bar-portal';
            document.body.appendChild(root);
        }
        portalRef.current = root;
        setMounted(true);
    }, []);

    useClickOutside(ref, () => {
        setIsMenuOpen(false);
        setActive(null);
    });

    useEffect(() => {
        if (!widthContainer || maxWidth > 0) return;
        setMaxWidth(widthContainer);
    }, [widthContainer, maxWidth]);

    // Theme toggle function
    const toggleTheme = () => {
        if (typeof window !== 'undefined') {
            const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
            document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark');
        }
    };

    // Menu content component
    const MenuContent = () => (
        <div className="flex flex-col gap-1 py-2">
            {/* Logo and Title */}
            <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
                <Image src="/images/issi_logo.png" alt="ISSI Logo" width={32} height={32} className="rounded-sm" />
                <span className="font-semibold text-lg text-foreground">Menu</span>
            </div>

            {/* Main Navigation */}
            <div className="flex flex-col gap-1 px-2 py-2">
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted text-base font-medium text-foreground transition-colors"
                    >
                        {item.icon && (
                            <span className="inline-flex items-center justify-center h-7 w-7 rounded bg-muted/50">
                                {item.icon}
                            </span>
                        )}
                        <span>{typeof item.label === 'string' ? item.label : item.label}</span>
                    </Link>
                ))}
            </div>

            {/* Controls Footer */}
            <div className="flex items-center justify-between gap-2 px-4 py-2 border-t border-border">
                {/* Theme Toggle */}
                <button
                    className="flex items-center gap-2 px-2 py-1 rounded hover:bg-muted transition-colors text-foreground"
                    aria-label="Toggle theme"
                    onClick={toggleTheme}
                >
                    <span className="inline-flex items-center justify-center h-6 w-6">
                        <Sun className="h-5 w-5 dark:hidden" />
                        <Moon className="h-5 w-5 hidden dark:inline" />
                    </span>
                    <span className="text-sm">Theme</span>
                </button>

                {/* Language Switcher */}
                <div className="flex items-center gap-2">
                    <button className="fi fi-gb w-5 h-4 rounded-sm" aria-label="Switch to English"></button>
                    <button className="fi fi-fr w-5 h-4 rounded-sm" aria-label="Switch to French"></button>
                    <button className="fi fi-es w-5 h-4 rounded-sm" aria-label="Switch to Spanish"></button>
                </div>
            </div>
        </div>
    );

    const content = (
        <MotionConfig transition={transition}>
            <div className="fixed bottom-0 left-0 w-full pointer-events-none z-50" ref={ref}>
                <div className="flex justify-center items-end pb-6">
                    <div className="relative pointer-events-auto">
                        {/* Expandable Menu Container */}
                        <div className="relative mb-2">
                            <div className="rounded-xl border border-border bg-background/80 backdrop-blur-md shadow-lg">
                                <div className="overflow-hidden">
                                    <AnimatePresence initial={false} mode='sync'>
                                        {isMenuOpen && (
                                            <motion.div
                                                key='menu-content'
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: heightContent || 0, opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                style={{ width: maxWidth }}
                                            >
                                                <div ref={contentRef} className="p-2">
                                                    <MenuContent />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* Main Dock */}
                        <div className="relative">
                            {/* Background with glow effect */}
                            <div className="absolute inset-0 rounded-2xl overflow-hidden">
                                <GlowEffect
                                    className="opacity-30"
                                    colors={['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))']}
                                    mode="pulse"
                                    blur="soft"
                                />
                            </div>

                            <div
                                className="relative flex items-center gap-2 p-3 rounded-2xl bg-background/90 backdrop-blur-md border border-border shadow-lg"
                                ref={menuRef}
                            >
                                <TooltipProvider delayDuration={100}>
                                    {/* Navigation Buttons */}
                                    {DOCK_ITEMS.map((item, idx) => {
                                        const Icon = item.icon;
                                        const isSelected = selectedIndex === idx;

                                        return (
                                            <Tooltip key={item.id}>
                                                <TooltipTrigger asChild>
                                                    <Link href={item.href}>
                                                        <motion.button
                                                            className={cn(
                                                                "relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200",
                                                                "hover:bg-muted focus:bg-muted focus:outline-none focus:ring-2 focus:ring-ring",
                                                                isSelected ? "bg-muted" : ""
                                                            )}
                                                            onClick={() => setSelectedIndex(idx)}
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}
                                                        >
                                                            <motion.div
                                                                className={cn("transition-all duration-200", item.color)}
                                                                whileHover={{ scale: 1.625 }}
                                                            >
                                                                <Icon size={20} strokeWidth={2} />
                                                            </motion.div>

                                                            {/* Glow effect on hover */}
                                                            <motion.div
                                                                className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
                                                                whileHover={{ opacity: 1 }}
                                                            >
                                                                <GlowEffect
                                                                    colors={[item.color.includes('blue') ? '#3b82f6' :
                                                                        item.color.includes('green') ? '#10b981' :
                                                                            item.color.includes('purple') ? '#8b5cf6' :
                                                                                item.color.includes('orange') ? '#f59e0b' : '#ef4444']}
                                                                    mode="static"
                                                                    blur="soft"
                                                                />
                                                            </motion.div>
                                                        </motion.button>
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent side="top" sideOffset={16}>
                                                    <FormattedMessage id={item.label} defaultMessage={item.id} />
                                                </TooltipContent>
                                            </Tooltip>
                                        );
                                    })}

                                    {/* Menu Button */}
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <motion.button
                                                className={cn(
                                                    "relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200",
                                                    "hover:bg-muted focus:bg-muted focus:outline-none focus:ring-2 focus:ring-ring",
                                                    isMenuOpen ? "bg-muted" : ""
                                                )}
                                                onClick={() => {
                                                    setIsMenuOpen(!isMenuOpen);
                                                    setActive(isMenuOpen ? null : 'menu');
                                                }}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <motion.div
                                                    className="text-muted-foreground transition-all duration-200"
                                                    whileHover={{ scale: 1.625 }}
                                                >
                                                    <Menu size={20} strokeWidth={2} />
                                                </motion.div>
                                            </motion.button>
                                        </TooltipTrigger>
                                        <TooltipContent side="top" sideOffset={16}>
                                            Menu
                                        </TooltipContent>
                                    </Tooltip>

                                    {/* Back to Top Button */}
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <motion.a
                                                href="#top"
                                                className="relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200 hover:bg-muted focus:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <motion.div
                                                    className="text-muted-foreground transition-all duration-200"
                                                    whileHover={{ scale: 1.625 }}
                                                >
                                                    <ArrowUp size={20} strokeWidth={2} />
                                                </motion.div>
                                            </motion.a>
                                        </TooltipTrigger>
                                        <TooltipContent side="top" sideOffset={16}>
                                            <FormattedMessage id="nav.backToTop" defaultMessage="Back to top" />
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MotionConfig>
    );

    if (!mounted || !portalRef.current) return null;

    return createPortal(content, portalRef.current);
}