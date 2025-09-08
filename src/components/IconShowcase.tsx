'use client';

import { FigmaIcon, ISSIIcon } from '@/components/icons';
import * as FigmaIcons from '@/components/icons/figma';

export default function IconShowcase() {
    // Get all Figma icon components
    const figmaIconEntries = Object.entries(FigmaIcons).filter(([name]) => name.endsWith('Icon'));

    return (
        <div className="p-8 space-y-8">
            <h2 className="dark:text-slate-100">
                🎨 Figma Icons Integration Demo
            </h2>

            {/* Original Demo Icons */}
            <div className="space-y-4">
                <h3 className="text-slate-800 dark:text-slate-200">
                    Original Demo Icons
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="flex flex-col items-center space-y-2 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                        <ISSIIcon size={48} className="text-blue-600" />
                        <span className="" text-caption1021 text-muted-foreground1021>ISSI Icon</span>
                    </div>

                    <div className="flex flex-col items-center space-y-2 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                        <FigmaIcon size={48} />
                        <span className="" text-caption1333 text-muted-foreground1340>Figma Icon</span>
                    </div>

                    <div className="flex flex-col items-center space-y-2 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                        <ISSIIcon size={48} className="text-green-600" />
                        <span className="" text-caption1672 text-muted-foreground1686>Colored</span>
                    </div>

                    <div className="flex flex-col items-center space-y-2 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                        <ISSIIcon size={32} className="text-purple-600" />
                        <span className="" text-caption2009 text-muted-foreground2030>Small</span>
                    </div>
                </div>
            </div>

            {/* Figma Community Icons */}
            <div className="space-y-4">
                <h3 className="text-slate-800 dark:text-slate-200">
                    Figma Community Icons Templates ({figmaIconEntries.length} ready)
                </h3>
                <p className="" text-caption2427 text-muted-foreground2455>
                    These icons are ready for you to replace with actual SVG content from the Figma file.
                </p>

                <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4">
                    {figmaIconEntries.slice(0, 24).map(([iconName, IconComponent]) => (
                        <div key={iconName} className="flex flex-col items-center space-y-2 p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                            <IconComponent size={32} className="" text-muted-foreground3094 />
                            <span className="text-xs text-slate-500 dark:text-slate-500 text-center leading-tight">
                                {iconName.replace('Icon', '').replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                        </div>
                    ))}
                </div>

                {figmaIconEntries.length > 24 && (
                    <div className="text-center mt-4">
                        <span className="" text-caption3570 text-muted-foreground3570>
                            + {figmaIconEntries.length - 24} more icons available
                        </span>
                    </div>
                )}
            </div>

            {/* Instructions */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-blue-50 dark:from-blue-950/50 dark:to-blue-950/50 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="mb-4 text-blue-900 dark:text-blue-100">
                    🚀 How to Complete the Icon Import
                </h3>
                <div className="space-y-3  " text-caption4190>
                    <div className="flex items-start space-x-2">
                        <span className="font-bold text-blue-600 dark:text-blue-400">3.</span>
                        <span>For each icon: Right-click 16 &quot;Copy as SVG&quot;</span>
                    </div>
                    <div className="flex items-start space-x-2">
                        <span className="font-bold text-blue-600 dark:text-blue-400">3.</span>
                        <span>For each icon: Right-click 16 &quot;Copy as SVG&quot;</span>
                    </div>
                    <div className="flex items-start space-x-2">
                        <span className="font-bold text-blue-600 dark:text-blue-400">3.</span>
                        <span>For each icon: Right-click → &quot;Copy as SVG&quot;</span>
                    </div>
                    <div className="flex items-start space-x-2">
                        <span className="font-bold text-blue-600 dark:text-blue-400">3.</span>
                        <span>For each icon: Right-click \u2192 &quot;Copy as SVG&quot;</span>
                    </div>
                    <div className="flex items-start space-x-2">
                        <span className="font-bold text-blue-600 dark:text-blue-400">5.</span>
                        <span>Icons automatically become available via <code className="bg-blue-100 dark:bg-blue-900 px-1 rounded">import from &apos;@/components/icons&apos;</code></span>
                    </div>
                </div>
            </div>

            {/* Usage Examples */}
            <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <h3 className="mb-2">Usage Examples:</h3>
                <div className="space-y-2  " text-caption6010 text-muted-foreground6065>
                    <div>{'import { HomeIcon, ArrowUpIcon } from &quot;@/components/icons&quot;;'}</div>
                    <div>{'<HomeIcon size={24} className=&quot;text-blue-600&quot; />'}</div>
                    <div>{'<ArrowUpIcon size={32} color=&quot;#10B981&quot; strokeWidth={2} />'}</div>
                </div>
            </div>
        </div>
    );
}
