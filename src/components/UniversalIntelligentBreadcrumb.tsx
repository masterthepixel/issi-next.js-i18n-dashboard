'use client'

import { AutoTranslationSystem } from '@/utils/autoTranslation'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'

interface BreadcrumbItem {
    name: string
    href: string
    current: boolean
}

interface UniversalIntelligentBreadcrumbProps {
    customItems?: BreadcrumbItem[]
    showHome?: boolean
    className?: string
    lang?: string
    hideOnHomepage?: boolean
    messages?: Record<string, string> | Record<string, any>
}

export default function UniversalIntelligentBreadcrumb({
    customItems,
    showHome = true,
    className = '',
    lang,
    hideOnHomepage = true,
    messages
}: UniversalIntelligentBreadcrumbProps) {
    const pathname = usePathname()
    const intl = useIntl()

    const breadcrumbs = useMemo(() => {
        if (customItems) {
            return customItems
        }

        if (!pathname) {
            return []
        }

        // Generate breadcrumbs from pathname
        let processedPath = pathname

        // Remove language prefix if present
        if (lang && pathname.startsWith(`/${lang}`)) {
            processedPath = pathname.slice(`/${lang}`.length) || '/'
        }

        const pathSegments = processedPath.split('/').filter(Boolean)
        const items: BreadcrumbItem[] = []

        if (showHome) {
            const homeHref = lang ? `/${lang}/home` : '/home'
            // Use translated "Home" text
            const homeName = intl.formatMessage({
                id: 'breadcrumb.home',
                defaultMessage: 'Home'
            })
            items.push({
                name: homeName,
                href: homeHref,
                current: processedPath === '/' || pathname === homeHref
            })
        }

        let currentPath = lang ? `/${lang}` : ''

        pathSegments.forEach((segment, index) => {
            currentPath += `/${segment}`
            const isLast = index === pathSegments.length - 1

            // Intelligent naming: use translation system first, then fallback to capitalization
            let name: string

            // Try to get translation from breadcrumb-specific keys first
            const breadcrumbKey = `breadcrumb.${segment}`
            if (messages && messages[breadcrumbKey]) {
                name = messages[breadcrumbKey]
            } else {
                // Try AutoTranslation system for intelligent fallbacks
                try {
                    name = AutoTranslationSystem.getAutoTranslation(segment, lang || 'en')
                } catch {
                    // Fallback to simple capitalization
                    name = segment
                        .split(/[-_]/)
                        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(' ')
                }
            }

            items.push({
                name,
                href: currentPath,
                current: isLast
            })
        })

        return items
    }, [pathname, customItems, showHome, lang, intl, messages])

    // Check if we're on homepage - including /en/home pattern
    const isHomepage = pathname === '/' ||
        (lang && pathname === `/${lang}`) ||
        (lang && pathname === `/${lang}/home`) ||
        pathname === '/home'

    // Don't render if on homepage and hideOnHomepage is true
    if (hideOnHomepage && isHomepage) {
        return null
    }

    // Don't render if only home item and we're on home page
    if (breadcrumbs.length <= 1 && isHomepage) {
        return null
    }

    return (
        <nav aria-label={intl.formatMessage({
            id: 'breadcrumb.seo.description',
            defaultMessage: 'Breadcrumb'
        })} className={`flex ${className}`}>
            <ol className="flex items-center space-x-4">
                {breadcrumbs.map((item, index) => (
                    <li key={item.href}>
                        <div className="flex items-center">
                            {index === 0 && showHome ? (
                                <Link
                                    href={item.href}
                                    className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-md p-1"
                                    aria-label={intl.formatMessage({
                                        id: 'breadcrumb.home.aria',
                                        defaultMessage: 'Go to home page'
                                    })}
                                >
                                    <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
                                    <span className="sr-only">{item.name}</span>
                                </Link>
                            ) : (
                                <>
                                    {index > 0 && (
                                        <ChevronRightIcon
                                            aria-hidden="true"
                                            className="size-5 shrink-0 text-gray-400 mr-4"
                                        />
                                    )}
                                    {item.current ? (
                                        <span
                                            aria-current="page"
                                            className="text-sm font-medium text-gray-900"
                                        >
                                            {item.name}
                                        </span>
                                    ) : (
                                        <Link
                                            href={item.href}
                                            className="text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-md px-1 py-0.5"
                                        >
                                            {item.name}
                                        </Link>
                                    )}
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    )
}
