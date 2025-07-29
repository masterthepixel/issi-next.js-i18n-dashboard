#!/usr/bin/env node

/**
 * Large Icon Collection Processor
 * Handles bulk processing of 2000+ icons with smart filtering
 */

const fs = require('fs').promises;
const path = require('path');

async function createLargeCollectionGuide(outputDir) {
    const guide = `# 🎯 Large Icon Collection (2000+ Icons) Processing Guide

## 📊 **Challenge: 2000+ Icons**
With over 2000 icons, manual selection isn't practical. Here are smart approaches:

---

## 🚀 **Method 1: Category-Based Export (Recommended)**

### **Step 1: Navigate by Categories in Figma**
1. **Open Figma Desktop** with your file
2. **Look for pages/sections** like:
   - 📱 Interface Icons
   - 🏠 Home & Buildings  
   - 👤 Users & People
   - 💼 Business & Finance
   - 🎨 Creative & Design
   - 🛠️ Tools & Settings
   - 📊 Charts & Data
   - 🌐 Communication

### **Step 2: Export by Category**
Instead of all 2000+, focus on categories you need:

\`\`\`
Priority Categories for ISSI Dashboard:
✅ Interface Icons (navigation, buttons, UI)
✅ Business Icons (finance, analytics, reports)  
✅ Communication Icons (messaging, notifications)
✅ Data Icons (charts, graphs, analytics)
✅ User Icons (profiles, teams, accounts)
\`\`\`

### **Step 3: Category Export Process**
1. **Select one category/page** at a time
2. **Ctrl+A to select all in that page**
3. **Export to named folders**:
   - \`./src/components/icons/svg-exports/interface/\`
   - \`./src/components/icons/svg-exports/business/\`
   - \`./src/components/icons/svg-exports/communication/\`

---

## 🎯 **Method 2: Search & Filter Export**

### **Use Figma's Search Function**
1. **Press Ctrl+F** (search)
2. **Search for specific terms**:
   - "dashboard"
   - "chart" 
   - "user"
   - "menu"
   - "settings"
   - "notification"
   - "analytics"

### **Export Search Results**
1. **Search results show filtered icons**
2. **Select visible results** (much smaller set)
3. **Export these targeted icons**

---

## 📦 **Method 3: Smart Batch Processing**

### **A. Use Figma Plugins for Bulk Export**
1. **Install "Figma to React" plugin**
2. **Set filters/categories** in plugin
3. **Bulk export with naming conventions**

### **B. Use Component Sets**
1. **Look for "Component Sets"** in Figma
2. **Often organized by style/category**
3. **Export entire component sets**

---

## 🔧 **Method 4: Selective Manual Process**

### **Focus on Essential Icons First**
Start with icons you'll actually use in your dashboard:

\`\`\`typescript
// Essential Dashboard Icons (~50-100 icons)
const essentialIcons = [
  // Navigation
  'home', 'dashboard', 'menu', 'search', 'profile',
  
  // Actions  
  'edit', 'delete', 'save', 'cancel', 'confirm',
  
  // Data
  'chart-bar', 'chart-line', 'analytics', 'report',
  
  // Communication
  'notification', 'message', 'email', 'phone',
  
  // Status
  'success', 'warning', 'error', 'info', 'loading'
];
\`\`\`

### **How to Find These Quickly**
1. **Use Figma search** for each term
2. **Export in small batches** (10-20 at a time)
3. **Build your collection gradually**

---

## 🎨 **Method 5: Frame-by-Frame Approach**

### **Navigate Frame Structure**
1. **Look at the left panel** in Figma
2. **Expand frame/page hierarchy**
3. **Find logical groupings**:
   - Frame: "Basic Icons" (24x24)
   - Frame: "Outlined Icons" (24x24)  
   - Frame: "Filled Icons" (24x24)

### **Export by Frame**
1. **Click on a frame name** (selects all icons in frame)
2. **Export that frame's icons**
3. **Move to next frame**

---

## 🎯 **Recommended Workflow for 2000+ Icons**

### **Phase 1: Essential Icons (Week 1)**
- Focus on 50-100 most important icons
- Use search method for specific terms
- Export to: \`./svg-exports/essential/\`

### **Phase 2: Category Expansion (Week 2)**  
- Add business/finance icons
- Add interface/navigation icons
- Export to: \`./svg-exports/business/\`, \`./svg-exports/interface/\`

### **Phase 3: Complete Collection (Optional)**
- Add remaining categories as needed
- Use plugin-based bulk export
- Organize by category folders

---

## 🔄 **Updated Conversion Script**

We've enhanced the converter to handle categorized folders:

\`\`\`bash
# Convert all categories at once
npm run convert:svg-to-react

# Or convert specific categories
npm run convert:category essential
npm run convert:category business
npm run convert:category interface
\`\`\`

---

## 📊 **Folder Structure for Large Collections**

\`\`\`
src/components/icons/
├── svg-exports/
│   ├── essential/       # 50-100 critical icons
│   ├── business/        # Finance, analytics icons  
│   ├── interface/       # UI, navigation icons
│   ├── communication/   # Messages, notifications
│   └── misc/           # Everything else
├── figma-converted/
│   ├── essential/
│   ├── business/
│   └── interface/
└── index.ts            # Exports all categories
\`\`\`

---

## 💡 **Pro Tips for Large Collections**

🎯 **Start Small**: Begin with 20-30 icons you know you need  
📁 **Organize**: Use category folders from the start  
🔍 **Search First**: Use Figma search to find specific icons  
🚀 **Iterate**: Add more icons as your project grows  
🧹 **Clean Up**: Remove unused icons periodically  

---

## 🎨 **Smart Export Strategy**

Instead of overwhelming yourself with 2000 icons:

1. **Week 1**: Export 50 essential icons
2. **Week 2**: Add 100 business/interface icons  
3. **Month 2**: Add categories as needed
4. **Long term**: Build complete collection

**This way you get productive immediately while building a comprehensive icon library over time! 🚀**

---

*Remember: You don't need all 2000 icons on day 1. Start with what you need and grow your collection smartly!*
`;

    await fs.writeFile(path.join(outputDir, 'LARGE_COLLECTION_GUIDE.md'), guide);
    console.log('📚 Created large collection processing guide');
}

