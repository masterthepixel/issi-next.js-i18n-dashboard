'use client';

import { useEffect } from 'react';

export default function DebugComponent() {
  useEffect(() => {
    console.log('Debug: Component mounted successfully');
    console.log('Debug: window object:', typeof window);
    console.log('Debug: document object:', typeof document);
    console.log('Debug: navigator:', typeof navigator);
  }, []);

  return (
    <div className="p-4 bg-blue-100 border border-blue-300 rounded">
      <h3 className="font-bold text-blue-800">Debug Component</h3>
      <p className="text-blue-600">This component helps identify client-side issues.</p>
      <p className="text-sm text-blue-500">Check the browser console for more details.</p>
    </div>
  );
}
