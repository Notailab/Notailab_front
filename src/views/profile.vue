<template>
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

    <!-- 主要内容区 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow ">
      <div class="grid grid-cols-12 gap-8 ">
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

      <div class="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">

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
