import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BentoGrid, BentoGridItem } from "./bento-grid";

describe("BentoGrid", () => {
    it("renders children inside the grid", () => {
        render(
            <BentoGrid>
                <div>Child 1</div>
                <div>Child 2</div>
            </BentoGrid>
        );
        expect(screen.getByText("Child 1")).toBeInTheDocument();
        expect(screen.getByText("Child 2")).toBeInTheDocument();
    });
});

describe("BentoGridItem", () => {
    it("renders children inside the grid item", () => {
        render(
            <BentoGridItem>
                <div>Child Item</div>
            </BentoGridItem>
        );
        expect(screen.getByText("Child Item")).toBeInTheDocument();
    });
});