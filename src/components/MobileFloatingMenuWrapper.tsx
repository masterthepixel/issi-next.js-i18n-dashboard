import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";
import MobileFloatingMenu from "./MobileFloatingMenu";

interface MobileFloatingMenuWrapperProps {
  locale: Locale;
}

export default async function MobileFloatingMenuWrapper({ locale }: MobileFloatingMenuWrapperProps) {
  const intl = await getIntl(locale);
  
  const navigationItems = [
    {
      title: intl.formatMessage({ id: "common.navigation.services" }),
      icon: "services",
      href: `/${locale}/services`,
    },
    {
      title: intl.formatMessage({ id: "common.navigation.products" }),
      icon: "products",
      href: `/${locale}/products`,
    },
    {
      title: intl.formatMessage({ id: "common.navigation.government" }),
      icon: "government",
      href: `/${locale}/government`,
    },
    {
      title: intl.formatMessage({ id: "common.navigation.eLearning" }),
      icon: "eLearning",
      href: `/${locale}/eLearning`,
    },
    {
      title: intl.formatMessage({ id: "common.navigation.compliance" }),
      icon: "compliance",
      href: `/${locale}/compliance`,
    },
    {
      title: intl.formatMessage({ id: "common.navigation.about" }),
      icon: "about",
      href: `/${locale}/about`,
    },
  ];

  return <MobileFloatingMenu items={navigationItems} />;
}
