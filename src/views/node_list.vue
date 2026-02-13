<template>
  <!-- 主容器：flex垂直布局 + 占满视口高度 -->
  <div class="min-h-screen flex flex-col bg-slate-50">
    <!-- 顶部导航栏（和用户主页保持一致） -->
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
              <div class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                {{ username.slice(0, 1).toUpperCase() }}
              </div>
              <span class="ml-2 text-sm font-medium text-gray-700">{{ username }}</span>
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

    <!-- 主要内容区：自动填充剩余空间 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
      <!-- 页面标题 + 操作区 -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">我的学习笔记</h1>
          <p class="text-sm text-gray-500 mt-1">共 {{ noteList.length }} 条笔记，记录你的学习成长</p>
        </div>
        <div class="flex items-center gap-3">
          <!-- 搜索框 -->
          <div class="relative">
            <input
              v-model="searchKeyword"
              @input="filterNotes"
              type="text"
              placeholder="搜索笔记标题..."
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <svg class="absolute left-3 top-2.5 h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <!-- 新增笔记按钮 -->
          <button class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            新增笔记
          </button>
        </div>
      </div>

      <!-- 筛选区 -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div class="flex flex-wrap gap-3 items-center">
          <span class="text-sm text-gray-600">筛选：</span>
          <button
            v-for="(category, index) in categories"
            :key="index"
            :class="[
              'px-3 py-1 rounded-full text-sm transition-colors',
              activeCategory === category ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
            @click="filterByCategory(category)"
          >
            {{ category }}
          </button>
          <div class="ml-auto flex items-center gap-2">
            <span class="text-sm text-gray-600">排序：</span>
            <select
              v-model="sortType"
              @change="sortNotes"
              class="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <option value="newest">最新创建</option>
              <option value="oldest">最早创建</option>
              <option value="title">标题排序</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 笔记列表 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- 空状态 -->
        <div v-if="filteredNotes.length === 0" class="col-span-full flex flex-col items-center justify-center py-12">
          <svg class="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <h3 class="text-lg font-medium text-gray-900">暂无笔记</h3>
          <p class="text-gray-500 mt-1">点击右上角“新增笔记”开始记录你的学习内容吧</p>
        </div>

        <!-- 笔记卡片 -->
        <div
          v-for="(note, index) in paginatedNotes"
          :key="index"
          class="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow overflow-hidden"
        >
          <!-- 笔记分类标签 -->
          <div class="px-4 py-2 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
            <span :class="['text-xs px-2 py-1 rounded-full', getCategoryColor(note.category)]">
              {{ note.category }}
            </span>
            <span class="text-xs text-gray-500">{{ formatDate(note.createTime) }}</span>
          </div>
          <!-- 笔记内容 -->
          <div class="p-4">
            <h3 class="font-semibold text-gray-800 mb-2 line-clamp-2">{{ note.title }}</h3>
            <p class="text-sm text-gray-600 mb-4 line-clamp-3">{{ note.content }}</p>
            <!-- 操作按钮 -->
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-3">
                <button class="text-xs text-indigo-600 hover:text-indigo-700 transition-colors">
                  编辑
                </button>
                <button class="text-xs text-red-600 hover:text-red-700 transition-colors">
                  删除
                </button>
              </div>
              <button class="text-xs text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                {{ note.viewCount }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页控件 -->
      <div v-if="filteredNotes.length > 0" class="mt-8 flex justify-center">
        <nav class="flex items-center space-x-2">
          <button
            @click="currentPage = 1"
            :disabled="currentPage === 1"
            class="px-3 py-1 rounded border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            首页
          </button>
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-3 py-1 rounded border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            上一页
          </button>
          <span class="px-3 py-1 text-sm text-gray-700">
            第 {{ currentPage }} 页 / 共 {{ totalPages }} 页
          </span>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 rounded border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            下一页
          </button>
          <button
            @click="currentPage = totalPages"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 rounded border border-gray-300 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            尾页
          </button>
        </nav>
      </div>
    </main>

    <!-- 页脚：固定在最底部 -->
    <footer class="bg-white border-t border-gray-200 py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-center text-sm text-gray-500">
            &copy; 2025 Notailab. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'

// 路由实例
const router = useRouter()

// 用户名
const username = ref('admin')

// 笔记分类
const categories = ref(['全部', '前端', '后端', '算法', '数据库', '其他'])
const activeCategory = ref('全部')

// 搜索关键词
const searchKeyword = ref('')

// 排序类型
const sortType = ref('newest')

// 分页相关
const currentPage = ref(1)
const pageSize = ref(6) // 每页显示6条

