"use client";

import { motion } from "framer-motion";
import { Calendar, Dribbble, Globe, Linkedin, Mail, Youtube } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FormattedMessage } from "react-intl";
const FooterContactCTAContactForm = dynamic(() => import("./FooterContactCTAContactForm"), { ssr: false });

import Image from "next/image";

export default function FooterContactCTA() {
    const year = new Date().getFullYear();
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
                    <h2 className="text-[clamp(2rem,6vw,4.5rem)] lg:text-[clamp(2rem,4vw,4.5rem)] text-left w-full">
                        {/* Animated headline: Ready to build https://www.aura.build/component/6E7D8 */}
                        {"Ready to build".split(" ").map((word, idx) => (
                            <motion.span
                                key={word + idx}
                                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.1, ease: "easeInOut" }}
                                className="inline-block mr-2"
                            >
                                {word}
                            </motion.span>
                        ))}
                        <br />
                        {/* Animated headline: something extraordinary? */}
                        {"something extraordinary?".split(" ").map((word, idx) => (
                            <motion.span
                                key={word + idx + "extra"}
                                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                                transition={{ duration: 0.3, delay: 0.4 + idx * 0.1, ease: "easeInOut" }}
                                className="inline-block mr-2 text-white/60"
                            >
                                {word}
                            </motion.span>
                        ))}
                    </h2>
                    <div className="mt-8 w-full">
                        <FooterContactCTAContactForm />
                    </div>
                    <div className="mt-8 w-full flex flex-col md:flex-row items-start gap-y-6 md:gap-y-0 md:gap-x-12">
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
                    </div>
                    <div className="mt-8 border-t border-white/10"></div>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Menu */}
                        <div>
                            <p className="text-sm text-white/60 font-geist">
                                <FormattedMessage id="footer.cta.explore" defaultMessage="Explore" />
                            </p>
                            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                                <Link href="#work" className="font-medium tracking-tight hover:underline font-geist">
                                    <FormattedMessage id="footer.cta.ourWork" defaultMessage="Our Work" />
                                </Link>
                                <Link href="#services" className="font-medium tracking-tight hover:underline font-geist">
                                    <FormattedMessage id="footer.cta.whatWeDo" defaultMessage="What We Do" />
                                </Link>
                                <Link href="#pricing" className="font-medium tracking-tight hover:underline font-geist">
                                    <FormattedMessage id="footer.cta.investment" defaultMessage="Investment" />
                                </Link>
                                <Link href="#blog" className="font-medium tracking-tight hover:underline font-geist">
                                    <FormattedMessage id="footer.cta.insights" defaultMessage="Insights" />
                                </Link>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
