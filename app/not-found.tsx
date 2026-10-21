import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="phero">
      <div className="wrap phero-inner">
        <h1 className="phero-title">찾는 페이지가 없습니다</h1>
        <p className="phero-lead">주소가 바뀌었거나 삭제된 페이지입니다. 홈이나 이용 안내에서 다시 찾아보세요.</p>
        <div className="hero-actions">
          <Link className="btn btn-solid" href="/">홈으로</Link>
          <Link className="btn btn-ghost" href="/guide/">이용 안내</Link>
        </div>
      </div>
    </section>
  )
}
