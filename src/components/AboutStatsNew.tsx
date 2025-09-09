'use client';

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { FormattedMessage } from "react-intl";

const stats = [
    { id: 1, nameKey: "about.stats.experience.name", valueKey: "about.stats.experience.value" },
    { id: 2, nameKey: "about.stats.experts.name", valueKey: "about.stats.experts.value" },
    { id: 3, nameKey: "about.stats.partners.name", valueKey: "about.stats.partners.value" },
    { id: 4, nameKey: "about.stats.projects.name", valueKey: "about.stats.projects.value" },
];

export default function AboutStatsNew() {
    return (
        <section
            className="relative isolate overflow-hidden bg-primary text-primary-foreground py-24 sm:py-32"
            aria-labelledby="stats-heading"
        >
            <Image
                alt=""
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2850&q=80&blend=111827&blend-mode=multiply&sat=-100&exp=15"
                width={2850}
                height={1900}
                className="absolute inset-0 -z-10 size-full object-cover"
                loading="lazy"
            />
            <div className="relative mx-auto max-w-7xl px-4">
                <div
                    aria-hidden="true"
                    className="absolute -bottom-8 -left-96 -z-10 transform-gpu blur-3xl sm:-bottom-64 sm:-left-40 lg:-bottom-32 lg:left-8 xl:-left-10"
                >
                    <div
                        className="aspect-1266/975 w-316.5 bg-gradient-to-tr from-primary to-secondary opacity-20"
                    />
                </div>
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                    <p className="text-base/8 font-semibold text-primary">
                        <FormattedMessage id="about.stats.title" defaultMessage="Our track record" />
                    </p>
                    <h2 id="stats-heading" className="mt-2 text-pretty sm:text-5xl">
                        <FormattedMessage id="about.stats.headline" defaultMessage="Delivering excellence since 1995" />
                    </h2>
                    <p className="mt-6 text-lg/8 ">
                        <FormattedMessage id="about.stats.description" defaultMessage="International Software Systems, Inc. has been providing award-winning software development and IT support services with a proven track record of success." />
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                    {stats.map((stat) => (
                        <Card key={stat.id} className="bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-3xl font-semibold tracking-tight">
                                    <FormattedMessage id={stat.valueKey} defaultMessage="0" />
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    <FormattedMessage id={stat.nameKey} defaultMessage="Stat Name" />
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
