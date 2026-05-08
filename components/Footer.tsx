// components/Footer.tsx
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const hours = [
  { day: '월 · 화 · 수 · 금', time: '09:00 – 18:00' },
  { day: '목요일 (야간 진료)', time: '09:00 – 20:00', highlight: true },
  { day: '토요일',             time: '09:00 – 13:00' },
  { day: '일 · 공휴일',        time: '휴진' },
]

const quickLinks = [
  { label: '수면 클리닉 (대전 코골이·수면무호흡)', href: '#sleep'     },
  { label: '어지럼증 클리닉',                     href: '#dizziness' },
  { label: '고압산소치료',                        href: '#hbot'      },
  { label: '청능 클리닉 (대전 난청·이명·보청기)', href: '#hearing'   },
  { label: '의료진 소개',                         href: '#doctor'    },
]

/* 공통 아이콘 래퍼 */
const IconWrap = ({ children }: { children: React.ReactNode }) => (
  <span className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5">{children}</span>
)

export default function Footer() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <footer id="footer" ref={ref} className="bg-navy-950 relative overflow-hidden">

      {/* 상단 골드 라인 */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #C4A35A 25%, #D4B87A 50%, #C4A35A 75%, transparent)' }} />

      {/* 앰비언트 글로우 */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] rounded-full bg-navy-800/30 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* ── CTA 배너 ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="py-14 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8 border-b border-white/8">
          <div>
            <p className="font-serif text-white text-2xl md:text-3xl font-light mb-2">
              대전서울고려이비인후과와 함께
            </p>
            <p className="text-silver-400 text-base font-light">
              코골이, 어지럼증, 난청·이명으로 고민이 있으시다면 전문의와 상담하세요.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <a href="tel:042-000-0000"  /* ← 실제 번호로 교체 */
              className="inline-flex items-center justify-center gap-2 bg-gold-400 hover:bg-gold-300 text-navy-900 font-medium px-7 py-3.5 rounded-sm text-sm transition-all hover:shadow-gold whitespace-nowrap">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
              </svg>
              042-000-0000
            </a>
            <a href="https://open.kakao.com/"  /* ← 실제 오픈채팅 URL 로 교체 */
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 btn-kakao font-medium px-7 py-3.5 rounded-sm text-sm whitespace-nowrap">
              카카오톡 상담
            </a>
          </div>
        </motion.div>

        {/* ── 3단 그리드 ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="py-14 grid md:grid-cols-3 gap-12">

          {/* 컬럼 1: 병원 정보 */}
          <div>
            <p className="text-gold-400 text-[10px] tracking-[0.4em] uppercase font-light mb-1">
              Daejeon Seoul Korea ENT
            </p>
            <p className="font-serif text-white text-lg font-medium mb-5 tracking-wide">
              대전서울고려이비인후과
            </p>
            <div className="space-y-3 text-silver-400 text-sm font-light">

              {/* 주소 */}
              <div className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 mt-0.5 text-gold-400 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {/* ← 실제 주소로 교체 */}
                <span>대전광역시 중구 대종로 OOO<br />OO빌딩 O층</span>
              </div>

              {/* 전화 */}
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-gold-400 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <a href="tel:042-000-0000" className="hover:text-gold-400 transition-colors">042-000-0000</a>
              </div>

              {/* 이메일 */}
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-gold-400 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span>djkoreaent@gmail.com</span>
              </div>

              {/* 웹사이트 */}
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-gold-400 flex-shrink-0">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3" />
                </svg>
                <a href="https://djkoreaent.kr" className="hover:text-gold-400 transition-colors">djkoreaent.kr</a>
              </div>
            </div>
          </div>

          {/* 컬럼 2: 진료 시간 */}
          <div>
            <h4 className="font-serif text-white text-base font-medium mb-5">진료 시간</h4>
            <div className="space-y-3">
              {hours.map((h) => (
                <div key={h.day}
                  className={`flex justify-between items-center py-2.5 px-4 rounded-lg text-sm font-light ${
                    h.highlight
                      ? 'bg-gold-400/10 border border-gold-400/20 text-gold-300'
                      : 'text-silver-400 border border-white/5'
                  }`}>
                  <span>{h.day}</span>
                  <span className={h.highlight ? 'text-gold-400 font-medium' : ''}>{h.time}</span>
                </div>
              ))}
            </div>
            <p className="text-silver-500 text-xs font-light mt-4 leading-relaxed">
              ※ 점심시간 12:30 – 14:00 (토요일 제외)<br />
              ※ 진료 시간은 변동될 수 있으니 방문 전 전화 확인 부탁드립니다.
            </p>
          </div>

          {/* 컬럼 3: 퀵 링크 + 지도 */}
          <div>
            <h4 className="font-serif text-white text-base font-medium mb-5">진료 과목</h4>
            <ul className="space-y-2.5 mb-8">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href}
                    className="text-silver-400 text-sm font-light hover:text-gold-400 transition-colors duration-200 flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-gold-400/60 flex-shrink-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <h4 className="font-serif text-white text-sm font-medium mb-3">오시는 길</h4>
            <a href="https://maps.google.com/?q=대전서울고려이비인후과"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-silver-400 hover:text-gold-400 text-sm font-light border border-white/10 hover:border-gold-400/30 px-4 py-2.5 rounded-lg transition-all duration-200">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
              </svg>
              Google 지도로 보기
            </a>
          </div>
        </motion.div>

        {/* ── 최하단 바 ── */}
        <div className="py-6 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-4 text-silver-500 text-xs font-light">
          <p>© {new Date().getFullYear()} 대전서울고려이비인후과. All rights reserved.</p>
          <span className="hidden md:block">
            대전 코골이 · 수면무호흡 · 어지럼증 · 고압산소치료 · 난청 · 이명 · 보청기
          </span>
          <div className="flex gap-5">
            <a href="/privacy" className="hover:text-silver-300 transition-colors">개인정보처리방침</a>
            <a href="/terms"   className="hover:text-silver-300 transition-colors">이용약관</a>
          </div>
        </div>
      </div>
    </footer>
  )
}