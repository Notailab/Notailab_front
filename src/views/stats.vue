<template>
  <div class="min-h-screen flex flex-col bg-[#f6f8f5] text-slate-900">
    <SiteHeader
      active-tab="stats"
      :tabs="headerTabs"
      @logo-click="router.push('/home')"
      @tab-click="handleHeaderTabClick"
    >
      <template #right>
        <button class="rounded-full p-2 text-slate-500 transition hover:bg-slate-100" type="button">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <button class="rounded-full p-2 text-slate-500 transition hover:bg-slate-100" type="button">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <button class="h-9 w-9 overflow-hidden rounded-full bg-slate-200" type="button">
          <img v-if="userInfo.avatar" :src="userInfo.avatar" class="h-full w-full object-cover" />
          <div v-else class="flex h-full w-full items-center justify-center text-sm font-semibold text-slate-600">
            {{ userInfo.username?.charAt(0)?.toUpperCase() || 'U' }}
          </div>
        </button>
      </template>
    </SiteHeader>

    <div class="flex flex-1 overflow-hidden px-4 pb-4 pt-4 lg:px-6 lg:pb-6">
      <WorkspaceSidebar>
        <div class="mb-4">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Analytics</p>
          <p class="mt-1 text-sm text-slate-500">Workspace Overview</p>
        </div>

        <nav class="flex-1 space-y-2">
          <button class="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm text-slate-600 transition hover:bg-slate-50" @click="router.push('/home')">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span>All Projects</span>
          </button>
          <button class="flex w-full items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-3 text-left text-sm text-emerald-800">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12h4l3-9 4 18 3-9h4" />
            </svg>
            <span>Growth Log</span>
          </button>
          <button class="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm text-slate-600 transition hover:bg-slate-50" @click="router.push('/project/new')">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>New Project</span>
          </button>
        </nav>

        <div class="space-y-3 border-t border-slate-200 p-4">
          <button class="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-600 transition hover:text-red-500 hover:bg-slate-100" @click="handleLogout">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </WorkspaceSidebar>

      <main class="min-w-0 flex-1 overflow-auto pl-0 lg:pl-6">
        <div class="mx-auto max-w-6xl space-y-6">
          <section class="rounded-[32px] border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm lg:p-8">
            <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Workspace Archive</p>
                <h1 class="mt-2 text-3xl font-semibold tracking-tight text-slate-900 lg:text-4xl">Growth Performance</h1>
                <p class="mt-2 max-w-2xl text-sm text-slate-500">Detailed analytics of your research and learning trajectory for the last 30 days.</p>
              </div>
              <div class="flex flex-wrap items-center gap-2">
                <span class="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-medium text-emerald-700">Updated {{ formattedLastUpdated }}</span>
                <button class="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs text-slate-600 shadow-sm transition hover:bg-slate-50" @click="loadStats">Refresh</button>
              </div>
            </div>
          </section>

          <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div v-for="card in statCards" :key="card.label" class="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{{ card.label }}</p>
                  <div class="mt-2 text-3xl font-semibold text-slate-900">{{ card.value }}</div>
                </div>
                <div class="flex h-11 w-11 items-center justify-center rounded-2xl" :class="card.iconBg">
                  <span v-html="card.icon"></span>
                </div>
              </div>
              <div class="mt-4 flex items-center gap-2 text-xs" :class="card.trendClass">
                <span class="rounded-full px-2 py-1">{{ card.trend }}</span>
                <span class="text-slate-400">{{ card.caption }}</span>
              </div>
            </div>
          </section>

          <section class="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
            <div class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <h2 class="text-lg font-semibold text-slate-900">Monthly Activity Trends</h2>
                  <p class="mt-1 text-sm text-slate-500">Peak performance during the most recent months.</p>
                </div>
                <span class="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-500">Last 6 Months</span>
              </div>

              <div class="mt-6 overflow-hidden rounded-[24px] bg-slate-50 p-4">
                <svg viewBox="0 0 800 280" class="h-72 w-full">
                  <defs>
                    <linearGradient id="statsLineGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#16a34a" stop-opacity="0.25" />
                      <stop offset="100%" stop-color="#16a34a" stop-opacity="0.02" />
                    </linearGradient>
                  </defs>
                  <line x1="40" y1="40" x2="760" y2="40" stroke="#e2e8f0" stroke-dasharray="4 8" />
                  <line x1="40" y1="140" x2="760" y2="140" stroke="#e2e8f0" stroke-dasharray="4 8" />
                  <line x1="40" y1="240" x2="760" y2="240" stroke="#e2e8f0" />
                  <path :d="chartAreaPath" fill="url(#statsLineGradient)" />
                  <path :d="chartLinePath" fill="none" stroke="#16a34a" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                  <circle v-for="point in chartPoints" :key="point.label" :cx="point.x" :cy="point.y" r="4.5" fill="#16a34a" stroke="#fff" stroke-width="3" />
                  <g v-for="point in chartPoints" :key="point.label + '-label'">
                    <text :x="point.x" y="268" text-anchor="middle" fill="#94a3b8" font-size="12">{{ point.label }}</text>
                  </g>
                </svg>
              </div>
            </div>

            <div class="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <h2 class="text-lg font-semibold text-slate-900">Project Velocity</h2>
                <p class="mt-1 text-sm text-slate-500">Relative output by project.</p>
              </div>

              <div class="mt-6 space-y-4">
                <div v-for="item in velocityRows" :key="item.project_id" class="space-y-2">
                  <div class="flex items-center justify-between gap-3 text-sm">
                    <span class="truncate font-medium text-slate-700">{{ item.title }}</span>
                    <span class="text-slate-400">{{ item.progress }}%</span>
                  </div>
                  <div class="h-2 rounded-full bg-slate-100">
                    <div class="h-full rounded-full bg-slate-700" :style="{ width: `${Math.max(item.progress, item.file_count * 12)}%` }"></div>
                  </div>
                  <p class="text-xs text-slate-400">{{ item.file_count }} files · {{ item.progress }}% progress</p>
                </div>
              </div>

              <button class="mt-6 text-sm font-medium text-emerald-700 hover:underline" @click="router.push('/home')">View detailed breakdown →</button>
            </div>
          </section>

          <section class="rounded-[28px] border border-slate-200 bg-[#f2f0ff] p-6 shadow-sm">
            <div class="flex items-start gap-4">
              <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#655f86] text-white">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
              </div>
              <div class="min-w-0 flex-1">
                <h2 class="text-lg font-semibold text-slate-900">Curator Insights</h2>
                <p class="mt-2 max-w-4xl text-sm leading-7 text-slate-600">
                  {{ insightText }}
                </p>
                <div class="mt-4 flex flex-wrap gap-2">
                  <span v-for="badge in insightBadges" :key="badge" class="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">{{ badge }}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'
