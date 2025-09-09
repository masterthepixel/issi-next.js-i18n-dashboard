import { fireEvent, render, screen, within } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { describe, expect, it } from "vitest";
import ComplianceCarousel from "./ComplianceCarousel";

const messages = {
    "compliance.carousel.heading": "Our Compliance & Certifications",
    "compliance.carousel.subtitle": "Certified. Secure. Trusted by industry leaders and government agencies.",
    "compliance.carousel.iso9001.title": "ISO 9001:2015",
    "compliance.carousel.iso9001.headline": "Quality Management System",
    "compliance.carousel.iso9001.body": "ISSI is certified to ISO 9001:2015, ensuring that our products and services consistently meet customer and regulatory requirements.",
    "compliance.carousel.iso27001.title": "ISO 27001:2013",
    "compliance.carousel.iso27001.headline": "Information Security Management",
    "compliance.carousel.iso27001.body": "Our ISO 27001:2013 certification demonstrates our commitment to information security at every level of our organization.",
    "compliance.carousel.mdot.title": "MDOT MBE/DBE/SBE",
    "compliance.carousel.mdot.headline": "State of Maryland Certification",
    "compliance.carousel.mdot.body": "ISSI is a certified Minority Business Enterprise (MBE), Disadvantaged Business Enterprise (DBE), and Small Business Enterprise (SBE) by the Maryland Department of Transportation.",
    "compliance.carousel.cmmi3.title": "CMMI Level 3",
    "compliance.carousel.cmmi3.headline": "Capability Maturity Model Integration",
    "compliance.carousel.cmmi3.body": "Our CMMI Level 3 appraisal indicates that our work and processes are well-defined, understood, and capable of producing high-quality products."
};

describe("ComplianceCarousel", () => {
    it("renders the carousel with all compliance items", () => {
        render(
            <IntlProvider locale="en" messages={messages}>
                <ComplianceCarousel />
            </IntlProvider>
        );

        expect(screen.getByText("ISO 9001:2015")).toBeInTheDocument();
        expect(screen.getByText("ISO 27001:2013")).toBeInTheDocument();
        expect(screen.getByText("MDOT MBE/DBE/SBE")).toBeInTheDocument();
        expect(screen.getByText("CMMI Level 3")).toBeInTheDocument();
    });

    it("opens a dialog with more information when a carousel item is clicked", () => {
        render(
            <IntlProvider locale="en" messages={messages}>
                <ComplianceCarousel />
            </IntlProvider>
        );

        fireEvent.click(screen.getByText("ISO 9001:2015"));

        const dialog = screen.getByRole("dialog");
        expect(dialog).toBeInTheDocument();
        expect(within(dialog).getByText("Quality Management System", { selector: 'p' })).toBeInTheDocument();
    });
});
