"use client";

import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const ELearningCTA: React.FC = () => {
    const intl = useIntl();

    return (
        <section className="relative py-16  overflow-hidden">            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(148_163_184)_1px,transparent_0)] bg-[length:20px_20px]"></div>
            </div>

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Main CTA Content */}
                    <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-border/50">                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                            {intl.formatMessage({ id: 'page.eLearning.cta.title' })}
                        </h2>
                        
                        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                            {intl.formatMessage({ id: 'page.eLearning.cta.subtitle' })}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-full sm:w-auto">
                                {intl.formatMessage({ id: 'page.eLearning.cta.primary' })}
                            </button>
                            
                            <button className="bg-transparent hover:bg-muted/50 text-muted-foreground px-8 py-4 rounded-lg font-semibold border-2 border-border transition-all duration-200 w-full sm:w-auto">
                                {intl.formatMessage({ id: 'page.eLearning.cta.secondary' })}
                            </button>
                        </div>                        {/* Contact Information */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                                    <span className="text-primary text-lg font-bold">📞</span>
                                </div>
                                <h3 className="font-semibold text-foreground mb-1">
                                    <FormattedMessage id="page.eLearning.cta.contact.title" />
                                </h3>
                                <p className="text-muted-foreground">
                                    <FormattedMessage id="page.eLearning.cta.contact.phone" />
                                </p>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                                    <span className="text-primary text-lg font-bold">✉️</span>
                                </div>
                                <h3 className="font-semibold text-foreground mb-1">
                                    <FormattedMessage id="page.eLearning.cta.contact.email.title" />
                                </h3>
                                <p className="text-muted-foreground">
                                    <FormattedMessage id="page.eLearning.cta.contact.email" />
                                </p>
                            </div>

                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                                    <span className="text-primary text-lg font-bold">📍</span>
                                </div>
                                <h3 className="font-semibold text-foreground mb-1">
                                    <FormattedMessage id="page.eLearning.cta.contact.location.title" />
                                </h3>
                                <p className="text-muted-foreground">
                                    <FormattedMessage id="page.eLearning.cta.contact.location" />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ELearningCTA;
