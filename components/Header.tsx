'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { nav } from '@/lib/nav'
import { site } from '@/lib/site'

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState<number | null>(null)
  const [mobile, setMobile] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setOpen(null)
    setMobile(false)
  }, [pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(null)
        setMobile(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : ''
  }, [mobile])

  const enter = (i: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(i)
  }
  const leave = () => {
    closeTimer.current = setTimeout(() => setOpen(null), 140)
  }

  const isActive = (href: string) => pathname?.startsWith(href.replace(/#.*/, ''))

  return (
    <header className="hd" onMouseLeave={leave}>
      <div className="hd-bar wrap">
        <Link href="/" className="brand" aria-label={`${site.name} 홈`}>
<img src="/images/logo-h.png" alt={`${site.legalName} KOREA ENT CLINIC`} width={160} height={46} />
        </Link>

        <nav className="gnb" aria-label="주 메뉴">
          <ul>
            {nav.map((g, i) => (
              <li key={g.href} onMouseEnter={() => enter(i)}>
                <Link
                  href={g.href}
                  className={`gnb-link${isActive(g.href) ? ' is-active' : ''}${open === i ? ' is-open' : ''}`}
                  aria-expanded={open === i}
                  onFocus={() => enter(i)}
                >
                  {g.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hd-actions">
          <a className="hd-call" href={`tel:${site.phone}`}>
            <span className="sr-only">전화 </span>
            {site.phone}
          </a>
          <a className="btn btn-solid btn-sm" href={site.naverBooking} target="_blank" rel="noopener noreferrer">
            네이버예약
          </a>
          <button
            className="hd-burger"
            aria-label={mobile ? '메뉴 닫기' : '전체 메뉴 열기'}
            aria-expanded={mobile}
            onClick={() => setMobile((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {open !== null && (
        <div className="mega" onMouseEnter={() => enter(open)}>
          <div className="wrap mega-inner">
            <div className="mega-head">
              <p className="mega-title">{nav[open].label}</p>
              <p className="mega-blurb">{nav[open].blurb}</p>
            </div>
            <ul className="mega-links">
              {nav[open].links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onBlur={(e) => {
                    if (!e.currentTarget.closest('.mega')?.contains(e.relatedTarget as Node)) leave()
                  }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {mobile && (
        <div className="mnav" role="dialog" aria-label="전체 메뉴">
          <div className="wrap">
            {nav.map((g) => (
              <section key={g.href} className="mnav-group">
                <Link href={g.href} className="mnav-title">{g.label}</Link>
                <ul>
                  {g.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
