import { fireEvent, render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { describe, expect, it, vi } from "vitest";
import ProductsBentoGrid from "./ProductsBentoGrid";

// Mock next/link
vi.mock("next/link", () => {
    return {
        default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
    };
});

const messages = {
    "products.categories.all": "All",
    "products.categories.featured": "Featured",
    "products.categories.project": "Project Management",
    "products.categories.hr": "HR Solutions",
    "products.categories.compliance": "Compliance",
    "products.categories.data": "Data Management",
    "products.categories.modernization": "Modernization",
    "products.categories.technology": "Technology",
    "products.gms.title": "Grant Management System",
    "products.gms.description": "A comprehensive solution for managing grants.",
    "products.ects.title": "Electronic Correspondence Tracking System",
    "products.ects.description": "Track and manage all your electronic correspondence.",
    "products.ets.title": "ePermitting System",
    "products.ets.description": "A system for electronic permits.",
    "products.mdsps.title": "Membership Database & Subsidy Payment System",
    "products.mdsps.description": "A system for membership and payments.",
    "products.project-management.title": "Project Management Suite",
    "products.project-management.description": "A suite for managing projects.",
    "products.bug-tracking.title": "Bug Tracking System",
    "products.bug-tracking.description": "A system for tracking bugs.",
    "products.capture-manager.title": "Capture Manager",
    "products.capture-manager.description": "A tool for capture management.",
    "products.prudent-agile.title": "Prudent Agile Methodology",
    "products.prudent-agile.description": "An agile methodology framework.",
    "products.task-management.title": "Task Management System",
    "products.task-management.description": "A system for managing tasks.",
    "products.requirements-management.title": "Requirements Management System",
    "products.requirements-management.description": "A system for managing requirements.",
    "products.hr-manager.title": "HR Management System",
    "products.hr-manager.description": "A system for HR management.",
    "employee-talent-repository.title": "Employee Talent Repository",
    "employee-talent-repository.description": "Data repository coordinating recruitment and performance measurement activities.",
    "competency-skills-matrix.title": "Competency Skills Matrix",
    "competency-skills-matrix.description": "Track and manage employee skills and competencies across the organization.",
    "training-dashboard.title": "Training Dashboard",
    "training-dashboard.description": "All-in-one platform to view available employee training and manage training portfolios.",
    "i-learn.title": "I-Learn",
    "i-learn.description": "Easy-to-use course registration and management system with automated capabilities.",
    "rsvp.title": "RSVP",
    "rsvp.description": "Event planning system for invitations, tracking attendance, and managing events.",
    "audit-reporting.title": "Audit Reporting",
    "audit-reporting.description": "Streamlined audit management with workflow automation and collaborative reporting features.",
    "expense-tracking.title": "Expense Tracking",
    "expense-tracking.description": "User-friendly portal for tracking and managing official expenses and travel reimbursements.",
    "meeting-minutes-manager.title": "Meeting Minutes Manager",
    "meeting-minutes-manager.description": "Organize meeting minutes, agendas, action items, and decisions in one central location.",
    "training-records.title": "Training Records",
    "training-records.description": "Training request, registration, and tracking system with LMS integration.",
    "central-data.title": "Central Data",
    "central-data.description": "Interface for managing inventory of clients, projects and tasks with analytics and reports.",
    "e-survey.title": "E-Survey",
    "e-survey.description": "Create, distribute, and analyze surveys with real-time response tracking and reporting.",
    "form-management.title": "Form Management",
    "form-management.description": "Administration of electronic and paper-based information captured across the organization.",
    "i-code.title": "I-Code",
    "i-code.description": "Web-based testing solution for secure assessment environments with comprehensive reporting.",
    "professional-management.title": "Professional Management",
    "professional-management.description": "Comprehensive recruitment and staffing solution with resume tracking and onboarding.",
    "complaint-tracking.title": "Complaint Tracking",
    "complaint-tracking.description": "User-friendly solution that seamlessly automates your complaint workflow process.",
    "inventory-asset-tracking.title": "Inventory Asset Tracking",
    "inventory-asset-tracking.description": "Track company assets, reduce unnecessary purchasing, and maintain software licenses.",
    "visitor-log.title": "Visitor Log",
    "visitor-log.description": "Effective tool for organizations to keep track of visitors entering your establishment.",
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <IntlProvider locale="en" messages={messages} onError={() => { }}>
        {children}
    </IntlProvider>
);

describe("ProductsBentoGrid", () => {
    it("renders all products by default", () => {
        render(
            <TestWrapper>
                <ProductsBentoGrid lang="en" />
            </TestWrapper>
        );

        expect(screen.getByText("Grant Management System")).toBeInTheDocument();
        expect(screen.getByText("Electronic Correspondence Tracking System")).toBeInTheDocument();
    });

    it("filters products when a category button is clicked", () => {
        render(
            <TestWrapper>
                <ProductsBentoGrid lang="en" />
            </TestWrapper>
        );

        // Initially, both featured and other products are visible
        expect(screen.getByText("Grant Management System")).toBeInTheDocument();

        // Click the 'Project Management' filter
        const projectFilterButton = screen.getByText("Project Management");
        fireEvent.click(projectFilterButton);

        // After filtering, the featured product should not be visible
        expect(screen.queryByText("Grant Management System")).not.toBeInTheDocument();
        // A project management product should be visible
        expect(screen.getByText("Project Management Suite")).toBeInTheDocument();
    });

    it("renders correct links for each product", () => {
        render(
            <TestWrapper>
                <ProductsBentoGrid lang="en" />
            </TestWrapper>
        );

        const gmsLink = screen.getByText("Grant Management System").closest("a");
        expect(gmsLink).toHaveAttribute("href", "/en/products/grant-management-system");

        const ectsLink = screen.getByText("Electronic Correspondence Tracking System").closest("a");
        expect(ectsLink).toHaveAttribute("href", "/en/products/electronic-correspondence-tracking-system");
    });
});