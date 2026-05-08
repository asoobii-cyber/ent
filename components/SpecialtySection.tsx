// components/SpecialtySection.tsx
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/* ── 공통 InView 훅 ── */
function useFadeIn(options = {}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px', ...options })
  return { ref, inView }
}

/* ── 공통 애니메이션 팩토리 ── */
const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] } },
})
const fadeLeft = (delay = 0) => ({
  hidden:  { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay, ease: 'easeOut' } },
})
const fadeRight = (delay = 0) => ({
  hidden:  { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay, ease: 'easeOut' } },
})

/* ══════════════════════════════════════════════
   SECTION 1 – 수면 클리닉
   Dark Navy 배경
══════════════════════════════════════════════ */
function SleepClinicSection() {
  const { ref, inView } = useFadeIn()

  const features = [
    { label: '수면다원검사(PSG)',     desc: '병원급 수준의 수면다원검사로 코골이·수면무호흡의 중증도를 정밀 분석합니다.' },
    { label: '양압기(CPAP) 처방·관리', desc: '국내외 최신 양압기 처방 및 지속 사용 관리를 전문의가 직접 지원합니다.' },
    { label: '수술적 치료',           desc: '구개수구개인두성형술(UPPP), 고주파 설근부 축소술 등 원인별 맞춤 수술을 제공합니다.' },
    { label: '비수술적 치료',         desc: '구강 내 장치(OAT), 체위요법 등 수술 없이도 효과적인 치료 옵션을 제시합니다.' },
    { label: '소아 코골이·수면무호흡', desc: '성장기 아이의 코골이는 발달에 영향을 줍니다. 소아 전문 접근으로 안전하게 치료합니다.' },
    { label: '수면 전문의 자격 보유',  desc: '대한수면연구학회 공인 수면 전문의가 초진부터 치료·추적 관찰까지 일관되게 담당합니다.' },
  ]

  return (
    <section id="sleep" className="relative bg-hero geo-grid stripe-accent py-24 md:py-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/8 blur-[120px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* 좌측 텍스트 */}
          <motion.div variants={fadeLeft()} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
            <p className="section-label mb-4">Sleep Clinic</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-light leading-snug mb-2">
              대전 코골이·수면무호흡
            </h2>
            <h3 className="font-serif text-2xl md:text-3xl text-gold-gradient font-medium leading-snug mb-6">
              전문 수면 클리닉
            </h3>
            <div className="gold-divider mb-8" />
            <p className="text-silver-300 text-base font-light leading-relaxed mb-4">
              대전 코골이는 단순한 수면 방해를 넘어 심뇌혈관 질환, 당뇨, 인지기능 저하와 연관된
              심각한 건강 문제입니다. 대전서울고려이비인후과의{' '}
              <strong className="text-white font-medium">수면 전문의</strong>는 수면다원검사를 통해
              코골이와 수면무호흡의 중증도를 정밀하게 평가하고, 비수술·수술적 치료를 아우르는
              맞춤 전략을 제시합니다.
            </p>
            <p className="text-silver-400 text-sm font-light leading-relaxed mb-10">
              대전 수면무호흡 치료는 호흡 멈춤의 빈도(AHI)와 산소 포화도 저하 양상에 따라
              개인화된 치료 계획이 필요합니다. 단순 코골이부터 중증 폐쇄성 수면무호흡(OSA)까지,
              최적의 결과를 위해 전문의가 직접 관리합니다.
            </p>

            {/* 통계 */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { stat: '15+',  label: '수면다원\n검사 항목' },
                { stat: '98%',  label: '진단 정확도' },
                { stat: '수면', label: '전문의\n자격 보유' },
              ].map(({ stat, label }) => (
                <div key={stat} className="glass-card rounded-lg p-4 text-center">
                  <p className="text-gold-400 text-2xl font-serif font-medium mb-1">{stat}</p>
                  <p className="text-silver-400 text-xs font-light whitespace-pre-line leading-tight">{label}</p>
                </div>
              ))}
            </div>

            <a href="tel:042-000-0000"
              className="inline-flex items-center gap-2 bg-gold-400 hover:bg-gold-300 text-navy-900 font-medium px-7 py-3 rounded-sm text-sm transition-all duration-200 hover:shadow-gold">
              수면 클리닉 예약 →
            </a>
          </motion.div>

          {/* 우측 피처 카드 */}
          <motion.div variants={fadeRight(0.15)} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="grid sm:grid-cols-2 gap-3">
            {features.map((feat, i) => (
              <motion.div key={feat.label}
                variants={fadeUp(0.1 + i * 0.07)} initial="hidden" animate={inView ? 'visible' : 'hidden'}
                className="glass-card glass-card-hover rounded-xl p-5 card-lift">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-gold-400 mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-medium font-serif mb-1">{feat.label}</p>
                    <p className="text-silver-400 text-xs font-light leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   SECTION 2 – 어지럼증 클리닉
   White 배경
══════════════════════════════════════════════ */
function DizzinessSection() {
  const { ref, inView } = useFadeIn()

  const conditions = [
    { name: '이석증 (BPPV)',  desc: '이석치환술(Epley법)로 단기간에 증상 해소',          icon: '⟳' },
    { name: '메니에르병',     desc: '저염식이·이뇨제·내림프낭 수술 등 단계별 치료',      icon: '◎' },
    { name: '전정신경염',     desc: '스테로이드 치료 및 전정재활 운동',                  icon: '⟲' },
    { name: '중추성 어지럼증', desc: '영상검사 협진으로 신속한 원인 감별',               icon: '✦' },
    { name: '청성 어지럼증',  desc: '청력 검사 병행으로 달팽이관·전정 동시 평가',        icon: '◈' },
    { name: '만성 어지럼증',  desc: '전정재활치료(VRT) 프로그램 운영',                   icon: '◉' },
  ]

  return (
    <section id="dizziness" className="py-24 md:py-32 bg-section-white relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-navy-100 opacity-40 pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full border border-gold-400/20 opacity-30 pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* 헤더 */}
        <motion.div variants={fadeUp()} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16">
          <p className="section-label mb-3">Dizziness Clinic</p>
          <h2 className="font-serif text-3xl md:text-4xl text-navy-900 font-light mb-2">
            대전 어지럼증 클리닉
          </h2>
          <h3 className="font-serif text-2xl md:text-3xl text-gold-500 font-medium mb-6">
            체계적인 원인별 맞춤 치료
          </h3>
          <div className="gold-divider mx-auto mb-8" />
          <p className="text-slate-600 text-base font-light leading-relaxed max-w-2xl mx-auto">
            갑자기 세상이 빙빙 도는 느낌, 걸을 때 휘청거리는 증상—이러한 어지럼증의 약 50%는
            이비인후과적 원인인 <strong className="text-navy-800">전정 기관 이상</strong>에서 비롯됩니다.
            대전서울고려이비인후과는{' '}
            <strong className="text-navy-800">이비인후과 어지럼증 전문가 자격증</strong>을 보유한 전문의가
            비디오 안진검사·전정기능검사를 통해 원인을 정밀하게 감별하고 맞춤 치료를 제공합니다.
          </p>
        </motion.div>

        {/* 질환 그리드 */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {conditions.map((cond, i) => (
            <motion.div key={cond.name}
              variants={fadeUp(0.1 + i * 0.08)} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              className="bg-white border border-slate-100 rounded-2xl p-6 hover:border-gold-400/50 hover:shadow-lg transition-all duration-300 card-lift group">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center text-navy-700 text-lg font-serif group-hover:bg-navy-900 group-hover:text-gold-400 transition-all duration-300">
                  {cond.icon}
                </div>
                <h4 className="font-serif text-navy-900 text-sm font-medium">{cond.name}</h4>
              </div>
              <p className="text-slate-500 text-sm font-light leading-relaxed">{cond.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 진단 프로세스 */}
        <motion.div variants={fadeUp(0.3)} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="bg-navy-900 rounded-2xl p-8 md:p-10">
          <h4 className="font-serif text-xl text-white font-light mb-8 text-center">
            대전 어지럼증 <span className="text-gold-400">정밀 검사 과정</span>
          </h4>
          <div className="grid sm:grid-cols-4 gap-4">
            {[
              { step: '01', title: '초진 문진',    desc: '어지럼증 발생 양상, 동반 증상, 과거력 청취' },
              { step: '02', title: '비디오 안진검사', desc: '눈의 움직임을 분석해 이석증, 전정신경염 등 감별' },
              { step: '03', title: '전정기능검사',  desc: '온도안진검사(칼로리 검사)로 좌우 전정 기능 비교 평가' },
              { step: '04', title: '맞춤 치료',    desc: '이석치환술·약물·수술·전정재활 중 최적 치료 시행' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full border border-gold-400/40 flex items-center justify-center mx-auto mb-3">
                  <span className="text-gold-400 font-serif text-sm">{item.step}</span>
                </div>
                <p className="text-white text-sm font-medium font-serif mb-2">{item.title}</p>
                <p className="text-silver-400 text-xs font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   SECTION 3 – 고압산소치료 ★ 페이지의 하이라이트
   가장 어두운 Deep Dark 배경 + 동심원 링 애니메이션
══════════════════════════════════════════════ */
function HBOTSection() {
  const { ref, inView } = useFadeIn()

  const indications = [
    '돌발성 난청 집중 치료', '이명 병행 치료',   '급성 저음형 감각신경성 난청',
    '상처 치유 촉진',       '이압손상',         '일산화탄소 중독',
    '당뇨성 족부궤양',      '방사선 조직 괴사',  '근골격계 질환',
  ]

  return (
    <section id="hbot" className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #04090F 0%, #060F1E 40%, #0A1628 70%, #0D1E38 100%)' }}>

      {/* 동심원 글로우 링 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-gold-400/5  pointer-events-none animate-pulse-gold" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-gold-400/8  pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-blue-900/5 blur-[80px] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #C4A35A 30%, #D4B87A 50%, #C4A35A 70%, transparent)' }} />

      <div ref={ref} className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* 헤더 */}
        <motion.div variants={fadeUp()} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16">
          <p className="section-label mb-3">Hyperbaric Oxygen Therapy</p>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-light mb-2">
            대전 고압산소치료
          </h2>
          <h3 className="font-serif text-2xl md:text-3xl text-gold-gradient font-medium mb-6">
            대전서울고려이비인후과 최신 고압산소챔버
          </h3>
          <div className="gold-divider mx-auto mb-8" />
          <p className="text-silver-300 text-base font-light leading-relaxed max-w-2xl mx-auto">
            고압산소치료(HBOT)는 대기압보다 높은 환경에서{' '}
            <strong className="text-white">고농도 순수 산소</strong>를 흡입하여 조직의 산소 분압을
            극대화하는 치료입니다. 대전서울고려이비인후과는 최신 1인용 고압산소챔버를 도입하여
            <strong className="text-white"> 돌발성 난청과 이명 치료</strong>에 특화된 집중 프로그램을 운영합니다.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* 치료 원리 카드 */}
          <motion.div variants={fadeUp(0.1)} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="lg:col-span-1 glass-card rounded-2xl p-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-900/80 to-blue-900/60 flex items-center justify-center mb-6">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8 text-gold-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1M3 12h1m16 0h1M5.636 5.636l.707.707m11.314 11.314.707.707M5.636 18.364l.707-.707M17.657 6.343l.707-.707" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>
            <h4 className="font-serif text-xl text-white font-medium mb-4">치료 원리</h4>
            <div className="space-y-4 text-silver-300 text-sm font-light leading-relaxed">
              {[
                '챔버 내 기압을 2~3기압으로 높여 혈액·조직의 산소 용해도를 최대 20배까지 증가시킵니다.',
                '혈관이 없는 손상 조직까지 산소가 확산되어 세포 재생과 회복을 촉진합니다.',
                '달팽이관(와우)의 산소 공급 개선으로 돌발성 난청의 회복 가능성을 높입니다.',
              ].map((text, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-gold-400 mt-0.5 flex-shrink-0">{'①②③'[i]}</span>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 적응증 그리드 */}
          <motion.div variants={fadeUp(0.2)} initial="hidden" animate={inView ? 'visible' : 'hidden'}
            className="lg:col-span-2">
            <h4 className="font-serif text-xl text-white font-medium mb-6">적응증</h4>
            <div className="grid grid-cols-3 gap-3">
              {indications.map((item, i) => (
                <div key={item}
                  className={`glass-card rounded-xl p-4 text-center ${i < 2 ? 'border-gold-400/25 bg-white/6' : ''}`}>
                  {i < 2 && (
                    <span className="inline-block text-[10px] text-gold-400 border border-gold-400/40 px-2 py-0.5 rounded-sm mb-2 font-light tracking-wider">
                      대표 적응증
                    </span>
                  )}
                  <p className="text-silver-200 text-xs font-light leading-tight">{item}</p>
                </div>
              ))}
            </div>

            {/* 골든타임 경고 박스 */}
            <motion.div variants={fadeUp(0.35)} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              className="mt-6 bg-gradient-to-r from-gold-500/10 to-gold-400/5 border border-gold-400/25 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-gold-400/15 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#C4A35A" strokeWidth={1.5} className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gold-300 font-serif text-sm font-medium mb-2">
                    대전 돌발성 난청, 치료 골든타임을 지키세요
                  </p>
                  <p className="text-silver-400 text-xs font-light leading-relaxed">
                    돌발성 난청은 증상 발생 후{' '}
                    <strong className="text-silver-200">2주 이내</strong>에 치료를 시작하는 것이 예후에 결정적입니다.
                    고압산소치료와 스테로이드 치료를 병행하면 회복 가능성이 유의미하게 높아집니다.
                    증상이 의심되는 즉시 대전서울고려이비인후과에 연락하시기 바랍니다.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════
   SECTION 4 – 청능 클리닉
   Light 배경
══════════════════════════════════════════════ */
function HearingSection() {
  const { ref, inView } = useFadeIn()

  const subServices = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53L6.75 15.75H4.5a.75.75 0 01-.75-.75V9a.75.75 0 01.75-.75h2.25z" />
        </svg>
      ),
      title: '대전 난청 클리닉',
      desc: '순음청력검사(PTA)·어음청력검사·임피던스검사를 포함한 정밀 청력 평가로 원인별 맞춤 치료를 제공합니다. 노인성 난청, 소음성 난청, 감각신경성 난청 모두 아우릅니다.',
      highlights: ['정밀 청력검사 일체', '노인성·소음성·감각신경성 난청', '소아 청력검사'],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
        </svg>
      ),
      title: '대전 이명 클리닉',
      desc: '이명도검사·최소차폐레벨 검사를 통해 이명의 특성을 정밀 분석하고, 이명재훈련치료(TRT)·소리치료·인지행동치료를 복합적으로 적용합니다.',
      highlights: ['이명 전문가 자격증 보유', '이명재훈련치료(TRT)', '고압산소치료 병행'],
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
      ),
      title: '대전 보청기 전문',
      desc: '보청기전문가자격증을 보유한 전문의가 청력도에 맞춘 보청기를 처방하고 실이측정(REM) 기반으로 정밀하게 피팅합니다. 국가 보조금 처방전 발급도 가능합니다.',
      highlights: ['보청기전문가 자격증 보유', '실이측정(REM) 기반 피팅', '국가 보조금 처방전 발급'],
    },
  ]

  return (
    <section id="hearing" className="py-24 md:py-32 bg-section-light relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #0A1628 30%, #152B4E 50%, #0A1628 70%, transparent)' }} />

      <div ref={ref} className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* 헤더 */}
        <motion.div variants={fadeUp()} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16">
          <p className="section-label mb-3">Hearing Clinic</p>
          <h2 className="font-serif text-3xl md:text-4xl text-navy-900 font-light mb-2">
            대전 난청·이명·보청기
          </h2>
          <h3 className="font-serif text-2xl md:text-3xl text-gold-500 font-medium mb-6">
            청능 클리닉
          </h3>
          <div className="gold-divider mx-auto mb-8" />
          <p className="text-slate-600 text-base font-light leading-relaxed max-w-2xl mx-auto">
            귀는 단순한 청각 기관이 아닙니다. 삶의 질, 인지기능, 사회적 관계와 직결됩니다.
            대전서울고려이비인후과의{' '}
            <strong className="text-navy-800">이명 전문가·보청기전문가 자격증</strong> 보유 전문의가
            정밀 청력 검사부터 보청기 피팅, 청각 재활까지 원스톱으로 제공합니다.
          </p>
        </motion.div>

        {/* 서비스 카드 3개 */}
        <div className="grid lg:grid-cols-3 gap-6">
          {subServices.map((svc, i) => (
            <motion.div key={svc.title}
              variants={fadeUp(0.1 + i * 0.12)} initial="hidden" animate={inView ? 'visible' : 'hidden'}
              className="bg-white rounded-2xl border border-slate-100 p-8 hover:border-gold-400/40 hover:shadow-xl transition-all duration-300 card-lift group">
              <div className="w-12 h-12 rounded-xl bg-navy-900 flex items-center justify-center text-gold-400 mb-5 group-hover:bg-gold-400 group-hover:text-navy-900 transition-all duration-300">
                {svc.icon}
              </div>
              <h4 className="font-serif text-navy-900 text-lg font-medium mb-3">{svc.title}</h4>
              <p className="text-slate-500 text-sm font-light leading-relaxed mb-5">{svc.desc}</p>
              <ul className="space-y-2">
                {svc.highlights.map((hl) => (
                  <li key={hl} className="flex items-center gap-2 text-xs text-navy-700 font-light">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0" />
                    {hl}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* 하단 CTA 바 */}
        <motion.div variants={fadeUp(0.4)} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="mt-12 bg-navy-900 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-serif text-white text-lg font-light mb-1">
              대전 보청기 국가 보조금 처방전 발급
            </p>
            <p className="text-silver-400 text-sm font-light">
              청각장애 등록 여부에 따라 최대 131만 원의 보청기 구입 보조금을 받을 수 있습니다.
              전문의 처방전 발급부터 보청기 선택, 피팅까지 한 곳에서 해결하세요.
            </p>
          </div>
          <a href="tel:042-000-0000"
            className="whitespace-nowrap bg-gold-400 hover:bg-gold-300 text-navy-900 font-medium px-7 py-3 rounded-sm text-sm transition-all duration-200 hover:shadow-gold">
            청능 클리닉 예약 →
          </a>
        </motion.div>
      </div>
    </section>
  )
}

/* ── 메인 export: 4개 섹션 조립 ── */
export default function SpecialtySection() {
  return (
    <>
      <SleepClinicSection />
      <DizzinessSection />
      <HBOTSection />
      <HearingSection />
    </>
  )
}