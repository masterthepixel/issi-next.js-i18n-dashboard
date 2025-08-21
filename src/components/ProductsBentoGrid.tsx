"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { allProducts } from "@/data/products";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
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
  const [activeFilter, setActiveFilter] = useState("all");
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
    return activeFilter === "all" ? allProducts : allProducts.filter((product) => product.category === activeFilter);
  }, [activeFilter]);

  const cardVariants = cva(
    "flex flex-col h-full space-y-2 overflow-hidden transition-all duration-300",
    {
      variants: {
        category: {
          featured: "border-chart-1/50 hover:border-chart-1 hover:shadow-chart-1/20 hover:[box-shadow:0_0_30px_-5px_hsl(var(--chart-1))]",
          project: "border-chart-2/50 hover:border-chart-2 hover:shadow-chart-2/20 hover:[box-shadow:0_0_30px_-5px_hsl(var(--chart-2))]",
          hr: "border-chart-3/50 hover:border-chart-3 hover:shadow-chart-3/20 hover:[box-shadow:0_0_30px_-5px_hsl(var(--chart-3))]",
          compliance: "border-chart-4/50 hover:border-chart-4 hover:shadow-chart-4/20 hover:[box-shadow:0_0_30px_-5px_hsl(var(--chart-4))]",
          data: "border-chart-5/50 hover:border-chart-5 hover:shadow-chart-5/20 hover:[box-shadow:0_0_30px_-5px_hsl(var(--chart-5))]",
          modernization: "border-primary/50 hover:border-primary hover:shadow-primary/20 hover:[box-shadow:0_0_30px_-5px_hsl(var(--primary))]",
          technology: "border-secondary/50 hover:border-secondary hover:shadow-secondary/20 hover:[box-shadow:0_0_30px_-5px_hsl(var(--secondary))]",
          all: "border-border hover:border-primary hover:shadow-lg",
        },
      },
      defaultVariants: {
        category: "all",
      },
    }
  );

  const iconVariants = cva("text-3xl transition-all duration-300 group-hover:drop-shadow-lg", {
    variants: {
      category: {
        featured: "text-chart-1",
        project: "text-chart-2",
        hr: "text-chart-3",
        compliance: "text-chart-4",
        data: "text-chart-5",
        modernization: "text-primary",
        technology: "text-secondary",
        all: "text-foreground",
      },
    },
    defaultVariants: {
      category: "all",
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Filter Tabs */}
      <ToggleGroup
        type="single"
        defaultValue="all"
        onValueChange={(value: string) => {
          if (value) setActiveFilter(value);
        }}
        className="flex flex-wrap justify-start gap-2 mb-12"
        role="tablist"
        aria-label="Product category filters"
      >
        {categories.map((category) => (
          <ToggleGroupItem
            key={category}
            value={category}
            id={`tab-${category}`}
            aria-controls={`products-list`}
            aria-labelledby={`tab-${category}`}
          >
            {categoryMap[category as keyof typeof categoryMap] || category}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      {/* Products Grid */}
      <div
        id="products-list"
        role="tabpanel"
        aria-labelledby={`tab-${activeFilter}`}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto auto-rows-min"
      >
        {filteredProducts.map((product, _index) => {
          const IconComponent = product.icon;
          const productSlug = getProductSlug(product.id);
          const productHref = `/${lang}/products/${productSlug}`;

          return (
            <Link href={productHref} key={product.id} className={cn("group", product.className)}>
              <Card
                className={cn(
                  cardVariants({ category: product.category as any })
                )}
              >
                <CardHeader>
                  <IconComponent className={cn(iconVariants({ category: product.category as any }))} />
                </CardHeader>
                <CardContent>
                  <CardTitle>{product.titleKey ? intl.formatMessage({ id: product.titleKey }) : product.title || 'Untitled'}</CardTitle>
                  <CardDescription>{product.descriptionKey ? intl.formatMessage({ id: product.descriptionKey }) : product.description || 'No description available'}</CardDescription>
                </CardContent>
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
