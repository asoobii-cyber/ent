// components/HeroSection.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

/* ── 전공과목 카드 데이터 ── */
const heroSpecialties = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
      </svg>
    ),
    title: '수면 클리닉', subtitle: '코골이 · 수면무호흡',
    color: 'from-blue-900/60 to-blue-800/40', href: '#sleep',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <circle cx="12" cy="12" r="3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v3m0 14v3M2 12h3m14 0h3m-3.5-7.5-2 2m-9 9-2 2m13 0-2-2m-9-9-2-2" />
      </svg>
    ),
    title: '어지럼증 클리닉', subtitle: '전정기능 정밀검사',
    color: 'from-indigo-900/60 to-indigo-800/40', href: '#dizziness',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1M3 12h1m16 0h1M5.636 5.636l.707.707m11.314 11.314.707.707M5.636 18.364l.707-.707M17.657 6.343l.707-.707" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
    title: '고압산소치료', subtitle: '최신 챔버 운영',
    color: 'from-cyan-900/60 to-cyan-800/40', href: '#hbot',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53L6.75 15.75H4.5a.75.75 0 01-.75-.75V9a.75.75 0 01.75-.75h2.25z" />
      </svg>
    ),
    title: '난청 · 이명', subtitle: '정밀 청력 검사',
    color: 'from-violet-900/60 to-violet-800/40', href: '#hearing',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
    title: '보청기', subtitle: '전문가 자격증 보유',
    color: 'from-purple-900/60 to-purple-800/40', href: '#hearing',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
    title: '이비인후과', subtitle: '전문의 직접 진료',
    color: 'from-rose-900/60 to-rose-800/40', href: '#doctor',
  },
]

const navItems = [
  { label: '수면 클리닉',   href: '#sleep'     },
  { label: '어지럼증',      href: '#dizziness' },
  { label: '고압산소치료',  href: '#hbot'      },
  { label: '청능 클리닉',   href: '#hearing'   },
  { label: '의료진',        href: '#doctor'    },
  { label: '오시는 길',     href: '#footer'    },
]

/* ── Framer Motion 변수 ── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}
const itemVariants = {
  hidden:   { opacity: 0, y: 24 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, delay: 0.6 + i * 0.07, ease: 'easeOut' },
  }),
}

/* ── Phone icon (재사용) ── */
const PhoneIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
  </svg>
)

