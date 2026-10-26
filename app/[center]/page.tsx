import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BookingBox, CertCallout, FaqList, JsonLd, PageHero } from '@/components/ui'
import { certsFor } from '@/lib/site'
import { centerImage, centers, conditionsOf, getCenter } from '@/lib/content'
import { breadcrumbSchema, faqSchema } from '@/lib/schema'

export const dynamicParams = false
export function generateStaticParams() {
  return centers.map((c) => ({ center: c.slug }))
}

type Props = { params: Promise<{ center: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { center } = await params
  const c = getCenter(center)
  if (!c) return {}
  const names = conditionsOf(c.slug).map((d) => d.name).join(', ')
  return {
    title: `대전 ${c.name}`,
    description: `${c.lead} ${names} 진료.`,
    alternates: { canonical: `/${c.slug}/` },
    openGraph: { title: `대전 ${c.name}`, description: c.lead, url: `/${c.slug}/` },
  }
}

export default async function CenterPage({ params }: Props) {
  const { center } = await params
  const c = getCenter(center)
  if (!c) notFound()
  const list = conditionsOf(c.slug)
  const crumbs = [{ label: c.name, href: `/${c.slug}/` }]
  const toc = [
    ['about', '이런 분께'],
    ['steps', '진료 순서'],
    ['tools', '검사와 장비'],
    ['conditions', '질환 안내'],
    ['faq', '자주 묻는 질문'],
  ]

  return (
    <>
      <PageHero crumbs={crumbs} title={c.name} lead={c.lead} motif={c.motif} image={centerImage[c.slug]} />
      <div className="wrap article">
        <nav className="toc" aria-label="이 페이지에서">
          <p>이 페이지에서</p>
          {toc.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <div className="body">
          <section>
            {c.intro.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <CertCallout items={certsFor(c.slug)} />
          </section>

          <section id="about">
            <h2>이런 분께 권합니다</h2>
            <ul className="ticks">
              {c.forWhom.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </section>

          <section id="steps">
            <h2>진료 순서</h2>
            <ol className="steps">
              {c.steps.map((s) => (
                <li key={s.title}>
                  <span className="steps-title">{s.title}</span>
                  <span className="steps-body">{s.body}</span>
                </li>
              ))}
            </ol>
          </section>

          <section id="tools">
            <h2>검사와 장비</h2>
            <ul className="tools">
              {c.tools.map((t) => (
                <li key={t.name}>
                  <h3 className="h3">{t.name}</h3>
                  <p>{t.body}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="conditions">
            <h2>질환 안내</h2>
            <ul className="cond-list">
              {list.map((d) => (
                <li key={d.slug}>
                  <Link href={`/${c.slug}/${d.slug}/`}>
                    <span className="cond-name">{d.name}</span>
                    <p className="cond-sum">{d.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section id="faq">
            <h2>자주 묻는 질문</h2>
            <FaqList faqs={c.faqs} />
          </section>

          <BookingBox center={c} />
        </div>
      </div>
      <JsonLd data={[breadcrumbSchema(crumbs), faqSchema(c.faqs)]} />
    </>
  )
}
