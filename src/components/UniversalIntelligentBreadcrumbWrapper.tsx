'use client'

import { IntlProvider } from 'react-intl'
import { Locale } from '@/lib/definitions'
import UniversalIntelligentBreadcrumb from './UniversalIntelligentBreadcrumb'

interface UniversalIntelligentBreadcrumbWrapperProps {
    locale: Locale
    messages: Record<string, string> | Record<string, any>
    customItems?: Array<{
        name: string
        href: string
        current: boolean
        icon?: React.ComponentType<{ className?: string }>
    }>
    showHome?: boolean
    className?: string
    hideOnHomepage?: boolean
}

export default function UniversalIntelligentBreadcrumbWrapper({
    locale,
    messages,
    customItems,
    showHome = true,
    className = '',
    hideOnHomepage = true
}: UniversalIntelligentBreadcrumbWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <UniversalIntelligentBreadcrumb
                customItems={customItems}
                showHome={showHome}
                className={className}
                lang={locale}
                hideOnHomepage={hideOnHomepage}
                messages={messages}
            />
        </IntlProvider>
    )
}
