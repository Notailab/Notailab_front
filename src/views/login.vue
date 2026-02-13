<template>
  <!-- 主容器：渐变背景 + 网格纹理 + 动态光斑 -->
  <div class="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- 1. 网格纹理背景（时尚低透明度网格） -->
    <div class="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none"></div>
    
    <!-- 2. 动态漂浮光斑（多个随机位置的模糊光球） -->
    <div class="absolute top-[10%] left-[15%] w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
    <div class="absolute bottom-[20%] right-[10%] w-80 h-80 bg-purple-400/15 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 1s"></div>
    <div class="absolute top-[40%] right-[20%] w-48 h-48 bg-blue-400/10 rounded-full blur-3xl animate-pulse-slow" style="animation-delay: 2s"></div>
    
    <!-- 3. 漂浮粒子装饰（小点点） -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-[5%] left-[5%] w-2 h-2 bg-white/20 rounded-full"></div>
      <div class="absolute top-[15%] right-[25%] w-1 h-1 bg-white/20 rounded-full"></div>
      <div class="absolute bottom-[30%] left-[20%] w-1.5 h-1.5 bg-white/20 rounded-full"></div>
      <div class="absolute bottom-[10%] right-[30%] w-2 h-2 bg-white/20 rounded-full"></div>
      <div class="absolute top-[70%] left-[40%] w-1 h-1 bg-white/20 rounded-full"></div>
    </div>

    <!-- 登录/注册卡片：毛玻璃效果 -->
    <div class="max-w-md w-full relative z-10">
      <div class="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 space-y-8 border border-white/20">
        <!-- 头部：登录/注册标签切换 -->
        <div class="text-center">
          <!-- 图标 -->
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-600 text-white mb-4 shadow-lg">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          
          <h2 class="text-3xl font-bold text-gray-900">Notailab</h2>
          <!-- 标签切换 -->
          <div class="flex justify-center mb-2">
            <button 
              @click="activeTab = 'login'"
              class="px-6 py-1.5 rounded-t-lg text-lg font-medium transition-colors"
              :class="activeTab === 'login' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'"
            >
              登录
            </button>
            <button 
              @click="activeTab = 'register'"
              class="px-6 py-1.5 rounded-t-lg text-lg font-medium transition-colors"
              :class="activeTab === 'register' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'"
            >
              注册
            </button>
          </div>
          <p class="mt-2 text-sm text-gray-600">
            {{ activeTab === 'login' ? '登录后记录你的学习成长' : '注册账号开始使用' }}
          </p>
        </div>

        <!-- 登录表单 -->
        <form v-if="activeTab === 'login'" class="space-y-6" @submit.prevent="handleLogin">
          <div class="space-y-4">
            <!-- 用户名输入框 -->
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
                  </svg>
                </div>
                <input
                  id="username"
                  type="text"
                  v-model="loginForm.username"
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  placeholder="请输入用户名"
                  required
                />
              </div>
            </div>

            <!-- 密码输入框 -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-1">密码</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8 0H7v2h6V9z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  v-model="loginForm.password"
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  placeholder="请输入密码"
                  required
                />
              </div>
            </div>
          </div>

          <!-- 记住密码 & 忘记密码 -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                v-model="loginForm.remember"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900">记住密码</label>
            </div>
            <div class="text-sm">
              <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">忘记密码？</a>
            </div>
          </div>

          <!-- 登录按钮（带微交互） -->
          <button
            type="submit"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            登录
          </button>
        </form>

        <!-- 注册表单 -->
        <form v-if="activeTab === 'register'" class="space-y-6" @submit.prevent="handleRegister">
          <div class="space-y-4">
            <!-- 用户名输入框 -->
            <div>
              <label for="reg-username" class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"></path>
                  </svg>
                </div>
                <input
                  id="reg-username"
                  type="text"
                  v-model="registerForm.username"
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  placeholder="请设置用户名（3-16位）"
                  required
                />
              </div>
            </div>

            <!-- 邮箱输入框 -->
            <div>
              <label for="reg-email" class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </div>
                <input
                  id="reg-email"
                  type="email"
                  v-model="registerForm.email"
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  placeholder="请输入邮箱（用于找回密码）"
                  required
                />
              </div>
            </div>

            <!-- 密码输入框 -->
            <div>
              <label for="reg-password" class="block text-sm font-medium text-gray-700 mb-1">密码</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8 0H7v2h6V9z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <input
                  id="reg-password"
                  type="password"
                  v-model="registerForm.password"
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  placeholder="请设置密码（6-16位）"
                  required
                />
              </div>
            </div>

            <!-- 确认密码输入框 -->
            <div>
              <label for="reg-confirm-pwd" class="block text-sm font-medium text-gray-700 mb-1">确认密码</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8 0H7v2h6V9z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                <input
                  id="reg-confirm-pwd"
                  type="password"
                  v-model="registerForm.confirmPwd"
                  class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  placeholder="请再次输入密码"
                  required
                />
              </div>
            </div>
          </div>

          <!-- 同意协议 -->
          <div class="flex items-center">
            <input
              id="agree-protocol"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              v-model="registerForm.agreeProtocol"
              required
            />
            <label for="agree-protocol" class="ml-2 block text-sm text-gray-900">
              我已阅读并同意<a href="#" class="text-indigo-600 hover:text-indigo-500">《用户协议》</a>和<a href="#" class="text-indigo-600 hover:text-indigo-500">《隐私政策》</a>
            </label>
          </div>

          <!-- 注册按钮（带微交互） -->
          <button
            type="submit"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          >
            注册
          </button>
        </form>
      </div>

      <!-- 页脚版权 -->
      <p class="mt-8 text-center text-sm text-white/80">
        &copy; 2025 Notailab. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' // 导入路由跳转工具

