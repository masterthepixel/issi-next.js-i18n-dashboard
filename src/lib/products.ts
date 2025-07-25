import type { ProductDetail } from '@/types/product';
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

// Product data mapped from BentoGrid items
const products: ProductDetail[] = [
  // Featured Products
  {
    id: 'gms',
    slug: 'grant-management-system',
    name: 'Grant Management System',
    titleKey: 'products.gms.title',
    description: 'ISSI\'s GMS solution standardizes, streamlines, and automates the complete grant lifecycle—from application to post-award activities, built on a case management framework with configurable rules.',
    descriptionKey: 'products.gms.description',
    icon: FaHandHoldingUsd,
    category: 'featured',
    tags: ['Cloud-Based', 'Workflow Automation', 'Real-time Tracking', 'Case Management'],
    image: '/images/products/gmsproduct.png',
    features: [
      'Interactive Grant Dashboards with insightful, actionable data',
      'Powerful WYSIWYG editor for application management',
      'Configurable application questions and unlimited file size features',
      'Streamlined application process with automated evaluation',
      'Applicant history tracking and online submission facilitation',
      'Defined rules for applicant verification and risk assessment',
      'Automated data capture and validation',
      'Comprehensive reporting and analytics'
    ],
    benefits: [
      'Eliminate discrepancies in grant processing',
      'Reduce processing time significantly',
      'Enhanced operational efficiency',
      'Centralized grant lifecycle management',
      'Easy implementation with no server installation',
      'Reduced operational costs'
    ],
    specifications: {
      'Deployment': 'Cloud-based solution on AWS',
      'Installation': 'No software/server installation required',
      'Security': 'Enterprise-grade security and compliance',
      'File Management': 'Unlimited file size with flexible file type acceptance',
      'Dashboard': 'High-level overviews and granular data insights',
      'Workflow': 'Configurable rules and automated processes'
    },
    size: { width: 2, height: 1 },
    className: 'col-span-2',
    priority: 1,
  },
  {
    id: 'ects',
    slug: 'electronic-correspondence-tracking-system',
    name: 'Electronic Correspondence Tracking System',
    titleKey: 'products.ects.title',
    description: 'Secure portal for document management and correspondence tracking with advanced security features.',
    descriptionKey: 'products.ects.description',
    icon: FaComments,
    category: 'featured',
    tags: ['Secure Portal', 'Document Management'],
    features: [
      'Secure document portal',
      'Advanced search capabilities',
      'Automated routing and approval',
      'Audit trail tracking',
      'Digital signatures',
      'Multi-format document support'
    ],
    benefits: [
      'Eliminate paper-based processes',
      'Improve document security',
      'Accelerate approval workflows',
      'Maintain complete audit trails'
    ],
    specifications: {
      'Encryption': 'AES-256 encryption',
      'Authentication': 'Multi-factor authentication',
      'Compliance': 'FISMA, NIST compliant',
      'Storage': 'Unlimited cloud storage'
    },
    size: { width: 2, height: 1 },
    className: 'col-span-2',
    priority: 2,
  },
  {
    id: 'ets',
    slug: 'environmental-tracking-system',
    name: 'Environmental Tracking System',
    titleKey: 'products.ets.title',
    description: 'GIS-integrated environmental monitoring solution with mobile-responsive design for field operations.',
    descriptionKey: 'products.ets.description',
    icon: FaFileContract,
    category: 'featured',
    tags: ['GIS Integration', 'Mobile Responsive'],
    features: [
      'GIS mapping integration',
      'Mobile field data collection',
      'Environmental compliance tracking',
      'Real-time monitoring',
      'Automated reporting',
      'GPS coordinates tracking'
    ],
    benefits: [
      'Streamline environmental compliance',
      'Mobile field operations',
      'Real-time data collection',
      'Automated regulatory reporting'
    ],
    specifications: {
      'GIS Integration': 'ArcGIS, QGIS compatible',
      'Mobile Support': 'iOS, Android apps',
      'Data Standards': 'EPA reporting standards',
      'Connectivity': 'Offline data collection'
    },
    size: { width: 1, height: 1 },
    className: 'col-span-1',
    priority: 3,
  },
  {
    id: 'mdsps',
    slug: 'membership-database-subsidy-payment-system',
    name: 'Membership Database and Subsidy Payment System',
    titleKey: 'products.mdsps.title',
    description: 'All-in-one cloud-based solution that simplifies government-assisted payment processing with member enrollment and prescription drug subsidy payments.',
    descriptionKey: 'products.mdsps.description',
    icon: FaDatabase,
    category: 'featured',
    tags: ['Cloud-based Solution', 'Government Assistance', 'Payment Processing'],

    features: [
      'Automated end-to-end solution',
      'Membership eligibility determination',
      'Premium subsidy payment management',
      'Document and letter storage',
      'Audit log functionality',
      'CRM and CMS integration',
      'Mobile responsive design',
      'Call center support',
      'Billing and invoices',
      'Pre-defined and ad-hoc reports'
    ],
    benefits: [
      'Reduced administrative costs',
      'Eliminate duplicate subsidy payments',
      'GAAP compliance maintenance',
      'Streamlined application processing',
      'Enhanced member experience'
    ],
    specifications: {
      'Deployment': 'Cloud-based solution',
      'Compliance': 'GAAP, Agency regulations',
      'Integration': 'CRM tools, CMS platforms',
      'Reporting': 'Pre-defined and custom reports',
      'Support': 'Optional call center functionality'
    },
    size: { width: 2, height: 1 },
    className: 'col-span-2',
    priority: 4,
  },

  // Project Management Solutions
  {
    id: 'project-management',
    slug: 'project-management-suite',
    name: 'Project Management Suite (PIMS)',
    titleKey: 'products.project-management.title',
    description: 'Centralized project tracking system to effectively plan, organize, prioritize, manage resources, and analyze data for maximum organizational effectiveness.',
    descriptionKey: 'products.project-management.description',
    icon: FaTasks,
    category: 'project',
    tags: ['Project Tracking', 'Client Management', 'Resource Planning'],

    features: [
      'Centralized project and client data storage',
      'Detailed project profile management',
      'Technology and environment tracking',
      'Team collaboration and visibility',
      'Resource allocation and planning',
      'Client relationship management',
      'Project analytics and reporting',
      'Task and milestone tracking',
      'Document management system',
      'Time and expense tracking',
      'Risk assessment and management',
      'Performance metrics and KPIs'
    ],
    benefits: [
      'Increased team productivity',
      'Reduced project errors',
      'Better client expectation management',
      'Enhanced project visibility',
      'Improved resource utilization',
      'Streamlined project workflows'
    ],
    specifications: {
      'Data Management': 'Centralized project database',
      'Client Tracking': 'Complete client project history',
      'Technologies': 'Multi-environment support',
      'Collaboration': 'Real-time team visibility',
      'Analytics': 'Project performance analysis'
    },
    size: { width: 1, height: 1 },
    className: 'col-span-1',
    priority: 5,
  },
  {
    id: 'bug-tracking',
    slug: 'bug-tracking-system',
    name: 'Bug Tracking System',
    titleKey: 'products.bug-tracking.title',
    description: 'Robust, featureful, and mature defect-tracking system that allows development teams to keep track of outstanding bugs, problems, issues, enhancements, and other change requests effectively.',
    descriptionKey: 'products.bug-tracking.description',
    icon: FaBug,
    category: 'project',
    tags: ['Defect Tracking', 'Issue Management', 'Development Tools'],

    features: [
      'Centralized database for bug tracking',
      'Seamless workflow process',
      'Outstanding bugs and issues tracking',
      'Enhancement request management',
      'Change request tracking',
      'Integration with source code management',
      'Web-based and locally-installed options',
      'Priority and severity classification',
      'Automated notifications and alerts',
      'Comprehensive reporting and analytics',
      'Team collaboration tools',
      'Custom workflow configuration',
      'Development lifecycle integration'
    ],
    benefits: [
      'Centralized tracking in one place for simplicity',
      'Consistent workflow process for extreme efficiency',
      'Faster bug resolution and quality improvement',
      'Enhanced team collaboration and communication',
      'Streamlined development process'
    ],
    specifications: {
      'Database': 'Centralized defect tracking database',
      'Integration': 'Source code management systems',
      'Deployment': 'Web-based and local installation',
      'Workflow': 'Customizable bug tracking processes',
      'Analytics': 'Bug trend analysis and reporting'
    },
    size: { width: 1, height: 1 },
    className: 'col-span-1',
    priority: 6,
  },
  {
    id: 'capture-manager',
    slug: 'capture-manager',
    name: 'Capture Manager',
    titleKey: 'products.capture-manager.title',
    description: 'Business development tool for opportunity tracking with comprehensive bid statistics and analytics.',
    descriptionKey: 'products.capture-manager.description',
    icon: FaSearch,
    category: 'project',
    tags: ['Opportunity Tracking', 'Bid Statistics'],

    features: [
      'Opportunity pipeline management',
      'Bid/no-bid decision support',
      'Competitive intelligence',
      'Win/loss analysis',
      'Proposal tracking',
      'Revenue forecasting'
    ],
    benefits: [
      'Improve win rates',
      'Better opportunity qualification',
      'Competitive advantage',
      'Data-driven decisions'
    ],
    specifications: {
      'CRM Integration': 'Salesforce, HubSpot',
      'Analytics': 'Predictive win probability',
      'Collaboration': 'Team-based capture process',
      'Reporting': 'Executive dashboards'
    },
    size: { width: 1, height: 1 },
    className: 'col-span-1',
    priority: 7,
  },
  {
    id: 'prudent-agile',
    slug: 'prudent-agile-methodology',
    name: 'Prudent Agile Methodology',
    titleKey: 'products.prudent-agile.title',
    description: 'Agile project management platform with Scrum and Kanban support for effective team management.',
    descriptionKey: 'products.prudent-agile.description',
    icon: FaRocket,
    category: 'project',
    tags: ['Scrum Support', 'Kanban', 'Team Management'],

    features: [
      'Scrum framework implementation',
      'Kanban board visualization',
      'Sprint planning and tracking',
      'Velocity tracking',
      'Backlog management',
      'Team performance metrics'
    ],
    benefits: [
      'Accelerate delivery cycles',
      'Improve team productivity',
      'Better stakeholder visibility',
      'Continuous improvement'
    ],
    specifications: {
      'Frameworks': 'Scrum, Kanban, SAFe',
      'Integration': 'JIRA, Azure DevOps',
      'Metrics': 'Velocity, burndown charts',
      'Scaling': 'Enterprise-ready'
    },
    size: { width: 2, height: 1 },
    className: 'col-span-2',
    priority: 8,
  },
  {
    id: 'task-management',
    slug: 'task-management-system',
    name: 'Task Management System',
    titleKey: 'products.task-management.title',
    description: 'Real-time collaboration platform for task management with advanced progress tracking capabilities.',
    descriptionKey: 'products.task-management.description',
    icon: FaListAlt,
    category: 'project',
    tags: ['Real-time Collaboration', 'Progress Tracking'],

    features: [
      'Real-time task collaboration',
      'Progress tracking and reporting',
      'Dependency management',
      'Time tracking integration',
      'Mobile accessibility',
      'Automated notifications'
    ],
    benefits: [
      'Improve team coordination',
      'Better task visibility',
      'Streamlined workflows',
      'Enhanced productivity'
    ],
    specifications: {
      'Collaboration': 'Real-time updates',
      'Mobile Apps': 'iOS, Android',
      'Integration': 'Calendar, email systems',
      'Automation': 'Workflow automation'
    },
    size: { width: 2, height: 1 },
    className: 'col-span-2',
    priority: 9,
  },

  // Additional Project Management Solutions
  {
    id: 'requirements-management',
    slug: 'requirements-management-system',
    name: 'Requirements Management System',
    titleKey: 'products.requirements-management.title',
    description: 'Requirements traceability and change control system for comprehensive project management.',
    descriptionKey: 'products.requirements-management.description',
    icon: FaProjectDiagram,
    category: 'project',
    tags: ['Requirements Traceability', 'Change Control'],
    features: [
      'Requirements traceability matrix',
      'Change control workflow',
      'Impact analysis',
      'Version control',
      'Stakeholder approval process',
      'Compliance tracking'
    ],
    benefits: [
      'Better requirements management',
      'Reduced project risks',
      'Improved traceability',
      'Enhanced quality control'
    ],
    specifications: {
      'Methodology': 'BABOK, IIBA standards',
      'Integration': 'JIRA, Azure DevOps',
      'Collaboration': 'Multi-stakeholder reviews',
      'Reporting': 'Traceability reports'
    },
    size: { width: 1, height: 1 },
    className: 'col-span-1',
    priority: 10,
  },

  // HR Solutions
  {
    id: 'hr-manager',
    slug: 'hr-management-system',
    name: 'HR Management System',
    titleKey: 'products.hr-manager.title',
    description: 'Comprehensive HR solution for hiring process and training tracking with automated workflows.',
    descriptionKey: 'products.hr-manager.description',
    icon: FaUsers,
    category: 'hr',
    tags: ['Hiring Process', 'Training Tracking'],
    features: [
      'Employee lifecycle management',
      'Recruitment and onboarding',
      'Performance management',
      'Training coordination',
      'Benefits administration',
      'HR analytics dashboard'
    ],
    benefits: [
      'Streamlined HR processes',
      'Better employee experience',
      'Improved compliance',
      'Data-driven HR decisions'
    ],
    specifications: {
      'Integration': 'Payroll systems, ATS',
      'Compliance': 'EEOC, FMLA, ADA',
      'Security': 'PII data protection',
      'Reporting': 'HR metrics and KPIs'
    },
    size: { width: 1, height: 1 },
    className: 'col-span-1',
    priority: 11,
  },
  {
    id: 'employee-performance',
    slug: 'employee-performance-system',
    name: 'Employee Performance System',
    description: '360-degree feedback system with automated performance reviews and goal tracking.',
    icon: FaChartLine,
    category: 'hr',
    tags: ['360 Feedback', 'Goal Tracking'],
    features: [
      '360-degree feedback collection',
      'Goal setting and tracking',
      'Performance review automation',
      'Peer feedback management',
      'Development planning',
      'Performance analytics'
    ],
    benefits: [
      'Improved performance management',
      'Better employee development',
      'Enhanced feedback culture',
      'Data-driven evaluations'
    ],
    specifications: {
      'Feedback Types': '360, peer, self, manager',
      'Goal Framework': 'OKRs, SMART goals',
      'Analytics': 'Performance trending',
      'Integration': 'HR systems, calendar'
    },
    size: { width: 1, height: 2 },
    className: 'col-span-1 row-span-2',
    priority: 12,
  },
  {
    id: 'timesheet-management',
    slug: 'timesheet-management-system',
    name: 'Timesheet Management System',
    description: 'Track project time, manage resources, and generate accurate invoices with real-time reporting.',
    icon: FaClock,
    category: 'hr',
    tags: ['Real-time Tracking', 'Project Reports'],
    features: [
      'Time tracking and logging',
      'Project time allocation',
      'Resource management',
      'Invoice generation',
      'Real-time reporting',
      'Mobile time entry'
    ],
    benefits: [
      'Accurate time tracking',
      'Improved project billing',
      'Better resource utilization',
      'Streamlined invoicing'
    ],
    specifications: {
      'Tracking': 'Manual, automatic, mobile',
      'Integration': 'Project management, payroll',
      'Reporting': 'Time sheets, utilization',
      'Billing': 'Automated invoice generation'
    },
    size: { width: 1, height: 2 },
    className: 'col-span-1 row-span-2',
    priority: 13,
  },
  {
    id: 'employee-talent-repository',
    slug: 'employee-talent-repository',
    name: 'Employee Talent Repository',
    description: 'Data repository coordinating recruitment and performance measurement activities.',
    icon: FaUserCheck,
    category: 'hr',
    tags: ['Talent Tracking', 'Skills Database'],
    features: [
      'Skills and competency tracking',
      'Talent pipeline management',
      'Performance correlation',
      'Career development paths',
      'Succession planning',
      'Talent analytics'
    ],
    benefits: [
      'Better talent management',
      'Improved succession planning',
      'Skills gap analysis',
      'Enhanced career development'
    ],
    specifications: {
      'Database': 'Skills, certifications, performance',
      'Analytics': 'Talent insights, trends',
      'Integration': 'HR systems, learning platforms',
      'Reporting': 'Talent dashboards'
    },
    size: { width: 1, height: 2 },
    className: 'col-span-1 row-span-2',
    priority: 14,
  },
  {
    id: 'competency-skills-matrix',
    slug: 'competency-skills-matrix',
    name: 'Competency Skills Matrix',
    description: 'Track and manage employee skills and competencies across the organization.',
    icon: FaGraduationCap,
    category: 'hr',
    tags: ['Skills Tracking', 'Team Building'],
    features: [
      'Skills assessment and tracking',
      'Competency frameworks',
      'Gap analysis',
      'Team skills mapping',
      'Training recommendations',
      'Skills development planning'
    ],
    benefits: [
      'Better skills visibility',
      'Targeted training programs',
      'Improved team formation',
      'Strategic workforce planning'
    ],
    specifications: {
      'Framework': 'Custom competency models',
      'Assessment': 'Self, manager, peer evaluation',
      'Tracking': 'Skills progression over time',
      'Integration': 'Learning management systems'
    },
    size: { width: 1, height: 2 },
    className: 'col-span-1 row-span-2',
    priority: 15,
  },
  {
    id: 'training-dashboard',
    slug: 'training-dashboard',
    name: 'Training Dashboard',
    description: 'All-in-one platform to view available employee training and manage training portfolios.',
    icon: FaBookOpen,
    category: 'hr',
    tags: ['Course Management', 'Training Tracking'],
    features: [
      'Training catalog management',
      'Course scheduling',
      'Progress tracking',
      'Certification management',
      'Training analytics',
      'Resource allocation'
    ],
    benefits: [
      'Centralized training management',
      'Better training visibility',
      'Improved compliance tracking',
      'Enhanced learning outcomes'
    ],
    specifications: {
      'LMS Integration': 'Multiple platform support',
      'Tracking': 'Individual and team progress',
      'Reporting': 'Training metrics and ROI',
      'Compliance': 'Mandatory training tracking'
    },
    size: { width: 1, height: 1 },
    className: 'col-span-1',
    priority: 16,
  },
  {
    id: 'i-learn',
    slug: 'i-learn-system',
    name: 'I-Learn System',
    description: 'Easy-to-use course registration and management system with automated capabilities.',
    icon: FaGraduationCap,
    category: 'hr',
    tags: ['Course Registration', 'Learning Management'],
    features: [
      'Course registration portal',
      'Learning path management',
      'Automated enrollment',
      'Progress tracking',
      'Certificate generation',
      'Mobile learning support'
    ],
    benefits: [
      'Simplified course registration',
      'Automated learning workflows',
      'Better learning outcomes',
      'Mobile accessibility'
    ],
    specifications: {
      'Platform': 'Web and mobile apps',
      'Content': 'SCORM compliant',
      'Automation': 'Smart enrollment rules',
      'Integration': 'HR and payroll systems'
    },
    size: { width: 1, height: 1 },
    className: 'col-span-1',
    priority: 17,
  },
  {
    id: 'rsvp',
    slug: 'rsvp-event-management',
    name: 'RSVP Event Management',
    description: 'Event planning system for invitations, tracking attendance, and managing events.',
    icon: FaHandshake,
    category: 'hr',
    tags: ['Event Planning', 'Invitation Management'],
    features: [
      'Event creation and management',
      'RSVP tracking',
      'Invitation automation',
      'Attendance management',
      'Resource planning',
      'Event analytics'
    ],
    benefits: [
      'Streamlined event planning',
      'Better attendance tracking',
      'Automated communications',
      'Improved event outcomes'
    ],
    specifications: {
      'Communication': 'Email, SMS, calendar',
      'Integration': 'Calendar systems, facilities',
      'Tracking': 'Real-time RSVP status',
      'Reporting': 'Event metrics and feedback'
    },
    size: { width: 2, height: 1 },
    className: 'col-span-2',
    priority: 18,
  },

  // Compliance Solutions
  {
    id: 'audit-reporting',
    slug: 'audit-reporting-system',
    name: 'Audit Reporting System',
    description: 'Streamlined audit management with workflow automation and collaborative reporting features.',
    icon: FaFileInvoice,
    category: 'compliance',
    tags: ['Workflow Driven', 'Collaboration Tools'],
    features: [
      'Audit planning and scheduling',
      'Finding management',
      'Corrective action tracking',
      'Compliance monitoring',
      'Report generation',
      'Stakeholder collaboration'
    ],
    benefits: [
      'Streamlined audit processes',
      'Better compliance tracking',
      'Improved audit quality',
      'Enhanced collaboration'
    ],
    specifications: {
      'Standards': 'ISO, SOX, COSO frameworks',
      'Workflow': 'Automated audit processes',
      'Collaboration': 'Multi-stakeholder access',
      'Reporting': 'Executive dashboards'
    },
    size: { width: 1, height: 1 },
    className: 'col-span-1',
    priority: 19,
  },
  {
    id: 'expense-tracking',
    slug: 'expense-tracking-system',
    name: 'Expense Tracking System',
    description: 'User-friendly portal for tracking and managing official expenses and travel reimbursements.',
    icon: FaDollarSign,
    category: 'compliance',
    tags: ['Travel Expenses', 'Reimbursement'],
    features: [
      'Expense capture and categorization',
      'Receipt management',
      'Approval workflows',
      'Travel expense tracking',
      'Reimbursement processing',
      'Expense analytics'
    ],
    benefits: [
      'Simplified expense reporting',
      'Faster reimbursements',
      'Better expense control',
      'Improved compliance'
    ],
    specifications: {
      'Mobile': 'Receipt capture apps',
      'Integration': 'Credit cards, travel systems',
      'Approval': 'Multi-level workflows',
      'Reporting': 'Expense analytics and trends'
    },
    size: { width: 1, height: 1 },
    className: 'col-span-1',
    priority: 20,
  },
  {
    id: 'meeting-minutes-manager',
    slug: 'meeting-minutes-manager',
    name: 'Meeting Minutes Manager',
    description: 'Organize meeting minutes, agendas, action items, and decisions in one central location.',
    icon: FaCalendarAlt,
    category: 'compliance',
    tags: ['Meeting Management', 'Action Items'],
    features: [
      'Meeting agenda creation',
      'Minutes recording and editing',
      'Action item tracking',
      'Decision documentation',
      'Participant management',
      'Meeting analytics'
    ],
    benefits: [
      'Better meeting organization',
      'Improved action tracking',
      'Enhanced decision recording',
      'Meeting productivity insights'
    ],
    specifications: {
      'Integration': 'Calendar systems, video conferencing',
      'Collaboration': 'Real-time editing',
      'Tracking': 'Action item follow-up',
      'Templates': 'Standardized meeting formats'
    },
    size: { width: 2, height: 1 },
    className: 'col-span-1',
    priority: 21,
  },
  {
    id: 'training-records',
    slug: 'training-records-system',
    name: 'Training Records System',
    description: 'Training request, registration, and tracking system with LMS integration.',
    icon: FaFileAlt,
    category: 'compliance',
    tags: ['Training Requests', 'LMS Integration'],
    features: [
      'Training record management',
      'Compliance tracking',
      'Certification management',
      'Training history',
      'Reporting and analytics',
      'LMS integration'
    ],
    benefits: [
      'Complete training visibility',
      'Compliance assurance',
      'Simplified record keeping',
      'Better training ROI'
    ],
    specifications: {
      'Integration': 'Multiple LMS platforms',
      'Compliance': 'Regulatory training tracking',
      'Reporting': 'Training compliance reports',
      'Automation': 'Renewal notifications'
    },
    size: { width: 1, height: 1 },
    className: 'col-span-1',
    priority: 22,
  },

  // Data Management Solutions
  {
    id: 'central-data',
    slug: 'central-data-platform',
    name: 'Central Data Platform',
    description: 'Interface for managing inventory of clients, projects and tasks with analytics and reports.',
    icon: FaDatabase,
    category: 'data',
    tags: ['Analytics Dashboard', 'Data Integration'],
    features: [
      'Centralized data repository',
      'Real-time analytics',
      'Custom reporting',
      'Data visualization',
      'Integration management',
      'Performance monitoring'
    ],
    benefits: [
      'Single source of truth',
      'Better data insights',
      'Improved decision making',
      'Enhanced data quality'
    ],
    specifications: {
      'Integration': 'Multiple data sources',
      'Analytics': 'Real-time dashboards',
      'Storage': 'Cloud-native architecture',
      'Security': 'Enterprise-grade protection'
    },
    size: { width: 1, height: 1 },
    className: 'col-span-1',
    priority: 23,
  },
  {
    id: 'e-survey',
    slug: 'e-survey-platform',
    name: 'E-Survey Platform',
    description: 'Create, distribute, and analyze surveys with real-time response tracking and reporting.',
    icon: FaPoll,
    category: 'data',
    tags: ['Real-time Analytics', 'Custom Questions'],
    features: [
      'Survey design and creation',
      'Multi-channel distribution',
      'Real-time response tracking',
      'Advanced analytics',
      'Custom reporting',
      'Integration capabilities'
    ],
    benefits: [
      'Better feedback collection',
      'Real-time insights',
      'Improved response rates',
      'Data-driven decisions'
    ],
    specifications: {
      'Question Types': '15+ question formats',
      'Distribution': 'Email, web, mobile, QR',
      'Analytics': 'Real-time dashboards',
      'Integration': 'CRM, marketing platforms'
    },
    size: { width: 2, height: 1 },
    className: 'col-span-2',
    priority: 24,
  },
  {
    id: 'form-management',
    slug: 'form-management-system',
    name: 'Form Management System',
    description: 'Administration of electronic and paper-based information captured across the organization.',
    icon: FaFileAlt,
    category: 'data',
    tags: ['Electronic Forms', 'Workflow Management'],
    features: [
      'Form design and creation',
      'Workflow automation',
      'Data collection',
      'Approval processes',
      'Document generation',
      'Analytics and reporting'
    ],
    benefits: [
      'Digitized form processes',
      'Reduced paperwork',
      'Improved data quality',
      'Streamlined workflows'
    ],
    specifications: {
      'Forms': 'Drag-and-drop designer',
      'Workflow': 'Custom approval flows',
      'Integration': 'Database systems',
      'Security': 'Role-based access control'
    },
    size: { width: 1, height: 1 },
    className: 'col-span-1',
    priority: 25,
  },

  // Modernization Solutions
  {
    id: 'i-code',
    slug: 'i-code-testing-platform',
    name: 'I-Code Testing Platform',
    description: 'Web-based testing solution for secure assessment environments with comprehensive reporting.',
    icon: FaCode,
    category: 'modernization',
    tags: ['Secure Testing', 'Real-time Reports'],
    features: [
      'Secure testing environment',
      'Multiple question types',
      'Real-time monitoring',
      'Comprehensive reporting',
      'Anti-cheating measures',
      'Performance analytics'
    ],
    benefits: [
      'Secure online testing',
      'Comprehensive assessment',
      'Real-time insights',
      'Improved test integrity'
    ],
    specifications: {
      'Security': 'Browser lockdown, monitoring',
      'Question Types': 'Multiple choice, coding, essay',
      'Reporting': 'Detailed analytics',
      'Integration': 'LMS platforms'
    },
    size: { width: 1, height: 1 },
    className: 'col-span-1',
    priority: 26,
  },
  {
    id: 'professional-management',
    slug: 'professional-management-system',
    name: 'Professional Management System',
    description: 'Comprehensive recruitment and staffing solution with resume tracking and onboarding.',
    icon: FaUserTie,
    category: 'modernization',
    tags: ['Resume Tracking', 'Onboarding'],
    features: [
      'Applicant tracking system',
      'Resume parsing and matching',
      'Interview scheduling',
      'Onboarding workflows',
      'Candidate communication',
      'Recruitment analytics'
    ],
    benefits: [
      'Streamlined recruitment',
      'Better candidate experience',
      'Improved hiring quality',
      'Faster onboarding'
    ],
    specifications: {
      'ATS Features': 'Resume parsing, job posting',
      'Integration': 'Job boards, background checks',
      'Workflow': 'Custom hiring processes',
      'Analytics': 'Recruitment metrics'
    },
    size: { width: 2, height: 1 },
    className: 'col-span-2',
    priority: 27,
  },
  {
    id: 'complaint-tracking',
    slug: 'complaint-tracking-system',
    name: 'Complaint Tracking System',
    description: 'User-friendly solution that seamlessly automates your complaint workflow process.',
    icon: FaComments,
    category: 'modernization',
    tags: ['Workflow Automation', 'Case Management'],
    features: [
      'Complaint intake management',
      'Automated workflow routing',
      'Case tracking and status',
      'Communication management',
      'Resolution tracking',
      'Performance analytics'
    ],
    benefits: [
      'Streamlined complaint handling',
      'Better customer satisfaction',
      'Improved resolution times',
      'Enhanced transparency'
    ],
    specifications: {
      'Workflow': 'Automated routing and escalation',
      'Communication': 'Multi-channel support',
      'Tracking': 'Real-time status updates',
      'Reporting': 'Performance dashboards'
    },
    size: { width: 1, height: 1 },
    className: 'col-span-1',
    priority: 28,
  },

  // Technology Solutions
  {
    id: 'inventory-asset-tracking',
    slug: 'inventory-asset-tracking-system',
    name: 'Inventory Asset Tracking System',
    description: 'Track company assets, reduce unnecessary purchasing, and maintain software licenses.',
    icon: FaBox,
    category: 'technology',
    tags: ['Asset Management', 'License Tracking'],
    features: [
      'Asset lifecycle management',
      'Barcode and RFID tracking',
      'License management',
      'Maintenance scheduling',
      'Depreciation tracking',
      'Asset analytics'
    ],
    benefits: [
      'Better asset visibility',
      'Reduced costs',
      'Improved compliance',
      'Optimized utilization'
    ],
    specifications: {
      'Tracking': 'Barcode, RFID, QR codes',
      'Integration': 'Financial systems',
      'Mobile': 'Asset scanning apps',
      'Reporting': 'Asset utilization reports'
    },
    size: { width: 2, height: 1 },
    className: 'col-span-2',
    priority: 29,
  },
  {
    id: 'visitor-log',
    slug: 'visitor-log-system',
    name: 'Visitor Log System',
    description: 'Effective tool for organizations to keep track of visitors entering your establishment.',
    icon: FaIdCard,
    category: 'technology',
    tags: ['Visitor Management', 'Security Tracking'],
    features: [
      'Visitor registration',
      'Badge printing',
      'Host notifications',
      'Security integration',
      'Visitor analytics',
      'Compliance reporting'
    ],
    benefits: [
      'Enhanced security',
      'Streamlined check-in',
      'Better visitor experience',
      'Compliance tracking'
    ],
    specifications: {
      'Hardware': 'Kiosk, tablet, mobile',
      'Integration': 'Security systems, directories',
      'Badges': 'Custom badge printing',
      'Reporting': 'Visitor analytics and compliance'
    },
    size: { width: 2, height: 1 },
    className: 'col-span-2',
    priority: 30,
  }
];

export const getAllProducts = async (): Promise<ProductDetail[]> => {
  return products;
};

export const getProductBySlug = async (slug: string): Promise<ProductDetail | null> => {
  const product = products.find(p => p.slug === slug);
  return product ?? null;
};

export const getProductsByCategory = async (category: string): Promise<ProductDetail[]> => {
  return products.filter(p => p.category === category);
};

export const getFeaturedProducts = async (): Promise<ProductDetail[]> => {
  return products.filter(p => p.category === 'featured');
};

export const searchProducts = async (query: string): Promise<ProductDetail[]> => {
  const searchQuery = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(searchQuery) ||
    p.description.toLowerCase().includes(searchQuery) ||
    p.tags?.some(tag => tag.toLowerCase().includes(searchQuery))
  );
};