// 模拟笔记数据
const noteList = ref([
  {
    id: 1,
    title: 'Vue3组合式API学习笔记',
    content: 'Vue3的setup语法糖真的太好用了，响应式变量用ref和reactive声明，再也不用写options API了...',
    category: '前端',
    createTime: '2025-02-12',
    viewCount: 28
  },
  {
    id: 2,
    title: 'JavaScript异步编程总结',
    content: 'Promise、async/await、回调函数的区别和使用场景，异步编程的核心是解决回调地狱问题...',
    category: '前端',
    createTime: '2025-02-11',
    viewCount: 45
  },
  {
    id: 3,
    title: 'MySQL索引优化技巧',
    content: '联合索引的最左匹配原则，避免索引失效的几种情况，explain关键字的使用方法...',
    category: '数据库',
    createTime: '2025-02-10',
    viewCount: 32
  },
  {
    id: 4,
    title: '快速排序算法实现',
    content: '快速排序的时间复杂度是O(nlogn)，空间复杂度O(logn)，核心思想是分治和递归...',
    category: '算法',
    createTime: '2025-02-09',
    viewCount: 19
  },
  {
    id: 5,
    title: 'Node.js中间件开发实践',
    content: 'Express中间件的执行顺序，自定义中间件的写法，错误处理中间件的使用...',
    category: '后端',
    createTime: '2025-02-08',
    viewCount: 24
  },
  {
    id: 6,
    title: 'Git常用命令总结',
    content: 'git branch、git checkout、git merge、git rebase的使用场景和区别...',
    category: '其他',
    createTime: '2025-02-07',
    viewCount: 56
  },
  {
    id: 7,
    title: 'React Hooks使用指南',
    content: 'useState、useEffect、useContext、useReducer的使用方法和注意事项...',
    category: '前端',
    createTime: '2025-02-06',
    viewCount: 38
  }
])

// 筛选后的笔记列表
const filteredNotes = ref([...noteList.value])

// 分页后的笔记列表
const paginatedNotes = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  return filteredNotes.value.slice(startIndex, endIndex)
})

// 总页数
const totalPages = computed(() => {
  return Math.ceil(filteredNotes.value.length / pageSize.value)
})

// 按分类筛选笔记
const filterByCategory = (category) => {
  activeCategory.value = category
  filterNotes()
}

// 搜索筛选笔记
const filterNotes = () => {
  let result = [...noteList.value]
  
  // 按分类筛选
  if (activeCategory.value !== '全部') {
    result = result.filter(note => note.category === activeCategory.value)
  }
  
  // 按关键词搜索
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(note => 
      note.title.toLowerCase().includes(keyword) || 
      note.content.toLowerCase().includes(keyword)
    )
  }
  
  // 排序
  sortNotes(result)
  
  filteredNotes.value = result
  currentPage.value = 1 // 重置到第一页
}

// 排序笔记
const sortNotes = (list = filteredNotes.value) => {
  if (sortType.value === 'newest') {
    list.sort((a, b) => new Date(b.createTime) - new Date(a.createTime))
  } else if (sortType.value === 'oldest') {
    list.sort((a, b) => new Date(a.createTime) - new Date(b.createTime))
  } else if (sortType.value === 'title') {
    list.sort((a, b) => a.title.localeCompare(b.title))
  }
}

// 根据分类获取标签颜色
const getCategoryColor = (category) => {
  const colorMap = {
    '前端': 'bg-indigo-100 text-indigo-600',
    '后端': 'bg-green-100 text-green-600',
    '算法': 'bg-pink-100 text-pink-600',
    '数据库': 'bg-purple-100 text-purple-600',
    '其他': 'bg-gray-100 text-gray-600'
  }
  return colorMap[category] || 'bg-gray-100 text-gray-600'
}

// 格式化日期
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

// 退出登录
const logout = () => {
  if (confirm('确定要退出登录吗？')) {
    localStorage.removeItem('rememberedUsername')
    router.push('/')
  }
}

// 监听排序类型变化
watch(sortType, () => {
  filterNotes()
})

// 初始化筛选
filterNotes()
</script>

<style scoped>
/* 基础样式补充 */
.flex {
  display: flex;
}
.flex-col {
  flex-direction: column;
}
.flex-wrap {
  flex-wrap: wrap;
}
.justify-between {
  justify-content: space-between;
}
.justify-center {
  justify-content: center;
}
.items-start {
  align-items: flex-start;
}
.items-center {
  align-items: center;
}
.gap-3 {
  gap: 0.75rem;
}
.gap-4 {
  gap: 1rem;
}
.gap-6 {
  gap: 1.5rem;
}
.mb-6 {
  margin-bottom: 1.5rem;
}
.mb-8 {
  margin-bottom: 2rem;
}
.mt-8 {
  margin-top: 2rem;
}
.ml-auto {
  margin-left: auto;
}
.col-span-full {
  grid-column: 1 / -1;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.flex-grow {
  flex-grow: 1;
}
.transition-colors {
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
}
.transition-shadow {
  transition: box-shadow 0.2s ease-in-out;
}
</style>
