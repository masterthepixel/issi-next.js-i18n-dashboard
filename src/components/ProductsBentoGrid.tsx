'use client';

import { useState, useEffect, useMemo } from 'react';
import '../styles/products.css';
import { 
  FaHandHoldingUsd, 
  FaComments, 
  FaFileContract, 
  FaBuilding, 
  FaCloud, 
  FaUsers, 
  FaChartLine, 
  FaClock, 
  FaTasks, 
  FaBug, 
  FaShieldAlt, 
  FaFileInvoice, 
  FaDatabase, 
  FaPoll, 
  FaCode, 
  FaUserTie,
  FaArrowRight,
  FaPlay
} from 'react-icons/fa';

interface Product {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  tags: string[];
  size: { width: number; height: number };
  priority: number;
}

interface Filter {
  id: string;
  label: string;
}

const ProductsBentoGrid = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Product data with intelligent sizing - memoized to prevent recreating on every render
  const products: Product[] = useMemo(() => [
    {
      id: 'gms',
      title: 'Grant Management System',
      description: 'Comprehensive solution to standardize, streamline, and automate the complete grant lifecycle from application to post-award activities.',
      icon: FaHandHoldingUsd,
      category: 'featured',
      tags: ['Cloud-Based', 'Workflow Automation', 'Real-time Tracking'],
      size: { width: 2, height: 1 }, // Large card for featured
      priority: 1
    },
    {
      id: 'ects',
      title: 'Enterprise Complaint Tracking System',
      description: 'User-friendly platform for processing consumer complaints securely and efficiently with automated workflows.',
      icon: FaComments,
      category: 'featured',
      tags: ['Secure Portal', 'Document Management'],
      size: { width: 2, height: 1 }, // Wide for long title
      priority: 2
    },
    {
      id: 'ets',
      title: 'ePermitting System',
      description: 'Streamline environmental tracking, permit issuance, and compliance with federal regulations.',
      icon: FaFileContract,
      category: 'featured',
      tags: ['GIS Integration', 'Mobile Responsive'],
      size: { width: 1, height: 1 },
      priority: 3
    },
    {
      id: 'mdsps',
      title: 'Membership Database and Subsidy Payment System',
      description: 'All-in-one cloud solution for government-assisted payment processing and member enrollment.',
      icon: FaDatabase,
      category: 'featured',
      tags: ['End-to-end Solution', 'GAAP Compliance'],
      size: { width: 2, height: 1 }, // Extra wide for very long title
      priority: 4
    },
    {
      id: 'enterprise-engineering',
      title: 'Enterprise Software Engineering',
      description: 'Full-stack development services including business analysis, design, development, and mobile applications.',
      icon: FaBuilding,
      category: 'enterprise',
      tags: ['Web Development', 'Mobile Apps', 'Configuration Management'],
      size: { width: 2, height: 2 }, // Tall card for detailed content
      priority: 5
    },
    {
      id: 'it-modernization',
      title: 'IT Modernization',
      description: 'Modernize legacy systems with cloud computing, data analytics, and business intelligence solutions.',
      icon: FaCloud,
      category: 'enterprise',
      tags: ['Cloud Migration', 'Data Analytics'],
      size: { width: 1, height: 1 },
      priority: 6
    },
    {
      id: 'hr-manager',
      title: 'Human Resource Manager',
      description: 'Complete HR solution for hiring, compensation, training, and employee management.',
      icon: FaUsers,
      category: 'hr',
      tags: ['Hiring Process', 'Training Tracking'],
      size: { width: 1, height: 1 },
      priority: 7
    },
    {
      id: 'employee-performance',
      title: 'Employee Performance Management',
      description: '360-degree feedback system with automated performance reviews and goal tracking.',
      icon: FaChartLine,
      category: 'hr',
      tags: ['360 Feedback', 'Goal Tracking'],
      size: { width: 2, height: 1 }, // Wide for long title
      priority: 8
    },
    {
      id: 'timesheet',
      title: 'Timesheet Management',
      description: 'Track project time, manage resources, and generate accurate invoices with real-time reporting.',
      icon: FaClock,
      category: 'hr',
      tags: ['Real-time Tracking', 'Project Reports'],
      size: { width: 1, height: 1 },
      priority: 9
    },
    {
      id: 'project-suite',
      title: 'Project Management Suite',
      description: 'Complete project lifecycle management with task tracking, resource allocation, and agile methodologies support.',
      icon: FaTasks,
      category: 'project',
      tags: ['Agile Support', 'Resource Management', 'PMBOK Standards'],
      size: { width: 2, height: 2 }, // Large featured card
      priority: 10
    },
    {
      id: 'bug-tracking',
      title: 'Bug Tracking System',
      description: 'Robust defect tracking system with automated duplicate detection and workflow management.',
      icon: FaBug,
      category: 'project',
      tags: ['Auto Detection', 'Custom Workflows'],
      size: { width: 1, height: 1 },
      priority: 11
    },
    {
      id: 'compliance-508',
      title: '508 Compliance',
      description: 'Specialized accessibility consulting, assessment, and testing for federal compliance requirements.',
      icon: FaShieldAlt,
      category: 'compliance',
      tags: ['Accessibility Testing', 'Federal Standards'],
      size: { width: 1, height: 1 },
      priority: 12
    },
    {
      id: 'audit-reporting',
      title: 'Audit Reporting',
      description: 'Streamlined audit management with workflow automation and collaborative reporting features.',
      icon: FaFileInvoice,
      category: 'compliance',
      tags: ['Workflow Driven', 'Collaboration Tools'],
      size: { width: 1, height: 1 },
      priority: 13
    },
    {
      id: 'central-data',
      title: 'Central Data Management',
      description: 'Unified platform for managing clients, projects, and tasks with analytics and reporting capabilities.',
      icon: FaDatabase,
      category: 'data',
      tags: ['Analytics Dashboard', 'Data Integration'],
      size: { width: 1, height: 1 },
      priority: 14
    },
    {
      id: 'e-survey',
      title: 'E-Survey Platform',
      description: 'Create, distribute, and analyze surveys with real-time response tracking and reporting.',
      icon: FaPoll,
      category: 'data',
      tags: ['Real-time Analytics', 'Custom Questions'],
      size: { width: 1, height: 1 },
      priority: 15
    },
    {
      id: 'i-code',
      title: 'I-Code Testing Platform',
      description: 'Web-based testing solution for secure assessment environments with comprehensive reporting.',
      icon: FaCode,
      category: 'modernization',
      tags: ['Secure Testing', 'Real-time Reports'],
      size: { width: 1, height: 1 },
      priority: 16
    },
    {
      id: 'professional-mgmt',      title: 'Professional Management',
      description: 'Comprehensive recruitment and staffing solution with resume tracking and onboarding automation.',
      icon: FaUserTie,
      category: 'modernization',
      tags: ['Resume Tracking', 'Onboarding'],
      size: { width: 1, height: 1 },
      priority: 17
    }
  ], []); // Empty dependency array since this data is static

  const filters: Filter[] = [
    { id: 'all', label: 'All Solutions' },
    { id: 'featured', label: 'Featured' },
    { id: 'enterprise', label: 'Enterprise' },
    { id: 'compliance', label: 'Compliance' },
    { id: 'hr', label: 'Human Resources' },
    { id: 'project', label: 'Project Management' },
    { id: 'data', label: 'Data Management' },
    { id: 'modernization', label: 'Modernization' }
  ];

  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === activeFilter));
    }
  }, [activeFilter, products]);

  const ProductCard = ({ product }: { product: Product }) => {
    const IconComponent = product.icon;
      return (
      <div 
        className={`product-card ${product.category} ${product.size.width > 1 ? 'wide' : ''} ${product.size.height > 1 ? 'tall' : ''}`}
        data-width={product.size.width}
        data-height={product.size.height}
      >
        <div className="card-image">
          <IconComponent className="card-icon" />
        </div>
        <div className="card-content">
          <h3 className="card-title">{product.title}</h3>
          <p className="card-description">{product.description}</p>
          <div className="card-features">
            {product.tags.map((tag, index) => (
              <span key={index} className="feature-tag">{tag}</span>
            ))}
          </div>
          <div className="card-actions">
            <button className="btn-primary">
              Learn More <FaArrowRight className="ml-2" />
            </button>
            {product.category === 'featured' && (
              <button className="btn-secondary">
                <FaPlay className="mr-2" /> Demo
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="products-container">
      <div className="header">
        <h1 className="products-title">Products & Services</h1>
        <p className="products-subtitle">
          Comprehensive suite of enterprise solutions designed to streamline your business operations and drive digital transformation
        </p>
      </div>

      <div className="stats-banner">
        <h3 className="stats-title">Why Choose ISSI?</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">30+</span>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-item">
            <span className="stat-number">40+</span>
            <div className="stat-label">Software Products</div>
          </div>
          <div className="stat-item">
            <span className="stat-number">CMMI 3</span>
            <div className="stat-label">Level Certified</div>
          </div>
          <div className="stat-item">
            <span className="stat-number">ISO</span>
            <div className="stat-label">9001:2015 Certified</div>
          </div>
        </div>
      </div>

      <div className="filter-container">
        {filters.map(filter => (
          <button
            key={filter.id}
            className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="bento-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsBentoGrid;
