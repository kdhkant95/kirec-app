"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { VarWordmark } from "@/components/branding/var-wordmark"
import { Avatar } from "@/components/ui/primitives/avatar"
import { Button } from "@/components/ui/primitives/button"
import { ModalDialog } from "@/components/ui/primitives/modal-dialog"
import { TextField } from "@/components/ui/primitives/text-field"

function PeopleIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 80 80" fill="none">
      <circle cx="30" cy="26" r="11" stroke="var(--kr-color-text-secondary)" strokeWidth="2.5" />
      <circle cx="54" cy="30" r="9" stroke="var(--kr-color-text-muted)" strokeWidth="2" opacity="0.6" />
      <path
        d="M11 60c0-10.5 8.5-16 19-16s19 5.5 19 16"
        stroke="var(--kr-color-text-secondary)"
        strokeLinecap="round"
        strokeWidth="2.5"
      />
      <path
        d="M44.5 57c1-7.5 6.5-10 11-10 4.5 0 9 2.6 11.5 7"
        stroke="var(--kr-color-text-muted)"
        strokeLinecap="round"
        strokeWidth="2"
        opacity="0.6"
      />
    </svg>
  )
}

function getInitials(name?: string | null, email?: string | null) {
  if (name) {
    const parts = name.trim().split(/\s+/)
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    return name.trim().slice(0, 2).toUpperCase()
  }
  if (email) return email.slice(0, 2).toUpperCase()
  return "?"
}

export default function TeamsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [showCreate, setShowCreate] = useState(false)
  const [showJoin, setShowJoin] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [inviteCode, setInviteCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!showProfile) return
    function handleClickOutside(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showProfile])

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login")
  }, [status, router])

  useEffect(() => {
    if (status !== "authenticated") return
    fetch("/api/teams")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          router.replace(`/teams/${data[0].id}`)
        } else {
          setReady(true)
        }
      })
      .catch(() => setReady(true))
  }, [status, router])

  function resetCreate() {
    setName("")
    setDescription("")
    setShowCreate(false)
  }

  function resetJoin() {
    setInviteCode("")
    setShowJoin(false)
  }

  async function createTeam() {
    if (!name.trim()) return
    setLoading(true)
    const res = await fetch("/api/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) {
      alert(data.error ?? "팀 생성에 실패했습니다")
      return
    }
    router.replace(`/teams/${data.id}`)
  }

  async function joinTeam() {
    if (!inviteCode.trim()) return
    setLoading(true)
    const res = await fetch("/api/teams/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inviteCode }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) {
      alert(data.error ?? "팀 합류에 실패했습니다")
      return
    }
    router.replace(`/teams/${data.id}`)
  }

  if (status === "loading" || !ready) return null

  const userInitials = getInitials(session?.user?.name, session?.user?.email)

  return (
    <main className="flex min-h-dvh flex-col bg-[var(--kr-color-bg-canvas)]">
      {/* Header */}
      <header className="flex h-[72px] shrink-0 items-center justify-between border-b border-[var(--kr-color-border-subtle)] px-[20px]">
        <VarWordmark />
        <div ref={profileRef} className="relative">
          <button
            aria-label="프로필 메뉴"
            onClick={() => setShowProfile((v) => !v)}
            type="button"
          >
            <Avatar content="initials" initials={userInitials} size="m" />
          </button>

          <div
            className={`absolute right-0 top-full z-50 mt-[6px] flex w-[160px] origin-top-right flex-col overflow-hidden rounded-[16px] border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-floating)] p-[6px] shadow-[var(--kr-shadow-overlay)] transition-[opacity,transform] duration-150 ease-out ${showProfile ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
          >
            <div className="px-[14px] py-[8px]">
              <p className="type-label-s truncate text-[var(--kr-color-text-muted)]">
                {session?.user?.email ?? session?.user?.name ?? ""}
              </p>
            </div>
            <div className="mx-[4px] mb-[4px] h-px bg-[var(--kr-color-border-subtle)]" />
            <button
              className="flex items-center gap-[8px] rounded-[10px] px-[14px] py-[10px] text-left text-[var(--kr-color-state-danger)] transition-colors duration-150 hover:bg-[var(--kr-color-bg-selected)]"
              onClick={() => signOut({ callbackUrl: "/login" })}
              type="button"
            >
              <span className="type-body-m">로그아웃</span>
            </button>
          </div>
        </div>
      </header>

      {/* Empty state */}
      <div className="flex flex-1 flex-col items-center justify-center px-[20px]">
        <div className="flex w-full max-w-[340px] flex-col items-center gap-[40px]">
          <PeopleIcon className="size-20" />

          <div className="flex flex-col items-center gap-[16px] text-center">
            <h1 className="type-heading-l text-[var(--kr-color-text-primary)]">
              먼저 팀에 합류해볼까요?
            </h1>
            <p
              className="text-[var(--kr-color-text-secondary)]"
              style={{ fontSize: 18, lineHeight: "26px", whiteSpace: "pre-line" }}
            >
              {"기존 팀에 초대코드로 들어가거나,\n새 팀을 만들 수 있어요."}
            </p>
          </div>

          <div className="flex w-full flex-col gap-[12px]">
            <Button className="w-full" size="l" tone="primary" onClick={() => setShowCreate(true)}>
              새 팀 만들기
            </Button>
            <Button className="w-full" size="l" tone="secondary" onClick={() => setShowJoin(true)}>
              초대 코드로 팀 합류
            </Button>
          </div>
        </div>
      </div>

      {/* Create team modal */}
      <ModalDialog
        dismissible
        onClose={resetCreate}
        onPrimaryAction={createTeam}
        onSecondaryAction={resetCreate}
        open={showCreate}
        primaryActionLabel={loading ? "생성 중..." : "만들기"}
        secondaryActionLabel="취소"
        title="새 팀 만들기"
        variant="form"
      >
        <TextField
          label="팀 이름"
          onChange={(e) => setName(e.target.value)}
          placeholder="팀 이름을 입력하세요"
          value={name}
        />
        <TextField
          label="설명 (선택)"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="팀 설명을 입력하세요"
          value={description}
        />
      </ModalDialog>

      {/* Join team modal */}
      <ModalDialog
        dismissible
        onClose={resetJoin}
        onPrimaryAction={joinTeam}
        onSecondaryAction={resetJoin}
        open={showJoin}
        primaryActionLabel={loading ? "가입 중..." : "가입하기"}
        secondaryActionLabel="취소"
        title="초대 코드로 팀 합류"
        variant="form"
      >
        <TextField
          label="초대 코드"
          onChange={(e) => setInviteCode(e.target.value)}
          placeholder="초대 코드를 입력하세요"
          value={inviteCode}
        />
      </ModalDialog>
    </main>
  )
}
