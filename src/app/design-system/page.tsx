"use client"

import { useMemo, useState } from "react"
import { VarMark } from "@/components/branding/var-mark"
import {
  AppHomeIcon,
  AppMatchesIcon,
  AppReviewIcon,
  AppTeamIcon,
  ClipIcon,
  PlusIcon,
  ShareIcon,
} from "@/components/ui/icons/var-icons"
import { Avatar } from "@/components/ui/primitives/avatar"
import { Badge } from "@/components/ui/primitives/badge"
import { BottomNavigation } from "@/components/ui/primitives/bottom-navigation"
import { BottomSheet } from "@/components/ui/primitives/bottom-sheet"
import { Button } from "@/components/ui/primitives/button"
import { Card } from "@/components/ui/primitives/card"
import { Checkbox } from "@/components/ui/primitives/checkbox"
import { Chip } from "@/components/ui/primitives/chip"
import { DatePicker, type CalendarDay } from "@/components/ui/primitives/date-picker"
import { EmptyState } from "@/components/ui/primitives/empty-state"
import { FileUpload } from "@/components/ui/primitives/file-upload"
import { IconButton } from "@/components/ui/primitives/icon-button"
import { ListItem } from "@/components/ui/primitives/list-item"
import { ModalDialog, type ModalDialogVariant } from "@/components/ui/primitives/modal-dialog"
import { Radio } from "@/components/ui/primitives/radio"
import { SearchField } from "@/components/ui/primitives/search-field"
import { SegmentedControl } from "@/components/ui/primitives/segmented-control"
import { SelectDropdown, type SelectOption } from "@/components/ui/primitives/select-dropdown"
import { Skeleton } from "@/components/ui/primitives/skeleton"
import { Stepper } from "@/components/ui/primitives/stepper"
import { Tabs } from "@/components/ui/primitives/tabs"
import { TextField } from "@/components/ui/primitives/text-field"
import { Textarea } from "@/components/ui/primitives/textarea"
import { TimePicker, type TimeOption } from "@/components/ui/primitives/time-picker"
import { ToastSnackbar } from "@/components/ui/primitives/toast-snackbar"
import { Toggle } from "@/components/ui/primitives/toggle"
import { TopAppBar } from "@/components/ui/primitives/top-app-bar"
import { cx } from "@/lib/cx"

