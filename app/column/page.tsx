import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd, PageHero } from '@/components/ui'
import { columns, plain } from '@/lib/columns'
import { breadcrumbSchema } from '@/lib/schema'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: '건강 칼럼',
  description: `${site.doctor.name} 원장(${site.doctor.specialty})이 쓰는 귀·코·목 건강 칼럼. 난청, 이명, 어지럼증, 수면, 비염 등 자주 묻는 질문을 정리합니다.`,
  alternates: { canonical: '/column/' },
}

export default function ColumnList() {
  const crumbs = [{ label: '건강 칼럼', href: '/column/' }]
  return (
    <>
      <PageHero crumbs={crumbs} title="건강 칼럼" lead={`${site.doctor.name} 원장이 진료실에서 자주 받는 질문을 정리합니다.`} />
      <div className="wrap" style={{ paddingTop: 56, paddingBottom: 96 }}>
        {columns.length === 0 ? (
          <p className="notice">첫 칼럼을 준비하고 있습니다.</p>
        ) : (
          <ul className="col-grid">
            {columns.map((c) => (
              <li key={c.slug}>
                <Link href={`/column/${c.slug}/`} className="col-card">
                  <img src={c.cover.src} alt="" width={c.cover.w} height={c.cover.h} loading="lazy" />
                  <span className="col-card-topic">{c.topic}</span>
                  <span className="col-card-title">{c.title}</span>
                  <span className="col-card-sum">{plain(c.summary)}</span>
                  <span className="col-card-date">{c.date.replace(/-/g, '.')}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  )
}
