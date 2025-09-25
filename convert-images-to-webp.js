#!/usr/bin/env node

/**
 * Convert all images in public/images directory to WebP format using Sharp
 * Usage: node convert-images-to-webp.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import sharp from 'sharp';

// Configuration
const config = {
    sourceDir: path.join(__dirname, 'public', 'images'),
    quality: 85,
    logFile: 'conversion-log.txt',
    supportedFormats: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp']
};

// Global counters
let totalFiles = 0;
let processedFiles = 0;
let successCount = 0;
let failedCount = 0;

// Log file content
let logContent = `Image Conversion Log - ${new Date().toISOString()}\n`;
logContent += '=========================================\n';

/**
 * Check if file has supported image extension
 */
function isImageFile(filename) {
    const ext = path.extname(filename).toLowerCase();
    return config.supportedFormats.includes(ext);
}

/**
 * Convert image to WebP format
 */
async function convertImage(inputPath, outputPath) {
    try {
        // Get original file info
        const originalStats = fs.statSync(inputPath);
        const originalSize = originalStats.size;

        // Convert to WebP
        await sharp(inputPath)
            .webp({ quality: config.quality })
            .toFile(outputPath);

        // Get converted file info
        const convertedStats = fs.statSync(outputPath);
        const newSize = convertedStats.size;
        const reduction = Math.round((1 - (newSize / originalSize)) * 100);

        return {
            success: true,
            originalSize,
            newSize,
            reduction,
            outputPath
        };
    } catch (error) {
        throw new Error(`Conversion failed: ${error.message}`);
    }
}

/**
 * Process all images in directory and subdirectories
 */
async function processDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            // Recursively process subdirectories
            await processDirectory(fullPath);
        } else if (isImageFile(file)) {
            totalFiles++;
            await processImage(fullPath, dirPath, file);
        }
    }
}

/**
 * Process a single image file
 */
async function processImage(inputPath, directory, filename) {
    const ext = path.extname(filename).toLowerCase();

    // Skip if already WebP
    if (ext === '.webp') {
        console.log(`  - Skipping: ${filename} (already WebP)`);
        return;
    }

    const baseName = path.parse(filename).name;
    const outputPath = path.join(directory, `${baseName}.webp`);

    processedFiles++;
    const progress = Math.round((processedFiles / totalFiles) * 100);

    console.log(`[${progress}%] Processing: ${filename}`);

    try {
        const result = await convertImage(inputPath, outputPath);

        console.log(`  ✓ Success: ${Math.round(result.originalSize / 1024)} KB -> ${Math.round(result.newSize / 1024)} KB (${result.reduction}% reduction)`);

        // Remove original file after successful conversion
        fs.unlinkSync(inputPath);
        console.log(`  🗑️  Removed original: ${filename}`);

        // Log success
        logContent += `SUCCESS: ${inputPath}\n`;
        logContent += `  Original: ${Math.round(result.originalSize / 1024)} KB\n`;
        logContent += `  WebP: ${Math.round(result.newSize / 1024)} KB\n`;
        logContent += `  Reduction: ${result.reduction}%\n`;
        logContent += `  Original removed: Yes\n`;
        logContent += `----------------------------------------\n`;

        successCount++;
    } catch (error) {
        console.log(`  ✗ Failed: ${error.message}`);

        // Log failure
        logContent += `FAILED: ${inputPath}\n`;
        logContent += `  Error: ${error.message}\n`;
        logContent += `----------------------------------------\n`;

        failedCount++;
    }
}

/**
 * Main function
 */
async function main() {
    console.log('🚀 Starting WebP conversion with Sharp...');
    console.log(`📁 Source directory: ${config.sourceDir}`);
    console.log(`🎯 Quality: ${config.quality}%`);
    console.log('');

    try {
        // Check if source directory exists
        if (!fs.existsSync(config.sourceDir)) {
            console.error(`❌ Error: Source directory not found: ${config.sourceDir}`);
            console.error('Please make sure the public/images directory exists');
            process.exit(1);
        }

        // Check if sharp is installed
        try {
            sharp('test');
        } catch (error) {
            console.error('❌ Error: Sharp is not installed or not working');
            console.error('Please install sharp with: npm install sharp');
            process.exit(1);
        }

        // Count total files first
        console.log('🔍 Scanning for image files...');
        await countFiles(config.sourceDir);

        if (totalFiles === 0) {
            console.log('⚠️  No image files found in the specified directory');
            process.exit(0);
        }

        console.log(`📊 Found ${totalFiles} image files to convert`);
        console.log('');

        // Process all images
        await processDirectory(config.sourceDir);

        // Generate summary
        const summary = `
=========================================
CONVERSION SUMMARY
=========================================
Total files found: ${totalFiles}
Successful conversions: ${successCount}
Failed conversions: ${failedCount}
Completion time: ${new Date().toISOString()}
Quality setting: ${config.quality}%
=========================================
`;

        console.log(summary);
        logContent += summary;

        // Save log file
        fs.writeFileSync(config.logFile, logContent, 'utf8');
        console.log(`📝 Conversion log saved to: ${config.logFile}`);

        console.log('🎉 Conversion process completed!');

    } catch (error) {
        console.error(`❌ Fatal error: ${error.message}`);
        process.exit(1);
    }
}

/**
 * Count total files (for progress tracking)
 */
async function countFiles(dirPath) {
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            await countFiles(fullPath);
        } else if (isImageFile(file)) {
            totalFiles++;
        }
    }
}


// Run the script
main().catch(console.error);

export { config, convertImage, processDirectory };

