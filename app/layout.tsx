// app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Noto_Serif_KR, Noto_Sans_KR } from 'next/font/google'
import './globals.css'

/* ── Fonts ── */
const notoSerifKR = Noto_Serif_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-serif',
  display: 'swap',
  preload: false,
})

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-sans',
  display: 'swap',
  preload: false,
})

/* ── SEO Metadata ── */
export const metadata: Metadata = {
  metadataBase: new URL('https://djkoreaent.kr'),

  title: {
    default: '대전서울고려이비인후과 | 대전 코골이·수면무호흡·어지럼증·고압산소치료 전문',
    template: '%s | 대전서울고려이비인후과',
  },

  description:
    '대전 코골이, 수면무호흡(수면다원검사), 어지럼증, 고압산소치료, 난청, 이명, 보청기 전문 클리닉. ' +
    '고려대학교 의과대학 출신 보건복지부 인증 이비인후과 전문의·수면 전문의가 직접 진료합니다.',

  keywords: [
    '대전 코골이', '대전 수면무호흡', '대전 수면다원검사', '대전 수면클리닉',
    '대전 어지럼증', '대전 어지럼증 클리닉', '대전 고압산소치료', '대전 고압산소챔버',
    '대전 난청', '대전 이명', '대전 보청기', '대전 이비인후과',
    '대전 이석증', '대전 BPPV', '대전 메니에르', '대전서울고려이비인후과',
    '이비인후과 전문의 대전', '수면 전문의 대전', '보청기전문가 대전',
  ],

  authors: [{ name: '대전서울고려이비인후과', url: 'https://djkoreaent.kr' }],
  creator: '대전서울고려이비인후과',
  publisher: '대전서울고려이비인후과',

  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://djkoreaent.kr',
    siteName: '대전서울고려이비인후과',
    title: '대전서울고려이비인후과 | 코골이·수면무호흡·어지럼증·고압산소치료 전문',
    description:
      '고려대학교 의과대학 출신 이비인후과 전문의·수면 전문의가 운영하는 대전 최고의 수면·어지럼증·청각 전문 클리닉.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: '대전서울고려이비인후과' }],
  },

  twitter: {
    card: 'summary_large_image',
    title: '대전서울고려이비인후과 | 코골이·어지럼증·고압산소치료 전문',
    description: '대전 코골이·수면무호흡·어지럼증·고압산소치료·난청·이명·보청기 전문 클리닉',
    images: ['/og-image.jpg'],
  },

  // ★ Canonical Tag ★
  alternates: { canonical: 'https://djkoreaent.kr' },

  robots: {
    index: true, follow: true,
    googleBot: {
      index: true, follow: true,
      'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1,
    },
  },

  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN',
    // naver: 'YOUR_NAVER_WEBMASTER_TOKEN',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0A1628',
}

/* ── JSON-LD 구조화 데이터 (로컬 병원 Schema) ── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalOrganization',
  name: '대전서울고려이비인후과',
  alternateName: 'Daejeon Seoul Korea ENT Clinic',
  url: 'https://djkoreaent.kr',
  telephone: '042-000-0000',           // ← 실제 번호로 교체
  address: {
    '@type': 'PostalAddress',
    streetAddress: '대전 중구 대종로 OOO', // ← 실제 주소로 교체
    addressLocality: '대전광역시',
    addressRegion: '대전',
    postalCode: '34000',
    addressCountry: 'KR',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 36.3504, longitude: 127.3845 },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Friday'], opens: '09:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Thursday', opens: '09:00', closes: '20:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:00', closes: '13:00' },
  ],
  medicalSpecialty: ['Otolaryngology', 'Sleep Medicine', 'Audiology'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${notoSerifKR.variable} ${notoSansKR.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-white">
        {children}
      </body>
    </html>
  )
}