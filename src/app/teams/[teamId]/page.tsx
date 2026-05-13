"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { Avatar } from "@/components/ui/primitives/avatar"
import { BottomNavigation } from "@/components/ui/primitives/bottom-navigation"
import { BottomSheet } from "@/components/ui/primitives/bottom-sheet"
import { Button } from "@/components/ui/primitives/button"
import { ModalDialog } from "@/components/ui/primitives/modal-dialog"
import { SearchField } from "@/components/ui/primitives/search-field"
import { TextField } from "@/components/ui/primitives/text-field"
import { VideoCircleIcon, CommentIcon } from "@/components/ui/icons/var-icons"
import { cx } from "@/lib/cx"

type Video = {
  id: string
  title: string
  youtubeId: string
  matchDate: string | null
  _count: { comments: number }
}

type Team = {
  id: string
  name: string
  description: string | null
  inviteCode: string
  role: string
}

type TeamInfo = {
  id: string
  name: string
  inviteCode: string
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 20 20" fill="none">
      <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
    </svg>
  )
}

function PlusSmallIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 16 16" fill="none">
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
    </svg>
  )
}

function KeyIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 16 16" fill="none">
      <circle cx="5.5" cy="8" r="3" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 8h5M11 8v2" stroke="currentColor" strokeLinecap="round" strokeWidth="1.2" />
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

function formatMatchDate(dateStr: string) {
  const date = new Date(dateStr)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"]
  const weekday = weekdays[date.getDay()]
  return `${month}월 ${day}일 ${weekday}요일`
}

