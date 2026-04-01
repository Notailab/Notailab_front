<template>
  <div class="min-h-screen flex flex-col bg-[#f6f8f5] text-slate-900">
    <SiteHeader
      active-tab="dashboard"
      :tabs="headerTabs"
      @logo-click="router.push('/home')"
      @tab-click="handleHeaderTabClick"
    >
      <template #right>
        <div class="relative hidden md:block">
          <input type="text" placeholder="Search project..." class="w-64 rounded-lg bg-slate-100 py-2 pl-10 pr-4 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-emerald-500">
          <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
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
        <button class="h-8 w-8 overflow-hidden rounded-full bg-slate-200" type="button">
          <img v-if="userInfo.avatar" :src="userInfo.avatar" class="h-full w-full object-cover">
          <div v-else class="flex h-full w-full items-center justify-center text-sm font-semibold text-slate-600">
            {{ userInfo.username?.charAt(0)?.toUpperCase() || 'U' }}
          </div>
        </button>
      </template>
    </SiteHeader>

    <div class="flex flex-1 overflow-hidden px-4 pb-4 pt-4 lg:px-6 lg:pb-6">
      <WorkspaceSidebar>
        <div class="mb-4">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Projects</p>
          <p class="mt-1 text-sm text-slate-500">Active Workspace</p>
        </div>

        <nav class="flex-1 space-y-2">
          <button class="flex w-full items-center gap-3 rounded-2xl bg-emerald-50 px-4 py-3 text-left text-sm text-emerald-800">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            <span>All Projects</span>
          </button>
          <button class="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm text-slate-600 transition hover:bg-slate-50">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span>AI Assistant</span>
          </button>
          <button class="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm text-slate-600 transition hover:bg-slate-50">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>Research Archive</span>
          </button>
          <button class="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm text-slate-600 transition hover:bg-slate-50">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span>Growth Log</span>
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

    <!-- 主内容 -->
    <div class="flex-1 flex flex-col">
      <main class="flex-1 overflow-auto px-4 py-4 lg:px-6 lg:py-6">
        <div class="mx-auto max-w-6xl">
          <div class="mb-8 flex items-start justify-between">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Workspace Archive</p>
              <h1 class="mt-2 text-3xl font-semibold tracking-tight text-slate-900">Projects</h1>
              <p class="mt-2 text-sm text-slate-500">Manage and curate your intellectual assets.</p>
            </div>
            <div class="flex gap-2 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
              <button
                type="button"
                class="flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition"
                :class="viewMode === 'cards' ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50'"
                @click="setViewMode('cards')"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Cards
              </button>
              <button
                type="button"
                class="flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition"
                :class="viewMode === 'list' ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50'"
                @click="setViewMode('list')"
              >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                List
              </button>
            </div>
          </div>

          <div v-if="viewMode === 'cards'" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="item in projectList"
              :key="item.project_id"
              class="cursor-pointer rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              @click="navigateToProject(item)"
            >
              <div class="mb-4 flex items-start justify-between">
                <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100">
                  <svg class="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h3 class="mb-2 text-lg font-semibold text-slate-900">{{ item.title }}</h3>
              <p class="mb-6 line-clamp-3 text-sm text-slate-500">{{ item.description || 'No description' }}</p>
              <div class="flex items-center justify-between">
                <span class="text-xs text-slate-400">UPDATED {{ formatDate(item.updated_at) }}</span>
                <div class="h-2 w-16 rounded-full bg-slate-100">
                  <div class="h-full rounded-full bg-emerald-600" :style="{ width: item.progress + '%' }"></div>
                </div>
              </div>
            </div>

            <div @click="goToNewProject" class="flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white p-6 text-center transition hover:border-emerald-300 hover:shadow-md">
              <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                <svg class="h-6 w-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 class="mb-1 font-medium text-slate-900">New Project</h3>
              <p class="text-sm text-slate-500">Start a new curation</p>
            </div>
          </div>

          <div v-else class="space-y-4">
            <div
              v-for="item in projectList"
              :key="item.project_id"
              class="cursor-pointer rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
              @click="navigateToProject(item)"
            >
              <div class="flex items-center gap-4">
                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100">
                  <svg class="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>

                <div class="min-w-0 flex-1">
                  <div class="flex items-start justify-between gap-4">
                    <div class="min-w-0">
                      <h3 class="truncate text-base font-semibold text-slate-900">{{ item.title }}</h3>
                      <p class="mt-1 line-clamp-2 text-sm text-slate-500">{{ item.description || 'No description' }}</p>
                    </div>

                    <span class="shrink-0 text-xs text-slate-400">UPDATED {{ formatDate(item.updated_at) }}</span>
                  </div>

                  <div class="mt-4 flex items-center gap-3">
                    <div class="h-2 flex-1 rounded-full bg-slate-100">
                      <div class="h-full rounded-full bg-emerald-600" :style="{ width: item.progress + '%' }"></div>
                    </div>
                    <span class="text-xs font-medium text-slate-500">{{ item.progress }}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div @click="goToNewProject" class="flex cursor-pointer items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white p-5 text-center transition hover:border-emerald-300 hover:shadow-md">
              <div class="flex items-center gap-3 text-slate-500">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                  <svg class="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div class="text-left">
                  <h3 class="font-medium text-slate-900">New Project</h3>
                  <p class="text-sm text-slate-500">Start a new curation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProjects } from '@/composables/useProject'
import { useUserInfo } from '@/composables/useUserInfo'
import { headerTabs, createHeaderTabClickHandler } from '@/composables/useHeaderNavigation'
import SiteHeader from '@/components/SiteHeader.vue'
import WorkspaceSidebar from '@/components/WorkspaceSidebar.vue'

const router = useRouter()
const viewMode = ref('cards')

// 项目列表（来自后端）
const { projectList } = useProjects()

// 用户信息（来自后端）
const { userInfo, fetchUserInfo } = useUserInfo()
fetchUserInfo()

const goToNewProject = () => router.push('/project/new')
const handleHeaderTabClick = createHeaderTabClickHandler(router)
const setViewMode = (mode) => {
  viewMode.value = mode
}

const navigateToProject = (item) => {
  router.push({
    name: 'project',
    params: { 
      username: userInfo.value.username,
      projecttitle: item.title,
      projectid: item.project_id
    }
  })
}

const handleLogout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

// 时间格式化
const formatDate = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString().replace(/\//g, '-')
}
</script>

<style scoped>
.line-clamp-3 {
  line-clamp: 3;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>