import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";
import { BarChart, Compass, Home, Menu } from "lucide-react";
import SidebarLink from "./SidebarLink";
import { Button } from "./ui/button";

interface Props {
  locale: Locale;
}

export default async function Sidebar({ locale }: Props) {
  const intl = await getIntl(locale);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-60 bg-sidebar text-sidebar-foreground">
        <SheetHeader>
          <SheetTitle className="text-xl text-sidebar-primary-foreground">
            Starter App
          </SheetTitle>
        </SheetHeader>
        <hr className="my-4 border-sidebar-border" />
        <div className="flex flex-col space-y-2">
          <SidebarLink href={`/${locale}/home`}>
            <Home className="mr-2 h-5 w-5" />
            {intl.formatMessage({ id: "common.navigation.home" })}
          </SidebarLink>
          <SidebarLink href={`/${locale}/reports`}>
            <BarChart className="mr-2 h-5 w-5" />
            {intl.formatMessage({ id: "common.navigation.reports" })}
          </SidebarLink>
          <SidebarLink href={`/${locale}/discover`}>
            <Compass className="mr-2 h-5 w-5" />
            {intl.formatMessage({ id: "common.navigation.discover" })}
          </SidebarLink>
        </div>
      </SheetContent>
    </Sheet>
  );
}
