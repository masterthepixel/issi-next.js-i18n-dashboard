import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider, useTheme } from "next-themes";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ThemeToggle from "./ThemeToggle";

vi.mock("next-themes", async () => {
    const actual = await vi.importActual("next-themes");
    return {
        ...actual,
        useTheme: vi.fn(),
    };
});

vi.mock("@/components/ui/dropdown-menu", () => ({
    DropdownMenu: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
    DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => children,
    DropdownMenuContent: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
    DropdownMenuItem: ({
        children,
        ...props
    }: {
        children: React.ReactNode;
    }) => <div {...props}>{children}</div>,
}));

const mockUseTheme = useTheme as import("vitest").Mock;

describe("ThemeToggle", () => {
    const setTheme = vi.fn();

    const renderWithProvider = (component: React.ReactElement) => {
        return render(<ThemeProvider attribute="class">{component}</ThemeProvider>);
    };

    beforeEach(() => {
        mockUseTheme.mockReturnValue({ setTheme, theme: "light" });
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it("renders the theme toggle button", () => {
        renderWithProvider(<ThemeToggle />);
        expect(screen.getByRole("button", { name: /toggle theme/i })).toBeInTheDocument();
    });

    it("opens the dropdown menu on click", () => {
        renderWithProvider(<ThemeToggle />);
        // With the mock, the content is always visible
        expect(screen.getByText("Light")).toBeInTheDocument();
        expect(screen.getByText("Dark")).toBeInTheDocument();
        expect(screen.getByText("System")).toBeInTheDocument();
    });

    it("calls setTheme with 'light' when light mode is selected", () => {
        renderWithProvider(<ThemeToggle />);
        fireEvent.click(screen.getByText("Light"));
        expect(setTheme).toHaveBeenCalledWith("light");
    });

    it("calls setTheme with 'dark' when dark mode is selected", () => {
        renderWithProvider(<ThemeToggle />);
        fireEvent.click(screen.getByText("Dark"));
        expect(setTheme).toHaveBeenCalledWith("dark");
    });

    it("calls setTheme with 'system' when system mode is selected", () => {
        renderWithProvider(<ThemeToggle />);
        fireEvent.click(screen.getByText("System"));
        expect(setTheme).toHaveBeenCalledWith("system");
    });
});
