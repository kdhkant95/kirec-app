import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { DEV_USER_ID, mockTeams } from "@/lib/mock-data"

export async function GET(_: Request, { params }: { params: Promise<{ teamId: string }> }) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { teamId } = await params

  if (session.user.id === DEV_USER_ID) {
    const team = mockTeams.find((t) => t.id === teamId)
    if (!team) return NextResponse.json({ error: "팀을 찾을 수 없습니다" }, { status: 404 })
    return NextResponse.json(team)
  }

  const membership = await prisma.membership.findUnique({
    where: { userId_teamId: { userId: session.user.id, teamId } },
    include: { team: true },
  })
  if (!membership) return NextResponse.json({ error: "접근 권한이 없습니다" }, { status: 403 })
  return NextResponse.json(membership.team)
}
