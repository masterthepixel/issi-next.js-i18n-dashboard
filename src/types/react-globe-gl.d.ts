declare module 'react-globe.gl' {
    import * as React from 'react';

    // Minimal, forgiving declaration to satisfy TypeScript until proper types are added.
    // Use a Record-based props type instead of `any` to satisfy the linter while remaining flexible.
    const Globe: React.ComponentType<Record<string, unknown>>;
    export default Globe;
}
