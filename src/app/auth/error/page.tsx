"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { VarMark } from "@/components/branding/var-mark"
import { Button } from "@/components/ui/primitives/button"

const ERROR_MESSAGES: Record<string, { title: string; description: string }> = {
  AccessDenied: {
    title: "로그인할 수 없어요",
    description: "현재 서비스가 테스트 중이라 일부 계정만 로그인할 수 있어요. 팀 관리자에게 문의해주세요.",
  },
  OAuthCallback: {
    title: "로그인 중 오류가 발생했어요",
    description: "Google 로그인 처리 중 문제가 생겼어요. 잠시 후 다시 시도해주세요.",
  },
  OAuthSignin: {
    title: "로그인을 시작할 수 없어요",
    description: "Google 연결에 실패했어요. 잠시 후 다시 시도해주세요.",
  },
  Configuration: {
    title: "서버 설정 오류",
    description: "서비스 설정에 문제가 있어요. 관리자에게 문의해주세요.",
  },
}

function ErrorContent() {
  const params = useSearchParams()
  const error = params.get("error") ?? "Unknown"
  const info = ERROR_MESSAGES[error] ?? {
    title: "로그인에 실패했어요",
    description: "알 수 없는 오류가 발생했어요. 잠시 후 다시 시도해주세요.",
  }

  return (
    <main className="min-h-dvh bg-[var(--kr-color-bg-canvas)] flex flex-col items-center justify-center px-5">
      <div className="w-full max-w-[375px] space-y-8">
        <VarMark />

        <div className="space-y-3">
          <h1 className="type-heading-m text-[var(--kr-color-text-primary)]">{info.title}</h1>
          <p className="type-body-m text-[var(--kr-color-text-secondary)]">{info.description}</p>
        </div>

        <Button
          size="l"
          tone="primary"
          className="w-full"
          onClick={() => window.location.href = "/login"}
        >
          돌아가기
        </Button>
      </div>
    </main>
  )
}

export default function AuthErrorPage() {
  return (
    <Suspense>
      <ErrorContent />
    </Suspense>
  )
}
