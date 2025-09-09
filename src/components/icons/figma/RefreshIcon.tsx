import React from 'react';

/**
 * Refresh Icon
 * Category: navigation
 * From Figma Community File: https://www.figma.com/community/file/1023171235158207826
 */
interface RefreshIconProps {
  size?: number;
  className?: string;
  color?: string;
  strokeWidth?: number;
}

const RefreshIcon: React.FC<RefreshIconProps> = ({ 
  size = 24, 
  className = "", 
  color = "currentColor",
  strokeWidth = 1.5
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      strokeWidth={strokeWidth}
    >
      {/* 
        TODO: Replace this with your actual SVG path from Figma
        1. Open the Figma file: https://www.figma.com/community/file/1023171235158207826
        2. Find the refresh icon
        3. Right-click -> Copy as SVG
        4. Paste the path elements below (remove <svg> wrapper)
        5. Update viewBox if different from 0 0 24 24
      */}
      <path
        d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RefreshIcon;
