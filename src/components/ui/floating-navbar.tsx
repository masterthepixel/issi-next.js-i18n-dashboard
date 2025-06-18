"use client";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
    CheckBadgeIcon,
    ClipboardDocumentCheckIcon,
    LockClosedIcon,
    ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import {
    AnimatePresence,
    motion,
    useScroll
} from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

interface NavItem {
  name: string | React.ReactNode;
  link: string;
  icon?: React.ReactNode;
  dropdown?: DropdownItem[];
}

interface DropdownItem {
  name: React.ReactNode;
  description?: React.ReactNode;
  href: string;
  icon?: React.ComponentType<any>;
}

export const FloatingNav = ({
  navItems,
  className,
  locale,
}: {
  navItems: NavItem[];
  className?: string;
  locale: string;
}) => {
  // eslint-disable-next-line no-unused-vars
  const { scrollYProgress } = useScroll();
  const pathname = usePathname();
  // eslint-disable-next-line no-unused-vars
  const [visible, setVisible] = useState(true); // Always visible as requested
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Compliance dropdown items (matching existing structure)
  const complianceLinks = [
    {
      name: <FormattedMessage id="common.navigation.compliance" defaultMessage="Compliance & Certifications" />,
      description: (
        <FormattedMessage
          id="compliance.carousel.subtitle"
          defaultMessage="Certified. Secure. Trusted by industry leaders and government agencies."
        />
      ),
      href: `/${locale}/compliance`,
      icon: CheckBadgeIcon,
    },
    {
      name: <FormattedMessage id="compliance.carousel.iso9001.title" defaultMessage="ISO 9001:2015 Certified" />,
      description: (
        <FormattedMessage
          id="compliance.carousel.iso9001.headline"
          defaultMessage="Internationally recognized for quality management systems."
        />
      ),
      href: `/${locale}/compliance/iso9001`,
      icon: CheckBadgeIcon,
    },
    {
      name: <FormattedMessage id="compliance.carousel.iso27001.title" defaultMessage="ISO 27001:2013 Certified" />,
      description: (
        <FormattedMessage
          id="compliance.carousel.iso27001.headline"
          defaultMessage="Information Security Management."
        />
      ),
      href: `/${locale}/compliance/iso27001`,
      icon: LockClosedIcon,
    },
    {
      name: <FormattedMessage id="compliance.carousel.mdot.title" defaultMessage="Maryland DOT MBE/DBE/SBE" />,
      description: (
        <FormattedMessage
          id="compliance.carousel.mdot.headline"
          defaultMessage="State of Maryland MBE/DBE/SBE Certification."
        />
      ),
      href: `/${locale}/compliance/mdot`,
      icon: ClipboardDocumentCheckIcon,
    },
    {
      name: <FormattedMessage id="compliance.carousel.cmmi3.title" defaultMessage="CMMI Level 3" />,
      description: (
        <FormattedMessage
          id="compliance.carousel.cmmi3.headline"
          defaultMessage="Capability Maturity Model Integration (CMMI) Level 3."
        />
      ),
      href: `/${locale}/compliance/cmmi3`,
      icon: ShieldCheckIcon,
    },
  ];

  const handleDropdownToggle = (itemName: string) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  };

  const handleDropdownClose = () => {
    setOpenDropdown(null);
  };

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
        }}        className={cn(
          "flex max-w-fit border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] pr-2 pl-8 py-2 items-center justify-center space-x-4 hidden lg:flex",
          className
        )}
        onMouseLeave={handleDropdownClose}
      >
        {navItems.map((navItem: any, idx: number) => {
          const isActive = pathname.includes(navItem.link.split('/').pop());
          const hasDropdown = navItem.name === "Compliance";
          
          if (hasDropdown) {
            return (
              <div key={`dropdown-${idx}`} className="relative">                <button
                  onClick={() => handleDropdownToggle(navItem.name)}
                  onMouseEnter={() => setOpenDropdown(navItem.name)}
                  className={cn(
                    "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 px-3 py-2 rounded-full transition-all border border-transparent hover:border-neutral-200 dark:hover:border-white/[0.2] group",
                    isActive ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border-neutral-200 dark:border-white/[0.2]" : ""
                  )}
                >
                  <span className="text-sm font-medium">{navItem.name}</span>
                  <ChevronDownIcon className="size-4" />
                  <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>{openDropdown === navItem.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 flex justify-center z-50"
                  >                    <div className="w-[720px]">
                      <div className="overflow-hidden rounded-3xl bg-white dark:bg-slate-900 shadow-lg ring-1 ring-gray-900/5 dark:ring-slate-700/40">
                        <div className="p-3">
                          {complianceLinks.map((item, compIdx) => (
                            <Link
                              key={compIdx}
                              href={item.href}
                              className="group relative flex gap-x-4 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                              onClick={handleDropdownClose}
                            >
                              <div className="mt-0.5 flex size-8 flex-none items-center justify-center rounded-lg bg-gray-50 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700">
                                <item.icon
                                  aria-hidden="true"
                                  className="size-4 text-slate-600 dark:text-indigo-400 group-hover:text-indigo-600"
                                />
                              </div>
                              <div>
                                <div className="font-medium text-sm text-slate-900 dark:text-slate-100">
                                  {item.name}
                                </div>
                                <p className="mt-0.5 text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{item.description}</p>
                              </div>
                          </Link>                        ))}
                      </div>
                    </div>
                    </div>
                  </motion.div>
                )}
              </div>
            );
          }          return (            <Link
              key={`link-${idx}`}
              href={navItem.link}
              className={cn(
                "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 px-3 py-2 rounded-full transition-all border border-transparent hover:border-neutral-200 dark:hover:border-white/[0.2] group",
                isActive ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border-neutral-200 dark:border-white/[0.2]" : ""
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="text-sm font-medium">{navItem.name}</span>
              <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </Link>
          );
        })}
      </motion.div>
    </AnimatePresence>
  );
};
