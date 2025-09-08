"use client";

import React from "react";

interface ProductTemplateProps {
    title: React.ReactNode;
    description?: React.ReactNode;
    children?: React.ReactNode;
    actions?: React.ReactNode;
}

export default function ProductTemplate({ title, description, children, actions }: ProductTemplateProps) {
    return (
        <div className="min-h-screen grid-background">
            <div className="container mx-auto px-6 py-8">
                <div className="mb-12 text-center">
                    <h1 className="md:text-5xl text-foreground mb-4">{title}</h1>
                    {description && <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">{description}</p>}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">{actions}</div>
                </div>
                {children}
            </div>
        </div>
    );
}
