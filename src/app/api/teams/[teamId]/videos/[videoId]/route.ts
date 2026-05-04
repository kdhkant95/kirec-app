import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { DEV_USER_ID, mockTeams, getVideo } from "@/lib/mock-data"

export async function GET(_: Request, { params }: { params: Promise<{ teamId: string; videoId: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { teamId, videoId } = await params

  if (session.user.id === DEV_USER_ID) {
    const team = mockTeams.find((t) => t.id === teamId)
    const video = getVideo(videoId)
    if (!team || !video) return NextResponse.json({ error: "접근 권한이 없습니다" }, { status: 403 })
    return NextResponse.json(video)
  }

  const [membership, video] = await Promise.all([
    prisma.membership.findUnique({ where: { userId_teamId: { userId: session.user.id, teamId } } }),
    prisma.video.findUnique({ where: { id: videoId, teamId } }),
  ])
  if (!membership || !video) return NextResponse.json({ error: "접근 권한이 없습니다" }, { status: 403 })
  return NextResponse.json(video)
}
