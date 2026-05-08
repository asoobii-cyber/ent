// components/FloatingButtons.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function FloatingButtons() {
  const [visible,    setVisible]    = useState(false)
  const [showLabels, setShowLabels] = useState(false)

  /* 2초 후 등장 */
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(t)
  }, [])

  /* 버튼 등장 후 0.5초 뒤 툴팁 노출 */
  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => setShowLabels(true), 500)
    return () => clearTimeout(t)
  }, [visible])

  const tooltipBase = 'absolute right-16 text-white text-xs font-light px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg'
  const arrowBase   = 'absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-4 border-transparent'

  return (
    <AnimatePresence>
      {visible && (
        /* floating-container : globals.css 에서 position:fixed bottom-right 설정 */
        <div className="floating-container">

          {/* ── 카카오톡 버튼 ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.4, delay: 0.1, type: 'spring', stiffness: 200 }}
            className="relative flex items-center"
          >
            <AnimatePresence>
              {showLabels && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`${tooltipBase} bg-slate-800`}>
                  카카오톡 상담
                  <div className={`${arrowBase} border-l-slate-800`} />
                </motion.div>
              )}
            </AnimatePresence>

            <a href="https://open.kakao.com/"   /* ← 실제 오픈채팅 URL 로 교체 */
              target="_blank" rel="noopener noreferrer" aria-label="카카오톡 상담"
              className="w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
              style={{ background: '#FEE500' }}>
              <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#1A1A1A">
                <path d="M12 3C6.477 3 2 6.477 2 11c0 2.912 1.612 5.468 4 6.934V21l3.29-1.646C10.488 19.778 11.235 20 12 20c5.523 0 10-3.477 10-8S17.523 3 12 3zm-1.3 10.5l-1.4-1.5-2.7 1.5 3-4.5 1.4 1.5 2.7-1.5-3 4.5z" />
              </svg>
            </a>
          </motion.div>

          {/* ── 전화 버튼 (골드 펄스) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.4, delay: 0, type: 'spring', stiffness: 200 }}
            className="relative flex items-center"
          >
            <AnimatePresence>
              {showLabels && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className={`${tooltipBase} bg-navy-900`}>
                  042-000-0000  {/* ← 실제 번호로 교체 */}
                  <div className={`${arrowBase} border-l-navy-900`} />
                </motion.div>
              )}
            </AnimatePresence>

            <a href="tel:042-000-0000"  /* ← 실제 번호로 교체 */
              aria-label="전화 예약"
              style={{ animation: 'pulseGold 3s ease-in-out infinite' }}
              className="w-14 h-14 rounded-full bg-gold-400 shadow-gold flex items-center justify-center transition-all duration-200 hover:bg-gold-300 hover:scale-110 active:scale-95">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-navy-900">
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
              </svg>
            </a>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  )
}