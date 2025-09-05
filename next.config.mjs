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
    formats: ['image/webp', 'image/avif'],
  },

  // Build optimizations
  webpack: (config, { dev, isServer, defaultLoaders, webpack }) => {
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

    // Optimize bundle splitting for better caching (only in production)
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          // Separate three.js and related 3D libraries
          three: {
            name: 'three',
            test: /[\/]node_modules[\/](three|@react-three|cobe|react-globe\.gl|three-globe)[\/]/,
            chunks: 'all',
            priority: 20,
          },
          // Separate UI libraries
          ui: {
            name: 'ui',
            test: /[\/]node_modules[\/](lucide-react|@heroicons|@headlessui|@radix-ui)[\/]/,
            chunks: 'all',
            priority: 15,
          },
        },
      };
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
    ],
  },
};

export default nextConfig;
