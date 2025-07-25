// ESLint configuration for JSON validation and structured data
module.exports = {
    root: true,
    extends: [
        'next/core-web-vitals'
    ],
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    rules: {
        // JSON and string handling rules to prevent syntax errors
        'no-invalid-regexp': 'error',
        'no-regex-spaces': 'error',
        'no-control-regex': 'error',
        'no-misleading-character-class': 'error',

        // Prevent issues with JSON.stringify/parse
        'no-unsafe-optional-chaining': 'error',
        'no-useless-escape': 'warn',

        // String and template literal safety
        'no-template-curly-in-string': 'warn',
        'no-irregular-whitespace': 'error',

        // Object property safety (for structured data schemas)
        'quote-props': ['warn', 'consistent'],
        'object-curly-spacing': ['warn', 'always'],
        'comma-dangle': ['warn', 'never'],

        // Prevent potential runtime errors
        'no-undef': 'error',
        'no-unused-vars': ['warn', {
            'argsIgnorePattern': '^_',
            'varsIgnorePattern': '^_'
        }],

        // Code quality for better maintainability
        'prefer-const': 'warn',
        'no-var': 'error',
        'eqeqeq': ['error', 'always'],

        // Next.js specific enhancements
        '@next/next/no-img-element': 'error',
        '@next/next/no-page-custom-font': 'warn',

        // Custom rules for JSON safety
        'no-eval': 'error',
        'no-implied-eval': 'error',
        'no-new-func': 'error'
    },
    overrides: [
        {
            files: ['**/*.json'],
            parser: 'jsonc-eslint-parser',
            extends: ['plugin:jsonc/recommended-with-json'],
            rules: {
                'jsonc/no-comments': 'off',
                'jsonc/trailing-comma': 'error',
                'jsonc/no-trailing-comma': 'error',
                'jsonc/quote-props': ['error', 'always'],
                'jsonc/quotes': ['error', 'double']
            }
        },
        {
            // Special rules for files with structured data
            files: ['**/page.tsx', '**/layout.tsx'],
            rules: {
                'no-useless-escape': 'error' // Stricter for pages with JSON-LD
            }
        }
    ],
    env: {
        browser: true,
        es2022: true,
        node: true
    }
};
