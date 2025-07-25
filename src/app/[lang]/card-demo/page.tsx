"use client";

import React from "react";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Shield, Server, Code } from "lucide-react";

export default function CardEffectDemo() {
  // Sample services for demo
  const services = [
    {
      title: "Cybersecurity Solutions",
      description: "Comprehensive security services including threat detection, penetration testing, and compliance management to protect your critical assets.",
      icon: <Shield className="size-8 text-blue-500" />,
      href: '#',
      className: 'md:col-span-2',
    },
    {
      title: "Cloud Services",
      description: "Expert cloud migration, optimization, and management services for AWS, Azure, and Google Cloud platforms.",
      icon: <Server className="size-8 text-indigo-500" />,
      href: '#',
      className: 'md:col-span-1',
    },
    {
      title: "Software Development",
      description: "Custom software solutions tailored to your specific business needs and industry standards.",
      icon: <Code className="size-8 text-purple-500" />,
      href: '#',
      className: 'md:col-span-1',
    },
  ];

  return (
    <div className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold mb-8 text-center">Bento Grid with Card Hover Effect</h1>
        
        <p className="text-lg mb-10 text-center max-w-3xl mx-auto">
          Hover over the cards below to see the Evervault-inspired hover effect integrated with our bento grid component.
        </p>
        
        {/* Bento Grid Demo */}
        <BentoGrid className="mx-auto mb-16">
          {services.map((service, i) => (
            <BentoGridItem
              key={i}
              title={service.title}
              description={service.description}
              icon={service.icon}
              className={service.className}
              href={service.href}
            />
          ))}
        </BentoGrid>
        
        {/* Original Evervault Card Demo */}
        <h2 className="text-2xl font-bold mb-8 text-center">Original Evervault Card</h2>
        <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem] mb-16">
          <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

          <EvervaultCard text="hover" />

          <h2 className="dark:text-white text-black mt-4 text-sm font-light">
            Hover over this card to reveal an awesome effect. Running out of copy
            here.
          </h2>
          <p className="text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5">
            Watch me hover
          </p>
        </div>
      </div>
    </div>
  );
}
