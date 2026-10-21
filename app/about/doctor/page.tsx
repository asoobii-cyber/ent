import type { Metadata } from 'next'
import { JsonLd, PageHero } from '@/components/ui'
import { breadcrumbSchema, doctorSchema } from '@/lib/schema'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: `${site.doctor.name} 원장 소개`,
  description: `${site.name} ${site.doctor.title} ${site.doctor.name} — ${site.doctor.specialty}. ${site.doctor.history.flatMap((g) => g.items).slice(0, 4).join(', ')}.`,
  alternates: { canonical: '/about/doctor/' },
}

export default function Doctor() {
  const crumbs = [
    { label: '병원 소개', href: '/about/' },
    { label: '원장 소개', href: '/about/doctor/' },
  ]
  return (
    <>
      <PageHero crumbs={crumbs} title="원장 소개" />
      <section className="sec">
        <div className="wrap doc doc-top">
          <div className="doc-photo doc-photo-light">
            <img src={site.doctor.portrait} alt={`${site.doctor.name} ${site.doctor.title}`} width={1000} height={1294} />
          </div>
          <div>
            <h2 className="doc-name">{site.doctor.name} 원장</h2>
            <p className="doc-role">
              {site.doctor.title} · {site.doctor.specialty}
            </p>
            <p className="doc-quote">{site.doctor.quote}</p>
            <div className="hist">
              {site.doctor.history.map((g) => (
                <section key={g.title} className="hist-group">
                  <h3 className="hist-title">{g.title}</h3>
                  <ul>
                    {g.items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
      <JsonLd data={[doctorSchema(), breadcrumbSchema(crumbs)]} />
    </>
  )
}
