import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  id: string;
  title: ReactNode;
  href: string;
  description: string;
  icon: LucideIcon | (() => ReactNode);
  gradient: string;
  submenu?: NavigationSubItem[];
}

export interface NavigationSubItem {
  label: string;
  href: string;
  description: string;
  icon: LucideIcon | (() => ReactNode);
}

export function getNavigationItems(locale: string): NavigationItem[] {
  return [
    {
      id: 'home',
      title: 'Home', // Will be replaced with FormattedMessage in component
      href: `/${locale}/home`,
      description: 'ISSI homepage and overview',
      icon: () => null, // Will be replaced with ISSI logo in component
      gradient: 'radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, hsl(var(--primary) / 0.06) 50%, hsl(var(--primary) / 0) 100%)',
    },
    {
      id: 'services',
      title: 'Services',
      href: `/${locale}/services`,
      description: 'Comprehensive IT solutions and consulting',
      icon: () => null, // Will be replaced with Wrench icon in component
      gradient: 'radial-gradient(circle, hsl(var(--secondary) / 0.15) 0%, hsl(var(--secondary) / 0.06) 50%, hsl(var(--secondary) / 0) 100%)',
    },
    {
      id: 'products',
      title: 'Products',
      href: `/${locale}/products`,
      description: 'Custom software and platform solutions',
      icon: () => null, // Will be replaced with Package icon in component
      gradient: 'radial-gradient(circle, hsl(var(--accent) / 0.15) 0%, hsl(var(--accent) / 0.06) 50%, hsl(var(--accent) / 0) 100%)',
    },
    {
      id: 'government',
      title: 'Government',
      href: `/${locale}/government`,
      description: 'Government sector solutions',
      icon: () => null, // Will be replaced with Building2 icon in component
      gradient: 'radial-gradient(circle, hsl(var(--chart-2) / 0.15) 0%, hsl(var(--chart-2) / 0.06) 50%, hsl(var(--chart-2) / 0) 100%)',
    },
    {
      id: 'eLearning',
      title: 'eLearning',
      href: `/${locale}/eLearning`,
      description: 'Educational technology and training',
      icon: () => null, // Will be replaced with GraduationCap icon in component
      gradient: 'radial-gradient(circle, hsl(var(--chart-3) / 0.15) 0%, hsl(var(--chart-3) / 0.06) 50%, hsl(var(--chart-3) / 0) 100%)',
    },
    {
      id: 'compliance',
      title: 'Compliance',
      href: `/${locale}/compliance`,
      description: 'Industry standards and certifications',
      icon: () => null, // Will be replaced with ShieldCheck icon in component
      gradient: 'radial-gradient(circle, hsl(var(--chart-4) / 0.15) 0%, hsl(var(--chart-4) / 0.06) 50%, hsl(var(--chart-4) / 0) 100%)',
      submenu: [
        {
          label: 'ISO 27001',
          href: `/${locale}/compliance/iso27001`,
          description: 'Information security management',
          icon: () => null, // Will be replaced with ShieldCheck icon in component
        },
        {
          label: 'ISO 9001',
          href: `/${locale}/compliance/iso9001`,
          description: 'Quality management systems',
          icon: () => null, // Will be replaced with ShieldCheck icon in component
        },
        {
          label: 'MDOT',
          href: `/${locale}/compliance/mdot`,
          description: 'Michigan Department of Transportation certification',
          icon: () => null, // Will be replaced with MapPin icon in component
        },
        {
          label: 'CMMI Level 3',
          href: `/${locale}/compliance/cmmi3`,
          description: 'Capability Maturity Model Integration',
          icon: () => null, // Will be replaced with Award icon in component
        },
      ],
    },
    {
      id: 'careers',
      title: 'Careers',
      href: `/${locale}/careers`,
      description: 'Join our team and explore opportunities',
      icon: () => null, // Will be replaced with Briefcase icon in component
      gradient: 'radial-gradient(circle, hsl(var(--chart-1) / 0.15) 0%, hsl(var(--chart-1) / 0.06) 50%, hsl(var(--chart-1) / 0) 100%)',
    },
    {
      id: 'blog',
      title: 'Blog',
      href: `/${locale}/blog`,
      description: 'Insights and industry updates',
      icon: () => null, // Will be replaced with BookOpen icon in component
      gradient: 'radial-gradient(circle, hsl(var(--chart-6) / 0.15) 0%, hsl(var(--chart-6) / 0.06) 50%, hsl(var(--chart-6) / 0) 100%)',
    },
    {
      id: 'about',
      title: 'About',
      href: `/${locale}/about`,
      description: 'Learn about ISSI and our mission',
      icon: () => null, // Will be replaced with User icon in component
      gradient: 'radial-gradient(circle, hsl(var(--chart-5) / 0.15) 0%, hsl(var(--chart-5) / 0.06) 50%, hsl(var(--chart-5) / 0) 100%)',
    },
    {
      id: 'contact',
      title: 'Contact',
      href: `/${locale}/contact`,
      description: 'Get in touch with our team',
      icon: () => null, // Will be replaced with Phone icon in component
      gradient: 'radial-gradient(circle, hsl(var(--destructive) / 0.15) 0%, hsl(var(--destructive) / 0.06) 50%, hsl(var(--destructive) / 0) 100%)',
    },
  ];
}