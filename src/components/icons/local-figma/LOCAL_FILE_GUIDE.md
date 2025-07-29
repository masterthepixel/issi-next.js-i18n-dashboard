# 🎨 Local Figma File Processing Guide

## File Information
- **Local File**: ./figma-files/untitled-ui-icons.fig
- **Output Directory**: ./src/components/icons/local-figma

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
5. **Click "Export"** → Choose folder: `./src/components/icons/local-figma/svg-exports/`

### Step 3: Auto-Convert to React
Run our conversion script:
```bash
npm run convert:svg-to-react
```

## 🎯 Method 2: Individual Icon Export

### For each icon:
1. **Select the icon** in Figma
2. **Right-click** → Copy as → Copy as SVG
3. **Find the template** in `./src/components/icons/local-figma`
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
```bash
npm run import:figma-icons "YOUR_DUPLICATED_FILE_URL" "YOUR_TOKEN"
```

## 📋 What We've Prepared

✅ **48 Icon templates** ready in `./src/components/icons/local-figma`
✅ **Automated conversion scripts**
✅ **React component structure**
✅ **TypeScript support**
✅ **Export system ready**

## 🎯 Recommended Workflow

1. **Use Figma Desktop** for bulk export (Method 1)
2. **Export all icons as SVG** to `./src/components/icons/local-figma/svg-exports/`
3. **Run conversion script** to auto-generate React components
4. **Icons automatically available** in your project!

This is the fastest way to get all icons imported at once! 🚀
