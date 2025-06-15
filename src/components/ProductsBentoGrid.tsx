"use client";

import { BentoGrid } from "@/components/ui/bento-grid";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  FaBookOpen,
  FaBox,
  FaBug,
  FaCalendarAlt,
  FaChartLine,
  FaClock,
  FaCode,
  FaComments,
  FaDatabase,
  FaDollarSign,
  FaFileAlt,
  FaFileContract,
  FaFileInvoice,
  FaGraduationCap,
  FaHandHoldingUsd,
  FaHandshake,
  FaIdCard,
  FaListAlt,
  FaPoll,
  FaProjectDiagram,
  FaRocket,
  FaSearch,
  FaTasks,
  FaUserCheck,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";
import { useIntl } from "react-intl";

interface Product {
  id: string;
  title?: string;
  titleKey?: string;
  description?: string;
  descriptionKey?: string;
  icon: any;
  category: string;
  tags: string[];
  size: { width: number; height: number };
  className: string;
  priority: number;
}

interface ProductsBentoGridProps {
  lang: string;
}

// Complete product data from source code with varied bento sizes
const allProducts = [
  // Featured Products (4 items) - Prominent sizes
  {
    id: "gms",
    titleKey: "products.gms.title",
    descriptionKey: "products.gms.description",
    icon: FaHandHoldingUsd,
    category: "featured",
    tags: ["Cloud-Based", "Workflow Automation", "Real-time Tracking"],
    size: { width: 2, height: 1 }, // Wide card
    className: "col-span-2",
    priority: 1,
  },
  {
    id: "ects",
    titleKey: "products.ects.title",
    descriptionKey: "products.ects.description",
    icon: FaComments,
    category: "featured",
    tags: ["Secure Portal", "Document Management"],
    size: { width: 2, height: 1 }, // Wide card
    className: "col-span-2",
    priority: 2,
  },
  {
    id: "ets",
    titleKey: "products.ets.title",
    descriptionKey: "products.ets.description",
    icon: FaFileContract,
    category: "featured",
    tags: ["GIS Integration", "Mobile Responsive"],
    size: { width: 1, height: 1 }, // Standard card
    className: "col-span-1",
    priority: 3,
  },
  {
    id: "mdsps",
    titleKey: "products.mdsps.title",
    descriptionKey: "products.mdsps.description",
    icon: FaDatabase,
    category: "featured",
    tags: ["End-to-end Solution", "GAAP Compliance"],
    size: { width: 2, height: 1 }, // Wide card
    className: "col-span-2",
    priority: 4,
  },

  // Project Management (6 items) - Mixed sizes
  {
    id: "project-management",
    titleKey: "products.project-management.title",
    descriptionKey: "products.project-management.description",
    icon: FaTasks,
    category: "project",
    tags: ["Client Tracking", "Resource Management", "Portfolio Analysis"],
    size: { width: 1, height: 1 }, // Standard card
    className: "col-span-1",
    priority: 5,
  },
  {
    id: "bug-tracking",
    titleKey: "products.bug-tracking.title",
    descriptionKey: "products.bug-tracking.description",
    icon: FaBug,
    category: "project",
    tags: ["Auto Detection", "Custom Workflows"],
    size: { width: 1, height: 1 }, // Standard card
    className: "col-span-1",
    priority: 6,
  },
  {
    id: "capture-manager",
    titleKey: "products.capture-manager.title",
    descriptionKey: "products.capture-manager.description",
    icon: FaSearch,
    category: "project",
    tags: ["Opportunity Tracking", "Bid Statistics"],
    size: { width: 1, height: 1 }, // Standard card
    className: "col-span-1",
    priority: 7,
  },
  {
    id: "prudent-agile",
    titleKey: "products.prudent-agile.title",
    descriptionKey: "products.prudent-agile.description",
    icon: FaRocket,
    category: "project",
    tags: ["Scrum Support", "Kanban", "Team Management"],
    size: { width: 2, height: 1 }, // Wide card
    className: "col-span-2",
    priority: 8,
  },
  {
    id: "task-management",
    titleKey: "products.task-management.title",
    descriptionKey: "products.task-management.description",
    icon: FaListAlt,
    category: "project",
    tags: ["Real-time Collaboration", "Progress Tracking"],
    size: { width: 2, height: 1 }, // Wide card
    className: "col-span-2",
    priority: 9,
  },
  {
    id: "requirements-management",
    titleKey: "products.requirements-management.title",
    descriptionKey: "products.requirements-management.description",
    icon: FaProjectDiagram,
    category: "project",
    tags: ["Requirements Traceability", "Change Control"],
    size: { width: 1, height: 1 }, // Standard card
    className: "col-span-1",
    priority: 30,
  },

  // HR Solutions (8 items) - Varied sizes
  {
    id: "hr-manager",
    titleKey: "products.hr-manager.title",
    descriptionKey: "products.hr-manager.description",
    icon: FaUsers,
    category: "hr",
    tags: ["Hiring Process", "Training Tracking"],
    size: { width: 1, height: 1 }, // Standard card
    className: "col-span-1",
    priority: 10,
  },
  {
    id: "employee-performance",
    title: "Employee Performance",
    description: "360-degree feedback system with automated performance reviews and goal tracking.",
    icon: FaChartLine,
    category: "hr",
    tags: ["360 Feedback", "Goal Tracking"],
    size: { width: 1, height: 1 }, // Standard card
    className: "col-span-1",
    priority: 11,
  },
  {
    id: "timesheet-management",
    title: "Timesheet Management",
    description: "Track project time, manage resources, and generate accurate invoices with real-time reporting.",
    icon: FaClock,
    category: "hr",
    tags: ["Real-time Tracking", "Project Reports"],
    size: { width: 1, height: 1 }, // Standard card (varied size)
    className: "col-span-1",
    priority: 12,
  },
  {
    id: "employee-talent-repository",
    title: "Employee Talent Repository",
    description: "Data repository coordinating recruitment and performance measurement activities.",
    icon: FaUserCheck,
    category: "hr",
    tags: ["Talent Tracking", "Skills Database"],
    size: { width: 1, height: 1 }, // Standard card
    className: "col-span-1",
    priority: 13,
  },
  {
    id: "competency-skills-matrix",
    title: "Competency Skills Matrix",
    description: "Track and manage employee skills and competencies across the organization.",
    icon: FaGraduationCap,
    category: "hr",
    tags: ["Skills Tracking", "Team Building"],
    size: { width: 2, height: 1 }, // Wide (increased from 1x1)
    className: "col-span-1",
    priority: 14,
  },
  {
    id: "training-dashboard",
    title: "Training Dashboard",
    description: "All-in-one platform to view available employee training and manage training portfolios.",
    icon: FaBookOpen,
    category: "hr",
    tags: ["Course Management", "Training Tracking"],
    size: { width: 1, height: 1 }, // Standard card
    className: "col-span-1",
    priority: 15,
  },
  {
    id: "i-learn",
    title: "I-Learn",
    description: "Easy-to-use course registration and management system with automated capabilities.",
    icon: FaGraduationCap,
    category: "hr",
    tags: ["Course Registration", "Learning Management"],
    size: { width: 1, height: 1 }, // Standard card
    className: "col-span-1",
    priority: 16,
  },
  {
    id: "rsvp",
    title: "RSVP",
    description: "Event planning system for invitations, tracking attendance, and managing events.",
    icon: FaHandshake,
    category: "hr",
    tags: ["Event Planning", "Invitation Management"],
    size: { width: 2, height: 1 }, // Wide (increased from 1x1)
    className: "col-span-2",
    priority: 17,
  },

  // Compliance (4 items) - Mixed sizes
  {
    id: "audit-reporting",
    title: "Audit Reporting",
    description: "Streamlined audit management with workflow automation and collaborative reporting features.",
    icon: FaFileInvoice,
    category: "compliance",
    tags: ["Workflow Driven", "Collaboration Tools"],
    size: { width: 1, height: 1 }, // Standard card
    className: "col-span-1",
    priority: 18,
  },
  {
    id: "expense-tracking",
    title: "Expense Tracking",
    description: "User-friendly portal for tracking and managing official expenses and travel reimbursements.",
    icon: FaDollarSign,
    category: "compliance",
    tags: ["Travel Expenses", "Reimbursement"],
    size: { width: 1, height: 1 }, // Standard card
    className: "col-span-1",
    priority: 19,
  },
  {
    id: "meeting-minutes-manager",
    title: "Meeting Minutes Manager",
    description: "Organize meeting minutes, agendas, action items, and decisions in one central location.",
    icon: FaCalendarAlt,
    category: "compliance",
    tags: ["Meeting Management", "Action Items"],
    size: { width: 2, height: 1 }, // Wide
    className: "col-span-1",
    priority: 20,
  },
  {
    id: "training-records",
    title: "Training Records",
    description: "Training request, registration, and tracking system with LMS integration.",
    icon: FaFileAlt,
    category: "compliance",
    tags: ["Training Requests", "LMS Integration"],
    size: { width: 1, height: 1 }, // Standard card
    className: "col-span-1",
    priority: 21,
  },

  // Data Management (3 items) - Balanced sizes
  {
    id: "central-data",
    title: "Central Data",
    description: "Interface for managing inventory of clients, projects and tasks with analytics and reports.",
    icon: FaDatabase,
    category: "data",
    tags: ["Analytics Dashboard", "Data Integration"],
    size: { width: 1, height: 1 }, // Standard card
    className: "col-span-1",
    priority: 22,
  },
  {
    id: "e-survey",
    title: "E-Survey",
    description: "Create, distribute, and analyze surveys with real-time response tracking and reporting.",
    icon: FaPoll,
    category: "data",
    tags: ["Real-time Analytics", "Custom Questions"],
    size: { width: 2, height: 1 }, // Wide
    className: "col-span-2",
    priority: 23,
  },
  {
    id: "form-management",
    title: "Form Management",
    description: "Administration of electronic and paper-based information captured across the organization.",
    icon: FaFileAlt,
    category: "data",
    tags: ["Electronic Forms", "Workflow Management"],
    size: { width: 1, height: 1 }, // Standard card
    className: "col-span-1",
    priority: 24,
  },

  // Modernization (3 items) - Featured sizes
  {
    id: "i-code",
    title: "I-Code",
    description: "Web-based testing solution for secure assessment environments with comprehensive reporting.",
    icon: FaCode,
    category: "modernization",
    tags: ["Secure Testing", "Real-time Reports"],
    size: { width: 1, height: 1 }, // Standard card
    className: "col-span-1",
    priority: 25,
  },
  {
    id: "professional-management",
    title: "Professional Management",
    description: "Comprehensive recruitment and staffing solution with resume tracking and onboarding.",
    icon: FaUserTie,
    category: "modernization",
    tags: ["Resume Tracking", "Onboarding"],
    size: { width: 2, height: 1 }, // Wide
    className: "col-span-2",
    priority: 26,
  },
  {
    id: "complaint-tracking",
    title: "Complaint Tracking",
    description: "User-friendly solution that seamlessly automates your complaint workflow process.",
    icon: FaComments,
    category: "modernization",
    tags: ["Workflow Automation", "Case Management"],
    size: { width: 1, height: 1 }, // Standard card
    className: "col-span-1",
    priority: 27,
  },

  // Technology (2 items) - Supporting sizes
  {
    id: "inventory-asset-tracking",
    title: "Inventory Asset Tracking",
    description: "Track company assets, reduce unnecessary purchasing, and maintain software licenses.",
    icon: FaBox,
    category: "technology",
    tags: ["Asset Management", "License Tracking"],
    size: { width: 2, height: 1 }, // Wide
    className: "col-span-2",
    priority: 28,
  },
  {
    id: "visitor-log",
    title: "Visitor Log",
    description: "Effective tool for organizations to keep track of visitors entering your establishment.",
    icon: FaIdCard,
    category: "technology",
    tags: ["Visitor Management", "Security Tracking"],
    size: { width: 2, height: 1 }, // Wide card
    className: "col-span-2",
    priority: 29,
  },
];

