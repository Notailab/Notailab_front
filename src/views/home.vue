<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">

    <!-- 顶部标题栏 -->
    <header class="bg-white shadow sticky top-0 z-30">
      <div class="mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-14">
          <div class="flex items-center">
            <svg class="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            <span class="ml-2 text-xl font-semibold text-gray-800">Notailab</span>
          </div>

          <!-- 右侧导航 -->
          <div class="flex items-center space-x-4">
            <div class="flex items-center">
                <img 
                    v-if="userInfo.avatar" 
                    :src="userInfo.avatar" 
                    alt="用户头像"
                    class="avatar w-8 h-8"
                />
              <span class="ml-2 text-sm font-medium text-gray-700">{{ userInfo.username }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- 主体内容区 - 优化间距和响应式 -->
    <div class="flex flex-1 overflow-hidden">
      <!-- 左侧侧边栏 - 优化样式和动效 -->
      <aside class="w-72 bg-white border-r border-slate-200 overflow-y-auto hidden lg:block transition-all duration-300">
        <div class="p-5">
          <!-- 新建项目按钮 - 优化视觉 -->
          <button
            @click="goToNewProject"
            class="w-full text-sm px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 duration-200 hover:shadow-md flex items-center justify-center gap-2 mb-5 transform hover:scale-[1.01] active:scale-[0.99]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            新建项目
          </button>

          <!-- 搜索框 - 优化样式 -->
          <div class="mb-4">
            <div class="relative">
              <svg class="absolute left-2.5 top-2.5 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Find a project..."
                class="w-full text-sm pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              />
            </div>
          </div>

          <!-- 最近项目列表 - 优化交互 -->
          <div class="space-y-1">
            <div
              v-for="pro in projects"
              :key="pro.id"
              class="flex items-center gap-2 text-sm text-gray-700 hover:bg-indigo-50 cursor-pointer py-2 px-3 rounded-md transition-colors"
            >
              <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span class="truncate">{{ pro.title }}</span>
            </div>
          </div>

        </div>
      </aside>

      <!-- 中间主内容区 - 优化视觉层次 -->
      <main class="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:px-8 lg:py-6">
        <div class="max-w-5xl mx-auto">
          <!-- 移动端侧边栏切换按钮 - 优化样式 -->
          <button class="lg:hidden mb-5 text-sm px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm transition-colors flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Repositories
          </button>

          <div class="space-y-6">
            <!-- 笔记动态卡片 - 优化卡片样式 -->
            <div
              v-for="item in feedItems"
              :key="item.id"
              class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div class="bg-slate-50 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                <div class="flex items-center gap-2 text-sm text-gray-700">
                  <svg class="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h7a2.5 2.5 0 0 1 2.5 2.5v11a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-11zM4.5 1a1.5 1.5 0 0 0-1.5 1.5v11a1.5 1.5 0 0 0 1.5 1.5h7a1.5 1.5 0 0 0 1.5-1.5v-11a1.5 1.5 0 0 0-1.5-1.5h-7z" />
                  </svg>
                  <span class="font-medium">{{ item.repo }}</span>
                  <span class="text-gray-500">updated</span>
                </div>
                <button class="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-slate-100 transition-colors">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3 6a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5A.75.75 0 0 1 3 6Zm0 4a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5A.75.75 0 0 1 3 10Z" />
                  </svg>
                </button>
              </div>
              <div class="p-5">
                <div class="flex items-center gap-2 text-xs text-gray-500 mb-3">
                  <span class="bg-green-50 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                    <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                      <path fill-rule="evenodd" d="M1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0ZM8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Z" />
                    </svg>
                    {{ item.time }}
                  </span>
                </div>
                <h3 class="text-lg font-semibold text-gray-800 mb-2 hover:text-indigo-600 transition-colors cursor-pointer">{{ item.title }}</h3>
                <p class="text-sm text-gray-600 mb-4 line-clamp-2">{{ item.description }}</p>
                <button class="text-sm text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-1 transition-colors">
                  <span>Read more</span>
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- 推荐笔记 - 优化卡片样式 -->
            <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <div class="px-5 py-3 border-b border-slate-200 flex items-center justify-between">
                <span class="text-sm font-medium text-gray-800">推荐笔记</span>
                <a href="#" class="text-sm text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-1 transition-colors">
                  <span>查看更多</span>
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
              <div class="p-5">
                <div class="space-y-4">
                  <div v-for="note in recommendedNotes" :key="note.id" class="flex items-center gap-3 group">
                    <div class="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h7a2.5 2.5 0 0 1 2.5 2.5v11a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-11zM4.5 1a1.5 1.5 0 0 0-1.5 1.5v11a1.5 1.5 0 0 0 1.5 1.5h7a1.5 1.5 0 0 0 1.5-1.5v-11a1.5 1.5 0 0 0-1.5-1.5h-7z" />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <div class="text-sm font-medium text-gray-800 hover:text-indigo-600 cursor-pointer transition-colors">{{ note.title }}</div>
                      <div class="text-xs text-gray-500 mt-0.5">{{ note.category }} · {{ note.updatedAt }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- 右侧侧边栏 - 优化样式 -->
      <aside class="w-80 bg-white border-l border-slate-200 overflow-y-auto hidden xl:block transition-all duration-300">
        <div class="p-5 sticky top-0 bg-white">
          <h3 class="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            最近更新
          </h3>
          <div class="space-y-4">
            <div v-for="log in changelog" :key="log.id" class="flex gap-3">
              <div class="flex flex-col items-center">
                <div class="w-2 h-2 rounded-full bg-indigo-500 mt-1 flex-shrink-0"></div>
                <div class="h-full w-0.5 bg-slate-200 mt-1"></div>
              </div>
              <div class="pb-1">
                <div class="text-xs text-gray-500 mb-1 font-medium">{{ log.time }}</div>
                <p class="text-sm text-gray-700 leading-relaxed">{{ log.content }}</p>
              </div>
            </div>
          </div>
          <button class="text-sm text-indigo-600 hover:text-indigo-700 hover:underline mt-4 flex items-center gap-1 transition-colors">
            <span>查看全部更新</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getUserInfo } from '@/api/user.js'
import { toastError } from '@/utils/toast.js'
import { projectTitles } from '@/api/project.js'

const router = useRouter()

const goToNewProject = () => {
    router.push('/project/new')
}

const userInfo = ref({
    username: 'xxx',
    avatar: '',
})

const fetchUserInfo = async () => {
    try {
        const res = await getUserInfo()

        if (res.code === 200) {
            userInfo.value.username = res.username
            userInfo.value.avatar = res.avatar
        } else {
            toastError(res.message || '获取用户信息失败')
        }
    } catch (error) {
        console.log('获取用户信息失败：', error)
        toastError('网络异常，请稍后重试')
    }
}

// 最近编辑的笔记/仓库
const projects = ref([])

const fetchProjectTitles = async () => {
    try {
        const res = await projectTitles()

        if (res.code === 200) {
            const formattedTitles = res.titles.map((title, index) => ({
                id: index + 1,
                title: title
            }))
            console.log(formattedTitles)
            // 赋值给响应式数据
            projects.value = formattedTitles
        } else {
            toastError(res.message || '获取用户项目失败')
        }
    } catch (error) {
        console.log('获取用户信息失败：', error)
        toastError('网络异常，请稍后重试')
    }

}

onMounted(() => {
    fetchUserInfo()
    fetchProjectTitles()
})

// 动态流内容
const feedItems = ref([
    {
        id: 1,
        repo: 'Notailab/学习笔记',
        time: '今天 14:32',
        title: 'Go 并发编程基础 - 新增通道使用示例',
        description: '补充了通道的缓冲/非缓冲使用场景，以及 select 语句处理多通道的最佳实践，修复了示例代码中的死锁问题...',
    },
    {
        id: 2,
        repo: 'Notailab/前端笔记',
        time: '昨天 20:15',
        title: 'Vue3 组合式 API 最佳实践 - 新增生命周期示例',
        description: '新增了 onMounted、onUnmounted 的实际业务场景使用示例，对比了 Options API 和 Composition API 的差异...',
    }
])

// 推荐笔记
const recommendedNotes = ref([
    { id: 1, title: 'PostgreSQL 性能优化', category: '数据库', updatedAt: '2天前' },
    { id: 2, title: 'Linux 常用命令速查', category: '运维', updatedAt: '3天前' },
    { id: 3, title: 'JWT 鉴权原理与实现', category: '安全', updatedAt: '1周前' },
])

// 更新日志
const changelog = ref([
    { id: 1, time: '3小时前', content: '新增笔记分类功能，支持按标签筛选内容' },
    { id: 2, time: '5小时前', content: '优化笔记编辑页面，提升Markdown渲染速度' },
    { id: 3, time: '10小时前', content: '修复移动端笔记列表加载异常的问题' },
])
</script>
