# 📁 Figma Files Directory

## 🎯 **Purpose**

This directory stores your local Figma files (.fig) for icon import processing.

## 📂 **Recommended File Structure**

```
figma-files/
├── untitled-ui-icons.fig          # Your downloaded community file
├── custom-icons.fig               # Any additional icon files
└── README.md                      # This file
```

## 🚀 **Quick Setup Instructions**

### **Step 1: Download the Figma File**

1. **Visit**: https://www.figma.com/community/file/1023171235158207826
2. **Click "Duplicate"** (saves to your Figma account)
3. **In Figma**: File → Export → Download .fig file
4. **Save as**: `untitled-ui-icons.fig`
5. **Move to**: `./figma-files/untitled-ui-icons.fig`

### **Step 2: Process the File**

```bash
# From project root, run:
npm run process:local-figma "./figma-files/untitled-ui-icons.fig"
```

### **Step 3: Follow the Generated Guide**

The script will create detailed instructions in:
`./src/components/icons/local-figma/LOCAL_FILE_GUIDE.md`

## 🎯 **File Paths for Scripts**

When running the import scripts, use these paths:

```bash
# Process local Figma file
npm run process:local-figma "./figma-files/untitled-ui-icons.fig"

# Or with absolute path (if relative doesn't work)
npm run process:local-figma "C:/Users/kfiagbedzi/Documents/GitHub/issi-next.js-i18n-dashboard/figma-files/untitled-ui-icons.fig"
```

## 📋 **What to Do Next**

1. **Download** the community file and save it here as `untitled-ui-icons.fig`
2. **Run** the processing script with the path above
3. **Follow** the generated guide for bulk SVG export
4. **Convert** SVGs to React components automatically

## 🔒 **Git Ignore**

Figma files are automatically ignored in .gitignore to keep your repo clean.

---

**Ready to import all those beautiful icons! 🎨**
