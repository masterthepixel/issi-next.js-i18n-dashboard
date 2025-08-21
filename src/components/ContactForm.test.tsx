import { render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { describe, expect, it } from "vitest";
import ContactForm from "./ContactForm";

describe("ContactForm", () => {
    it("renders all form fields and the submit button", () => {
        render(
            <IntlProvider locale="en">
                <ContactForm />
            </IntlProvider>
        );

        // Check for all labels and their corresponding inputs
        expect(screen.getByLabelText("First name")).toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: /first name/i })).toBeInTheDocument();

        expect(screen.getByLabelText("Last name")).toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: /last name/i })).toBeInTheDocument();

        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();

        expect(screen.getByLabelText("Message")).toBeInTheDocument();
        expect(screen.getByRole("textbox", { name: /message/i })).toBeInTheDocument();

        // Check for the submit button
        expect(screen.getByRole("button", { name: /let's talk/i })).toBeInTheDocument();
    });
});