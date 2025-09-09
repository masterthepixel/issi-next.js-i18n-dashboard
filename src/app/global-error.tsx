'use client'

/* import * as Sentry from "@sentry/nextjs"; */
import Error from "next/error";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }, reset?: () => void }) {
  /* useEffect(() => {
    Sentry.captureException(error);
  }, [error]); */

  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h2 className="text-red-600 mb-4">Something went wrong!</h2>
            <p className="">
              We encountered an error while loading the page.
            </p>
            <div className="space-x-4">
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => reset?.()}
              >
                Try again
              </button>
              <button
                className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700"
                onClick={() => window.location.href = '/en/home'}
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
