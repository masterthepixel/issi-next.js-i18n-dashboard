"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { allProducts } from "@/data/products";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from 'lucide-react';
import Link from "next/link";
import { useMemo, useState } from "react";
import { useIntl } from "react-intl";

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

  // Define category-specific colors for consistency using semantic theme variables
  const categoryColors = {
    featured: {
      icon: "text-blue-500",
      border: "border-border",
      hover: "hover:border-primary/50"
    },
    project: {
      icon: "text-emerald-500",
      border: "border-border",
      hover: "hover:border-primary/50"
    },
    hr: {
      icon: "text-red-500",
      border: "border-border",
      hover: "hover:border-primary/50"
    },
    compliance: {
      icon: "text-purple-500",
      border: "border-border",
      hover: "hover:border-primary/50"
    },
    data: {
      icon: "text-orange-500",
      border: "border-border",
      hover: "hover:border-primary/50"
    },
    modernization: {
      icon: "text-pink-500",
      border: "border-border",
      hover: "hover:border-primary/50"
    },
    technology: {
      icon: "text-cyan-500",
      border: "border-border",
      hover: "hover:border-primary/50"
    }
  };

  // Get colors for a specific category
  const getCategoryColors = (category: string) => {
    return categoryColors[category as keyof typeof categoryColors] || categoryColors.featured;
  };

  // WCAG AAA compliant button colors using semantic theme variables
  const getButtonColors = (category: string, isActive: boolean) => {
    const categoryButtonColors = {
      all: {
        active: "bg-slate-600 text-white border-slate-600",
        inactive: "bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-700"
      },
      featured: {
        active: "bg-blue-600 text-white border-blue-600",
        inactive: "bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700 dark:hover:bg-blue-800"
      },
      project: {
        active: "bg-emerald-600 text-white border-emerald-600",
        inactive: "bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-200 dark:border-emerald-700 dark:hover:bg-emerald-800"
      },
      hr: {
        active: "bg-red-600 text-white border-red-600",
        inactive: "bg-red-100 text-red-800 border-red-300 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700 dark:hover:bg-red-800"
      },
      compliance: {
        active: "bg-purple-600 text-white border-purple-600",
        inactive: "bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-700 dark:hover:bg-purple-800"
      },
      data: {
        active: "bg-orange-600 text-white border-orange-600",
        inactive: "bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200 dark:bg-orange-900 dark:text-orange-200 dark:border-orange-700 dark:hover:bg-orange-800"
      },
      modernization: {
        active: "bg-pink-600 text-white border-pink-600",
        inactive: "bg-pink-100 text-pink-800 border-pink-300 hover:bg-pink-200 dark:bg-pink-900 dark:text-pink-200 dark:border-pink-700 dark:hover:bg-pink-800"
      },
      technology: {
        active: "bg-cyan-600 text-white border-cyan-600",
        inactive: "bg-cyan-100 text-cyan-800 border-cyan-300 hover:bg-cyan-200 dark:bg-cyan-900 dark:text-cyan-200 dark:border-cyan-700 dark:hover:bg-cyan-800"
      }
    };

    const colors = categoryButtonColors[category as keyof typeof categoryButtonColors] || categoryButtonColors.all;
    return isActive ? colors.active : colors.inactive;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-start gap-2 mb-12" role="tablist" aria-label="Product category filters">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <Button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-6 py-3 rounded-lg font-medium text-base transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
                getButtonColors(category, isSelected)
              )}
              role="tab"
              {...(isSelected ? { 'aria-selected': true } : { 'aria-selected': false })}
              aria-controls={`products-${category}`}
              tabIndex={isSelected ? 0 : -1}
              title={categoryMap[category as keyof typeof categoryMap] || category}
            >
              {categoryMap[category as keyof typeof categoryMap] || category}
            </Button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div
        id="products-list"
        role="tabpanel"
        aria-labelledby={`tab-${selectedCategory}`}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto auto-rows-min"
      >
        {filteredProducts.map((product, _index) => {
          const IconComponent = product.icon;
          const productSlug = getProductSlug(product.id);
          const productHref = `/${lang}/products/${productSlug}`;
          const colors = getCategoryColors(product.category);

          return (
            <Link href={productHref} key={product.id} className={cn("group no-underline", product.className)}>
              <Card
                className={cn(
                  "flex flex-col justify-between overflow-hidden cursor-pointer h-full bg-card relative group",
                  product.className,
                  "hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                )}
              >
                {/* Blue arrow in top right corner */}
                <div className="absolute top-4 right-4 z-20">
                  <ArrowUpRight className="w-5 h-5 text-blue-500 transition-all duration-300 group-hover:text-blue-600" />
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
                    <CardDescription className="text-muted-foreground text-sm">
                      {product.descriptionKey ? intl.formatMessage({ id: product.descriptionKey }) : product.description || 'No description available'}
                    </CardDescription>
                  </CardContent>
                </div>
              </Card>
            </Link>
          );
        })}
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
