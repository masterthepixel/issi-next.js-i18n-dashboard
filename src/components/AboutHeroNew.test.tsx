import { render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { describe, expect, it } from "vitest";
import AboutHeroNew from "./AboutHeroNew";

// Test messages for different locales
const testMessages = {
    en: {
        'about.hero.title': 'Welcome to ISSI',
        'about.hero.subtitle': 'Award-Winning Software Development Since 1995',
        'about.hero.company': 'About Us',
        'about.hero.mission.title': 'Our Mission',
        'about.hero.vision.title': 'Our Vision',
        'about.hero.about': 'Founded in 1995 and headquartered in Greenbelt, Maryland, International Software Systems, Inc. (ISSI) is a GSA IT MAS Schedule holder providing a wide range of information technology solutions and services.',
        'about.hero.mission': 'Our mission is to help clients achieve their business objectives by providing exceptional, client-centric consulting services and solutions.',
        'about.hero.vision': 'Our vision is to become a globally recognized IT leader known for innovative solutions, outstanding customer service, and a proven ability to exceed client expectations.',
    },
    es: {
        'about.hero.title': 'Bienvenidos a ISSI',
        'about.hero.subtitle': 'Desarrollo de Software Galardonado Desde 1995',
        'about.hero.company': 'Acerca de Nosotros',
        'about.hero.mission.title': 'Nuestra Misión',
        'about.hero.vision.title': 'Nuestra Visión',
        'about.hero.about': 'Fundada en 1995 y con sede en Greenbelt, Maryland, International Software Systems, Inc. (ISSI) es un titular del programa GSA IT MAS que ofrece una amplia gama de soluciones y servicios de tecnología de la información.',
        'about.hero.mission': 'Nuestra misión es ayudar a los clientes a lograr sus objetivos comerciales proporcionando servicios y soluciones de consultoría excepcionales y centrados en el cliente.',
        'about.hero.vision': 'Nuestra visión es convertirnos en un líder de TI reconocido mundialmente conocido por soluciones innovadoras, servicio al cliente excepcional y una capacidad comprobada para superar las expectativas del cliente.',
    },
    fr: {
        'about.hero.title': 'Bienvenue chez ISSI',
        'about.hero.subtitle': 'Développement de Logiciels Primé Depuis 1995',
        'about.hero.company': 'À Propos de Nous',
        'about.hero.mission.title': 'Notre Mission',
        'about.hero.vision.title': 'Notre Vision',
        'about.hero.about': 'Fondée en 1995 et basée à Greenbelt, Maryland, International Software Systems, Inc. (ISSI) est titulaire du programme GSA IT MAS et fournit une large gamme de solutions et services de technologie de l\'information.',
        'about.hero.mission': 'Notre mission est d\'aider les clients à atteindre leurs objectifs commerciaux en fournissant des services et solutions de conseil exceptionnels et centrés sur le client.',
        'about.hero.vision': 'Notre vision est de devenir un leader informatique mondialement reconnu, connu pour ses solutions innovantes, son excellent service client et sa capacité prouvée à dépasser les attentes des clients.',
    }
};

describe("AboutHeroNew", () => {
    it("renders the main heading and subtitle", () => {
        render(
            <IntlProvider locale="en" messages={testMessages.en}>
                <AboutHeroNew />
            </IntlProvider>
        );

        expect(screen.getByRole("heading", { name: /welcome to issi/i, level: 2 })).toBeInTheDocument();
        expect(screen.getByText(/award-winning software development since 1995/i)).toBeInTheDocument();
    });

    it("renders all feature sections with proper semantic markup", () => {
        render(
            <IntlProvider locale="en" messages={testMessages.en}>
                <AboutHeroNew />
            </IntlProvider>
        );

        // Check for definition list structure
        const definitionTerms = screen.getAllByRole("term");
        expect(definitionTerms).toHaveLength(3);
        
        // Verify specific feature sections using more specific selectors
        expect(screen.getAllByText(/about us/i)).toHaveLength(1);
        expect(screen.getAllByText(/our mission/i)).toHaveLength(2); // Term appears in both dt and dd
        expect(screen.getAllByText(/our vision/i)).toHaveLength(2); // Term appears in both dt and dd
    });

    it("has proper accessibility attributes", () => {
        render(
            <IntlProvider locale="en" messages={testMessages.en}>
                <AboutHeroNew />
            </IntlProvider>
        );

        // Check for proper ARIA labeling
        const section = screen.getByRole("region");
        expect(section).toHaveAttribute("aria-labelledby", "about-hero-heading");
        
        // Check for proper heading structure
        const heading = screen.getByRole("heading", { level: 2 });
        expect(heading).toHaveAttribute("id", "about-hero-heading");
        
        // Check for proper image alt text
        const image = screen.getByRole("img");
        expect(image).toHaveAttribute("alt");
        expect(image.getAttribute("alt")).toContain("ISSI headquarters");
    });

    it("supports internationalization for Spanish", () => {
        render(
            <IntlProvider locale="es" messages={testMessages.es}>
                <AboutHeroNew />
            </IntlProvider>
        );

        expect(screen.getByText(/bienvenidos a issi/i)).toBeInTheDocument();
        expect(screen.getByText(/desarrollo de software galardonado desde 1995/i)).toBeInTheDocument();
        expect(screen.getAllByText(/acerca de nosotros/i)).toHaveLength(1);
        expect(screen.getAllByText(/nuestra misión/i)).toHaveLength(2);
        expect(screen.getAllByText(/nuestra visión/i)).toHaveLength(2);
    });

    it("supports internationalization for French", () => {
        render(
            <IntlProvider locale="fr" messages={testMessages.fr}>
                <AboutHeroNew />
            </IntlProvider>
        );

        expect(screen.getByText(/bienvenue chez issi/i)).toBeInTheDocument();
        expect(screen.getByText(/développement de logiciels primé depuis 1995/i)).toBeInTheDocument();
        expect(screen.getAllByText(/à propos de nous/i)).toHaveLength(1);
        expect(screen.getAllByText(/notre mission/i)).toHaveLength(2);
        expect(screen.getAllByText(/notre vision/i)).toHaveLength(2);
    });

    it("uses shadcn/ui Card components correctly", () => {
        const { container } = render(
            <IntlProvider locale="en" messages={testMessages.en}>
                <AboutHeroNew />
            </IntlProvider>
        );

        // Check that shadcn/ui Card classes are applied
        expect(container.querySelector('[class*="border-none"]')).toBeInTheDocument();
        expect(container.querySelector('[class*="shadow-none"]')).toBeInTheDocument();
        expect(container.querySelector('[class*="bg-transparent"]')).toBeInTheDocument();
    });

    it("uses theme tokens for styling", () => {
        const { container } = render(
            <IntlProvider locale="en" messages={testMessages.en}>
                <AboutHeroNew />
            </IntlProvider>
        );

        // Check for CSS variable usage (theme tokens)
        expect(container.querySelector('[class*="text-primary"]')).toBeInTheDocument();
        expect(container.querySelector('[class*="text-foreground"]')).toBeInTheDocument();
        expect(container.querySelector('[class*="text-muted-foreground"]')).toBeInTheDocument();
        expect(container.querySelector('[class*="bg-background"]')).toBeInTheDocument();
        expect(container.querySelector('[class*="ring-border"]')).toBeInTheDocument();
    });

    it("handles image optimization correctly", () => {
        render(
            <IntlProvider locale="en" messages={testMessages.en}>
                <AboutHeroNew />
            </IntlProvider>
        );

        const image = screen.getByRole("img");
        
        // Check for responsive sizing and alt text
        expect(image).toHaveAttribute("sizes");
        expect(image.getAttribute("sizes")).toContain("100vw");
        expect(image).toHaveAttribute("alt");
        expect(image.getAttribute("alt")).toContain("ISSI headquarters");
        
        // Verify image dimensions are set
        expect(image).toHaveAttribute("width", "2432");
        expect(image).toHaveAttribute("height", "1442");
    });
});