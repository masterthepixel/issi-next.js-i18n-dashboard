#!/usr/bin/env node

/**
 * Icon Export Organizer
 * Moves exported icons from figma-files to proper svg-exports directory
 */

const fs = require('fs').promises;
const path = require('path');

async function organizeExportedIcons() {
    console.log('🔄 Organizing exported icons...');

    const figmaFilesDir = './figma-files';
    const svgExportsDir = './src/components/icons/svg-exports';

    try {
        // Check for exported icons in figma-files
        const figmaContents = await fs.readdir(figmaFilesDir);
        console.log('📁 Found in figma-files:', figmaContents);

        // Look for folders that might contain icons
        for (const item of figmaContents) {
            if (item.endsWith('.fig') || item === 'README.md') continue;

            const itemPath = path.join(figmaFilesDir, item);
            try {
                const stat = await fs.stat(itemPath);
                if (stat.isDirectory()) {
                    console.log(`📂 Processing directory: ${item}`);
                    await processIconDirectory(itemPath, item, svgExportsDir);
                }
            } catch (error) {
                console.log(`⚠️  Could not access ${item}:`, error.message);
            }
        }

    } catch (error) {
        console.error('❌ Error organizing icons:', error.message);
    }
}

async function processIconDirectory(sourceDir, dirName, targetBaseDir) {
    try {
        const contents = await fs.readdir(sourceDir);
        console.log(`📋 Contents of ${dirName}:`, contents);

        for (const item of contents) {
            const itemPath = path.join(sourceDir, item);
            const stat = await fs.stat(itemPath);

            if (stat.isDirectory()) {
                // This might be a style folder (Bold, Linear, Outline)
                console.log(`🎨 Processing style folder: ${item}`);
                await processStyleFolder(itemPath, item, targetBaseDir);
            } else if (item.endsWith('.svg')) {
                // Direct SVG file
                console.log(`📄 Found SVG: ${item}`);
                await copySvgFile(itemPath, item, targetBaseDir, 'general');
            }
        }
    } catch (error) {
        console.error(`❌ Error processing ${dirName}:`, error.message);
    }
}

async function processStyleFolder(styleDir, styleName, targetBaseDir) {
    try {
        const svgFiles = await fs.readdir(styleDir);
        console.log(`🎯 SVG files in ${styleName}:`, svgFiles.filter(f => f.endsWith('.svg')));

        // Create target directory for this style
        const targetDir = path.join(targetBaseDir, styleName.toLowerCase());
        await fs.mkdir(targetDir, { recursive: true });

        for (const file of svgFiles) {
            if (file.endsWith('.svg')) {
                const sourcePath = path.join(styleDir, file);
                const targetPath = path.join(targetDir, file);

                try {
                    await fs.copyFile(sourcePath, targetPath);
                    console.log(`✅ Copied: ${file} → ${styleName.toLowerCase()}/`);
                } catch (error) {
                    console.error(`❌ Failed to copy ${file}:`, error.message);
                }
            }
        }
    } catch (error) {
        console.error(`❌ Error processing style ${styleName}:`, error.message);
    }
}

async function copySvgFile(sourcePath, fileName, targetBaseDir, category) {
    const targetDir = path.join(targetBaseDir, category);
    await fs.mkdir(targetDir, { recursive: true });

    const targetPath = path.join(targetDir, fileName);
    try {
        await fs.copyFile(sourcePath, targetPath);
        console.log(`✅ Copied: ${fileName} → ${category}/`);
    } catch (error) {
        console.error(`❌ Failed to copy ${fileName}:`, error.message);
    }
}

// Run the organizer
if (require.main === module) {
    organizeExportedIcons();
}

module.exports = { organizeExportedIcons };
