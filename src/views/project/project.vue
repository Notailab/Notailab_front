<template>
  <div class="h-screen flex flex-col bg-gray-50 antialiased">

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

        <!-- 第二行：动态渲染的项目操作导航 -->
        <div class="py-1 overflow-x-auto scrollbar-hide">
          <nav class="flex items-center space-x-1 sm:space-x-4 px-1">
            <!-- 核心操作组 -->
            <template v-for="item in coreNavItems" :key="item.key">
            <a 
                :href="item.href" 
                <!-- 2. 保留 nav-item 基类 + active 动态类，移除标签内的固定颜色 -->
                class="nav-item flex items-center space-x-1.5 px-3 py-2 text-sm"
                :class="{ active: item.active }"
            >
                <!-- 移除 text-gray-600，颜色由父级 .nav-item/.active 控制 -->
                <div v-html="item.icon" class="w-5 h-5"></div>
                <span>{{ item.label }}</span>
                <span v-if="item.badgeCount" class="bg-gray-200 text-gray-800 rounded-full px-1.5 py-0 text-xs">
                {{ item.badgeCount }}
                </span>
            </a>
            </template>

            <!-- 分隔线 -->
            <span class="h-5 w-px bg-gray-200 mx-1"></span>

            <!-- 次要操作组 -->
            <template v-for="item in secondaryNavItems" :key="item.key">
            <a 
                :href="item.href" 
                class="nav-item flex items-center space-x-1.5 px-3 py-2 text-sm"
                :class="{ active: item.active }"
            >
                <!-- 移除 text-gray-600 -->
                <div v-html="item.icon" class="w-5 h-5"></div>
                <span>{{ item.label }}</span>
            </a>
            </template>
          </nav>
        </div>

      </div>
    </header>

    <!-- 主体布局：左侧文件夹栏 + 中间工作区 -->
    <div class="flex flex-1 overflow-hidden">
      <!-- 左侧文件夹栏 -->
      <aside class="w-64 bg-white border-r overflow-y-auto p-4">
        <!-- 搜索框 -->
        <input 
          placeholder="搜索文件" 
          class="w-full mb-4 p-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        
        <!-- 静态文件夹/文件列表 -->
        <div class="space-y-1 text-sm">
          <div 
            @click="activeView = 'folder'"
            :class="['p-2 rounded cursor-pointer transition-colors', activeView === 'folder' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100']"
          >
            基础语法
          </div>
          <div class="p-2 rounded hover:bg-gray-100 cursor-pointer">流程控制</div>
          <div class="p-2 rounded hover:bg-gray-100 cursor-pointer">学习计划.md</div>
          <div class="p-2 rounded hover:bg-gray-100 cursor-pointer ml-4">变量与数据类型.py</div>
          <div class="p-2 rounded hover:bg-gray-100 cursor-pointer ml-4">基础语法笔记.md</div>
        </div>
      </aside>

      <!-- 中间工作区 -->
      <main class="flex-1 overflow-y-auto p-6 bg-white">
        <!-- 1. 文件夹列表视图（默认显示） -->
        <div v-if="activeView === 'folder'">
          <div class="mb-4 flex justify-between items-center">
            <h2 class="text-lg font-medium text-gray-800">基础语法</h2>
            <div class="flex gap-2">
              <button class="p-2 border rounded text-sm hover:bg-gray-50 transition-colors">新建文件夹</button>
              <button class="p-2 border rounded text-sm bg-blue-500 text-white hover:bg-blue-600 transition-colors">新建笔记</button>
            </div>
          </div>
          
          <!-- 静态文件表格 -->
          <table class="w-full border-collapse">
            <thead>
              <tr class="border-b bg-gray-50">
                <th class="text-left p-2 text-sm font-medium text-gray-700">名称</th>
                <th class="text-left p-2 text-sm font-medium text-gray-700">类型</th>
                <th class="text-left p-2 text-sm font-medium text-gray-700">创建时间</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                @click="activeView = 'file'"
                class="border-b hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td class="p-2 text-sm text-gray-800">变量与数据类型.py</td>
                <td class="p-2 text-sm text-gray-600">文件</td>
                <td class="p-2 text-sm text-gray-500">2026-02-15</td>
              </tr>
              <tr 
                @click="activeView = 'note'"
                class="border-b hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td class="p-2 text-sm text-gray-800">基础语法笔记.md</td>
                <td class="p-2 text-sm text-gray-600">笔记</td>
                <td class="p-2 text-sm text-gray-500">2026-02-15</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 2. 笔记编辑视图 -->
        <div v-if="activeView === 'note'">
          <input 
            v-model="noteTitle" 
            class="w-full mb-4 p-2 border rounded text-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <textarea 
            v-model="noteContent" 
            class="w-full h-[500px] p-2 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
          />
          <button class="mt-4 p-2 border rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors">保存笔记</button>
        </div>

        <!-- 3. 文件预览视图 -->
        <div v-if="activeView === 'file'">
          <h2 class="text-lg font-medium mb-4 text-gray-800">变量与数据类型.py</h2>
          <pre class="w-full p-4 bg-gray-100 rounded text-sm overflow-auto max-h-[500px] font-mono">{{ fileContent }}</pre>
          <button class="mt-4 p-2 border rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors">下载文件</button>
        </div>
      </main>
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

