import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(_: Request, { params }: { params: Promise<{ token: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { token } = await params

  const shareLink = await prisma.shareLink.findUnique({
    where: { token },
    include: { video: true, team: true },
  })
  if (!shareLink) return NextResponse.json({ error: "유효하지 않은 링크입니다" }, { status: 404 })
  if (shareLink.expiresAt && shareLink.expiresAt < new Date()) {
    return NextResponse.json({ error: "만료된 링크입니다" }, { status: 410 })
  }

  const membership = await prisma.membership.findUnique({
    where: { userId_teamId: { userId: session.user.id, teamId: shareLink.teamId } },
  })
  if (!membership) return NextResponse.json({ error: "팀 멤버만 열람할 수 있습니다" }, { status: 403 })

  return NextResponse.json({ video: shareLink.video, team: shareLink.team })
}
