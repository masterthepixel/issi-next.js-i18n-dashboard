"use client";

import Link from "next/link";
import { FormattedMessage } from "react-intl";

interface AppMenuProps {
    locale: string;
}

export default function AppMenu({ locale }: AppMenuProps) {
    return (
        <ul className="py-1">
            <li>
                <Link href={`/${locale}/services`} className="block px-4 py-2  ">
                    <FormattedMessage id="common.navigation.services" />
                </Link>
            </li>
            <li>
                <Link href={`/${locale}/products`} className="block px-4 py-2  ">
                    <FormattedMessage id="common.navigation.products" />
                </Link>
            </li>
            <li>
                <Link href={`/${locale}/government`} className="block px-4 py-2  ">
                    <FormattedMessage id="common.navigation.government" />
                </Link>
            </li>
            <li>
                <Link href={`/${locale}/eLearning`} className="block px-4 py-2  ">
                    <FormattedMessage id="common.navigation.eLearning" />
                </Link>
            </li>
            <li>
                <Link href={`/${locale}/compliance`} className="block px-4 py-2  ">
                    <FormattedMessage id="common.navigation.compliance" />
                </Link>
            </li>
            <li>
                <Link href={`/${locale}/blog`} className="block px-4 py-2  ">
                    <FormattedMessage id="common.navigation.blog" />
                </Link>
            </li>
            <li>
                <Link href={`/${locale}/about`} className="block px-4 py-2  ">
                    <FormattedMessage id="common.navigation.about" />
                </Link>
            </li>
        </ul>
    );
}

