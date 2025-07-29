#!/usr/bin/env node

/**
 * Figma Icon Importer for Community Files
 * Imports icons from Figma community files and converts them to React components
 */

const fs = require('fs').promises;
const path = require('path');

// Extract file ID from Figma URL
function extractFileId(figmaUrl) {
    const match = figmaUrl.match(/\/file\/([a-zA-Z0-9]+)/);
    return match ? match[1] : null;
}

// Convert Figma icon name to valid React component name
function toComponentName(name) {
    return name
        .replace(/[^a-zA-Z0-9]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('')
        .replace(/^[0-9]/, 'Icon$&'); // Prefix with 'Icon' if starts with number
}

// Generate React component from SVG
function generateReactComponent(iconName, svgContent, category = 'general') {
    const componentName = toComponentName(iconName);

    // Clean and optimize SVG content
    const cleanSvg = svgContent
        .replace(/<svg[^>]*>/, '') // Remove opening SVG tag
        .replace(/<\/svg>/, '')    // Remove closing SVG tag
        .replace(/fill="[^"]*"/g, 'fill={color}') // Make fill dynamic
        .replace(/stroke="[^"]*"/g, 'stroke={color}') // Make stroke dynamic
        .replace(/class="/g, 'className="') // Convert to JSX
        .trim();

    // Extract viewBox from original SVG
    const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

    return `import React from 'react';

/**
 * ${iconName} Icon
 * Category: ${category}
 * From Figma Community File
 */
interface ${componentName}Props {
  size?: number;
  className?: string;
  color?: string;
  strokeWidth?: number;
}

const ${componentName}: React.FC<${componentName}Props> = ({ 
  size = 24, 
  className = "", 
  color = "currentColor",
  strokeWidth = 1.5
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="${viewBox}"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      strokeWidth={strokeWidth}
    >
      ${cleanSvg}
    </svg>
  );
};

export default ${componentName};`;
}

// Fetch icons from Figma API
async function fetchFigmaFile(fileId, accessToken) {
    const url = `https://api.figma.com/v1/files/${fileId}`;

    try {
        const response = await fetch(url, {
            headers: {
                'X-Figma-Token': accessToken,
            },
        });

        if (!response.ok) {
            throw new Error(`Figma API error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('❌ Failed to fetch Figma file:', error.message);
        throw error;
    }
}

// Extract all icon components from Figma file
function extractIcons(figmaData) {
    const icons = [];

    function traverse(node, path = []) {
        if (node.type === 'COMPONENT' || node.type === 'INSTANCE') {
            // Check if this looks like an icon (you may need to adjust this logic)
            if (node.name && !node.name.includes('Frame') && !node.name.includes('Page')) {
                icons.push({
                    id: node.id,
                    name: node.name,
                    category: path[0] || 'general',
                    node: node
                });
            }
        }

        if (node.children) {
            for (const child of node.children) {
                traverse(child, [...path, node.name]);
            }
        }
    }

    if (figmaData.document) {
        traverse(figmaData.document);
    }

    return icons;
}

// Fetch SVG exports for icons
async function fetchSvgExports(fileId, nodeIds, accessToken) {
    const idsParam = nodeIds.join(',');
    const url = `https://api.figma.com/v1/images/${fileId}?ids=${idsParam}&format=svg&use_absolute_bounds=true`;

    try {
        const response = await fetch(url, {
            headers: {
                'X-Figma-Token': accessToken,
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch SVG exports: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('❌ Failed to fetch SVG exports:', error.message);
        throw error;
    }
}

// Download SVG content
async function downloadSvg(svgUrl) {
    try {
        const response = await fetch(svgUrl);
        if (!response.ok) {
            throw new Error(`Failed to download SVG: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        console.error('❌ Failed to download SVG:', error.message);
        throw error;
    }
}

// Main import function
async function importFigmaIcons(figmaUrl, accessToken, outputDir) {
    const fileId = extractFileId(figmaUrl);
    if (!fileId) {
        throw new Error('Invalid Figma URL. Could not extract file ID.');
    }

    console.log('🎨 Starting Figma icon import...');
    console.log(`📁 File ID: ${fileId}`);
    console.log(`📂 Output directory: ${outputDir}`);

    // Fetch Figma file data
    console.log('🔍 Fetching Figma file data...');
    const figmaData = await fetchFigmaFile(fileId, accessToken);

    // Extract icon components
    console.log('🔍 Extracting icon components...');
    const icons = extractIcons(figmaData);
    console.log(`✅ Found ${icons.length} potential icons`);

    if (icons.length === 0) {
        console.log('⚠️  No icons found in the file');
        return;
    }

    // Batch export SVGs (Figma API has limits, so we'll do batches of 100)
    const batchSize = 100;
    const components = [];

    for (let i = 0; i < icons.length; i += batchSize) {
        const batch = icons.slice(i, i + batchSize);
        const nodeIds = batch.map(icon => icon.id);

        console.log(`📥 Fetching SVG exports for batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(icons.length / batchSize)}...`);

        try {
            const svgExports = await fetchSvgExports(fileId, nodeIds, accessToken);

            for (const icon of batch) {
                const svgUrl = svgExports.images[icon.id];
                if (svgUrl) {
                    console.log(`⬇️  Downloading ${icon.name}...`);
                    const svgContent = await downloadSvg(svgUrl);
                    const componentCode = generateReactComponent(icon.name, svgContent, icon.category);

                    components.push({
                        name: toComponentName(icon.name),
                        filename: `${toComponentName(icon.name)}.tsx`,
                        code: componentCode,
                        category: icon.category
                    });
                }
            }
        } catch (error) {
            console.error(`❌ Failed to process batch starting at ${i}:`, error.message);
        }

        // Rate limiting - wait a bit between batches
        if (i + batchSize < icons.length) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    // Create output directory
    try {
        await fs.mkdir(outputDir, { recursive: true });
    } catch (error) {
        // Directory might already exist
    }

    // Write component files
    console.log('📝 Writing React components...');
    for (const component of components) {
        const filePath = path.join(outputDir, component.filename);
        await fs.writeFile(filePath, component.code);
        console.log(`✅ Created ${component.filename}`);
    }

    // Generate index file
    const indexContent = `// Auto-generated index file for Figma icons
// Total icons: ${components.length}

${components.map(comp => `export { default as ${comp.name} } from './${comp.name}';`).join('\n')}

// Icons by category:
${Object.entries(
        components.reduce((acc, comp) => {
            if (!acc[comp.category]) acc[comp.category] = [];
            acc[comp.category].push(comp.name);
            return acc;
        }, {})
    ).map(([category, icons]) => `// ${category}: ${icons.join(', ')}`).join('\n')}
`;

    await fs.writeFile(path.join(outputDir, 'index.ts'), indexContent);
    console.log('✅ Created index.ts');

    console.log('🎉 Icon import completed!');
    console.log(`📊 Total icons imported: ${components.length}`);
    console.log(`📁 Files created in: ${outputDir}`);
}

module.exports = { importFigmaIcons, extractFileId, toComponentName, generateReactComponent };

// CLI usage
if (require.main === module) {
    const figmaUrl = process.argv[2];
    const accessToken = process.argv[3];
    const outputDir = process.argv[4] || './src/components/icons/figma';

    if (!figmaUrl || !accessToken) {
        console.log('Usage: node figmaIconImporter.js <figmaUrl> <accessToken> [outputDir]');
        console.log('Example: node figmaIconImporter.js "https://www.figma.com/file/..." "figd_..." "./src/components/icons"');
        process.exit(1);
    }

    importFigmaIcons(figmaUrl, accessToken, outputDir)
        .catch(error => {
            console.error('❌ Import failed:', error.message);
            process.exit(1);
        });
}
