
// Import individual icons (tree-shakable)
import {
    DashboardIcon,
    HomeIcon,
    MenuIcon,
    NotificationIcon,
    SearchIcon,
    SettingsIcon
} from '@/components/icons/figma-converted';

// Or import from specific styles
import { Bold, Linear, Outline } from '@/components/icons/figma-converted';
import { Button } from '@/components/ui/button';

/**
 * Example component showing how to use the imported Figma icons
 */
const IconExamplesComponent = () => {
    return (
        <div className="p-8 space-y-8">
            <h1 className="text-3xl font-bold">🎨 Your Figma Icons in Action!</h1>

            {/* Basic Icon Usage */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">📌 Common Dashboard Icons</h2>
                <div className="flex gap-4 items-center">
                    <HomeIcon size={32} className="text-blue-500" />
                    <SearchIcon size={32} className="text-green-500" />
                    <SettingsIcon size={32} className="text-gray-600" />
                    <DashboardIcon size={32} className="text-purple-500" />
                    <NotificationIcon size={32} className="text-red-500" />
                    <MenuIcon size={32} className="text-orange-500" />
                </div>
            </section>

            {/* Different Styles */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">🎨 Different Styles</h2>
                <div className="grid grid-cols-3 gap-8">

                    {/* Linear Style */}
                    <div className="space-y-2">
                        <h3 className="font-medium">Linear (Default)</h3>
                        <div className="flex gap-2">
                            <Linear.Home1Icon size={24} className="text-blue-500" />
                            <Linear.ChartIcon size={24} className="text-blue-500" />
                            <Linear.Search1Icon size={24} className="text-blue-500" />
                        </div>
                    </div>

                    {/* Bold Style */}
                    <div className="space-y-2">
                        <h3 className="font-medium">Bold</h3>
                        <div className="flex gap-2">
                            <Bold.Home1Icon size={24} className="text-purple-500" />
                            <Bold.ChartIcon size={24} className="text-purple-500" />
                            <Bold.Search1Icon size={24} className="text-purple-500" />
                        </div>
                    </div>

                    {/* Outline Style */}
                    <div className="space-y-2">
                        <h3 className="font-medium">Outline</h3>
                        <div className="flex gap-2">
                            <Outline.Home1Icon size={24} className="text-gray-600" />
                            <Outline.ChartIcon size={24} className="text-gray-600" />
                            <Outline.Search1Icon size={24} className="text-gray-600" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Different Sizes */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">📏 Different Sizes</h2>
                <div className="flex gap-4 items-center">
                    <HomeIcon size={16} className="text-blue-500" />
                    <HomeIcon size={24} className="text-blue-500" />
                    <HomeIcon size={32} className="text-blue-500" />
                    <HomeIcon size={48} className="text-blue-500" />
                    <HomeIcon size={64} className="text-blue-500" />
                </div>
            </section>

            {/* Theme Integration */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">🎭 Theme Integration</h2>
                <div className="flex gap-4 items-center">
                    <HomeIcon size={32} className="text-current" />
                    <SearchIcon size={32} className="hover:text-blue-500 transition-colors" />
                    <SettingsIcon size={32} className="dark:text-white text-black" />
                    <NotificationIcon size={32} className="text-red-500 animate-pulse" />
                </div>
            </section>

            {/* Icon Stats */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">📊 Your Icon Library</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">309</div>
                        <div className="text-sm text-blue-800">Total Icons</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">3</div>
                        <div className="text-sm text-green-800">Styles (Bold, Linear, Outline)</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">103</div>
                        <div className="text-sm text-purple-800">Icons per Style</div>
                    </div>
                </div>
            </section>

            {/* Usage Examples */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold">💼 Real Usage Examples</h2>

                {/* Navigation Example */}
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <h3 className="font-medium">Navigation Menu</h3>
                    <nav className="flex gap-6">
                        <Button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200" variant="ghost">
                            <DashboardIcon size={20} />
                            <span>Dashboard</span>
                        </Button>
                        <Button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200" variant="ghost">
                            <Linear.ReportIcon size={20} />
                            <span>Reports</span>
                        </Button>
                        <Button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-200" variant="ghost">
                            <SettingsIcon size={20} />
                            <span>Settings</span>
                        </Button>
                    </nav>
                </div>

                {/* Status Indicators */}
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <h3 className="font-medium">Status Indicators</h3>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 text-green-600">
                            <Linear.TickIcon size={16} />
                            <span>Completed</span>
                        </div>
                        <div className="flex items-center gap-2 text-yellow-600">
                            <Linear.WarningIcon size={16} />
                            <span>Warning</span>
                        </div>
                        <div className="flex items-center gap-2 text-red-600">
                            <Linear.DangerCircleIcon size={16} />
                            <span>Error</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default IconExamplesComponent;
