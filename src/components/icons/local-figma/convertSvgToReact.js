#!/usr/bin/env node

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
    
    console.log(`📁 Found ${svgFilesOnly.length} SVG files`);
    
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
      
      const componentName = iconName.endsWith('Icon') ? iconName : `${iconName}Icon`;
      
      // Convert SVG to React component
      const reactComponent = generateReactComponent(componentName, svgContent);
      
      // Write component file
      const componentPath = path.join(outputDir, `${componentName}.tsx`);
      await fs.writeFile(componentPath, reactComponent);
      
      components.push(componentName);
      console.log(`✅ Created ${componentName}.tsx`);
    }
    
    // Update index file
    const indexContent = `// Auto-generated from SVG exports
// Total components: ${components.length}

${components.map(comp => `export { default as ${comp} } from './${comp}';`).join('\n')}
`;
    
    await fs.writeFile(path.join(outputDir, 'index.ts'), indexContent);
    
    console.log(`🎉 Conversion completed! ${components.length} components created.`);
    
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
    .replace(/<\/svg>/i, '')
    .replace(/fill="[^"]*"/g, 'fill={color}')
    .replace(/stroke="[^"]*"/g, 'stroke={color}')
    .replace(/class="/g, 'className="')
    .trim();
  
  return `import React from 'react';

/**
 * ${componentName}
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
    >
      ${cleanSvg}
    </svg>
  );
};

export default ${componentName};`;
}

// CLI usage
if (require.main === module) {
  const svgDir = process.argv[2] || './src/components/icons/svg-exports';
  const outputDir = process.argv[3] || './src/components/icons/figma-converted';
  
  convertSvgToReact(svgDir, outputDir);
}

module.exports = { convertSvgToReact };
