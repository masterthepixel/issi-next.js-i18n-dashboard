# Figma Community Icons

This directory contains icon templates imported from the Figma community file:
**https://www.figma.com/community/file/1023171235158207826**

## 🚀 Quick Setup Instructions

### 1. Open the Figma File
- Visit: https://www.figma.com/community/file/1023171235158207826
- Click "Duplicate" to add to your Figma account (free)

### 2. For Each Icon You Want to Use:
1. **Find the icon** in the Figma file
2. **Right-click** → "Copy as" → "Copy as SVG"
3. **Open the corresponding template file** (e.g., `HomeIcon.tsx`)
4. **Replace the TODO comment** with your SVG path
5. **Update the viewBox** if needed

### 3. Example Conversion:

**From Figma (copied SVG):**
```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
  <polyline points="9,22 9,12 15,12 15,22"/>
</svg>
```

**Replace in React component:**
```tsx
<svg
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  className={className}
  strokeWidth={strokeWidth}
>
  <path 
    d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
  <polyline 
    points="9,22 9,12 15,12 15,22"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
```

## 📁 Icon Categories Created

### ARROWS
- ArrowUpIcon
- ArrowDownIcon
- ArrowLeftIcon
- ArrowRightIcon
- ArrowUpRightIcon
- ArrowDownLeftIcon

### UI
- HomeIcon
- MenuIcon
- CloseIcon
- SearchIcon
- SettingsIcon
- ProfileIcon
- NotificationIcon

### BUSINESS
- ChartIcon
- GraphIcon
- AnalyticsIcon
- DashboardIcon
- ReportIcon
- PresentationIcon

### SOCIAL
- ShareIcon
- LikeIcon
- CommentIcon
- MessageIcon
- FollowIcon
- StarIcon

### FILE
- FileIcon
- FolderIcon
- DownloadIcon
- UploadIcon
- AttachIcon
- DocumentIcon

### MEDIA
- PlayIcon
- PauseIcon
- StopIcon
- RecordIcon
- VolumeIcon
- CameraIcon

### SYSTEM
- WarningIcon
- ErrorIcon
- SuccessIcon
- InfoIcon
- HelpIcon
- QuestionIcon

### NAVIGATION
- BackIcon
- ForwardIcon
- RefreshIcon
- ExternalLinkIcon
- InternalLinkIcon

## 🎯 Usage in Components

```tsx
import { HomeIcon, ArrowUpIcon, ChartIcon } from '@/components/icons/figma';

// Basic usage
<HomeIcon />

// With props
<ArrowUpIcon size={32} className="text-blue-600" />

// With custom styling
<ChartIcon 
  size={48} 
  color="#10B981" 
  strokeWidth={2}
  className="hover:scale-110 transition-transform" 
/>
```

## 🔄 Adding More Icons

To add icons not in the templates:

1. Create a new file: `YourIconName.tsx`
2. Copy an existing template
3. Update the component name and SVG content
4. Add export to `index.ts`

## ⚡ Automation Script

For faster batch processing, you can also use the Figma API script:
```bash
npm run import:figma-icons "https://www.figma.com/community/file/1023171235158207826" "YOUR_FIGMA_TOKEN"
```
