"use client";

import Image from 'next/image';
import { FormattedMessage } from 'react-intl';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

export default function AboutScrollStack() {
    return (
        <section aria-labelledby="core-values-title" className="scroll-stack-section">
            <ScrollStack
                useWindowScroll={true}
                itemDistance={100}
                itemStackDistance={20}
                stackPosition="20%"
                scaleEndPosition="10%"
                baseScale={0.85}
                itemScale={0.05}
            >
                <header className="py-4 text-center max-w-7xl mx-auto px-4">
                    <h2 id="core-values-title" className="text-4xl font-serif font-normal mb-4">
                        <FormattedMessage id="about.scrollstack.title" />
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        <FormattedMessage id="about.scrollstack.subtitle" />
                    </p>
                </header>
                <ScrollStackItem>
                    <article className="scroll-stack-card-content" aria-labelledby="company-overview-title">
                        <h3 id="company-overview-title">
                            <FormattedMessage id="about.scrollstack.part1.title" />
                        </h3>
                        <p>
                            <FormattedMessage id="about.scrollstack.part1.description" />
                        </p>
                    </article>
                    <Image
                        src="/images/placeholder_square_img_33kb.jpg"
                        alt="ISSI Company Overview - Founded in 1995, GSA IT MAS Schedule holder delivering diverse IT solutions and services in Greenbelt, Maryland"
                        width={200}
                        height={200}
                        className="scroll-stack-card-image"
                    />
                </ScrollStackItem>
                <ScrollStackItem>
                    <article className="scroll-stack-card-content" aria-labelledby="methodology-quality-title">
                        <h3 id="methodology-quality-title">
                            <FormattedMessage id="about.scrollstack.part2.title" />
                        </h3>
                        <p>
                            <FormattedMessage id="about.scrollstack.part2.description" />
                        </p>
                    </article>
                    <Image
                        src="/images/placeholder_square_img_33kb.jpg"
                        alt="ISSI Methodology & Quality - Industry-standard project management methodologies ensuring continuous improvement and quality assurance"
                        width={200}
                        height={200}
                        className="scroll-stack-card-image"
                    />
                </ScrollStackItem>
                <ScrollStackItem>
                    <article className="scroll-stack-card-content" aria-labelledby="mission-statement-title">
                        <h3 id="mission-statement-title">
                            <FormattedMessage id="about.scrollstack.part3.title" />
                        </h3>
                        <p>
                            <FormattedMessage id="about.scrollstack.part3.description" />
                        </p>
                    </article>
                    <Image
                        src="/images/placeholder_square_img_33kb.jpg"
                        alt="ISSI Mission Statement - Client-centric consulting services and solutions with integrity and equity as a trusted IT partner"
                        width={200}
                        height={200}
                        className="scroll-stack-card-image"
                    />
                </ScrollStackItem>
                <ScrollStackItem>
                    <article className="scroll-stack-card-content" aria-labelledby="vision-statement-title">
                        <h3 id="vision-statement-title">
                            <FormattedMessage id="about.scrollstack.part4.title" />
                        </h3>
                        <p>
                            <FormattedMessage id="about.scrollstack.part4.description" />
                        </p>
                    </article>
                    <Image
                        src="/images/placeholder_square_img_33kb.jpg"
                        alt="ISSI Vision Statement - Globally recognized IT leader with innovative solutions, outstanding customer service, exceeding client expectations"
                        width={200}
                        height={200}
                        className="scroll-stack-card-image"
                    />
                </ScrollStackItem>
                <ScrollStackItem>
                    <article className="scroll-stack-card-content" aria-labelledby="partnership-goals-title">
                        <h3 id="partnership-goals-title">
                            <FormattedMessage id="about.scrollstack.part5.title" />
                        </h3>
                        <p>
                            <FormattedMessage id="about.scrollstack.part5.description" />
                        </p>
                    </article>
                    <Image
                        src="/images/placeholder_square_img_33kb.jpg"
                        alt="ISSI Client Partnership Goals - Cutting-edge technology delivering cost-effective, reliable, secure solutions for long-term digital partnerships"
                        width={200}
                        height={200}
                        className="scroll-stack-card-image"
                    />
                </ScrollStackItem>
            </ScrollStack>
        </section>
    );
}
