import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { DEV_USER_ID, mockTeams } from "@/lib/mock-data"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  if (session.user.id === DEV_USER_ID) return NextResponse.json(mockTeams)

  const memberships = await prisma.membership.findMany({
    where: { userId: session.user.id },
    include: { team: true },
    orderBy: { joinedAt: "desc" },
  })
  return NextResponse.json(memberships.map((m) => ({ ...m.team, role: m.role })))
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  if (session.user.id === DEV_USER_ID) return NextResponse.json({ error: "목 데이터 모드에서는 팀 생성이 지원되지 않습니다" }, { status: 400 })

  const { name, description } = await req.json()
  if (!name?.trim()) return NextResponse.json({ error: "팀 이름을 입력해주세요" }, { status: 400 })

  const team = await prisma.team.create({
    data: {
      name: name.trim(),
      description: description?.trim() || null,
      memberships: { create: { userId: session.user.id, role: "OWNER" } },
    },
  })
  return NextResponse.json(team, { status: 201 })
}