export default function TeamPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { teamId } = useParams<{ teamId: string }>()
  const [videos, setVideos] = useState<Video[]>([])
  const [teamInfo, setTeamInfo] = useState<TeamInfo | null>(null)
  const [allTeams, setAllTeams] = useState<Team[]>([])
  const [search, setSearch] = useState("")
  const [showAdd, setShowAdd] = useState(false)
  const [showSwitcher, setShowSwitcher] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [showJoin, setShowJoin] = useState(false)
  const [title, setTitle] = useState("")
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [matchDate, setMatchDate] = useState("")
  const [createName, setCreateName] = useState("")
  const [createDescription, setCreateDescription] = useState("")
  const [joinCode, setJoinCode] = useState("")
  const [loading, setLoading] = useState(false)
  const switcherRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login")
  }, [status, router])

  useEffect(() => {
    if (!teamId || status !== "authenticated") return
    fetch(`/api/teams/${teamId}/videos`).then((r) => r.json()).then(setVideos)
    fetch(`/api/teams/${teamId}/info`).then((r) => (r.ok ? r.json() : null)).then((d) => d && setTeamInfo(d))
    fetch("/api/teams").then((r) => r.json()).then(setAllTeams)
  }, [teamId, status])

  useEffect(() => {
    if (!showSwitcher && !showProfile) return
    function handleClickOutside(e: MouseEvent) {
      if (showSwitcher && switcherRef.current && !switcherRef.current.contains(e.target as Node)) {
        setShowSwitcher(false)
      }
      if (showProfile && profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfile(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showSwitcher, showProfile])

  function resetCreate() {
    setCreateName("")
    setCreateDescription("")
    setShowCreate(false)
  }

  function resetJoin() {
    setJoinCode("")
    setShowJoin(false)
  }

  async function createTeam() {
    if (!createName.trim()) return
    setLoading(true)
    const res = await fetch("/api/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: createName, description: createDescription }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) {
      alert(data.error ?? "팀 생성에 실패했습니다")
      return
    }
    setAllTeams((prev) => [{ ...data, role: "OWNER" }, ...prev])
    resetCreate()
    router.push(`/teams/${data.id}`)
  }

  async function joinTeam() {
    if (!joinCode.trim()) return
    setLoading(true)
    const res = await fetch("/api/teams/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inviteCode: joinCode }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) {
      alert(data.error ?? "팀 합류에 실패했습니다")
      return
    }
    setAllTeams((prev) => [{ ...data, role: "MEMBER" }, ...prev])
    resetJoin()
    router.push(`/teams/${data.id}`)
  }

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
      setTitle("")
      setYoutubeUrl("")
      setMatchDate("")
      setShowAdd(false)
    } else {
      const { error } = await res.json()
      alert(error)
    }
    setLoading(false)
  }

  if (status === "loading") return null

  const userInitials = getInitials(session?.user?.name, session?.user?.email)
  const teamInitials = teamInfo ? getInitials(teamInfo.name) : "…"
  const teamName = teamInfo?.name ?? "팀"

  const filteredVideos = search.trim()
    ? videos.filter((v) => v.title.toLowerCase().includes(search.toLowerCase()))
    : videos

  return (
    <main className="flex min-h-dvh flex-col bg-[var(--kr-color-bg-canvas)]">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-[72px] shrink-0 items-center justify-between border-b border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-canvas)] pl-[12px] pr-[20px]">
        {/* Team switcher */}
        <div ref={switcherRef} className="relative w-[240px]">
          <button
            className="flex h-[56px] w-full items-center gap-[8px] rounded-[var(--kr-radius-16)] px-[var(--kr-space-16)] text-[var(--kr-color-text-primary)] transition-colors duration-150"
            onClick={() => setShowSwitcher((v) => !v)}
            type="button"
          >
            <Avatar content="initials" initials={teamInitials} size="s" />
            <span className="type-body-l min-w-0 flex-1 truncate text-left">{teamName}</span>
            <ChevronDownIcon
              className={cx(
                "size-5 shrink-0 text-[var(--kr-color-text-secondary)] transition-transform duration-150",
                showSwitcher && "rotate-180",
              )}
            />
          </button>

          <div
            className={cx(
              "absolute left-0 top-full z-50 mt-[6px] flex w-[240px] origin-top-left flex-col overflow-hidden rounded-[20px] border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-floating)] p-[6px] shadow-[var(--kr-shadow-overlay)] transition-[opacity,transform] duration-150 ease-out",
              showSwitcher ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none",
            )}
          >
              {allTeams.map((team) => (
                <button
                  key={team.id}
                  className={cx(
                    "flex items-center gap-[10px] rounded-[14px] px-[10px] py-[9px] text-left transition-colors duration-150",
                    team.id === teamId ? "bg-[var(--kr-color-bg-selected)]" : "hover:bg-[var(--kr-color-bg-selected)]",
                  )}
                  onClick={() => {
                    setShowSwitcher(false)
                    if (team.id !== teamId) router.push(`/teams/${team.id}`)
                  }}
                  type="button"
                >
                  <Avatar content="initials" initials={getInitials(team.name)} size="s" />
                  <span className="type-body-m min-w-0 flex-1 truncate text-[var(--kr-color-text-primary)]">
                    {team.name}
                  </span>
                </button>
              ))}

              <div className="mx-[4px] my-[4px] h-px bg-[var(--kr-color-border-subtle)]" />

              <button
                className="flex items-center gap-[10px] rounded-[14px] px-[10px] py-[9px] text-left transition-colors duration-150 hover:bg-[var(--kr-color-bg-selected)]"
                onClick={() => {
                  setShowSwitcher(false)
                  setShowCreate(true)
                }}
                type="button"
              >
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-[var(--kr-color-border-subtle)] text-[var(--kr-color-text-muted)]">
                  <PlusSmallIcon className="size-4" />
                </span>
                <span className="type-body-m text-[var(--kr-color-text-secondary)]">새 팀 만들기</span>
              </button>

              <button
                className="flex items-center gap-[10px] rounded-[14px] px-[10px] py-[9px] text-left transition-colors duration-150 hover:bg-[var(--kr-color-bg-selected)]"
                onClick={() => {
                  setShowSwitcher(false)
                  setShowJoin(true)
                }}
                type="button"
              >
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-[var(--kr-color-border-subtle)] text-[var(--kr-color-text-muted)]">
                  <KeyIcon className="size-4" />
                </span>
                <span className="type-body-m text-[var(--kr-color-text-secondary)]">초대 코드로 팀 합류</span>
              </button>
          </div>
        </div>

        {/* User avatar + profile dropdown */}
        <div ref={profileRef} className="relative">
          <button
            aria-label="프로필 메뉴"
            onClick={() => setShowProfile((v) => !v)}
            type="button"
          >
            <Avatar content="initials" initials={userInitials} size="m" />
          </button>

          <div
            className={cx(
              "absolute right-0 top-full z-50 mt-[6px] flex w-[160px] origin-top-right flex-col overflow-hidden rounded-[16px] border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-floating)] p-[6px] shadow-[var(--kr-shadow-overlay)] transition-[opacity,transform] duration-150 ease-out",
              showProfile ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none",
            )}
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

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-[20px] py-[24px]">
        {/* Search + date filter row */}
        <div className="mb-[24px] flex gap-[16px]">
          <div className="flex-1">
            <SearchField
              onChange={(e) => setSearch(e.target.value)}
              onClear={() => setSearch("")}
              placeholder="경기이름 검색"
              value={search}
            />
          </div>
          <div className="shrink-0">
            <Button
              className="h-full"
              size="l"
              tone="secondary"
              onClick={() => setShowAdd(true)}
            >
              + 영상 등록
            </Button>
          </div>
        </div>

        {/* Match / video list */}
        {filteredVideos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-[64px] text-center">
            <p className="type-body-l text-[var(--kr-color-text-muted)]">
              {search ? "검색 결과가 없습니다." : "등록된 경기 영상이 없습니다."}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-[16px]">
            {filteredVideos.map((video) => (
              <button
                key={video.id}
                className="flex w-full flex-col gap-[5px] rounded-[16px] border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-surface)] p-[16px] text-left transition-colors duration-150"
                onClick={() => router.push(`/teams/${teamId}/videos/${video.id}`)}
                type="button"
              >
                {/* Row 1: date + title */}
                <div className="flex h-[45px] items-center justify-between">
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    {video.matchDate ? (
                      <span className="type-label-s text-[var(--kr-color-text-secondary)]">
                        {formatMatchDate(video.matchDate)}
                      </span>
                    ) : (
                      <span className="type-label-s text-[var(--kr-color-text-muted)]">날짜 없음</span>
                    )}
                    <span className="type-body-l truncate font-bold text-[var(--kr-color-text-primary)]">
                      {video.title}
                    </span>
                  </div>
                </div>

                {/* Row 2: video badge + comment count */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-[4px]">
                    <span className="flex items-center gap-[var(--kr-space-4)] rounded-[var(--kr-radius-full)] border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-floating)] px-[var(--kr-space-8)] py-[var(--kr-space-4)]">
                      <VideoCircleIcon className="size-4 text-[var(--kr-color-text-secondary)]" />
                      <span className="type-label-s text-[var(--kr-color-text-secondary)]">영상</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-[4px] text-[var(--kr-color-text-secondary)]">
                    <CommentIcon className="size-4" />
                    <span className="type-label-s">{video._count.comments}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom navigation */}
      <div className="shrink-0 px-[16px] pb-[16px] pt-[8px]">
        <BottomNavigation active="review" />
      </div>

      {/* Add video sheet */}
      <BottomSheet
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onPrimaryAction={addVideo}
        onSecondaryAction={() => setShowAdd(false)}
        primaryActionLabel={loading ? "등록 중..." : "등록하기"}
        secondaryActionLabel="취소"
        title="경기 영상 등록"
      >
        <TextField
          label="경기 제목"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="경기 제목을 입력하세요"
          value={title}
        />
        <TextField
          label="YouTube URL"
          onChange={(e) => setYoutubeUrl(e.target.value)}
          placeholder="https://youtube.com/..."
          value={youtubeUrl}
        />
        <TextField
          label="경기 날짜 (선택)"
          onChange={(e) => setMatchDate(e.target.value)}
          placeholder="YYYY-MM-DD"
          value={matchDate}
        />
      </BottomSheet>

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
          onChange={(e) => setCreateName(e.target.value)}
          placeholder="팀 이름을 입력하세요"
          value={createName}
        />
        <TextField
          label="설명 (선택)"
          onChange={(e) => setCreateDescription(e.target.value)}
          placeholder="팀 설명을 입력하세요"
          value={createDescription}
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
          onChange={(e) => setJoinCode(e.target.value)}
          placeholder="초대 코드를 입력하세요"
          value={joinCode}
        />
      </ModalDialog>
    </main>
  )
}
