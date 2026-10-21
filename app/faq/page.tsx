import type { Metadata } from 'next'
import Link from 'next/link'
import { FaqList, JsonLd, PageHero } from '@/components/ui'
import { centers, conditions, generalFaqs } from '@/lib/content'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: '자주 묻는 질문',
  description: `${site.name} 예약, 진료시간, 주차, 서류 발급과 어지럼증·수면·난청 진료에 대해 자주 묻는 질문.`,
  alternates: { canonical: '/faq/' },
}

export default function FaqPage() {
  const crumbs = [{ label: '자주 묻는 질문', href: '/faq/' }]
  const groups = [
    { id: 'visit', name: '진료 이용', faqs: generalFaqs },
    ...centers.map((c) => ({
      id: c.slug,
      name: c.name,
      faqs: [...c.faqs, ...conditions.filter((d) => d.center === c.slug).flatMap((d) => d.faqs)],
    })),
  ]
  return (
    <>
      <PageHero crumbs={crumbs} title="자주 묻는 질문" lead="많이 물어보시는 내용을 진료별로 모았습니다." />
      <div className="wrap article">
        <nav className="toc" aria-label="질문 분류">
          <p>분류</p>
          {groups.map((g) => (
            <a key={g.id} href={`#${g.id}`}>
              {g.name}
            </a>
          ))}
        </nav>
        <div className="body">
          {groups.map((g) => (
            <section key={g.id} id={g.id}>
              <h2>{g.name}</h2>
              <FaqList faqs={g.faqs} headingId={g.id} />
              {g.id !== 'visit' && (
                <p style={{ marginTop: 14 }}>
                  <Link href={`/${g.id}/`}>{g.name} 안내 보기</Link>
                </p>
              )}
            </section>
          ))}
        </div>
      </div>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(generalFaqs)]} />
    </>
  )
}
