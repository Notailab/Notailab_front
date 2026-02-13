<template>
  <div class="min-h-screen flex flex-col  bg-slate-50">
    <header class="bg-white shadow-sm sticky top-0 z-30">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <svg class="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            <span class="ml-2 text-xl font-semibold text-gray-800">Notailab</span>
          </div>

          <!-- 右侧导航 -->
          <nav class="flex items-center space-x-6">
            <a href="/note_list" class="text-sm text-gray-600 hover:text-indigo-600">笔记管理</a>
            <a href="/profile" class="text-sm font-medium text-indigo-600 border-b-2 border-indigo-600 pb-0.5">个人中心</a>
            <button class="text-sm text-gray-600 hover:text-indigo-600">退出登录</button>
          </nav>
        </div>
      </div>
    </header>

    <!-- 主要内容区 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
      <div class="grid grid-cols-12 gap-8">
        <!-- 左侧：个人信息卡片 -->
        <div class="col-span-3">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <!-- 头像区域 -->
            <div class="bg-indigo-50 p-6 text-center">
              <div class="w-24 h-24 rounded-full bg-indigo-600 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-3">
                {{ username.slice(0, 1).toUpperCase() }}
              </div>
              <h3 class="text-lg font-semibold text-gray-800">{{ username }}</h3>
              <p class="text-sm text-gray-500 mt-1">{{ userInfo.role }}</p>
            </div>

            <!-- 统计信息 -->
            <div class="p-4 border-t border-gray-100">
              <div class="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p class="text-lg font-medium text-indigo-600">{{ userStats.noteCount }}</p>
                  <p class="text-xs text-gray-500">我的笔记</p>
                </div>
                <div>
                  <p class="text-lg font-medium text-indigo-600">{{ userStats.collectCount }}</p>
                  <p class="text-xs text-gray-500">收藏笔记</p>
                </div>
                <div>
                  <p class="text-lg font-medium text-indigo-600">{{ userStats.wordCount }}</p>
                  <p class="text-xs text-gray-500">累计字数</p>
                </div>
              </div>
            </div>

            <!-- 侧边菜单 -->
            <div class="p-2 mt-2">
              <button 
                @click="activeTab = 'baseInfo'"
                class="w-full text-left px-4 py-2.5 text-sm rounded-lg hover:bg-indigo-50 transition-colors"
                :class="activeTab === 'baseInfo' ? 'text-indigo-600 font-medium' : 'text-gray-700'"
              >
                基本信息
              </button>
              <button 
                @click="activeTab = 'accountSecurity'"
                class="w-full text-left px-4 py-2.5 text-sm rounded-lg hover:bg-indigo-50 transition-colors"
                :class="activeTab === 'accountSecurity' ? 'text-indigo-600 font-medium' : 'text-gray-700'"
              >
                账号安全
              </button>
              <button 
                @click="activeTab = 'editorSetting'"
                class="w-full text-left px-4 py-2.5 text-sm rounded-lg hover:bg-indigo-50 transition-colors"
                :class="activeTab === 'editorSetting' ? 'text-indigo-600 font-medium' : 'text-gray-700'"
              >
                编辑器设置
              </button>
              <button 
                @click="activeTab = 'about'"
                class="w-full text-left px-4 py-2.5 text-sm rounded-lg hover:bg-indigo-50 transition-colors"
                :class="activeTab === 'about' ? 'text-indigo-600 font-medium' : 'text-gray-700'"
              >
                关于我们
              </button>
            </div>
          </div>
        </div>

        <!-- 右侧：内容区域 -->
        <div class="col-span-9">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <!-- 基本信息 Tab -->
            <div v-if="activeTab === 'baseInfo'">
              <div class="mb-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-1">基本信息</h2>
                <p class="text-sm text-gray-500">修改你的个人资料和展示信息</p>
              </div>

              <form @submit.prevent="saveBaseInfo">
                <div class="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
                    <input 
                      v-model="formData.username" 
                      type="text" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="请输入用户名"
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                    <input 
                      v-model="formData.email" 
                      type="email" 
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="请输入邮箱"
                    >
                  </div>
                </div>

                <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 mb-1">个人简介</label>
                  <textarea 
                    v-model="formData.bio" 
                    rows="3" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="简单介绍一下自己（选填）"
                  ></textarea>
                </div>

                <div class="flex justify-end">
                  <button 
                    type="submit" 
                    class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
                  >
                    保存修改
                  </button>
                </div>
              </form>
            </div>

            <!-- 账号安全 Tab -->
            <div v-if="activeTab === 'accountSecurity'">
              <div class="mb-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-1">账号安全</h2>
                <p class="text-sm text-gray-500">管理你的账号安全设置</p>
              </div>

              <div class="space-y-6">
                <div class="border border-gray-200 rounded-lg p-4">
                  <div class="flex justify-between items-center mb-4">
                    <div>
                      <h3 class="font-medium text-gray-800">修改密码</h3>
                      <p class="text-sm text-gray-500">建议定期更换密码，保障账号安全</p>
                    </div>
                    <button class="text-sm text-indigo-600 hover:text-indigo-700">修改</button>
                  </div>
                </div>

                <div class="border border-gray-200 rounded-lg p-4">
                  <div class="flex justify-between items-center mb-4">
                    <div>
                      <h3 class="font-medium text-gray-800">绑定手机</h3>
                      <p class="text-sm text-gray-500">{{ formData.phone || '未绑定' }}</p>
                    </div>
                    <button class="text-sm text-indigo-600 hover:text-indigo-700">{{ formData.phone ? '更换' : '绑定' }}</button>
                  </div>
                </div>

                <div class="border border-gray-200 rounded-lg p-4">
                  <div class="flex justify-between items-center mb-4">
                    <div>
                      <h3 class="font-medium text-gray-800">登录设备管理</h3>
                      <p class="text-sm text-gray-500">查看并管理当前登录设备</p>
                    </div>
                    <button class="text-sm text-indigo-600 hover:text-indigo-700">查看</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- 编辑器设置 Tab -->
            <div v-if="activeTab === 'editorSetting'">
              <div class="mb-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-1">编辑器设置</h2>
                <p class="text-sm text-gray-500">自定义你的 Markdown 编辑器体验</p>
              </div>

              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">默认字体大小</label>
                  <select 
                    v-model="editorSetting.fontSize" 
                    class="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="14px">14px（默认）</option>
                    <option value="16px">16px</option>
                    <option value="18px">18px</option>
                    <option value="20px">20px</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">默认字体</label>
                  <select 
                    v-model="editorSetting.fontFamily" 
                    class="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="system-ui">系统默认</option>
                    <option value="monospace">等宽字体（代码友好）</option>
                    <option value="Microsoft YaHei">微软雅黑</option>
                    <option value="SimSun">宋体</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">行高</label>
                  <select 
                    v-model="editorSetting.lineHeight" 
                    class="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="1.4">1.4（紧凑）</option>
                    <option value="1.6">1.6（默认）</option>
                    <option value="1.8">1.8（宽松）</option>
                  </select>
                </div>

                <div class="flex items-center">
                  <input 
                    v-model="editorSetting.autoSave" 
                    type="checkbox" 
                    id="autoSave" 
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  >
                  <label for="autoSave" class="ml-2 block text-sm text-gray-700">自动保存（每30秒）</label>
                </div>

                <div class="flex items-center">
                  <input 
                    v-model="editorSetting.showCatalog" 
                    type="checkbox" 
                    id="showCatalog" 
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  >
                  <label for="showCatalog" class="ml-2 block text-sm text-gray-700">默认显示大纲目录</label>
                </div>

                <div class="flex justify-end mt-8">
                  <button 
                    @click="saveEditorSetting" 
                    class="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors"
                  >
                    保存设置
                  </button>
                </div>
              </div>
            </div>

            <!-- 关于我们 Tab -->
            <div v-if="activeTab === 'about'">
              <div class="mb-6">
                <h2 class="text-xl font-semibold text-gray-800 mb-1">关于 Notailab</h2>
                <p class="text-sm text-gray-500">轻量级 Markdown 笔记协作平台</p>
              </div>

              <div class="space-y-4 text-sm text-gray-700">
                <p>Notailab 是一款专为开发者和创作者打造的 Markdown 笔记工具，致力于提供简洁、高效的写作体验。</p>
                <p>版本号：v1.0.0</p>
                <p>更新时间：2026-02-13</p>
                <p>联系方式：support@notailab.com</p>
                
                <div class="mt-6 pt-6 border-t border-gray-200">
                  <h3 class="font-medium text-gray-800 mb-2">隐私政策</h3>
                  <p class="text-gray-600">我们重视你的隐私保护，所有笔记数据仅存储在你的个人账户中，不会被用于其他用途。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 底部版权信息 -->
    <footer class="bg-white border-t border-gray-200 py-6 mt-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
        © 2026 Notailab. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 基础数据
