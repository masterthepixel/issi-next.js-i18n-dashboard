import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Bundle analyzer configuration
const withBundleAnalyzer = (await import('@next/bundle-analyzer')).default({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript build optimizations
  typescript: {
    tsconfigPath: './tsconfig.json',
    ignoreBuildErrors: process.env.SKIP_TYPE_CHECK === 'true',
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'production' || process.env.SKIP_LINT === 'true',
  },

  // Build optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    // Enable React Compiler for better performance
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? {
      properties: ['^data-testid$']
    } : false,
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "tailwindcss.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "issi-dashboard-payloadcms.vercel.app",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
  },

  // Performance optimizations
  poweredByHeader: false,
  compress: true,

  // HTTP caching headers for better performance
  async headers() {
    return [
      {
        // Cache static assets for 1 year
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache images for 1 month
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
          },
        ],
      },
      {
        // Cache fonts for 1 year
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache API responses for 5 minutes with stale-while-revalidate
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=300, stale-while-revalidate=300',
          },
        ],
      },
      {
        // Security headers
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Build optimizations
  webpack: (config, { dev, isServer, webpack }) => {
    // React Three Fiber compatibility fix for React 18.3+
    config.resolve.alias = {
      ...config.resolve.alias,
      'react$': resolve(__dirname, 'src/lib/react-shim.js'),
    };

    // Add webpack plugin to provide globals if needed
    config.plugins.push(
      new webpack.DefinePlugin({
        'React.unstable_act': 'React.act',
      })
    );

    // Optimize bundle splitting for better caching and reduce main thread blocking
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        chunks: 'all',
        maxInitialRequests: 25,
        maxAsyncRequests: 30,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          // Framework chunk - React and Next.js core
          framework: {
            name: 'framework',
            test: /[\\/]node_modules[\\/](react|react-dom|next|@next)[\\/]/,
            chunks: 'all',
            priority: 40,
            enforce: true,
          },
          // Large vendor libraries - split aggressively
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: 10,
            maxSize: 300000, // Increased from 200kB
            minSize: 100000,
          },
          // UI component libraries
          ui: {
            name: 'ui',
            test: /[\\/]node_modules[\\/](lucide-react|@heroicons|@headlessui|@radix-ui|framer-motion|tailwindcss)[\\/]/,
            chunks: 'all',
            priority: 20,
            maxSize: 200000, // Increased from 100kB
            minSize: 50000,
          },
          // Internationalization libraries
          i18n: {
            name: 'i18n',
            test: /[\\/]node_modules[\\/](react-intl|@formatjs|next-intl)[\\/]/,
            chunks: 'all',
            priority: 15,
            maxSize: 150000, // Increased from 80kB
            minSize: 30000,
          },
          // Data handling libraries
          data: {
            name: 'data',
            test: /[\\/]node_modules[\\/](@tanstack|@apollo|graphql|axios|swr)[\\/]/,
            chunks: 'all',
            priority: 12,
            maxSize: 100000,
            minSize: 20000,
          },
          // Utility libraries
          utils: {
            name: 'utils',
            test: /[\\/]node_modules[\\/](lodash|date-fns|clsx|cn|class-variance-authority)[\\/]/,
            chunks: 'all',
            priority: 8,
            maxSize: 80000,
            minSize: 15000,
          },
        },
      };

      // Additional optimizations to reduce main thread blocking
      config.optimization.minimize = true;
      config.optimization.sideEffects = false;
      // Enable more aggressive tree shaking
      config.optimization.usedExports = true;
      config.optimization.innerGraph = true;
    }

    return config;
  },

  // Only use standalone output on Vercel to avoid Windows symlink issues
  ...(process.env.VERCEL ? { output: 'standalone' } : {}),

  // Turbopack configuration (Next.js 15+)
  turbopack: {
    rules: {
      '*.tsx': {
        loaders: ['ts-loader'],
        as: '*.js',
      },
    },
  },

  // Optimize package imports
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@heroicons/react',
      'react-intl',
      '@formatjs/icu-messageformat-parser',
    ],
    // Enable new optimizations (critical CSS handled manually)
    gzipSize: true,
    // Reduce JavaScript bundle size
    esmExternals: true,
    // Improve hydration performance
    optimizeServerReact: true,
  },
};

export default withBundleAnalyzer(nextConfig);