import WorkspaceSidebar from '@/components/WorkspaceSidebar.vue'
import { headerTabs, createHeaderTabClickHandler } from '@/composables/useHeaderNavigation'
import { useUserInfo } from '@/composables/useUserInfo'
import { getStatsOverview, type StatsOverview } from '@/api/stats'
import { toastError } from '@/utils/toast'

const router = useRouter()
const handleHeaderTabClick = createHeaderTabClickHandler(router)
const { userInfo, fetchUserInfo } = useUserInfo()
fetchUserInfo()

const stats = ref<StatsOverview>({
  total_projects: 0,
  total_files: 0,
  total_words: 0,
  active_projects: 0,
  ai_conversations: 0,
  recent_project_updates: 0,
  recent_file_updates: 0,
  monthly_activity: [],
  project_velocity: [],
  insights: [],
  last_updated: new Date().toISOString()
})
const loading = ref(false)

const loadStats = async () => {
  try {
    loading.value = true
    const res = await getStatsOverview()
    const payload = res as { code?: number; message?: string; data?: StatsOverview } & Partial<StatsOverview>
    const overview = payload.data || (typeof payload.total_projects === 'number' ? (payload as StatsOverview) : null)

    if ((payload.code === 200 || overview) && overview) {
      stats.value = overview
      return
    }
    toastError(payload.message || '获取统计信息失败')
  } catch (error) {
    console.error('获取统计信息失败：', error)
    toastError('网络异常，请稍后重试')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadStats()
})

