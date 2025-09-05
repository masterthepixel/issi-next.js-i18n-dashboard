declare module "@sentry/nextjs" {
    // Minimal declarations used by the app's example page.
    export function diagnoseSdkConnectivity(): Promise<string>;
    export function startSpan<T>(opts: unknown, fn: () => Promise<T> | T): Promise<T>;
    export function replayIntegration(): unknown;
    const Sentry: unknown;
    export default Sentry;
}
