#!/usr/bin/env node

/**
 * Figma SVG to React Component Converter
 * Usage: node convertSvgToReact.js <iconName> <svgContent>
 */

const fs = require('fs');
const path = require('path');

function convertSvgToReact(iconName, svgContent) {
    // Extract viewBox and paths from SVG
    const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

    // Extract all path elements
    const pathMatches = svgContent.match(/<path[^>]*>/g) || [];
    const paths = pathMatches.map(path => {
        // Convert fill and stroke to use the color prop
        return path
            .replace(/fill="[^"]*"/g, 'fill={color}')
            .replace(/stroke="[^"]*"/g, 'stroke={color}')
            .replace(/>/g, ' />');
    }).join('\n      ');

    // Generate React component
    const componentName = iconName.charAt(0).toUpperCase() + iconName.slice(1);

    const template = `import React from 'react';

interface ${componentName}Props {
  size?: number;
  className?: string;
  color?: string;
}

const ${componentName}: React.FC<${componentName}Props> = ({ 
  size = 24, 
  className = "", 
  color = "currentColor" 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="${viewBox}"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      ${paths}
    </svg>
  );
};

export default ${componentName};`;

    return template;
}

// Example usage
if (require.main === module) {
    const iconName = process.argv[2];
    const svgContent = process.argv[3];

    if (!iconName || !svgContent) {
        console.log('Usage: node convertSvgToReact.js <iconName> <svgContent>');
        process.exit(1);
    }

    const reactComponent = convertSvgToReact(iconName, svgContent);
    const filename = `${iconName}.tsx`;
    const filepath = path.join(__dirname, filename);

    fs.writeFileSync(filepath, reactComponent);
    console.log(`✅ Created ${filename}`);
    console.log(`📁 Path: ${filepath}`);
    console.log(`\n🔧 Don't forget to add to index.ts:`);
    console.log(`export { default as ${iconName.charAt(0).toUpperCase() + iconName.slice(1)} } from './${iconName}';`);
}

module.exports = { convertSvgToReact };
