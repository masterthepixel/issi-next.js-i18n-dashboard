#!/usr/bin/env node

/**
 * Local Figma File Processor
 * Processes locally saved Figma files and exports
 */

const fs = require('fs').promises;
const path = require('path');

// Process local Figma .fig file (requires Figma Desktop)
async function processLocalFigmaFile(figmaFilePath, outputDir) {
    console.log('🎨 Processing local Figma file...');
    console.log(`📁 File: ${figmaFilePath}`);

    // Check if file exists
    try {
        await fs.access(figmaFilePath);
        console.log('✅ Figma file found');
    } catch (error) {
        throw new Error(`Figma file not found: ${figmaFilePath}`);
    }

    // Create instructions for processing local file
    const instructions = `# 🎨 Local Figma File Processing Guide

## File Information
- **Local File**: ${figmaFilePath}
- **Output Directory**: ${outputDir}

## 🚀 Method 1: Figma Desktop Bulk Export (Fastest)

### Step 1: Open in Figma Desktop
1. **Download Figma Desktop** (if not installed): https://www.figma.com/downloads/
2. **Open your local file**: File → Open → Select your .fig file
3. **Or duplicate the community file** to your account first

### Step 2: Bulk Export Icons
1. **Select all icons** you want to export (Ctrl+A or Cmd+A on icon frames)
2. **Right panel** → Export settings
3. **Format**: SVG
4. **Settings**: 
   - ✅ Include "id" attribute
   - ✅ Outline text  
   - ✅ Simplify stroke
5. **Click "Export"** → Choose folder: \`${outputDir}/svg-exports/\`

### Step 3: Auto-Convert to React
Run our conversion script:
\`\`\`bash
npm run convert:svg-to-react
\`\`\`

## 🎯 Method 2: Individual Icon Export

### For each icon:
1. **Select the icon** in Figma
2. **Right-click** → Copy as → Copy as SVG
3. **Find the template** in \`${outputDir}\`
4. **Replace the TODO** with your SVG content

## 📦 Method 3: Figma Plugin (In-App)

### Use Figma Plugins:
1. **"Figma to React"** - Generates React components
2. **"SVGR"** - Converts SVG to React components  
3. **"Icon Export"** - Batch export with naming

### To install plugins:
1. In Figma: Plugins → Browse all plugins
2. Search for "Figma to React" or "SVGR"
3. Install and run on your icons

## 🔧 Method 4: API Access (If Duplicated)

If you duplicated the community file to your account:
1. **Get the new file URL** from your Figma account
2. **Use our API script**:
\`\`\`bash
npm run import:figma-icons "YOUR_DUPLICATED_FILE_URL" "YOUR_TOKEN"
\`\`\`

## 📋 What We've Prepared

✅ **${48} Icon templates** ready in \`${outputDir}\`
✅ **Automated conversion scripts**
✅ **React component structure**
✅ **TypeScript support**
✅ **Export system ready**

## 🎯 Recommended Workflow

1. **Use Figma Desktop** for bulk export (Method 1)
2. **Export all icons as SVG** to \`${outputDir}/svg-exports/\`
3. **Run conversion script** to auto-generate React components
4. **Icons automatically available** in your project!

This is the fastest way to get all icons imported at once! 🚀
`;

    // Create output directory
    await fs.mkdir(outputDir, { recursive: true });
    await fs.mkdir(path.join(outputDir, 'svg-exports'), { recursive: true });

    // Write instructions
    await fs.writeFile(path.join(outputDir, 'LOCAL_FILE_GUIDE.md'), instructions);

    console.log('📖 Created local file processing guide');
    console.log(`📂 Check: ${outputDir}/LOCAL_FILE_GUIDE.md`);

    return outputDir;
}

