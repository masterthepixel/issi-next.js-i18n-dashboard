import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function Content({ children }: Props) {
  return (
    <div
      className="relative z-10 w-full pb-5 px-5 lg:pb-10 lg:px-10 text-foreground flex-1 overflow-visible min-h-screen"
      style={{ minHeight: '100vh' }}
    >
      {children}
    </div>
  );
}
