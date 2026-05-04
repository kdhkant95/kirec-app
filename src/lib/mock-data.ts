export const DEV_USER_ID = "dev-user-1"

export const mockTeams = [
  { id: "team-1", name: "FC 한강", inviteCode: "hangang-2024", description: "한강 주변 동호회", role: "OWNER" },
  { id: "team-2", name: "마포 유나이티드", inviteCode: "mapo-utd", description: null, role: "MEMBER" },
]

export const mockVideos: Record<string, object[]> = {
  "team-1": [
    {
      id: "video-1",
      title: "2024 스프링 리그 3라운드 vs 마포FC",
      youtubeId: "LXb3EKWsInQ",
      youtubeUrl: "https://youtu.be/LXb3EKWsInQ",
      matchDate: "2024-04-20T00:00:00.000Z",
      teamId: "team-1",
      _count: { comments: 3 },
    },
    {
      id: "video-2",
      title: "2024 스프링 리그 2라운드 vs 용산FC",
      youtubeId: "dQw4w9WgXcQ",
      youtubeUrl: "https://youtu.be/dQw4w9WgXcQ",
      matchDate: "2024-04-06T00:00:00.000Z",
      teamId: "team-1",
      _count: { comments: 1 },
    },
  ],
  "team-2": [
    {
      id: "video-3",
      title: "친선경기 vs 은평FC",
      youtubeId: "M7lc1UVf-VE",
      youtubeUrl: "https://youtu.be/M7lc1UVf-VE",
      matchDate: "2024-03-15T00:00:00.000Z",
      teamId: "team-2",
      _count: { comments: 2 },
    },
  ],
}

export const mockComments: Record<string, object[]> = {
  "video-1": [
    {
      id: "c1",
      content: "37분 골킥 이후 수비 라인 너무 올라갔음. 두 번째 실점 원인",
      timestampSec: 2220,
      createdAt: "2024-04-21T10:00:00.000Z",
      user: { id: DEV_USER_ID, name: "테스트 사용자", image: null },
    },
    {
      id: "c2",
      content: "15분 역습 상황 — 측면 커버 타이밍 아쉬움. 한발 더 빨랐으면",
      timestampSec: 900,
      createdAt: "2024-04-21T10:05:00.000Z",
      user: { id: DEV_USER_ID, name: "테스트 사용자", image: null },
    },
    {
      id: "c3",
      content: "전반 막판 압박 좋았음. 이 강도 90분 유지하면 승산 있다",
      timestampSec: 2580,
      createdAt: "2024-04-21T10:08:00.000Z",
      user: { id: DEV_USER_ID, name: "테스트 사용자", image: null },
    },
  ],
  "video-2": [
    {
      id: "c4",
      content: "세트피스 수비 위치 문제. 니어포스트 마킹 없음",
      timestampSec: 1860,
      createdAt: "2024-04-10T09:00:00.000Z",
      user: { id: DEV_USER_ID, name: "테스트 사용자", image: null },
    },
  ],
  "video-3": [
    {
      id: "c5",
      content: "골 장면 — 파이널서드 연계 완벽했음",
      timestampSec: 3120,
      createdAt: "2024-03-16T11:00:00.000Z",
      user: { id: DEV_USER_ID, name: "테스트 사용자", image: null },
    },
  ],
}

export function getVideo(videoId: string) {
  for (const vids of Object.values(mockVideos)) {
    const v = (vids as { id: string }[]).find((v) => v.id === videoId)
    if (v) return v
  }
  return null
}
