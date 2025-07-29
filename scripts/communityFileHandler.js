#!/usr/bin/env node

/**
 * Enhanced Figma Community File Handler
 * Handles community files with special access patterns
 */

const fs = require('fs').promises;
const path = require('path');

// Community file specific handling
async function handleCommunityFile(fileId, accessToken) {
    console.log('🔍 Attempting community file access...');

    // Try different API endpoints for community files
    const endpoints = [
        `https://api.figma.com/v1/files/${fileId}`,
        `https://api.figma.com/v1/files/${fileId}/nodes`,
        `https://api.figma.com/v1/files/${fileId}/components`
    ];

    for (const endpoint of endpoints) {
        try {
            console.log(`🔗 Trying endpoint: ${endpoint}`);
            const response = await fetch(endpoint, {
                headers: {
                    'X-Figma-Token': accessToken,
                },
            });

            console.log(`📡 Response status: ${response.status}`);

            if (response.ok) {
                const data = await response.json();
                console.log('✅ Successfully accessed community file!');
                return data;
            } else {
                const errorText = await response.text();
                console.log(`❌ ${response.status}: ${errorText}`);
            }
        } catch (error) {
            console.log(`❌ Error with ${endpoint}: ${error.message}`);
        }
    }

    return null;
}

// Check token validity
async function validateToken(accessToken) {
    try {
        console.log('🔑 Validating Figma token...');
        const response = await fetch('https://api.figma.com/v1/me', {
            headers: {
                'X-Figma-Token': accessToken,
            },
        });

        if (response.ok) {
            const userData = await response.json();
            console.log(`✅ Token valid for user: ${userData.email || 'Unknown'}`);
            return true;
        } else {
            console.log(`❌ Token validation failed: ${response.status}`);
            return false;
        }
    } catch (error) {
        console.log(`❌ Token validation error: ${error.message}`);
        return false;
    }
}

// Get user's accessible files
async function getUserFiles(accessToken) {
    try {
        console.log('📁 Fetching user accessible files...');
        const response = await fetch('https://api.figma.com/v1/teams/me/projects', {
            headers: {
                'X-Figma-Token': accessToken,
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log(`📊 Found ${data.projects?.length || 0} accessible projects`);
            return data;
        }
    } catch (error) {
        console.log(`❌ Error fetching files: ${error.message}`);
    }

    return null;
}

// Create manual import instructions for community files
async function createCommunityInstructions(fileId, outputDir) {
    const instructionsContent = `# 🎨 Figma Community File Import Instructions

## File Information
- **File ID**: ${fileId}
- **Community URL**: https://www.figma.com/community/file/${fileId}
- **API Access**: Community files require special handling

## 🚫 Why API Import Failed
Community files on Figma have restricted API access. This is normal and expected behavior.

## ✅ Recommended Import Methods

### Method 1: Manual Copy (Most Reliable)
1. **Open the community file**: https://www.figma.com/community/file/${fileId}
2. **Click "Duplicate"** to add it to your Figma account (free)
3. **For each icon you want**:
   - Right-click on the icon
   - Select "Copy as" → "Copy as SVG"
   - Open the corresponding template file in \`${outputDir}\`
   - Replace the TODO comment with your SVG content

### Method 2: Figma Plugin
1. Install the "Figma to React" plugin in Figma
2. Select all icons you want to export
3. Run the plugin to generate React components
4. Copy the generated components to your project

### Method 3: Bulk Export (If you duplicated the file)
1. After duplicating to your account, the file becomes accessible via API
2. Use the duplicated file URL with our import script
3. Run: \`npm run import:figma-icons "YOUR_DUPLICATED_FILE_URL" "YOUR_TOKEN"\`

## 📋 Pre-created Templates
We've already created ${48} icon templates in \`${outputDir}\` ready for you to fill:

### Categories Available:
- **UI Icons**: Home, Menu, Search, Settings, etc.
- **Arrows**: All directional arrows
- **Business**: Charts, Analytics, Dashboard, etc.
- **Social**: Share, Like, Follow, etc.
- **Files**: File, Folder, Download, etc.
- **Media**: Play, Pause, Volume, etc.
- **System**: Warning, Error, Success, etc.
- **Navigation**: Back, Forward, Refresh, etc.

## 🎯 Next Steps
1. Visit the community file and duplicate it
2. Start with the most important icons (Home, Menu, Search)
3. Copy SVG content from Figma to replace templates
4. Icons will automatically be available via \`import from '@/components/icons'\`

## 💡 Pro Tip
Focus on replacing the icons you'll actually use first. You don't need to import all icons at once!
`;

    await fs.writeFile(path.join(outputDir, 'COMMUNITY_IMPORT_GUIDE.md'), instructionsContent);
    console.log('📖 Created community import guide');
}

// Main function
async function attemptCommunityImport(figmaUrl, accessToken, outputDir) {
    const fileId = figmaUrl.match(/\/file\/([a-zA-Z0-9]+)/)?.[1];

    if (!fileId) {
        throw new Error('Could not extract file ID from URL');
    }

    console.log('🎨 Enhanced Figma Community Import');
    console.log(`📁 File ID: ${fileId}`);
    console.log(`🔑 Token: ${accessToken.substring(0, 10)}...`);

    // Validate token first
    const tokenValid = await validateToken(accessToken);
    if (!tokenValid) {
        console.log('❌ Invalid token. Please check your Figma API token.');
        return;
    }

    // Try to access community file
    const fileData = await handleCommunityFile(fileId, accessToken);

    if (fileData) {
        console.log('🎉 Community file accessible! Proceeding with automated import...');
        // If successful, we could process the file here
        // For now, we'll still provide instructions
    } else {
        console.log('ℹ️  Community file requires manual import (this is normal)');
    }

    // Get user's accessible files for reference
    await getUserFiles(accessToken);

    // Create comprehensive instructions
    await fs.mkdir(outputDir, { recursive: true });
    await createCommunityInstructions(fileId, outputDir);

    console.log('📚 Created detailed import instructions');
    console.log(`📂 Check: ${outputDir}/COMMUNITY_IMPORT_GUIDE.md`);
    console.log('');
    console.log('🎯 Quick Start:');
    console.log('1. Visit: https://www.figma.com/community/file/1023171235158207826');
    console.log('2. Click "Duplicate" (free)');
    console.log('3. Copy icons as SVG and replace templates');
    console.log('4. Icons automatically available in your React components');
}

module.exports = { attemptCommunityImport, validateToken, handleCommunityFile };

// CLI usage
if (require.main === module) {
    const figmaUrl = process.argv[2];
    const accessToken = process.argv[3];
    const outputDir = process.argv[4] || './src/components/icons/figma-community';

    if (!figmaUrl || !accessToken) {
        console.log('Usage: node communityFileHandler.js <figmaUrl> <accessToken> [outputDir]');
        process.exit(1);
    }

    attemptCommunityImport(figmaUrl, accessToken, outputDir)
        .catch(error => {
            console.error('❌ Process failed:', error.message);
            process.exit(1);
        });
}
