import {
    Award1Icon, // Close

    // Different styles for variety
    Bold, // Home1Icon alias
    CategoryIcon, // Search
    CloseIcon, // Services
    Display1Icon, // Government
    EducationIcon,
    // Main navigation icons
    HomeIcon, // Compliance
    InformationCircleIcon,
    Linear, // About

    // System icons
    MenuIcon,
    Outline, // SettingIcon alias
    Search1Icon, // MoreCircleIcon alias (hamburger menu)
    Send1Icon, // Contact
    SettingsIcon, // eLearning
    VerifiedIcon
} from '@/components/icons/figma-converted';
import { Button } from '@/components/ui/button';
import { FormattedMessage } from 'react-intl';

/**
 * Example showing your navigation with beautiful Figma icons
 */
const MenuWithFigmaIcons = ({ locale }: { locale: string }) => {
    // Main navigation items with your new Figma icons
    const mainNavItems = [
        {
            name: <FormattedMessage id="common.navigation.home" />,
            link: `/${locale}/home`,
            icon: <HomeIcon className="size-4" />, // Home1Icon
            description: "Dashboard home"
        },
        {
            name: <FormattedMessage id="common.navigation.services" />,
            link: `/${locale}/services`,
            icon: <CategoryIcon className="size-4" />, // Services/Categories
            description: "Service offerings"
        },
        {
            name: <FormattedMessage id="common.navigation.products" />,
            link: `/${locale}/products`,
            icon: <Display1Icon className="size-4" />, // Products/Display
            description: "Product catalog"
        },
        {
            name: <FormattedMessage id="common.navigation.government" />,
            link: `/${locale}/government`,
            icon: <Award1Icon className="size-4" />, // Government/Official
            description: "Government solutions"
        },
        {
            name: <FormattedMessage id="common.navigation.eLearning" />,
            link: `/${locale}/eLearning`,
            icon: <EducationIcon className="size-4" />, // Education/Learning
            description: "Learning platform"
        },
        {
            name: <FormattedMessage id="common.navigation.compliance" />,
            link: `/${locale}/compliance`,
            icon: <VerifiedIcon className="size-4" />, // Compliance/Verified
            description: "Compliance tools"
        },
        {
            name: <FormattedMessage id="common.navigation.about" />,
            link: `/${locale}/about`,
            icon: <InformationCircleIcon className="size-4" />, // About/Information
            description: "About us"
        }
    ];

    // System/utility icons
    const systemIcons = [
        {
            name: "Hamburger Menu",
            icon: <MenuIcon className="size-6" />, // MoreCircleIcon
            description: "Mobile menu toggle"
        },
        {
            name: "Contact",
            icon: <Send1Icon className="size-4" />, // Contact/Message
            description: "Contact form"
        },
        {
            name: "Search",
            icon: <Search1Icon className="size-4" />, // Search
            description: "Site search"
        },
        {
            name: "Settings",
            icon: <SettingsIcon className="size-4" />, // Settings
            description: "User preferences"
        },
        {
            name: "Close",
            icon: <CloseIcon className="size-4" />, // Close dialog
            description: "Close modal/menu"
        }
    ];

    return (
        <div className="p-8 space-y-8 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">🎨 Your Navigation with Figma Icons</h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Beautiful, consistent icons from your imported Figma collection
                </p>
            </div>

            {/* Main Navigation Preview */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    📍 Main Navigation Icons
                    <span className="text-sm font-normal text-gray-500">(7 items)</span>
                </h2>

                {/* Desktop Navigation Style */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Desktop Navigation (Floating Pill)</h3>
                    <nav className="flex items-center justify-center gap-6 bg-gray-50 dark:bg-gray-700 rounded-full px-6 py-3">
                        {mainNavItems.map((item, index) => (
                            <Button
                                key={index}
                                className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-white dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                                variant="ghost"
                            >
                                {item.icon}
                                <span className="hidden lg:inline">{item.name}</span>
                            </Button>
                        ))}
                    </nav>
                </div>

                {/* Mobile Navigation Style */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">Mobile Navigation (Dropdown)</h3>
                    <div className="space-y-1">
                        {mainNavItems.map((item, index) => (
                            <Button
                                key={index}
                                className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                                variant="ghost"
                            >
                                {item.icon}
                                <div>
                                    <div className="font-medium">{item.name}</div>
                                    <div className="text-xs text-gray-500">{item.description}</div>
                                </div>
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* System Icons */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                    🔧 System Icons
                    <span className="text-sm font-normal text-gray-500">(5 items)</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {systemIcons.map((item, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 border text-center">
                            <div className="flex justify-center mb-2">
                                {item.icon}
                            </div>
                            <div className="font-medium text-sm">{item.name}</div>
                            <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Style Variations */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">🎨 Style Variations</h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Each icon comes in 3 styles. Mix and match for different UI states!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Linear Style */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                        <h3 className="font-medium mb-3 text-center">Linear (Default)</h3>
                        <div className="flex justify-center gap-3">
                            <Linear.Home1Icon className="size-6 text-blue-500" />
                            <Linear.CategoryIcon className="size-6 text-blue-500" />
                            <Linear.EducationIcon className="size-6 text-blue-500" />
                            <Linear.VerifiedIcon className="size-6 text-blue-500" />
                        </div>
                        <p className="text-xs text-center text-gray-500 mt-2">
                            Clean, professional outlines
                        </p>
                    </div>

                    {/* Bold Style */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                        <h3 className="font-medium mb-3 text-center">Bold</h3>
                        <div className="flex justify-center gap-3">
                            <Bold.Home1Icon className="size-6 text-purple-500" />
                            <Bold.CategoryIcon className="size-6 text-purple-500" />
                            <Bold.EducationIcon className="size-6 text-purple-500" />
                            <Bold.VerifiedIcon className="size-6 text-purple-500" />
                        </div>
                        <p className="text-xs text-center text-gray-500 mt-2">
                            Filled, attention-grabbing
                        </p>
                    </div>

                    {/* Outline Style */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border">
                        <h3 className="font-medium mb-3 text-center">Outline</h3>
                        <div className="flex justify-center gap-3">
                            <Outline.Home1Icon className="size-6 text-green-500" />
                            <Outline.CategoryIcon className="size-6 text-green-500" />
                            <Outline.EducationIcon className="size-6 text-green-500" />
                            <Outline.VerifiedIcon className="size-6 text-green-500" />
                        </div>
                        <p className="text-xs text-center text-gray-500 mt-2">
                            Subtle, minimalist borders
                        </p>
                    </div>
                </div>
            </section>

            {/* Usage Strategy */}
            <section className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">💡 Recommended Usage Strategy</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <h3 className="font-medium mb-2">🎯 Navigation States</h3>
                        <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                            <li>• <strong>Linear:</strong> Default/normal state</li>
                            <li>• <strong>Bold:</strong> Active/current page</li>
                            <li>• <strong>Outline:</strong> Hover/focus state</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-medium mb-2">📱 Device Optimization</h3>
                        <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                            <li>• <strong>Desktop:</strong> Icon + text</li>
                            <li>• <strong>Tablet:</strong> Icon only</li>
                            <li>• <strong>Mobile:</strong> Icon + full text in dropdown</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Implementation Code */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">💻 Quick Implementation</h2>
                <div className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                    <pre className="text-sm"><code>{`// 1. Import your icons
import {
  HomeIcon, CategoryIcon, Display1Icon, 
  Award1Icon, EducationIcon, VerifiedIcon,
  InformationCircleIcon, MenuIcon, Send1Icon
} from '@/components/icons/figma-converted';

// 2. Replace in your navigation
const navItems = [
  {
    name: "Home",
    icon: <HomeIcon className="size-4" />,
    link: "/home"
  },
  {
    name: "Services", 
    icon: <CategoryIcon className="size-4" />,
    link: "/services"
  }
  // ... rest of your items
];`}</code></pre>
                </div>
            </section>
        </div>
    );
};

export default MenuWithFigmaIcons;
