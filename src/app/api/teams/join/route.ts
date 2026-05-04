import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { inviteCode } = await req.json()
  if (!inviteCode?.trim()) return NextResponse.json({ error: "초대코드를 입력해주세요" }, { status: 400 })

  const team = await prisma.team.findUnique({ where: { inviteCode: inviteCode.trim() } })
  if (!team) return NextResponse.json({ error: "유효하지 않은 초대코드입니다" }, { status: 404 })

  const existing = await prisma.membership.findUnique({
    where: { userId_teamId: { userId: session.user.id, teamId: team.id } },
  })
  if (existing) return NextResponse.json({ error: "이미 가입된 팀입니다" }, { status: 409 })

  await prisma.membership.create({
    data: { userId: session.user.id, teamId: team.id, role: "MEMBER" },
  })

  return NextResponse.json(team)
}
