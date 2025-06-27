// Simple test to check what URLs the BentoGrid should generate vs what pages exist
// Run this with: node debug-urls.js

const productIds = [
  "gms",
  "i-learn",
  "audit-reporting",
  "expense-tracking",
  "rsvp"
];

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

console.log('🔍 URL Analysis:');
console.log('===============');

productIds.forEach(productId => {
  const mappedSlug = productSlugMap[productId];
  const fallbackSlug = productId;

  console.log(`\n📦 Product ID: ${productId}`);
  console.log(`   🎯 Should generate: /en/products/${mappedSlug || fallbackSlug}`);
  console.log(`   ❌ Currently generates: /en/products/${fallbackSlug} (if mapping fails)`);
  console.log(`   ✅ Mapping exists: ${mappedSlug ? 'YES' : 'NO'}`);

  if (mappedSlug) {
    console.log(`   📍 Correct URL: http://localhost:3000/en/products/${mappedSlug}`);
  }
});
