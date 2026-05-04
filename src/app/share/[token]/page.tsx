"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

export default function SharePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { token } = useParams<{ token: string }>()
  const [state, setState] = useState<"loading" | "ok" | "error">("loading")
  const [message, setMessage] = useState("")
  const [videoId, setVideoId] = useState<string | null>(null)
  const [teamId, setTeamId] = useState<string | null>(null)

  useEffect(() => {
    if (status === "unauthenticated") router.replace(`/login?callbackUrl=/share/${token}`)
  }, [status, token, router])

  useEffect(() => {
    if (status !== "authenticated") return
    fetch(`/api/share/${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setMessage(data.error)
          setState("error")
        } else {
          setVideoId(data.video.id)
          setTeamId(data.team.id)
          setState("ok")
        }
      })
  }, [token, status])

  useEffect(() => {
    if (state === "ok" && videoId && teamId) {
      router.replace(`/teams/${teamId}/videos/${videoId}`)
    }
  }, [state, videoId, teamId, router])

  if (status === "loading" || state === "loading") {
    return <div className="min-h-dvh flex items-center justify-center" style={{ color: "#767d88" }}>공유 링크 확인 중...</div>
  }

  if (state === "error") {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center gap-4 px-6">
        <p className="text-sm" style={{ color: "#767d88" }}>{message}</p>
        <button onClick={() => router.push("/teams")} className="text-sm text-white">팀 목록으로</button>
      </div>
    )
  }

  return null
}
