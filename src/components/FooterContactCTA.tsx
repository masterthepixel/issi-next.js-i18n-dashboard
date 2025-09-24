"use client";

import { motion } from "framer-motion";
import { Calendar, Dribbble, Globe, Linkedin, Mail, Youtube } from "lucide-react";
import dynamic from "next/dynamic";
import { FormattedMessage } from "react-intl";
const FooterContactCTAContactForm = dynamic(() => import("./FooterContactCTAContactForm"), { ssr: false });

import Image from "next/image";

export interface FooterContactCTAProps {
    locale: string;
    messages: Record<string, string>;
}

export default function FooterContactCTA({ locale, messages }: FooterContactCTAProps) {
    return (
        <section className="w-full px-4">
            <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[40px] border border-white/10 bg-neutral-950 text-white shadow-[0_8px_30px_rgba(0,0,0,0.18)] p-6 sm:p-8">
                {/* ISSI Logo in top right */}
                <div className="absolute top-6 right-6 z-10">
                    <Image
                        src="/images/issi_logo.png"
                        alt="ISSI Logo"
                        width={112}
                        height={112}
                        className="w-28 h-28 object-contain"
                        priority
                    />
                </div>
                {/* Background gradients and grid overlay */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-20%,rgba(255,255,255,0.06),transparent_60%)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_80%_120%,rgba(255,255,255,0.05),transparent_60%)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.15]"></div>
                </div>
                <div className="relative rounded-[30px] w-full flex flex-col items-start justify-center">
                    <motion.h2
                        className="text-[clamp(2rem,6vw,4.5rem)] lg:text-[clamp(2rem,4vw,4.5rem)] text-left w-full"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Animated headline: Ready to build */}
                        {(
                            <FormattedMessage id="footer.contactcta.headline1" defaultMessage="Ready to build" />
                        ).props.defaultMessage.split(" ").map((word, idx) => (
                            <motion.span
                                key={word + idx}
                                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.1, ease: "easeInOut" }}
                                className="inline-block mr-2"
                            >
                                <FormattedMessage id="footer.contactcta.headline1" defaultMessage="Ready to build" />
                            </motion.span>
                        ))}
                        <br />
                        {/* Animated headline: something extraordinary? */}
                        {(
                            <FormattedMessage id="footer.contactcta.headline2" defaultMessage="something extraordinary?" />
                        ).props.defaultMessage.split(" ").map((word, idx) => (
                            <motion.span
                                key={word + idx + "extra"}
                                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                transition={{ duration: 0.3, delay: 0.4 + idx * 0.1, ease: "easeInOut" }}
                                className="inline-block mr-2 text-white/60"
                            >
                                <FormattedMessage id="footer.contactcta.headline2" defaultMessage="something extraordinary?" />
                            </motion.span>
                        ))}
                    </motion.h2>
                    <motion.div
                        className="mt-12 mb-12 w-full"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <FooterContactCTAContactForm />
                    </motion.div>
                    <motion.div
                        className="mt-8 w-full flex flex-col md:flex-row items-start gap-y-6 md:gap-y-0 md:gap-x-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        {/* Call */}
                        <div className="flex flex-col items-start min-h-[64px]">
                            <p className="text-sm text-white/60 font-geist">
                                <FormattedMessage id="footer.cta.schedule" defaultMessage="Schedule a Call" />
                            </p>
                            <a href="#contact" className="inline-flex items-center gap-2 hover:bg-white/90 text-sm font-medium text-gray-900 tracking-tight bg-white border-white/10 border rounded-full mt-2 pt-3 pr-5 pb-3 pl-5 transition-colors duration-200 font-geist" aria-label="Book a Meeting">
                                <Calendar className="w-5 h-5 stroke-[1.5] flex-shrink-0" />
                                <span className="font-geist">
                                    <FormattedMessage id="footer.cta.bookMeeting" defaultMessage="Book a Meeting" />
                                </span>
                            </a>
                        </div>
                        {/* Email - align left */}
                        <div className="flex flex-col items-start min-h-[64px]">
                            <p className="text-sm text-white/60 font-geist">
                                <FormattedMessage id="footer.cta.getStarted" defaultMessage="Get Started" />
                            </p>
                            <a
                                href="mailto:business@issi-software.com"
                                className="inline-flex items-center gap-2 hover:bg-white/90 text-sm font-medium text-gray-900 tracking-tight bg-white border-white/10 border rounded-full mt-2 pt-3 pr-5 pb-3 pl-5 transition-colors duration-200 font-geist"
                                aria-label="Email"
                            >
                                <Mail className="w-5 h-5 stroke-[1.5] flex-shrink-0" />
                                <span className="font-geist break-all">business@issi-software.com</span>
                            </a>
                        </div>
                        {/* Social */}
                        <div className="flex flex-col items-start min-h-[64px]">
                            <p className="text-sm text-white/60 font-geist">
                                <FormattedMessage id="footer.cta.follow" defaultMessage="Follow Along" />
                            </p>
                            <div className="flex flex-wrap gap-3 items-center">
                                <a href="https://www.linkedin.com/company/international-software-systems-inc." target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 tracking-tight bg-white border-white/10 border rounded-full pt-3 pr-4 pb-3 pl-4 hover:bg-white/90 transition-colors duration-200 font-geist" aria-label="LinkedIn">
                                    <Linkedin className="w-4 h-4" />
                                    <span className="font-geist">43,676</span>
                                </a>
                                <a href="#" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-gray-900 border border-white/10 hover:bg-white/90 transition-colors duration-200" aria-label="YouTube">
                                    <Youtube className="w-5 h-5" />
                                </a>
                                <a href="#" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-gray-900 border border-white/10 hover:bg-white/90 transition-colors duration-200" aria-label="Dribbble">
                                    <Dribbble className="w-5 h-5" />
                                </a>
                                <a href="#" className="inline-flex items-center justify-center w-12 h-12 text-gray-900 bg-white border-white/10 border rounded-full hover:bg-white/90 transition-colors duration-200" aria-label="Website">
                                    <Globe className="w-5 h-5" />
                                </a>
                                <a href="#" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-gray-900 border border-white/10 hover:bg-white/90 transition-colors duration-200" aria-label="LinkedIn">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                    <div className="mt-8 border-t border-white/10"></div>

                    {/* Our offices block (replaces Explore section) */}
                    <motion.div
                        className="bg-neutral-950 border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.18)] py-16 sm:py-24 rounded-2xl"
                        style={{ backgroundColor: '#18181b' }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl lg:mx-0">
                                <h2 className="text-pretty text-3xl font-normal tracking-tight text-white sm:text-4xl">
                                    <FormattedMessage id="footer.contactcta.offices" defaultMessage="Our Offices" />
                                </h2>
                                <p className="mt-6 text-base/7 text-gray-400">
                                    <FormattedMessage id="footer.contactcta.offices.desc" defaultMessage="ISSI has a global presence. Contact any of our offices below for business, product, or support inquiries." />
                                </p>
                            </div>
                            <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-8 text-base/7 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                                <div>
                                    <h3 className="border-l border-indigo-500 pl-6 font-normal text-white">
                                        <FormattedMessage id="footer.contactcta.office.dallas" defaultMessage="Dallas" />
                                    </h3>
                                    <address className="border-l border-white/10 pl-6 pt-2 not-italic text-gray-400">
                                        <p className="text-white">6565 N MacArthur Blvd Suite 225</p>
                                        <p className="text-white">Irving, TX 75039</p>
                                        <p className="mt-2 text-sm">Business Development: <a href="tel:301-982-9700" className="hover:text-white text-sm">301-982-9700</a></p>
                                        <p className="text-sm">Products: <a href="tel:301-982-9700" className="hover:text-white text-sm">301-982-9700</a></p>
                                        <p className="text-sm">Fax: <a href="tel:301-982-0500" className="hover:text-white text-sm">301-982-0500</a></p>
                                        <p className="text-sm">Toll Free: <a href="tel:1-888-810-3661" className="hover:text-white text-sm">1-888-810-3661</a></p>
                                        <p className="text-sm">Email: <a href="mailto:info@issi-software.com" className="hover:text-white text-sm">info@issi-software.com</a></p>
                                    </address>
                                </div>
                                <div>
                                    <h3 className="border-l border-indigo-500 pl-6 font-normal text-white">
                                        <FormattedMessage id="footer.contactcta.office.florida" defaultMessage="Florida" />
                                    </h3>
                                    <address className="border-l border-white/10 pl-6 pt-2 not-italic text-gray-400">
                                        <p className="text-white">1301 Riverplace Blvd., Suite# 800</p>
                                        <p className="text-white">Jacksonville, FL 32207</p>
                                        <p className="mt-2 text-sm">Phone: <a href="tel:904-416-3100" className="hover:text-white text-sm">904-416-3100</a></p>
                                        <p className="text-sm">Email: <a href="mailto:info@issi-software.com" className="hover:text-white text-sm">info@issi-software.com</a></p>
                                    </address>
                                </div>
                                <div>
                                    <h3 className="border-l border-indigo-500 pl-6 font-normal text-white">
                                        <FormattedMessage id="footer.contactcta.office.hyderabad" defaultMessage="Hyderabad" />
                                    </h3>
                                    <address className="border-l border-white/10 pl-6 pt-2 not-italic text-gray-400">
                                        <p className="text-white">3-6-663/203, L.K.R. Arcade, Street #9</p>
                                        <p className="text-white">Himayathnagar, Hyderabad - 500 029</p>
                                        <p className="mt-2 text-sm">Phone: <a href="tel:+91-40-2763-2269" className="hover:text-white text-sm">91-40-2763 2269</a> / <a href="tel:+91-9440501439" className="hover:text-white text-sm">+91 9440501439</a></p>
                                        <p className="text-sm">Email: <a href="mailto:info@issi-software.com" className="hover:text-white text-sm">info@issi-software.com</a></p>
                                    </address>
                                </div>
                                <div>
                                    <h3 className="border-l border-indigo-500 pl-6 font-normal text-white">
                                        <FormattedMessage id="footer.contactcta.office.visakhapatnam" defaultMessage="Visakhapatnam" />
                                    </h3>
                                    <address className="border-l border-white/10 pl-6 pt-2 not-italic text-gray-400">
                                        <p className="text-white">SriRama Nilayam, Door No.5-175/1A</p>
                                        <p className="text-white">Opposite to Sanskriti School, Endada</p>
                                        <p className="text-white">Visakhapatnam- 530 045</p>
                                        <p className="mt-2 text-sm">Phone: <a href="tel:+91-40-2763-2269" className="hover:text-white text-sm">+91-40-2763 2269</a> / <a href="tel:+91-9440501439" className="hover:text-white text-sm">+91 9440501439</a></p>
                                        <p className="text-sm">Email: <a href="mailto:info@issi-software.com" className="hover:text-white text-sm">info@issi-software.com</a></p>
                                    </address>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}