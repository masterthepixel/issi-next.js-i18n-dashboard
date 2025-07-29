import React from 'react';

interface FigmaIconProps {
    size?: number;
    className?: string;
    color?: string;
}

const FigmaIcon: React.FC<FigmaIconProps> = ({
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
            {/* Figma logo SVG */}
            <path
                d="M8 24C10.209 24 12 22.209 12 20V16H8C5.791 16 4 17.791 4 20C4 22.209 5.791 24 8 24Z"
                fill="#0ACF83"
            />
            <path
                d="M4 12C4 9.791 5.791 8 8 8H12V16H8C5.791 16 4 14.209 4 12Z"
                fill="#A259FF"
            />
            <path
                d="M4 4C4 1.791 5.791 0 8 0H12V8H8C5.791 8 4 6.209 4 4Z"
                fill="#F24E1E"
            />
            <path
                d="M12 0H16C18.209 0 20 1.791 20 4C20 6.209 18.209 8 16 8H12V0Z"
                fill="#FF7262"
            />
            <path
                d="M20 12C20 14.209 18.209 16 16 16C13.791 16 12 14.209 12 12C12 9.791 13.791 8 16 8C18.209 8 20 9.791 20 12Z"
                fill="#1ABCFE"
            />
        </svg>
    );
};

export default FigmaIcon;
