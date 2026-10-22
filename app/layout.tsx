import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from '@/components/Header'
import { Footer, JsonLd, MobileBar } from '@/components/ui'
import { site } from '@/lib/site'
import { clinicSchema } from '@/lib/schema'

const description =
  '대전 서구 관저동 이비인후과. 어지럼증(기립경사검사), 코골이·수면무호흡, 돌발성 난청·이명·보청기, 고압산소치료, 감기·비염·만성기침 진료. 월·수·금 밤 9시, 일요일·공휴일 오전 진료.'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | 대전 관저동 이비인후과`,
    template: `%s | ${site.name}`,
  },
  description,
  applicationName: site.name,
  authors: [{ name: site.doctor.name }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: site.name,
    title: `${site.name} | 대전 관저동 이비인후과`,
    description,
    url: site.url,
  },
  robots: { index: true, follow: true, googleBot: { 'max-snippet': -1, 'max-image-preview': 'large' } },
  verification: {
    // 【확인】 서치콘솔·서치어드바이저 등록 후 토큰 입력
    google: 'eOtQJBv1eSAcugsjUNxXMgV1HhObQsT8DZAkYQVhOvc',
    // other: { 'naver-site-verification': '' },
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
  colorScheme: 'only light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <JsonLd data={clinicSchema()} />
      </head>
      <body>
        <a className="skip" href="#main">본문 바로가기</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
      </body>
    </html>
  )
}
