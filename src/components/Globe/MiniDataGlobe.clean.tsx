"use client";


// Simple globe placeholder for breadcrumb integration
export default function MiniDataGlobe({ 
  size = 100, 
  className = '' 
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div className={`${className} flex-shrink-0 w-24 h-24`}>
      {/* Globe placeholder with CSS animation */}
      <div className="relative w-24 h-24">        {/* Earth sphere */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-green-400 to-blue-600 animate-spin slow-spin">
          {/* Land masses */}
          <div className="absolute top-2 left-4 w-3 h-2 bg-green-600 rounded-full opacity-80"></div>
          <div className="absolute top-4 right-3 w-2 h-3 bg-green-500 rounded-full opacity-70"></div>
          <div className="absolute bottom-3 left-2 w-4 h-2 bg-green-600 rounded-full opacity-75"></div>
          
          {/* Data points */}
          <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-red-500 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-orange-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-orange-500 rounded-full animate-pulse"></div>
        </div>
        
        {/* Atmosphere glow */}
        <div className="absolute inset-0 rounded-full bg-blue-400 opacity-20 animate-pulse"></div>
      </div>
    </div>
  );
}
