"use client";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { FormattedMessage } from "react-intl";

export default function FloatingNavDemo({ locale }: { locale: string }) {
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
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