// 标签切换：login/register
const activeTab = ref('login')

// 登录表单数据
const loginForm = ref({
  username: '',
  password: '',
  remember: false
})

// 注册表单数据
const registerForm = ref({
  username: '',
  email: '',
  password: '',
  confirmPwd: '',
  agreeProtocol: false
})

// 获取路由实例（用于跳转页面）
const router = useRouter()

// 模拟用户数据库（实际项目替换为后端接口）
const userDB = ref([
  { username: 'admin', password: '123456', email: 'admin@notailab.com' }
])

// 登录逻辑
const handleLogin = () => {
  // 1. 空值验证
  if (!loginForm.value.username.trim()) {
    alert('请输入用户名！')
    return
  }
  if (!loginForm.value.password.trim()) {
    alert('请输入密码！')
    return
  }

  // 2. 验证用户
  const user = userDB.value.find(item => 
    item.username === loginForm.value.username && item.password === loginForm.value.password
  )

  if (user) {
    // 登录成功
    alert('登录成功！即将进入系统')
    router.push('/home') // 跳转到首页
  } else {
    // 登录失败
    alert('用户名或密码错误！\n测试账号：admin，密码：123456')
    loginForm.value.password = '' // 清空密码
  }
}

// 注册逻辑
const handleRegister = () => {
  // 1. 基础验证
  if (!registerForm.value.username.trim()) {
    alert('请输入用户名！')
    return
  }
  if (registerForm.value.username.length < 3 || registerForm.value.username.length > 16) {
    alert('用户名长度需在3-16位之间！')
    return
  }
  if (!registerForm.value.email.trim()) {
    alert('请输入邮箱！')
    return
  }
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(registerForm.value.email)) {
    alert('请输入有效的邮箱地址！')
    return
  }
  if (!registerForm.value.password.trim()) {
    alert('请输入密码！')
    return
  }
  if (registerForm.value.password.length < 6 || registerForm.value.password.length > 16) {
    alert('密码长度需在6-16位之间！')
    return
  }
  if (registerForm.value.password !== registerForm.value.confirmPwd) {
    alert('两次输入的密码不一致！')
    return
  }
  if (!registerForm.value.agreeProtocol) {
    alert('请阅读并同意用户协议和隐私政策！')
    return
  }

  // 2. 检查用户名/邮箱是否已存在
  const usernameExist = userDB.value.some(item => item.username === registerForm.value.username)
  const emailExist = userDB.value.some(item => item.email === registerForm.value.email)
  
  if (usernameExist) {
    alert('该用户名已被注册！')
    return
  }
  if (emailExist) {
    alert('该邮箱已被注册！')
    return
  }

  // 3. 注册成功
  userDB.value.push({
    username: registerForm.value.username,
    password: registerForm.value.password,
    email: registerForm.value.email
  })
  
  alert('注册成功！请登录')
  // 清空注册表单并切回登录标签
  registerForm.value = {
    username: '',
    email: '',
    password: '',
    confirmPwd: '',
    agreeProtocol: false
  }
  activeTab.value = 'login'
}
</script>

<style scoped>
/* 自定义网格背景样式 */
.bg-grid-white\/\[0\.05\] {
  background-image: linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 24px 24px;
}

/* 自定义慢脉冲动画 */
.animate-pulse-slow {
  animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}
</style>
