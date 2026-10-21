import type { Motif as MotifKind } from '@/lib/content'

// 각 센터를 실제 검사 기록의 모양으로 표현합니다.
//  balance   — 안진 기록 (느린 이동 + 빠른 복귀의 톱니 파형)
//  breath    — 호흡 파형, 가운데에 숨이 멈춘 구간
//  audiogram — 청력도, 고음역으로 갈수록 떨어지는 곡선
//  airflow   — 코 안을 지나는 공기 흐름

const W = 600
const H = 160

function balancePath() {
  let d = `M0 ${H / 2}`
  let x = 0
  const amp = 34
  while (x + 54 <= W) {
    const slow = 46
    const fast = 8
    d += ` L${x + slow} ${H / 2 + amp} L${x + slow + fast} ${H / 2 - amp}`
    x += slow + fast
  }
  return d
}

function breathPath() {
  const pts: string[] = []
  for (let x = 0; x <= W; x += 4) {
    const inPause = x > 250 && x < 380
    const amp = inPause ? 2 : x > 380 && x < 430 ? 54 : 34
    const y = H / 2 - Math.sin((x / 62) * Math.PI) * amp
    pts.push(`${x} ${y.toFixed(1)}`)
  }
  return 'M' + pts.join(' L')
}

const audioFreqs = [0, 1, 2, 3, 4, 5, 6] // 250 … 8k
const audioDb = [18, 20, 22, 30, 48, 62, 70]
function audioPoints() {
  return audioFreqs.map((f, i) => ({ x: 40 + f * 86, y: 20 + audioDb[i] * 1.7 }))
}

function airflowPaths() {
  return [0, 1, 2, 3].map((i) => {
    const y = 36 + i * 28
    return `M0 ${y} C150 ${y - 30 + i * 6}, 260 ${y + 34}, 400 ${y + 4} S560 ${y - 18}, ${W} ${y - 6}`
  })
}

export default function Motif({
  kind,
  className,
  animate = false,
}: {
  kind: MotifKind
  className?: string
  animate?: boolean
}) {
  const cls = `motif${animate ? ' motif-draw' : ''}${className ? ' ' + className : ''}`
  if (kind === 'audiogram') {
    const p = audioPoints()
    return (
      <svg className={cls} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" preserveAspectRatio="none">
        {[0, 1, 2, 3].map((r) => (
          <line key={r} x1="0" x2={W} y1={20 + r * 40} y2={20 + r * 40} className="motif-grid" />
        ))}
        <polyline points={p.map((q) => `${q.x},${q.y}`).join(' ')} className="motif-line" pathLength={1} />
        {p.map((q, i) => (
          <circle key={i} cx={q.x} cy={q.y} r="6" className="motif-dot" />
        ))}
      </svg>
    )
  }
  if (kind === 'airflow') {
    return (
      <svg className={cls} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" preserveAspectRatio="none">
        {airflowPaths().map((d, i) => (
          <path key={i} d={d} className="motif-line" pathLength={1} style={{ opacity: 1 - i * 0.18 }} />
        ))}
      </svg>
    )
  }
  const d = kind === 'balance' ? balancePath() : breathPath()
  return (
    <svg className={cls} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" preserveAspectRatio="none">
      <line x1="0" x2={W} y1={H / 2} y2={H / 2} className="motif-grid" />
      {kind === 'breath' && <rect x="250" y="20" width="130" height={H - 40} className="motif-band" />}
      <path d={d} className="motif-line" pathLength={1} />
    </svg>
  )
}
