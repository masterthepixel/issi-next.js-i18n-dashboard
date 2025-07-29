import React from 'react';

interface ISSIIconProps {
    size?: number;
    className?: string;
    color?: string;
}

const ISSIIcon: React.FC<ISSIIconProps> = ({
    size = 24,
    className = "",
    color = "currentColor"
}) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Replace this with your actual Figma SVG path */}
            <path
                d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
                fill={color}
                stroke={color}
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default ISSIIcon;
