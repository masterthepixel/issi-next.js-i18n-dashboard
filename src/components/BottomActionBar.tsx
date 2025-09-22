"use client";

import { getMenuItems } from "@/components/ui/hover-gradient-nav-bar";
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import BottomDrawerMenu from "./BottomDrawerMenu";

const BottomActionBar: React.FC = () => {
    const barRef = useRef<HTMLDivElement | null>(null);
    const portalRef = useRef<HTMLDivElement | null>(null);
    const [mounted, setMounted] = useState(false);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const menuItems = getMenuItems("en");

    useEffect(() => {
        // Create or reuse a dedicated portal root attached to HTML, not body
        let root = document.getElementById('bottom-action-bar-portal') as HTMLDivElement | null;
        if (!root) {
            root = document.createElement('div');
            root.id = 'bottom-action-bar-portal';
            // Attach to HTML element, not body, to avoid body position: relative issues
            document.documentElement.appendChild(root);
        }
        portalRef.current = root;
        setMounted(true);
    }, []);

    useEffect(() => {
        const bar = barRef.current;
        if (!bar) return;
        const buttons = bar.querySelectorAll('button.ux-btn');
        let selectedButton = bar.querySelector('.ux-btn.ux-selected') as HTMLButtonElement | null;

        const setAnchorOnSelected = () => {
            if (selectedButton) {
                selectedButton.style.setProperty('anchor-name', '--selected');
                selectedButton.setAttribute('aria-pressed', 'true');
            }
        };

        setAnchorOnSelected();

        const removers: Array<() => void> = [];

        buttons.forEach((buttonEl) => {
            const button = buttonEl as HTMLButtonElement;

            // Click handler
            const clickHandler = () => {
                if (selectedButton) {
                    selectedButton.classList.remove('ux-selected');
                    selectedButton.removeAttribute('aria-pressed');
                    selectedButton.style.removeProperty('anchor-name');
                }
                selectedButton = button;
                selectedButton.classList.add('ux-selected');
                setAnchorOnSelected();
            };
            button.addEventListener('click', clickHandler);
            removers.push(() => button.removeEventListener('click', clickHandler));

            // Hover and focus start
            const handleInteractionStart = () => {
                if (button !== selectedButton) {
                    if (selectedButton) {
                        selectedButton.style.removeProperty('anchor-name');
                    }
                    button.style.setProperty('anchor-name', '--selected');
                }
            };
            button.addEventListener('mouseenter', handleInteractionStart);
            button.addEventListener('focus', handleInteractionStart);
            removers.push(() => button.removeEventListener('mouseenter', handleInteractionStart));
            removers.push(() => button.removeEventListener('focus', handleInteractionStart));

            // Hover/blur end
            const handleInteractionEnd = () => {
                if (button !== selectedButton) {
                    button.style.removeProperty('anchor-name');
                    setAnchorOnSelected();
                }
            };
            button.addEventListener('mouseleave', handleInteractionEnd);
            button.addEventListener('blur', handleInteractionEnd);
            removers.push(() => button.removeEventListener('mouseleave', handleInteractionEnd));
            removers.push(() => button.removeEventListener('blur', handleInteractionEnd));
        });

        return () => {
            removers.forEach((off) => off());
            if (selectedButton) {
                selectedButton.style.removeProperty('anchor-name');
                selectedButton.removeAttribute('aria-pressed');
            }
        };
    }, []);

    const handleDrawerOpen = () => setDrawerOpen(true);
    const handleDrawerClose = () => setDrawerOpen(false);

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
                        pointer-events: none;
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
                        z-index: 99999 !important;
                        isolation: isolate;
                        margin: 0 !important;
                        top: auto !important;
                        right: auto !important;
                        width: auto !important;
                        height: auto !important;
                    }

                    .ux-ab .ux-btn {
                        position: relative;
                        width: 44px;
                        height: 44px;
                        padding: 10px 15px;
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
                <div ref={barRef} className="ux-action-bar" role="toolbar" aria-label="Quick actions">
                    <div className="ux-anchored-pointer" aria-hidden="true" />
                    <button className="ux-btn ux-selected" aria-label="Home" aria-pressed="true">
                        <span className="ux-icon material-symbols-outlined">home</span>
                    </button>
                    <button className="ux-btn" aria-label="Services">
                        <span className="ux-icon material-symbols-outlined">build</span>
                    </button>
                    <button className="ux-btn" aria-label="Products">
                        <span className="ux-icon material-symbols-outlined">inventory_2</span>
                    </button>
                    <button className="ux-btn" aria-label="Contact">
                        <span className="ux-icon material-symbols-outlined">alternate_email</span>
                    </button>
                    <button className="ux-btn" aria-label="Careers">
                        <span className="ux-icon material-symbols-outlined">person</span>
                    </button>
                    <button className="ux-btn" aria-label="Menu" onClick={handleDrawerOpen}>
                        <span className="ux-icon material-symbols-outlined">menu</span>
                    </button>
                    <a href="#top" className="ux-btn" aria-label="Back to top">
                        <span className="ux-icon material-symbols-outlined">arrow_upward</span>
                    </a>
                </div>
            </div>
            {/* Drawer menu */}
            <BottomDrawerMenu open={drawerOpen} onClose={handleDrawerClose} menuItems={menuItems} />
        </>
    );

    if (!mounted || !portalRef.current) return null;
    return createPortal(content, portalRef.current);
};

export default BottomActionBar;