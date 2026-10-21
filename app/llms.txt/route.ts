// /llms.txt — AI 검색 서비스가 병원 정보를 빠르게 파악하도록 요약한 텍스트 파일
import { centers, conditions } from '@/lib/content'
import { hours, site } from '@/lib/site'

export const dynamic = 'force-static'

export function GET() {
  const u = (p: string) => new URL(p, site.url).toString()
  const lines = [
    `# ${site.legalName} (${site.name})`,
    '',
    `> 대전광역시 서구 관저동의 이비인후과 의원. ${site.openDateLabel} 개원. 대표원장 ${site.doctor.name}(${site.doctor.specialty}, ${site.doctor.training.join(', ')}). 어지럼증·수면·이명난청 진료와 감기·비염·만성기침 진료.`,
    '',
    '## 기본 정보',
    `- 주소: ${site.address.full}`,
    `- 전화: ${site.phone}`,
    ...hours.map((h) => `- ${h.days}: ${h.open}–${h.close}${h.breaks.length ? ` (${h.breaks.join(', ')})` : ''}`),
    '- 예약: 어지럼증·수면 초진은 네이버예약, 보청기 상담은 전화 예약, 그 외 진료는 예약 없이 접수 순',
    `- 이용 안내: ${u('/guide/')}`,
    '',
    ...centers.flatMap((c) => [
      `## ${c.name}`,
      `${c.lead}`,
      `- [${c.name} 안내](${u(`/${c.slug}/`)})`,
      ...conditions.filter((d) => d.center === c.slug).map((d) => `- [${d.name}](${u(`/${c.slug}/${d.slug}/`)}): ${d.summary}`),
      '',
    ]),
    '## 기타',
    `- [자주 묻는 질문](${u('/faq/')})`,
    `- [원장 소개](${u('/about/doctor/')})`,
    `- [검사·치료 장비](${u('/about/equipment/')})`,
  ]
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
