import { VarWordmark } from "@/components/branding/var-wordmark"

type LoginShellProps = {
  isSubmitting?: boolean
  onGoogleSignIn: () => void
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.77c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09a6.97 6.97 0 0 1 0-4.18V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
    </svg>
  )
}

export function LoginShell({ isSubmitting = false, onGoogleSignIn }: LoginShellProps) {
  return (
    <main className="relative min-h-dvh bg-[var(--kr-color-bg-canvas)] flex items-center justify-center">
      <div className="flex w-full max-w-[384px] flex-col items-center gap-[32px] px-5" style={{ marginTop: 40 }}>
        {/* 로고 + 태그라인 */}
        <div className="flex flex-col items-center gap-[16px]">
          <VarWordmark />
          <p
            className="text-center text-white"
            style={{ fontFamily: "var(--font-family-ui)", fontSize: 18, lineHeight: "24px", letterSpacing: "-0.1px" }}
          >
            경기 내역을 영상으로 팀원과 함께 회고하세요.
          </p>
        </div>

        {/* Google 로그인 버튼 */}
        <button
          disabled={isSubmitting}
          onClick={onGoogleSignIn}
          className="flex w-full items-center justify-center gap-[12px] disabled:opacity-40"
          style={{
            height: 46,
            background: "#1a1a1a",
            border: "1px solid #27272a",
            borderRadius: 8,
            padding: "13px 17px",
          }}
        >
          <GoogleIcon />
          <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, fontWeight: 500, color: "#fff", lineHeight: "20px" }}>
            Google로 로그인
          </span>
        </button>
      </div>
    </main>
  )
}
