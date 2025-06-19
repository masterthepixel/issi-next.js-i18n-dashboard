"use client";

import clsx from "clsx";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { FormattedMessage, IntlProvider } from "react-intl";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import useOutsideClick from "@/hooks/useOutsideClick";
import { Locale, User } from "@/lib/definitions";
import ThemeToggle from "./ThemeToggle";
import { FloatingNav } from "./ui/floating-navbar";

interface Props {
  user: User;
  locale: Locale;
  messages: Record<string, string>;
}

export default function NavbarContent({ user: _user, locale, messages }: Props) {
  const pathname = usePathname();

  const appMenuRef = useRef(null);
  const userMenuRef = useRef(null);
  const langSwitcherMenuRef = useRef(null);

  const [appMenuOpen, setAppMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [langSwitcherMenuOpen, setLangSwitcherMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useOutsideClick(appMenuRef, () => {
    setAppMenuOpen(false);
  });

  useOutsideClick(userMenuRef, () => {
    setUserMenuOpen(false);
  });

  useOutsideClick(langSwitcherMenuRef, () => {
    setLangSwitcherMenuOpen(false);
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
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

  // Navigation items for FloatingNav
  const navItems = [
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
    },  ];  return (
    <IntlProvider locale={locale} messages={messages}>
        <nav className="sticky top-0 left-0 z-50 w-full transition-all duration-300">
          <div className="max-w-7xl mx-auto">
            <div className={`flex items-center justify-between px-2 transition-all duration-300 ${
              isScrolled ? 'h-12' : 'h-16'
            }`}><div className="flex items-center flex-1">
              <Link href={`/${locale}/home`} className="flex items-center hover:opacity-80 transition-opacity">
                <Image
                  src="/images/issi_logo.png"
                  alt="ISSI Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto drop-shadow-md"
                  priority
                />
              </Link>
              
              {/* Floating Navigation for Desktop - Centered */}
              <div className="flex-1 flex justify-center">
                <FloatingNav navItems={navItems} locale={locale} />
              </div>
              <div className="relative ml-1 hidden">                <button
                  type="button"
                  className="rounded-full p-1 text-slate-500 hover:text-slate-600 dark:text-slate-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-slate-600/50 transition-all"
                  id="app-menu-button"
                  aria-haspopup="true"
                  aria-expanded={appMenuOpen ? "true" : "false"}
                  aria-label="Open navigation menu"
                  onClick={handleAppMenuClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>                </button>{appMenuOpen && (
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
              <div className="flex items-center border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] px-2 py-1 space-x-1">
                {/* Contact Icon */}
                <Link
                  href={`/${locale}/contact`}
                  className="rounded-full p-2 text-slate-500 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-all flex items-center"
                  aria-label="Contact us"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                      />
                    </svg>
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

const Menu = forwardRef<HTMLDivElement, MenuProps>(function Menu({ align = "right", children, ...rest }, ref) {  return (
    <div
      ref={ref}
      role="menu"
      className={clsx(
        "absolute z-10 w-48 mt-2 origin-top-right rounded-md glass-effect py-1 focus:outline-none animate-fade-in transform transition-all duration-200 ease-out translate-y-0 opacity-100",
        { "left-0": align === "left", "right-0": align === "right" }
      )}
      aria-orientation="vertical"
      tabIndex={-1}
      {...rest}
    >
      {children}
    </div>
  );
});

interface MenuItemProps {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}

function MenuItem({ href, active, children }: MenuItemProps) {  return (
    <Link
      href={href}
      tabIndex={-1}
      role="menuitem"
      className={clsx(
        "block px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-700/50 transition-colors",
        { "bg-white/60 dark:bg-slate-700/60 font-medium": active }
      )}
    >
      {children}
    </Link>
  );
}
