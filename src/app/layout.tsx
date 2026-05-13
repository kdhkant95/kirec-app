import type { Metadata } from "next"
import localFont from "next/font/local"
import Script from "next/script"
import "./globals.css"
import { SessionProvider } from "@/components/session-provider"

const nexonLv1Gothic = localFont({
  variable: "--font-ui",
  display: "swap",
  src: [
    {
      path: "./fonts/nexon-lv1-gothic/NEXONLv1GothicLight.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/nexon-lv1-gothic/NEXONLv1GothicRegular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/nexon-lv1-gothic/NEXONLv1GothicRegular.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/nexon-lv1-gothic/NEXONLv1GothicBold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
})

export const metadata: Metadata = {
  title: "VAR — 축구 경기 영상 회고",
  description: "팀과 함께 경기 영상을 보며 타임스탬프 단위로 회고를 남기세요",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full" style={{ backgroundColor: "#101012" }}>
      <body className={`${nexonLv1Gothic.variable} min-h-full`}>
        <SessionProvider>{children}</SessionProvider>
        {process.env.NODE_ENV === "development" ? (
          <Script
            id="figma-html-to-design-capture"
            src="https://mcp.figma.com/mcp/html-to-design/capture.js"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  )
}
