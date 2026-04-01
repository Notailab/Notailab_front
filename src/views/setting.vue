<template>
  <div class="min-h-screen flex flex-col bg-[#f6f8f5] text-slate-900">
    <SiteHeader
      active-tab="settings"
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
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Settings</p>
          <p class="mt-1 text-sm text-slate-500">Account Workspace</p>
        </div>

        <nav class="flex-1 space-y-2">
          <button
            v-for="item in sidebarItems"
            :key="item.key"
            class="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm transition"
            :class="activeTab === item.key ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'"
            @click="activeTab = item.key"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path v-if="item.key === 'profile'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A9 9 0 1118.879 6.196 9 9 0 015.12 17.804z" />
              <path v-else-if="item.key === 'security'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4 9 5.567 9 7.5 10.343 11 12 11zm0 0v9m-4-5h8" />
              <path v-else-if="item.key === 'ai'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17h6M12 3v3m6.364 1.636l-2.12 2.12M21 12h-3m-1.636 6.364l-2.12-2.12M12 21v-3M5.636 18.364l2.12-2.12M6 12H3m1.636-6.364l2.12 2.12" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span>{{ item.label }}</span>
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
        <div class="mx-auto max-w-6xl">
          <div class="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 class="text-3xl font-semibold tracking-tight text-slate-900">User Settings</h1>
            <p class="mt-2 text-sm text-slate-500">Manage your digital presence and AI preferences.</p>
          </div>
          <div class="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs text-slate-500 shadow-sm">
            Last updated: {{ lastUpdatedLabel }}
          </div>
          </div>

          <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <section class="space-y-6">
            <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div class="mb-5 flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A9 9 0 1118.879 6.196 9 9 0 015.12 17.804z" />
                  </svg>
                </div>
                <div>
                  <h2 class="text-lg font-semibold text-slate-900">Personal Profile</h2>
                  <p class="text-sm text-slate-500">Basic account information and display preferences.</p>
                </div>
              </div>

              <form class="space-y-5" @submit.prevent="saveBaseInfo">
                <div class="grid gap-4 md:grid-cols-2">
                  <div>
                    <label class="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Full Name</label>
                    <input v-model="formData.username" type="text" class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white" />
                  </div>
                  <div>
                    <label class="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Email Address</label>
                    <input v-model="formData.email" type="email" class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white" />
                  </div>
                </div>

                <div>
                  <label class="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Bio</label>
                  <textarea v-model="formData.bio" rows="4" class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white" />
                </div>

                <div class="flex justify-end">
                  <button type="submit" class="rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-800">Save Changes</button>
                </div>
              </form>
            </div>

            <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div class="mb-5 flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 11V7a3 3 0 016 0v4m-3 3v3m-7 4h14a2 2 0 002-2v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 class="text-lg font-semibold text-slate-900">AI Configuration</h2>
                  <p class="text-sm text-slate-500">Store your preferred model, endpoint and hyperparameters.</p>
                </div>
              </div>

              <div class="grid gap-5">
                <div class="grid gap-4 md:grid-cols-2">
                  <div>
                    <label class="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Provider</label>
                    <input v-model="aiSetting.llm_provider" type="text" class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white" placeholder="openai / modelscope / deepseek" />
                  </div>
                  <div>
                    <label class="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Primary Model</label>
                    <input v-model="aiSetting.llm_model" type="text" class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white" placeholder="gpt-4o-mini" />
                  </div>
                </div>

                <div>
                  <label class="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Base URL</label>
                  <input v-model="aiSetting.llm_base_url" type="text" class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white" placeholder="https://api.openai.com/v1" />
                </div>

                <div>
                  <label class="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">API Key</label>
                  <input v-model="aiSetting.llm_api_key" type="password" class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white" placeholder="••••••••••••••••" />
                  <p class="mt-2 text-xs text-slate-400">留空时会回退到后端环境变量。</p>
                </div>

                <div class="grid gap-4 md:grid-cols-2">
                  <div>
                    <label class="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Temperature</label>
                    <input v-model.number="aiSetting.temperature" type="number" min="0" max="2" step="0.1" class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white" />
                  </div>
                  <div>
                    <label class="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Max Tokens</label>
                    <input v-model="aiSetting.max_tokens" type="number" min="1" class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white" placeholder="Optional" />
                  </div>
                </div>

                <div class="flex justify-end gap-3">
                  <button type="button" class="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50" @click="loadAISetting">Reset</button>
                  <button type="button" class="rounded-2xl bg-emerald-700 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-emerald-800" @click="saveAISetting">Save Changes</button>
                </div>
              </div>
            </div>

              <div class="grid gap-6 md:grid-cols-2">
              <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 class="text-lg font-semibold text-slate-900">Security</h2>
                <p class="mt-2 text-sm text-slate-500">Manage password and session related controls.</p>
                <div class="mt-4 space-y-3">
                  <button class="flex w-full items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <span>Change Password</span><span class="text-slate-400">›</span>
                  </button>
                  <button class="flex w-full items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                    <span>Session Logs</span><span class="text-slate-400">›</span>
                  </button>
                </div>
              </div>

              <div class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 class="text-lg font-semibold text-slate-900">About Notailab</h2>
                <p class="mt-2 text-sm text-slate-500">A lightweight Markdown workspace with AI assistance.</p>
                <div class="mt-4 rounded-2xl bg-[#ecf6ea] p-4 text-sm text-slate-700">
                  <div class="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700">System Health</div>
                  <div class="mt-2 text-base font-medium">Ready for deployment</div>
                  <p class="mt-1 text-sm text-slate-600">Your account settings are ready for personalized AI workflows.</p>
                </div>
              </div>
            </div>
            </section>

            <aside class="space-y-6 xl:sticky xl:top-24 xl:self-start">
            <div class="rounded-3xl border border-slate-200 bg-[#edf4ea] p-6 shadow-sm">
              <div class="flex items-center justify-center">
                <div class="flex h-28 w-28 items-center justify-center rounded-full border-8 border-emerald-100 bg-emerald-700 text-white">
                  <div class="text-center">
                    <div class="text-3xl font-semibold">84%</div>
                    <div class="text-xs uppercase tracking-[0.2em] text-emerald-100">Profile Bloom</div>
                  </div>
                </div>
              </div>
              <p class="mt-6 text-center text-sm text-slate-700">Complete your security setup to maximize account safety.</p>
            </div>

            <div class="overflow-hidden rounded-3xl border border-slate-200 bg-[linear-gradient(135deg,#2f7d32,#7bc67d)] p-5 text-white shadow-sm">
              <div class="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">Internal Engine</div>
              <div class="mt-2 text-xl font-semibold">Latency: 24ms (Optimal)</div>
              <p class="mt-2 text-sm text-white/85">Use this account with a tuned model to keep response quality and cost under control.</p>
            </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getUserInfo, getUserSettings, updateUserSettings } from '@/api/user'
