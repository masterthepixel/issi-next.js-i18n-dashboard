import { ArrowLeft, CheckCircle, ExternalLink, Star } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

import ProductsBugTrackingSystemFeaturesWrapper from '@/components/ProductsBugTrackingSystemFeaturesWrapper';
import ProductsCaptureManagerFeaturesWrapper from '@/components/ProductsCaptureManagerFeaturesWrapper';
import ProductsElectronicCorrespondenceTrackingSystemFeaturesWrapper from '@/components/ProductsElectronicCorrespondenceTrackingSystemFeaturesWrapper';
import ProductsEPermittingSystemFeaturesWrapper from '@/components/ProductsEPermittingSystemFeaturesWrapper';
import ProductsGrantManagementSystemFeaturesWrapper from '@/components/ProductsGrantManagementSystemFeaturesWrapper';
import ProductsMembershipDatabaseSubsidyPaymentSystemFeaturesWrapper from '@/components/ProductsMembershipDatabaseSubsidyPaymentSystemFeaturesWrapper';
import ProductsProjectManagementSuiteFeaturesWrapper from '@/components/ProductsProjectManagementSuiteFeaturesWrapper';
import ProductsPrudentAgileMethodologyFeaturesWrapper from '@/components/ProductsPrudentAgileMethodologyFeaturesWrapper';
import ProductsTaskManagementSystemFeaturesWrapper from '@/components/ProductsTaskManagementSystemFeaturesWrapper';
import { Locale } from '@/lib/definitions';
import { getIntl } from '@/lib/intl';
import { getAllProducts, getProductBySlug } from '@/lib/products';

interface ProductPageProps {
  params: {
    lang: Locale;
    slug: string;
  };
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  const locales: Locale[] = ['en', 'fr', 'es'];

  const paths = locales.flatMap(lang =>
    products.map(product => ({
      lang,
      slug: product.slug
    }))
  );

  return paths;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.'
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://issi.com';

  return {
    title: `${product.name} | ISSI Enterprise Solutions`,
    description: product.description,
    keywords: product.tags?.join(', '),
    openGraph: {
      title: product.name,
      description: product.description,
      url: `${baseUrl}/${params.lang}/products/${product.slug}`,
      siteName: 'ISSI - International Software Systems',
      images: [
        {
          url: product.image || `${baseUrl}/images/products-og.jpg`,
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.image || `${baseUrl}/images/products-og.jpg`],
    },
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  if (params.slug === 'bug-tracking-system') {
    const intl = await getIntl(params.lang);
    return <ProductsBugTrackingSystemFeaturesWrapper locale={params.lang} messages={intl.messages} />;
  }

  if (params.slug === 'capture-manager') {
    const intl = await getIntl(params.lang);
    return <ProductsCaptureManagerFeaturesWrapper locale={params.lang} messages={intl.messages} />;
  }

  if (params.slug === 'electronic-correspondence-tracking-system') {
    const intl = await getIntl(params.lang);
    return <ProductsElectronicCorrespondenceTrackingSystemFeaturesWrapper locale={params.lang} messages={intl.messages} />;
  }

  if (params.slug === 'epermitting-system') {
    const intl = await getIntl(params.lang);
    return <ProductsEPermittingSystemFeaturesWrapper locale={params.lang} messages={intl.messages} />;
  }

  if (params.slug === 'grant-management-system') {
    const intl = await getIntl(params.lang);
    return <ProductsGrantManagementSystemFeaturesWrapper locale={params.lang} messages={intl.messages} />;
  }

  if (params.slug === 'membership-database-subsidy-payment-system') {
    const intl = await getIntl(params.lang);
    return <ProductsMembershipDatabaseSubsidyPaymentSystemFeaturesWrapper locale={params.lang} messages={intl.messages} />;
  }

  if (params.slug === 'project-management-suite') {
    const intl = await getIntl(params.lang);
    return <ProductsProjectManagementSuiteFeaturesWrapper locale={params.lang} messages={intl.messages} />;
  }

  if (params.slug === 'prudent-agile-methodology') {
    const intl = await getIntl(params.lang);
    return <ProductsPrudentAgileMethodologyFeaturesWrapper locale={params.lang} messages={intl.messages} />;
  }

  if (params.slug === 'task-management-system') {
    const intl = await getIntl(params.lang);
    return <ProductsTaskManagementSystemFeaturesWrapper locale={params.lang} messages={intl.messages} />;
  }

  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const IconComponent = product.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link
                href={`/${params.lang}`}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <Link
                href={`/${params.lang}/products`}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Products
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span aria-current="page" className="text-gray-900 dark:text-gray-100 font-medium">
                {product.name}
              </span>
            </li>
          </ol>
        </nav>

        {/* Back Button */}
        <Link
          href={`/${params.lang}/products`}
          className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>

        {/* Product Header */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  {IconComponent && (
                    <IconComponent className="w-32 h-32 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
              )}
            </div>

            {/* Category Badge */}
            {product.category && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full border border-blue-200 dark:border-blue-700">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </span>
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA Section */}
            <div className="space-y-4 pt-6">
              <Link
                href={`/${params.lang}/contact?product=${product.slug}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Request Demo
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get a personalized demonstration of this solution
              </p>
            </div>
          </div>
        </div>

        {/* Product Details Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Star className="w-6 h-6 mr-3 text-yellow-500" />
                  Key Features
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Specifications
                </h2>
                <dl className="space-y-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="border-b border-gray-200 dark:border-gray-600 pb-3 last:border-b-0">
                      <dt className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1">
                        {key}
                      </dt>
                      <dd className="text-gray-900 dark:text-gray-100">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          )}
        </div>

        {/* Benefits Section */}
        {product.benefits && product.benefits.length > 0 && (
          <div className="mt-12">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Key Benefits
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {product.benefits.map((benefit, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Contact our team to learn more about {product.name} and how it can transform your operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${params.lang}/contact?product=${product.slug}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                Contact Sales Team
              </Link>
              <Link
                href={`/${params.lang}/products`}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              >
                View All Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
