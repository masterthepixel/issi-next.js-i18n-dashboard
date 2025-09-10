const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function findAllFilesWithTextCaption() {
    try {
        console.log('🔍 Searching for ALL files with text-caption attributes...\n');

        // Use PowerShell to find all files with text-caption patterns
        const command = 'Get-ChildItem -Path "src" -Recurse -Include "*.tsx", "*.ts", "*.jsx", "*.js" | Select-String -Pattern "text-caption\\d+" | Select-Object Path -Unique | ForEach-Object { $_.Path }';

        const result = execSync(`powershell.exe -Command "${command}"`, {
            encoding: 'utf8',
            cwd: process.cwd()
        });

        const files = result.trim().split('\n')
            .filter(line => line.trim())
            .map(line => line.trim())
            .map(fullPath => {
                // Convert absolute path to relative path
                const relativePath = path.relative(process.cwd(), fullPath).replace(/\\/g, '/');
                return relativePath;
            })
            .filter(filePath => filePath.startsWith('src/'));

        console.log(`📁 Found ${files.length} files with text-caption attributes:`);
        files.forEach(file => console.log(`   - ${file}`));
        console.log('');

        return files;
    } catch (error) {
        console.error('❌ Error finding files:', error.message);
        console.log('🔄 Using fallback method to find files...\n');

        // Fallback: manually search through directories
        const filesToSearch = [];

        function findFilesRecursively(dir) {
            try {
                const items = fs.readdirSync(dir, { withFileTypes: true });

                for (const item of items) {
                    const fullPath = path.join(dir, item.name);

                    if (item.isDirectory() && !item.name.startsWith('.')) {
                        findFilesRecursively(fullPath);
                    } else if (item.isFile() && /\.(tsx?|jsx?)$/.test(item.name)) {
                        const content = fs.readFileSync(fullPath, 'utf8');
                        if (/text-caption\d+/.test(content)) {
                            filesToSearch.push(fullPath.replace(/\\/g, '/'));
                        }
                    }
                }
            } catch (err) {
                console.warn(`Warning: Could not read directory ${dir}`);
            }
        }

        findFilesRecursively('src');
        return filesToSearch.map(f => path.relative(process.cwd(), f).replace(/\\/g, '/'));
    }
}

function cleanTextCaptionAttributes(filePath) {
    try {
        const fullPath = path.resolve(filePath);
        if (!fs.existsSync(fullPath)) {
            console.log(`⚠️  File not found: ${filePath}`);
            return false;
        }

        let content = fs.readFileSync(fullPath, 'utf8');
        const originalContent = content;

        // Remove text-caption attributes with numbers and optional values
        // Patterns to match:
        // text-caption3042
        // text-caption3042="true" 
        // text-caption3042={...}
        // text-caption3042 (standalone)

        // Match text-caption followed by numbers and optional value assignment
        const textCaptionRegex = /\s+text-caption\d+(?:="[^"]*"|={[^}]*}|="true"|="false")?/g;

        // Also match variations where there might be additional classes mixed in
        const mixedClassRegex = /\s+text-muted-foreground\d+/g;

        content = content.replace(textCaptionRegex, '');
        content = content.replace(mixedClassRegex, '');

        // Clean up any double spaces or trailing spaces in className attributes
        content = content.replace(/className="([^"]*)\s+"/g, (match, className) => {
            const cleanedClass = className.trim().replace(/\s+/g, ' ');
            return `className="${cleanedClass}"`;
        });

        if (content !== originalContent) {
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`✅ Cleaned: ${filePath}`);
            return true;
        } else {
            console.log(`ℹ️  No changes needed: ${filePath}`);
            return false;
        }
    } catch (error) {
        console.error(`❌ Error cleaning ${filePath}:`, error.message);
        return false;
    }
}

function main() {
    console.log('🧹 COMPREHENSIVE Text-caption Cleanup Tool\n');
    console.log('This will find ALL files with text-caption attributes and clean them automatically.\n');

    // Find all files with text-caption attributes
    const filesToClean = findAllFilesWithTextCaption();

    if (filesToClean.length === 0) {
        console.log('🎉 No files found with text-caption attributes! The codebase is already clean.');
        return;
    }

    console.log(`🔧 Processing ${filesToClean.length} files...\n`);

    let cleanedCount = 0;
    let unchangedCount = 0;

    filesToClean.forEach(filePath => {
        const wasChanged = cleanTextCaptionAttributes(filePath);
        if (wasChanged) {
            cleanedCount++;
        } else {
            unchangedCount++;
        }
    });

    console.log('\n✨ Text-caption cleanup complete!\n');
    console.log('📝 Summary:');
    console.log(`- Files cleaned: ${cleanedCount}`);
    console.log(`- Files unchanged: ${unchangedCount}`);
    console.log(`- Total processed: ${filesToClean.length}`);
    console.log('- Removed all text-caption[number] attributes');
    console.log('- Removed text-muted-foreground[number] attributes');
    console.log('- Cleaned up className spacing');
    console.log('\n💡 Note: If you need caption styling, use the CSS class "text-caption" in className instead');

    // Final verification
    console.log('\n🔍 Running final verification...');
    const remainingFiles = findAllFilesWithTextCaption();

    if (remainingFiles.length === 0) {
        console.log('🎉 SUCCESS: All text-caption attributes have been removed!');
    } else {
        console.log(`⚠️  Warning: ${remainingFiles.length} files still have text-caption attributes:`);
        remainingFiles.forEach(file => console.log(`   - ${file}`));
        console.log('\nRe-running cleanup on remaining files...');
        remainingFiles.forEach(cleanTextCaptionAttributes);
    }
}

// Run the main function
main();
