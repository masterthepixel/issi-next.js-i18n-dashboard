"use client";

import Head from "next/head";

export default function Page() {
  return (
    <div>
      <Head>
        <title>Sentry (disabled)</title>
        <meta name="description" content="Sentry integration is currently disabled in this build." />
      </Head>

      <main className="p-8 text-center">
        <h1 className="text-2xl font-semibold mb-4">Sentry Integration Disabled</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          The Sentry example page has been temporarily disabled while we remove Sentry from the build. Re-enable it later to test error reporting.
        </p>
      </main>
    </div>
  );
}
