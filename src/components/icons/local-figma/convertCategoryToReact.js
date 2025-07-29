#!/usr/bin/env node

/**
 * Category-based SVG to React Converter
 * Handles large icon collections with category organization
 */

const fs = require('fs').promises;
const path = require('path');

async function convertCategoryToReact(category = 'all', svgBaseDir, outputBaseDir) {
  console.log(`🔄 Converting ${category === 'all' ? 'all categories' : category} icons to React...`);
  
  try {
    if (category === 'all') {
      // Convert all categories
      const categories = await fs.readdir(svgBaseDir);
      for (const cat of categories) {
        const catPath = path.join(svgBaseDir, cat);
        const stat = await fs.stat(catPath);
        if (stat.isDirectory()) {
          await processCategoryFolder(cat, catPath, outputBaseDir);
        }
      }
    } else {
      // Convert specific category
      const categoryPath = path.join(svgBaseDir, category);
      await processCategoryFolder(category, categoryPath, outputBaseDir);
    }
    
    console.log(`🎉 Conversion completed!`);
    
  } catch (error) {
    console.error('❌ Conversion failed:', error.message);
  }
}

async function processCategoryFolder(categoryName, categoryPath, outputBaseDir) {
  try {
    const svgFiles = await fs.readdir(categoryPath);
    const svgFilesOnly = svgFiles.filter(file => file.endsWith('.svg'));
    
    if (svgFilesOnly.length === 0) {
      console.log(`📁 No SVG files found in ${categoryName}`);
      return;
    }
    
    console.log(`📁 Processing ${categoryName}: ${svgFilesOnly.length} icons`);
    
    // Create category output directory
    const outputDir = path.join(outputBaseDir, categoryName);
    await fs.mkdir(outputDir, { recursive: true });
    
    const components = [];
    
    for (const svgFile of svgFilesOnly) {
      const svgPath = path.join(categoryPath, svgFile);
      const svgContent = await fs.readFile(svgPath, 'utf8');
      
      // Generate component name
      const iconName = path.basename(svgFile, '.svg')
        .replace(/[^a-zA-Z0-9]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
      
      const componentName = iconName.endsWith('Icon') ? iconName : `${iconName}Icon`;
      
      // Convert SVG to React component
      const reactComponent = generateReactComponent(componentName, svgContent, categoryName);
      
      // Write component file
      const componentPath = path.join(outputDir, `${componentName}.tsx`);
      await fs.writeFile(componentPath, reactComponent);
      
      components.push(componentName);
      console.log(`  ✅ ${componentName}.tsx`);
    }
    
    // Create category index file
    const indexContent = `// ${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Icons
// Auto-generated from SVG exports
// Total components: ${components.length}

${components.map(comp => `export { default as ${comp} } from './${comp}';`).join('\n')}
`;
    
    await fs.writeFile(path.join(outputDir, 'index.ts'), indexContent);
    console.log(`📦 Created ${categoryName}/index.ts with ${components.length} exports`);
  } catch (error) {
    console.error(`❌ Failed to process ${categoryName}:`, error.message);
  }
}

function generateReactComponent(componentName, svgContent, category) {
  // Extract viewBox
  const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';
  
  // Clean SVG content
  const cleanSvg = svgContent
    .replace(/<svg[^>]*>/i, '')
    .replace(/<\/svg>/i, '')
    .replace(/fill="[^"]*"/g, 'fill={color}')
    .replace(/stroke="[^"]*"/g, 'stroke={color}')
    .replace(/class="/g, 'className="')
    .trim();
  
  return `import React from 'react';

/**
 * ${componentName}
 * Category: ${category}
 * Auto-generated from Figma SVG export
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
      data-category="${category}"
    >
      ${cleanSvg}
    </svg>
  );
};

export default ${componentName};`;
}

// CLI usage
if (require.main === module) {
  const category = process.argv[2] || 'all';
  const svgDir = process.argv[3] || './src/components/icons/svg-exports';
  const outputDir = process.argv[4] || './src/components/icons/figma-converted';
  
  convertCategoryToReact(category, svgDir, outputDir);
}

module.exports = { convertCategoryToReact };
