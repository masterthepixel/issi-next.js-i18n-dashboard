"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { FormattedMessage } from "react-intl";

export default function GovernmentTestimonialsCarousel() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl mb-4">
            <FormattedMessage id="government.testimonials.carousel.title" />
          </h2>
          <p className="text-lg leading-8 text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            <FormattedMessage id="government.testimonials.carousel.subtitle" />
          </p>
        </div>
        
        <div className="h-[20rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={governmentTestimonials}
            direction="right"
            speed="slow"
            pauseOnHover={true}
            className="w-full"
          />
        </div>
      </div>
    </section>
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
