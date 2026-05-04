"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { useSession } from "next-auth/react"

type Video = { id: string; title: string; youtubeId: string; matchDate: string | null; _count: { comments: number } }

export default function TeamPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { teamId } = useParams<{ teamId: string }>()
  const [videos, setVideos] = useState<Video[]>([])
  const [showAdd, setShowAdd] = useState(false)
  const [title, setTitle] = useState("")
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [matchDate, setMatchDate] = useState("")
  const [loading, setLoading] = useState(false)
  const [inviteCode, setInviteCode] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login")
  }, [status, router])

  useEffect(() => {
    if (!teamId || status !== "authenticated") return
    fetch(`/api/teams/${teamId}/videos`).then((r) => r.json()).then(setVideos)
    fetch(`/api/teams/${teamId}/info`).then((r) => r.ok ? r.json() : null).then((d) => d && setInviteCode(d.inviteCode))
  }, [teamId, status])

  async function addVideo() {
    if (!title.trim() || !youtubeUrl.trim()) return
    setLoading(true)
    const res = await fetch(`/api/teams/${teamId}/videos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, youtubeUrl, matchDate: matchDate || null }),
    })
    if (res.ok) {
      const video = await res.json()
      setVideos((prev) => [{ ...video, _count: { comments: 0 } }, ...prev])
      setTitle(""); setYoutubeUrl(""); setMatchDate(""); setShowAdd(false)
    } else {
      const { error } = await res.json()
      alert(error)
    }
    setLoading(false)
  }

  async function copyInviteCode() {
    if (!inviteCode) return
    await navigator.clipboard.writeText(inviteCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (status === "loading") return <div className="min-h-dvh flex items-center justify-center" style={{ color: "#767d88" }}>로딩 중...</div>

  return (
    <div className="min-h-dvh px-4 py-8 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => router.push("/teams")} className="text-sm" style={{ color: "#767d88" }}>← 팀 목록</button>
      </div>

      {/* 초대코드 */}
      {inviteCode && (
        <button
          onClick={copyInviteCode}
          className="w-full mb-6 p-3 rounded-lg text-left transition-opacity"
          style={{ background: "#1a1a1a", border: "1px solid #27272a" }}
        >
          <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "#767d88", letterSpacing: "0.05em" }}>초대코드</p>
          <p className="text-sm font-mono text-white">{copied ? "복사됨!" : inviteCode}</p>
        </button>
      )}

      {/* 영상 목록 */}
      <div className="space-y-2 mb-6">
        {videos.length === 0 && !showAdd && (
          <p className="text-sm py-8 text-center" style={{ color: "#767d88" }}>등록된 영상이 없습니다.</p>
        )}
        {videos.map((video) => (
          <button
            key={video.id}
            onClick={() => router.push(`/teams/${teamId}/videos/${video.id}`)}
            className="w-full text-left p-4 rounded-lg"
            style={{ background: "#1a1a1a", border: "1px solid #27272a" }}
          >
            <div className="flex gap-3 items-start">
              <img
                src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                alt={video.title}
                className="w-20 h-14 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{video.title}</p>
                {video.matchDate && (
                  <p className="text-xs mt-0.5" style={{ color: "#767d88" }}>
                    {new Date(video.matchDate).toLocaleDateString("ko-KR")}
                  </p>
                )}
                <p className="text-xs mt-1" style={{ color: "#a7a7a7" }}>댓글 {video._count.comments}개</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={() => setShowAdd((v) => !v)}
        className="w-full py-2.5 rounded-lg text-sm font-medium text-white"
        style={{ background: "#1a1a1a", border: "1px solid #27272a" }}
      >
        + 영상 등록
      </button>

      {showAdd && (
        <div className="mt-4 p-4 rounded-lg space-y-3" style={{ background: "#1a1a1a", border: "1px solid #27272a" }}>
          <input
            value={title} onChange={(e) => setTitle(e.target.value)}
            placeholder="영상 제목"
            className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none"
            style={{ background: "#000", border: "1px solid #27272a" }}
          />
          <input
            value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="YouTube URL"
            className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none"
            style={{ background: "#000", border: "1px solid #27272a" }}
          />
          <input
            type="date" value={matchDate} onChange={(e) => setMatchDate(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
            style={{ background: "#000", border: "1px solid #27272a", color: matchDate ? "#fff" : "#767d88" }}
          />
          <button
            onClick={addVideo} disabled={loading || !title.trim() || !youtubeUrl.trim()}
            className="w-full py-2.5 rounded-lg text-sm font-medium disabled:opacity-40"
            style={{ background: "#fff", color: "#000" }}
          >
            {loading ? "등록 중..." : "등록하기"}
          </button>
        </div>
      )}
    </div>
  )
}
