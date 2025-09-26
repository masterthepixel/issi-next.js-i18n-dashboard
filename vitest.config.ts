/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      'test-blog-api.spec.js',
      'test-payloadcms-api.spec.js',
      'e2e/**',
    ],
    typecheck: {
      ignoreSourceErrors: false,
      include: ['**/*.test.tsx', '**/*.test.ts'],
    },
    alias: {
      'next/image': path.resolve(__dirname, './src/lib/mocks/next-image.tsx'),
      'next/link': path.resolve(__dirname, './src/lib/mocks/next-link.tsx'),
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
