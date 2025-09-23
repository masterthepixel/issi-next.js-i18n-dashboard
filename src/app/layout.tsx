/* eslint-disable @next/next/no-page-custom-font */
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ISSI Next.js Dashboard</title>
        {/* Add your global CSS here */}
        {/* Global CSS should be imported in _app or via import statement, not via <link> */}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
