"use client";

import ScrollStack, { ScrollStackItem } from './ScrollStack';

export default function AboutScrollStack() {
    return (
        <ScrollStack
            useWindowScroll={true}
            itemDistance={100}
            itemStackDistance={20}
            stackPosition="20%"
            scaleEndPosition="10%"
            baseScale={0.85}
            itemScale={0.05}
        >
            <div className="py-4 text-center max-w-7xl mx-auto px-4">
                <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Scroll down to explore the principles that guide our mission and drive our success
                </p>
            </div>
            <ScrollStackItem>
                <h2>Innovation</h2>
                <p>We embrace cutting-edge technologies and creative solutions to solve complex challenges</p>
            </ScrollStackItem>
            <ScrollStackItem>
                <h2>Excellence</h2>
                <p>We maintain the highest standards in everything we do, from code quality to customer service</p>
            </ScrollStackItem>
            <ScrollStackItem>
                <h2>Integrity</h2>
                <p>We build trust through transparency, honesty, and ethical business practices</p>
            </ScrollStackItem>
            <ScrollStackItem>
                <h2>Collaboration</h2>
                <p>We believe in the power of teamwork and partnership to achieve extraordinary results</p>
            </ScrollStackItem>
            <ScrollStackItem>
                <h2>Impact</h2>
                <p>We are committed to making a meaningful difference in our clients&apos; success and our community</p>
            </ScrollStackItem>
        </ScrollStack>
    );
}
