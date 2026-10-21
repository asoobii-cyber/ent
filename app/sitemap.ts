import type { MetadataRoute } from 'next'
import { REVIEWED, centers, conditions } from '@/lib/content'
import { site } from '@/lib/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const u = (p: string) => new URL(p, site.url).toString()
  const lastModified = new Date(REVIEWED)
  return [
    { url: u('/'), lastModified, priority: 1 },
    ...['/about/', '/about/doctor/', '/about/equipment/', '/guide/', '/faq/'].map((p) => ({ url: u(p), lastModified, priority: 0.6 })),
    ...centers.map((c) => ({ url: u(`/${c.slug}/`), lastModified, priority: 0.9 })),
    ...conditions.map((d) => ({ url: u(`/${d.center}/${d.slug}/`), lastModified, priority: 0.8 })),
  ]
}
