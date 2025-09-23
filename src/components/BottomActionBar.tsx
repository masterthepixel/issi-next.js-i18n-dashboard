"use client";

import { getMenuItems } from "@/components/ui/hover-gradient-nav-bar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ArrowUp, Box, Briefcase, Home, Mail, Menu, User } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const BottomActionBar: React.FC = () => {
    const barRef = useRef<HTMLDivElement | null>(null);
    const portalRef = useRef<HTMLDivElement | null>(null);
    const [mounted, setMounted] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const menuItems = getMenuItems("en");

    useEffect(() => {
        // Create or reuse a dedicated portal root attached to BODY for correct event bubbling
        let root = document.getElementById('bottom-action-bar-portal') as HTMLDivElement | null;
        if (!root) {
            root = document.createElement('div');
            root.id = 'bottom-action-bar-portal';
            // Attach to BODY to ensure event bubbling for Radix UI popover
            document.body.appendChild(root);
        }
        portalRef.current = root;
        setMounted(true);
    }, []);

    // Button data for dock
    const dockButtons = [
        { label: "Home", icon: Home, href: "/home" },
        { label: "Services", icon: Briefcase, href: "/services" },
        { label: "Products", icon: Box, href: "/products" },
        { label: "Contact", icon: Mail, href: "/contact" },
        { label: "Careers", icon: User, href: "/careers" },
    ];

    const content = (
        <>
            <style jsx global>{`
                    /* Ensure portal root doesn't interfere */
                    #bottom-action-bar-portal {
                        position: static !important;
                        top: auto !important;
                        left: auto !important;
                        width: auto !important;
                        height: auto !important;
                        pointer-events: none !important;
                        z-index: auto !important;
                    }
                    
                    /* Re-enable pointer events for the actual bar */
                    #bottom-action-bar-portal .ux-action-bar {
                        pointer-events: auto !important;
                    }
                    
                    /* Positioning - namespaced vars to avoid clashes */
                    .ux-ab {
                        --ux-spring-easing: linear(0, 0.0018, 0.0069 1.15%, 0.026 2.3%, 0.0637, 0.1135 5.18%, 0.2229 7.78%, 0.5977 15.84%, 0.7014, 0.7904, 0.8641, 0.9228, 0.9676 28.8%, 1.0032 31.68%, 1.0225, 1.0352 36.29%, 1.0431 38.88%, 1.046 42.05%, 1.0448 44.35%, 1.0407 47.23%, 1.0118 61.63%, 1.0025 69.41%, 0.9981 80.35%, 0.9992 99.94%);
                    }

                    /* Material Symbols tuning within namespace */
                    .ux-ab .ux-icon.material-symbols-outlined {
                        font-family: 'Material Symbols Outlined', sans-serif;
                        font-size: 24px;
                        font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
                        background: none;
                        line-height: 1;
                        transition: filter 0.1s ease;
                        user-select: none;
                        -webkit-user-select: none;
                        /* pointer-events: none; Removed to allow tooltip triggers */
                    }

                    /* Viewport-fixed bar */
                    .ux-ab .ux-action-bar {
                        position: fixed !important;
                        left: 50vw !important;
                        bottom: 24px !important;
                        transform: translateX(-50%) !important;
                        display: flex;
                        align-items: center;
                        background-color: #fcfcfc;
                        border: 1px solid lightgray;
                        border-radius: 1rem;
                        padding: 0.5rem;
                        gap: 0.25rem;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                        z-index: 40 !important;
                        isolation: isolate;
                        margin: 0 !important;
                        top: auto !important;
                        right: auto !important;
                        width: auto !important;
                        height: auto !important;
                    }

                    .ux-ab .ux-btn {
                        position: relative;
                        width: 52px;
                        height: 52px;
                        padding: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border: none;
                        background: none;
                        border-radius: 50px;
                        margin: 0 6px;
                        cursor: pointer;
                        transition: background-color 0.3s ease, color 0.3s ease;
                        color: #0a0a0a;
                        z-index: 1;
                    }

                    .ux-ab .ux-btn:hover,
                    .ux-ab .ux-btn:focus { background-color: #f5f5f5; }
                    .ux-ab .ux-btn:focus { outline: none; }

                    .ux-ab .ux-btn.ux-selected { background-color: #fcebeb; color: red; }
                    .ux-ab .ux-btn.ux-selected:hover,
                    .ux-ab .ux-btn.ux-selected:focus { background-color: #fcebeb; }
                    .ux-ab .ux-btn.ux-selected .ux-icon.material-symbols-outlined {
                        filter: drop-shadow(0 0 4px tomato);
                        font-variation-settings: 'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24;
                    }

                    /* increase clickable area but prevent overlap */
                    .ux-ab .ux-btn::before {
                        content: '';
                        position: absolute;
                        inset: -0.2rem;
                        z-index: -1;
                    }

                    /* Anchored pointer lens */
                    .ux-ab .ux-anchored-pointer {
                        position: absolute;
                        position-anchor: --selected;
                        top: anchor(top);
                        left: anchor(left);
                        width: 3rem;
                        height: 5rem;
                        margin-top: calc(anchor-size(height) * -0.5);
                        display: block;
                        background: none;
                        border: 1px solid white;
                        border-radius: 2rem;
                        transition: all 1s var(--ux-spring-easing);
                        filter: drop-shadow(0 3px 6px gray);
                        pointer-events: none;
                        overflow: hidden;
                        backdrop-filter: url(#filter);
                    }
                    .ux-ab .ux-anchored-pointer::before {
                        content: '';
                        position: absolute;
                        inset: 0;
                        background:
                            radial-gradient(1rem 3rem ellipse at 50% 85% in oklch,
                                oklch(100% 0 0 / 0%) 10% 50%, 150%,
                                oklch(100% 0 0 / 100%) 175% 165%),
                            radial-gradient(2rem 3.5rem ellipse at 45% 35% in oklch,
                                oklch(0% 0 0 / 0%) 80%, gray 150%);
                    }

                    @media (prefers-reduced-motion: reduce) {
                        .ux-ab .ux-anchored-pointer { transition: none; }
                    }
                `}</style>
            <div className="ux-ab">
                <TooltipProvider delayDuration={100}>
                    <div ref={barRef} className="ux-action-bar" role="toolbar" aria-label="Quick actions" style={{ position: "relative" }}>
                        {/* Glass droplet pointer */}
                        <div
                            className="ux-anchored-pointer"
                            aria-hidden="true"
                            style={{
                                position: "absolute",
                                left: `${selectedIndex * 64 + 12}px`,
                                top: "8px",
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                background: "rgba(255,255,255,0.25)",
                                boxShadow: "0 4px 16px 0 rgba(0,0,0,0.12)",
                                zIndex: 10,
                                transition: "left 0.3s cubic-bezier(.5,1.5,.5,1)",
                                pointerEvents: "none",
                            }}
                        />
                        {dockButtons.map((btn, idx) => {
                            const Icon = btn.icon;
                            return (
                                <Tooltip key={btn.label}>
                                    <TooltipTrigger asChild>
                                        <button
                                            className={`ux-btn group${selectedIndex === idx ? " ux-selected" : ""}`}
                                            aria-label={btn.label}
                                            aria-pressed={selectedIndex === idx}
                                            onClick={() => setSelectedIndex(idx)}
                                            style={{ zIndex: 2 }}
                                        >
                                            <Link href={btn.href} passHref legacyBehavior>
                                                <span style={{ display: "contents" }}>
                                                    <Icon className="ux-icon transition-transform group-hover:scale-[1.625] group-focus:scale-[1.625]" strokeWidth={2} size={32} />
                                                    <span className="sr-only">{btn.label}</span>
                                                </span>
                                            </Link>
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" sideOffset={16} className="bg-white dark:bg-gray-900 text-black dark:text-white border">{btn.label}</TooltipContent>
                                </Tooltip>
                            );
                        })}
                        <Popover>
                            <PopoverTrigger asChild>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            className="ux-btn ux-menu-btn group"
                                            aria-label="Menu"
                                            style={{ zIndex: 2 }}
                                        >
                                            <Menu className="ux-icon transition-transform group-hover:scale-[1.625] group-focus:scale-[1.625]" strokeWidth={2} size={32} />
                                            <span className="sr-only">Menu</span>
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" sideOffset={16} className="bg-white dark:bg-gray-900 text-black dark:text-white border">Menu</TooltipContent>
                                </Tooltip>
                            </PopoverTrigger>
                            <PopoverContent className="w-48 p-2">
                                {menuItems.map((item, index) => (
                                    <Link key={index} href={item.href} className="block px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                                        {item.label}
                                    </Link>
                                ))}
                            </PopoverContent>
                        </Popover>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <a href="#top" className="ux-btn group" aria-label="Back to top" style={{ zIndex: 2 }}>
                                    <ArrowUp className="ux-icon transition-transform group-hover:scale-[1.625] group-focus:scale-[1.625]" strokeWidth={2} size={32} />
                                    <span className="sr-only">Back to top</span>
                                </a>
                            </TooltipTrigger>
                            <TooltipContent side="top" sideOffset={16} className="bg-white dark:bg-gray-900 text-black dark:text-white border">Back to top</TooltipContent>
                        </Tooltip>
                    </div>
                </TooltipProvider>
            </div>
        </>
    );

    if (!mounted || !portalRef.current) return null;

    return (
        <>
            {createPortal(content, portalRef.current)}
        </>
    );
};

export default BottomActionBar;