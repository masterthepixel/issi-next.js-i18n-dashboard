'use client'

import { useTheme } from "@/contexts/ThemeContext"
import { AutoTranslationSystem } from '@/utils/autoTranslation'
import { generateNetworkArcs } from "@/utils/networkTopology"
import { 
    HomeIcon, 
    DocumentIcon,
    FolderOpenIcon,
    CodeBracketIcon,
    BeakerIcon,
    FolderIcon,
    CogIcon
} from '@heroicons/react/20/solid'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'

const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
    ssr: false,
})

interface BreadcrumbItem {
    name: string
    href: string
    current: boolean
    icon?: React.ComponentType<{ className?: string }>
}

interface UniversalIntelligentBreadcrumbProps {
    customItems?: BreadcrumbItem[]
    showHome?: boolean
    className?: string
    lang?: string
    hideOnHomepage?: boolean
    messages?: Record<string, string> | Record<string, any>
}

// Simple icon mapping
const getIconForSegment = (segment: string, isHome: boolean = false): React.ComponentType<{ className?: string }> => {
    if (isHome) return HomeIcon
    
    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
        'home': HomeIcon,
        'docs': DocumentIcon,
        'files': FolderOpenIcon,
        'folder': FolderOpenIcon,
        'products': FolderIcon,
        'services': CogIcon,
        'code': CodeBracketIcon,
        'css': CodeBracketIcon,
        'lab': BeakerIcon,
    }
    
    return iconMap[segment.toLowerCase()] || DocumentIcon
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
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const isDark = theme === 'dark'

    // Globe configuration
    const globeConfig = {
        pointSize: 0.8,
        ...(isDark ? {
            globeColor: "#062056",
            polygonColor: "rgba(255,255,255,0.7)",
            ambientLight: "#38bdf8",
            emissive: "#062056",
            emissiveIntensity: 0.1,
            atmosphereColor: "#FFFFFF",
        } : {
            globeColor: "#1e40af",
            polygonColor: "rgba(255,255,255,0.8)",
            ambientLight: "#FFFFFF",
            emissive: "#1e40af",
            emissiveIntensity: 0.05,
            atmosphereColor: "#87CEEB",
        }),
        showAtmosphere: true,
        atmosphereAltitude: 0.1,
        shininess: 0.9,
        directionalLeftLight: "#ffffff",
        directionalTopLight: "#ffffff",
        pointLight: "#ffffff",
        arcTime: 600,
        arcLength: 0.7,
        initialPosition: { lat: 39.0042, lng: -76.8755 },
        autoRotate: true,
        autoRotateSpeed: 0.3,
        pointOpacity: 0.6,
        ringOpacity: 0.2,
        ringIntensity: 0.3,
        rings: 1,
        maxRings: 2,
    }

    const networkArcs = generateNetworkArcs()

    const breadcrumbs = useMemo(() => {
        if (customItems) {
            return customItems
        }

        if (!pathname) {
            return []
        }

        let processedPath = pathname
        if (lang && pathname.startsWith(`/${lang}`)) {
            processedPath = pathname.slice(`/${lang}`.length) || '/'
        }

        const pathSegments = processedPath.split('/').filter(Boolean)
        const items: BreadcrumbItem[] = []

        if (showHome) {
            const homeHref = lang ? `/${lang}/home` : '/home'
            const homeName = intl.formatMessage({
                id: 'breadcrumb.home',
                defaultMessage: 'Home'
            })
            items.push({
                name: homeName,
                href: homeHref,
                current: processedPath === '/' || pathname === homeHref,
                icon: HomeIcon
            })
        }

        let currentPath = lang ? `/${lang}` : ''

        pathSegments.forEach((segment, index) => {
            currentPath += `/${segment}`
            const isLast = index === pathSegments.length - 1

            let name: string
            const breadcrumbKey = `breadcrumb.${segment}`
            if (messages && messages[breadcrumbKey]) {
                name = messages[breadcrumbKey]
            } else {
                try {
                    name = AutoTranslationSystem.getAutoTranslation(segment, lang || 'en')
                } catch {
                    name = segment
                        .split(/[-_]/)
                        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                        .join(' ')
                }
            }

            items.push({
                name,
                href: currentPath,
                current: isLast,
                icon: getIconForSegment(segment)
            })
        })

        return items
    }, [pathname, customItems, showHome, lang, intl, messages])

    const isHomepage = pathname === '/' ||
        (lang && pathname === `/${lang}`) ||
        (lang && pathname === `/${lang}/home`) ||
        pathname === '/home'

    if (hideOnHomepage && isHomepage) {
        return null
    }

    if (breadcrumbs.length <= 1 && isHomepage) {
        return null
    }

    return (
        <>
            {/* CSS matching EXACT CodePen */}
            <style jsx>{`
                .breadcrumb-container {
                    margin-left: 50px;
                    display: inline-block;
                }
                .breadcrumb-list {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }
                .breadcrumb-item {
                    float: right;
                    padding: 5px;
                    background-color: ${isDark ? '#475569' : '#59A386'};
                    border-radius: 50px;
                    position: relative;
                    margin-left: -50px;
                    transition: all 0.2s;
                    margin-top: 3px;
                }
                .breadcrumb-link {
                    overflow: hidden;
                    border-radius: 50px;
                    transition: all 0.2s;
                    text-decoration: none;
                    height: 50px;
                    color: ${isDark ? '#ffffff' : '#509378'};
                    background-color: ${isDark ? '#64748b' : '#65BA99'};
                    text-align: center;
                    min-width: 50px;
                    display: block;
                    line-height: 50px;
                    padding-left: 52px;
                    padding-right: 33.33333px;
                    width: 50px;
                }
                .breadcrumb-icon {
                    display: inline-block;
                }
                .breadcrumb-text {
                    display: none;
                    opacity: 0;
                }
                .breadcrumb-link:hover {
                    width: 150px;
                    background-color: ${isDark ? '#94a3b8' : '#77c2a5'};
                }
                .breadcrumb-link:hover .breadcrumb-text {
                    display: inline-block;
                    opacity: 1;
                }
                .breadcrumb-item:last-child .breadcrumb-link {
                    padding: 0;
                }
                .breadcrumb-item:last-child:hover {
                    padding: 3px;
                    margin-top: 0;
                }
                .breadcrumb-item:last-child:hover .breadcrumb-link {
                    width: 60px;
                    height: 60px;
                    line-height: 60px;
                }
            `}</style>

            <div className="relative overflow-visible">
                {/* Globe */}
                <div className="absolute -top-[200px] -right-8 md:-top-[160px] md:-right-16 overflow-visible z-50">
                    <div className="w-[35vw] h-[40vh] max-w-none overflow-visible">
                        {mounted && (
                            <World
                                data={networkArcs}
                                globeConfig={globeConfig}
                            />
                        )}
                    </div>
                </div>

                {/* EXACT CodePen Breadcrumb */}
                <nav aria-label="Breadcrumb" className={className}>
                    <div className="breadcrumb-container">
                        <ul className="breadcrumb-list">
                            {breadcrumbs.slice().reverse().map((item, index) => {
                                const IconComponent = item.icon || getIconForSegment(
                                    item.href.split('/').pop() || '', 
                                    index === breadcrumbs.length - 1
                                )
                                const isLast = index === breadcrumbs.length - 1
                                
                                return (
                                    <li 
                                        key={item.href}
                                        className="breadcrumb-item"
                                        style={{ zIndex: breadcrumbs.length - index }}
                                    >
                                        {item.current ? (
                                            <span
                                                aria-current="page"
                                                className="breadcrumb-link"
                                                style={{
                                                    paddingLeft: isLast ? '0' : '52px',
                                                    paddingRight: isLast ? '0' : '33.33333px'
                                                }}
                                            >
                                                <IconComponent className="breadcrumb-icon w-5 h-5" />
                                                {!isLast && (
                                                    <span className="breadcrumb-text">
                                                        {item.name}
                                                    </span>
                                                )}
                                            </span>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                className="breadcrumb-link focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                style={{
                                                    paddingLeft: isLast ? '0' : '52px',
                                                    paddingRight: isLast ? '0' : '33.33333px'
                                                }}
                                            >
                                                <IconComponent className="breadcrumb-icon w-5 h-5" />
                                                {!isLast && (
                                                    <span className="breadcrumb-text">
                                                        {item.name}
                                                    </span>
                                                )}
                                            </Link>
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </nav>
            </div>
        </>
    )
}