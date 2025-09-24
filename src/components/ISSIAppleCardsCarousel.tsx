"use client";

import { Card } from "@/components/ui/apple-cards-carousel";
import { useIntl } from "react-intl";
import { InfiniteSlider } from "../../components/motion-primitives/infinite-slider";
import { ProgressiveBlur } from "../../components/motion-primitives/progressive-blur";

const ISSIAppleCardsCarousel = () => {
    const intl = useIntl();

    const cards = [
        {
            category: intl.formatMessage({ id: "carousel.products.category" }),
            title: intl.formatMessage({ id: "carousel.products.title" }),
            src: "/images/services/products_3_11zon.jpg",
            content: <div className="text-muted-foreground">{intl.formatMessage({ id: "carousel.products.content" })}</div>,
            link: "/products",
        },
        {
            category: intl.formatMessage({ id: "carousel.government.category" }),
            title: intl.formatMessage({ id: "carousel.government.title" }),
            src: "/images/services/publicsector_5_11zon.jpg",
            content: <div className="text-muted-foreground">{intl.formatMessage({ id: "carousel.government.content" })}</div>,
            link: "/government",
        },
        {
            category: intl.formatMessage({ id: "carousel.elearning.category" }),
            title: intl.formatMessage({ id: "carousel.elearning.title" }),
            src: "/images/services/elearning_1_11zon.jpg",
            content: <div className="text-muted-foreground">{intl.formatMessage({ id: "carousel.elearning.content" })}</div>,
            link: "/eLearning",
        },
        {
            category: intl.formatMessage({ id: "carousel.compliance.category" }),
            title: intl.formatMessage({ id: "carousel.compliance.title" }),
            src: "/images/services/security_2_11zon.jpg",
            content: <div className="text-muted-foreground">{intl.formatMessage({ id: "carousel.compliance.content" })}</div>,
            link: "/compliance",
        },
        {
            category: intl.formatMessage({ id: "carousel.careers.category" }),
            title: intl.formatMessage({ id: "carousel.careers.title" }),
            src: "/images/services/teams_4_11zon.jpg",
            content: <div className="text-muted-foreground">{intl.formatMessage({ id: "carousel.careers.content" })}</div>,
            link: "/careers",
        },
        {
            category: intl.formatMessage({ id: "carousel.blog.category" }),
            title: intl.formatMessage({ id: "carousel.blog.title" }),
            src: "/images/services/blog.avif",
            content: <div className="text-muted-foreground">{intl.formatMessage({ id: "carousel.blog.content" })}</div>,
            link: "/blog",
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
            <div className="relative w-full overflow-hidden">
                <InfiniteSlider
                    gap={24}
                    speed={50}
                    speedOnHover={10}
                    className="w-full"
                >
                    {items}
                </InfiniteSlider>
                <ProgressiveBlur
                    className="pointer-events-none absolute top-0 left-0 h-full w-[200px]"
                    direction="left"
                    blurIntensity={1}
                />
                <ProgressiveBlur
                    className="pointer-events-none absolute top-0 right-0 h-full w-[200px]"
                    direction="right"
                    blurIntensity={1}
                />
            </div>
        </div>
    );
};

export default ISSIAppleCardsCarousel;