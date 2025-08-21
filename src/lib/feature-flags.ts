"use client";

// Define the shape of our feature flags
export interface FeatureFlags {
    isShadcnMigrationComplete: boolean;
    // Add other feature flags here as needed
}

// Default values for feature flags
const defaultFlags: FeatureFlags = {
    isShadcnMigrationComplete: false,
};

/**
 * Retrieves the value of a specific feature flag.
 * It checks localStorage first, then falls back to the default value.
 * 
 * @param flagName The name of the feature flag to retrieve.
 * @returns The boolean value of the feature flag.
 */
export const getFeatureFlag = (flagName: keyof FeatureFlags): boolean => {
    if (typeof window === "undefined") {
        return defaultFlags[flagName];
    }

    try {
        const storedFlags = localStorage.getItem("featureFlags");
        if (storedFlags) {
            const flags = JSON.parse(storedFlags) as Partial<FeatureFlags>;
            if (typeof flags[flagName] === 'boolean') {
                return flags[flagName] as boolean;
            }
        }
    } catch (error) {
        console.error("Error reading feature flags from localStorage", error);
    }

    return defaultFlags[flagName];
};

/**
 * Sets the value of a specific feature flag in localStorage.
 * 
 * @param flagName The name of the feature flag to set.
 * @param value The new boolean value for the feature flag.
 */
export const setFeatureFlag = (flagName: keyof FeatureFlags, value: boolean): void => {
    if (typeof window === "undefined") {
        return;
    }

    try {
        const storedFlags = localStorage.getItem("featureFlags");
        const flags = storedFlags ? JSON.parse(storedFlags) : {};
        flags[flagName] = value;
        localStorage.setItem("featureFlags", JSON.stringify(flags));
    } catch (error) {
        console.error("Error setting feature flag in localStorage", error);
    }
};