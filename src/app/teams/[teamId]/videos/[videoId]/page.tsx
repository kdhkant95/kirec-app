"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { formatTimestamp } from "@/lib/youtube"

type Comment = {
  id: string
  content: string
  timestampSec: number
  createdAt: string
  user: { id: string; name: string | null; image: string | null }
}

declare global {
  interface Window {
    YT: {
      Player: new (el: HTMLElement, opts: object) => YTPlayer
      PlayerState: { PLAYING: number }
    }
    onYouTubeIframeAPIReady: () => void
  }
}

interface YTPlayer {
  getCurrentTime(): number
  seekTo(sec: number, allow: boolean): void
  destroy(): void
}

export default function VideoPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { teamId, videoId } = useParams<{ teamId: string; videoId: string }>()

  const playerRef = useRef<YTPlayer | null>(null)
  const playerElRef = useRef<HTMLDivElement>(null)
  const submittingRef = useRef(false)

  const [videoInfo, setVideoInfo] = useState<{ title: string; youtubeId: string } | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [content, setContent] = useState("")
  const [currentTime, setCurrentTime] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [shareToken, setShareToken] = useState<string | null>(null)
  const [shareCopied, setShareCopied] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login")
  }, [status, router])

  // 영상 정보 + 댓글 로드
  useEffect(() => {
    if (!teamId || !videoId || status !== "authenticated") return
    fetch(`/api/teams/${teamId}/videos/${videoId}`).then((r) => r.json()).then(setVideoInfo)
    fetch(`/api/teams/${teamId}/videos/${videoId}/comments`).then((r) => r.json()).then(setComments)
  }, [teamId, videoId, status])

  // YouTube IFrame API 초기화
  useEffect(() => {
    if (!videoInfo?.youtubeId) return

    const initPlayer = () => {
      if (!playerElRef.current) return
      playerRef.current = new window.YT.Player(playerElRef.current, {
        videoId: videoInfo.youtubeId,
        playerVars: { rel: 0, modestbranding: 1 },
      })
    }

    if (window.YT?.Player) {
      initPlayer()
    } else {
      const tag = document.createElement("script")
      tag.src = "https://www.youtube.com/iframe_api"
      document.head.appendChild(tag)
      window.onYouTubeIframeAPIReady = initPlayer
    }

    return () => {
      playerRef.current?.destroy()
      playerRef.current = null
    }
  }, [videoInfo?.youtubeId])

  // 현재 재생 시간 추적
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === "function") {
        setCurrentTime(Math.floor(playerRef.current.getCurrentTime()))
      }
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const seekTo = useCallback((sec: number) => {
    playerRef.current?.seekTo(sec, true)
  }, [])

  async function submitComment() {
    if (!content.trim() || submittingRef.current) return
    submittingRef.current = true
    setSubmitting(true)
    const res = await fetch(`/api/teams/${teamId}/videos/${videoId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, timestampSec: currentTime }),
    })
    if (res.ok) {
      const comment = await res.json()
      setComments((prev) => [...prev, comment].sort((a, b) => a.timestampSec - b.timestampSec))
      setContent("")
    }
    submittingRef.current = false
    setSubmitting(false)
  }

  async function createShareLink() {
    const res = await fetch(`/api/teams/${teamId}/videos/${videoId}/share`, { method: "POST" })
    if (res.ok) {
      const { token } = await res.json()
      setShareToken(token)
      const url = `${window.location.origin}/share/${token}`
      await navigator.clipboard.writeText(url)
      setShareCopied(true)
      setTimeout(() => setShareCopied(false), 2000)
    }
  }

  if (status === "loading") return <div className="min-h-dvh flex items-center justify-center" style={{ color: "#767d88" }}>로딩 중...</div>

  return (
    <div className="min-h-dvh flex flex-col max-w-lg mx-auto">
      {/* 네비 */}
      <div className="px-4 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid #27272a" }}>
        <button onClick={() => router.push(`/teams/${teamId}`)} className="text-sm" style={{ color: "#767d88" }}>← 목록</button>
        <button
          onClick={createShareLink}
          className="text-xs uppercase tracking-wider"
          style={{ color: shareCopied ? "#fff" : "#767d88", letterSpacing: "0.05em" }}
        >
          {shareCopied ? "링크 복사됨!" : "공유"}
        </button>
      </div>

      {/* 영상 제목 */}
      {videoInfo && (
        <div className="px-4 py-3">
          <h1 className="text-base font-medium text-white" style={{ letterSpacing: "-0.02em" }}>{videoInfo.title}</h1>
        </div>
      )}

      {/* YouTube 플레이어 */}
      <div className="w-full" style={{ aspectRatio: "16/9", background: "#1a1a1a" }}>
        <div ref={playerElRef} className="w-full h-full" />
      </div>

      {/* 현재 타임스탬프 표시 */}
      <div className="px-4 py-3" style={{ borderBottom: "1px solid #27272a" }}>
        <p className="text-xs uppercase tracking-wider" style={{ color: "#767d88", letterSpacing: "0.05em" }}>
          현재 위치 <span className="text-white font-mono">{formatTimestamp(currentTime)}</span>
        </p>
      </div>

      {/* 댓글 작성 */}
      <div className="px-4 py-3" style={{ borderBottom: "1px solid #27272a" }}>
        <div className="flex gap-2">
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && submitComment()}
            placeholder={`${formatTimestamp(currentTime)} 에 회고 남기기`}
            className="flex-1 px-3 py-2 rounded-lg text-sm text-white outline-none"
            style={{ background: "#1a1a1a", border: "1px solid #27272a" }}
          />
          <button
            onClick={submitComment}
            disabled={submitting || !content.trim()}
            className="px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-40"
            style={{ background: "#fff", color: "#000" }}
          >
            등록
          </button>
        </div>
      </div>

      {/* 댓글 목록 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        {comments.length === 0 && (
          <p className="text-sm text-center py-8" style={{ color: "#767d88" }}>
            첫 번째 회고를 남겨보세요
          </p>
        )}
        {comments.map((comment) => (
          <button
            key={comment.id}
            onClick={() => seekTo(comment.timestampSec)}
            className="w-full text-left p-3 rounded-lg transition-colors"
            style={{ background: "transparent" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#1a1a1a")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <div className="flex items-start gap-3">
              {/* 타임스탬프 마커 */}
              <span
                className="text-xs font-mono mt-0.5 shrink-0 px-1.5 py-0.5 rounded"
                style={{ background: "#27272a", color: "#a7a7a7" }}
              >
                {formatTimestamp(comment.timestampSec)}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-medium text-white">{comment.user.name ?? "익명"}</span>
                  <span className="text-xs" style={{ color: "#767d88" }}>
                    {new Date(comment.createdAt).toLocaleDateString("ko-KR")}
                  </span>
                </div>
                <p className="text-sm text-white whitespace-pre-wrap">{comment.content}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
