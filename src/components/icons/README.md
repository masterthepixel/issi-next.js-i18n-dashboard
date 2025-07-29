# 🎨 Figma to React Icons Integration Guide

## 📋 Quick Steps to Import Figma Icons

### 1. **Export from Figma**

1. Select your icon in Figma
2. Right-click → "Copy as" → "Copy as SVG"
3. Or use File → Export → SVG

### 2. **Create React Component**

1. Create a new file in `src/components/icons/YourIconName.tsx`
2. Use the template below
3. Replace the SVG content with your Figma export

### 3. **Icon Component Template**

```tsx
import React from "react";

interface YourIconNameProps {
  size?: number;
  className?: string;
  color?: string;
}

const YourIconName: React.FC<YourIconNameProps> = ({ size = 24, className = "", color = "currentColor" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24" // Update this to match your icon's viewBox
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Paste your Figma SVG paths here */}
      <path
        d="YOUR_FIGMA_PATH_DATA_HERE"
        fill={color}
        // Add other SVG attributes as needed
      />
    </svg>
  );
};

export default YourIconName;
```

### 4. **Export from Index**

Add to `src/components/icons/index.ts`:

```tsx
export { default as YourIconName } from "./YourIconName";
```

### 5. **Usage in Components**

```tsx
import { YourIconName } from "@/components/icons";

// Usage
<YourIconName size={32} className="text-blue-600" />;
```

## 🛠️ Advanced: Figma API Integration

For automatic syncing, you can use the Figma API:

```tsx
// Example API call to fetch Figma file
const fetchFigmaIcons = async (fileId: string, accessToken: string) => {
  const response = await fetch(`https://api.figma.com/v1/files/${fileId}`, {
    headers: {
      "X-Figma-Token": accessToken,
    },
  });
  return response.json();
};
```

## 📦 Recommended Tools

1. **SVGR**: Convert SVG to React components
2. **Figma-to-React**: Browser extension
3. **Iconify**: Icon framework with Figma support

## 🎯 Best Practices

- Use consistent naming conventions
- Set proper TypeScript interfaces
- Include accessibility attributes
- Support theming with color props
- Use semantic viewBox dimensions
