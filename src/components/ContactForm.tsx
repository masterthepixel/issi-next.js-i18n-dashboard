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
            <div className="isolate px-6 py-24 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-balance text-4xl font-normal tracking-tight text-foreground sm:text-5xl">
                        <FormattedMessage id="contact.form.title" defaultMessage="Contact Us" />
                    </h2>
                    <p className="mt-2 text-lg/8 text-muted-foreground">
                        <FormattedMessage id="contact.form.subtitle" defaultMessage="Aute magna irure deserunt veniam aliqua magna enim voluptate." />
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-16 max-w-xl sm:mt-20" noValidate>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="first-name" className="block text-sm/6 font-semibold text-foreground">
                                <FormattedMessage id="contact.form.firstName" defaultMessage="First name" />
                            </Label>
                            <div className="mt-2.5">
                                <Input
                                    id="first-name"
                                    {...register("firstName")}
                                    autoComplete="given-name"
                                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                                    aria-invalid={!!errors.firstName}
                                />
                                {errors.firstName && <p className="text-destructive text-sm mt-1">{errors.firstName.message}</p>}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="last-name" className="block text-sm/6 font-semibold text-foreground">
                                <FormattedMessage id="contact.form.lastName" defaultMessage="Last name" />
                            </Label>
                            <div className="mt-2.5">
                                <Input
                                    id="last-name"
                                    {...register("lastName")}
                                    autoComplete="family-name"
                                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                                    aria-invalid={!!errors.lastName}
                                />
                                {errors.lastName && <p className="text-destructive text-sm mt-1">{errors.lastName.message}</p>}
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <Label htmlFor="email" className="block text-sm/6 font-semibold text-foreground">
                                <FormattedMessage id="contact.form.email" defaultMessage="Email" />
                            </Label>
                            <div className="mt-2.5">
                                <Input
                                    id="email"
                                    type="email"
                                    {...register("email")}
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                                    aria-invalid={!!errors.email}
                                />
                                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <Label htmlFor="message" className="block text-sm/6 font-semibold text-foreground">
                                <FormattedMessage id="contact.form.message" defaultMessage="Message" />
                            </Label>
                            <div className="mt-2.5">
                                <Textarea
                                    id="message"
                                    rows={4}
                                    {...register("message")}
                                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                                    aria-invalid={!!errors.message}
                                />
                                {errors.message && <p className="text-destructive text-sm mt-1">{errors.message.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Hidden honeypot field */}
                    <div style={{ position: "absolute", left: -9999, top: "auto", width: 1, height: 1, overflow: "hidden" }} aria-hidden>
                        <label htmlFor="hp" className="sr-only">Do not fill</label>
                        <input id="hp" type="text" {...register("hp")} tabIndex={-1} autoComplete="off" />
                    </div>

                    <div className="mt-10">
                        <Button
                            type="submit"
                            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500"
                            disabled={status === "submitting"}
                        >
                            <FormattedMessage id="contact.form.submit" defaultMessage="Let's talk" />
                        </Button>
                    </div>

                    {status === "success" && (
                        <div role="status" className="mt-4 rounded-md border border-green-200 bg-green-50 p-3 text-green-800">
                            {messages["contact.form.success"] || "Thanks — we received your message."}
                        </div>
                    )}

                    {status === "error" && (
                        <div role="alert" className="mt-4 rounded-md border border-destructive bg-destructive/10 p-3 text-destructive">
                            {messages["contact.form.error"] || "Unable to submit form. Please try again later."}
                        </div>
                    )}
                </form>
                <div className="bg-background py-8 sm:py-16">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl divide-y divide-border lg:mx-0 lg:max-w-none">
                            <div className="grid grid-cols-1 gap-10 py-16 lg:grid-cols-3">
                                <div>
                                    <h2 className="text-pretty text-4xl font-semibold tracking-tight text-foreground">
                                        Get in touch
                                    </h2>
                                    <p className="mt-4 text-base/7 text-muted-foreground">
                                        Quam nunc nunc eu sed. Sed rhoncus quis ultricies ac pellentesque.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
                                    <div className="rounded-2xl bg-card border border-border p-10">
                                        <h3 className="text-2xl font-normal text-foreground">General Inquiry</h3>
                                        <dl className="mt-3 space-y-1 text-sm/6 text-muted-foreground">
                                            <div>
                                                <dt className="sr-only">Email</dt>
                                                <dd>
                                                    <a
                                                        href="mailto:info@issi-software.com"
                                                        className="font-semibold text-primary"
                                                    >
                                                        info@issi-software.com
                                                    </a>
                                                </dd>
                                            </div>
                                            <div className="mt-1">
                                                <dt className="sr-only">Phone number</dt>
                                                <dd>301-982-9700</dd>
                                            </div>
                                        </dl>
                                    </div>
                                    <div className="rounded-2xl bg-card border border-border p-10">
                                        <h3 className="text-2xl font-normal text-foreground">Support</h3>
                                        <dl className="mt-3 space-y-1 text-sm/6 text-muted-foreground">
                                            <div>
                                                <dt className="sr-only">Email</dt>
                                                <dd>
                                                    <a href="mailto:support@issi-software.com" className="font-semibold text-primary">
                                                        support@issi-software.com
                                                    </a>
                                                </dd>
                                            </div>
                                            <div className="mt-1">
                                                <dt className="sr-only">Phone number</dt>
                                                <dd>1-888-810-3661</dd>
                                            </div>
                                        </dl>
                                    </div>
                                    <div className="rounded-2xl bg-card border border-border p-10">
                                        <h3 className="text-2xl font-normal text-foreground">Sales</h3>
                                        <dl className="mt-3 space-y-1 text-sm/6 text-muted-foreground">
                                            <div>
                                                <dt className="sr-only">Email</dt>
                                                <dd>
                                                    <a
                                                        href="mailto:sales@issi-software.com"
                                                        className="font-semibold text-primary"
                                                    >
                                                        sales@issi-software.com
                                                    </a>
                                                </dd>
                                            </div>
                                            <div className="mt-1">
                                                <dt className="sr-only">Phone number</dt>
                                                <dd>301-982-9700</dd>
                                            </div>
                                        </dl>
                                    </div>
                                    <div className="rounded-2xl bg-card border border-border p-10">
                                        <h3 className="text-2xl font-normal text-foreground">Careers</h3>
                                        <dl className="mt-3 space-y-1 text-sm/6 text-muted-foreground">
                                            <div>
                                                <dt className="sr-only">Email</dt>
                                                <dd>
                                                    <a href="mailto:careers@issi-software.com" className="font-semibold text-primary">
                                                        careers@issi-software.com
                                                    </a>
                                                </dd>
                                            </div>
                                            <div className="mt-1">
                                                <dt className="sr-only">Phone number</dt>
                                                <dd>301-982-9700</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-10 py-16 lg:grid-cols-3">
                                <div>
                                    <h2 className="text-pretty text-4xl font-semibold tracking-tight text-foreground">
                                        Locations
                                    </h2>
                                    <p className="mt-4 text-base/7 text-muted-foreground">
                                        Consequat sunt cillum cillum elit sint. Qui occaecat nisi in ipsum commodo.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
                                    <div className="rounded-2xl bg-card border border-border p-10">
                                        <h3 className="text-2xl font-normal text-foreground">Maryland Headquarters</h3>
                                        <address className="mt-3 space-y-1 text-sm/6 not-italic text-muted-foreground">
                                            <p>7337 Hanover Pkwy, Suite# A, Greenbelt, MD 20770</p>
                                            <p>Business & Products: 301-982-9700</p>
                                            <p>Fax: 301-982-0500</p>
                                            <p>Toll Free: 1-888-810-3661</p>
                                            <p>Email: info@issi-software.com</p>
                                        </address>
                                    </div>
                                    <div className="rounded-2xl bg-card border border-border p-10">
                                        <h3 className="text-2xl font-normal text-foreground">Florida Office</h3>
                                        <address className="mt-3 space-y-1 text-sm/6 not-italic text-muted-foreground">
                                            <p>1301 Riverplace Blvd., Suite# 800, Jacksonville, FL 32207</p>
                                            <p>Phone: 904-416-3100</p>
                                            <p>Email: info@issi-software.com</p>
                                        </address>
                                    </div>
                                    <div className="rounded-2xl bg-card border border-border p-10">
                                        <h3 className="text-2xl font-normal text-foreground">Dallas Office</h3>
                                        <address className="mt-3 space-y-1 text-sm/6 not-italic text-muted-foreground">
                                            <p>6565 N MacArthur Blvd Suite 225, Irving, TX 75039</p>
                                            <p>Business Development: 301-982-9700</p>
                                            <p>Products: 301-982-9700</p>
                                            <p>Fax: 301-982-0500</p>
                                            <p>Toll Free: 1-888-810-3661</p>
                                            <p>Email: info@issi-software.com</p>
                                        </address>
                                    </div>
                                    <div className="rounded-2xl bg-card border border-border p-10">
                                        <h3 className="text-2xl font-normal text-foreground">Hyderabad Office</h3>
                                        <address className="mt-3 space-y-1 text-sm/6 not-italic text-muted-foreground">
                                            <p>3-6-663/203, L.K.R. Arcade, Street #9 Himayathnagar, Hyderabad - 500 029</p>
                                            <p>Phone: 91-40-2763 2269 / +91 9440501439</p>
                                            <p>Email: info@issi-software.com</p>
                                        </address>
                                    </div>
                                    <div className="rounded-2xl bg-card border border-border p-10">
                                        <h3 className="text-2xl font-normal text-foreground">Visakhapatnam Office</h3>
                                        <address className="mt-3 space-y-1 text-sm/6 not-italic text-muted-foreground">
                                            <p>SriRama Nilayam, Door No.5-175/1A, Opposite to Sanskriti School, Endada, Visakhapatnam- 530 045</p>
                                            <p>Phone: +91-40-2763 2269 / +91 9440501439</p>
                                            <p>Email: info@issi-software.com</p>
                                        </address>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </IntlProvider>
    );
}