export default function HeroSection() {
  const [scrolled, setScrolled]         = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ══════════ NAVIGATION ══════════ */}
      <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-navy-900/97 backdrop-blur-xl shadow-navy-lg border-b border-white/5'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 md:h-20 flex items-center justify-between">

          {/* 로고 */}
          <a href="#" className="flex flex-col">
            <span className="text-gold-400 text-[10px] font-light tracking-[0.45em] uppercase leading-none mb-1">
              Daejeon Seoul Korea ENT
            </span>
            <span className="font-serif text-white text-sm md:text-base font-medium tracking-wider">
              대전서울고려이비인후과
            </span>
          </a>

          {/* 데스크탑 내비게이션 */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => (
              <a key={item.label} href={item.href}
                className="text-silver-300 hover:text-gold-300 text-sm font-light tracking-wide transition-colors duration-200">
                {item.label}
              </a>
            ))}
          </nav>

          {/* 전화 예약 CTA */}
          <div className="hidden lg:flex">
            <a href="tel:042-000-0000"
              className="flex items-center gap-2 text-navy-900 bg-gold-400 hover:bg-gold-300 px-5 py-2.5 rounded-sm text-sm font-medium transition-all duration-200 hover:shadow-gold">
              <PhoneIcon />전화 예약
            </a>
          </div>

          {/* 모바일 햄버거 */}
          <button className="lg:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="메뉴">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {mobileMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />}
            </svg>
          </button>
        </div>

        {/* 모바일 드롭다운 */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-navy-900/98 backdrop-blur-xl border-t border-white/5 overflow-hidden"
            >
              <div className="px-5 py-4 flex flex-col gap-4">
                {navItems.map((item) => (
                  <a key={item.label} href={item.href}
                    className="text-silver-300 text-sm py-1 font-light tracking-wide"
                    onClick={() => setMobileMenuOpen(false)}>
                    {item.label}
                  </a>
                ))}
                <a href="tel:042-000-0000"
                  className="mt-2 flex items-center justify-center gap-2 text-navy-900 bg-gold-400 px-5 py-3 rounded-sm text-sm font-medium">
                  📞 전화 예약
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ══════════ HERO MAIN ══════════ */}
      <section className="relative min-h-screen bg-hero geo-grid flex flex-col justify-center overflow-hidden">

        {/* 앰비언트 글로우 */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-700/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-gold-400/8 blur-[100px] pointer-events-none" />

        {/* 상단 골드 라인 */}
        <div className="absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent 0%, #C4A35A 30%, #D4B87A 50%, #C4A35A 70%, transparent 100%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 lg:px-8 pt-28 md:pt-36 pb-20">

          {/* 헤드라인 블록 */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center mb-14 md:mb-20">

            {/* 자격 배지 */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-3 mb-8">
              <div className="h-px w-10 bg-gold-400/60" />
              <span className="section-label">
                고려대학교 의과대학 출신 &nbsp;·&nbsp; 보건복지부 인증 이비인후과 전문의 &nbsp;·&nbsp; 수면 전문의
              </span>
              <div className="h-px w-10 bg-gold-400/60" />
            </motion.div>

            {/* H1 */}
            <motion.h1 variants={itemVariants}
              className="font-serif text-3xl sm:text-4xl md:text-6xl font-light text-white leading-[1.15] mb-4 tracking-tight">
              대전의 잠과 숨, 어지럼증,
              <br className="hidden sm:block" />
              <span className="text-gold-gradient font-medium"> 소리를 책임지는</span>
            </motion.h1>

            <motion.p variants={itemVariants}
              className="font-serif text-2xl sm:text-3xl md:text-4xl text-silver-300 font-light tracking-widest mt-3 mb-6">
              대전서울고려이비인후과
            </motion.p>

            {/* 골드 구분선 */}
            <motion.div variants={itemVariants} className="flex justify-center mb-8">
              <div className="gold-divider" />
            </motion.div>

            {/* 서브 카피 */}
            <motion.p variants={itemVariants}
              className="text-silver-400 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              수면 전문의 · 어지럼증 전문가 · 이명 전문가 · 보청기전문가 자격증을 보유한<br className="hidden md:block" />
              전문의가 정밀 검사부터 맞춤 치료까지 직접 담당합니다.
            </motion.p>

            {/* CTA 버튼 그룹 */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mt-10">
              <a href="tel:042-000-0000"
                className="inline-flex items-center gap-2.5 bg-gold-400 hover:bg-gold-300 text-navy-900 font-medium px-8 py-3.5 rounded-sm transition-all duration-200 hover:shadow-gold-lg text-sm tracking-wide">
                <PhoneIcon /> 전화 예약 · 042-000-0000
              </a>
              <a href="https://open.kakao.com/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 btn-kakao font-medium px-8 py-3.5 rounded-sm text-sm tracking-wide hover:opacity-90">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3C6.477 3 2 6.477 2 11c0 2.912 1.612 5.468 4 6.934V21l3.29-1.646C10.488 19.778 11.235 20 12 20c5.523 0 10-3.477 10-8S17.523 3 12 3z" />
                </svg>
                카카오톡 상담
              </a>
              <a href="#sleep"
                className="inline-flex items-center gap-2 text-silver-300 hover:text-gold-300 border border-white/15 hover:border-gold-400/40 px-8 py-3.5 rounded-sm text-sm font-light transition-all duration-200">
                진료 안내 보기
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* 전공과목 미니카드 6개 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {heroSpecialties.map((spec, i) => (
              <motion.a key={spec.title} href={spec.href}
                custom={i} variants={cardVariants} initial="hidden" animate="visible"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="glass-card glass-card-hover rounded-xl p-4 flex flex-col items-center text-center cursor-pointer group">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${spec.color} flex items-center justify-center text-silver-200 group-hover:text-gold-300 mb-3 transition-colors duration-300`}>
                  {spec.icon}
                </div>
                <p className="font-serif text-white text-sm font-medium mb-1 group-hover:text-gold-300 transition-colors duration-300 leading-tight">
                  {spec.title}
                </p>
                <p className="text-silver-400 text-[11px] font-light leading-tight">{spec.subtitle}</p>
              </motion.a>
            ))}
          </div>

          {/* 자격 배지 하단 */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.4 }}
            className="mt-12 flex flex-wrap justify-center gap-6 text-silver-500 text-xs font-light">
            {['보건복지부 인증 이비인후과 전문의', '대한수면연구학회 수면 전문의',
              '이비인후과 어지럼증 전문가 자격증', '이명 전문가 자격증', '보청기전문가 자격증'].map((badge) => (
              <div key={badge} className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-gold-400" />
                <span>{badge}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 스크롤 인디케이터 */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}>
          <div className="w-5 h-9 rounded-full border border-silver-500/40 flex items-start justify-center pt-1.5">
            <div className="w-0.5 h-2.5 bg-gold-400/60 rounded-full" />
          </div>
        </motion.div>
      </section>
    </>
  )
}