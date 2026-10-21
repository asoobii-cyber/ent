import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd, PageHero } from '@/components/ui'
import { breadcrumbSchema } from '@/lib/schema'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: '병원 소개',
  description: `${site.name}의 진료 원칙과 운영 방식. 전문의 진료와 전담 청각 인력, 검사 기반 진단, 장기 관리가 필요한 치료의 정기 확인.`,
  alternates: { canonical: '/about/' },
}

const principles = [
  {
    t: '진료는 전문의가, 검사와 관리는 전담 인력이',
    b: '증상을 듣고 어떤 검사가 필요한지 정하는 일은 이비인후과 전문의가 합니다. 청력검사와 보청기 상담·피팅·사후관리는 청각사 2명이 맡고, 반복되는 검사와 치료는 의사의 지시에 따라 담당 인력이 이어서 진행합니다.',
  },
  {
    t: '필요한 검사만 합니다',
    b: '검사는 원인을 좁히기 위한 도구입니다. 증상과 진찰 소견으로 판단할 수 있으면 검사를 줄이고, 필요한 경우에는 왜 필요한지 먼저 설명드립니다.',
  },
  {
    t: '좋아진 정도를 숫자로 확인합니다',
    b: '어지럼(DHI), 수면(ESS), 이명(THI) 같은 설문과 청력검사 결과를 기록해 치료 전후를 비교합니다. 예약 확정 문자로 설문 링크를 보내드려 진료 시간을 아낍니다.',
  },
  {
    t: '수술이 필요하면 맞는 병원으로 연결합니다',
    b: `${site.name}은 수술실을 두지 않습니다. 수술이 필요한 경우 검사 결과를 정리해 수술이 가능한 병원으로 의뢰해 드립니다.`,
  },
]

export default function About() {
  const crumbs = [{ label: '병원 소개', href: '/about/' }]
  return (
    <>
      <PageHero
        crumbs={crumbs}
        title="병원 소개"
        lead={`${site.name}은 ${site.openDateLabel} 대전 서구 관저동에서 문을 엽니다. 오랫동안 이비인후과가 있던 자리를 이어받아, 동네에서 자주 찾는 진료와 검사가 필요한 진료를 함께 봅니다.`}
      />
      <div className="wrap article">
        <nav className="toc" aria-label="병원 소개 메뉴">
          <p>병원 소개</p>
          <a href="#principles">진료 원칙</a>
          <Link href="/about/doctor/">원장 소개</Link>
          <Link href="/about/equipment/">검사·치료 장비</Link>
        </nav>
        <div className="body">
          <section id="principles">
            <h2>진료 원칙</h2>
            <ul className="principles">
              {principles.map((p) => (
                <li key={p.t}>
                  <h3 className="h3">{p.t}</h3>
                  <p>{p.b}</p>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2>공간</h2>
            <p>진료실 3곳, 방음 청력검사실, 어지럼증 검사실, 1인실 수액실, 고압산소치료실을 갖춥니다.</p>
            <div className="gallery">
              {[
                ['/images/entrance.webp', '입구'],
                ['/images/reception.webp', '접수'],
                ['/images/waiting.webp', '대기 공간'],
                ['/images/hallway.webp', '진료실 복도'],
                ['/images/nebulizer.webp', '호흡기 치료실'],
                ['/images/lounge.webp', '대기 라운지'],
              ].map(([src, label]) => (
                <figure key={src}>
                  <img src={src} alt={`${label} 인테리어 시안`} loading="lazy" />
                  <figcaption>{label}</figcaption>
                </figure>
              ))}
            </div>
            <p className="notice" style={{ marginTop: 16 }}>인테리어 시안 이미지입니다. 공사가 끝나면 실제 사진으로 바꿉니다.</p>
          </section>
        </div>
      </div>
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  )
}
