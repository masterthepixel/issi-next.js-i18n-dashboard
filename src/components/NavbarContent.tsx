"use client";

import DashboardNavbar from "@/components/navbar/DashboardNavbar";
import { Locale, User } from "@/lib/definitions";

interface Props {
  user: User;
  locale: Locale;
  messages: Record<string, string>;
}

export default function NavbarContent({ user, locale, messages }: Props) {
  // Navigation callbacks
  const handleNavItemClick = (href: string) => {
    // Could add analytics or other navigation logic here
    console.log('Navigation to:', href);
  };

  const handleInfoItemClick = (item: string) => {
    // Handle info menu clicks (help, docs, support)
    console.log('Info item clicked:', item);
  };

  const handleNotificationItemClick = (item: string) => {
    // Handle notification clicks
    console.log('Notification clicked:', item);
  };

  const handleUserItemClick = (item: string) => {
    // Handle user menu clicks (profile, settings, logout)
    console.log('User action:', item);
  };

  return (
    <DashboardNavbar
      locale={locale}
      messages={messages}
      userName={user?.name || "ISSI User"}
      userEmail={user?.email || "user@issi-software.com"}
      userAvatar={user?.image}
      notificationCount={3}
      onNavItemClick={handleNavItemClick}
      onInfoItemClick={handleInfoItemClick}
      onNotificationItemClick={handleNotificationItemClick}
      onUserItemClick={handleUserItemClick}
    />
  );
}