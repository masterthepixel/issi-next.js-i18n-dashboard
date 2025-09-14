"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Locale } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormattedMessage, IntlProvider } from "react-intl";
import { z } from "zod";

interface ContactFormProps {
    locale: Locale;
    messages: Record<string, string>;
}

const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message is too short"),
    hp: z.string().optional(), // honeypot
    ts: z.number().optional(), // timestamp
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm({ locale, messages }: ContactFormProps) {
    const [status, setStatus] = useState<null | "idle" | "submitting" | "success" | "error">("idle");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({ resolver: zodResolver(schema) });

    useEffect(() => {
        // noop
    }, []);

    const onSubmit = async (data: FormValues) => {
        // simple honeypot and timing client guard
        setStatus("submitting");
        try {
            const payload = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                message: data.message,
                hp: data.hp || "",
                ts: Date.now(),
            };

            const res = await fetch("/api/contacts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            setStatus("success");
            reset();
        } catch (err) {
            console.error("Contact submission error", err);
            setStatus("error");
        }
    };

    return (
        <IntlProvider locale={locale} messages={messages}>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <Label htmlFor="first-name">
                            <FormattedMessage id="contact.form.firstName" defaultMessage="First name" />
                        </Label>
                        <div className="mt-2.5">
                            <Input id="first-name" {...register("firstName")} aria-invalid={!!errors.firstName} />
                            {errors.firstName && <p className="text-destructive text-sm mt-1">{errors.firstName.message}</p>}
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="last-name">
                            <FormattedMessage id="contact.form.lastName" defaultMessage="Last name" />
                        </Label>
                        <div className="mt-2.5">
                            <Input id="last-name" {...register("lastName")} aria-invalid={!!errors.lastName} />
                            {errors.lastName && <p className="text-destructive text-sm mt-1">{errors.lastName.message}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <Label htmlFor="email">
                            <FormattedMessage id="contact.form.email" defaultMessage="Email" />
                        </Label>
                        <div className="mt-2.5">
                            <Input id="email" type="email" {...register("email")} aria-invalid={!!errors.email} />
                            {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
                        </div>
                    </div>

                    <div className="sm:col-span-2">
                        <Label htmlFor="message">
                            <FormattedMessage id="contact.form.message" defaultMessage="Message" />
                        </Label>
                        <div className="mt-2.5">
                            <Textarea id="message" rows={4} {...register("message")} aria-invalid={!!errors.message} />
                            {errors.message && <p className="text-destructive text-sm mt-1">{errors.message.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Hidden honeypot field - invisible to sighted users */}
                <div style={{ position: "absolute", left: -9999, top: "auto", width: 1, height: 1, overflow: "hidden" }} aria-hidden>
                    <label htmlFor="hp" className="sr-only">
                        Do not fill
                    </label>
                    <input id="hp" type="text" {...register("hp")} tabIndex={-1} autoComplete="off" />
                </div>

                <div>
                    <Button type="submit" className="w-full" disabled={status === "submitting"}>
                        <FormattedMessage id="contact.form.submit" defaultMessage="Let's talk" />
                    </Button>
                </div>

                {status === "success" && (
                    <div role="status" className="rounded-md border border-green-200 bg-green-50 p-3 text-green-800">
                        {messages["contact.form.success"] || "Thanks — we received your message."}
                    </div>
                )}

                {status === "error" && (
                    <div role="alert" className="rounded-md border border-destructive bg-destructive/10 p-3 text-destructive">
                        {messages["contact.form.error"] || "Unable to submit form. Please try again later."}
                    </div>
                )}
            </form>
        </IntlProvider>
    );
}

