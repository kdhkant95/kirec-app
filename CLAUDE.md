@AGENTS.md

# Kirec — 축구 동호회 경기 영상 회고 서비스

## 제품 개요
축구 동호회가 경기 영상(유튜브)을 보며 특정 타임스탬프에 댓글·회고를 남기는 팀 전용 영상 리뷰 서비스.

## 기술 스택
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **DB**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Auth**: NextAuth v5 (Google OAuth)
- **Styling**: Tailwind CSS
- **Deploy**: Vercel

## 프로젝트 구조
```
src/
  app/          # Next.js App Router 페이지 및 API routes
  lib/
    auth.ts     # NextAuth 설정
    prisma.ts   # Prisma 클라이언트 싱글톤
  components/   # 공용 컴포넌트
prisma/
  schema.prisma # DB 스키마
```

## 데이터 모델
- **User** — 인증된 사용자
- **Team** — 동호회 팀 (inviteCode로 초대)
- **Membership** — User ↔ Team 관계 (OWNER/ADMIN/MEMBER)
- **Video** — 유튜브 링크 기반 경기 영상
- **Comment** — timestampSec 기반 타임스탬프 댓글
- **ShareLink** — 팀 외부 공유용 토큰 링크

## 개발 명령어
```bash
npm run dev          # 개발 서버
npx prisma migrate dev   # DB 마이그레이션
npx prisma studio        # DB GUI
npm run build            # 프로덕션 빌드
```

## MVP 범위 (Sprint 1)
1. Google 소셜 로그인
2. 팀 생성 / 초대코드로 가입
3. 유튜브 링크 영상 등록
4. 팀별 영상 목록 조회
5. 타임스탬프 단위 댓글 작성/조회
6. 댓글 클릭 → 해당 시점 이동
7. 공유 링크 생성 (팀 멤버만 열람)

## 제약사항
- MVP 범위 외 기능 추가 금지
- AI 기능, 영상 직접 업로드, 알림 기능 제외
- 모바일 웹 우선 설계
- 확장성보다 빠른 출시 우선

## 환경변수 설정 필요 항목
`.env` 파일에 아래 값을 채워야 합니다:
- `DATABASE_URL` — Supabase PostgreSQL 연결 문자열
- `AUTH_SECRET` — `npx auth secret` 으로 생성
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — Google Cloud Console에서 발급

## 디자인 시스템
- `DESIGN.md` 참고 — Runway 스타일 기반 (다크 cinematic 테마)
- 모든 UI 작업 전 DESIGN.md 먼저 읽을 것
- 핵심: 다크 배경 (#000000), 단일 폰트, 그림자 없음, 8px 기본 단위

## 배포
- Vercel에 GitHub 레포 연결 후 환경변수 등록
- `vercel.json` 참고
