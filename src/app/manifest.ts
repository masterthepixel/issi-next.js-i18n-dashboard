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
        src: '/images/issi_logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/images/issi_logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      }
    ],
    screenshots: [
      {
        src: '/images/screenshot-wide.png',
        sizes: '1280x720',
        type: 'image/png'
      },
      {
        src: '/images/screenshot-narrow.png',
        sizes: '750x1334',
        type: 'image/png'
      }
    ]
  }
}
