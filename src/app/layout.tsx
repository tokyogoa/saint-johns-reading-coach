import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '세인트 존스 읽기 코치',
  description: '세인트 존스 칼리지의 위대한 고전 도서 목록을 기반으로 한 읽기 코치 웹앱',
  keywords: '세인트존스, 고전, 독서, 교육, 인문학',
  authors: [{ name: '세인트 존스 읽기 코치' }],
  creator: '세인트 존스 읽기 코치',
  publisher: '세인트 존스 읽기 코치',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
