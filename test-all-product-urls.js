// Comprehensive test script to verify all product URLs across all locales
// Run this with: node test-all-product-urls.js

const https = require('https');
const http = require('http');

// All product IDs from BentoGrid
const productIds = [
  "gms",
  "ects",
  "ets",
  "mdsps",
  "project-management",
  "bug-tracking",
  "capture-manager",
  "prudent-agile",
  "task-management",
  "requirements-management",
  "hr-manager",
  "employee-performance",
  "timesheet-management",
  "employee-talent-repository",
  "competency-skills-matrix",
  "training-dashboard",
  "i-learn",
  "rsvp",
  "audit-reporting",
  "expense-tracking",
  "meeting-minutes-manager",
  "training-records",
  "central-data",
  "e-survey",
  "form-management",
  "i-code",
  "professional-management",
  "complaint-tracking",
  "inventory-asset-tracking",
  "visitor-log"
];

// Mapping from product IDs to slugs (from ProductsBentoGrid.tsx productSlugMap)
const productSlugMap = {
  "gms": "grant-management-system",
  "ects": "electronic-correspondence-tracking-system",
  "ets": "environmental-tracking-system",
  "mdsps": "membership-database-subsidy-payment-system",
  "project-management": "project-management-suite",
  "bug-tracking": "bug-tracking-system",
  "capture-manager": "capture-manager",
  "prudent-agile": "prudent-agile-methodology",
  "task-management": "task-management-system",
  "requirements-management": "requirements-management-system",
  "hr-manager": "hr-management-system",
  "employee-performance": "employee-performance-system",
  "timesheet-management": "timesheet-management-system",
  "employee-talent-repository": "employee-talent-repository",
  "competency-skills-matrix": "competency-skills-matrix",
  "training-dashboard": "training-dashboard",
  "i-learn": "i-learn-system",
  "rsvp": "rsvp-event-management",
  "audit-reporting": "audit-reporting-system",
  "expense-tracking": "expense-tracking-system",
  "meeting-minutes-manager": "meeting-minutes-manager",
  "training-records": "training-records-system",
  "central-data": "central-data-platform",
  "e-survey": "e-survey-platform",
  "form-management": "form-management-system",
  "i-code": "i-code-testing-platform",
  "professional-management": "professional-management-system",
  "complaint-tracking": "complaint-tracking-system",
  "inventory-asset-tracking": "inventory-asset-tracking-system",
  "visitor-log": "visitor-log-system"
};

// Supported locales (from i18n config)
const locales = ['en', 'es', 'fr'];

function testUrl(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;

    const req = protocol.get(url, (res) => {
      const status = res.statusCode;
      const success = status === 200;
      resolve({
        url,
        status,
        success,
        message: success ? 'SUCCESS' : `FAILED (${status})`
      });
    });

    req.on('error', (err) => {
      resolve({
        url,
        status: 'ERROR',
        success: false,
        message: `ERROR: ${err.message}`
      });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        url,
        status: 'TIMEOUT',
        success: false,
        message: 'TIMEOUT'
      });
    });
  });
}

async function testProductUrlsForLocale(locale) {
  console.log(`\n🌍 Testing ${locale.toUpperCase()} locale...`);
  console.log('='.repeat(50));

  const baseUrl = `http://localhost:3000/${locale}/products`;
  const results = [];

  for (let i = 0; i < productIds.length; i++) {
    const productId = productIds[i];
    const slug = productSlugMap[productId] || productId;
    const url = `${baseUrl}/${slug}`;

    const result = await testUrl(url);
    results.push({
      locale,
      productId,
      slug,
      ...result
    });

    if (i % 10 === 0 || i === productIds.length - 1) {
      console.log(`Progress: ${i + 1}/${productIds.length} (${Math.round(((i + 1) / productIds.length) * 100)}%)`);
    }
  }

  return results;
}

async function testAllLocales() {
  console.log('🚀 Testing all product URLs across all locales...');
  console.log(`📋 Testing ${productIds.length} products across ${locales.length} locales (${productIds.length * locales.length} total URLs)`);

  const allResults = [];

  for (const locale of locales) {
    const localeResults = await testProductUrlsForLocale(locale);
    allResults.push(...localeResults);
  }

  // Generate comprehensive summary
  console.log('\n📊 COMPREHENSIVE SUMMARY');
  console.log('='.repeat(80));

  const successful = allResults.filter(r => r.success);
  const failed = allResults.filter(r => !r.success);

  console.log(`✅ Total Successful: ${successful.length}/${allResults.length}`);
  console.log(`❌ Total Failed: ${failed.length}/${allResults.length}`);
  console.log(`🎯 Overall Success Rate: ${Math.round((successful.length / allResults.length) * 100)}%`);

  // Summary by locale
  console.log('\n📍 SUCCESS BY LOCALE:');
  for (const locale of locales) {
    const localeResults = allResults.filter(r => r.locale === locale);
    const localeSuccessful = localeResults.filter(r => r.success);
    const successRate = Math.round((localeSuccessful.length / localeResults.length) * 100);
    console.log(`   ${locale.toUpperCase()}: ${localeSuccessful.length}/${localeResults.length} (${successRate}%)`);
  }

  if (failed.length > 0) {
    console.log('\n❌ FAILED URLs:');
    failed.forEach(result => {
      console.log(`   [${result.locale}] ${result.productId} -> ${result.url} (${result.message})`);
    });
  }

  // Sample successful URLs for verification
  console.log('\n✅ SAMPLE SUCCESSFUL URLs (first 10):');
  successful.slice(0, 10).forEach(result => {
    console.log(`   [${result.locale}] ${result.productId} -> /${result.locale}/products/${result.slug}`);
  });

  if (successful.length > 10) {
    console.log(`   ... and ${successful.length - 10} more successful URLs`);
  }

  return {
    total: allResults.length,
    successful: successful.length,
    failed: failed.length,
    successRate: Math.round((successful.length / allResults.length) * 100),
    byLocale: locales.map(locale => {
      const localeResults = allResults.filter(r => r.locale === locale);
      const localeSuccessful = localeResults.filter(r => r.success);
      return {
        locale,
        total: localeResults.length,
        successful: localeSuccessful.length,
        successRate: Math.round((localeSuccessful.length / localeResults.length) * 100)
      };
    })
  };
}

// Run the comprehensive test
if (require.main === module) {
  testAllLocales()
    .then(summary => {
      console.log('\n🎉 Test completed!');
      if (summary.successRate === 100) {
        console.log('🌟 All product URLs are working perfectly across all locales!');
      } else {
        console.log(`⚠️  ${summary.failed} URLs need attention.`);
        process.exit(1);
      }
    })
    .catch(err => {
      console.error('❌ Test failed:', err);
      process.exit(1);
    });
}

module.exports = { testAllLocales, productIds, productSlugMap };
