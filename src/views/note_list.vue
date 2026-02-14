<template>
  <!-- 页面最外层：flex 垂直布局，撑满视口 -->
  <div class="min-h-screen bg-gray-50 flex flex-col">

    <!-- 顶部标题栏 -->
    <header class="bg-white shadow sticky top-0 z-30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <div class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                A
              </div>
              <span class="ml-2 text-sm font-medium text-gray-700">aaa</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- 主体内容区 -->
    <main class="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
      <!-- 页面标题区 -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">我的学习笔记</h1>
        <p class="text-gray-500 mt-1">共 {{ totalNotes }} 条笔记，记录你的学习成长</p>
      </div>

      <!-- 操作栏 -->
      <div class="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- 筛选按钮 -->
        <div class="flex items-center space-x-2 overflow-x-auto w-full md:w-auto">
          <button
            v-for="tag in filters"
            :key="tag"
            :class="[
              'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
              activeFilter === tag ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
            @click="setActiveFilter(tag)"
          >
            {{ tag }}
          </button>
        </div>
        <!-- 搜索 + 新增 -->
        <div class="flex items-center space-x-3 w-full md:w-auto">
          <div class="relative flex-1 md:flex-none">
            <input
              type="text"
              placeholder="搜索笔记标题..."
              class="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <span class="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
          <button class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2">
            <span>+</span>
            <span>新增笔记</span>
          </button>
        </div>
      </div>

      <!-- 笔记卡片列表：flex-wrap 紧凑排列，不强制高度 -->
      <div class="flex flex-wrap gap-6 mb-8">
        <div
          v-for="note in filteredNotes"
          :key="note.id"
          class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
        >
          <!-- 卡片头部：标签 + 日期 -->
          <div class="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
            <span
              :class="[
                'px-2 py-0.5 rounded text-xs font-medium',
                getTagColor(note.tag)
              ]"
            >
              {{ note.tag }}
            </span>
            <span class="text-xs text-gray-400">{{ note.date }}</span>
          </div>

          <!-- 卡片内容：高度由内容自然决定 -->
          <div class="p-5">
            <h3 class="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{{ note.title }}</h3>
            <p class="text-gray-600 text-sm line-clamp-2 mb-4">{{ note.desc }}</p>

            <!-- 底部操作 + 字数 -->
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <button class="text-xs text-indigo-600 hover:text-indigo-700">编辑</button>
                <button class="text-xs text-red-500 hover:text-red-600">删除</button>
              </div>
              <span class="text-xs text-gray-400">{{ note.wordCount }} 字</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页：放在主体区底部 -->
      <div class="mt-auto flex justify-center">
        <div class="flex items-center space-x-2">
          <button class="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-500 hover:bg-gray-50">首页</button>
          <button class="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-500 hover:bg-gray-50">上一页</button>
          <span class="text-sm text-gray-600">第 1 页 / 共 2 页</span>
          <button class="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-500 hover:bg-gray-50">下一页</button>
          <button class="px-3 py-1 border border-gray-200 rounded-lg text-sm text-gray-500 hover:bg-gray-50">尾页</button>
        </div>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="bg-gray-50 py-2 fixed bottom-0 left-0 right-0"> <!-- 关键修改：固定定位+删边框 -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-center text-sm text-gray-500">
            &copy; 2026 Notailab. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// 模拟数据
const notes = ref([
  { id: 1, title: 'Vue3组合式API学习笔记', tag: '前端', date: '2025-02-12', desc: 'Vue3的setup语法真的太好用了，响应式变量用ref和reactive声明，再也不用写options API了', wordCount: 28 },
  { id: 2, title: 'JavaScript异步编程总结', tag: '前端', date: '2025-02-11', desc: 'Promise、async/await、回调函数的区别和使用场景，异步编程的核心是解决回调地狱问题...', wordCount: 45 },
  { id: 3, title: 'MySQL索引优化技巧', tag: '数据库', date: '2025-02-10', desc: '联合索引的最左匹配原则，避免索引失效的几种情况，explain关键字的使用方法...', wordCount: 32 },
  { id: 4, title: '快速排序算法实现', tag: '算法', date: '2025-02-09', desc: '快速排序的时间复杂度是O(nlogn)，空间复杂度O(logn)，核心思想是分治和递归...', wordCount: 19 },
  { id: 5, title: 'Node.js中间件开发实践', tag: '后端', date: '2025-02-08', desc: 'Express中间件的执行顺序，自定义中间件的写法，错误处理中间件的使用...', wordCount: 24 },
  { id: 6, title: 'Git常用命令总结', tag: '其他', date: '2025-02-07', desc: 'git branch、git checkout、git merge、git rebase的使用场景和区别...', wordCount: 56 },
  { id: 7, title: 'Go语言并发模型', tag: '后端', date: '2025-02-06', desc: 'goroutine和channel的使用，sync包的同步原语，CSP并发模型的核心思想...', wordCount: 72 }
])

const filters = ['全部', '前端', '后端', '算法', '数据库', '其他']
const activeFilter = ref('全部')
const totalNotes = computed(() => notes.value.length)

const filteredNotes = computed(() => {
  if (activeFilter.value === '全部') return notes.value
  return notes.value.filter(note => note.tag === activeFilter.value)
})

const setActiveFilter = (tag) => {
  activeFilter.value = tag
}

const getTagColor = (tag) => {
  const colors = {
    '前端': 'bg-blue-100 text-blue-700',
    '后端': 'bg-green-100 text-green-700',
    '算法': 'bg-purple-100 text-purple-700',
    '数据库': 'bg-orange-100 text-orange-700',
    '其他': 'bg-gray-100 text-gray-700'
  }
  return colors[tag] || 'bg-gray-100 text-gray-700'
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
