'use client'

import { Locale } from '@/lib/definitions';
import dynamic from 'next/dynamic';
import { IntlProvider } from 'react-intl';

const ProductsElectronicCorrespondenceTrackingSystemFeatures = dynamic(() => import('./ProductsElectronicCorrespondenceTrackingSystemFeatures'));

interface ProductsElectronicCorrespondenceTrackingSystemFeaturesWrapperProps {
    locale: Locale;
    messages: Record<string, string> | Record<string, any>;
}

export default function ProductsElectronicCorrespondenceTrackingSystemFeaturesWrapper({
    locale,
    messages
}: ProductsElectronicCorrespondenceTrackingSystemFeaturesWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <ProductsElectronicCorrespondenceTrackingSystemFeatures />
        </IntlProvider>
    );
}
