'use client'

import { Locale } from '@/lib/definitions';
import dynamic from 'next/dynamic';
import { IntlProvider } from 'react-intl';

const ProductsEPermittingSystemFeatures = dynamic(() => import('./ProductsEPermittingSystemFeatures'));

interface ProductsEPermittingSystemFeaturesWrapperProps {
    locale: Locale;
    messages: Record<string, string> | Record<string, any>;
}

export default function ProductsEPermittingSystemFeaturesWrapper({
    locale,
    messages
}: ProductsEPermittingSystemFeaturesWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <ProductsEPermittingSystemFeatures />
        </IntlProvider>
    );
}
