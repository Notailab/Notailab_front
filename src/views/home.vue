<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- 左侧边栏 -->
    <aside class="w-56 bg-white border-r border-gray-100 flex flex-col">
      <div class="p-4 border-b border-gray-100">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-emerald-700 rounded flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span class="font-semibold text-gray-900">Notailab</span>
        </div>
      </div>

      <div class="p-4 border-b border-gray-100">
        <div class="flex items-center gap-2 text-sm">
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <div>
            <p class="font-medium text-gray-900">Projects</p>
            <p class="text-xs text-gray-500">Active Workspace</p>
          </div>
        </div>
      </div>

      <nav class="flex-1 p-4 space-y-1">
        <button class="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 text-sm">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          All Projects
        </button>
        <button class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 text-sm">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          AI Assistant
        </button>
        <button class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 text-sm">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Research Archive
        </button>
        <button class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 text-sm">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          Growth Log
        </button>
      </nav>

      <div class="p-4 space-y-3 border-t border-gray-100">
        <button @click="goToNewProject" class="w-full flex items-center justify-center gap-2 bg-emerald-700 text-white py-2.5 rounded-lg hover:bg-emerald-800 transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Create Project
        </button>
        <button class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 text-sm">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Help Center
        </button>
        <button class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 text-sm">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </button>
      </div>
    </aside>

    <!-- 主内容 -->
    <div class="flex-1 flex flex-col">
      <header class="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between">
        <div class="flex items-center gap-6">
          <button class="text-emerald-700 font-medium text-sm border-b-2 border-emerald-700 pb-1">Dashboard</button>
          <button class="text-gray-500 font-medium text-sm hover:text-gray-700">Stats</button>
          <button class="text-gray-500 font-medium text-sm hover:text-gray-700">Settings</button>
        </div>
        <div class="flex items-center gap-4">
          <div class="relative">
            <input type="text" placeholder="Search project..." class="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm">
            <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button class="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button class="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <div class="w-8 h-8 rounded-full overflow-hidden">
            <img v-if="userInfo.avatar" :src="userInfo.avatar" class="w-full h-full object-cover">
            <img v-else src="https://picsum.photos/200/200" class="w-full h-full object-cover">
          </div>
        </div>
      </header>

      <main class="flex-1 p-8 overflow-auto">
        <div class="max-w-6xl mx-auto">
          <div class="flex justify-between items-start mb-8">
            <div>
              <h1 class="text-3xl font-bold text-gray-900 mb-2">Workspace Archive</h1>
              <p class="text-gray-600">Manage and curate your intellectual assets.</p>
            </div>
            <div class="flex gap-2 bg-white rounded-lg border border-gray-100 p-1">
              <button class="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded text-sm font-medium">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Cards
              </button>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- 后端项目卡片 -->
            <div 
              v-for="item in projectList" 
              :key="item.project_id" 
              class="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition cursor-pointer"
              @click="navigateToProject(item)"
            >
              <div class="flex justify-between items-start mb-4">
                <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <h3 class="font-semibold text-gray-900 mb-2">{{ item.title }}</h3>
              <p class="text-gray-500 text-sm mb-6 line-clamp-3">{{ item.description || 'No description' }}</p>
              <div class="flex justify-between items-center">
                <span class="text-xs text-gray-400">UPDATED {{ formatDate(item.updated_at) }}</span>
                <div class="w-16 h-2 bg-gray-100 rounded-full">
                  <div class="h-full bg-emerald-600 rounded-full" :style="{ width: item.progress + '%' }"></div>
                </div>
              </div>
            </div>

            <!-- 新建项目 -->
            <div @click="goToNewProject" class="bg-white rounded-xl p-6 border border-dashed border-gray-200 flex flex-col items-center justify-center text-center hover:border-emerald-300 transition cursor-pointer">
              <div class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 class="font-medium text-gray-900 mb-1">New Project</h3>
              <p class="text-gray-500 text-sm">Start a new curation</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useProjects } from '@/composables/useProject'
import { useUserInfo } from '@/composables/useUserInfo'

const router = useRouter()

// 项目列表（来自后端）
const { projectList } = useProjects()

// 用户信息（来自后端）
const { userInfo, fetchUserInfo } = useUserInfo()
fetchUserInfo()

// 跳转
const goToNewProject = () => router.push('/project/new')
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

// 时间格式化
const formatDate = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString().replace(/\//g, '-')
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>