"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"

type Team = { id: string; name: string; description: string | null; inviteCode: string; role: string }

export default function TeamsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [teams, setTeams] = useState<Team[]>([])
  const [showCreate, setShowCreate] = useState(false)
  const [showJoin, setShowJoin] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [inviteCode, setInviteCode] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login")
  }, [status, router])

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/teams").then((r) => r.json()).then(setTeams)
    }
  }, [status])

  async function createTeam() {
    if (!name.trim()) return
    setLoading(true)
    const res = await fetch("/api/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    })
    const team = await res.json()
    setTeams((prev) => [{ ...team, role: "OWNER" }, ...prev])
    setName(""); setDescription(""); setShowCreate(false)
    setLoading(false)
  }

  async function joinTeam() {
    if (!inviteCode.trim()) return
    setLoading(true)
    const res = await fetch("/api/teams/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inviteCode }),
    })
    if (res.ok) {
      const team = await res.json()
      setTeams((prev) => [{ ...team, role: "MEMBER" }, ...prev])
      setInviteCode(""); setShowJoin(false)
    } else {
      const { error } = await res.json()
      alert(error)
    }
    setLoading(false)
  }

  if (status === "loading") return <div className="min-h-dvh flex items-center justify-center" style={{ color: "#767d88" }}>로딩 중...</div>

  return (
    <div className="min-h-dvh px-4 py-8 max-w-lg mx-auto">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl text-white" style={{ letterSpacing: "-0.04em" }}>내 팀</h1>
        <button onClick={() => signOut({ callbackUrl: "/login" })} className="text-xs" style={{ color: "#767d88" }}>
          로그아웃
        </button>
      </div>

      {/* 팀 목록 */}
      <div className="space-y-2 mb-6">
        {teams.length === 0 && (
          <p className="text-sm py-8 text-center" style={{ color: "#767d88" }}>팀이 없습니다. 팀을 만들거나 초대코드로 가입하세요.</p>
        )}
        {teams.map((team) => (
          <button
            key={team.id}
            onClick={() => router.push(`/teams/${team.id}`)}
            className="w-full text-left p-4 rounded-lg transition-colors"
            style={{ background: "#1a1a1a", border: "1px solid #27272a" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">{team.name}</span>
              <span className="text-xs uppercase tracking-wider" style={{ color: "#767d88", letterSpacing: "0.05em" }}>
                {team.role}
              </span>
            </div>
            {team.description && (
              <p className="text-xs mt-1" style={{ color: "#767d88" }}>{team.description}</p>
            )}
          </button>
        ))}
      </div>

      {/* 액션 버튼 */}
      <div className="flex gap-2">
        <button
          onClick={() => { setShowCreate(true); setShowJoin(false) }}
          className="flex-1 py-2.5 rounded-lg text-sm font-medium text-white"
          style={{ background: "#1a1a1a", border: "1px solid #27272a" }}
        >
          팀 만들기
        </button>
        <button
          onClick={() => { setShowJoin(true); setShowCreate(false) }}
          className="flex-1 py-2.5 rounded-lg text-sm"
          style={{ color: "#767d88", border: "1px solid #27272a" }}
        >
          초대코드로 가입
        </button>
      </div>

      {/* 팀 만들기 폼 */}
      {showCreate && (
        <div className="mt-4 p-4 rounded-lg space-y-3" style={{ background: "#1a1a1a", border: "1px solid #27272a" }}>
          <p className="text-sm font-medium text-white">새 팀 만들기</p>
          <input
            value={name} onChange={(e) => setName(e.target.value)}
            placeholder="팀 이름"
            className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none"
            style={{ background: "#000", border: "1px solid #27272a" }}
          />
          <input
            value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="설명 (선택)"
            className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none"
            style={{ background: "#000", border: "1px solid #27272a" }}
          />
          <button
            onClick={createTeam} disabled={loading || !name.trim()}
            className="w-full py-2.5 rounded-lg text-sm font-medium text-white disabled:opacity-40"
            style={{ background: "#fff", color: "#000" }}
          >
            {loading ? "생성 중..." : "만들기"}
          </button>
        </div>
      )}

      {/* 초대코드 가입 폼 */}
      {showJoin && (
        <div className="mt-4 p-4 rounded-lg space-y-3" style={{ background: "#1a1a1a", border: "1px solid #27272a" }}>
          <p className="text-sm font-medium text-white">초대코드로 가입</p>
          <input
            value={inviteCode} onChange={(e) => setInviteCode(e.target.value)}
            placeholder="초대코드 입력"
            className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none"
            style={{ background: "#000", border: "1px solid #27272a" }}
          />
          <button
            onClick={joinTeam} disabled={loading || !inviteCode.trim()}
            className="w-full py-2.5 rounded-lg text-sm font-medium disabled:opacity-40"
            style={{ background: "#fff", color: "#000" }}
          >
            {loading ? "가입 중..." : "가입하기"}
          </button>
        </div>
      )}
    </div>
  )
}
