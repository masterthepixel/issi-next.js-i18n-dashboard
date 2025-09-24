"use client";

import { Button } from "@/components/ui/button";
import { Locale } from "@/lib/definitions";
import {
  AcademicCapIcon,
  BookOpenIcon,
  BuildingLibraryIcon,
  CubeIcon,
  DocumentTextIcon,
  InformationCircleIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  ShieldExclamationIcon,
  TicketIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';
import { Facebook, Linkedin, Youtube } from 'lucide-react';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormattedMessage, IntlProvider } from "react-intl";

interface FooterProps {
  locale: Locale;
  messages: Record<string, string>;
}

export default function Footer({ locale, messages }: FooterProps) {
  const _pathname = usePathname();
  const router = useRouter();
  // Social media data with Lucide React icons
  const socialLinks = [
    {
      name: 'footer.social.facebook',
      href: 'https://www.facebook.com/issiusa',
      icon: Facebook
    },
    {
      name: 'footer.social.youtube',
      href: 'https://www.youtube.com/channel/UC-I7GRxuzcLOZLcGVHV96bQ',
      icon: Youtube
    },
    {
      name: 'footer.social.linkedin',
      href: 'https://www.linkedin.com/company/international-software-systems-inc.',
      icon: Linkedin
    }
  ]; const currentYear = new Date().getFullYear();
  return (
    <IntlProvider locale={locale} messages={messages}>
      <footer className="relative z-10 w-full mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Section with Brand and Description */}
          <div className="py-12">
            {/* <Separator className="mb-12" /> */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Brand Section */}
              <div className="lg:col-span-1">
                <h2 className="text-foreground mb-4">
                  International Software Systems, Inc.
                </h2>
                <p className="text-sm text-muted-foreground">
                  <FormattedMessage id="footer.company.description" defaultMessage="Leading technology solutions provider specializing in cybersecurity, compliance, and digital transformation for government and enterprise clients." />
                </p>
              </div>

            </div>

            {/* Navigation Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Services */}
                <div>
                  <h3 className="text-foreground mb-4">
                    <FormattedMessage id="footer.sections.services" />
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start p-0 h-auto  "
                        onClick={() => router.push(`/${locale}/services`)}
                      >
                        <WrenchScrewdriverIcon className="h-4 w-4 mr-2" />
                        <FormattedMessage id="common.navigation.services" />
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start p-0 h-auto  "
                        onClick={() => router.push(`/${locale}/products`)}
                      >
                        <CubeIcon className="h-4 w-4 mr-2" />
                        <FormattedMessage id="common.navigation.products" />
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start p-0 h-auto  "
                        onClick={() => router.push(`/${locale}/government`)}
                      >
                        <BuildingLibraryIcon className="h-4 w-4 mr-2" />
                        <FormattedMessage id="common.navigation.government" />
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start p-0 h-auto  "
                        onClick={() => router.push(`/${locale}/eLearning`)}
                      >
                        <AcademicCapIcon className="h-4 w-4 mr-2" />
                        <FormattedMessage id="common.navigation.eLearning" />
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start p-0 h-auto  "
                        onClick={() => router.push(`/${locale}/compliance`)}
                      >
                        <ShieldCheckIcon className="h-4 w-4 mr-2" />
                        <FormattedMessage id="common.navigation.compliance" />
                      </Button>
                    </li>
                  </ul>
                </div>

                {/* Support */}
                <div>
                  <h3 className="text-foreground mb-4">
                    <FormattedMessage id="footer.sections.support" />
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start p-0 h-auto  "
                        onClick={() => router.push(`/${locale}/docs`)}
                      >
                        <DocumentTextIcon className="h-4 w-4 mr-2" />
                        <FormattedMessage id="footer.support.documentation" />
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start p-0 h-auto  "
                        onClick={() => router.push(`/${locale}/guides`)}
                      >
                        <BookOpenIcon className="h-4 w-4 mr-2" />
                        <FormattedMessage id="footer.support.guides" />
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start p-0 h-auto  "
                        onClick={() => router.push(`/${locale}/contact`)}
                      >
                        <QuestionMarkCircleIcon className="h-4 w-4 mr-2" />
                        <FormattedMessage id="common.navigation.contact" />
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start p-0 h-auto  "
                        onClick={() => router.push(`/${locale}/support`)}
                      >
                        <TicketIcon className="h-4 w-4 mr-2" />
                        <FormattedMessage id="footer.support.ticket" />
                      </Button>
                    </li>
                  </ul>
                </div>

                {/* Company */}
                <div>
                  <h3 className="text-foreground mb-4">
                    <FormattedMessage id="footer.sections.company" />
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start p-0 h-auto  "
                        onClick={() => router.push(`/${locale}/about`)}
                      >
                        <InformationCircleIcon className="h-4 w-4 mr-2" />
                        <FormattedMessage id="common.navigation.about" />
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start p-0 h-auto  "
                        onClick={() => router.push(`/${locale}/careers`)}
                      >
                        <AcademicCapIcon className="h-4 w-4 mr-2" />
                        <FormattedMessage id="footer.company.careers" />
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start p-0 h-auto  "
                        onClick={() => router.push(`/${locale}/news`)}
                      >
                        <DocumentTextIcon className="h-4 w-4 mr-2" />
                        <FormattedMessage id="footer.company.news" />
                      </Button>
                    </li>
                  </ul>
                </div>

                {/* Legal */}
                <div>
                  <h3 className="text-foreground mb-4">
                    <FormattedMessage id="footer.sections.legal" />
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start p-0 h-auto  "
                        onClick={() => router.push(`/${locale}/privacy`)}
                      >
                        <ShieldExclamationIcon className="h-4 w-4 mr-2" />
                        <FormattedMessage id="footer.legal.privacy" />
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start p-0 h-auto  "
                        onClick={() => router.push(`/${locale}/terms`)}
                      >
                        <DocumentTextIcon className="h-4 w-4 mr-2" />
                        <FormattedMessage id="footer.legal.terms" />
                      </Button>
                    </li>
                    <li>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="justify-start p-0 h-auto  "
                        onClick={() => router.push(`/${locale}/license`)}
                      >
                        <DocumentTextIcon className="h-4 w-4 mr-2" />
                        <FormattedMessage id="footer.legal.license" />
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Copyright Section */}
        {/* <Separator className="my-6" /> */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-2 md:mb-0">
              <FormattedMessage
                id="footer.copyright"
                values={{ year: currentYear }}
                defaultMessage="© {year} ISSI. All rights reserved."
              />
            </div>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={social.name}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="sr-only">
                      <FormattedMessage id={social.name} />
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </footer>
    </IntlProvider>
  );
}
