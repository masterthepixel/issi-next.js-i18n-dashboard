"use client";

import { Locale } from "@/lib/definitions";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from "@heroicons/react/20/solid";
import {
  CheckBadgeIcon,
  ClipboardDocumentCheckIcon,
  LockClosedIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormattedMessage } from "react-intl";

interface Props {
  locale: Locale;
}

export default function TopNav({ locale }: Props) {
  const pathname = usePathname();
  // Compliance submenu items
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
  const callsToAction = [
    {
      name: <FormattedMessage id="compliance.menu.cta.demo" defaultMessage="Watch demo" />,
      href: "#",
      icon: PlayCircleIcon,
    },
    {
      name: <FormattedMessage id="compliance.menu.cta.contact" defaultMessage="Contact sales" />,
      href: "#",
      icon: PhoneIcon,
    },
  ];

  return (
    <div className="hidden lg:flex items-center justify-center flex-1 space-x-8">
      <Link
        href={`/${locale}/services`} className={`flex items-center  text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-5 border-b-2 transition-all ${pathname?.includes("/services")
          ? "border-blue-500 text-blue-600 dark:text-blue-400 font-medium"
          : "border-transparent"
          }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z"
          />
        </svg>
        <FormattedMessage id="common.navigation.services" />
      </Link>{" "}
      <Link
        href={`/${locale}/products`} className={`flex items-center  text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-5 border-b-2 transition-all ${pathname?.includes("/products")
          ? "border-blue-500 text-blue-600 dark:text-blue-400 font-medium"
          : "border-transparent"
          }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
          />
        </svg>
        <FormattedMessage id="common.navigation.products" />
      </Link>{" "}
      <Link
        href={`/${locale}/government`} className={`flex items-center  text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-5 border-b-2 transition-all ${pathname?.includes("/government")
          ? "border-blue-500 text-blue-600 dark:text-blue-400 font-medium"
          : "border-transparent"
          }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
          />
        </svg>
        <FormattedMessage id="common.navigation.government" />
      </Link>{" "}
      <Link
        href={`/${locale}/eLearning`} className={`flex items-center  text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-5 border-b-2 transition-all ${pathname?.includes("/eLearning")
          ? "border-blue-500 text-blue-600 dark:text-blue-400 font-medium"
          : "border-transparent"
          }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
          />
        </svg>
        <FormattedMessage id="common.navigation.eLearning" />
      </Link>{" "}
      {/* Compliance Popover */}
      <Popover className="relative">        <PopoverButton
        className={`inline-flex items-center gap-x-1  font-semibold py-5 border-b-2 transition-all ${pathname?.includes("/compliance")
          ? "border-blue-500 text-blue-600 dark:text-blue-400 font-medium"
          : "border-transparent text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400"
          }`}
      >
        <span>
          <FormattedMessage id="common.navigation.compliance" defaultMessage="Compliance" />
        </span>
        <ChevronDownIcon aria-hidden="true" className="size-5" />
      </PopoverButton>
        <PopoverPanel className="absolute left-1/2 z-20 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white dark:bg-slate-900  " text-caption8174>
            <div className="p-4">
              {complianceLinks.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700">
                    <item.icon
                      aria-hidden="true"
                      className="size-6  " text-muted-foreground8906
                    />
                  </div>
                  <div>
                    <a href={item.href} className="font-semibold text-slate-900 dark:text-slate-100">
                      {item.name}
                      <span className="absolute inset-0" />
                    </a>
                    <p className="mt-1  " text-muted-foreground9309>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 divide-x divide-slate-900/5 dark:divide-slate-700 bg-slate-50 dark:bg-slate-800">
              {callsToAction.map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <item.icon aria-hidden="true" className="size-5 flex-none text-slate-400 dark:text-blue-400" />
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </PopoverPanel>
      </Popover>{" "}
      <Link
        href={`/${locale}/about`} className={`flex items-center  text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 py-5 border-b-2 transition-all ${pathname?.includes("/about")
          ? "border-blue-500 text-blue-600 dark:text-blue-400 font-medium"
          : "border-transparent"
          }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
          />
        </svg>
        <FormattedMessage id="common.navigation.about" />
      </Link>
    </div>
  );
}
