import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BookingBox, FaqList, JsonLd, PageHero } from '@/components/ui'
import { type Block, columns, getColumn } from '@/lib/columns'
import { conditions, getCenter } from '@/lib/content'
import { breadcrumbSchema, columnSchema, faqSchema } from '@/lib/schema'
import { site } from '@/lib/site'

export const dynamicParams = false
export function generateStaticParams() {
  return columns.map((c) => ({ slug: c.slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const col = getColumn(slug)
  if (!col) return {}
  const title = col.seoTitle ?? col.title
  const url = `/column/${col.slug}/`
  return {
    title,
    description: col.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title,
      description: col.description,
      url,
      publishedTime: col.date,
      modifiedTime: col.reviewed,
      images: [{ url: col.cover.src, width: col.cover.w, height: col.cover.h, alt: col.cover.alt }],
    },
  }
}

const dot = (d: string) => d.replace(/-/g, '.')

// **굵게**, ==형광펜 밑줄== 표시
function rich(text: string) {
  return text.split(/(\*\*[^*]+\*\*|==[^=]+==)/).map((t, i) =>
    t.startsWith('**') ? (
      <strong key={i}>{t.slice(2, -2)}</strong>
    ) : t.startsWith('==') ? (
      <mark key={i} className="hl">
        {t.slice(2, -2)}
      </mark>
    ) : (
      t
    ),
  )
}

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'p':
            return <p key={i}>{rich(b.text)}</p>
          case 'list':
            return (
              <ul key={i} className="ticks col-list">
                {b.items.map((t) => (
                  <li key={t}>{rich(t)}</li>
                ))}
              </ul>
            )
          case 'img':
            return (
              <figure key={i} className="col-fig">
                <img src={b.src} alt={b.alt} width={b.w} height={b.h} loading="lazy" />
              </figure>
            )
          case 'warn':
            return (
              <div key={i} className="warn" role="note">
                <p className="warn-title">{b.title}</p>
                <ul>
                  {b.items.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            )
        }
      })}
    </>
  )
}

export default async function ColumnPage({ params }: Props) {
  const { slug } = await params
  const col = getColumn(slug)
  if (!col) notFound()
  const center = getCenter(col.center)
  const related = conditions.filter((d) => col.related.includes(d.slug))
  const others = columns.filter((c) => c.slug !== col.slug).slice(0, 4)

  const crumbs = [
    { label: '건강 칼럼', href: '/column/' },
    { label: col.topic, href: `/column/${col.slug}/` },
  ]

  return (
    <>
      <PageHero crumbs={crumbs} title={col.title}>
        <p className="col-meta">
          {site.doctor.name} 원장 ({site.doctor.specialty}) · {dot(col.date)}
        </p>
      </PageHero>
      <div className="wrap article">
        <nav className="toc" aria-label="이 글에서">
          <p>이 글에서</p>
          <a href="#summary">한눈에 보기</a>
          {col.sections.map((s) => (
            <a key={s.id} href={`#${s.id}`}>
              {s.heading}
            </a>
          ))}
          {col.faqs.length > 0 && <a href="#faq">자주 묻는 질문</a>}
        </nav>
        <article className="body col-body">
          <section id="summary">
            <p className="answer">{rich(col.summary)}</p>
            <figure className="col-fig col-cover">
              <img src={col.cover.src} alt={col.cover.alt} width={col.cover.w} height={col.cover.h} />
            </figure>
            <Blocks blocks={col.intro} />
          </section>

          {col.sections.map((s) => (
            <section key={s.id} id={s.id} className={s.id === 'doctor' ? 'col-doctor' : undefined}>
              <h2 className="col-h">{s.heading}</h2>
              <Blocks blocks={s.blocks} />
            </section>
          ))}

          <section id="points">
            <h2>3줄 요약</h2>
            <ol className="col-points">
              {col.keyPoints.map((k) => (
                <li key={k}>{rich(k)}</li>
              ))}
            </ol>
          </section>

          {col.faqs.length > 0 && (
            <section id="faq">
              <h2>자주 묻는 질문</h2>
              <FaqList faqs={col.faqs} />
            </section>
          )}

          {center && <BookingBox center={center} />}

          {related.length > 0 && (
            <nav className="related" aria-label="관련 질환 안내">
              {related.map((d) => (
                <Link key={d.slug} href={`/${d.center}/${d.slug}/`}>
                  {d.name}
                </Link>
              ))}
            </nav>
          )}

          {others.length > 0 && (
            <section className="col-more">
              <h2>다른 칼럼</h2>
              <ul className="cond-list">
                {others.map((o) => (
                  <li key={o.slug}>
                    <Link href={`/column/${o.slug}/`}>
                      <span className="cond-name">{o.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <p className="reviewed">
            작성·검수 {site.doctor.name} ({site.doctor.specialty}) · 작성 {dot(col.date)} · 최종 검수 {dot(col.reviewed)}
            <br />
            이 글은 일반적인 의학 정보이며, 청력 상태와 소음 노출 정도에 따라 증상과 검사 결과는 다를 수 있습니다. 정확한 진단과 치료는 진찰을 통해 결정합니다.
          </p>
        </article>
      </div>
      <JsonLd data={[columnSchema(col), breadcrumbSchema(crumbs), ...(col.faqs.length ? [faqSchema(col.faqs)] : [])]} />
    </>
  )
}
