#!/usr/bin/env node

/**
 * Performance Optimization Script
 * 
 * This script helps identify and fix common performance issues:
 * 1. Unused CSS analysis
 * 2. Large bundle analysis
 * 3. Image optimization recommendations
 * 4. Critical path optimization
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting Performance Optimization Analysis...\n');

// 1. Bundle Analysis
console.log('📦 Analyzing bundle sizes...');
try {
    execSync('npx @next/bundle-analyzer', { stdio: 'inherit' });
} catch (error) {
    console.log('Bundle analyzer not available. Install with: npm install @next/bundle-analyzer');
}

// 2. Check for unused dependencies
console.log('\n📋 Checking for unused dependencies...');
try {
    execSync('npx depcheck', { stdio: 'inherit' });
} catch (error) {
    console.log('Depcheck not available. Install with: npm install -g depcheck');
}

// 3. Image optimization recommendations
console.log('\n🖼️  Analyzing images for optimization...');
const imageDir = path.join(process.cwd(), 'public', 'images');

function analyzeImages(dir) {
    if (!fs.existsSync(dir)) {
        console.log('Images directory not found');
        return;
    }

    const files = fs.readdirSync(dir, { withFileTypes: true });
    const largeImages = [];

    files.forEach(file => {
        if (file.isDirectory()) {
            analyzeImages(path.join(dir, file.name));
        } else if (file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
            const filePath = path.join(dir, file.name);
            const stats = fs.statSync(filePath);
            const sizeInMB = (stats.size / (1024 * 1024)).toFixed(2);

            if (stats.size > 500000) { // > 500KB
                largeImages.push({
                    path: filePath.replace(process.cwd(), ''),
                    size: `${sizeInMB}MB`
                });
            }
        }
    });

    if (largeImages.length > 0) {
        console.log('\n⚠️  Large images found (>500KB):');
        largeImages.forEach(img => {
            console.log(`  - ${img.path} (${img.size})`);
        });
        console.log('\n💡 Consider optimizing these images:');
        console.log('  - Use WebP format for better compression');
        console.log('  - Resize images to appropriate dimensions');
        console.log('  - Use next/image with proper sizes prop');
    } else {
        console.log('✅ No large images found');
    }
}

analyzeImages(imageDir);

// 4. CSS Analysis
console.log('\n🎨 CSS Optimization Tips:');
console.log('  - Use CSS modules to reduce unused CSS');
console.log('  - Consider using Tailwind JIT mode');
console.log('  - Remove unused utility classes');
console.log('  - Inline critical CSS for above-the-fold content');

// 5. JavaScript Optimization
console.log('\n⚡ JavaScript Optimization Tips:');
console.log('  - Use dynamic imports for code splitting');
console.log('  - Lazy load components not visible on initial load');
console.log('  - Remove console.log statements in production');
console.log('  - Use React.memo for expensive components');

// 6. Performance Checklist
console.log('\n✅ Performance Checklist:');
const checklist = [
    'Images have width/height attributes to prevent layout shift',
    'Critical images use priority and fetchPriority="high"',
    'Non-critical images use loading="lazy"',
    'Fonts are preloaded with preconnect hints',
    'Bundle is split into smaller chunks',
    'Unused dependencies are removed',
    'CSS is optimized and unused styles removed',
    'JavaScript is minified and tree-shaken'
];

checklist.forEach((item, index) => {
    console.log(`  ${index + 1}. ${item}`);
});

console.log('\n🎯 Next Steps:');
console.log('  1. Run: npm run build -- --analyze');
console.log('  2. Test with: npm run lighthouse');
console.log('  3. Monitor Core Web Vitals in production');
console.log('  4. Use Next.js DevTools for runtime analysis');

console.log('\n✨ Performance optimization analysis complete!');
