"use client";

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";
import React from "react";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaChartLine,
  FaCode,
  FaCog,
  FaDownload,
  FaExternalLinkAlt,
  FaPlay,
  FaShieldAlt,
  FaStar,
  FaUsers
} from "react-icons/fa";
import { FormattedMessage, useIntl } from "react-intl";

interface ProductDetailsPageProps {
  productId: string;
  lang: string;
  onBack?: () => void;
}

interface ProductFeature {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: React.ComponentType<any>;
  category: string;
  size: { width: number; height: number };
  className: string;
}

const getProductFeatures = (productId: string): ProductFeature[] => {
  // This would typically come from a database or API
  // For now, providing example features for any product
  return [
    {
      id: "overview",
      titleKey: `products.${productId}.features.overview.title`,
      descriptionKey: `products.${productId}.features.overview.description`,
      icon: FaChartLine,
      category: "overview",
      size: { width: 2, height: 1 },
      className: "md:col-span-2",
    },
    {
      id: "features",
      titleKey: `products.${productId}.features.core.title`,
      descriptionKey: `products.${productId}.features.core.description`,
      icon: FaCog,
      category: "features",
      size: { width: 1, height: 1 },
      className: "md:col-span-1",
    },
    {
      id: "security",
      titleKey: `products.${productId}.features.security.title`,
      descriptionKey: `products.${productId}.features.security.description`,
      icon: FaShieldAlt,
      category: "security",
      size: { width: 1, height: 1 },
      className: "md:col-span-1",
    },
    {
      id: "integration",
      titleKey: `products.${productId}.features.integration.title`,
      descriptionKey: `products.${productId}.features.integration.description`,
      icon: FaCode,
      category: "technical",
      size: { width: 1, height: 1 },
      className: "md:col-span-1",
    },
    {
      id: "support",
      titleKey: `products.${productId}.features.support.title`,
      descriptionKey: `products.${productId}.features.support.description`,
      icon: FaUsers,
      category: "support",
      size: { width: 1, height: 1 },
      className: "md:col-span-1",
    },
    {
      id: "demo",
      titleKey: `products.${productId}.features.demo.title`,
      descriptionKey: `products.${productId}.features.demo.description`,
      icon: FaPlay,
      category: "demo",
      size: { width: 1, height: 1 },
      className: "md:col-span-1",
    },
  ];
};

export default function ProductDetailsPage({
  productId,
  lang: _lang,
  onBack
}: ProductDetailsPageProps) {
  const intl = useIntl();
  const features = getProductFeatures(productId);

  // Icon color rotation system (matching ProductsBentoGrid pattern)
  const iconColors = [
    "text-blue-500",
    "text-green-500",
    "text-purple-500",
    "text-orange-500",
    "text-red-500",
    "text-indigo-500",
    "text-teal-500",
    "text-pink-500"
  ];

  return (
    <div className="min-h-screen grid-background">
      {/* Header Section */}
      <div className="container mx-auto px-6 py-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Go back to products page"
          >
            <FaArrowLeft className="w-4 h-4" />
            <FormattedMessage id="common.back" defaultMessage="Back to Products" />
          </button>
        </div>

        {/* Product Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            <FormattedMessage
              id={`products.${productId}.title`}
              defaultMessage={`${productId.toUpperCase()} Product`}
            />
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            <FormattedMessage
              id={`products.${productId}.description`}
              defaultMessage="Advanced enterprise solution designed to streamline your operations and enhance productivity."
            />
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              aria-label="Request product demonstration"
            >
              <FaPlay className="w-4 h-4" />
              <FormattedMessage id="products.demo.request" defaultMessage="Request Demo" />
            </button>
            <button
              className="inline-flex items-center gap-2 px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium rounded-lg transition-colors duration-200"
              aria-label="Download product brochure"
            >
              <FaDownload className="w-4 h-4" />
              <FormattedMessage id="products.brochure.download" defaultMessage="Download Brochure" />
            </button>
          </div>
        </div>

        {/* Product Features Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            <FormattedMessage id="products.features.title" defaultMessage="Key Features" />
          </h2>

          <BentoGrid className="max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <BentoGridItem
                key={feature.id}
                title={intl.formatMessage({
                  id: feature.titleKey,
                  defaultMessage: `${feature.id} Feature`
                })}
                description={intl.formatMessage({
                  id: feature.descriptionKey,
                  defaultMessage: "Comprehensive feature description that enhances your workflow."
                })}
                header={
                  <div className="flex items-center justify-center h-24 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-lg">
                    <feature.icon
                      className={cn(
                        "w-8 h-8",
                        iconColors[index % iconColors.length]
                      )}
                    />
                  </div>
                }
                className={cn(
                  feature.className,
                  "cursor-pointer hover:shadow-xl transition-all duration-300"
                )}
                icon={
                  <FaExternalLinkAlt className="w-4 h-4 text-slate-400" />
                }
              />
            ))}
          </BentoGrid>
        </div>

        {/* Product Specifications */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <FaCalendarAlt className="w-6 h-6 text-blue-500" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                <FormattedMessage id="products.implementation" defaultMessage="Implementation" />
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              <FormattedMessage
                id={`products.${productId}.implementation`}
                defaultMessage="2-4 weeks typical deployment with full training and support included."
              />
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <FaStar className="w-6 h-6 text-yellow-500" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                <FormattedMessage id="products.rating" defaultMessage="Customer Rating" />
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className="w-4 h-4 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-300">
                (4.8/5 from 150+ reviews)
              </span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <FaUsers className="w-6 h-6 text-green-500" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                <FormattedMessage id="products.support" defaultMessage="Support" />
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300">
              <FormattedMessage
                id="products.support.description"
                defaultMessage="24/7 dedicated support with guaranteed response times."
              />
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            <FormattedMessage id="products.contact.title" defaultMessage="Ready to Get Started?" />
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
            <FormattedMessage
              id="products.contact.description"
              defaultMessage="Contact our sales team to learn more about how this solution can transform your business operations."
            />
          </p>
          <button
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            aria-label="Contact sales team"
          >
            <FormattedMessage id="products.contact.cta" defaultMessage="Contact Sales" />
            <FaExternalLinkAlt className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}