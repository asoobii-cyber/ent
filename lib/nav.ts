import { columns } from './columns'
import { centers, conditionsOf } from './content'

export type NavGroup = {
  label: string
  href: string
  blurb: string
  links: { label: string; href: string }[]
}

export const nav: NavGroup[] = [
  {
    label: '병원 소개',
    href: '/about/',
    blurb: '진료 원칙과 원장, 검사 장비를 소개합니다.',
    links: [
      { label: '진료 원칙', href: '/about/' },
      { label: '원장 소개', href: '/about/doctor/' },
      { label: '검사·치료 장비', href: '/about/equipment/' },
    ],
  },
  ...centers.map((c) => ({
    label: c.menuName,
    href: `/${c.slug}/`,
    blurb: c.tagline,
    links: [
      { label: `${c.name} 안내`, href: `/${c.slug}/` },
      ...conditionsOf(c.slug).map((d) => ({ label: d.name, href: `/${c.slug}/${d.slug}/` })),
    ],
  })),
  ...(columns.length > 0
    ? [
        {
          label: '건강 칼럼',
          href: '/column/',
          blurb: '원장이 진료실에서 자주 받는 질문을 정리합니다.',
          links: [
            { label: '전체 칼럼', href: '/column/' },
            ...columns.slice(0, 5).map((c) => ({ label: c.topic, href: `/column/${c.slug}/` })),
          ],
        },
      ]
    : []),
  {
    label: '이용 안내',
    href: '/guide/',
    blurb: '진료시간, 예약, 오시는 길, 비용을 확인하세요.',
    links: [
      { label: '진료시간', href: '/guide/#hours' },
      { label: '예약 안내', href: '/guide/#booking' },
      { label: '처음 오시는 분', href: '/guide/#first' },
      { label: '오시는 길', href: '/guide/#location' },
      { label: '비급여 안내', href: '/guide/#fees' },
      { label: '자주 묻는 질문', href: '/faq/' },
    ],
  },
]
