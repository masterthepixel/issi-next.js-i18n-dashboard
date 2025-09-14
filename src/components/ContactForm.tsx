"use client";

import FormWrapper from "@/components/forms/FormWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Locale } from "@/lib/definitions";
import { FormattedMessage, IntlProvider } from "react-intl";

interface ContactFormProps {
    locale: Locale;
    messages: Record<string, string>;
}

export default function ContactForm({ locale, messages }: ContactFormProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <FormWrapper
                className="space-y-6"
                onSubmit={async (data) => {
                    try {
                        const res = await fetch('/api/contacts', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(data),
                        });

                        if (!res.ok) throw new Error('Submission failed');

                        // Basic success UX: redirect or show message
                        // For now, navigate to a thank-you route if available
                        // eslint-disable-next-line no-console
                        console.log('Contact submission successful');
                        alert(messages['contact.form.success'] || 'Thanks — we received your message.');
                    } catch (err) {
                        // eslint-disable-next-line no-console
                        console.error('Contact submission error', err);
                        alert(messages['contact.form.error'] || 'Unable to submit form. Please try again later.');
                    }
                }}
            >
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    <div>
                        <Label htmlFor="first-name">
                            <FormattedMessage id="contact.form.firstName" defaultMessage="First name" />
                        </Label>
                        <div className="mt-2.5">
                            <Input type="text" name="first-name" id="first-name" autoComplete="given-name" />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="last-name">
                            <FormattedMessage id="contact.form.lastName" defaultMessage="Last name" />
                        </Label>
                        <div className="mt-2.5">
                            <Input type="text" name="last-name" id="last-name" autoComplete="family-name" />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <Label htmlFor="email">
                            <FormattedMessage id="contact.form.email" defaultMessage="Email" />
                        </Label>
                        <div className="mt-2.5">
                            <Input type="email" name="email" id="email" autoComplete="email" />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <Label htmlFor="message">
                            <FormattedMessage id="contact.form.message" defaultMessage="Message" />
                        </Label>
                        <div className="mt-2.5">
                            <Textarea name="message" id="message" rows={4} />
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <Button type="submit" className="w-full">
                        <FormattedMessage id="contact.form.submit" defaultMessage="Let's talk" />
                    </Button>
                </div>
            </FormWrapper>
        </IntlProvider>
    );
}
