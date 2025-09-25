import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ISSI - International Software Systems',
    short_name: 'ISSI',
    description: 'Award-winning software development and IT support services since 1995. Enterprise solutions for government and commercial clients.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e40af',
    categories: ['business', 'productivity', 'technology'],
    lang: 'en',
    orientation: 'portrait-primary',
    scope: '/',
    icons: [
      {
        src: '/images/issi_logo.webp',
        sizes: '192x192',
        type: 'image/webp',
        purpose: 'maskable'
      },
      {
        src: '/images/issi_logo.webp',
        sizes: '512x512',
        type: 'image/webp',
        purpose: 'any'
      }
    ],
    screenshots: [
      {
        src: '/images/project-app-screenshot.webp',
        sizes: '2432x1442',
        type: 'image/webp'
      },
      {
        src: '/images/dark-project-app-screenshot.webp',
        sizes: '2432x1442',
        type: 'image/webp'
      }
    ]
  }
}
