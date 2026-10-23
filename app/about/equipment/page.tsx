import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd, PageHero } from '@/components/ui'
import { breadcrumbSchema } from '@/lib/schema'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: '검사·치료 장비',
  description: `${site.name}의 검사·치료 장비: 기립경사검사(Tilt table), 자율신경기능검사, 1인용 고압산소 챔버, 폐기능검사, 호기산화질소(FeNO), CT, 내시경, 방음 청력검사실.`,
  alternates: { canonical: '/about/equipment/' },
}

const groups = [
  {
    name: '어지럼증',
    href: '/dizziness/',
    items: [
      ['기립경사검사 (Tilt table)', '누운 자세에서 서는 자세로 바꾸며 혈압·맥박 변화를 기록합니다. 일어설 때 생기는 어지럼과 실신의 원인을 확인합니다.'],
      ['자율신경기능검사', '자율신경 반응을 측정해 기립성 어지럼의 원인을 함께 평가합니다.'],
      ['비디오 안진검사', '눈의 떨림을 기록해 귀에서 오는 어지럼인지 확인합니다.'],
    ],
  },
  {
    name: '이명·난청',
    href: '/hearing/',
    items: [
      ['1인용 고압산소 챔버', '돌발성 난청 치료에 약물과 병행할 수 있습니다.'],
      ['방음 청력검사실', '순음·어음 청력검사, 고막 운동성 검사, 이명검사를 합니다.'],
      ['보청기 피팅 장비', '귀 안에서 실제로 나오는 소리를 측정하며 보청기를 맞춥니다.'],
      ['원내 보청기센터', '보청기 상담, 피팅, 청소·수리 접수, 정기 점검을 병원 안에서 합니다.'],
    ],
  },
  {
    name: '수면',
    href: '/sleep/',
    items: [
      ['원내 수면검사실', '하룻밤 수면다원검사로 뇌파, 호흡, 산소포화도, 코골이를 함께 기록합니다.'],
      ['양압기 사용 기록 분석', '사용 시간과 남은 무호흡 지수를 보고 압력과 마스크를 조정합니다.'],
    ],
  },
  {
    name: '코·목·기침',
    href: '/care/',
    items: [
      ['폐기능검사 (PFT)', '오래가는 기침과 천식을 확인합니다.'],
      ['호기산화질소 검사 (FeNO)', '내쉬는 숨으로 기도의 알레르기성 염증 정도를 측정합니다.'],
      ['CT', '부비동염의 범위와 코 구조를 확인합니다.'],
      ['비강·후두 내시경', '코, 목, 성대를 직접 보고 진찰합니다.'],
    ],
  },
]

export default function Equipment() {
  const crumbs = [
    { label: '병원 소개', href: '/about/' },
    { label: '검사·치료 장비', href: '/about/equipment/' },
  ]
  return (
    <>
      <PageHero crumbs={crumbs} title="검사·치료 장비" lead="증상의 원인을 가르는 데 필요한 장비를 갖췄습니다." />
      <div className="wrap" style={{ paddingTop: 64, paddingBottom: 96 }}>
        {groups.map((g) => (
          <section key={g.name} style={{ marginBottom: 56 }}>
            <h2 className="sec-h" style={{ marginBottom: 20 }}>
              <Link href={g.href} style={{ textDecoration: 'none' }}>
                {g.name}
              </Link>
            </h2>
            <ul className="tools">
              {g.items.map(([n, b]) => (
                <li key={n}>
                  <h3 className="h3">{n}</h3>
                  <p>{b}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
        <p className="notice">장비 사진은 설치가 끝난 뒤 실제 사진으로 올릴 예정입니다.</p>
      </div>
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  )
}
