<template>
    <div class="min-h-screen flex flex-col bg-[#f6f8f5] text-slate-900">

        <SiteHeader
            active-tab="dashboard"
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
                    <img
                        v-if="userInfo.avatar"
                        :src="userInfo.avatar"
                        alt="用户头像"
                        class="h-full w-full object-cover"
                    />
                    <div v-else class="flex h-full w-full items-center justify-center text-sm font-semibold text-slate-600">
                        {{ userInfo.username?.charAt(0)?.toUpperCase() || 'U' }}
                    </div>
                </button>
            </template>
        </SiteHeader>

        <main class="mx-auto w-full max-w-[1600px] flex-1 px-6 py-6 lg:px-8">
            <div class="mx-auto max-w-5xl">
                <div class="mb-6">
                <h1 class="text-3xl font-semibold tracking-tight text-slate-900 mb-2">{{ isEditMode ? '编辑项目' : '创建新项目' }}</h1>
                <p class="text-sm text-slate-500">
                        项目用于存放你的笔记和学习资料。已有内容？
                        <a href="#" class="text-emerald-700 hover:underline">导入内容</a>。
                </p>
                <p class="text-xs text-slate-400 mt-1">带星号（*）的字段为必填项。</p>
                </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- 1. 基本信息 -->
        <div class="border border-slate-200 rounded-3xl p-5 relative bg-white shadow-sm hover:shadow-md duration-300">
            <div class="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-slate-500">1 基本信息</div>

            <div class="grid grid-cols-[auto_1fr] gap-x-2 gap-y-4 mb-4">
            <div>
                <label class="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">所有者 *</label>
                <div class="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                <img 
                    v-if="userInfo.avatar" 
                    :src="userInfo.avatar" 
                    alt="用户头像"
                    class="avatar w-5 h-5 mr-2"
                />
                <span class="text-sm font-medium text-slate-700">{{ userInfo.username }}</span>
                <svg class="ml-1 h-4 w-4 text-slate-400" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
                </div>
            </div>
            <div>
                <label class="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">项目名称 *</label>
                <input
                v-model="projectName"
                type="text"
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
                />
                <p class="mt-2 text-xs text-slate-400">
                好的项目名称简短好记，不如试试
                <span class="font-medium text-emerald-700">学习笔记-2026</span>？
                </p>
            </div>
            </div>

            <div>
            <label class="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">项目描述</label>
            <textarea
                v-model="projectDesc"
                rows="2"
                class="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
            ></textarea>
            <p class="mt-2 text-xs text-slate-400">0 / 350 字符</p>
            </div>
        </div>

        <!-- 2. 项目设置（修改后） -->
        <div class="border border-slate-200 rounded-3xl p-5 relative bg-white shadow-sm hover:shadow-md duration-300">
            <div class="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-slate-500">2 项目设置</div>

            <!-- 初始化模板（可编辑） -->
            <div class="mb-4">
            <label class="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">初始化模板</label>
            <textarea
                v-model="templateContent"
                rows="12"
                class="w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-mono outline-none transition focus:border-emerald-500 focus:bg-white"
            ></textarea>
            <p class="mt-2 text-xs text-slate-400">
                模板将作为项目的初始内容，可用于快速开始你的笔记。
            </p>
            </div>

            <!-- 添加分类标签 -->
            <div class="flex items-center justify-between border-t border-slate-200 py-3">
            <div>
                <p class="text-sm font-medium text-slate-700">添加分类标签</p>
                <p class="text-xs text-slate-400">
                标签有助于你后续整理和查找项目。
                </p>
            </div>
            <div class="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                <span class="text-sm text-slate-700">选择标签</span>
                <svg class="ml-1 h-4 w-4 text-slate-400" fill="currentColor" viewBox="0 0 16 16">
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                </svg>
            </div>
            </div>
        </div>

        <!-- 3. 时间设置（新增） -->
        <div class="border border-slate-200 rounded-3xl p-5 relative bg-white shadow-sm hover:shadow-md duration-300">
            <div class="absolute -top-3 left-4 bg-white px-2 text-sm font-medium text-slate-500">3 时间设置</div>

            <div class="grid grid-cols-2 gap-4">
            <!-- 项目开始时间 -->
            <div>
                <label class="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">项目开始时间 *</label>
                <input
                v-model="startDate"
                type="date"
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
                />
                <p class="mt-2 text-xs text-slate-400">设置项目的开始日期</p>
            </div>

            <!-- 项目结束时间 -->
            <div>
                <label class="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">项目结束时间</label>
                <input
                v-model="endDate"
                type="date"
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
                />
                <p class="mt-2 text-xs text-slate-400">设置项目的预计结束日期（可选）</p>
            </div>
            </div>
        </div>

        <!-- 提交按钮 -->
        <div class="flex justify-end">
            <button
            type="submit"
                        class="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-medium rounded-2xl shadow-sm transition-colors hover:scale-[1.01] active:scale-[0.99] duration-200"
            >
            {{ isEditMode ? '保存修改' : '创建项目' }}
            </button>
        </div>
        </form>
            </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { toastSuccess, toastWarn, toastError } from '@/utils/toast'
