"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { allProducts } from "@/data/products";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from 'lucide-react';
import { motion } from "motion/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

// Mapping from product IDs to slugs for routing
const productSlugMap: Record<string, string> = {
  "gms": "grant-management-system",
  "ects": "electronic-correspondence-tracking-system",
  "ets": "epermitting-system",
  "mdsps": "membership-database-subsidy-payment-system",
  "project-management": "project-management-suite",
  "bug-tracking": "bug-tracking-system",
  "capture-manager": "capture-manager",
  "prudent-agile": "prudent-agile-methodology",
  "task-management": "task-management-system",
  "requirements-management": "requirements-management-system",
  "hr-manager": "hr-management-system",
  "employee-performance": "employee-performance-system",
  "timesheet-management": "timesheet-management-system",
  "employee-talent-repository": "employee-talent-repository",
  "competency-skills-matrix": "competency-skills-matrix",
  "training-dashboard": "training-dashboard",
  "i-learn": "i-learn-system",
  "rsvp": "rsvp-event-management",
  "audit-reporting": "audit-reporting-system",
  "expense-tracking": "expense-tracking-system",
  "meeting-minutes-manager": "meeting-minutes-manager",
  "training-records": "training-records-system",
  "central-data": "central-data-platform",
  "e-survey": "e-survey-platform",
  "form-management": "form-management-system",
  "i-code": "i-code-testing-platform",
  "professional-management": "professional-management-system",
  "complaint-tracking": "complaint-tracking-system",
  "inventory-asset-tracking": "inventory-asset-tracking-system",
  "visitor-log": "visitor-log-system",
  "payroll-management": "payroll-management-system",
  "training-management": "training-management-system",
  "employee-scheduling": "employee-scheduling-system",
  "benefits-administration": "benefits-administration-system",
  "applicant-tracking": "applicant-tracking-system",
  "compliance-management": "compliance-management-system",
  "audit-management": "audit-management-system",
  "document-management": "document-management-system",
  "policy-management": "policy-management-system",
  "risk-management": "risk-management-system",
  "quality-assurance": "quality-assurance-system",
  "incident-management": "incident-management-system",
  "contract-management": "contract-management-system",
  "data-warehouse": "data-warehouse-solution",
  "business-intelligence": "business-intelligence-platform",
  "data-analytics": "data-analytics-platform",
  "data-migration": "data-migration-service",
  "etl-processing": "etl-processing-engine",
  "reporting-engine": "reporting-engine-platform",
  "dashboard-creation": "dashboard-creation-tool",
  "data-visualization": "data-visualization-suite",
  "legacy-modernization": "legacy-modernization-service",
  "cloud-migration": "cloud-migration-service",
  "system-integration": "system-integration-platform",
  "api-development": "api-development-framework",
  "microservices": "microservices-architecture",
  "devops-automation": "devops-automation-platform",
  "infrastructure-monitoring": "infrastructure-monitoring-system",
  "performance-optimization": "performance-optimization-service"
};

function getProductSlug(productId: string): string {
  return productSlugMap[productId] || productId;
}

interface ProductsBentoGridProps {
  lang: string;
}

