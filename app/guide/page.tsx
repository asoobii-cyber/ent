import type { Metadata } from 'next'
import Link from 'next/link'
import { HoursTable, JsonLd, PageHero } from '@/components/ui'
import { breadcrumbSchema } from '@/lib/schema'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: '이용 안내 — 진료시간·예약·오시는 길',
  description: `${site.name} 진료시간(월·수·금 08:30–21:00, 화·목 08:30–19:00, 토 08:30–14:00, 일·공휴일 오전), 예약 방법, 처음 오시는 분 안내, 오시는 길, 비급여 안내.`,
  alternates: { canonical: '/guide/' },
}

const booking = [
  { what: '어지럼증 초진', how: '네이버예약', why: '검사 시간을 미리 확보합니다' },
  { what: '수면 상담 초진', how: '네이버예약', why: '상담 시간을 미리 확보합니다' },
  { what: '보청기 상담', how: '전화 예약', why: '상담·피팅에 40분 이상 걸립니다' },
  { what: '갑자기 안 들림', how: '바로 내원', why: '치료를 빨리 시작해야 합니다' },
  { what: '감기·비염·기침·일반 진료', how: '바로 내원', why: '접수 순서대로 진료합니다' },
]

export default function Guide() {
  const crumbs = [{ label: '이용 안내', href: '/guide/' }]
  return (
    <>
      <PageHero crumbs={crumbs} title="이용 안내" lead="진료시간, 예약 방법, 오시는 길을 한곳에 모았습니다." />
      <div className="wrap article">
        <nav className="toc" aria-label="이 페이지에서">
          <p>이 페이지에서</p>
          <a href="#hours">진료시간</a>
          <a href="#booking">예약 안내</a>
          <a href="#first">처음 오시는 분</a>
          <a href="#location">오시는 길</a>
          <a href="#fees">비급여 안내</a>
          <a href="#papers">서류 발급</a>
        </nav>
        <div className="body">
          <section id="hours">
            <h2>진료시간</h2>
            <HoursTable />
          </section>

          <section id="booking">
            <h2>예약 안내</h2>
            <p>검사와 상담 시간이 긴 진료만 예약으로 받고, 나머지는 오신 순서대로 진료합니다.</p>
            <div className="hours" style={{ marginTop: 18 }}>
              <table>
                <caption className="sr-only">진료별 예약 방법</caption>
                <tbody>
                  {booking.map((b) => (
                    <tr key={b.what}>
                      <th scope="row">{b.what}</th>
                      <td>
                        <span className="hours-time" style={{ fontSize: 18 }}>
                          {b.how}
                        </span>
                        <span className="hours-sub">{b.why}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="hero-actions">
              {site.naverBooking && (
<a className="btn btn-solid" href={site.naverBooking} target="_blank" rel="noopener noreferrer">네이버예약 하기</a>
)}
              <a className="btn btn-ghost" href={`tel:${site.phone}`}>
                전화 {site.phone}
              </a>
            </div>
          </section>

          <section id="first">
            <h2>처음 오시는 분</h2>
            <ul className="ticks">
              <li>신분증을 꼭 가져와 주세요. 본인 확인 후 건강보험이 적용됩니다.</li>
              <li>복용 중인 약 목록과 다른 병원 검사 결과지가 있으면 함께 가져와 주세요.</li>
              <li>예약하신 분은 확정 문자로 받은 문진표를 미리 작성해 주시면 진료가 빨라집니다.</li>
              <li>어지럼증 검사를 받으실 분은 눈 화장을 지우고 오시는 것이 좋습니다.</li>
              <li>보호자 없이 진료를 받기 어려운 어르신은 가족과 함께 와 주세요. 보청기 상담에도 함께 들으시면 좋습니다.</li>
            </ul>
          </section>

          <section id="location">
            <h2>오시는 길</h2>
            <dl className="addr-list">
              <div>
                <dt>주소</dt>
                <dd>
                  {site.address.full}
                  {site.address.note && <span className="addr-note">{site.address.note}</span>}
                </dd>
              </div>
              {site.parking && (
<div>
<dt>주차</dt>
<dd>{site.parking}</dd>
</div>
)}
              {site.transit && (
<div>
<dt>대중교통</dt>
<dd>{site.transit}</dd>
</div>
)}
              <div>
                <dt>전화</dt>
                <dd>
                  <a href={`tel:${site.phone}`}>{site.phone}</a>
                </dd>
              </div>
            </dl>
            <div className="hero-actions">
              {site.naverMap && (
<a className="btn btn-ghost" href={site.naverMap} target="_blank" rel="noopener noreferrer">네이버 지도에서 길찾기</a>
)}
            </div>
          </section>

          <section id="fees">
            <h2>비급여 안내</h2>
            <p>
              건강보험이 적용되지 않는 진료(보청기, 일부 수액, 면역치료 약제 등)의 비용은 의료법에 따라 병원 내에 게시하고 이 페이지에도
              안내합니다.
            </p>
            <p className="notice" style={{ marginTop: 16 }}>
              비급여 항목과 금액은 개원 전에 이 페이지에 게시합니다.
            </p>
          </section>

          <section id="papers">
            <h2>서류 발급</h2>
            <ul className="plain">
              <li>진료비 영수증, 진료비 세부내역서 — 원무과에서 바로 발급</li>
              <li>진단서, 소견서, 진료확인서 — 진료 후 원장 확인을 거쳐 발급</li>
              <li>보청기 급여 관련 서류 — 검사 결과에 따라 절차를 안내해 드립니다</li>
            </ul>
            <p style={{ marginTop: 16 }}>
              더 궁금한 점은 <Link href="/faq/">자주 묻는 질문</Link>에서 확인하세요.
            </p>
          </section>
        </div>
      </div>
      <JsonLd data={breadcrumbSchema(crumbs)} />
    </>
  )
}