import { getUserInfo } from '@/api/user'
import { createProject, getProject, updateProject } from '@/api/project'
import { headerTabs, createHeaderTabClickHandler } from '@/composables/useHeaderNavigation'
import SiteHeader from '@/components/SiteHeader.vue'

const router = useRouter()
const route = useRoute()

const editProjectId = computed(() => {
    const value = route.query.projectid
    const numeric = Number(Array.isArray(value) ? value[0] : value)
    return Number.isFinite(numeric) && numeric > 0 ? numeric : null
})
const isEditMode = computed(() => editProjectId.value !== null)

const userInfo = ref({
    username: 'xxx',
    avatar: '',
})

const templateContent = ref('# 新项目\n\n## 目标\n- 记录知识点\n- 整理学习过程\n- 生成复盘总结\n')

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

const loadProject = async () => {
    if (!editProjectId.value) return

    try {
        const res = await getProject({ project_id: editProjectId.value })
        if (res.code === 200 && res.data) {
            projectName.value = res.data.title || ''
            projectDesc.value = res.data.description || ''
            startDate.value = res.data.start_date ? String(res.data.start_date).slice(0, 10) : ''
            endDate.value = res.data.end_date ? String(res.data.end_date).slice(0, 10) : ''
        } else {
            toastError(res.message || '获取项目失败')
            router.push('/home')
        }
    } catch (error) {
        console.log('获取项目失败：', error)
        toastError('网络异常，请稍后重试')
        router.push('/home')
    }
}

onMounted(() => {
    fetchUserInfo()
    loadProject()
})

const handleHeaderTabClick = createHeaderTabClickHandler(router)

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
const handleSubmit = async () => {
    if (!projectName.value.trim()) {
        toastWarn('项目名称为必填项！')
        return
    }
    if (startDate.value == '') {
        toastWarn('项目起始时间必须设置！')
        return
    }
    const payload = {
        title: projectName.value,
        description: projectDesc.value,
        start_date: formatDateToRFC3339(startDate.value),
        end_date: formatDateToRFC3339(endDate.value),
    }

    try {
        const res = isEditMode.value
            ? await updateProject({ project_id: editProjectId.value, ...payload })
            : await createProject(payload)

        if (res.code === 200) {
            toastSuccess(isEditMode.value ? '项目修改成功!' : `项目 "${projectName.value}" 创建成功!`)
            router.push('/home')
        } else if (res.code === 1001) {
            toastWarn('项目名已存在')
        } else {
            toastError(res.message || (isEditMode.value ? '项目修改失败' : '项目创建失败'))
        }
    } catch (error) {
        console.log('提交项目失败：', error)
        toastError('网络异常，请稍后重试')
    }
}
</script>
