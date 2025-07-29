"use client";

import clsx from "clsx";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { FormattedMessage, IntlProvider } from "react-intl";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Globe, Home } from "lucide-react";

import { FloatingNav } from "@/components/ui/floating-navbar";
import useOutsideClick from "@/hooks/useOutsideClick";
import { Locale, User } from "@/lib/definitions";
import ThemeToggle from "./ThemeToggle";

interface Props {
  user: User;
  locale: Locale;
  messages: Record<string, string>;
}

export default function NavbarContent({ user: _user, locale, messages }: Props) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const appMenuRef = useRef(null);
  const userMenuRef = useRef(null);
  const langSwitcherMenuRef = useRef(null);

  const [appMenuOpen, setAppMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [langSwitcherMenuOpen, setLangSwitcherMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useOutsideClick(appMenuRef, () => {
    setAppMenuOpen(false);
  });

  useOutsideClick(userMenuRef, () => {
    setUserMenuOpen(false);
  });

  useOutsideClick(langSwitcherMenuRef, () => {
    setLangSwitcherMenuOpen(false);
  });
  const handleAppMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setAppMenuOpen(!appMenuOpen);
  };

  // eslint-disable-next-line no-unused-vars
  const handleUserMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUserMenuOpen(!userMenuOpen);
  };

  const handleLangSwitcherMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLangSwitcherMenuOpen(!langSwitcherMenuOpen);
  };

  const handleClickOutside = () => {
    setAppMenuOpen(false);
    setUserMenuOpen(false);
    setLangSwitcherMenuOpen(false);
  };

  // Original floating pill navigation items
  const floatingNavItems = [
    {
      name: null, // Icon-only display
      link: `/${locale}/home`,
      icon: <Home className="size-4" />,
      ariaLabel: messages["common.navigation.home"] || "Home"
    },
    {
      name: <FormattedMessage id="common.navigation.services" />,
      link: `/${locale}/services`,
    },
    {
      name: <FormattedMessage id="common.navigation.products" />,
      link: `/${locale}/products`,
    },
    {
      name: <FormattedMessage id="common.navigation.government" />,
      link: `/${locale}/government`,
    },
    {
      name: <FormattedMessage id="common.navigation.eLearning" />,
      link: `/${locale}/eLearning`,
    },
    {
      name: "Compliance", // This will trigger dropdown behavior
      link: `/${locale}/compliance`,
    },
    {
      name: <FormattedMessage id="common.navigation.about" />,
      link: `/${locale}/about`,
    },
  ];

  return (
    <IntlProvider locale={locale} messages={messages}>
      <nav className="sticky top-0 left-0 z-50 w-full transition-all duration-300 bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className={`flex items-center justify-between px-2 transition-all duration-300 ${isScrolled ? 'h-12 py-8' : 'h-16 py-12'
            }`}>
            <div className="flex items-center flex-1">
              <Link href={`/${locale}/home`} className="flex items-center hover:opacity-80 transition-opacity backdrop-blur-sm">
                <Image
                  src="/images/issi_logo.png"
                  alt="ISSI Logo"
                  width={160}
                  height={60}
                  className="h-12 w-auto sm:h-14 md:h-16 lg:h-16 xl:h-18 drop-shadow-md"
                  priority
                />
              </Link>

              {/* Desktop Floating Pill Navigation - Visible on 1024px+ screens */}
              <div className="hidden lg:flex flex-1 justify-center">
                {mounted && (
                  <div className="w-full flex justify-center">
                    <FloatingNav navItems={floatingNavItems} />
                  </div>
                )}
              </div>
              {/* Mobile Hamburger Menu - Hidden on 1024px+ screens */}
              <div className="relative ml-1 lg:hidden">                <button
                type="button"
                className="rounded-full p-1 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-slate-600/50 transition-all"
                id="app-menu-button"
                aria-haspopup="true"
                aria-expanded={appMenuOpen ? "true" : "false"}
                aria-label="Open navigation menu"
                onClick={handleAppMenuClick}
              >
                <svg
                  className="size-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>                {appMenuOpen && (
                <Menu ref={appMenuRef} aria-labelledby="app-menu-button" align="left">
                  <MenuItem href={`/${locale}/services`}>
                    <FormattedMessage id="common.navigation.services" />
                  </MenuItem>
                  <MenuItem href={`/${locale}/products`}>
                    <FormattedMessage id="common.navigation.products" />
                  </MenuItem>
                  <MenuItem href={`/${locale}/government`}>
                    <FormattedMessage id="common.navigation.government" />
                  </MenuItem>
                  <MenuItem href={`/${locale}/eLearning`}>
                    <FormattedMessage id="common.navigation.eLearning" />
                  </MenuItem>
                  <MenuItem href={`/${locale}/compliance`}>
                    <FormattedMessage id="common.navigation.compliance" />
                  </MenuItem>                    <MenuItem href={`/${locale}/about`}>
                    <FormattedMessage id="common.navigation.about" />
                  </MenuItem>
                </Menu>
              )}
              </div>
            </div>            <div className="flex items-center">
              {/* Right Side Floating Pill */}
              <div
                className="flex items-center border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white px-2 py-1 space-x-1"
                style={{
                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)"
                }}
              >
                {/* Contact Icon */}
                <Link
                  href={`/${locale}/contact`}
                  className="rounded-full p-2 text-slate-500 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-all flex items-center"
                  aria-label="Contact us"
                >
                  <svg
                    className="size-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 2-8.4 7.05a1 1 0 0 1-1.2 0L1 2m18 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1m18 0v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2"
                    />
                  </svg>
                </Link>

                {/* Language Switcher */}
                <div className="relative">
                  <button
                    type="button"
                    className="rounded-full p-2 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-white transition-all"
                    id="lang-switcher-menu-button"
                    aria-haspopup="true"
                    aria-expanded={langSwitcherMenuOpen ? "true" : "false"}
                    aria-label="Switch language"
                    onClick={handleLangSwitcherMenuClick}
                  >
                    <Globe className="size-4" />
                  </button>
                  {langSwitcherMenuOpen && (
                    <Menu ref={langSwitcherMenuRef} aria-labelledby="lang-switcher-menu-button" align="right">                      <MenuItem href={`/en/${pathname ? pathname.split("/").slice(2).join("/") : ""}`} active={locale === "en"}>
                      <FormattedMessage id="common.language-switcher" values={{ locale: "en" }} />
                    </MenuItem>
                      <MenuItem href={`/fr/${pathname ? pathname.split("/").slice(2).join("/") : ""}`} active={locale === "fr"}>
                        <FormattedMessage id="common.language-switcher" values={{ locale: "fr" }} />
                      </MenuItem>
                      <MenuItem href={`/es/${pathname ? pathname.split("/").slice(2).join("/") : ""}`} active={locale === "es"}>
                        <FormattedMessage id="common.language-switcher" values={{ locale: "es" }} />
                      </MenuItem>
                    </Menu>
                  )}
                </div>                {/* Theme Toggle */}
                <div className="flex items-center">
                  <ThemeToggle />                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </IntlProvider>
  );
}

interface MenuProps {
  align?: "left" | "right";
  children: React.ReactNode;
  [x: string]: any;
}

const Menu = forwardRef<HTMLDivElement, MenuProps>(function Menu({ align = "right", children, ...rest }, ref) {
  return (
    <div
      ref={ref}
      role="menu"
      className={clsx(
        "absolute z-10 w-48 mt-2 origin-top-right rounded-md glass-effect py-1 focus:outline-none animate-fade-in transform transition-all duration-200 ease-out translate-y-0 opacity-100",
        { "left-0": align === "left", "right-0": align === "right" }
      )}
      aria-orientation="vertical"
      {...rest}
    >
      {children}
    </div>
  );
});

interface MenuItemProps {
  href: string;
  active?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

function MenuItem({ href, active, icon, children }: MenuItemProps) {
  return (
    <Link
      href={href}
      role="menuitem"
      className={clsx(
        "flex items-center gap-3 px-4 py-2 text-sm transition-colors",
        // Match floating nav color scheme
        active
          ? "text-neutral-900 dark:text-white font-medium bg-white/60 dark:bg-slate-700/60"
          : "text-neutral-600 dark:text-neutral-50 hover:bg-white/50 dark:hover:bg-slate-700/50"
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </Link>
  );
}
