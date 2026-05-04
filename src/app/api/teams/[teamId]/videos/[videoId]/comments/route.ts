import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { DEV_USER_ID, mockTeams, mockComments, getVideo } from "@/lib/mock-data"

type Params = { params: Promise<{ teamId: string; videoId: string }> }

export async function GET(_: Request, { params }: Params) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { teamId, videoId } = await params

  if (session.user.id === DEV_USER_ID) {
    const team = mockTeams.find((t) => t.id === teamId)
    const video = getVideo(videoId)
    if (!team || !video) return NextResponse.json({ error: "접근 권한이 없습니다" }, { status: 403 })
    return NextResponse.json(mockComments[videoId] ?? [])
  }

  const [membership, video] = await Promise.all([
    prisma.membership.findUnique({ where: { userId_teamId: { userId: session.user.id, teamId } } }),
    prisma.video.findUnique({ where: { id: videoId, teamId } }),
  ])
  if (!membership || !video) return NextResponse.json({ error: "접근 권한이 없습니다" }, { status: 403 })

  const comments = await prisma.comment.findMany({
    where: { videoId },
    orderBy: { timestampSec: "asc" },
    include: { user: { select: { id: true, name: true, image: true } } },
  })
  return NextResponse.json(comments)
}

export async function POST(req: Request, { params }: Params) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { teamId, videoId } = await params

  if (session.user.id === DEV_USER_ID) return NextResponse.json({ error: "목 데이터 모드에서는 댓글 작성이 지원되지 않습니다" }, { status: 400 })

  const [membership, video] = await Promise.all([
    prisma.membership.findUnique({ where: { userId_teamId: { userId: session.user.id, teamId } } }),
    prisma.video.findUnique({ where: { id: videoId, teamId } }),
  ])
  if (!membership || !video) return NextResponse.json({ error: "접근 권한이 없습니다" }, { status: 403 })

  const { content, timestampSec } = await req.json()
  if (!content?.trim()) return NextResponse.json({ error: "내용을 입력해주세요" }, { status: 400 })
  if (typeof timestampSec !== "number") return NextResponse.json({ error: "타임스탬프가 필요합니다" }, { status: 400 })

  const comment = await prisma.comment.create({
    data: { content: content.trim(), timestampSec: Math.floor(timestampSec), userId: session.user.id, videoId },
    include: { user: { select: { id: true, name: true, image: true } } },
  })
  return NextResponse.json(comment, { status: 201 })
}
