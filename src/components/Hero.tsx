"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import Link from 'next/link';
import { FormattedMessage, useIntl } from 'react-intl';

interface HeroProps {
  lang?: string;
}

export default function Hero({ lang: _lang = "en" }: HeroProps) {
  const _intl = useIntl();
  return (
    <div className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:shrink-0 lg:max-w-xl">
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader>
              <div className="">
                <Link href="/about" className="inline-flex space-x-6" title="Learn more about ISSI's achievements">
                  <span className="rounded-full bg-primary/10 px-3 py-1  ">
                    <FormattedMessage id="newhero.announcement.badge" />
                  </span>
                  <span className="inline-flex items-center space-x-2  ">
                    <span>
                      <FormattedMessage id="newhero.announcement.text" />
                    </span>
                    <ChevronRightIcon aria-hidden="true" className="size-5 text-muted-foreground/60" />
                  </span>
                </Link>
              </div>
              <h1 className="mt-6 text-pretty text-foreground sm:text-4xl">
                <FormattedMessage id="newhero.title" />
              </h1>
              <CardDescription className="mt-4  ">
                <FormattedMessage
                  id="newhero.description"
                  values={{
                    innovativeTechnology: (chunks: React.ReactNode) => (
                      <Link
                        href="/services"
                        className="text-primary hover:underline"
                        title="Explore our innovative technology services"
                        key="innovativeTechnology-link"
                      >
                        {chunks}
                      </Link>
                    ),
                    government: (chunks: React.ReactNode) => (
                      <Link
                        href="/government"
                        className="text-primary hover:underline"
                        title="Government solutions and services"
                        key="government-link"
                      >
                        {chunks}
                      </Link>
                    ),
                    enterprise: (chunks: React.ReactNode) => (
                      <Link
                        href="/products"
                        className="text-primary hover:underline"
                        title="Enterprise products and solutions"
                        key="enterprise-link"
                      >
                        {chunks}
                      </Link>
                    ),
                  }}
                />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mt-6 flex items-center gap-x-6">
                <Link
                  href="/contact"
                  title="Contact ISSI to get started with our solutions"
                  className={cn(buttonVariants({ variant: "default", size: "lg" }))}
                >
                  <FormattedMessage id="newhero.cta.get-started" />
                </Link>
                <Link
                  href="/services"
                  title="Explore ISSI's software solutions and services"
                  className={cn(buttonVariants({ variant: "link", size: "sm" }))}
                >
                  <span className="inline-flex items-center">
                    <FormattedMessage id="newhero.cta.learn-more" />
                    <ChevronRightIcon className="h-4 w-4 ml-1" />
                  </span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mx-auto flex max-w-2xl lg:mr-0 lg:ml-10 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="-m-2 rounded-xl bg-foreground/5 p-2 ring-1 ring-border ring-inset lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                alt="ISSI technology solutions dashboard and services overview"
                src="/images/project-app-screenshot.png"
                width={2432}
                height={1442}
                className="w-full max-w-[76rem] rounded-md shadow-2xl ring-1 ring-border"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