const formattedLastUpdated = computed(() => {
  const date = new Date(stats.value.last_updated)
  if (Number.isNaN(date.getTime())) {
    return 'Just now'
  }
  return date.toLocaleString().replace(/\//g, '-')
})

const formatCompactNumber = (value: number) => {
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value)
}

const createIcon = (svg: string) => svg

const handleLogout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

const statCards = computed(() => [
  {
    label: 'Total Projects',
    value: formatCompactNumber(stats.value.total_projects),
    trend: `+${stats.value.recent_project_updates}`,
    caption: 'updated in the last 30 days',
    iconBg: 'bg-emerald-100 text-emerald-700',
    trendClass: 'text-emerald-700',
    icon: createIcon('<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 12h18M3 17h18" /></svg>')
  },
  {
    label: 'Total Files',
    value: formatCompactNumber(stats.value.total_files),
    trend: `+${stats.value.recent_file_updates}`,
    caption: 'file updates in the last 30 days',
    iconBg: 'bg-violet-100 text-violet-700',
    trendClass: 'text-violet-700',
    icon: createIcon('<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h10M7 12h10M7 17h6" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z" /></svg>')
  },
  {
    label: 'Word Count',
    value: formatCompactNumber(stats.value.total_words),
    trend: `${stats.value.active_projects} active`,
    caption: 'content density across projects',
    iconBg: 'bg-amber-100 text-amber-700',
    trendClass: 'text-amber-700',
    icon: createIcon('<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h10M4 18h7" /></svg>')
  },
  {
    label: 'AI Sessions',
    value: formatCompactNumber(stats.value.ai_conversations),
    trend: stats.value.ai_conversations > 0 ? 'Active' : 'Idle',
    caption: 'project-specific AI conversations',
    iconBg: 'bg-sky-100 text-sky-700',
    trendClass: stats.value.ai_conversations > 0 ? 'text-sky-700' : 'text-slate-500',
    icon: createIcon('<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v9a2 2 0 01-2 2h-4l-4 4z" /></svg>')
  }
])

const chartPoints = computed(() => {
  const values = stats.value.monthly_activity
  const width = 720
  const height = 180
  const margin = 20
  const safeValues = values.length > 0 ? values : [{ label: 'Now', value: 0 }]
  const maxValue = Math.max(1, ...safeValues.map((item) => item.value))
  const stepX = safeValues.length > 1 ? width / (safeValues.length - 1) : 0

  return safeValues.map((item, index) => {
    const x = margin + index * stepX
    const y = margin + (height - ((item.value / maxValue) * height))
    return { ...item, x, y }
  })
})

const chartLinePath = computed(() => {
  if (chartPoints.value.length === 0) {
    return ''
  }

  return chartPoints.value
    .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
    .join(' ')
})

const chartAreaPath = computed(() => {
  if (chartPoints.value.length === 0) {
    return ''
  }

  const baseY = 240
  const first = chartPoints.value[0]
  const last = chartPoints.value[chartPoints.value.length - 1]
  const line = chartLinePath.value
  return `${line} L ${last.x} ${baseY} L ${first.x} ${baseY} Z`
})

const velocityRows = computed(() => {
  return stats.value.project_velocity.slice(0, 4)
})

const insightText = computed(() => {
  if (stats.value.insights.length === 0) {
    return 'The dashboard will surface personalized patterns after you create projects and write more notes.'
  }
  return stats.value.insights.join(' ')
})

const insightBadges = computed(() => {
  const badges = [
    `${stats.value.total_projects} projects`,
    `${stats.value.total_files} files`,
    `${stats.value.ai_conversations} AI sessions`
  ]
  if (stats.value.active_projects > 0) {
    badges.push(`${stats.value.active_projects} active projects`)
  }
  return badges
})
</script>
