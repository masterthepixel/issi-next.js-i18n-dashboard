import dynamic from 'next/dynamic';

const ProductsElectronicCorrespondenceTrackingSystemFeatures = dynamic(() => import('./ProductsElectronicCorrespondenceTrackingSystemFeatures'));

export default function ProductsElectronicCorrespondenceTrackingSystemFeaturesWrapper() {
    return <ProductsElectronicCorrespondenceTrackingSystemFeatures />;
}