const username = ref('admin')
const activeTab = ref('baseInfo')

// 用户信息
const userInfo = ref({
  role: '普通用户',
  joinTime: '2026-01-01'
})

// 用户统计数据
const userStats = ref({
  noteCount: 28,
  collectCount: 12,
  wordCount: '15,680'
})

// 表单数据
const formData = ref({
  username: 'admin',
  email: 'admin@notailab.com',
  bio: '专注于前端开发和笔记创作',
  phone: ''
})

// 编辑器设置
const editorSetting = ref({
  fontSize: '16px',
  fontFamily: 'monospace',
  lineHeight: '1.6',
  autoSave: true,
  showCatalog: true
})

// 保存基本信息
const saveBaseInfo = () => {
  alert('基本信息保存成功！')
  username.value = formData.value.username
}

// 保存编辑器设置
const saveEditorSetting = () => {
  alert('编辑器设置保存成功！')
  // 这里可以将设置存储到 localStorage 或后端
  localStorage.setItem('editorSetting', JSON.stringify(editorSetting.value))
}
</script>

<style scoped>
/* 基础样式 */
.min-h-screen { min-height: 100vh; }
.bg-slate-50 { background-color: #f8fafc; }
.bg-white { background-color: #ffffff; }
.bg-indigo-50 { background-color: #eef2ff; }
.bg-indigo-600 { background-color: #4f46e5; }
.bg-indigo-700 { background-color: #4338ca; }

/* 布局 */
.grid { display: grid; }
.grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }
.col-span-3 { grid-column: span 3 / span 3; }
.col-span-9 { grid-column: span 9 / span 9; }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.gap-2 { gap: 0.5rem; }
.gap-6 { gap: 1.5rem; }
.gap-8 { gap: 2rem; }

/* 间距 */
.mx-auto { margin-left: auto; margin-right: auto; }
.mt-2 { margin-top: 0.5rem; }
.mt-3 { margin-top: 0.75rem; }
.mt-6 { margin-top: 1.5rem; }
.mt-8 { margin-top: 2rem; }
.mb-1 { margin-bottom: 0.25rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-3 { margin-bottom: 0.75rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.ml-2 { margin-left: 0.5rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.py-2\.5 { padding-top: 0.625rem; padding-bottom: 0.625rem; }
.py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
.py-8 { padding-top: 2rem; padding-bottom: 2rem; }
.px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.px-8 { padding-left: 2rem; padding-right: 2rem; }
.p-2 { padding: 0.5rem; }
.p-4 { padding: 1rem; }
.p-6 { padding: 1.5rem; }
.pb-0\.5 { padding-bottom: 0.125rem; }

/* 边框与圆角 */
.rounded { border-radius: 0.25rem; }
.rounded-lg { border-radius: 0.5rem; }
.rounded-xl { border-radius: 0.75rem; }
.rounded-full { border-radius: 9999px; }
.border { border: 1px solid; }
.border-t { border-top: 1px solid; }
.border-b-2 { border-bottom: 2px solid; }
.border-gray-100 { border-color: #f3f4f6; }
.border-gray-200 { border-color: #e5e7eb; }
.border-gray-300 { border-color: #d1d5db; }
.border-indigo-500 { border-color: #6366f1; }
.border-indigo-600 { border-color: #4f46e5; }

/* 阴影 */
.shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }

/* 文本样式 */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }
.text-xs { font-size: 0.75rem; }
.text-sm { font-size: 0.875rem; }
.text-base { font-size: 1rem; }
.text-lg { font-size: 1.125rem; }
.text-xl { font-size: 1.25rem; }
.text-3xl { font-size: 1.875rem; }
.font-bold { font-weight: 700; }
.font-semibold { font-weight: 600; }
.font-medium { font-weight: 500; }

/* 文本颜色 */
.text-white { color: #ffffff; }
.text-gray-500 { color: #6b7280; }
.text-gray-600 { color: #4b5563; }
.text-gray-700 { color: #374151; }
.text-gray-800 { color: #1f2937; }
.text-indigo-500 { color: #6366f1; }
.text-indigo-600 { color: #4f46e5; }
.text-indigo-700 { color: #4338ca; }

/* 交互样式 */
.w-full { width: 100%; }
.max-w-7xl { max-width: 80rem; }
.max-w-xs { max-width: 20rem; }
.h-4 { height: 1rem; }
.h-8 { height: 2rem; }
.h-16 { height: 4rem; }
.h-24 { height: 6rem; }
.w-4 { width: 1rem; }
.w-8 { width: 2rem; }
.w-24 { width: 6rem; }
.flex { display: flex; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.justify-end { justify-content: flex-end; }
.space-x-6 > * + * { margin-left: 1.5rem; }
.space-y-4 > * + * { margin-top: 1rem; }
.space-y-6 > * + * { margin-top: 1.5rem; }
.sticky { position: sticky; }
.top-0 { top: 0px; }
.z-30 { z-index: 30; }
.overflow-hidden { overflow: hidden; }
.transition-colors { transition-property: color, background-color; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }

/* 悬停样式 */
.hover\:bg-indigo-50:hover { background-color: #eef2ff; }
.hover\:bg-indigo-700:hover { background-color: #4338ca; }
.hover\:text-indigo-600:hover { color: #4f46e5; }
.hover\:text-indigo-700:hover { color: #4338ca; }

/* 焦点样式 */
.focus\:outline-none:focus { outline: 2px solid transparent; outline-offset: 2px; }
.focus\:ring-1:focus { ring-width: 1px; }
.focus\:ring-indigo-500:focus { ring-color: #6366f1; }
</style>
