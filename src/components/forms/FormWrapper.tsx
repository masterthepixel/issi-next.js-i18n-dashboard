"use client";

import React, { FormEvent, useState } from "react";

interface FormWrapperProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    onSubmit?: (data: Record<string, any>) => void | Promise<void>;
}

export default function FormWrapper({ children, className, id, onSubmit }: FormWrapperProps) {
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (submitting) return;
        try {
            setSubmitting(true);
            const form = e.currentTarget;
            const fd = new FormData(form);
            const data: Record<string, any> = {};
            fd.forEach((value, key) => {
                data[key] = value;
            });
            if (onSubmit) await onSubmit(data);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form id={id} className={className} onSubmit={handleSubmit} noValidate>
            {children}
        </form>
    );
}
