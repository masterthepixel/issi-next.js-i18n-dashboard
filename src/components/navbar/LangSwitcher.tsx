"use client";

import Link from "next/link";
import { FormattedMessage } from "react-intl";

interface LangSwitcherProps {
    locale: string;
    pathname: string | null;
}

export default function LangSwitcher({ locale, pathname }: LangSwitcherProps) {
    const path = pathname ? pathname.split("/").slice(2).join("/") : "";
    return (
        <div className="relative">
            <Link
                href={`/en/${path}`}
                className={`block px-4 py-2 text-sm ${locale === "en" ? "font-medium" : ""}`}
                aria-current={locale === "en"}
            >
                <FormattedMessage id="common.language.en" defaultMessage="English" />
            </Link>
            <Link
                href={`/fr/${path}`}
                className={`block px-4 py-2 text-sm ${locale === "fr" ? "font-medium" : ""}`}
                aria-current={locale === "fr"}
            >
                <FormattedMessage id="common.language.fr" defaultMessage="Français" />
            </Link>
            <Link
                href={`/es/${path}`}
                className={`block px-4 py-2 text-sm ${locale === "es" ? "font-medium" : ""}`}
                aria-current={locale === "es"}
            >
                <FormattedMessage id="common.language.es" defaultMessage="Español" />
            </Link>
        </div>
    );
}
