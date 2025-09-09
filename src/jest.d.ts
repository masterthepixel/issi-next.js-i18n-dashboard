
/// <reference types="vitest/globals" />

declare module 'vitest' {
    interface AsymmetricMatchersContaining {
        toHaveNoViolations(): Promise<void>;
    }
    interface Matchers<R> {
        toHaveNoViolations(): Promise<void>;
    }
}
