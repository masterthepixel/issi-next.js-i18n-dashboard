
"use client";

import { motion } from "framer-motion";
import { Calendar, Mail, Phone } from "lucide-react";
import { FormattedMessage } from "react-intl";
import { Input } from "./ui/input";
import { Button as StatefulButton } from "./ui/stateful-button";
import { Textarea } from "./ui/textarea";

export default function FooterContactCTAContactForm() {
    // Dummy async handler for stateful button
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await new Promise((resolve) => setTimeout(resolve, 2000));
    };
    // You can add form state/handlers as needed
    return (
        <div className="w-full">
            {/* ISSI logo removed as requested */}
            <motion.p
                className="max-w-2xl text-white/80 mb-6 text-lg md:text-2xl font-semibold"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.1 }}
            >
                <FormattedMessage
                    id="footer.contactcta.intro"
                    defaultMessage="Ready to accelerate your digital transformation? Connect with our team to discuss your project, request a quote, or learn more about our custom software solutions for enterprises and startups."
                />
            </motion.p>
            <motion.form
                className="rounded-2xl border p-5 sm:p-6 md:p-8 border-white/10 bg-white/5"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-4 lg:col-span-1">
                        <div className="inline-flex items-center gap-2 ring-1 text-xs rounded-full pt-1.5 pr-3 pb-1.5 pl-3 ring-neutral-200 text-slate-950 bg-neutral-200">
                            <span className="h-1.5 w-1.5 rounded-full animate-pulse bg-green-400"></span>
                            <FormattedMessage id="footer.contactcta.status" defaultMessage="Now accepting new projects" />
                        </div>
                        <h4 className="font-semibold tracking-tight text-white">
                            <FormattedMessage id="footer.contactcta.startProject" defaultMessage="Start your project" />
                        </h4>
                        <ul className="space-y-2 text-sm text-neutral-300">
                            <li className="flex items-start gap-2">
                                <span className="inline-flex items-center justify-center w-4 h-4 mt-0.5">
                                    <Calendar className="w-4 h-4 text-blue-500" strokeWidth={1.5} />
                                </span>
                                <span><FormattedMessage id="footer.contactcta.service1" defaultMessage="Custom Software Solutions" /></span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="inline-flex items-center justify-center w-4 h-4 mt-0.5">
                                    <Calendar className="w-4 h-4 text-blue-500" strokeWidth={1.5} />
                                </span>
                                <span><FormattedMessage id="footer.contactcta.service2" defaultMessage="eLearning Platforms & Training" /></span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="inline-flex items-center justify-center w-4 h-4 mt-0.5">
                                    <Calendar className="w-4 h-4 text-blue-500" strokeWidth={1.5} />
                                </span>
                                <span><FormattedMessage id="footer.contactcta.service3" defaultMessage="Compliance & Regulatory Solutions" /></span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="inline-flex items-center justify-center w-4 h-4 mt-0.5">
                                    <Calendar className="w-4 h-4 text-blue-500" strokeWidth={1.5} />
                                </span>
                                <span><FormattedMessage id="footer.contactcta.service4" defaultMessage="Staff Management Systems" /></span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="inline-flex items-center justify-center w-4 h-4 mt-0.5">
                                    <Calendar className="w-4 h-4 text-blue-500" strokeWidth={1.5} />
                                </span>
                                <span><FormattedMessage id="footer.contactcta.service5" defaultMessage="Government Contract Solutions" /></span>
                            </li>
                        </ul>
                        <div className="flex items-center gap-3 pt-2 text-sm">
                            <div className="space-y-2 text-neutral-300 text-sm mt-4">
                                <div className="flex gap-3 items-start">
                                    <span className="flex-none pt-0.5">
                                        <Calendar className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                    <span>
                                        <FormattedMessage id="footer.contactcta.address" defaultMessage="7337 Hanover Pkwy, Suite# A, Greenbelt, MD 20770" />
                                    </span>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <span className="flex-none pt-0.5">
                                        <Phone className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                    <span>
                                        <span className="block">
                                            <FormattedMessage id="footer.contactcta.phone.main" defaultMessage="Main:" /> <a href="tel:+1301-982-9700" className="hover:text-white">+1 (301) 982-9700</a>
                                        </span>
                                        <span className="block">
                                            <FormattedMessage id="footer.contactcta.phone.fax" defaultMessage="Fax:" /> <a href="tel:+1301-982-0500" className="hover:text-white">+1 (301) 982-0500</a>
                                        </span>
                                        <span className="block">
                                            <FormattedMessage id="footer.contactcta.phone.tollfree" defaultMessage="Toll Free:" /> <a href="tel:1-888-810-3661" className="hover:text-white">1-888-810-3661</a>
                                        </span>
                                    </span>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <span className="flex-none pt-0.5">
                                        <Mail className="w-5 h-5 text-gray-400" aria-hidden="true" />
                                    </span>
                                    <span>
                                        <a href="mailto:info@issi-software.com" className="hover:text-white">
                                            <FormattedMessage id="footer.contactcta.email" defaultMessage="info@issi-software.com" />
                                        </a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-1">
                            <label className="block text-base font-semibold mb-1 text-white/90">
                                <FormattedMessage id="footer.contactcta.form.fullname" defaultMessage="Full Name" />
                            </label>
                            <Input type="text" required placeholder="Full Name" className="bg-white/10 border-white/10 text-white placeholder-white/40" />
                        </div>
                        <div className="sm:col-span-1">
                            <label className="block text-base font-semibold mb-1 text-white/90">
                                <FormattedMessage id="footer.contactcta.form.email" defaultMessage="Email" />
                            </label>
                            <Input type="email" required placeholder="you@company.com" className="bg-white/10 border-white/10 text-white placeholder-white/40" />
                        </div>
                        <div className="sm:col-span-1">
                            <label className="block text-base font-semibold mb-1 text-white/90">
                                <FormattedMessage id="footer.contactcta.form.company" defaultMessage="Company (optional)" />
                            </label>
                            <Input type="text" placeholder="Your company" className="bg-white/10 border-white/10 text-white placeholder-white/40" />
                        </div>
                        <div className="sm:col-span-1">
                            <label className="block text-base font-semibold mb-1 text-white/90">
                                <FormattedMessage id="footer.contactcta.form.phone" defaultMessage="Phone (optional)" />
                            </label>
                            <Input type="tel" placeholder="(301) 555-1234" className="bg-white/10 border-white/10 text-white placeholder-white/40" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-base font-semibold mb-1 text-white/90">
                                <FormattedMessage id="footer.contactcta.form.help" defaultMessage="How can we help?" />
                            </label>
                            <Textarea rows={3} required placeholder="Tell us about your project, goals, or questions..." className="bg-white/10 border-white/10 text-white placeholder-white/40" />
                        </div>
                        <div className="sm:col-span-2 flex justify-end mt-4">
                            <StatefulButton
                                type="submit"
                                className="inline-flex gap-2 items-center justify-center min-w-[120px] whitespace-nowrap ring-1 transition text-base font-semibold rounded-xl pt-2.5 pr-5 pb-2.5 pl-5 shadow ring-green-500 bg-green-600 hover:bg-green-700 text-white focus:ring-2 focus:ring-green-400 focus:outline-none"
                            >
                                <span className="whitespace-nowrap flex items-center gap-2">
                                    <Mail className="w-5 h-5" strokeWidth={1.5} />
                                    <FormattedMessage id="footer.contactcta.form.send" defaultMessage="Send Message" />
                                </span>
                            </StatefulButton>
                        </div>
                    </div>
                </div>
            </motion.form>
        </div>
    );
}