import { toastError, toastSuccess } from '@/utils/toast'
import { headerTabs, createHeaderTabClickHandler } from '@/composables/useHeaderNavigation'
import SiteHeader from '@/components/SiteHeader.vue'
import WorkspaceSidebar from '@/components/WorkspaceSidebar.vue'

const router = useRouter()
const activeTab = ref('profile')
const lastUpdatedLabel = ref('Today')

const userInfo = ref({
  username: 'User',
  avatar: '',
  email: '',
  create_time: ''
})

const formData = ref({
  username: '',
  email: '',
  bio: '',
  phone: ''
})

const aiSetting = ref({
  llm_provider: '',
  llm_base_url: '',
  llm_api_key: '',
  llm_model: '',
  temperature: 0.7,
  max_tokens: ''
})

const sidebarItems = [
  { key: 'profile', label: 'Profile' },
  { key: 'security', label: 'Security' },
  { key: 'ai', label: 'AI Assistant' },
  { key: 'editor', label: 'Editor' }
]

const handleHeaderTabClick = createHeaderTabClickHandler(router)

const fetchProfile = async () => {
  try {
    const res = await getUserInfo()
    if (res.code === 200) {
      userInfo.value = {
        username: res.username || 'User',
        avatar: res.avatar || '',
        email: res.email || '',
        create_time: res.create_time || ''
      }
      formData.value.username = res.username || ''
      formData.value.email = res.email || ''
    }
  } catch (err) {
    toastError('获取用户信息失败')
  }
}

const loadAISetting = async () => {
  try {
    const res = await getUserSettings()
    if (res.code === 200 && res.data) {
      aiSetting.value = {
        llm_provider: res.data.llm_provider || '',
        llm_base_url: res.data.llm_base_url || '',
        llm_api_key: res.data.llm_api_key || '',
        llm_model: res.data.llm_model || '',
        temperature: typeof res.data.temperature === 'number' ? res.data.temperature : 0.7,
        max_tokens: res.data.max_tokens ?? ''
      }
    }
  } catch (err) {
    toastError('获取 AI 设置失败')
  }
}

const saveBaseInfo = () => {
  toastSuccess('Basic profile saved')
  userInfo.value.username = formData.value.username || userInfo.value.username
}

const saveAISetting = async () => {
  try {
    const payload = {
      llm_provider: aiSetting.value.llm_provider,
      llm_base_url: aiSetting.value.llm_base_url,
      llm_api_key: aiSetting.value.llm_api_key,
      llm_model: aiSetting.value.llm_model,
      temperature: Number(aiSetting.value.temperature) || 0.7,
      max_tokens: aiSetting.value.max_tokens === '' || aiSetting.value.max_tokens === null ? null : Number(aiSetting.value.max_tokens)
    }

    const res = await updateUserSettings(payload)
    if (res.code === 200) {
      toastSuccess('AI 设置保存成功')
      lastUpdatedLabel.value = new Date().toLocaleString()
      return
    }

    toastError(res.message || '保存 AI 设置失败')
  } catch (err) {
    toastError('保存 AI 设置失败')
  }
}

const handleLogout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

onMounted(async () => {
  await fetchProfile()
  await loadAISetting()
})
</script>