export default function ProductsBentoGrid({ lang }: ProductsBentoGridProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const intl = useIntl();

  // Get unique categories with proper display names
  const categoryMap = {
    All: intl.formatMessage({ id: "products.categories.all" }),
    featured: intl.formatMessage({ id: "products.categories.featured" }),
    project: intl.formatMessage({ id: "products.categories.project" }),
    hr: intl.formatMessage({ id: "products.categories.hr" }),
    compliance: intl.formatMessage({ id: "products.categories.compliance" }),
    data: intl.formatMessage({ id: "products.categories.data" }),
    modernization: intl.formatMessage({ id: "products.categories.modernization" }),
    technology: intl.formatMessage({ id: "products.categories.technology" }),
  };

  const categories = ["All", ...Array.from(new Set(allProducts.map((product) => product.category)))];

  // Filter products based on active filter
  const filteredProducts =
    activeFilter === "All" ? allProducts : allProducts.filter((product) => product.category === activeFilter);

  // Define alternating icon colors
  const iconColors = [
    "text-blue-600 dark:text-blue-400",
    "text-green-600 dark:text-green-400",
    "text-purple-600 dark:text-purple-400",
    "text-orange-600 dark:text-orange-400",
    "text-red-600 dark:text-red-400",
    "text-indigo-600 dark:text-indigo-400",
    "text-teal-600 dark:text-teal-400",
    "text-pink-600 dark:text-pink-400",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-start gap-2 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={cn(
              "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300",
              "border border-gray-200 dark:border-gray-700",
              "hover:border-blue-500 dark:hover:border-blue-400",
              activeFilter === category
                ? "bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            )}
          >
            {categoryMap[category as keyof typeof categoryMap] || category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <BentoGrid className="max-w-7xl mx-auto">
        {filteredProducts.map((product, index) => {
          const IconComponent = product.icon;
          const iconColorClass = iconColors[index % iconColors.length];
          return (
            <div
              key={product.id}
              className={cn(
                "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-300 shadow-input dark:shadow-none p-4 bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between overflow-hidden relative min-h-[200px] cursor-pointer",
                product.className
              )}
            >
              {/* Icon positioned at top-left */}
              <div className="flex justify-start">
                <IconComponent className={`text-3xl ${iconColorClass}`} />
              </div>

              {/* Text content positioned at bottom-left */}
              <div className="mt-auto">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 tracking-tight text-xl mb-2 group-hover/bento:text-indigo-500 transition duration-300">
                  {product.titleKey ? intl.formatMessage({ id: product.titleKey }) : product.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  {product.descriptionKey ? intl.formatMessage({ id: product.descriptionKey }) : product.description}
                </p>
              </div>
            </div>
          );
        })}
      </BentoGrid>
    </div>
  );
}
