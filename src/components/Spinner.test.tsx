import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Spinner from "./Spinner";

describe("Spinner", () => {
    it("renders the spinner with the correct accessibility role", () => {
        render(<Spinner />);
        const spinner = screen.getByRole("status");
        expect(spinner).toBeInTheDocument();
    });

    it("applies the correct animation and color classes", () => {
        const { container } = render(<Spinner />);
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const loaderIcon = container.querySelector("svg");
        expect(loaderIcon).toHaveClass("animate-spin");
        expect(loaderIcon).toHaveClass("text-primary");
    });
});