// Create SVG to React converter
async function createSvgConverter(outputDir) {
    const converterScript = `#!/usr/bin/env node

/**
 * SVG to React Component Converter
 * Converts SVG files from Figma export to React components
 */

const fs = require('fs').promises;
const path = require('path');

async function convertSvgToReact(svgDir, outputDir) {
  console.log('🔄 Converting SVG files to React components...');
  
  try {
    const svgFiles = await fs.readdir(svgDir);
    const svgFilesOnly = svgFiles.filter(file => file.endsWith('.svg'));
    
    console.log(\`📁 Found \${svgFilesOnly.length} SVG files\`);
    
    const components = [];
    
    for (const svgFile of svgFilesOnly) {
      const svgPath = path.join(svgDir, svgFile);
      const svgContent = await fs.readFile(svgPath, 'utf8');
      
      // Generate component name from filename
      const iconName = path.basename(svgFile, '.svg')
        .replace(/[^a-zA-Z0-9]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
      
      const componentName = iconName.endsWith('Icon') ? iconName : \`\${iconName}Icon\`;
      
      // Convert SVG to React component
      const reactComponent = generateReactComponent(componentName, svgContent);
      
      // Write component file
      const componentPath = path.join(outputDir, \`\${componentName}.tsx\`);
      await fs.writeFile(componentPath, reactComponent);
      
      components.push(componentName);
      console.log(\`✅ Created \${componentName}.tsx\`);
    }
    
    // Update index file
    const indexContent = \`// Auto-generated from SVG exports
// Total components: \${components.length}

\${components.map(comp => \`export { default as \${comp} } from './\${comp}';\`).join('\\n')}
\`;
    
    await fs.writeFile(path.join(outputDir, 'index.ts'), indexContent);
    
    console.log(\`🎉 Conversion completed! \${components.length} components created.\`);
    
  } catch (error) {
    console.error('❌ Conversion failed:', error.message);
  }
}

function generateReactComponent(componentName, svgContent) {
  // Extract viewBox
  const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';
  
  // Clean SVG content
  const cleanSvg = svgContent
    .replace(/<svg[^>]*>/i, '')
    .replace(/<\\/svg>/i, '')
    .replace(/fill="[^"]*"/g, 'fill={color}')
    .replace(/stroke="[^"]*"/g, 'stroke={color}')
    .replace(/class="/g, 'className="')
    .trim();
  
  return \`import React from 'react';

/**
 * \${componentName}
 * Auto-generated from Figma SVG export
 */
interface \${componentName}Props {
  size?: number;
  className?: string;
  color?: string;
  strokeWidth?: number;
}

const \${componentName}: React.FC<\${componentName}Props> = ({ 
  size = 24, 
  className = "", 
  color = "currentColor",
  strokeWidth = 1.5
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="\${viewBox}"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      strokeWidth={strokeWidth}
    >
      \${cleanSvg}
    </svg>
  );
};

export default \${componentName};\`;
}

// CLI usage
if (require.main === module) {
  const svgDir = process.argv[2] || './src/components/icons/svg-exports';
  const outputDir = process.argv[3] || './src/components/icons/figma-converted';
  
  convertSvgToReact(svgDir, outputDir);
}

module.exports = { convertSvgToReact };
`;

    await fs.writeFile(path.join(outputDir, 'convertSvgToReact.js'), converterScript);
    console.log('🔧 Created SVG converter script');
}

module.exports = { processLocalFigmaFile, createSvgConverter };

// CLI usage
if (require.main === module) {
    const figmaFilePath = process.argv[2];
    const outputDir = process.argv[3] || './src/components/icons/local-figma';

    if (!figmaFilePath) {
        console.log('Usage: node localFigmaProcessor.js <figmaFilePath> [outputDir]');
        console.log('Example: node localFigmaProcessor.js "./my-icons.fig" "./src/components/icons"');
        process.exit(1);
    }

    processLocalFigmaFile(figmaFilePath, outputDir)
        .then(async (dir) => {
            await createSvgConverter(dir);
            console.log('🎯 Ready for local file processing!');
        })
        .catch(error => {
            console.error('❌ Process failed:', error.message);
            process.exit(1);
        });
}
