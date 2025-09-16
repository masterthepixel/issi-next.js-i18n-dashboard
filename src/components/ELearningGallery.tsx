"use client";

import Image from "next/image";
import { FormattedMessage } from "react-intl";
import {
    BentoCell,
    BentoGrid,
    ContainerScale,
    ContainerScroll
} from "./hero-gallery-scroll-animation";

export default function ELearningGallery() {
    return (
        <section className="py-20 bg-gradient-to-b from-background to-muted/20">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        <FormattedMessage
                            id="elearning.gallery.title"
                            defaultMessage="Our E-Learning Solutions in Action"
                        />
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        <FormattedMessage
                            id="elearning.gallery.subtitle"
                            defaultMessage="Discover how we transform learning experiences through innovative technology and engaging content"
                        />
                    </p>
                </div>

                {/* Hero Gallery */}
                <ContainerScroll className="h-screen">
                    <ContainerScale>
                        <div className="text-center mb-8">
                            <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                                <FormattedMessage
                                    id="elearning.gallery.showcase.title"
                                    defaultMessage="Interactive Learning Platform"
                                />
                            </h3>
                            <p className="text-muted-foreground">
                                <FormattedMessage
                                    id="elearning.gallery.showcase.description"
                                    defaultMessage="Engaging multimedia courses with SCORM compliance"
                                />
                            </p>
                        </div>
                    </ContainerScale>

                    <BentoGrid variant="default" className="max-w-6xl mx-auto h-96">
                        {/* Main Feature - LMS Platform */}
                        <BentoCell className="bg-card border rounded-lg overflow-hidden shadow-lg">
                            <div className="relative h-full">
                                <Image
                                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                                    alt="Learning Management System Interface"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-black/40" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h4 className="text-xl font-semibold mb-2">
                                        <FormattedMessage
                                            id="elearning.gallery.lms.title"
                                            defaultMessage="Advanced LMS Platform"
                                        />
                                    </h4>
                                    <p className="text-sm">
                                        <FormattedMessage
                                            id="elearning.gallery.lms.description"
                                            defaultMessage="Custom learning management systems tailored to your needs"
                                        />
                                    </p>
                                </div>
                            </div>
                        </BentoCell>

                        {/* Course Development */}
                        <BentoCell className="bg-card border rounded-lg overflow-hidden shadow-lg">
                            <div className="relative h-full">
                                <Image
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Interactive Course Development"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h4 className="text-lg font-semibold mb-1">
                                        <FormattedMessage
                                            id="elearning.gallery.courses.title"
                                            defaultMessage="Interactive Courses"
                                        />
                                    </h4>
                                    <p className="text-xs">
                                        <FormattedMessage
                                            id="elearning.gallery.courses.description"
                                            defaultMessage="Engaging multimedia content"
                                        />
                                    </p>
                                </div>
                            </div>
                        </BentoCell>

                        {/* Mobile Learning */}
                        <BentoCell className="bg-card border rounded-lg overflow-hidden shadow-lg">
                            <div className="relative h-full">
                                <Image
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Mobile Learning Solutions"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h4 className="text-lg font-semibold mb-1">
                                        <FormattedMessage
                                            id="elearning.gallery.mobile.title"
                                            defaultMessage="Mobile Learning"
                                        />
                                    </h4>
                                    <p className="text-xs">
                                        <FormattedMessage
                                            id="elearning.gallery.mobile.description"
                                            defaultMessage="Learn anywhere, anytime"
                                        />
                                    </p>
                                </div>
                            </div>
                        </BentoCell>

                        {/* Analytics Dashboard */}
                        <BentoCell className="bg-card border rounded-lg overflow-hidden shadow-lg">
                            <div className="relative h-full">
                                <Image
                                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Learning Analytics Dashboard"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h4 className="text-lg font-semibold mb-1">
                                        <FormattedMessage
                                            id="elearning.gallery.analytics.title"
                                            defaultMessage="Learning Analytics"
                                        />
                                    </h4>
                                    <p className="text-xs">
                                        <FormattedMessage
                                            id="elearning.gallery.analytics.description"
                                            defaultMessage="Track progress & performance"
                                        />
                                    </p>
                                </div>
                            </div>
                        </BentoCell>

                        {/* Virtual Classroom */}
                        <BentoCell className="bg-card border rounded-lg overflow-hidden shadow-lg">
                            <div className="relative h-full">
                                <Image
                                    src="https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Virtual Classroom Environment"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h4 className="text-lg font-semibold mb-1">
                                        <FormattedMessage
                                            id="elearning.gallery.classroom.title"
                                            defaultMessage="Virtual Classrooms"
                                        />
                                    </h4>
                                    <p className="text-xs">
                                        <FormattedMessage
                                            id="elearning.gallery.classroom.description"
                                            defaultMessage="Real-time collaboration"
                                        />
                                    </p>
                                </div>
                            </div>
                        </BentoCell>
                    </BentoGrid>
                </ContainerScroll>

                {/* Additional Features Section */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center p-6 bg-card rounded-lg border">
                        <div className="text-4xl mb-4">🎯</div>
                        <h3 className="text-xl font-semibold mb-2">
                            <FormattedMessage
                                id="elearning.gallery.features.personalized.title"
                                defaultMessage="Personalized Learning"
                            />
                        </h3>
                        <p className="text-muted-foreground">
                            <FormattedMessage
                                id="elearning.gallery.features.personalized.description"
                                defaultMessage="Adaptive learning paths that adjust to individual needs and progress"
                            />
                        </p>
                    </div>

                    <div className="text-center p-6 bg-card rounded-lg border">
                        <div className="text-4xl mb-4">🛡️</div>
                        <h3 className="text-xl font-semibold mb-2">
                            <FormattedMessage
                                id="elearning.gallery.features.compliance.title"
                                defaultMessage="Compliance Ready"
                            />
                        </h3>
                        <p className="text-muted-foreground">
                            <FormattedMessage
                                id="elearning.gallery.features.compliance.description"
                                defaultMessage="SCORM 2004, Section 508, and industry standard compliance"
                            />
                        </p>
                    </div>

                    <div className="text-center p-6 bg-card rounded-lg border">
                        <div className="text-4xl mb-4">⚡</div>
                        <h3 className="text-xl font-semibold mb-2">
                            <FormattedMessage
                                id="elearning.gallery.features.performance.title"
                                defaultMessage="High Performance"
                            />
                        </h3>
                        <p className="text-muted-foreground">
                            <FormattedMessage
                                id="elearning.gallery.features.performance.description"
                                defaultMessage="Optimized for speed and scalability across all devices"
                            />
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}