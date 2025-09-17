"use client";

import { Card, Carousel } from "@/components/ui/apple-cards-carousel";
import { useIntl } from "react-intl";

const ISSIAppleCardsCarousel = () => {
    const intl = useIntl();

    const cards = [
        {
            category: intl.formatMessage({ id: "carousel.products.category" }),
            title: intl.formatMessage({ id: "carousel.products.title" }),
            src: "https://images.unsplash.com/photo-1575089976121-8ed7b2a54265?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            content: <div className="text-muted-foreground">{intl.formatMessage({ id: "carousel.products.content" })}</div>,
        },
        {
            category: intl.formatMessage({ id: "carousel.government.category" }),
            title: intl.formatMessage({ id: "carousel.government.title" }),
            src: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop",
            content: <div className="text-muted-foreground">{intl.formatMessage({ id: "carousel.government.content" })}</div>,
        },
        {
            category: intl.formatMessage({ id: "carousel.elearning.category" }),
            title: intl.formatMessage({ id: "carousel.elearning.title" }),
            src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
            content: <div className="text-muted-foreground">{intl.formatMessage({ id: "carousel.elearning.content" })}</div>,
        },
        {
            category: intl.formatMessage({ id: "carousel.compliance.category" }),
            title: intl.formatMessage({ id: "carousel.compliance.title" }),
            src: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop",
            content: <div className="text-muted-foreground">{intl.formatMessage({ id: "carousel.compliance.content" })}</div>,
        },
        {
            category: intl.formatMessage({ id: "carousel.careers.category" }),
            title: intl.formatMessage({ id: "carousel.careers.title" }),
            src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2487&auto=format&fit=crop",
            content: <div className="text-muted-foreground">{intl.formatMessage({ id: "carousel.careers.content" })}</div>,
        },
        {
            category: intl.formatMessage({ id: "carousel.blog.category" }),
            title: intl.formatMessage({ id: "carousel.blog.title" }),
            src: "https://images.unsplash.com/photo-1528716321680-815a8cdb8cbe?q=80&w=1076&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            content: <div className="text-muted-foreground">{intl.formatMessage({ id: "carousel.blog.content" })}</div>,
        },
    ];

    const items = cards.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    return (
        <div className="w-full h-full py-8">
            <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-serif font-normal text-foreground mb-4">
                {intl.formatMessage({ id: "carousel.title" })}
            </h2>
            <Carousel items={items} />
        </div>
    );
};

export default ISSIAppleCardsCarousel;