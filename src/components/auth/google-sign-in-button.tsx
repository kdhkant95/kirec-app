import { Button } from "@/components/ui/primitives/button"

type GoogleSignInButtonProps = {
  disabled?: boolean
  onClick: () => void
}

function GoogleIcon() {
  return (
    <svg aria-hidden="true" height="20" viewBox="0 0 24 24" width="20">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.02 5.02 0 0 1-2.21 3.31v2.77h3.77c2.08-1.92 3.28-4.74 3.28-8.09Z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09a6.97 6.97 0 0 1 0-4.18V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.93l3.66-2.84Z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
        fill="#EA4335"
      />
    </svg>
  )
}

export function GoogleSignInButton({ disabled, onClick }: GoogleSignInButtonProps) {
  return (
    <Button
      aria-label="Google로 계속하기"
      className="w-full min-h-[56px] rounded-full border border-[var(--kr-color-border-subtle)] px-[24px] shadow-kr-low"
      disabled={disabled}
      onClick={onClick}
      size="l"
      tone="primary"
    >
      <GoogleIcon />
      <span className="type-body-l text-[var(--kr-color-action-primary-text)]">Google로 계속하기</span>
    </Button>
  )
}
