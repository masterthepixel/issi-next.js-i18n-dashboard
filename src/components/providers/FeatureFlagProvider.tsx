"use client";

import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import { ReactNode } from "react";

interface FeatureFlagProviderProps {
    children: ReactNode;
}

let LDProvider: React.ComponentType<{ children: ReactNode }>;

async function initializeLDProvider() {
    LDProvider = await asyncWithLDProvider({
        clientSideID: "your-client-side-id", // TODO: Replace with your actual client-side ID
        context: {
            kind: "user",
            key: "anonymous",
        },
    });
}

initializeLDProvider();

export const FeatureFlagProvider = ({
    children,
}: FeatureFlagProviderProps) => {
    if (!LDProvider) {
        // You can return a loading state here
        return <div>Loading feature flags...</div>;
    }
    return <LDProvider>{children}</LDProvider>;
};