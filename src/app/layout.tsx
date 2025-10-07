/* eslint-disable @next/next/no-page-custom-font */
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This is the root layout - it should only pass through children
  // The actual <html> and <body> tags are in the [lang]/layout.tsx
  return children;
}