const ProductsBentoGrid = ({ lang }: ProductsBentoGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const intl = useIntl();

  // Get unique categories with proper display names
  const categoryMap = useMemo(
    () => ({
      all: intl.formatMessage({ id: "products.categories.all" }),
      featured: intl.formatMessage({ id: "products.categories.featured" }),
      project: intl.formatMessage({ id: "products.categories.project" }),
      hr: intl.formatMessage({ id: "products.categories.hr" }),
      compliance: intl.formatMessage({ id: "products.categories.compliance" }),
      data: intl.formatMessage({ id: "products.categories.data" }),
      modernization: intl.formatMessage({ id: "products.categories.modernization" }),
      technology: intl.formatMessage({ id: "products.categories.technology" }),
    }),
    [intl]
  );

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(allProducts.map((product) => product.category)))],
    []
  );

  // Filter products based on active filter (memoized)
  const filteredProducts = useMemo(() => {
    return selectedCategory === "all" ? allProducts : allProducts.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  // Define category-specific colors for icons and borders
  const categoryColors = {
    featured: {
      icon: "text-blue-600 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-800",
      hover: "hover:border-blue-400 dark:hover:border-blue-500"
    },
    project: {
      icon: "text-green-600 dark:text-green-400",
      border: "border-green-200 dark:border-green-800",
      hover: "hover:border-green-400 dark:hover:border-green-500"
    },
    hr: {
      icon: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800",
      hover: "hover:border-purple-400 dark:hover:border-purple-500"
    },
    compliance: {
      icon: "text-orange-600 dark:text-orange-400",
      border: "border-orange-200 dark:border-orange-800",
      hover: "hover:border-orange-400 dark:hover:border-orange-500"
    },
    data: {
      icon: "text-red-600 dark:text-red-400",
      border: "border-red-200 dark:border-red-800",
      hover: "hover:border-red-400 dark:hover:border-red-500"
    },
    modernization: {
      icon: "text-indigo-600 dark:text-indigo-400",
      border: "border-indigo-200 dark:border-indigo-800",
      hover: "hover:border-indigo-400 dark:hover:border-indigo-500"
    },
    technology: {
      icon: "text-teal-600 dark:text-teal-400",
      border: "border-teal-200 dark:border-teal-800",
      hover: "hover:border-teal-400 dark:hover:border-teal-500"
    }
  };
  // Get colors for a specific category
  const getCategoryColors = (category: string) => {
    return categoryColors[category as keyof typeof categoryColors] || {
      icon: "text-slate-600 dark:text-slate-400",
      border: "border-gray-200 dark:border-gray-700",
      hover: "hover:border-gray-400 dark:hover:border-gray-500"
    };
  };
  // Get button colors for filter categories (WCAG AAA compliant)
  const getButtonColors = (category: string, isActive: boolean) => {
    const colors = {
      All: {
        active: "bg-slate-600 text-white border-slate-600",
        inactive: "bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-700"
      },
      featured: {
        active: "bg-blue-600 text-white border-blue-600",
        inactive: "bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700 dark:hover:bg-blue-800"
      },
      project: {
        active: "bg-green-600 text-white border-green-600",
        inactive: "bg-green-100 text-green-800 border-green-300 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700 dark:hover:bg-green-800"
      },
      hr: {
        active: "bg-purple-600 text-white border-purple-600",
        inactive: "bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-700 dark:hover:bg-purple-800"
      },
      compliance: {
        active: "bg-orange-600 text-white border-orange-600",
        inactive: "bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200 dark:bg-orange-900 dark:text-orange-200 dark:border-orange-700 dark:hover:bg-orange-800"
      },
      data: {
        active: "bg-red-600 text-white border-red-600",
        inactive: "bg-red-100 text-red-800 border-red-300 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700 dark:hover:bg-red-800"
      },
      modernization: {
        active: "bg-indigo-600 text-white border-indigo-600",
        inactive: "bg-indigo-100 text-indigo-800 border-indigo-300 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-200 dark:border-indigo-700 dark:hover:bg-indigo-800"
      },
      technology: {
        active: "bg-teal-600 text-white border-teal-600",
        inactive: "bg-teal-100 text-teal-800 border-teal-300 hover:bg-teal-200 dark:bg-teal-900 dark:text-teal-200 dark:border-teal-700 dark:hover:bg-teal-800"
      }
    };

    const categoryColor = colors[category as keyof typeof colors] || colors.All;
    return isActive ? categoryColor.active : categoryColor.inactive;
  };

  return (
    <div className="py-2" style={{ contain: 'layout style paint' }}>
      <div className="mx-auto max-w-7xl px-2">
        {/* Header Section */}
        <div className="max-w-2xl text-left">
          <h2 className="relative z-10 max-w-4xl text-left text-2xl font-normal text-foreground md:text-4xl lg:text-7xl">
            {"Innovative Software Products & Solutions"
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  className="mr-2 inline-block"
                >
                  {word}
                </motion.span>
              ))}
          </h2>
          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              delay: 0.8,
            }}
            className="relative z-10 max-w-xl py-4 text-left text-lg font-normal text-muted-foreground"
          >
            <FormattedMessage
              id="products.showcase.subtitle"
              defaultMessage="Comprehensive software solutions designed to streamline operations and enhance productivity for government organizations."
            />
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="mt-16 flex flex-wrap justify-start gap-2 mb-12" role="tablist" aria-label="Product category filters" id="product-categories">
          {categories.map((category) => (
            <Button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-6 py-3 rounded-lg font-medium text-base transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
                getButtonColors(category, selectedCategory === category)
              )}
              role="tab"
              aria-selected={selectedCategory === category ? 'true' : 'false'}
              aria-controls={`products-${category.toLowerCase()}`}
              tabIndex={selectedCategory === category ? 0 : -1}
              title={categoryMap[category as keyof typeof categoryMap] || category}
            >
              {categoryMap[category as keyof typeof categoryMap] || category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto auto-rows-min"
          role="tabpanel"
          id={`products-${selectedCategory.toLowerCase()}`}
          aria-labelledby="product-categories"
        >
          {filteredProducts.map((product, _index) => {
            const IconComponent = product.icon;
            const colors = getCategoryColors(product.category);
            const productSlug = getProductSlug(product.id);
            const productHref = `/${lang}/products/${productSlug}`;

            return (
              <Link key={product.id} href={productHref} className="block no-underline">
                <Card
                  className={cn(
                    "flex flex-col justify-between overflow-hidden cursor-pointer h-full bg-card relative group",
                    "col-span-1", // Default single column
                    product.className && `md:${product.className}`, // Apply col-span on md and up
                    "hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                  )}
                >
                  {/* Arrow in top right corner */}
                  <div className="absolute top-4 right-4 z-20 flex items-center justify-center">
                    <div className="relative">
                      {/* Ring around arrow - appears only on hover with smooth animation */}
                      <div className="absolute inset-0 w-6 h-6 rounded-[7px] border border-primary/30 scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
                      {/* Arrow background */}
                      <div className="w-6 h-6 rounded-[6px] bg-primary/10 shadow-lg flex items-center justify-center">
                        <ArrowUpRight className="w-3 h-3 text-primary" />
                      </div>
                    </div>
                  </div>

                  {/* Content container */}
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <CardHeader className="flex flex-row items-center space-y-0 space-x-2">
                      <IconComponent className={cn(
                        "size-6 transition-all duration-300",
                        colors.icon,
                        "group-hover/bento:drop-shadow-lg"
                      )} />
                      <CardTitle className={cn(
                        "font-serif font-[400] tracking-tight text-2xl transition duration-300",
                        "text-foreground"
                      )}>
                        {product.titleKey ? intl.formatMessage({ id: product.titleKey }) : product.title || 'Untitled'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      <p className="text-muted-foreground text-sm">
                        {product.descriptionKey ? intl.formatMessage({ id: product.descriptionKey }) : product.description || 'No description available'}
                      </p>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default function ProductsBentoGridWithErrorBoundary(props: ProductsBentoGridProps) {
  return (
    <ErrorBoundary>
      <ProductsBentoGrid {...props} />
    </ErrorBoundary>
  );
}
