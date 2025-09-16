"use client";

import ELearningAceternityFeatures from "./ELearningAceternityFeatures";

interface ELearningAceternityFeaturesWrapperProps {
    locale: string;
    messages: Record<string, string>;
}

export default function ELearningAceternityFeaturesWrapper({
    locale: _locale,
    messages: _messages,
}: ELearningAceternityFeaturesWrapperProps) {
    return <ELearningAceternityFeatures />;
}