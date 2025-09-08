"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";
import { cn } from "@/lib/utils";
import { Code, Server, Shield } from "lucide-react";
import Link from "next/link";

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
      icon: <Server className="size-8 text-blue-500" />,
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
        <h1 className="mb-8 text-center">Bento Grid with Card Hover Effect</h1>

        <p className="text-lg mb-10 text-center max-w-3xl mx-auto">
          Hover over the cards below to see the Evervault-inspired hover effect integrated with our bento grid component.
        </p>

        {/* Bento Grid Demo */}
        <div className="grid md:grid-cols-3 gap-4 mx-auto mb-16">
          {services.map((service, i) => (
            <Link href={service.href} key={i} className={cn(service.className)}>
              <Card className="h-full transition-shadow duration-300 hover:shadow-xl">
                <CardHeader>{service.icon}</CardHeader>
                <CardContent>
                  <CardTitle className="mb-2 text-lg font-semibold">
                    {service.title}
                  </CardTitle>
                  <p className="" text-caption2241="true" text-muted-foreground2241="true">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Original Evervault Card Demo */}
        <h2 className="mb-8 text-center">Original Evervault Card</h2>
        <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem] mb-16">
          <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

          <EvervaultCard text="hover" />

          <h2 className="dark: mt-4">
            Hover over this card to reveal an awesome effect. Running out of copy
            here.
          </h2>
          <p className="" text-caption3322="true">
            Watch me hover
          </p>
        </div>
      </div>
    </div>
  );
}
