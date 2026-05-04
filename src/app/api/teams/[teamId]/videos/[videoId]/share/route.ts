import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(_: Request, { params }: { params: Promise<{ teamId: string; videoId: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { teamId, videoId } = await params

  const membership = await prisma.membership.findUnique({
    where: { userId_teamId: { userId: session.user.id, teamId } },
  })
  if (!membership) return NextResponse.json({ error: "접근 권한이 없습니다" }, { status: 403 })

  const shareLink = await prisma.shareLink.create({
    data: { teamId, videoId },
  })

  return NextResponse.json({ token: shareLink.token }, { status: 201 })
}
