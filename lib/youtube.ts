// 고려이비인후과의원 유튜브 채널의 최신 영상을 빌드할 때 가져옵니다.
// 새 영상을 올린 뒤 사이트를 다시 배포하면(매일 자동 배포 설정 시 하루 1회) 홈에 반영됩니다.
// 가져오기에 실패해도 사이트는 정상 빌드되고, 아래 출연 영상만 보입니다.
import { videos as featured } from './site'

export const CHANNEL_ID = 'UCkfj4NoP3V8blbDMySW_ENw'

export type YtVideo = { id: string; title: string; channel: string; own: boolean }

const decode = (s: string) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")

async function fetchChannel(): Promise<YtVideo[]> {
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`, {
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return []
    const xml = await res.text()
    return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((m) => {
      const e = m[1]
      const id = e.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? ''
      const title = decode(e.match(/<title>([^<]*)<\/title>/)?.[1] ?? '')
      return { id, title, channel: '고려이비인후과의원', own: true }
    }).filter((v) => v.id && !/#shorts/i.test(v.title))
  } catch {
    return []
  }
}

// 채널 최신 영상 + 원장 출연 영상, 중복 제거 후 최대 6개
export async function getHomeVideos(limit = 6): Promise<YtVideo[]> {
  const own = await fetchChannel()
  const guest = featured.map((v) => ({ id: v.id, title: v.title, channel: v.channel, own: false }))
  const seen = new Set<string>()
  return [...own, ...guest].filter((v) => !seen.has(v.id) && seen.add(v.id)).slice(0, limit)
}
