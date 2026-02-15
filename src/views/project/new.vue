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

    <main class="max-w-5xl mx-auto px-4 py-8 w-full">
        <div class="mb-6">
        <h1 class="text-xl font-semibold text-gray-900 mb-1">创建新项目</h1>
        <p class="text-sm text-gray-600">
            项目用于存放你的笔记和学习资料。已有内容？
            <a href="#" class="text-indigo-600 hover:underline">导入内容</a>。
        </p>
        <p class="text-xs text-gray-500 mt-1">带星号（*）的字段为必填项。</p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- 1. 基本信息 -->
        <div class="border border-gray-200 rounded-md p-5 relative bg-white hover:shadow-md duration-300">
            <div class="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-gray-600">1 基本信息</div>

            <div class="grid grid-cols-[auto_1fr] gap-x-2 gap-y-4 mb-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">所有者 *</label>
                <div class="flex items-center border border-gray-200 rounded-md px-2 py-1.5 bg-gray-50">
                <svg class="w-4 h-4 text-purple-600 mr-1" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2.5 3.5a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2zM2.5 10.5a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2zM9.5 3.5a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2zM9.5 10.5a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2z"/>
                </svg>
                <span class="text-sm font-medium">Notailab</span>
                <svg class="w-4 h-4 text-gray-500 ml-1" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
                </div>
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">项目名称 *</label>
                <input
                v-model="projectName"
                type="text"
                class="w-full border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <p class="text-xs text-gray-500 mt-1">
                好的项目名称简短好记，不如试试
                <span class="text-green-600 font-medium">学习笔记-2026</span>？
                </p>
            </div>
            </div>

            <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">项目描述</label>
            <textarea
                v-model="projectDesc"
                rows="1"
                class="w-full border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
            ></textarea>
            <p class="text-xs text-gray-500 mt-1">0 / 350 字符</p>
            </div>
        </div>

        <!-- 2. 项目设置（修改后） -->
        <div class="border border-gray-200 rounded-md p-5 relative bg-white hover:shadow-md duration-300">
            <div class="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-gray-600">2 项目设置</div>

            <!-- 初始化模板（可编辑） -->
            <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-1">初始化模板</label>
            <textarea
                v-model="templateContent"
                rows="12"
                class="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono resize-y"
            ></textarea>
            <p class="text-xs text-gray-500 mt-1">
                模板将作为项目的初始内容，可用于快速开始你的笔记。
            </p>
            </div>

            <!-- 添加分类标签 -->
            <div class="flex items-center justify-between py-3 border-t">
            <div>
                <p class="text-sm font-medium text-gray-700">添加分类标签</p>
                <p class="text-xs text-gray-500">
                标签有助于你后续整理和查找项目。
                </p>
            </div>
            <div class="flex items-center border border-gray-200 rounded-md px-2 py-1 bg-gray-50">
                <span class="text-sm text-gray-700">选择标签</span>
                <svg class="w-4 h-4 text-gray-500 ml-1" fill="currentColor" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
            </div>
            </div>
        </div>

        <!-- 3. 时间设置（新增） -->
        <div class="border border-gray-200 rounded-md p-5 relative bg-white hover:shadow-md duration-300">
            <div class="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-gray-600">3 时间设置</div>

            <div class="grid grid-cols-2 gap-4">
            <!-- 项目开始时间 -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">项目开始时间 *</label>
                <input
                v-model="startDate"
                type="date"
                class="w-full border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <p class="text-xs text-gray-500 mt-1">设置项目的开始日期</p>
            </div>

            <!-- 项目结束时间 -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">项目结束时间</label>
                <input
                v-model="endDate"
                type="date"
                class="w-full border border-gray-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <p class="text-xs text-gray-500 mt-1">设置项目的预计结束日期（可选）</p>
            </div>
            </div>
        </div>

        <!-- 提交按钮 -->
        <div class="flex justify-end">
            <button
            type="submit"
            class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors hover:scale-[1.01] active:scale-[0.99] duration-200"
            >
            创建项目
            </button>
        </div>
        </form>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { toastSuccess, toastWarn, toastError } from '@/utils/toast.js'
import { getUserInfo } from '@/api/user.js'
import { createProject } from '@/api/project.js'

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
            toastError(res.message || '获取用户信息失败')
        }
    } catch (error) {
        console.log('获取用户信息失败：', error)
        toastError('网络异常，请稍后重试')
    }
}

onMounted(() => {
    fetchUserInfo()
})

// 表单状态
const projectName = ref('')
const projectDesc = ref('')
const startDate = ref('')
const endDate = ref('')

const formatDateToRFC3339 = (dateStr) => {
    if (!dateStr) return new Date('2000-01-01').toISOString()
    // YYYY-MM-DD → YYYY-MM-DDTHH:mm:ssZ（UTC时间）
    return new Date(dateStr).toISOString()
}
// 模拟提交
const handleSubmit = async () => {
    if (!projectName.value.trim()) {
        toastWarn('项目名称为必填项！')
        return
    }
    if (startDate.value == '') {
        toastWarn('项目起始时间必须设置！')
        return
    }
    const res = await createProject({
        title: projectName.value,
        description: projectDesc.value,
        start_date: formatDateToRFC3339(startDate.value),
        end_date: formatDateToRFC3339(endDate.value),
    })

    if (res.code === 200) {
        toastSuccess(`项目 "${projectName.value}" 创建成功!`)
        router.push('/project')
    } else if (res.code === 1001) {
        toastWarn('项目名已存在')
    }
    // 实际项目中可跳转到项目页面
}
</script>
