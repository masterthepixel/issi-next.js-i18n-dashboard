// Bulk typography fixes for all h1-h6 elements in the codebase
// This script will replace font-bold/semibold with font-normal
// and remove manual color overrides to use theme variables

const fs = require('fs');
const path = require('path');

// Function to recursively find all .tsx, .ts, .jsx, .js files
function findFiles(dir, files = []) {
    const items = fs.readdirSync(dir);

    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
            findFiles(fullPath, files);
        } else if (stat.isFile() && /\.(tsx?|jsx?)$/.test(item)) {
            files.push(fullPath);
        }
    }

    return files;
}

// Function to fix typography in a file
function fixTypographyInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;

    // Fix font weight overrides on h1-h6
    const patterns = [
        // h1-h6 font-bold/semibold to font-normal
        /(h[1-6].*?)font-bold/g,
        /(h[1-6].*?)font-semibold/g,
        // Remove manual color overrides (text-white, text-slate-900, text-slate-900, etc.)
        /(h[1-6].*?)text-white/g,
        /(h[1-6].*?)text-slate-900/g,
        /(h[1-6].*?)text-slate-900/g,
        /(h[1-6].*?)text-black/g,
    ];

    patterns.forEach(pattern => {
        const originalContent = content;

        // Replace font-bold/semibold with font-normal, remove color overrides
        content = content.replace(pattern, (match, prefix) => {
            const className = match.includes('font-bold') || match.includes('font-semibold')
                ? `${prefix}font-normal`
                : prefix; // For color overrides, just remove them

            hasChanges = true;
            return className;
        });
    });

    if (hasChanges) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed typography in: ${filePath}`);
        return true;
    }

    return false;
}

// Main execution
function main() {
    console.log('Starting bulk typography fixes...');

    const srcDir = path.join(__dirname, 'src');
    const files = findFiles(srcDir);
    let fixedCount = 0;

    console.log(`Found ${files.length} files to check...`);

    for (const file of files) {
        if (fixTypographyInFile(file)) {
            fixedCount++;
        }
    }

    console.log(`\n✅ Typography fixes completed!`);
    console.log(`Fixed ${fixedCount} files with font weight and color override issues.`);
}

// Run the script
if (require.main === module) {
    main();
}

module.exports = { fixTypographyInFile };