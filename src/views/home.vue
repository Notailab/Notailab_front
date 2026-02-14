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

    <!-- 主体内容区（带响应式适配） -->
    <div class="flex flex-1 overflow-hidden">
      <!-- 左侧侧边栏：响应式隐藏/显示 -->
      <aside class="w-72 bg-gray-50 border-r border-gray-200 overflow-y-auto hidden lg:block">
        <div class="p-4 border-b border-gray-200">
          <button class="w-full text-sm px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 duration-200 hover:scale-[1.02] flex items-center justify-center gap-2 mb-4">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            新建笔记
          </button>
          <div class="mb-3">
            <input
              type="text"
              placeholder="Find a note..."
              class="w-full text-sm px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div class="space-y-1">
            <div
              v-for="repo in recentRepos"
              :key="repo.id"
              class="flex items-center gap-2 text-sm text-gray-700 hover:text-indigo-600 cursor-pointer py-1"
            >
              <span>{{ repo.name }}</span>
            </div>
          </div>
          <button class="text-xs text-gray-500 hover:text-indigo-600 mt-4">Show more</button>
        </div>
      </aside>

      <!-- 中间主内容区：自适应宽度 -->
      <main class="flex-1 overflow-y-auto bg-gray-50 p-6 lg:px-8">
        <div class="max-w-5xl mx-auto">
          <!-- 移动端侧边栏切换按钮 -->
          <button class="lg:hidden mb-4 text-sm px-3 py-2 bg-white border border-gray-200 rounded-md hover:bg-gray-100">
            ☰ Repositories
          </button>

          <div class="space-y-6">
            <!-- 笔记动态卡片 -->
            <div
              v-for="item in feedItems"
              :key="item.id"
              class="bg-white border border-gray-200 rounded-md overflow-hidden"
            >
              <div class="bg-gray-50 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                <div class="flex items-center gap-2 text-sm text-gray-700">
                  <svg class="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h7a2.5 2.5 0 0 1 2.5 2.5v11a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-11zM4.5 1a1.5 1.5 0 0 0-1.5 1.5v11a1.5 1.5 0 0 0 1.5 1.5h7a1.5 1.5 0 0 0 1.5-1.5v-11a1.5 1.5 0 0 0-1.5-1.5h-7z" />
                  </svg>
                  <span class="font-medium">{{ item.repo }}</span>
                  <span class="text-gray-500">updated</span>
                </div>
                <button class="text-gray-400 hover:text-gray-600">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M3 6a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5A.75.75 0 0 1 3 6Zm0 4a.75.75 0 0 1 .75-.75h8.5a.75.75 0 0 1 0 1.5h-8.5A.75.75 0 0 1 3 10Z" />
                  </svg>
                </button>
              </div>
              <div class="p-4">
                <div class="flex items-center gap-1 text-xs text-gray-500 mb-2">
                  <span class="bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
                      <path fill-rule="evenodd" d="M1.5 8a6.5 6.5 0 1 1 13 0 6.5 6.5 0 0 1-13 0ZM8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0Z" />
                    </svg>
                    {{ item.time }}
                  </span>
                </div>
                <h3 class="text-base font-semibold text-gray-800 mb-2">{{ item.title }}</h3>
                <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ item.description }}</p>
                <button class="text-xs text-indigo-600 hover:underline">Read more</button>
              </div>
            </div>

            <!-- 推荐笔记 -->
            <div class="bg-white border border-gray-200 rounded-md overflow-hidden">
              <div class="px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">推荐笔记</span>
                <a href="#" class="text-xs text-indigo-600 hover:underline">查看更多</a>
              </div>
              <div class="p-4">
                <div class="space-y-3">
                  <div v-for="note in recommendedNotes" :key="note.id" class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h7a2.5 2.5 0 0 1 2.5 2.5v11a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-11zM4.5 1a1.5 1.5 0 0 0-1.5 1.5v11a1.5 1.5 0 0 0 1.5 1.5h7a1.5 1.5 0 0 0 1.5-1.5v-11a1.5 1.5 0 0 0-1.5-1.5h-7z" />
                    </svg>
                    <div class="flex-1">
                      <div class="text-sm font-medium text-gray-800 hover:text-indigo-600 cursor-pointer">{{ note.title }}</div>
                      <div class="text-xs text-gray-500">{{ note.category }} · {{ note.updatedAt }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- 右侧侧边栏：响应式隐藏/显示 -->
      <aside class="w-80 bg-white border-l border-gray-200 overflow-y-auto hidden xl:block">
        <div class="p-4 sticky top-0 bg-white">
          <h3 class="text-sm font-semibold text-gray-800 mb-3">最近更新</h3>
          <div class="space-y-3">
            <div v-for="log in changelog" :key="log.id" class="flex gap-2">
              <div class="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 flex-shrink-0"></div>
              <div>
                <div class="text-xs text-gray-500 mb-1">{{ log.time }}</div>
                <p class="text-xs text-gray-700">{{ log.content }}</p>
              </div>
            </div>
          </div>
          <button class="text-xs text-indigo-600 hover:underline mt-3">查看全部更新 →</button>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getUserInfo } from '@/api/user.js'

const router = useRouter()

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
            toastError(data.message)
        }
    } catch (error) {
        console.log('获取用户信息失败：', error)
    }
}

onMounted(() => {
    fetchUserInfo()
})

// 最近编辑的笔记/仓库
const recentRepos = ref([
    { id: 1, name: 'Go 编程基础' },
    { id: 2, name: 'Vue3 组合式 API 最佳实践' },
    { id: 3, name: 'Notailab' },
])

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
