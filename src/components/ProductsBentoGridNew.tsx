'use client';

import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { Button } from '@/components/ui/button';
import {
  BarChart3,
  Bug,
  Building,
  CheckSquare,
  ChevronRight,
  Clock,
  Cloud,
  Code,
  Database,
  FileSpreadsheet,
  FileText,
  HandCoins,
  MessageSquare,
  Shield,
  TrendingUp,
  UserCheck,
  Users
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

interface Product {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  className: string;
  href: string;
}

interface Filter {
  id: string;
  label: string;
}

const ProductsBentoGrid = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Product data following Services page pattern
  const products: Product[] = useMemo(() => [
    {
      id: 'gms',
      title: 'Grant Management System',
      description: 'Comprehensive solution to standardize, streamline, and automate the complete grant lifecycle from application to post-award activities.',
      icon: <HandCoins className="size-8 text-primary" />,
      category: 'featured',
      className: 'md:col-span-2',
      href: '#'
    },
    {
      id: 'ects',
      title: 'Enterprise Complaint Tracking System',
      description: 'User-friendly platform for processing consumer complaints securely and efficiently with automated workflows.',
      icon: <MessageSquare className="size-8 text-primary" />,
      category: 'featured',
      className: 'md:col-span-1',
      href: '#'
    },
    {
      id: 'ets',
      title: 'ePermitting System',
      description: 'Streamline environmental tracking, permit issuance, and compliance with federal regulations.',
      icon: <FileText className="size-8 text-secondary" />,
      category: 'featured',
      className: 'md:col-span-1',
      href: '#'
    },
    {
      id: 'mdsps',
      title: 'Membership Database and Subsidy Payment System',
      description: 'All-in-one cloud solution for government-assisted payment processing and member enrollment.',
      icon: <Database className="size-8 text-accent" />,
      category: 'featured',
      className: 'md:col-span-2',
      href: '#'
    },
    {
      id: 'enterprise-engineering',
      title: 'Enterprise Software Engineering',
      description: 'Full-stack development services including business analysis, design, development, and mobile applications.',
      icon: <Building className="size-8 text-muted-foreground" />,
      category: 'enterprise',
      className: 'md:col-span-2',
      href: '#'
    },
    {
      id: 'it-modernization',
      title: 'IT Modernization',
      description: 'Modernize legacy systems with cloud computing, data analytics, and business intelligence solutions.',
      icon: <Cloud className="size-8 text-secondary" />,
      category: 'enterprise',
      className: 'md:col-span-1',
      href: '#'
    },
    {
      id: 'hr-manager',
      title: 'Human Resource Manager',
      description: 'Complete HR solution for hiring, compensation, training, and employee management.',
      icon: <Users className="size-8 text-accent" />,
      category: 'hr',
      className: 'md:col-span-1',
      href: '#'
    },
    {
      id: 'employee-performance',
      title: 'Employee Performance Management',
      description: '360-degree feedback system with automated performance reviews and goal tracking.',
      icon: <TrendingUp className="size-8 text-primary" />,
      category: 'hr',
      className: 'md:col-span-1',
      href: '#'
    },
    {
      id: 'timesheet',
      title: 'Timesheet Management',
      description: 'Track project time, manage resources, and generate accurate invoices with real-time reporting.',
      icon: <Clock className="size-8 text-primary" />,
      category: 'hr',
      className: 'md:col-span-1',
      href: '#'
    },
    {
      id: 'project-suite',
      title: 'Project Management Suite',
      description: 'Complete project lifecycle management with task tracking, resource allocation, and agile methodologies support.',
      icon: <CheckSquare className="size-8 text-secondary" />,
      category: 'project',
      className: 'md:col-span-2',
      href: '#'
    },
    {
      id: 'bug-tracking',
      title: 'Bug Tracking System',
      description: 'Robust defect tracking system with automated duplicate detection and workflow management.',
      icon: <Bug className="size-8 text-destructive" />,
      category: 'project',
      className: 'md:col-span-1',
      href: '#'
    },
    {
      id: 'compliance-508',
      title: '508 Compliance',
      description: 'Specialized accessibility consulting, assessment, and testing for federal compliance requirements.',
      icon: <Shield className="size-8 text-primary" />,
      category: 'compliance',
      className: 'md:col-span-1',
      href: '#'
    },
    {
      id: 'audit-reporting',
      title: 'Audit Reporting',
      description: 'Streamlined audit management with workflow automation and collaborative reporting features.',
      icon: <FileSpreadsheet className="size-8 text-chart-4" />,
      category: 'compliance',
      className: 'md:col-span-1',
      href: '#'
    },
    {
      id: 'central-data',
      title: 'Central Data Management',
      description: 'Unified platform for managing clients, projects, and tasks with analytics and reporting capabilities.',
      icon: <Database className="size-8 text-accent" />,
      category: 'data',
      className: 'md:col-span-1',
      href: '#'
    },
    {
      id: 'e-survey',
      title: 'E-Survey Platform',
      description: 'Create, distribute, and analyze surveys with real-time response tracking and reporting.',
      icon: <BarChart3 className="size-8 text-chart-2" />,
      category: 'data',
      className: 'md:col-span-1',
      href: '#'
    },
    {
      id: 'i-code',
      title: 'I-Code Testing Platform',
      description: 'Web-based testing solution for secure assessment environments with comprehensive reporting.',
      icon: <Code className="size-8 text-chart-1" />,
      category: 'modernization',
      className: 'md:col-span-1',
      href: '#'
    },
    {
      id: 'professional-mgmt',
      title: 'Professional Management',
      description: 'Comprehensive recruitment and staffing solution with resume tracking and onboarding automation.',
      icon: <UserCheck className="size-8 text-chart-5" />,
      category: 'modernization',
      className: 'md:col-span-1',
      href: '#'
    }
  ], []);

  const filters: Filter[] = useMemo(
    () => [
      { id: 'all', label: 'All Products' },
      { id: 'featured', label: 'Featured' },
      { id: 'enterprise', label: 'Enterprise' },
      { id: 'compliance', label: 'Compliance' },
      { id: 'hr', label: 'Human Resources' },
      { id: 'project', label: 'Project Management' },
      { id: 'data', label: 'Data Management' },
      { id: 'modernization', label: 'Modernization' }
    ],
    []
  );

  const _categories = useMemo(() => ["all", ...Array.from(new Set(products.map((p) => p.category)))], [products]);

  const filteredProducts = useMemo(() => {
    return activeFilter === 'all' ? products : products.filter((product) => product.category === activeFilter);
  }, [activeFilter, products]);

  return (
    <section className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-left mb-16">
          <h1 className="text-foreground sm:text-4xl mb-4">
            Products & Software Solutions
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mb-8">
            Comprehensive suite of enterprise solutions designed to streamline your business operations and drive digital transformation.
            Trusted by government agencies and enterprises for over 30 years.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 bg-muted rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">30+</div>
              <div className="">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">40+</div>
              <div className="">Software Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">CMMI 3</div>
              <div className="">Level Certified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">ISO</div>
              <div className="">9001:2015 Certified</div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-start gap-2 mb-8">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                variant={activeFilter === filter.id ? "default" : "secondary"}
                size="sm"
                className="rounded-full"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Bento Grid Layout */}
        {isLoaded && (
          <BentoGrid className="mx-auto">
            {filteredProducts.map((product) => (
              <BentoGridItem
                key={product.id}
                title={product.title}
                description={product.description}
                icon={product.icon}
                className={product.className}
                href={product.href}
              />
            ))}
          </BentoGrid>
        )}

        {/* View All Products Link */}
        <div className="text-left mt-12">
          <Button
            variant="link"
            rightIcon={<ChevronRight className="h-4 w-4" />}
            className="p-0 h-auto font-medium"
          >
            View all products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductsBentoGrid;

