import { render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { describe, expect, it } from "vitest";
import AboutStatsNew from "./AboutStatsNew";

const messages = {
    "about.stats.experience.name": "Years of experience",
    "about.stats.experience.value": "25+",
    "about.stats.experts.name": "Certified experts",
    "about.stats.experts.value": "100+",
    "about.stats.partners.name": "Valued partners",
    "about.stats.partners.value": "50+",
    "about.stats.projects.name": "Successful projects",
    "about.stats.projects.value": "1000+",
    "about.stats.title": "Our track record",
    "about.stats.headline": "Delivering excellence since 1995",
    "about.stats.description": "International Software Systems, Inc. has been providing award-winning software development and IT support services with a proven track record of success."
};

describe("AboutStatsNew", () => {
    it("renders the main heading and description", () => {
        render(
            <IntlProvider locale="en" messages={messages}>
                <AboutStatsNew />
            </IntlProvider>
        );

        expect(screen.getByRole("heading", { name: /delivering excellence since 1995/i, level: 2 })).toBeInTheDocument();
        expect(screen.getByText(/our track record/i)).toBeInTheDocument();
        expect(screen.getByText(/international software systems, inc./i)).toBeInTheDocument();
    });

    it("renders all stat cards", () => {
        render(
            <IntlProvider locale="en" messages={messages}>
                <AboutStatsNew />
            </IntlProvider>
        );

        expect(screen.getByText("25+")).toBeInTheDocument();
        expect(screen.getByText("Years of experience")).toBeInTheDocument();

        expect(screen.getByText("100+")).toBeInTheDocument();
        expect(screen.getByText("Certified experts")).toBeInTheDocument();

        expect(screen.getByText("50+")).toBeInTheDocument();
        expect(screen.getByText("Valued partners")).toBeInTheDocument();

        expect(screen.getByText("1000+")).toBeInTheDocument();
        expect(screen.getByText("Successful projects")).toBeInTheDocument();
    });
});