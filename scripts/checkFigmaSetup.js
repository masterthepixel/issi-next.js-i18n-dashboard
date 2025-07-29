#!/usr/bin/env node

/**
 * Figma File Setup Helper
 * Guides user through the complete setup process
 */

const fs = require('fs').promises;
const path = require('path');

async function checkSetup() {
    console.log('🎨 ISSI Figma Icon Import Setup Check\n');

    const projectRoot = process.cwd();
    const figmaDir = path.join(projectRoot, 'figma-files');
    const expectedFile = path.join(figmaDir, 'untitled-ui-icons.fig');

    // Check if figma-files directory exists
    try {
        await fs.access(figmaDir);
        console.log('✅ figma-files directory exists');
    } catch {
        console.log('❌ figma-files directory missing');
        return showSetupInstructions();
    }

    // Check if Figma file exists
    try {
        await fs.access(expectedFile);
        console.log('✅ untitled-ui-icons.fig found');
        console.log('🚀 Ready to process! Run:');
        console.log('   npm run process:local-figma "./figma-files/untitled-ui-icons.fig"');
        return;
    } catch {
        console.log('❌ untitled-ui-icons.fig not found');
        return showDownloadInstructions();
    }
}

function showSetupInstructions() {
    console.log(`
🔧 SETUP REQUIRED

The figma-files directory should already exist. If you're seeing this error,
please run this script from your project root directory.

Expected location: ./figma-files/
`);
}

function showDownloadInstructions() {
    console.log(`
📥 DOWNLOAD FIGMA FILE

Follow these steps to get the icons:

1. 🌐 Visit: https://www.figma.com/community/file/1023171235158207826

2. 🔄 Click "Duplicate" (this saves it to your Figma account)

3. 💾 Download the file:
   - In Figma: File → Export → Download .fig file
   - Save as: "untitled-ui-icons.fig"

4. 📁 Move the file to:
   ${path.join(process.cwd(), 'figma-files', 'untitled-ui-icons.fig')}

5. 🚀 Then run:
   npm run process:local-figma "./figma-files/untitled-ui-icons.fig"

📖 For detailed instructions, see: ./figma-files/README.md
`);
}

// Run the check
checkSetup().catch(error => {
    console.error('❌ Setup check failed:', error.message);
});
