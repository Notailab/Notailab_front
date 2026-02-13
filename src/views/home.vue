<template>
  <!-- 主容器 -->
  <div class="min-h-screen flex flex-col bg-slate-50">
    <!-- 顶部导航栏 -->
    <header class="bg-white shadow-sm sticky top-0 z-30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- 左侧logo/标题 -->
          <div class="flex items-center">
            <svg class="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            <span class="ml-2 text-xl font-semibold text-gray-800">Notailab</span>
          </div>

          <!-- 右侧用户信息 + 退出按钮 -->
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
            <button 
              @click="logout"
              class="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors"
            >
              退出登录
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- 主要内容区 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
      <!-- 第一行：用户信息卡片 -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div class="lg:col-span-1 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 text-white">
            <div class="flex items-center">
                <img 
                    v-if="userInfo.avatar" 
                    :src="userInfo.avatar" 
                    alt="用户头像"
                    class="avatar"
                />
              <div class="ml-4">
                <h2 class="text-xl font-bold">{{ userInfo.username }}</h2>
                <p class="text-white/80 text-sm mt-1">普通用户</p>
              </div>
            </div>
          </div>
          <div class="px-6 py-4">
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">注册时间</span>
                <span class="text-sm font-medium text-gray-700">2025-02-13</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">累计学习天数</span>
                <span class="text-sm font-medium text-gray-700">{{ studyDays }} 天</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">最近登录</span>
                <span class="text-sm font-medium text-gray-700">今天 {{ new Date().toLocaleTimeString().slice(0, 5) }}</span>
              </div>
            </div>
            <button class="w-full mt-4 px-4 py-2 text-sm bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100 transition-colors">
              编辑个人信息
            </button>
          </div>
        </div>

        <!-- 学习数据统计 -->
        <div class="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-6">学习数据统计</h3>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <!-- 统计卡片1：总学习时长 -->
            <div class="bg-indigo-50 rounded-lg p-4 text-center">
              <p class="text-sm text-indigo-600 mb-1">总学习时长</p>
              <p class="text-2xl font-bold text-gray-800">{{ totalStudyHours }} 小时</p>
              <p class="text-xs text-gray-500 mt-1">较上周 +{{ studyHoursGrowth }}%</p>
            </div>
            <!-- 统计卡片2：完成任务数 -->
            <div class="bg-purple-50 rounded-lg p-4 text-center">
              <p class="text-sm text-purple-600 mb-1">完成任务数</p>
              <p class="text-2xl font-bold text-gray-800">{{ completedTasks }} 个</p>
              <p class="text-xs text-gray-500 mt-1">较上周 +{{ tasksGrowth }}%</p>
            </div>
            <!-- 统计卡片3：学习效率 -->
            <div class="bg-pink-50 rounded-lg p-4 text-center">
              <p class="text-sm text-pink-600 mb-1">学习效率</p>
              <p class="text-2xl font-bold text-gray-800">{{ studyEfficiency }}%</p>
              <p class="text-xs text-gray-500 mt-1">较上周 +{{ efficiencyGrowth }}%</p>
            </div>
          </div>

          <!-- 学习趋势图（模拟） -->
          <div class="mt-6 bg-gray-50 rounded-lg p-4">
            <p class="text-sm font-medium text-gray-700 mb-3">近7天学习时长趋势</p>
            <div class="h-40 flex items-end justify-between space-x-2">
              <div class="w-full flex items-end justify-between">
                <div class="flex flex-col items-center w-8">
                  <div class="w-4 bg-indigo-400 rounded-t-sm" style="height: {{ trendData[0] }}%"></div>
                  <span class="text-xs text-gray-500 mt-1">周一</span>
                </div>
                <div class="flex flex-col items-center w-8">
                  <div class="w-4 bg-indigo-400 rounded-t-sm" style="height: {{ trendData[1] }}%"></div>
                  <span class="text-xs text-gray-500 mt-1">周二</span>
                </div>
                <div class="flex flex-col items-center w-8">
                  <div class="w-4 bg-indigo-400 rounded-t-sm" style="height: {{ trendData[2] }}%"></div>
                  <span class="text-xs text-gray-500 mt-1">周三</span>
                </div>
                <div class="flex flex-col items-center w-8">
                  <div class="w-4 bg-indigo-400 rounded-t-sm" style="height: {{ trendData[3] }}%"></div>
                  <span class="text-xs text-gray-500 mt-1">周四</span>
                </div>
                <div class="flex flex-col items-center w-8">
                  <div class="w-4 bg-indigo-400 rounded-t-sm" style="height: {{ trendData[4] }}%"></div>
                  <span class="text-xs text-gray-500 mt-1">周五</span>
                </div>
                <div class="flex flex-col items-center w-8">
                  <div class="w-4 bg-indigo-400 rounded-t-sm" style="height: {{ trendData[5] }}%"></div>
                  <span class="text-xs text-gray-500 mt-1">周六</span>
                </div>
                <div class="flex flex-col items-center w-8">
                  <div class="w-4 bg-indigo-600 rounded-t-sm" style="height: {{ trendData[6] }}%"></div>
                  <span class="text-xs text-gray-500 mt-1">周日</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 第二行：功能导航区 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- 功能卡片1：学习记录 -->
        <div class="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div class="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800">学习记录</h3>
          <p class="text-sm text-gray-500 mt-2">查看和管理你的每日学习记录</p>
          <button class="mt-4 text-sm text-indigo-600 hover:text-indigo-700 transition-colors">
            进入 →
          </button>
        </div>

        <!-- 功能卡片2：学习计划 -->
        <div class="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div class="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800">学习计划</h3>
          <p class="text-sm text-gray-500 mt-2">制定和跟踪你的学习目标与计划</p>
          <button class="mt-4 text-sm text-purple-600 hover:text-purple-700 transition-colors">
            进入 →
          </button>
        </div>

        <!-- 功能卡片3：数据报表 -->
        <div class="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div class="w-12 h-12 rounded-lg bg-pink-100 flex items-center justify-center text-pink-600 mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800">数据报表</h3>
          <p class="text-sm text-gray-500 mt-2">查看详细的学习数据和分析报表</p>
          <button class="mt-4 text-sm text-pink-600 hover:text-pink-700 transition-colors">
            进入 →
          </button>
        </div>

        <!-- 功能卡片4：系统设置 -->
        <div class="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow cursor-pointer">
          <div class="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 mb-4">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-800">系统设置</h3>
          <p class="text-sm text-gray-500 mt-2">修改账号密码、通知设置等</p>
          <button class="mt-4 text-sm text-gray-600 hover:text-gray-700 transition-colors">
            进入 →
          </button>
        </div>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="bg-white border-t border-gray-200 mt-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p class="text-center text-sm text-gray-500">
            &copy; 2025 Notailab. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getUserInfo } from '../api/user.js'

// 获取路由实例
const router = useRouter()

const userInfo = ref({
    username: '',
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

// 模拟学习数据
const studyDays = ref(68) // 累计学习天数
const totalStudyHours = ref(156.5) // 总学习时长
const completedTasks = ref(89) // 完成任务数
const studyEfficiency = ref(87) // 学习效率

// 模拟增长率
const studyHoursGrowth = ref(12)
const tasksGrowth = ref(8)
const efficiencyGrowth = ref(5)

// 近7天学习时长趋势（百分比）
const trendData = ref([45, 60, 75, 50, 80, 90, 95])

// 退出登录方法
const logout = () => {
  if (confirm('确定要退出登录吗？')) {
    // 清空本地存储（如果有）
    localStorage.removeItem('rememberedUsername')
    // 跳回登录页
    router.push('/login')
  }
}
</script>

<style scoped>
/* 自定义样式（Tailwind 覆盖/补充） */
.grid {
  display: grid;
}
.gap-6 {
  gap: 1.5rem;
}
.hover\:shadow-lg:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
.transition-shadow {
  transition: box-shadow 0.2s ease-in-out;
}
</style>
