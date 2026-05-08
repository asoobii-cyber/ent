// components/DoctorSection.tsx
'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const credentials = [
  {
    category: '학력',
    items: ['고려대학교 의과대학 의학사', '고려대학교 대학원 의학석사'],
  },
  {
    category: '수련',
    items: [
      '고려대학교 안산병원 이비인후과 레지던트 수료',
      '고려대학교 안산병원 이비인후과 전임의',
    ],
  },
  {
    category: '자격증',
    items: [
      '보건복지부 인증 이비인후과 전문의',
      '대한수면연구학회 수면 전문의',
      '이비인후과 어지럼증 전문가 자격증',
      '이명 전문가 자격증',
      '보청기전문가 자격증',
    ],
  },
  {
    category: '학회 활동',
    items: [
      '대한이비인후과학회 정회원',
      '대한수면연구학회 정회원',
      '대한평형의학회 정회원',
      '한국이명학회 정회원',
    ],
  },
]

const philosophy = [
  { title: '정밀 진단', desc: '최첨단 검사 장비와 체계적인 프로토콜로 원인을 정확히 파악합니다.',          icon: '🔬' },
  { title: '맞춤 치료', desc: '환자 개개인의 상태와 생활 방식에 최적화된 치료 계획을 수립합니다.',          icon: '🎯' },
  { title: '지속 관리', desc: '치료 이후에도 체계적인 추적 관찰로 재발을 방지하고 건강을 유지합니다.',    icon: '♾️' },
]

export default function DoctorSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="doctor" className="relative py-24 md:py-32 bg-hero geo-grid overflow-hidden">
      {/* 데코레이션 */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #C4A35A 30%, #D4B87A 50%, #C4A35A 70%, transparent)' }} />
      <div className="absolute -bottom-32 right-0 w-[400px] h-[400px] rounded-full bg-blue-700/8 blur-[100px] pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-5 lg:px-8">

        {/* 헤더 */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-16">
          <p className="section-label mb-3">Our Specialist</p>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-light mb-2">의료진 소개</h2>
          <h3 className="font-serif text-xl md:text-2xl text-gold-gradient font-medium mb-6">
            고려대학교 의과대학 출신 이비인후과 전문의
          </h3>
          <div className="gold-divider mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">

          {/* 좌측: 의료진 카드 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }} className="lg:col-span-2">

            {/* 사진 플레이스홀더 — next/image <Image> 로 교체하세요 */}
            <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[4/5]
              bg-gradient-to-br from-navy-700 to-navy-900 border border-white/10
              flex flex-col items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-navy-600/60 border-2 border-gold-400/30 flex items-center justify-center mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-16 h-16 text-silver-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <p className="text-silver-300 text-sm font-light">의료진 사진을 추가해주세요</p>
              <div className="absolute bottom-0 inset-x-0 h-px"
                style={{ background: 'linear-gradient(90deg, transparent, #C4A35A, transparent)' }} />
            </div>

            {/* 이름 카드 */}
            <div className="glass-card rounded-2xl p-6">
              <div className="mb-4">
                <p className="text-gold-400 text-xs tracking-[0.3em] uppercase font-light mb-1">원장</p>
                {/* ← 실제 원장님 성함으로 교체 */}
                <p className="font-serif text-white text-2xl font-medium mb-0.5">홍길동 원장</p>
                <p className="text-silver-400 text-sm font-light">이비인후과 전문의 · 수면 전문의</p>
              </div>
              <div className="h-px bg-white/10 my-4" />
              <p className="text-silver-300 text-sm font-light leading-relaxed">
                "단순히 증상을 치료하는 것을 넘어, 환자의 수면의 질·삶의 질이 근본적으로
                개선될 때까지 함께하는 의료를 추구합니다."
              </p>
            </div>
          </motion.div>

          {/* 우측: 자격증 + 진료 철학 */}
          <div className="lg:col-span-3 space-y-6">
            {credentials.map((cred, i) => (
              <motion.div key={cred.category}
                initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.08 }}
                className="glass-card rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  {/* 골드 도트 */}
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#C4A35A', flexShrink: 0 }} />
                  <h4 className="font-serif text-gold-400 text-sm font-medium tracking-widest uppercase">
                    {cred.category}
                  </h4>
                </div>
                <ul className="space-y-1.5 pl-5">
                  {cred.items.map((item) => (
                    <li key={item} className="text-silver-300 text-sm font-light flex items-start gap-2">
                      <span className="text-silver-500 mt-1.5 text-xs flex-shrink-0">–</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* 진료 철학 3기둥 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="grid grid-cols-3 gap-3 pt-2">
              {philosophy.map((p) => (
                <div key={p.title}
                  className="bg-white/5 border border-white/8 rounded-xl p-5 text-center hover:border-gold-400/30 transition-colors duration-300">
                  <div className="text-3xl mb-3">{p.icon}</div>
                  <p className="font-serif text-white text-sm font-medium mb-2">{p.title}</p>
                  <p className="text-silver-400 text-xs font-light leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}