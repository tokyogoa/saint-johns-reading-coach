/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost'],
  },
  // GitHub Pages 배포를 위한 설정
  basePath: process.env.NODE_ENV === 'production' ? '/saint-johns-reading-coach' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/saint-johns-reading-coach/' : '',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
