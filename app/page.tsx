import Link from 'next/link'
import { FaqList, HoursTable } from '@/components/ui'
import { centers, conditionsOf, generalFaqs } from '@/lib/content'
import { site } from '@/lib/site'

const principles = [
  { t: '원인을 나눠서 봅니다', b: '같은 어지럼, 같은 기침이라도 원인이 다르면 치료가 다릅니다. 필요한 검사만 골라 원인을 좁힙니다.' },
  { t: '검사 결과를 숫자로 보여드립니다', b: '청력, 어지럼, 수면, 이명 상태를 검사와 설문 점수로 기록해 치료 전후를 함께 비교합니다.' },
  { t: '청력검사와 보청기는 전담 인력이', b: '청각 전담 인력 2명이 청력검사, 보청기 상담·피팅·사후관리를 맡습니다. 검사 결과는 진료 의사가 함께 확인합니다.' },
  { t: '오래 관리해야 하는 진료는 끝까지', b: '보청기 사후관리, 양압기 적응, 3년 면역치료처럼 시간이 걸리는 치료는 일정을 정해 다시 확인합니다.' },
]

export default function Home() {
  // 제목 순서(잘 들리고 → 어지럽지 않고 → 잠을 잘 자기)와 맞춤
  const special = ['hearing', 'dizziness', 'sleep'].map((slug) => centers.find((c) => c.slug === slug)!)
  const care = centers.find((c) => c.slug === 'care')!
  return (
    <>
      <section className="hero">
        <div className="wrap hero-inner">
          <div className="hero-text">
            <p className="hero-open">{site.openDateLabel} 대전 서구 관저동 개원</p>
            <h1 className="hero-title">
              <span>잘 들리고,</span>
              <span>어지럽지 않고,</span>
              <span>잠을 잘 자기 위하여</span>
            </h1>
            <p className="hero-lead">
              {site.name}은 귀·코·목 진료와 함께 어지럼증, 수면, 이명·난청을 검사로 확인하고 끝까지 관리합니다.
              감기와 비염은 예약 없이, <span className="nowrap">월·수·금</span>은 밤 9시까지 진료합니다.
            </p>
            <div className="hero-actions">
              <a className="btn btn-solid" href={site.naverBooking} target="_blank" rel="noopener noreferrer">
                네이버예약
              </a>
              <a className="btn btn-ghost" href={`tel:${site.phone}`}>
                전화 {site.phone}
              </a>
            </div>
          </div>
          <figure className="arch hero-img">
            <img src="/images/reception.webp" alt={`${site.name} 접수 데스크 인테리어 시안`} width={1800} height={990} />
            <figcaption>인테리어 시안 · 개원 후 실제 사진으로 바뀝니다</figcaption>
          </figure>
        </div>
        <div className="wrap">
          <div className="hero-trace">
            {special.map((c) => (
              <Link key={c.slug} href={`/${c.slug}/`}>
                <span className="hero-trace-name">{c.name}</span>
                <span className="hero-trace-desc">{c.tagline}</span>
                <span className="hero-trace-sub">{conditionsOf(c.slug).map((d) => d.name).join(' · ')}</span>
                <span className="hero-trace-more">자세히 보기</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap split">
          <div>
            <h2 className="sec-h">진료 원칙</h2>
            <p className="sec-lead">진료는 이비인후과 전문의가, 청력검사와 보청기는 전담 청각 인력 2명이 맡아 검사부터 사후관리까지 이어서 봅니다.</p>
          </div>
          <ul className="principles">
            {principles.map((p) => (
              <li key={p.t}>
                <h3 className="h3">{p.t}</h3>
                <p>{p.b}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec sec-paper2">
        <div className="wrap">
          <h2 className="sec-h">{care.name}</h2>
          <p className="sec-lead">{care.lead}</p>
          <ul className="rows" style={{ marginTop: 36 }}>
            {conditionsOf('care').map((d) => (
              <li key={d.slug}>
                <Link href={`/care/${d.slug}/`}>
                  <span className="rows-name">{d.name}</span>
                  <span className="rows-desc">{d.summary.split('. ')[0]}.</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec sec-paper2">
        <div className="wrap doc">
          <div className="doc-photo">
            <img src={site.doctor.photo} alt={`${site.doctor.name} ${site.doctor.title}`} width={1000} height={1500} />
          </div>
          <div>
            <p className="doc-name">{site.doctor.name}</p>
            <p className="doc-role">
              {site.doctor.title} · {site.doctor.specialty}
            </p>
            <p className="doc-quote">
              검사로 확인한 것을 쉬운 말로 설명드리고, 치료가 오래 걸리는 분은 끝까지 함께 보겠습니다.
            </p>
            <ul className="doc-career">
              {site.doctor.training.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="hero-actions">
              <Link className="btn btn-ghost" href="/about/doctor/">
                원장 소개
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap visit">
          <div>
            <h2 className="sec-h">진료시간</h2>
            <div style={{ marginTop: 24 }}>
              <HoursTable />
            </div>
          </div>
          <div>
            <h2 className="sec-h">오시는 길</h2>
            <dl className="addr-list">
              <div>
                <dt>주소</dt>
                <dd>{site.address.full}</dd>
              </div>
              <div>
                <dt>주차</dt>
                <dd>{site.parking}</dd>
              </div>
              <div>
                <dt>대중교통</dt>
                <dd>{site.transit}</dd>
              </div>
            </dl>
            <div className="hero-actions">
              <a className="btn btn-ghost" href={site.naverMap} target="_blank" rel="noopener noreferrer">
                네이버 지도에서 보기
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <h2 className="sec-h">원장이 직접 쓰고 찍습니다</h2>
          <p className="sec-lead">진료실에서 다 못 한 설명을 블로그 글과 영상으로 정리하고 있습니다.</p>
          <div className="media">
            <a className="media-card" href={site.blog} target="_blank" rel="noopener noreferrer">
              <span className="media-kind">네이버 블로그</span>
              <span className="media-title">어지럼증, 코골이, 난청, 비염 건강 칼럼</span>
              <span className="media-go">블로그에서 읽기</span>
            </a>
            <a className="media-card media-yt" href={site.youtube} target="_blank" rel="noopener noreferrer">
              <span className="media-kind">유튜브</span>
              <span className="media-title">고려이비인후과의원 채널</span>
              <span className="media-go">채널에서 보기</span>
            </a>
          </div>
        </div>
      </section>

      <section className="sec sec-paper2">
        <div className="wrap split">
          <div>
            <h2 className="sec-h">자주 묻는 질문</h2>
            <p className="sec-lead">예약, 진료시간, 서류 발급에 대해 많이 물어보시는 내용입니다.</p>
            <div className="hero-actions">
              <Link className="btn btn-ghost" href="/faq/">
                전체 질문 보기
              </Link>
            </div>
          </div>
          <FaqList faqs={generalFaqs.slice(0, 4)} headingId="home-faq" />
        </div>
      </section>
    </>
  )
}
