import type { Metadata } from 'next'
import { JsonLd, PageHero } from '@/components/ui'
import { breadcrumbSchema, doctorSchema } from '@/lib/schema'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: `${site.doctor.name} 원장 소개`,
  description: `${site.name} ${site.doctor.title} ${site.doctor.name} — ${site.doctor.specialty}. ${site.doctor.training.join(', ')}.`,
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
          <div className="doc-photo">
            <img src={site.doctor.photoAlt} alt={`${site.doctor.name} ${site.doctor.title}`} width={1000} height={1500} />
          </div>
          <div>
            <h2 className="doc-name">{site.doctor.name}</h2>
            <p className="doc-role">
              {site.doctor.title} · {site.doctor.specialty}
            </p>
            <p className="doc-quote">
              어지럼, 수면, 청력처럼 설명하기 어려운 증상일수록 검사로 확인하고 쉬운 말로 풀어드리겠습니다. 오래 걸리는 치료는 중간에
              놓치지 않도록 일정을 정해 다시 보겠습니다.
            </p>
            <h3 className="h3" style={{ marginTop: 36 }}>
              학력·경력
            </h3>
            <ul className="doc-career">
              {site.doctor.career.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
            <div className="doc-more">
              {site.doctor.photos.map((src) => (
                <img key={src} src={src} alt={`${site.doctor.name} 원장`} width={1000} height={1500} loading="lazy" />
              ))}
            </div>
          </div>
        </div>
      </section>
      <JsonLd data={[doctorSchema(), breadcrumbSchema(crumbs)]} />
    </>
  )
}
