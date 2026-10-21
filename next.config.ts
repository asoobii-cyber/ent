import type { NextConfig } from 'next'

// 정적 사이트로 빌드합니다 (Vercel·Cloudflare Pages 어디서나 그대로 배포 가능).
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
}

export default nextConfig
