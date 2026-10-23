import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Video from '@/components/Video'
import { BookingBox, FaqList, JsonLd, PageHero, Reviewed } from '@/components/ui'
import { REVIEWED, withIran, conditions, conditionsOf, getCenter, getCondition } from '@/lib/content'
import { videos } from '@/lib/site'
import { breadcrumbSchema, conditionPageSchema, faqSchema } from '@/lib/schema'

export const dynamicParams = false
export function generateStaticParams() {
  return conditions.map((d) => ({ center: d.center, slug: d.slug }))
}

type Props = { params: Promise<{ center: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { center, slug } = await params
  const d = getCondition(center, slug)
  if (!d) return {}
  const url = `/${center}/${slug}/`
  const title = d.seoTitle ?? `대전 ${d.name} 증상·검사·치료`
  return {
    title,
    description: d.summary,
    keywords: [d.name, ...d.alt, `대전 ${d.name}`, `관저동 ${d.name}`],
    alternates: { canonical: url },
    openGraph: { type: 'article', title, description: d.summary, url },
  }
}

export default async function ConditionPage({ params }: Props) {
  const { center, slug } = await params
  const c = getCenter(center)
  const d = getCondition(center, slug)
  if (!c || !d) notFound()

  const crumbs = [
    { label: c.name, href: `/${c.slug}/` },
    { label: d.name, href: `/${c.slug}/${d.slug}/` },
  ]
  const toc: [string, string, boolean][] = [
    ['what', withIran(d.name), true],
    ['symptoms', '주요 증상', d.symptoms.length > 0],
    ['tests', '검사', d.tests.length > 0],
    ['treatment', '치료', true],
    ['faq', '자주 묻는 질문', d.faqs.length > 0],
  ]
  const siblings = conditionsOf(c.slug).filter((x) => x.slug !== d.slug)
  const altNames = d.alt.filter((a) => a !== d.name)

  return (
    <>
      <PageHero crumbs={crumbs} title={d.name} motif={c.motif}>
        {altNames.length > 0 && <p className="phero-alt">다른 이름: {altNames.join(', ')}</p>}
      </PageHero>
      <div className="wrap article">
        <nav className="toc" aria-label="이 페이지에서">
          <p>이 페이지에서</p>
          {toc.filter(([, , show]) => show).map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <article className="body">
          <section id="what">
            <h2>{withIran(d.name)}</h2>
            <p className="answer">{d.summary}</p>
            <div style={{ marginTop: 22 }}>
              {d.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {d.symptoms.length > 0 && (
            <section id="symptoms">
              <h2>주요 증상</h2>
              <ul className="ticks">
                {d.symptoms.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              {d.seeSoon.length > 0 && (
                <div className="warn" role="note">
                  <p className="warn-title">이런 경우는 바로 진료를 받으세요</p>
                  <ul>
                    {d.seeSoon.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {d.tests.length > 0 && (
            <section id="tests">
              <h2>검사</h2>
              <ul className="chips">
                {d.tests.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </section>
          )}

          <section id="treatment">
            <h2>치료</h2>
            <ul className="plain">
              {d.treatment.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>

          {videos.filter((v) => v.condition === d.slug).map((v) => (
            <section key={v.id} id="video">
              <h2>원장 출연 영상</h2>
              <Video v={v} />
            </section>
          ))}

          {d.faqs.length > 0 && (
            <section id="faq">
              <h2>자주 묻는 질문</h2>
              <FaqList faqs={d.faqs} />
            </section>
          )}

          <BookingBox center={c} />

          {siblings.length > 0 && (
            <nav className="related" aria-label={`${c.name}의 다른 질환`}>
              {siblings.map((s) => (
                <Link key={s.slug} href={`/${c.slug}/${s.slug}/`}>
                  {s.name}
                </Link>
              ))}
            </nav>
          )}

          <Reviewed date={REVIEWED} />
        </article>
      </div>
      <JsonLd
        data={[
          conditionPageSchema(d, c, REVIEWED),
          breadcrumbSchema(crumbs),
          ...(d.faqs.length ? [faqSchema(d.faqs)] : []),
        ]}
      />
    </>
  )
}
