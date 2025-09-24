"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Globe2, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BottomDrawerMenuProps {
    open: boolean;
    onClose: () => void;
    menuItems: Array<{
        icon: React.ReactNode;
        label: string | React.ReactNode;
        href: string;
        submenu?: Array<{
            label: string | React.ReactNode;
            href: string;
        }>
    }>;
}

export default function BottomDrawerMenu({ open, onClose, menuItems }: BottomDrawerMenuProps) {
    const { theme, setTheme } = useTheme();

    return (
        <Drawer open={open} onOpenChange={(isOpen) => {
            if (!isOpen) {
                onClose();
            }
        }}>
            <DrawerContent className="max-h-[80vh] z-[999]">
                <div className="mx-auto w-full max-w-2xl">
                    <DrawerHeader>
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                                <Image
                                    src="/images/issi_logo.png"
                                    alt="ISSI Logo"
                                    width={40}
                                    height={40}
                                    className="rounded-sm"
                                />
                                <DrawerTitle className="text-lg font-semibold">Menu</DrawerTitle>
                            </div>
                            <div className="flex items-center gap-3">
                                <Button variant="ghost" size="icon" aria-label="Switch language">
                                    <Globe2 className="h-5 w-5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    aria-label="Toggle theme"
                                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                >
                                    {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                </Button>
                            </div>
                        </div>
                    </DrawerHeader>

                    <div className="overflow-y-auto flex-1 px-6 pb-6">
                        <div className="flex flex-col gap-2 w-full">
                            {menuItems.map((item) => (
                                item.submenu ? (
                                    <Accordion type="single" collapsible key={item.href} className="border-b border-border/20">
                                        <AccordionItem value={item.href}>
                                            <AccordionTrigger>
                                                <span className="flex items-center gap-3 py-3 text-lg font-semibold text-foreground">
                                                    <span className="inline-flex items-center justify-center h-7 w-7 rounded bg-muted/50">
                                                        {item.icon}
                                                    </span>
                                                    <span>{typeof item.label === "string" ? item.label : item.label}</span>
                                                </span>
                                            </AccordionTrigger>
                                            <AccordionContent className="pl-10">
                                                <ul className="flex flex-col gap-2">
                                                    {item.submenu.map((sub) => (
                                                        <li key={sub.href} className="text-base text-muted-foreground">
                                                            <Link href={sub.href} className="hover:underline">
                                                                {typeof sub.label === "string" ? sub.label : sub.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                ) : (
                                    <Link href={item.href} key={item.href} className="flex items-center gap-3 py-3 text-lg font-semibold text-foreground hover:bg-muted/40 rounded">
                                        <span className="inline-flex items-center justify-center h-7 w-7 rounded bg-muted/50">
                                            {item.icon}
                                        </span>
                                        <span>{typeof item.label === "string" ? item.label : item.label}</span>
                                    </Link>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
