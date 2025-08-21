"use client";

import Link from "next/link";
import { FormattedMessage } from "react-intl";

interface AppMenuProps {
    locale: string;
}

export default function AppMenu({ locale }: AppMenuProps) {
    return (
        <div className="py-1">
            <Link href={`/${locale}/services`} className="block px-4 py-2 text-sm">
                <FormattedMessage id="common.navigation.services" />
            </Link>
            <Link href={`/${locale}/products`} className="block px-4 py-2 text-sm">
                <FormattedMessage id="common.navigation.products" />
            </Link>
            <Link href={`/${locale}/government`} className="block px-4 py-2 text-sm">
                <FormattedMessage id="common.navigation.government" />
            </Link>
            <Link href={`/${locale}/eLearning`} className="block px-4 py-2 text-sm">
                <FormattedMessage id="common.navigation.eLearning" />
            </Link>
            <Link href={`/${locale}/compliance`} className="block px-4 py-2 text-sm">
                <FormattedMessage id="common.navigation.compliance" />
            </Link>
            <Link href={`/${locale}/about`} className="block px-4 py-2 text-sm">
                <FormattedMessage id="common.navigation.about" />
            </Link>
        </div>
    );
}
