#!/usr/bin/env node

/**
 * Manual Figma Icon Setup for Community Files
 * Creates the structure for manually adding icons from Figma community files
 */

const fs = require('fs').promises;
const path = require('path');

// Common icon categories and their likely names
const COMMON_ICON_CATEGORIES = {
    'arrows': ['arrow-up', 'arrow-down', 'arrow-left', 'arrow-right', 'arrow-up-right', 'arrow-down-left'],
    'ui': ['home', 'menu', 'close', 'search', 'settings', 'profile', 'notification'],
    'business': ['chart', 'graph', 'analytics', 'dashboard', 'report', 'presentation'],
    'social': ['share', 'like', 'comment', 'message', 'follow', 'star'],
    'file': ['file', 'folder', 'download', 'upload', 'attach', 'document'],
    'media': ['play', 'pause', 'stop', 'record', 'volume', 'camera'],
    'system': ['warning', 'error', 'success', 'info', 'help', 'question'],
    'navigation': ['back', 'forward', 'refresh', 'external-link', 'internal-link']
};

// Generate icon component template
function generateIconTemplate(iconName, category = 'general') {
    const componentName = iconName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');

    return `import React from 'react';

/**
 * ${componentName} Icon
 * Category: ${category}
 * From Figma Community File: https://www.figma.com/community/file/1023171235158207826
 */
interface ${componentName}IconProps {
  size?: number;
  className?: string;
  color?: string;
  strokeWidth?: number;
}

const ${componentName}Icon: React.FC<${componentName}IconProps> = ({ 
  size = 24, 
  className = "", 
  color = "currentColor",
  strokeWidth = 1.5
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      strokeWidth={strokeWidth}
    >
      {/* 
        TODO: Replace this with your actual SVG path from Figma
        1. Open the Figma file: https://www.figma.com/community/file/1023171235158207826
        2. Find the ${iconName} icon
        3. Right-click -> Copy as SVG
        4. Paste the path elements below (remove <svg> wrapper)
        5. Update viewBox if different from 0 0 24 24
      */}
      <path
        d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default ${componentName}Icon;`;
}

// Create setup for manual icon import
async function setupManualIconImport(outputDir) {
    console.log('🎨 Setting up manual Figma icon import structure...');

    // Create directories
    await fs.mkdir(outputDir, { recursive: true });

    const createdFiles = [];
    let indexExports = [];
    let categoryExports = {};

    // Create icon templates for each category
    for (const [category, icons] of Object.entries(COMMON_ICON_CATEGORIES)) {
        console.log(`📁 Creating ${category} category...`);

        categoryExports[category] = [];

        for (const iconName of icons) {
            const componentName = iconName
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join('') + 'Icon';

            const filename = `${componentName}.tsx`;
            const filepath = path.join(outputDir, filename);
            const content = generateIconTemplate(iconName, category);

            await fs.writeFile(filepath, content);
            createdFiles.push(filename);
            indexExports.push(`export { default as ${componentName} } from './${componentName}';`);
            categoryExports[category].push(componentName);
        }
    }

    // Create index file
    const indexContent = `// Auto-generated index file for Figma community icons
// Source: https://www.figma.com/community/file/1023171235158207826
// Total icon templates: ${createdFiles.length}

${indexExports.join('\n')}

// Icons by category:
${Object.entries(categoryExports).map(([category, icons]) =>
        `// ${category.toUpperCase()}: ${icons.join(', ')}`
    ).join('\n')}

// Usage example:
// import { HomeIcon, ArrowUpIcon } from '@/components/icons/figma';
// <HomeIcon size={32} className="text-blue-600" />
`;

    await fs.writeFile(path.join(outputDir, 'index.ts'), indexContent);

    // Create README with instructions
    const readmeContent = `# Figma Community Icons

This directory contains icon templates imported from the Figma community file:
**https://www.figma.com/community/file/1023171235158207826**

## 🚀 Quick Setup Instructions

### 1. Open the Figma File
- Visit: https://www.figma.com/community/file/1023171235158207826
- Click "Duplicate" to add to your Figma account (free)

### 2. For Each Icon You Want to Use:
1. **Find the icon** in the Figma file
2. **Right-click** → "Copy as" → "Copy as SVG"
3. **Open the corresponding template file** (e.g., \`HomeIcon.tsx\`)
4. **Replace the TODO comment** with your SVG path
5. **Update the viewBox** if needed

### 3. Example Conversion:

**From Figma (copied SVG):**
\`\`\`svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
  <polyline points="9,22 9,12 15,12 15,22"/>
</svg>
\`\`\`

**Replace in React component:**
\`\`\`tsx
<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className={className}
  strokeWidth={strokeWidth}
>
  <path 
    d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <polyline 
    points="9,22 9,12 15,12 15,22"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
\`\`\`

## 📁 Icon Categories Created

${Object.entries(categoryExports).map(([category, icons]) =>
        `### ${category.toUpperCase()}\n${icons.map(icon => `- ${icon}`).join('\n')}`
    ).join('\n\n')}

## 🎯 Usage in Components

\`\`\`tsx
import { HomeIcon, ArrowUpIcon, ChartIcon } from '@/components/icons/figma';

// Basic usage
<HomeIcon />

// With props
<ArrowUpIcon size={32} className="text-blue-600" />

// With custom styling
<ChartIcon 
  size={48} 
  color="#10B981" 
  strokeWidth={2}
  className="hover:scale-110 transition-transform" 
/>
\`\`\`

## 🔄 Adding More Icons

To add icons not in the templates:

1. Create a new file: \`YourIconName.tsx\`
2. Copy an existing template
3. Update the component name and SVG content
4. Add export to \`index.ts\`

## ⚡ Automation Script

For faster batch processing, you can also use the Figma API script:
\`\`\`bash
npm run import:figma-icons "https://www.figma.com/community/file/1023171235158207826" "YOUR_FIGMA_TOKEN"
\`\`\`
`;

    await fs.writeFile(path.join(outputDir, 'README.md'), readmeContent);

    console.log('✅ Manual import setup completed!');
    console.log(`📁 Files created in: ${outputDir}`);
    console.log(`📊 Icon templates created: ${createdFiles.length}`);
    console.log(`📖 Check README.md for detailed instructions`);

    return {
        directory: outputDir,
        filesCreated: createdFiles.length,
        categories: Object.keys(categoryExports)
    };
}

module.exports = { setupManualIconImport, generateIconTemplate };

// CLI usage
if (require.main === module) {
    const outputDir = process.argv[2] || './src/components/icons/figma';

    setupManualIconImport(outputDir)
        .catch(error => {
            console.error('❌ Setup failed:', error.message);
            process.exit(1);
        });
}
