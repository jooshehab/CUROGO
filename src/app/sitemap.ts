import type { MetadataRoute } from 'next'
import { SITE, SERVICES, CITIES } from '@/lib/site-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://curego.eg'
  const lastModified = new Date()

  const pages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/#/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#/services`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#/areas`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#/prices`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#/booking`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#/sitemap`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/#/terms`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ]

  // Service pages
  SERVICES.forEach((service) => {
    pages.push({
      url: `${baseUrl}/#/services/${service.slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
    })
  })

  // City pages and district pages
  CITIES.forEach((city) => {
    pages.push({
      url: `${baseUrl}/#/areas/${city.slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.85,
    })
    city.districts.forEach((district) => {
      pages.push({
        url: `${baseUrl}/#/areas/${city.slug}/${district.slug}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    })
  })

  return pages
}