async function createCategoryConverter(outputDir) {
    const categoryConverter = `#!/usr/bin/env node

/**
 * Category-based SVG to React Converter
 * Handles large icon collections with category organization
 */

const fs = require('fs').promises;
const path = require('path');

async function convertCategoryToReact(category = 'all', svgBaseDir, outputBaseDir) {
  console.log(\`🔄 Converting \${category === 'all' ? 'all categories' : category} icons to React...\`);
  
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
    
    console.log(\`🎉 Conversion completed!\`);
    
  } catch (error) {
    console.error('❌ Conversion failed:', error.message);
  }
}

async function processCategoryFolder(categoryName, categoryPath, outputBaseDir) {
  try {
    const svgFiles = await fs.readdir(categoryPath);
    const svgFilesOnly = svgFiles.filter(file => file.endsWith('.svg'));
    
    if (svgFilesOnly.length === 0) {
      console.log(\`📁 No SVG files found in \${categoryName}\`);
      return;
    }
    
    console.log(\`📁 Processing \${categoryName}: \${svgFilesOnly.length} icons\`);
    
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
      
      const componentName = iconName.endsWith('Icon') ? iconName : \`\${iconName}Icon\`;
      
      // Convert SVG to React component
      const reactComponent = generateReactComponent(componentName, svgContent, categoryName);
      
      // Write component file
      const componentPath = path.join(outputDir, \`\${componentName}.tsx\`);
      await fs.writeFile(componentPath, reactComponent);
      
      components.push(componentName);
      console.log(\`  ✅ \${componentName}.tsx\`);
    }
    
    // Create category index file
    const indexContent = \`// \${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Icons
// Auto-generated from SVG exports
// Total components: \${components.length}

\${components.map(comp => \`export { default as \${comp} } from './\${comp}';\`).join('\\n')}
\`;
    
    await fs.writeFile(path.join(outputDir, 'index.ts'), indexContent);
    console.log(\`📦 Created \${categoryName}/index.ts with \${components.length} exports\`);
  } catch (error) {
    console.error(\`❌ Failed to process \${categoryName}:\`, error.message);
  }
}

function generateReactComponent(componentName, svgContent, category) {
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
 * Category: \${category}
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
      data-category="\${category}"
    >
      \${cleanSvg}
    </svg>
  );
};

export default \${componentName};\`;
}

// CLI usage
if (require.main === module) {
  const category = process.argv[2] || 'all';
  const svgDir = process.argv[3] || './src/components/icons/svg-exports';
  const outputDir = process.argv[4] || './src/components/icons/figma-converted';
  
  convertCategoryToReact(category, svgDir, outputDir);
}

module.exports = { convertCategoryToReact };
`;

    await fs.writeFile(path.join(outputDir, 'convertCategoryToReact.js'), categoryConverter);
    console.log('🔧 Created category-based converter script');
}

// Main execution
async function setupLargeCollectionProcessor() {
    const outputDir = './src/components/icons/local-figma';

    await createLargeCollectionGuide(outputDir);
    await createCategoryConverter(outputDir);

    // Create category directories
    const categories = ['essential', 'business', 'interface', 'communication', 'data', 'misc'];
    for (const category of categories) {
        await fs.mkdir(path.join('./src/components/icons/svg-exports', category), { recursive: true });
        await fs.mkdir(path.join('./src/components/icons/figma-converted', category), { recursive: true });
    }

    console.log('📁 Created category directories');
    console.log('🎯 Large collection processor ready!');
}

if (require.main === module) {
    setupLargeCollectionProcessor().catch(console.error);
}

module.exports = { createLargeCollectionGuide, createCategoryConverter };
