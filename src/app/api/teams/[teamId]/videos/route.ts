import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { extractYoutubeId } from "@/lib/youtube"
import { DEV_USER_ID, mockTeams, mockVideos } from "@/lib/mock-data"

export async function GET(_: Request, { params }: { params: Promise<{ teamId: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { teamId } = await params

  if (session.user.id === DEV_USER_ID) {
    const team = mockTeams.find((t) => t.id === teamId)
    if (!team) return NextResponse.json({ error: "접근 권한이 없습니다" }, { status: 403 })
    return NextResponse.json(mockVideos[teamId] ?? [])
  }

  const membership = await prisma.membership.findUnique({ where: { userId_teamId: { userId: session.user.id, teamId } } })
  if (!membership) return NextResponse.json({ error: "접근 권한이 없습니다" }, { status: 403 })

  const videos = await prisma.video.findMany({
    where: { teamId },
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { comments: true } } },
  })
  return NextResponse.json(videos)
}

export async function POST(req: Request, { params }: { params: Promise<{ teamId: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { teamId } = await params

  if (session.user.id === DEV_USER_ID) return NextResponse.json({ error: "목 데이터 모드에서는 영상 등록이 지원되지 않습니다" }, { status: 400 })

  const membership = await prisma.membership.findUnique({ where: { userId_teamId: { userId: session.user.id, teamId } } })
  if (!membership) return NextResponse.json({ error: "접근 권한이 없습니다" }, { status: 403 })

  const { title, youtubeUrl, description, matchDate } = await req.json()
  if (!title?.trim()) return NextResponse.json({ error: "제목을 입력해주세요" }, { status: 400 })

  const youtubeId = extractYoutubeId(youtubeUrl)
  if (!youtubeId) return NextResponse.json({ error: "유효한 YouTube URL을 입력해주세요" }, { status: 400 })

  const video = await prisma.video.create({
    data: {
      title: title.trim(),
      youtubeUrl,
      youtubeId,
      description: description?.trim() || null,
      matchDate: matchDate ? new Date(matchDate) : null,
      teamId,
    },
  })
  return NextResponse.json(video, { status: 201 })
}
