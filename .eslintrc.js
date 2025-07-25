module.exports = {
    extends: ["next/core-web-vitals"],
    rules: {
        // Allow unused variables when they start with underscore
        "no-unused-vars": ["warn", {
            "argsIgnorePattern": "^_",
            "varsIgnorePattern": "^_",
            "ignoreRestSiblings": true
        }],

        // Disable rule for using <img> elements instead of next/image
        "@next/next/no-img-element": "off",

        // Disable no-undef for React as it's automatically imported in Next.js
        "no-undef": "off",

        // Relaxing some React hooks rules for now
        "react-hooks/exhaustive-deps": "warn",

        // Prefer const but don't warn
        "prefer-const": "warn"
    }
};
