"use client";

import { FeatureFlags, getFeatureFlag, setFeatureFlag } from '@/lib/feature-flags';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

const FeatureFlagManager = () => {
    const [flags, setFlags] = useState<FeatureFlags | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Load flags from localStorage on component mount
        const initialFlags: FeatureFlags = {
            isShadcnMigrationComplete: getFeatureFlag('isShadcnMigrationComplete'),
        };
        setFlags(initialFlags);
    }, []);

    const handleFlagChange = (flagName: keyof FeatureFlags, value: boolean) => {
        setFeatureFlag(flagName, value);
        setFlags(prevFlags => prevFlags ? { ...prevFlags, [flagName]: value } : null);
    };

    if (process.env.NODE_ENV !== 'development') {
        return null; // Only render in development environment
    }

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Toggle Feature Flags"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 16v-2m8-6h2M4 12H2m15.364 6.364l1.414 1.414M4.222 4.222l1.414 1.414m12.728 0l-1.414 1.414M5.636 18.364l-1.414 1.414" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute bottom-16 right-0 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700 w-80">
                    <h3 className="text-lg font-bold mb-4 text-slate-900 dark:text-white">
                        <FormattedMessage id="dev.featureFlags.title" defaultMessage="Feature Flags" />
                    </h3>
                    {flags ? (
                        <ul className="space-y-3">
                            {Object.keys(flags).map((key) => (
                                <li key={key} className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{key}</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={flags[key as keyof FeatureFlags]}
                                            onChange={(e) => handleFlagChange(key as keyof FeatureFlags, e.target.checked)}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-slate-200 dark:bg-slate-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-500 peer-checked:bg-blue-600"></div>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            <FormattedMessage id="common.loading" defaultMessage="Loading..." />
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default FeatureFlagManager;