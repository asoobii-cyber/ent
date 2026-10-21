import Link from 'next/link'
import type { ReactNode } from 'react'
import type { Center, Faq, Motif as MotifKind } from '@/lib/content'
import { centers } from '@/lib/content'
import { hours, hoursFootnote, site } from '@/lib/site'
import Motif from './Motif'

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}

export type Crumb = { label: string; href: string }

export function PageHero({
  crumbs,
  title,
  lead,
  motif,
  image,
  children,
}: {
  crumbs: Crumb[]
  title: string
  lead?: string
  motif?: MotifKind
  image?: string
  children?: ReactNode
}) {
  return (
    <section className={`phero${image ? ' phero-has-img' : ''}`}>
      <div className="wrap phero-inner">
        <div className="phero-text">
          <nav aria-label="현재 위치" className="crumbs">
            <ol>
              <li>
                <Link href="/">홈</Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.href}>
                  {i === crumbs.length - 1 ? <span aria-current="page">{c.label}</span> : <Link href={c.href}>{c.label}</Link>}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="phero-title">{title}</h1>
          {lead && <p className="phero-lead">{lead}</p>}
          {children}
          {motif && (
            <div className="phero-motif">
              <Motif kind={motif} animate />
            </div>
          )}
        </div>
        {image && (
          <figure className="arch phero-img">
            <img src={image} alt="" />
          </figure>
        )}
      </div>
    </section>
  )
}

export function FaqList({ faqs, headingId = 'faq' }: { faqs: Faq[]; headingId?: string }) {
  return (
    <div className="faq">
      {faqs.map((f, i) => (
        <details key={i} className="faq-item" id={`${headingId}-${i + 1}`}>
          <summary>
            <span className="faq-q">{f.q}</span>
          </summary>
          <p className="faq-a">{f.a}</p>
        </details>
      ))}
    </div>
  )
}

export function BookingBox({ center }: { center: Center }) {
  const { mode, text } = center.booking
  return (
    <aside className="book" aria-label="예약 방법">
      <p className="book-title">
        {mode === 'naver' ? '초진은 네이버예약으로 받습니다' : mode === 'phone' ? '증상에 따라 바로 오시거나 전화로 예약하세요' : '예약 없이 오시면 됩니다'}
      </p>
      <p className="book-text">{text}</p>
      <div className="book-actions">
        {mode === 'naver' && (
          <a className="btn btn-solid" href={site.naverBooking} target="_blank" rel="noopener noreferrer">
            네이버예약 하기
          </a>
        )}
        <a className={`btn ${mode === 'naver' ? 'btn-ghost' : 'btn-solid'}`} href={`tel:${site.phone}`}>
          전화 {site.phone}
        </a>
        <Link className="btn btn-ghost" href="/guide/#hours">
          진료시간 보기
        </Link>
      </div>
    </aside>
  )
}

export function HoursTable({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`hours${compact ? ' hours-compact' : ''}`}>
      <table>
        <caption className="sr-only">요일별 진료시간</caption>
        <tbody>
          {hours.map((h) => (
            <tr key={h.days}>
              <th scope="row">{h.days}</th>
              <td>
                <span className="hours-time">
                  {h.open} – {h.close}
                </span>
                {(h.breaks.length > 0 || h.note) && (
                  <span className="hours-sub">{[...h.breaks, h.note].filter(Boolean).join(', ')}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!compact && <p className="hours-foot">{hoursFootnote}</p>}
    </div>
  )
}

export function Footer() {
  return (
    <footer className="ft">
      <div className="wrap ft-grid">
        <div>
          <img className="ft-logo" src="/images/logo-h.png" alt={site.legalName} width={181} height={52} />
          <p className="ft-open">{site.openDateLabel} 개원</p>
          <address className="ft-addr">
            {site.address.full}
            <br />
            대표전화 <a href={`tel:${site.phone}`}>{site.phone}</a>
          </address>
          <div className="sns">
            <a href={site.naverPlace} target="_blank" rel="noopener noreferrer">네이버 플레이스</a>
            <a href={site.blog} target="_blank" rel="noopener noreferrer">네이버 블로그</a>
            <a href={site.youtube} target="_blank" rel="noopener noreferrer">유튜브</a>
            <a href={site.kakao} target="_blank" rel="noopener noreferrer">카카오톡 채널</a>
          </div>
        </div>
        <div>
          <p className="ft-h">진료시간</p>
          <HoursTable compact />
        </div>
        <div>
          <p className="ft-h">진료 안내</p>
          <ul className="ft-links">
            {centers.map((c) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}/`}>{c.name}</Link>
              </li>
            ))}
            <li>
              <Link href="/faq/">자주 묻는 질문</Link>
            </li>
            <li>
              <a href={site.blog} target="_blank" rel="noopener noreferrer">건강 칼럼 (네이버 블로그)</a>
            </li>
            <li>
              <a href={site.youtube} target="_blank" rel="noopener noreferrer">진료 영상 (유튜브)</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap ft-legal">
        <p>
          {site.legalName} · 대표원장 {site.doctor.name} · 사업자등록번호 【확인】
        </p>
        <p>이 사이트의 의료 정보는 일반적인 안내이며, 진단과 치료는 진찰을 통해 개인별로 결정됩니다.</p>
      </div>
    </footer>
  )
}

export function MobileBar() {
  return (
    <nav className="mbar" aria-label="빠른 연결">
      <a href={`tel:${site.phone}`}>전화</a>
      <a href={site.naverBooking} target="_blank" rel="noopener noreferrer">네이버예약</a>
      <a href={site.kakao} target="_blank" rel="noopener noreferrer">카카오톡</a>
      <Link href="/guide/#location">오시는 길</Link>
    </nav>
  )
}

export function Reviewed({ date }: { date: string }) {
  return (
    <p className="reviewed">
      작성·검수 {site.doctor.name} ({site.doctor.specialty}) · 최종 검수 {date.replace(/-/g, '.')}
    </p>
  )
}
