// Test script to verify all product URLs are working
// Run this with: node test-product-urls.js

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
  "mdsps": "multi-dimensional-system-planning-solution",
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

    req.setTimeout(5000, () => {
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

async function testAllProductUrls() {
  console.log('🚀 Testing all product URLs...\n');
  
  const baseUrl = 'http://localhost:3000/en/products';
  const results = [];
  
  for (let i = 0; i < productIds.length; i++) {
    const productId = productIds[i];
    const slug = productSlugMap[productId] || productId;
    const url = `${baseUrl}/${slug}`;
    
    console.log(`[${i + 1}/${productIds.length}] Testing: ${productId} -> ${slug}`);
    
    const result = await testUrl(url);
    results.push({
      productId,
      slug,
      ...result
    });
    
    console.log(`   ${result.success ? '✅' : '❌'} ${result.message}`);
  }
  
  console.log('\n📊 SUMMARY:');
  console.log('=' .repeat(80));
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Successful: ${successful.length}/${results.length}`);
  console.log(`❌ Failed: ${failed.length}/${results.length}`);
  
  if (failed.length > 0) {
    console.log('\n❌ FAILED URLs:');
    failed.forEach(result => {
      console.log(`   ${result.productId} -> ${result.url} (${result.message})`);
    });
  }
  
  console.log('\n✅ SUCCESSFUL URLs:');
  successful.forEach(result => {
    console.log(`   ${result.productId} -> ${result.slug}`);
  });
  
  console.log(`\n🎯 Overall Success Rate: ${Math.round((successful.length / results.length) * 100)}%`);
}

// Run the test
testAllProductUrls().catch(console.error);
