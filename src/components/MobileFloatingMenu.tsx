"use client";

import { FloatingDock } from "@/components/ui/floating-dock";
import {
    AcademicCapIcon,
    BuildingLibraryIcon,
    CubeIcon,
    InformationCircleIcon,
    ShieldCheckIcon,
    WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

interface NavigationItem {
  title: string;
  icon: string;
  href: string;
}

interface MobileFloatingMenuProps {
  items: NavigationItem[];
}

export default function MobileFloatingMenu({ items }: MobileFloatingMenuProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "services":
        return <WrenchScrewdriverIcon className="h-5 w-5 text-blue-500" />;
      case "products":
        return <CubeIcon className="h-5 w-5 text-purple-500" />;
      case "government":
        return <BuildingLibraryIcon className="h-5 w-5 text-green-500" />;
      case "eLearning":
        return <AcademicCapIcon className="h-5 w-5 text-orange-500" />;
      case "compliance":
        return <ShieldCheckIcon className="h-5 w-5 text-red-500" />;
      case "about":
        return <InformationCircleIcon className="h-5 w-5 text-teal-500" />;
      default:
        return <CubeIcon className="h-5 w-5 text-slate-500" />;
    }
  };

  const navigationItems = items.map(item => ({
    title: item.title,
    icon: getIcon(item.icon),
    href: item.href,
  }));
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 md:hidden">
      <FloatingDock
        items={navigationItems}
        mobileClassName="text-muted-foreground"
      />
    </div>
  );
}
