'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { site } from '@/lib/site'

// 홈 첫 방문 시 뜨는 개원 안내 팝업. "오늘 하루 보지 않기"는 이 브라우저에만 저장됩니다.
const KEY = 'notice-open-hide-until'

export default function NoticePopup() {
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let hidden = false
    try {
      const until = Number(localStorage.getItem(KEY) || 0)
      hidden = until > Date.now()
    } catch {}
    if (!hidden) setOpen(true)
  }, [])

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const hideToday = () => {
    try {
      const end = new Date()
      end.setHours(23, 59, 59, 999)
      localStorage.setItem(KEY, String(end.getTime()))
    } catch {}
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className="pop-backdrop" onClick={() => setOpen(false)}>
      <div className="pop" role="dialog" aria-modal="true" aria-labelledby="pop-title" onClick={(e) => e.stopPropagation()}>
        <img className="pop-logo" src="/images/logo-h.png" alt="" width={181} height={52} />
        <p className="pop-eyebrow">개원 안내</p>
        <h2 id="pop-title" className="pop-title">
          {site.openDateLabel}(월)
          <br />
          고려이비인후과가 문을 엽니다
        </h2>
        <p className="pop-text">
          관저동 <strong>대전서울아산이비인후과</strong>가 있던 자리에서 고려이비인후과로 새롭게 진료를 시작합니다. 위치는 그대로, 같은
          건물 3층입니다.
        </p>
        <div className="pop-actions">
          <Link className="btn btn-solid" href="/guide/#location" onClick={() => setOpen(false)}>
            오시는 길 보기
          </Link>
          <button ref={closeRef} type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>
            닫기
          </button>
        </div>
        <button type="button" className="pop-hide" onClick={hideToday}>
          오늘 하루 보지 않기
        </button>
      </div>
    </div>
  )
}
