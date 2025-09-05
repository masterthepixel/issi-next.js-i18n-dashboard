// Sentry client instrumentation disabled while Sentry is removed from the build.
// Re-enable by restoring the original initialization and installing @sentry/nextjs.

export const onRouterTransitionStart = function () { return null; };