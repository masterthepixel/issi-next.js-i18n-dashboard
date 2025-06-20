"use client";

import DataGlobe from '@/components/Globe/DataGlobe';

export default function InfrastructurePage() {
  return (
    <div className="w-full h-screen bg-transparent flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        <DataGlobe 
          width={700}
          height={500}
          showControls={false}
          autoRotate={true}
          initialProvider="all"
          className="max-w-[700px] max-h-[500px]"
        />
      </div>
    </div>
  );
}
