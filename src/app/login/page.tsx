"use client"

import { LoginShell } from "@/components/auth/login-shell"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"

function LoginContent() {
  const params = useSearchParams()
  const callbackUrl = params.get("callbackUrl") ?? "/teams"
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleGoogleSignIn() {
    setIsSubmitting(true)
    try {
      await signIn("google", { callbackUrl })
    } finally {
      setIsSubmitting(false)
    }
  }

  return <LoginShell isSubmitting={isSubmitting} onGoogleSignIn={handleGoogleSignIn} />
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  )
}