const coreNavItems = ref([
    {
        key: 'code',
        label: '文件',
        href: '#',     // 后续可改为 Vue 路由：/project/code
        active: true,  // 是否为活跃项
        badgeCount: 0, // 徽章数字（0 则不显示）
        // SVG 图标字符串（Heroicons 图标，可直接替换）
        icon: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        `
    },
    {
        key: 'issues',
        label: 'Issues',
        href: '#',
        active: false,
        badgeCount: 5,
        icon: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
        </svg>
        `
    },
    {
        key: 'pull-requests',
        label: 'Pull Requests',
        href: '#',
        active: false,
        badgeCount: 2,
        icon: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
        `
    },
    {
        key: 'actions',
        label: 'Actions',
        href: '#',
        active: false,
        badgeCount: 0,
        icon: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        `
    },
    {
        key: 'wiki',
        label: 'Wiki',
        href: '#',
        active: false,
        badgeCount: 0,
        icon: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
        `
    }
])

const secondaryNavItems = ref([
    {
        key: 'monitor',
        label: '监控',
        href: '#',
        active: false,
        icon: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        `
    },
    {
        key: 'stats',
        label: '统计',
        href: '#',
        active: false,
        icon: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"></path>
        </svg>
        `
    },
    {
        key: 'settings',
        label: '设置',
        href: '#',
        active: false,
        icon: `
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        `
    }
])

// 静态视图切换（无后端逻辑）
const activeView = ref('folder') // folder/note/file

// 静态笔记内容（写死）
const noteTitle = ref('基础语法笔记')
const noteContent = ref(`# 变量与数据类型
- 字符串：使用单引号/双引号包裹
- 数字：整数、浮点数
- 布尔值：True/False

## 示例代码
\`\`\`python
name = "Python"
age = 20
is_study = True
print(name, age, is_study)
\`\`\``)

// 静态文件内容（写死）
const fileContent = ref(`name = "Python"
age = 20
is_study = True

# 打印变量
print("姓名：", name)
print("年龄：", age)
print("是否学习：", is_study)

# 变量类型转换
age_str = str(age)
print(type(age_str))`)
</script>

<style scoped>
.nav-item {
    color: #9ca3af; /* 浅灰色（你要的浅色） */
    border-bottom: 2px solid transparent;
    transition: all 0.2s ease;
    white-space: nowrap;
    cursor: pointer;
    /* 关键：让子元素继承颜色（图标/SVG 也会继承） */
    fill: currentColor;
    stroke: currentColor;
}

/* active 样式：深色 + 蓝色下划线 */
.nav-item.active {
    color: #1f2937; /* 深灰色/黑色 */
    font-weight: 600;
    border-bottom-color: #4f46e5; /* 蓝色下划线 */
}

/* hover 效果 */
.nav-item:not(.active):hover {
    color: #4b5563; /* 比默认深一点的灰色，保留交互反馈 */
    background-color: #f3f4f6;
    border-radius: 6px;
}
</style>