function Section({
  children,
  description,
  title,
}: {
  children: React.ReactNode
  description?: string
  title: string
}) {
  return (
    <section className="space-y-5 rounded-[28px] border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-surface)] p-6">
      <div className="space-y-2">
        <h2 className="type-heading-m text-[var(--kr-color-text-primary)]">{title}</h2>
        {description ? (
          <p className="type-body-m max-w-[820px] text-[var(--kr-color-text-secondary)]">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  )
}

function DemoStack({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cx("flex flex-col gap-4", className)}>{children}</div>
}

function DemoRow({
  children,
  className,
  wrap = false,
}: {
  children: React.ReactNode
  className?: string
  wrap?: boolean
}) {
  return (
    <div className={cx("flex items-center gap-3", wrap && "flex-wrap", className)}>
      {children}
    </div>
  )
}

function DemoSurface({
  children,
  className,
  title,
}: {
  children: React.ReactNode
  className?: string
  title?: string
}) {
  return (
    <div
      className={cx(
        "rounded-[24px] border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-canvas)] p-5",
        className,
      )}
    >
      {title ? (
        <p className="type-label-s mb-4 uppercase tracking-[0.08em] text-[var(--kr-color-text-muted)]">
          {title}
        </p>
      ) : null}
      {children}
    </div>
  )
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 20 20" fill="none">
      <path
        d="m7.5 5 5 5-5 5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
      />
    </svg>
  )
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="m6.75 10 2.2 2.2 4.3-4.35"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function SelectionRow({
  detail,
  initials,
  selected = false,
  title,
}: {
  detail: string
  initials: string
  selected?: boolean
  title: string
}) {
  return (
    <button
      className={cx(
        "flex h-[64px] w-full items-center gap-[12px] rounded-[16px] border bg-[var(--kr-color-bg-elevated)] px-[14px] py-[12px] text-left",
        selected
          ? "border-[var(--kr-color-border-strong)]"
          : "border-[var(--kr-color-border-subtle)]",
      )}
      type="button"
    >
      <Avatar content="initials" initials={initials} size="m" />
      <div className="min-w-0 flex-1">
        <p className="type-body-l truncate text-[var(--kr-color-text-primary)]">{title}</p>
        <p className="type-label-m truncate text-[var(--kr-color-text-secondary)]">{detail}</p>
      </div>
      {selected ? (
        <CheckCircleIcon className="size-5 shrink-0 text-[var(--kr-color-text-primary)]" />
      ) : (
        <ArrowRightIcon className="size-5 shrink-0 text-[var(--kr-color-text-primary)]" />
      )}
    </button>
  )
}

const COLORS = [
  { label: "canvas", var: "--kr-color-bg-canvas" },
  { label: "surface", var: "--kr-color-bg-surface" },
  { label: "elevated", var: "--kr-color-bg-elevated" },
  { label: "floating", var: "--kr-color-bg-floating" },
  { label: "selected", var: "--kr-color-bg-selected" },
  { label: "primary", var: "--kr-color-text-primary" },
  { label: "secondary", var: "--kr-color-text-secondary" },
  { label: "muted", var: "--kr-color-text-muted" },
  { label: "highlight", var: "--kr-color-accent-highlight" },
  { label: "violet", var: "--kr-color-accent-violet" },
  { label: "cyan", var: "--kr-color-accent-cyan" },
  { label: "orange", var: "--kr-color-accent-orange" },
  { label: "success", var: "--kr-color-state-success" },
  { label: "warning", var: "--kr-color-state-warning" },
  { label: "danger", var: "--kr-color-state-danger" },
] as const

const TAB_OPTIONS = ["Summary", "Video", "Comments", "Stats"] as const
const SEGMENT_OPTIONS = ["All", "Upcoming", "Need review"] as const

const TEAM_OPTIONS: SelectOption[] = [
  { avatarInitials: "FM", label: "FC Morning", value: "fc-morning" },
  { avatarInitials: "GP", label: "Green Park", value: "green-park" },
  { avatarInitials: "WM", label: "Weekend Mix", value: "weekend-mix" },
] as const

const TIME_OPTIONS: TimeOption[] = [
  { label: "18:00", value: "18:00" },
  { label: "18:30", value: "18:30" },
  { label: "19:00", value: "19:00" },
  { label: "19:30", value: "19:30" },
  { label: "20:00", value: "20:00" },
] as const

function buildCalendarWeeks(year: number, month: number, selectedDate?: string): CalendarDay[][] {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const cells: CalendarDay[] = []

  for (let i = firstDay - 1; i >= 0; i--) {
    const d = daysInPrevMonth - i
    cells.push({ id: `prev-${d}`, label: String(d), muted: true })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}.${String(month + 1).padStart(2, "0")}.${String(d).padStart(2, "0")}`
    cells.push({ id: String(d), label: String(d), selected: dateStr === selectedDate })
  }
  const remaining = 7 - (cells.length % 7)
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      cells.push({ id: `next-${d}`, label: String(d), muted: true })
    }
  }

  const weeks: CalendarDay[][] = []
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7))
  }
  return weeks
}

const MONTH_LABELS = ["January","February","March","April","May","June","July","August","September","October","November","December"]

export default function DesignSystemPage() {
  const [tab, setTab] = useState<(typeof TAB_OPTIONS)[number]>("Video")
  const [segment, setSegment] = useState<(typeof SEGMENT_OPTIONS)[number]>("Upcoming")
  const [chip, setChip] = useState("All")
  const [toggle1, setToggle1] = useState(false)
  const [toggle2, setToggle2] = useState(true)
  const [checkbox, setCheckbox] = useState(false)
  const [notifyMembers, setNotifyMembers] = useState(false)
  const [radioValue, setRadioValue] = useState<"home" | "away">("home")
  const [nav, setNav] = useState<"home" | "matches" | "review" | "team">("review")
  const [sheetOpen, setSheetOpen] = useState(false)
  const [modal, setModal] = useState<ModalDialogVariant | null>(null)
  const [textValue, setTextValue] = useState("강남 FC")
  const [textareaValue, setTextareaValue] = useState("전반 압박 장면과 세트피스 수비를 먼저 체크해주세요.")
  const [searchValue, setSearchValue] = useState("")
  const [teamOpen, setTeamOpen] = useState(false)
  const [teamValue, setTeamValue] = useState("fc-morning")
  const [teamIconOpen, setTeamIconOpen] = useState(false)
  const [teamIconValue, setTeamIconValue] = useState<string | undefined>()
  const [teamAvatarOpen, setTeamAvatarOpen] = useState(false)
  const [teamAvatarValue, setTeamAvatarValue] = useState("fc-morning")
  const [dateOpen, setDateOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | undefined>("2026.05.14")
  const [calYear, setCalYear] = useState(2026)
  const [calMonth, setCalMonth] = useState(4)
  const [timeOpen, setTimeOpen] = useState(false)
  const [selectedTime, setSelectedTime] = useState<string | undefined>("19:30")
  const [stepperValue, setStepperValue] = useState(2)

  const weeks = useMemo(
    () => buildCalendarWeeks(calYear, calMonth, selectedDate),
    [calYear, calMonth, selectedDate],
  )

  function handlePrevMonth() {
    if (calMonth === 0) { setCalYear(y => y - 1); setCalMonth(11) }
    else setCalMonth(m => m - 1)
  }
  function handleNextMonth() {
    if (calMonth === 11) { setCalYear(y => y + 1); setCalMonth(0) }
    else setCalMonth(m => m + 1)
  }

  return (
    <div className="min-h-dvh bg-[var(--kr-color-bg-canvas)] px-5 py-10">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-8">
        <header className="rounded-[32px] border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-surface)] p-7">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <VarMark />
                <div>
                  <p className="type-display-xl leading-none text-[var(--kr-color-text-primary)]">VAR</p>
                  <p className="type-label-s mt-1 text-[var(--kr-color-text-muted)]">
                    UI playground route: <span className="text-[var(--kr-color-text-secondary)]">/design-system</span>
                  </p>
                </div>
              </div>
              <p className="type-body-l max-w-[760px] text-[var(--kr-color-text-secondary)]">
                Primitive를 실제로 눌러보고 상태를 검증할 수 있는 테스트 페이지입니다. 로그인, 팀, 영상 화면을
                만들기 전에 여기서 컴포넌트의 시각/인터랙션을 먼저 맞추면 됩니다.
              </p>
            </div>

            <Card className="max-w-[420px]" surface="elevated">
              <p className="type-label-s uppercase tracking-[0.08em] text-[var(--kr-color-text-muted)]">
                Icon Strategy
              </p>
              <p className="type-body-m text-[var(--kr-color-text-secondary)]">
                디자인은 Vuesax 계열을 쓰고 있는데, 구현에서 임의로 다른 아이콘을 섞으면 화면마다 언어가 달라집니다.
                지금은 <span className="text-[var(--kr-color-text-primary)]">`src/components/ui/icons/var-icons.tsx`</span>
                를 앱 아이콘 소스 오브 트루스로 두고, 나중에 Figma SVG를 확정하면 그 파일만 교체하는 구조로 잡았습니다.
              </p>
            </Card>
          </div>
        </header>

        <Section
          title="Foundations"
          description="컬러, 타이포, 아이콘처럼 전체 UI가 공유하는 기준값을 확인하는 영역입니다."
        >
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <DemoSurface title="Colors">
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 xl:grid-cols-8">
                {COLORS.map(({ label, var: colorVar }) => (
                  <div key={colorVar} className="space-y-2">
                    <div
                      className="h-14 rounded-[16px] border border-[var(--kr-color-border-subtle)]"
                      style={{ backgroundColor: `var(${colorVar})` }}
                    />
                    <p className="type-label-s text-[var(--kr-color-text-muted)]">{label}</p>
                  </div>
                ))}
              </div>
            </DemoSurface>

            <DemoSurface title="Icons">
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: "Home", icon: <AppHomeIcon active className="size-6" /> },
                  { label: "Matches", icon: <AppMatchesIcon active className="size-6" /> },
                  { label: "Review", icon: <AppReviewIcon active className="size-6" /> },
                  { label: "Team", icon: <AppTeamIcon active className="size-6" /> },
                ].map((item) => (
                  <div
                    className="flex flex-col items-center gap-2 rounded-[18px] border border-[var(--kr-color-border-subtle)] bg-[var(--kr-color-bg-elevated)] px-3 py-4"
                    key={item.label}
                  >
                    <span className="text-[var(--kr-color-text-primary)]">{item.icon}</span>
                    <span className="type-label-s text-[var(--kr-color-text-secondary)]">{item.label}</span>
                  </div>
                ))}
              </div>
            </DemoSurface>

            <DemoSurface title="Typography" className="lg:col-span-2">
              <div className="grid gap-4 xl:grid-cols-2">
                <p className="type-display-xl text-[var(--kr-color-text-primary)]">Display XL</p>
                <p className="type-heading-l text-[var(--kr-color-text-primary)]">Heading L</p>
                <p className="type-heading-m text-[var(--kr-color-text-primary)]">Heading M</p>
                <p className="type-title-m text-[var(--kr-color-text-primary)]">Title M</p>
                <p className="type-body-l text-[var(--kr-color-text-primary)]">Body L — 경기 영상 회고 서비스</p>
                <p className="type-body-m text-[var(--kr-color-text-secondary)]">Body M — 팀과 함께 경기 영상을 보며 회고를 남기세요.</p>
                <p className="type-label-m text-[var(--kr-color-text-muted)]">Label M — 타임스탬프 단위 메타 정보</p>
                <p className="type-label-s text-[var(--kr-color-text-muted)]">Label S — 12px + tracking 0.2</p>
              </div>
            </DemoSurface>
          </div>
        </Section>

        <Section
          title="Actions"
          description="버튼, 아이콘 버튼, 탭, 세그먼트 같이 액션을 유도하는 컴포넌트들입니다."
        >
          <div className="grid gap-6 xl:grid-cols-2">
            <DemoSurface title="Buttons">
              <DemoStack>
                <DemoRow wrap>
                  <Button size="l" tone="primary">Primary L</Button>
                  <Button size="l" tone="secondary">Secondary L</Button>
                  <Button size="l" tone="primary" disabled>Disabled</Button>
                </DemoRow>
                <DemoRow wrap>
                  <Button size="m" tone="primary">Primary M</Button>
                  <Button size="m" tone="secondary">Secondary M</Button>
                  <Button size="m" tone="secondary" disabled>Disabled</Button>
                </DemoRow>
                <DemoRow wrap>
                  <IconButton aria-label="공유" size="m" tone="secondary">
                    <ShareIcon className="size-5" />
                  </IconButton>
                  <IconButton aria-label="추가" size="l" tone="primary">
                    <PlusIcon className="size-5" />
                  </IconButton>
                  <IconButton aria-label="공유 비활성" disabled size="m" tone="secondary">
                    <ShareIcon className="size-5" />
                  </IconButton>
                </DemoRow>
              </DemoStack>
            </DemoSurface>

            <DemoSurface title="Tabs / Segments">
              <DemoStack>
                <Tabs options={TAB_OPTIONS} value={tab} onValueChange={setTab} />
                <SegmentedControl options={SEGMENT_OPTIONS} value={segment} onValueChange={setSegment} />
                <DemoRow wrap>
                  {["All", "Attack", "Defense", "Set piece"].map((label) => (
                    <Chip key={label} onClick={() => setChip(label)} selected={chip === label}>
                      {label}
                    </Chip>
                  ))}
                  <Chip tone="brand">Brand</Chip>
                  <Chip tone="highlight" selected>Highlight</Chip>
                </DemoRow>
              </DemoStack>
            </DemoSurface>
          </div>
        </Section>

        <Section
          title="Inputs"
          description="필드, 선택기, 업로드, 토글 계열을 실제 상태값으로 눌러볼 수 있는 영역입니다."
        >
          <div className="grid gap-6 xl:grid-cols-2">
            <DemoSurface title="Text / Search">
              <DemoStack>
                <TextField
                  label="Team name"
                  onChange={(event) => setTextValue(event.target.value)}
                  placeholder="예) 강남 FC"
                  value={textValue}
                />
                <TextField
                  helperText="올바른 YouTube URL을 입력해주세요"
                  label="Video URL"
                  placeholder="https://youtube.com/..."
                  state="error"
                />
                <Textarea
                  label="Notes"
                  onChange={(event) => setTextareaValue(event.target.value)}
                  placeholder="경기 메모를 입력하세요"
                  value={textareaValue}
                />
                <SearchField
                  onChange={(event) => setSearchValue(event.target.value)}
                  onClear={() => setSearchValue("")}
                  placeholder="Search team"
                  value={searchValue}
                />
              </DemoStack>
            </DemoSurface>

            <DemoSurface title="Pickers / Select">
              <DemoStack>
                <SelectDropdown
                  label="Select team"
                  onOpenChange={setTeamOpen}
                  onValueChange={setTeamValue}
                  open={teamOpen}
                  options={TEAM_OPTIONS}
                  value={teamValue}
                />
                <SelectDropdown
                  label="Select team · icon"
                  leading="icon"
                  onOpenChange={setTeamIconOpen}
                  onValueChange={setTeamIconValue}
                  open={teamIconOpen}
                  options={TEAM_OPTIONS}
                  value={teamIconValue}
                />
                <SelectDropdown
                  label="Select team · avatar"
                  leading="avatar"
                  onOpenChange={setTeamAvatarOpen}
                  onValueChange={setTeamAvatarValue}
                  open={teamAvatarOpen}
                  options={TEAM_OPTIONS}
                  value={teamAvatarValue}
                />
                <DatePicker
                  helperText="날짜 입력이나 선택에 사용됩니다"
                  label="Match date"
                  monthLabel={`${MONTH_LABELS[calMonth]} ${calYear}`}
                  onNextMonth={handleNextMonth}
                  onOpenChange={setDateOpen}
                  onPrevMonth={handlePrevMonth}
                  onSelectDay={(day) => {
                    if (day.muted) return
                    const d = day.label.padStart(2, "0")
                    const m = String(calMonth + 1).padStart(2, "0")
                    setSelectedDate(`${calYear}.${m}.${d}`)
                    setDateOpen(false)
                  }}
                  open={dateOpen}
                  value={selectedDate}
                  weeks={weeks}
                />
                <TimePicker
                  helperText="시간 입력이나 선택에 사용됩니다"
                  label="Kickoff time"
                  onOpenChange={setTimeOpen}
                  onValueChange={setSelectedTime}
                  open={timeOpen}
                  options={TIME_OPTIONS}
                  value={selectedTime}
                />
              </DemoStack>
            </DemoSurface>

            <DemoSurface title="Binary choice">
              <DemoStack>
                <DemoRow wrap>
                  <Checkbox checked={checkbox} onChange={(event) => setCheckbox(event.target.checked)} />
                  <Checkbox checked />
                  <Checkbox indeterminate />
                  <Checkbox disabled />
                </DemoRow>
                <DemoRow wrap>
                  <Radio checked={radioValue === "home"} name="venue" onChange={() => setRadioValue("home")} />
                  <span className="type-body-m text-[var(--kr-color-text-secondary)]">Home side</span>
                  <Radio checked={radioValue === "away"} name="venue" onChange={() => setRadioValue("away")} />
                  <span className="type-body-m text-[var(--kr-color-text-secondary)]">Away side</span>
                  <Radio disabled />
                </DemoRow>
                <DemoRow wrap>
                  <Toggle checked={toggle1} onChange={(event) => setToggle1(event.target.checked)} />
                  <Toggle checked={toggle2} onChange={(event) => setToggle2(event.target.checked)} />
                  <Toggle checked disabled />
                  <Toggle disabled />
                </DemoRow>
              </DemoStack>
            </DemoSurface>

            <DemoSurface title="Upload / Stepper">
              <DemoStack>
                <FileUpload />
                <FileUpload state="uploading" />
                <FileUpload state="done" />
                <FileUpload state="error" />
                <Stepper
                  max={5}
                  min={1}
                  onDecrement={() => setStepperValue((value) => Math.max(1, value - 1))}
                  onIncrement={() => setStepperValue((value) => Math.min(5, value + 1))}
                  value={stepperValue}
                />
              </DemoStack>
            </DemoSurface>
          </div>
        </Section>

        <Section
          title="Content"
          description="카드, 리스트, 배지, 빈 상태처럼 실제 제품 화면을 채우는 블록들입니다."
        >
          <div className="grid gap-6 xl:grid-cols-2">
            <DemoSurface title="Cards / Badges / Avatars">
              <DemoStack>
                <DemoRow wrap>
                  <Badge tone="neutral">neutral</Badge>
                  <Badge tone="success">success</Badge>
                  <Badge tone="warning">warning</Badge>
                  <Badge tone="danger">danger</Badge>
                  <Badge style="solid" tone="success">solid</Badge>
                </DemoRow>
                <DemoRow wrap>
                  <Avatar content="placeholder" size="s" />
                  <Avatar content="placeholder" size="m" />
                  <Avatar content="placeholder" size="l" />
                  <Avatar content="initials" initials="KM" size="s" />
                  <Avatar content="initials" initials="JY" size="m" />
                  <Avatar content="initials" initials="FC" size="l" />
                </DemoRow>
                <Card surface="base">
                  <p className="type-label-m text-[var(--kr-color-text-secondary)]">Surface · Base</p>
                  <p className="type-body-l text-[var(--kr-color-text-primary)]">기본 카드</p>
                </Card>
                <Card surface="elevated">
                  <p className="type-label-m text-[var(--kr-color-text-secondary)]">Surface · Elevated</p>
                  <p className="type-body-l text-[var(--kr-color-text-primary)]">그림자 있는 카드</p>
                </Card>
                <Card density="compact" surface="interactive">
                  <p className="type-label-m text-[var(--kr-color-text-secondary)]">Surface · Interactive · Compact</p>
                  <p className="type-body-l text-[var(--kr-color-text-primary)]">클릭 가능한 카드</p>
                </Card>
              </DemoStack>
            </DemoSurface>

            <DemoSurface title="List / Empty state">
              <DemoStack>
                <ListItem
                  icon={<ClipIcon className="size-[18px]" />}
                  iconTone="violet"
                  meta="12분 전"
                  supportingText="2026. 05. 03 · 풋살파크 강남"
                  title="강남 FC vs 서초 유나이티드"
                  variant="supporting"
                />
                <ListItem
                  icon={<ClipIcon className="size-[18px]" />}
                  iconTone="orange"
                  metric="3"
                  selected
                  supportingText="골 2 · 어시스트 1"
                  tagLabel="공격"
                  title="박민준"
                  variant="metric"
                />
                <EmptyState
                  actionLabel="영상 등록"
                  description="첫 번째 경기 영상을 등록해보세요"
                  onAction={() => {}}
                  size="inline"
                  title="등록된 영상이 없어요"
                />
              </DemoStack>
            </DemoSurface>
          </div>
        </Section>

        <Section
          title="Navigation"
          description="앱 바와 바텀 네비게이션, 그리고 아이콘 일관성을 보는 영역입니다."
        >
          <div className="grid gap-6 xl:grid-cols-2">
            <DemoSurface title="Top app bar">
              <DemoStack>
                <TopAppBar title="내 팀" />
                <TopAppBar
                  actions={[
                    { icon: <ShareIcon className="size-5" />, label: "공유", onClick: () => {} },
                    { icon: <PlusIcon className="size-5" />, label: "추가", onClick: () => {} },
                  ]}
                  onBackClick={() => {}}
                  showBackButton
                  title="경기 영상"
                />
              </DemoStack>
            </DemoSurface>

            <DemoSurface title="Bottom navigation">
              <DemoStack>
                <BottomNavigation active={nav} onValueChange={setNav} />
                <div className="grid gap-3 sm:grid-cols-2">
                  <BottomNavigation active="home" />
                  <BottomNavigation active="matches" />
                  <BottomNavigation active="review" />
                  <BottomNavigation active="team" />
                </div>
              </DemoStack>
            </DemoSurface>
          </div>
        </Section>

        <Section
          title="Feedback / Loading"
          description="토스트와 스켈레톤처럼 사용자에게 상태를 알려주는 컴포넌트입니다."
        >
          <div className="grid gap-6 xl:grid-cols-2">
            <DemoSurface title="Toast / Snackbar">
              <DemoStack>
                <ToastSnackbar
                  description="The key moment was added to match review."
                  kind="toast"
                  onClose={() => {}}
                  title="Clip saved"
                  tone="info"
                />
                <ToastSnackbar
                  description="Teammates can join from the latest link."
                  kind="toast"
                  onClose={() => {}}
                  title="Invite sent"
                  tone="success"
                />
                <ToastSnackbar
                  description="Connection is weak. We will retry automatically."
                  kind="toast"
                  onClose={() => {}}
                  title="Upload paused"
                  tone="warning"
                />
                <ToastSnackbar
                  description="Undo if this was removed by mistake."
                  kind="snackbar"
                  onAction={() => {}}
                  onClose={() => {}}
                  actionLabel="Undo"
                  title="Comment removed"
                />
              </DemoStack>
            </DemoSurface>

            <DemoSurface title="Skeleton">
              <DemoStack>
                <Skeleton variant="line" />
                <Skeleton variant="listItem" />
                <Skeleton variant="matchCard" />
                <Skeleton variant="detail" />
              </DemoStack>
            </DemoSurface>
          </div>
        </Section>

        <Section
          title="Overlays"
          description="모달과 바텀 시트는 버튼으로 열어 실제 오버레이 동작을 확인할 수 있게 했습니다."
        >
          <div className="grid gap-6 xl:grid-cols-2">
            <DemoSurface title="Modal triggers">
              <DemoRow wrap>
                <Button onClick={() => setModal("info")} size="m" tone="secondary">Info modal</Button>
                <Button onClick={() => setModal("danger")} size="m" tone="secondary">Danger modal</Button>
                <Button onClick={() => setModal("form")} size="m" tone="primary">Form modal</Button>
              </DemoRow>
            </DemoSurface>

            <DemoSurface title="Bottom sheet trigger">
              <Button onClick={() => setSheetOpen(true)} size="m" tone="secondary">
                Select team sheet
              </Button>
            </DemoSurface>
          </div>
        </Section>
      </div>

      <BottomSheet
        description="Choose which team this clip belongs to before saving."
        onClose={() => setSheetOpen(false)}
        onPrimaryAction={() => setSheetOpen(false)}
        onSecondaryAction={() => setSheetOpen(false)}
        open={sheetOpen}
        primaryActionLabel="Confirm"
        secondaryActionLabel="Cancel"
        title="Select team"
        variant="selection"
      >
        <SearchField placeholder="Search team" />
        <SelectionRow detail="12 members · Current season" initials="SF" selected title="Sunday FC" />
        <SelectionRow detail="8 members · Indoor squad" initials="WR" title="West Rovers" />
        <SelectionRow detail="10 members · Friendly league" initials="NM" title="Night Motion" />
      </BottomSheet>

      <ModalDialog
        description="Share it with teammates so they can join the match room before kickoff."
        onClose={() => setModal(null)}
        onPrimaryAction={() => setModal(null)}
        open={modal === "info"}
        primaryActionLabel="Done"
        title="Invite link ready"
        variant="info"
      />

      <ModalDialog
        description="Uploaded clips, comments, and saved insights will be permanently removed."
        eyebrow="Destructive action"
        onClose={() => setModal(null)}
        onPrimaryAction={() => setModal(null)}
        onSecondaryAction={() => setModal(null)}
        open={modal === "danger"}
        primaryActionLabel="Delete"
        secondaryActionLabel="Cancel"
        title="Delete this match?"
        variant="danger"
      />

      <ModalDialog
        description="Set the schedule, then attach the first clip before inviting the team."
        onClose={() => setModal(null)}
        onPrimaryAction={() => setModal(null)}
        onSecondaryAction={() => setModal(null)}
        open={modal === "form"}
        primaryActionLabel="Create"
        secondaryActionLabel="Cancel"
        title="Create match"
        variant="form"
      >
        <TextField label="Match title" placeholder="Enter match title" helperText="Shown on the match details screen" />
        <DatePicker label="Match date" placeholder="Select date" helperText="Used for entering or selecting a date" />
        <TimePicker label="Kickoff time" placeholder="Select time" helperText="Used for entering or selecting a time" />
        <FileUpload />
        <DemoRow>
          <Checkbox checked={notifyMembers} onChange={(event) => setNotifyMembers(event.target.checked)} />
          <span className="type-body-m text-[var(--kr-color-text-secondary)]">Notify team members</span>
        </DemoRow>
      </ModalDialog>
    </div>
  )
}
