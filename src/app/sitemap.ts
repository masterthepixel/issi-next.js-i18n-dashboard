import { getAllProducts } from '@/lib/products'
import { MetadataRoute } from 'next'
import { i18n } from '../../i18n-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://issi-software.com'

  // Static pages that exist in the project
  const staticPages = [
    '',
    '/about',
    '/services',
    '/products',
    '/government',
    '/eLearning',
    '/compliance',
    '/contact',
    '/infrastructure',
    '/license',
    '/privacy',
    '/terms'
  ]

  const sitemap: MetadataRoute.Sitemap = []

  // Add multilingual static pages
  staticPages.forEach(page => {
    i18n.locales.forEach(locale => {
      const priority = page === '' ? 1 : page === '/products' || page === '/services' ? 0.9 : 0.8
      const changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' =
        page === '' ? 'weekly' :
          page === '/products' || page === '/services' ? 'monthly' :
            'yearly'

      sitemap.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: {
          languages: Object.fromEntries(
            i18n.locales.map(lang => [lang, `${baseUrl}/${lang}${page}`])
          )
        }
      })
    })
  })

  // Add dynamic product pages
  try {
    const products = await getAllProducts()
    products.forEach(product => {
      i18n.locales.forEach(locale => {
        sitemap.push({
          url: `${baseUrl}/${locale}/products/${product.slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
          alternates: {
            languages: Object.fromEntries(
              i18n.locales.map(lang => [lang, `${baseUrl}/${lang}/products/${product.slug}`])
            )
          }
        })
      })
    })
  } catch (error) {
    console.warn('Failed to load products for sitemap:', error)
  }

  return sitemap
}
