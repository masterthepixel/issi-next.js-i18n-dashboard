import { Locale } from "@/lib/definitions";
import { fireEvent, render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { describe, expect, it, vi } from "vitest";
import Sidebar from "./Sidebar";

const mockMessages = {
    "common.navigation.home": "Home",
    "common.navigation.reports": "Reports",
    "common.navigation.discover": "Discover",
};

// Mock the SidebarLink component
vi.mock("./SidebarLink", () => ({
    default: ({ href, children }: { href: string; children: React.ReactNode }) => (
        <a href={href}>{children}</a>
    ),
}));

vi.mock("@/lib/intl", () => ({
    getIntl: async () => ({
        formatMessage: ({ id }: { id: keyof typeof mockMessages }) => mockMessages[id],
    }),
}));

describe("Sidebar", () => {
    const renderSidebar = async (locale: Locale) => {
        const SidebarComponent = await Sidebar({ locale });
        return render(
            <IntlProvider locale={locale} messages={mockMessages}>
                {SidebarComponent}
            </IntlProvider>
        );
    };

    it("renders the menu trigger button", async () => {
        await renderSidebar("en");
        expect(screen.getByRole("button", { name: /toggle menu/i })).toBeInTheDocument();
    });

    it("opens the sidebar when the trigger is clicked", async () => {
        await renderSidebar("en");
        const trigger = screen.getByRole("button", { name: /toggle menu/i });
        fireEvent.click(trigger);

        // Using findByRole to wait for the element to appear
        const sidebarTitle = await screen.findByText("Starter App");
        expect(sidebarTitle).toBeInTheDocument();
    });

    it("renders navigation links with correct text and icons", async () => {
        await renderSidebar("en");
        const trigger = screen.getByRole("button", { name: /toggle menu/i });
        fireEvent.click(trigger);

        expect(await screen.findByText("Home")).toBeInTheDocument();
        expect(await screen.findByText("Reports")).toBeInTheDocument();
        expect(await screen.findByText("Discover")).toBeInTheDocument();
    });
});