import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SessionProvider } from "@/components/session-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Kirec — 축구 경기 영상 회고",
  description: "팀과 함께 경기 영상을 보며 타임스탬프 단위로 회고를 남기세요",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full">
      <body className={`${inter.className} min-h-full`}>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
