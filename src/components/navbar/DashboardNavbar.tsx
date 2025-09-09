"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Locale } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  Building2,
  GraduationCap,
  HelpCircle,
  LogOut,
  Mail,
  Menu,
  Package,
  Settings,
  ShieldCheck,
  User,
  Wrench
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { forwardRef, useEffect, useState } from "react";
import { FormattedMessage, IntlProvider } from "react-intl";
import ThemeToggle from "../ThemeToggle";

interface DashboardNavbarProps {
  locale: Locale;
  messages: Record<string, string>;
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  notificationCount?: number;
  onNavItemClick?: (href: string) => void;
  onInfoItemClick?: (item: string) => void;
  onNotificationItemClick?: (item: string) => void;
  onUserItemClick?: (item: string) => void;
}

interface NavItem {
  title: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
}

interface NavigationSection {
  title: string;
  items: NavItem[];
}

export default function DashboardNavbar({
  locale,
  messages,
  userName = "ISSI User",
  userEmail = "user@issi-software.com",
  userAvatar,
  notificationCount = 0,
  onNavItemClick,
  onInfoItemClick,
  onNotificationItemClick,
  onUserItemClick,
}: DashboardNavbarProps) {
  const _pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleResize = () => {
      setContainerWidth(window.innerWidth);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Main navigation items (dropdown sections) - now empty since eLearning and Compliance moved to top-level
  const navigationItems: NavigationSection[] = [];

  // Top-level nav items
  const topNavItems: NavItem[] = [
    {
      title: messages["common.navigation.services"] || "Services",
      href: `/${locale}/services`,
      icon: <Wrench className="h-4 w-4" />,
    },
    {
      title: messages["common.navigation.products"] || "Products",
      href: `/${locale}/products`,
      icon: <Package className="h-4 w-4" />,
    },
    {
      title: messages["common.navigation.jobs"] || "Jobs",
      href: `/${locale}/jobs`,
      icon: <Briefcase className="h-4 w-4" />,
    },
    {
      title: messages["common.navigation.government"] || "Government",
      href: `/${locale}/government`,
      icon: <Building2 className="h-4 w-4" />,
    },
    {
      title: messages["common.navigation.eLearning"] || "eLearning",
      href: `/${locale}/eLearning`,
      icon: <GraduationCap className="h-4 w-4" />,
    },
    {
      title: messages["common.navigation.compliance"] || "Compliance",
      href: `/${locale}/compliance`,
      icon: <ShieldCheck className="h-4 w-4" />,
    },
    {
      title: messages["common.navigation.about"] || "About",
      href: `/${locale}/about`,
      icon: <User className="h-4 w-4" />,
    },
  ];

  // Single navigation items (now empty since all moved to top-level)
  const singleNavItems: NavItem[] = [];

  // Info menu items
  const _infoMenuItems = [
    { id: "help", label: "Help Center", icon: <HelpCircle className="h-4 w-4" /> },
    { id: "docs", label: "Documentation", icon: <Package className="h-4 w-4" /> },
    { id: "support", label: "Contact Support", icon: <Mail className="h-4 w-4" /> },
  ];

  // User menu items  
  const userMenuItems = [
    { id: "profile", label: "Profile", icon: <User className="h-4 w-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="h-4 w-4" /> },
    { id: "logout", label: "Sign Out", icon: <LogOut className="h-4 w-4" /> },
  ];

  // Mock notifications
  const _notifications = [
    { id: "1", title: "System Update", message: "New features available", time: "5m ago" },
    { id: "2", title: "Security Alert", message: "Login from new device", time: "1h ago" },
    { id: "3", title: "Welcome", message: "Account setup complete", time: "2h ago" },
  ];

  const isMobile = containerWidth < 768;

  return (
    <IntlProvider locale={locale} messages={messages}>
      <nav
        className={cn(
          "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200",
          isScrolled && "shadow-sm"
        )}
      >
        <div className="container flex h-14 items-center">
          <NavigationMenu>
            <NavigationMenuList>
              {/* Logo */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href={`/${locale}/home`} className="flex items-center space-x-2 mr-6">
                    <Image
                      src="/images/issi_logo.png"
                      alt="ISSI Logo"
                      width={120}
                      height={40}
                      className="h-8 w-auto drop-shadow-sm"
                      priority
                    />
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Top-level Services, Products, Government */}
              {topNavItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link href={item.href} className={navigationMenuTriggerStyle()}>
                      <span className="inline-flex items-center">
                        {item.icon}
                        <span className="ml-2">{item.title}</span>
                      </span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

              {/* Dropdown Sections */}
              {navigationItems.map((section) => (
                <NavigationMenuItem key={section.title}>
                  <NavigationMenuTrigger>
                    {section.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {section.items.map((item) => (
                        <ListItem
                          key={item.href}
                          title={item.title}
                          href={item.href}
                          onClick={() => onNavItemClick?.(item.href)}
                        >
                          <div className="flex items-start gap-2">
                            {item.icon}
                            <div>
                              <div className="">{item.title}</div>
                              {item.description && (
                                <p className="line-clamp-2  ">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}

              {/* Single Items */}
              {singleNavItems.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link href={item.href} className={navigationMenuTriggerStyle()}>
                      <span className="inline-flex items-center">
                        {item.icon}
                        <span className="ml-2">{item.title}</span>
                      </span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          {/* Right-side content outside nav */}
          <div className="flex flex-1 items-center justify-end space-x-2">
            {/* Contact Button */}
            <Button
              variant="ghost"
              size="sm"
              className="inline-flex items-center"
              onClick={() => router.push(`/${locale}/contact`)}
            >
              <Mail className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">
                <FormattedMessage id="common.navigation.contact" defaultMessage="Contact" />
              </span>
            </Button>
            {/* Theme Toggle */}
            <ThemeToggle />
            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback>
                      {userName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="">{userName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userMenuItems.map((item) => (
                  <DropdownMenuItem
                    key={item.id}
                    onClick={() => onUserItemClick?.(item.id)}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  className="md:hidden"
                  size="sm"
                >
                  <span className="inline-flex items-center">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  <Link href={`/${locale}/home`} className="flex items-center">
                    <span className="inline-flex items-center">
                      <Image
                        src="/images/issi_logo.png"
                        alt="ISSI Logo"
                        width={120}
                        height={40}
                        className="h-8 w-auto"
                      />
                    </span>
                  </Link>
                  <Separator />

                  {/* Mobile Navigation Items */}
                  <div className="grid gap-2 py-4">
                    <Link
                      href={`/${locale}/home`}
                      className="flex items-center gap-2 px-2 py-1  "
                    >
                      <Image
                        src="/images/issi_logo.png"
                        alt="ISSI Logo"
                        width={16}
                        height={16}
                        className="rounded"
                      />
                      <FormattedMessage id="common.navigation.home" defaultMessage="Home" />
                    </Link>

                    {topNavItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-2 px-2 py-1  "
                      >
                        {item.icon}
                        {item.title}
                      </Link>
                    ))}

                    {singleNavItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-2 px-2 py-1  "
                      >
                        {item.icon}
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </nav>
    </IntlProvider>
  );
}

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, onClick, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href!}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          onClick={onClick}
          {...props}
        >
          {children}
        </Link>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
