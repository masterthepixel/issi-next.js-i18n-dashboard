import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  experimental: {
    // Enable Turbopack for faster builds (Next.js 14+)
    turbo: {
      rules: {
        '*.tsx': {
          loaders: ['ts-loader'],
          as: '*.js',
        },
      },
    },
    // Enable optimized package imports
    optimizePackageImports: [
      '@react-three/fiber',
      '@react-three/drei',
      'lucide-react',
      '@heroicons/react',
      'three',
    ],
  },

  // TypeScript build optimizations
  typescript: {
    // Use SWC instead of Babel for TypeScript compilation
    tsconfigPath: './tsconfig.json',
    // Skip type checking during build if SKIP_TYPE_CHECK env var is set
    ignoreBuildErrors: process.env.SKIP_TYPE_CHECK === 'true',
  },

  // ESLint optimization
  eslint: {
    // Skip ESLint during build if SKIP_LINT env var is set  
    ignoreDuringBuilds: process.env.SKIP_LINT === 'true',
  },

  // Build optimization
  compiler: {
    // Enable SWC minification for better performance
    removeConsole: process.env.NODE_ENV === 'production',
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
    ],
    // Optimize image loading
    formats: ['image/webp', 'image/avif'],
  },

  // Webpack optimizations
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // React Three Fiber compatibility fix for React 18.3+
    // Add alias to resolve missing unstable_act export
    config.resolve.alias = {
      ...config.resolve.alias,
      // Provide react with unstable_act compatibility
      'react$': resolve(__dirname, 'src/lib/react-shim.js'),
    };

    // Add webpack plugin to provide globals if needed
    config.plugins.push(
      new webpack.DefinePlugin({
        // Ensure React.unstable_act is available for React Three Fiber
        'React.unstable_act': 'React.act',
      })
    );

    // Optimize bundle splitting for better caching (only in production)
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          // Separate three.js and related 3D libraries
          three: {
            name: 'three',
            test: /[\\/]node_modules[\\/](three|@react-three|cobe|react-globe\.gl|three-globe)[\\/]/,
            chunks: 'all',
            priority: 20,
          },
          // Separate UI libraries
          ui: {
            name: 'ui',
            test: /[\\/]node_modules[\\/](lucide-react|@heroicons|@headlessui|@radix-ui)[\\/]/,
            chunks: 'all',
            priority: 15,
          },
        },
      };
    }

    return config;
  },

  // Build output optimization
  // Only use standalone output on Vercel to avoid Windows symlink issues
  ...(process.env.VERCEL ? { output: 'standalone' } : {}),
  
  // Reduce memory usage during build
  swcMinify: true,
};

export default nextConfig;
