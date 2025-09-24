"use client";

import { InfiniteSlider } from "../../components/motion-primitives/infinite-slider";
import { motion } from "motion/react";
import { FormattedMessage } from "react-intl";
import Image from "next/image";

export default function GovernmentTestimonialsCarousel() {
  return (
    <motion.section
      className="py-16 sm:py-24"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-left mb-12">
          <motion.h2
            className="text-foreground sm:text-6xl mb-4 font-serif font-[400] text-4xl tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <FormattedMessage id="government.testimonials.carousel.title" defaultMessage="Client Testimonials" />
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FormattedMessage id="government.testimonials.carousel.subtitle" defaultMessage="What our government clients say about working with us" />
          </motion.p>
        </div>

        <motion.div
          className="h-[20rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <InfiniteSlider speed={50} speedOnHover={80} gap={24}>
            {governmentTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative min-w-[350px] max-w-[400px] shrink-0 rounded-2xl border border-border bg-card text-card-foreground shadow-md p-6"
              >
                <blockquote>
                  <span className="relative z-20 text-base leading-[1.6] font-normal">
                    {testimonial.quote}
                  </span>
                  <div className="relative z-20 mt-6 flex flex-row items-center">
                    {testimonial.avatar && (
                      <div className="mr-4 relative">
                        <Image
                          src={testimonial.avatar}
                          alt={`Avatar of ${testimonial.name}`}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="absolute inset-0 rounded-full ring-2 ring-gray-300 ring-offset-2 ring-offset-background pointer-events-none"></div>
                      </div>
                    )}
                    <span className="flex flex-col gap-0">
                      <span className="text-xl leading-[1.4] font-serif font-[400]">
                        {testimonial.name}
                      </span>
                      <span className="text-sm leading-[1.6] font-semibold opacity-80">
                        {testimonial.title}
                      </span>
                    </span>
                  </div>
                </blockquote>
              </div>
            ))}
          </InfiniteSlider>
        </motion.div>
      </div>
    </motion.section>
  );
}

const governmentTestimonials = [
  {
    quote: "ISSI delivers mission-critical solutions on time and within budget. Their security compliance is unmatched.",
    name: "Federal Project Manager",
    title: "Library of Congress",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
  {
    quote: "Outstanding technical expertise and commitment to government standards. They exceed expectations consistently.",
    name: "IT Director",
    title: "Food and Drug Administration",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
  {
    quote: "Their agile approach helped us modernize legacy systems efficiently while maintaining strict security protocols.",
    name: "Systems Administrator",
    title: "U.S. Army Sam/Calm Division",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
  {
    quote: "ISSI's deep understanding of government processes makes them an invaluable technology partner.",
    name: "Chief Information Officer",
    title: "National Security Agency",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b332e234?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
  {
    quote: "Reliable, secure, and innovative solutions. ISSI consistently delivers quality results for our department.",
    name: "Program Manager",
    title: "U.S. Department of Veterans Affairs",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
  {
    quote: "Their CMMI Level 3 certification and attention to detail ensure our projects meet all compliance requirements.",
    name: "Contract Administrator",
    title: "Naval Air Warfare Center",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
  {
    quote: "ISSI's diverse team brings fresh perspectives while maintaining the highest security clearance standards.",
    name: "Technology Lead",
    title: "Federal Communications Commission",
    avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
  {
    quote: "Exceptional project management and technical delivery. They understand our unique operational needs.",
    name: "Director of Operations",
    title: "U.S. Government Publishing Office",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
  {
    quote: "Their expertise in government IT modernization has been instrumental in our digital transformation.",
    name: "Deputy CIO",
    title: "USDA - National IT Center",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
  {
    quote: "ISSI provides scalable solutions that grow with our agency's evolving technology requirements.",
    name: "Senior Architect",
    title: "City of Goodyear",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
  {
    quote: "Professional, responsive, and results-driven. ISSI sets the standard for government contractor excellence.",
    name: "Procurement Officer",
    title: "Florida Department of Revenue",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
  {
    quote: "Their comprehensive approach to IT consulting and development makes complex projects manageable and successful.",
    name: "Technical Manager",
    title: "University of Maryland Baltimore",
    avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face&auto=format&q=80",
  },
];
