const fs = require('fs');
const path = require('path');

// Files that contain text-caption attributes that need to be cleaned
const filesToClean = [
    'src/components/AboutCertifications.tsx',
    'src/components/AboutStatsNew.tsx',
    'src/components/ComplianceCarousel.tsx',
    'src/components/ComplianceCertifications.tsx',
    'src/components/ComplianceIndustryCertifications.tsx',
    'src/components/ContactSalesForm.tsx',
    'src/components/DebugComponent.tsx',
    'src/components/ELearningHeader.tsx',
    'src/components/ELearningServices.tsx',
    'src/components/ELearningValueProposition.tsx',
    'src/components/Footer.tsx',
    'src/components/GovernmentHero.tsx',
    'src/components/GovernmentNAICSTable.tsx',
    'src/components/GovernmentTestimonial.tsx',
    'src/components/Hero.tsx',
    'src/components/HomePageGlobalHero.tsx',
    'src/components/IconShowcase.tsx',
    'src/components/ISSIServicesShowcase.tsx',
    'src/components/JobCard.tsx',
    'src/components/JobSearchFilters.tsx',
    'src/components/NewHomePageHero.tsx',
    'src/components/ProductsBentoGridNew.tsx',
    'src/components/TeamGrid.tsx',
    'src/components/TopNav.tsx',
    'src/components/applications/ApplicationForm.tsx',
    'src/components/auth/LoginForm.tsx',
    'src/components/auth/OnboardingForm.tsx',
    'src/components/careers/JobListings.tsx',
    'src/components/careers/JobFilters.tsx',
    'src/components/careers/JobCard.tsx',
    'src/app/[lang]/profile/page.tsx',
    'src/app/[lang]/profile/edit/page.tsx',
    'src/app/[lang]/profile/upload-resume/page.tsx',
    'src/app/[lang]/profile/applications/ApplicationDashboardClient.tsx',
    'src/app/[lang]/profile/setup/page.tsx',
    'src/app/[lang]/products/[slug]/page.tsx',
    'src/app/[lang]/infrastructure/page.tsx',
    'src/app/[lang]/jobs/create/page.tsx',
    'src/app/[lang]/jobs/JobListingPageClient.tsx',
    'src/app/[lang]/jobs/[id]/edit/page.tsx',
    'src/app/[lang]/jobs/manage/applications/HRApplicationsClient.tsx',
    'src/app/[lang]/glowing-stars-test/page.tsx',
    'src/app/[lang]/jobs/[id]/JobDetailPageClient.tsx',
    'src/app/[lang]/compliance/cmmi3/page.tsx',
    'src/app/[lang]/compliance/mdot/page.tsx',
    'src/app/[lang]/compliance/iso9001/page.tsx',
    // Additional files found with remaining text-caption attributes
    'src/app/[lang]/compliance/iso27001/page.tsx',
    'src/app/[lang]/card-demo/page.tsx',
    'src/app/[lang]/blog/page.tsx',
    'src/app/[lang]/blog/[slug]/page.tsx',
    // Jobs component files
    'src/components/jobs/JobCard.tsx',
    'src/components/jobs/JobListingForm.tsx',
    'src/components/jobs/JobListingPage.tsx',
    'src/components/jobs/JobSearchFilters.tsx',
    'src/components/jobs/Pagination.tsx',
    'src/components/jobs/RichTextRenderer.tsx',
    'src/components/jobs/JobsManagementDashboard.tsx',
    'src/components/jobs/JobDetailPage.tsx',
    // Navbar components
    'src/components/navbar/AppMenu.tsx',
    'src/components/navbar/DashboardNavbar.tsx',
    // Products components
    'src/components/products/ProductDetailsPage.tsx',
    // UI components
    'src/components/ui/accordion.tsx',
    'src/components/ui/bento-grid.tsx',
    'src/components/ui/error-boundary.tsx',
    'src/components/ui/evervault-card-demo.tsx',
    'src/components/ui/floating-navbar.tsx',
    'src/components/ui/FluidGlassNavbarV2.tsx',
    'src/components/ui/hover-gradient-nav-bar.tsx',
    'src/components/ui/infinite-moving-cards.tsx',
    'src/components/ui/Timeline.tsx'
];

function cleanTextCaptionAttributes(filePath) {
    try {
        const fullPath = path.resolve(filePath);
        if (!fs.existsSync(fullPath)) {
            console.log(`⚠️  File not found: ${filePath}`);
            return;
        }

        let content = fs.readFileSync(fullPath, 'utf8');
        const originalContent = content;

        // Remove text-caption attributes with numbers and optional values
        // Patterns to match:
        // text-caption3042
        // text-caption3042="true" 
        // text-caption3042={...}
        // text-caption3042 (standalone)

        // Match text-caption followed by numbers and optional value assignment
        const textCaptionRegex = /\s+text-caption\d+(?:="[^"]*"|={[^}]*}|="true"|="false")?/g;

        // Also match variations where there might be additional classes mixed in
        const mixedClassRegex = /\s+text-muted-foreground\d+/g;

        content = content.replace(textCaptionRegex, '');
        content = content.replace(mixedClassRegex, '');

        // Clean up any double spaces or trailing spaces in className attributes
        content = content.replace(/className="([^"]*)\s+"/g, (match, className) => {
            const cleanedClass = className.trim().replace(/\s+/g, ' ');
            return `className="${cleanedClass}"`;
        });

        if (content !== originalContent) {
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`✅ Cleaned: ${filePath}`);
        } else {
            console.log(`ℹ️  No changes needed: ${filePath}`);
        }
    } catch (error) {
        console.error(`❌ Error cleaning ${filePath}:`, error.message);
    }
}

console.log('🧹 Cleaning text-caption attributes from files...\n');

filesToClean.forEach(cleanTextCaptionAttributes);

console.log('\n✨ Text-caption cleanup complete!');
console.log('\n📝 Summary:');
console.log('- Removed all text-caption[number] attributes');
console.log('- Removed text-muted-foreground[number] attributes');
console.log('- Cleaned up className spacing');
console.log('\n💡 Note: If you need caption styling, use the CSS class "text-caption" in className instead');
