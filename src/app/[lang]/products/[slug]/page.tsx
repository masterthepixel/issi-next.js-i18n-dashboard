import { ArrowLeft, CheckCircle, ExternalLink, Star } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';

import ProductsAuditReportingSystemFeaturesWrapper from '@/components/ProductsAuditReportingSystemFeaturesWrapper';
import ProductsBugTrackingSystemFeaturesWrapper from '@/components/ProductsBugTrackingSystemFeaturesWrapper';
import ProductsCaptureManagerFeaturesWrapper from '@/components/ProductsCaptureManagerFeaturesWrapper';
import ProductsCentralDataPlatformFeaturesWrapper from '@/components/ProductsCentralDataPlatformFeaturesWrapper';
import ProductsCompetencySkillsMatrixFeaturesWrapper from '@/components/ProductsCompetencySkillsMatrixFeaturesWrapper';
import ProductsComplaintTrackingSystemFeaturesWrapper from '@/components/ProductsComplaintTrackingSystemFeaturesWrapper';
import ProductsElectronicCorrespondenceTrackingSystemFeaturesWrapper from '@/components/ProductsElectronicCorrespondenceTrackingSystemFeaturesWrapper';
import ProductsEmployeePerformanceSystemFeaturesWrapper from '@/components/ProductsEmployeePerformanceSystemFeaturesWrapper';
import ProductsEmployeeTalentRepositoryFeaturesWrapper from '@/components/ProductsEmployeeTalentRepositoryFeaturesWrapper';
import ProductsEPermittingSystemFeaturesWrapper from '@/components/ProductsEPermittingSystemFeaturesWrapper';
import ProductsESurveyPlatformFeaturesWrapper from '@/components/ProductsESurveyPlatformFeaturesWrapper';
import ProductsExpenseTrackingSystemFeaturesWrapper from '@/components/ProductsExpenseTrackingSystemFeaturesWrapper';
import ProductsFormManagementSystemFeaturesWrapper from '@/components/ProductsFormManagementSystemFeaturesWrapper';
import ProductsGrantManagementSystemFeaturesWrapper from '@/components/ProductsGrantManagementSystemFeaturesWrapper';
import ProductsHRManagementSystemFeaturesWrapper from '@/components/ProductsHRManagementSystemFeaturesWrapper';
import ProductsICodeTestingPlatformFeaturesWrapper from '@/components/ProductsICodeTestingPlatformFeaturesWrapper';
import ProductsILearnSystemFeaturesWrapper from '@/components/ProductsILearnSystemFeaturesWrapper';
import ProductsInventoryAssetTrackingSystemFeaturesWrapper from '@/components/ProductsInventoryAssetTrackingSystemFeaturesWrapper';
import ProductsMeetingMinutesManagerFeaturesWrapper from '@/components/ProductsMeetingMinutesManagerFeaturesWrapper';
import ProductsMembershipDatabaseSubsidyPaymentSystemFeaturesWrapper from '@/components/ProductsMembershipDatabaseSubsidyPaymentSystemFeaturesWrapper';
import ProductsProfessionalManagementFeaturesWrapper from '@/components/ProductsProfessionalManagementFeaturesWrapper';
import ProductsProjectManagementSuiteFeaturesWrapper from '@/components/ProductsProjectManagementSuiteFeaturesWrapper';
import ProductsPrudentAgileMethodologyFeaturesWrapper from '@/components/ProductsPrudentAgileMethodologyFeaturesWrapper';
import ProductsRequirementsManagementSystemFeaturesWrapper from '@/components/ProductsRequirementsManagementSystemFeaturesWrapper';
import ProductsRSVPEventManagementFeaturesWrapper from '@/components/ProductsRSVPEventManagementFeaturesWrapper';
import ProductsTaskManagementSystemFeaturesWrapper from '@/components/ProductsTaskManagementSystemFeaturesWrapper';
import ProductsTimesheetManagementSystemFeaturesWrapper from '@/components/ProductsTimesheetManagementSystemFeaturesWrapper';
import ProductsTrainingDashboardFeaturesWrapper from '@/components/ProductsTrainingDashboardFeaturesWrapper';
import ProductsTrainingRecordsSystemFeaturesWrapper from '@/components/ProductsTrainingRecordsSystemFeaturesWrapper';
import ProductsVisitorLogSystemFeaturesWrapper from '@/components/ProductsVisitorLogSystemFeaturesWrapper';
import { Locale } from '@/lib/definitions';
import { getIntl } from '@/lib/intl';
import { getAllProducts, getProductBySlug } from '@/lib/products';

interface ProductPageProps {
  params: Promise<{
    lang: Locale;
    slug: string;
  }>;
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
  const { slug, lang } = await params;
  const product = await getProductBySlug(slug);

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
      url: `${baseUrl}/${lang}/products/${product.slug}`,
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
  const { slug, lang } = await params;

