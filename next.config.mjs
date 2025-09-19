import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          // Separate vendor libraries to reduce main bundle size
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: 10,
            maxSize: 200000, // Split large vendor bundles
          },
          // Separate three.js and related 3D libraries
          three: {
            name: 'three',
            test: /[\\/]node_modules[\\/](three|@react-three|cobe|react-globe\.gl|three-globe)[\\/]/,
            chunks: 'all',
            priority: 20,
            maxSize: 150000,
          },
          // Separate UI libraries
          ui: {
            name: 'ui',
            test: /[\\/]node_modules[\\/](lucide-react|@heroicons|@headlessui|@radix-ui)[\\/]/,
            chunks: 'all',
            priority: 15,
            maxSize: 100000,
          },
          // Separate i18n libraries
          i18n: {
            name: 'i18n',
            test: /[\\/]node_modules[\\/](react-intl|@formatjs)[\\/]/,
            chunks: 'all',
            priority: 12,
            maxSize: 80000,
          },
        },
      };

      // Additional optimizations to reduce main thread blocking
      config.optimization.minimize = true;
      config.optimization.sideEffects = false;
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
      '@react-three/fiber',
      '@react-three/drei',
      'lucide-react',
      '@heroicons/react',
      'three',
      'react-intl',
      '@formatjs/icu-messageformat-parser',
    ],
    // Enable new optimizations (disabled optimizeCss due to critters dependency)
    gzipSize: true,
    // Reduce JavaScript bundle size
    esmExternals: true,
    // Improve hydration performance
    optimizeServerReact: true,
  },
};

export default nextConfig;
