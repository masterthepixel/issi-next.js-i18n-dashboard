"use client";

import { Card, Carousel } from "@/components/ui/apple-cards-carousel";
import { useIntl } from "react-intl";

const ISSIAppleCardsCarousel = () => {
    const intl = useIntl();

    const cards = [
        {
            category: intl.formatMessage({ id: "carousel.products.category" }),
            title: intl.formatMessage({ id: "carousel.products.title" }),
            src: "/images/services/products_3_11zon.jpg",
            content: <div className="text-muted-foreground">{intl.formatMessage({ id: "carousel.products.content" })}</div>,
        },
        {
            category: intl.formatMessage({ id: "carousel.government.category" }),
            title: intl.formatMessage({ id: "carousel.government.title" }),
            src: "/images/services/publicsector_5_11zon.jpg",
            content: <div className="text-muted-foreground">{intl.formatMessage({ id: "carousel.government.content" })}</div>,
        },
        {
            category: intl.formatMessage({ id: "carousel.elearning.category" }),
            title: intl.formatMessage({ id: "carousel.elearning.title" }),
            src: "/images/services/elearning_1_11zon.jpg",
            content: <div className="text-muted-foreground">{intl.formatMessage({ id: "carousel.elearning.content" })}</div>,
        },
        {
            category: intl.formatMessage({ id: "carousel.compliance.category" }),
            title: intl.formatMessage({ id: "carousel.compliance.title" }),
            src: "/images/services/security_2_11zon.jpg",
            content: <div className="text-muted-foreground">{intl.formatMessage({ id: "carousel.compliance.content" })}</div>,
        },
        {
            category: intl.formatMessage({ id: "carousel.careers.category" }),
            title: intl.formatMessage({ id: "carousel.careers.title" }),
            src: "/images/services/teams_4_11zon.jpg",
            content: <div className="text-muted-foreground">{intl.formatMessage({ id: "carousel.careers.content" })}</div>,
        },
        {
            category: intl.formatMessage({ id: "carousel.blog.category" }),
            title: intl.formatMessage({ id: "carousel.blog.title" }),
            src: "/images/services/blog.avif",
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