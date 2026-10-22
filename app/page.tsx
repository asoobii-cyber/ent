import type { Metadata } from 'next'
import Link from 'next/link'
import NoticePopup from '@/components/NoticePopup'
import { getHomeVideos } from '@/lib/youtube'
import { FaqList, HoursTable } from '@/components/ui'
import { centers, conditionsOf, generalFaqs } from '@/lib/content'
import { press, site } from '@/lib/site'

const principles = [
  { t: '원인을 나눠서 봅니다', b: '같은 어지럼, 같은 기침이라도 원인이 다르면 치료가 다릅니다. 필요한 검사만 골라 원인을 좁힙니다.' },
  { t: '검사 결과를 숫자로 보여드립니다', b: '청력, 어지럼, 수면, 이명 상태를 검사와 설문 점수로 기록해 치료 전후를 함께 비교합니다.' },
  { t: '청력검사와 보청기는 청각사가', b: '청각사 2명이 청력검사와 보청기 상담·피팅·사후관리를 맡고, 검사 결과는 진료한 전문의가 함께 확인합니다.' },
  { t: '오래 관리해야 하는 진료는 끝까지', b: '보청기 사후관리, 양압기 적응, 3년 면역치료처럼 시간이 걸리는 치료는 일정을 정해 다시 확인합니다.' },
]

export const metadata: Metadata = { alternates: { canonical: '/' } }

export default async function Home() {
  const yt = await getHomeVideos()
  // 제목 순서(잘 들리고 → 어지럽지 않고 → 잠을 잘 자기)와 맞춤
  const special = ['hearing', 'dizziness', 'sleep'].map((slug) => centers.find((c) => c.slug === slug)!)
  const care = centers.find((c) => c.slug === 'care')!
  return (
    <>
      <NoticePopup />
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
              {site.naverBooking ? (
                <a className="btn btn-naver" href={site.naverBooking} target="_blank" rel="noopener noreferrer">
                  <span className="naver-n" aria-hidden="true">N</span>네이버예약
                </a>
              ) : (
                <span className="btn btn-naver is-soon" aria-disabled="true">
                  <span className="naver-n" aria-hidden="true">N</span>네이버예약 <small>12월 오픈</small>
                </span>
              )}
              <a className="btn btn-solid" href={`tel:${site.phone}`}>
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

      <section className="yt" aria-labelledby="yt-title">
        <div className="wrap">
          <div className="yt-head">
            <div>
              <h2 id="yt-title" className="yt-title">영상으로 먼저 만나보세요</h2>
              <p className="yt-lead">박성빈 원장이 직접 설명하는 귀·코·목 건강 이야기</p>
            </div>
            <div className="yt-links">
              <a className="btn btn-solid btn-sm" href={site.youtube} target="_blank" rel="noopener noreferrer">
                유튜브 채널 보기
              </a>
              <a className="btn btn-ghost btn-sm" href={site.blog} target="_blank" rel="noopener noreferrer">
                블로그 칼럼
              </a>
            </div>
          </div>
          <ul className="yt-row">
            {yt.map((v) => (
              <li key={v.id}>
                <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer" className="yt-card">
                  <span className="yt-thumb">
                    <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" width={480} height={360} />
                    <span className="yt-play" aria-hidden="true" />
                  </span>
                  <span className="yt-card-title">{v.title}</span>
                  <span className="yt-card-ch">{v.own ? '고려이비인후과 채널' : `${v.channel} 출연`}</span>
                </a>
              </li>
            ))}
            <li>
              <a href={site.youtube} target="_blank" rel="noopener noreferrer" className="yt-card yt-more">
                <span className="yt-thumb yt-thumb-more">
                  <span>새 영상이 계속 올라옵니다</span>
                </span>
                <span className="yt-card-title">고려이비인후과의원 채널 구독하기</span>
                <span className="yt-card-ch">youtube.com/@고려이비인후과의원</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      {press.length > 0 && (
        <section className="sec sec-press" aria-labelledby="press-title">
          <div className="wrap">
            <h2 id="press-title" className="sec-h">언론 보도 · 자문</h2>
            <p className="sec-lead">박성빈 원장이 출연하거나 자문한 기사와 방송입니다.</p>
            <ul className="press">
              {press.map((p) => (
                <li key={p.url}>
                  <a href={p.url} target="_blank" rel="noopener noreferrer">
                    <span className="press-meta">
                      <span className="press-outlet">{p.outlet}</span>
                      <span className="press-type">{p.type === 'video' ? '영상 출연' : '기사 자문'}</span>
                      <span className="press-date">{p.date}</span>
                    </span>
                    <span className="press-title">{p.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="sec">
        <div className="wrap split">
          <div>
            <h2 className="sec-h">진료 원칙</h2>
            <p className="sec-lead">이비인후과 전문의의 진료 후, 2명의 전문 청각사와 함께 진단과 검사, 사후관리까지 진행합니다.</p>
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
          <div className="doc-photo doc-photo-light">
            <img src={site.doctor.portrait} alt={`${site.doctor.name} ${site.doctor.title}`} width={1000} height={1294} />
          </div>
          <div>
            <p className="doc-name">{site.doctor.name} 원장</p>
            <p className="doc-role">고려대학교 의과대학 출신 · {site.doctor.specialty}</p>
            <ul className="badges">
              {site.doctor.badges.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p className="doc-quote">&ldquo;{site.doctor.quote}&rdquo;</p>
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
            </dl>
            <div className="hero-actions">
              {site.naverMap && (
<a className="btn btn-ghost" href={site.naverMap} target="_blank" rel="noopener noreferrer">네이버 지도에서 보기</a>
)}
            </div>
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
