type V = { id: string; title: string; channel: string }

// 유튜브 영상 (쿠키 최소화 도메인 사용, 화면에 보일 때 불러옴)
export default function Video({ v }: { v: V }) {
  return (
    <figure className="video">
      <div className="video-frame">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${v.id}`}
          title={v.title}
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <figcaption>
        <span className="video-title">{v.title}</span>
        <span className="video-channel">{v.channel} 출연</span>
      </figcaption>
    </figure>
  )
}
