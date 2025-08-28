"use client";

import { FloatingNav } from "@/components/ui/floating-navbar";
import { FormattedMessage } from "react-intl";

interface NavMenuProps {
    locale: string;
}

export default function NavMenu({ locale }: NavMenuProps) {
    const floatingNavItems = [
        {
            name: null,
            link: `/${locale}/home`,
            icon: null,
            ariaLabel: "Home"
        },
        { name: <FormattedMessage id="common.navigation.services" />, link: `/${locale}/services` },
        { name: <FormattedMessage id="common.navigation.products" />, link: `/${locale}/products` },
        { name: <FormattedMessage id="common.navigation.government" />, link: `/${locale}/government` },
        { name: <FormattedMessage id="common.navigation.eLearning" />, link: `/${locale}/eLearning` },
        { name: <FormattedMessage id="common.navigation.compliance" />, link: `/${locale}/compliance` },
        { name: <FormattedMessage id="common.navigation.blog" />, link: `/${locale}/blog` },
        { name: <FormattedMessage id="common.navigation.about" />, link: `/${locale}/about` }
    ];

    return <FloatingNav navItems={floatingNavItems} />;
}
