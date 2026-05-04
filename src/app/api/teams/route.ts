import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { DEV_USER_ID, mockTeams } from "@/lib/mock-data"

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  if (session.user.id === DEV_USER_ID) return NextResponse.json(mockTeams)

  try {
    const memberships = await prisma.membership.findMany({
      where: { userId: session.user.id },
      include: { team: true },
      orderBy: { joinedAt: "desc" },
    })
    return NextResponse.json(memberships.map((m) => ({ ...m.team, role: m.role })))
  } catch {
    return NextResponse.json({ error: "DB 연결 실패. DATABASE_URL을 확인하세요." }, { status: 500 })
  }
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  if (session.user.id === DEV_USER_ID) return NextResponse.json({ error: "목 데이터 모드에서는 팀 생성이 지원되지 않습니다" }, { status: 400 })

  const { name, description } = await req.json()
  if (!name?.trim()) return NextResponse.json({ error: "팀 이름을 입력해주세요" }, { status: 400 })

  try {
    const team = await prisma.team.create({
      data: {
        name: name.trim(),
        description: description?.trim() || null,
        memberships: { create: { userId: session.user.id, role: "OWNER" } },
      },
    })
    return NextResponse.json(team, { status: 201 })
  } catch {
    return NextResponse.json({ error: "DB 연결 실패. DATABASE_URL을 확인하세요." }, { status: 500 })
  }
}