  if (slug === 'bug-tracking-system') {
    const intl = await getIntl(lang);
    return <ProductsBugTrackingSystemFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  if (slug === 'capture-manager') {
    const intl = await getIntl(lang);
    return <ProductsCaptureManagerFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  if (slug === 'electronic-correspondence-tracking-system') {
    const intl = await getIntl(lang);
    return <ProductsElectronicCorrespondenceTrackingSystemFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  if (slug === 'employee-performance-system') {
    const intl = await getIntl(lang);
    return <ProductsEmployeePerformanceSystemFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  if (slug === 'epermitting-system') {
    const intl = await getIntl(lang);
    return <ProductsEPermittingSystemFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  if (slug === 'grant-management-system') {
    const intl = await getIntl(lang);
    return <ProductsGrantManagementSystemFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  if (slug === 'hr-management-system') {
    const intl = await getIntl(lang);
    return <ProductsHRManagementSystemFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  if (slug === 'membership-database-subsidy-payment-system') {
    const intl = await getIntl(lang);
    return <ProductsMembershipDatabaseSubsidyPaymentSystemFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  if (slug === 'project-management-suite') {
    const intl = await getIntl(lang);
    return <ProductsProjectManagementSuiteFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  if (slug === 'prudent-agile-methodology') {
    const intl = await getIntl(lang);
    return <ProductsPrudentAgileMethodologyFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  if (slug === 'requirements-management-system') {
    const intl = await getIntl(lang);
    return <ProductsRequirementsManagementSystemFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  if (slug === 'task-management-system') {
    const intl = await getIntl(lang);
    return <ProductsTaskManagementSystemFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  if (slug === 'timesheet-management-system') {
    const intl = await getIntl(lang);
    return <ProductsTimesheetManagementSystemFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  if (slug === 'employee-talent-repository') {
    const intl = await getIntl(lang);
    return <ProductsEmployeeTalentRepositoryFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  if (slug === 'competency-skills-matrix') {
    const intl = await getIntl(lang);
    return <ProductsCompetencySkillsMatrixFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  if (slug === 'training-dashboard') {
    const intl = await getIntl(lang);
    return <ProductsTrainingDashboardFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  if (slug === 'i-learn-system') {
    const intl = await getIntl(lang);
    return <ProductsILearnSystemFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  if (slug === 'rsvp-event-management') {
    const intl = await getIntl(lang);
    return <ProductsRSVPEventManagementFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  if (slug === 'audit-reporting-system') {
    const intl = await getIntl(lang);
    return <ProductsAuditReportingSystemFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  if (slug === 'expense-tracking-system') {
    const intl = await getIntl(lang);
    return <ProductsExpenseTrackingSystemFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  if (slug === 'meeting-minutes-manager') {
    const intl = await getIntl(lang);
    return <ProductsMeetingMinutesManagerFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  if (slug === 'training-records-system') {
    const intl = await getIntl(lang);
    return <ProductsTrainingRecordsSystemFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  if (slug === 'central-data-platform') {
    const intl = await getIntl(lang);
    return <ProductsCentralDataPlatformFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  if (slug === 'e-survey-platform') {
    const intl = await getIntl(lang);
    return <ProductsESurveyPlatformFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  if (slug === 'form-management-system') {
    const intl = await getIntl(lang);
    return <ProductsFormManagementSystemFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  if (slug === 'i-code-testing-platform') {
    const intl = await getIntl(lang);
    return <ProductsICodeTestingPlatformFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  if (slug === 'professional-management-system') {
    const intl = await getIntl(lang);
    return <ProductsProfessionalManagementFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  if (slug === 'complaint-tracking-system') {
    const intl = await getIntl(lang);
    return <ProductsComplaintTrackingSystemFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  if (slug === 'inventory-asset-tracking-system') {
    const intl = await getIntl(lang);
    return <ProductsInventoryAssetTrackingSystemFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  if (slug === 'visitor-log-system') {
    const intl = await getIntl(lang);
    return <ProductsVisitorLogSystemFeaturesWrapper locale={lang} messages={intl.messages} />;
  }

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const IconComponent = product.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center space-x-2 text-muted-foreground">
            <li>
              <Link
                href={`/${lang}`}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <Link
                href={`/${lang}/products`}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Products
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span aria-current="page" className="text-slate-900 dark:text-slate-100 font-medium">
                {product.name}
              </span>
            </li>
          </ol>
        </nav>

        {/* Back Button */}
        <Link
          href={`/${lang}/products`}
          className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>

        {/* Product Header */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/20 border border-blue-200 dark:border-blue-800">
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
              <h1 className="lg:text-5xl dark: mb-4">
                {product.name}
              </h1>
              <p className="text-xl  " text-muted-foreground14924>
                {product.description}
              </p>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1  " text-caption15326
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA Section */}
            <div className="space-y-4 pt-6">
              <Link
                href={`/${lang}/contact?product=${product.slug}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Request Demo
              </Link>
              <p className="" text-caption16277>
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
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700">
                <h2 className="dark: mb-6 flex items-center">
                  <Star className="w-6 h-6 mr-3 text-yellow-500" />
                  Key Features
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div>
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-200 dark:border-slate-700">
                <h2 className="dark: mb-6">
                  Specifications
                </h2>
                <dl className="space-y-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="border-b border-slate-200 dark:border-slate-600 pb-3 last:border-b-0">
                      <dt className="" text-caption18184 text-muted-foreground18208>
                        {key}
                      </dt>
                      <dd className="text-slate-900 dark:text-slate-100">
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
            <div className="bg-gradient-to-r from-blue-50 to-blue-50 dark:from-blue-900/10 dark:to-blue-900/10 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
              <h2 className="dark: mb-6 text-center">
                Key Benefits
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {product.benefits.map((benefit, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 font-medium">
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
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 shadow-sm border border-slate-200 dark:border-slate-700">
            <h2 className="dark: mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl  " text-muted-foreground20051>
              Contact our team to learn more about {product.name} and how it can transform your operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${lang}/contact?product=${product.slug}`}
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
              >
                Contact Sales Team
              </Link>
              <Link
                href={`/${lang}/products`}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
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
