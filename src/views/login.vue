<template>
  <div class="min-h-screen flex">
    <!-- 左侧品牌介绍区 - 已完美居中 -->
    <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-50 to-green-50 relative">
      <div class="absolute inset-0 flex items-center justify-center p-12">
        <div class="max-w-md w-full">
          <!-- Logo -->
          <div class="flex items-center gap-3 mb-12">
            <div class="w-8 h-8 bg-green-700 rounded flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span class="text-3xl font-bold text-gray-900">Notailab</span>
          </div>

          <!-- 核心文案 -->
          <div class="space-y-4 mb-8">
            <h1 class="text-3xl font-bold text-gray-900 leading-tight">
              The Digital Atelier for <span class="text-green-700">Curated Insights</span>.
            </h1>
            <p class="text-gray-600 text-sm leading-relaxed">
              A high-productivity space designed to treat your information as exhibits. Professional, minimalist, and built for focused growth.
            </p>
          </div>

          <!-- 功能卡片 -->
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <div class="text-green-600 mb-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 class="font-medium text-gray-900 text-sm mb-1">AI Curation</h3>
              <p class="text-xs text-gray-500">Intelligent summaries for your research archive.</p>
            </div>
            <div class="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
              <div class="text-gray-600 mb-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 class="font-medium text-gray-900 text-sm mb-1">Deep Work</h3>
              <p class="text-xs text-gray-500">Minimalist interface designed for pure focus.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 版权信息 -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-gray-400 text-xs">
        &copy; 2026 Notailab. All rights reserved.
      </div>
    </div>

    <!-- 右侧登录注册区 -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white">
      <div class="w-full max-w-sm">
        <!-- 标签切换 -->
        <div class="flex gap-6 mb-8">
          <button 
            @click="activeTab = 'login'"
            class="text-xl font-bold transition-colors"
            :class="activeTab === 'login' ? 'text-gray-900' : 'text-gray-400'"
          >
            Sign in
          </button>
          <button 
            @click="activeTab = 'register'"
            class="text-xl font-bold transition-colors"
            :class="activeTab === 'register' ? 'text-gray-900' : 'text-gray-400'"
          >
            Sign up
          </button>
        </div>

        <!-- 登录表单 -->
        <form v-if="activeTab === 'login'" class="space-y-4" @submit.prevent="handleLogin">
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-2">Username</label>
            <input
              type="text"
              v-model="loginForm.username"
              placeholder="Enter your username"
              class="w-full px-4 py-2.5 bg-gray-100 rounded border border-transparent focus:border-green-700 focus:bg-white focus:ring-0 outline-none transition text-sm"
              required
            />
          </div>

          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="block text-xs font-medium text-gray-600">Password</label>
              <a href="#" class="text-xs text-green-700 hover:underline">Forgot Password?</a>
            </div>
            <input
              type="password"
              v-model="loginForm.password"
              placeholder="••••••••"
              class="w-full px-4 py-2.5 bg-gray-100 rounded border border-transparent focus:border-green-700 focus:bg-white focus:ring-0 outline-none transition text-sm"
              required
            />
          </div>

          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="loginForm.remember"
              class="h-4 w-4 text-green-700 border-gray-300 rounded focus:ring-green-700"
            />
            <label class="ml-2 text-xs text-gray-600">Remember me</label>
          </div>

          <button
            type="submit"
            class="w-full py-2.5 bg-green-700 text-white rounded font-medium hover:bg-green-800 transition-colors shadow-md shadow-green-700/20 text-sm"
          >
            Sign in
          </button>
        </form>

        <!-- 注册表单 -->
        <form v-else class="space-y-4" @submit.prevent="handleRegister">
          <div>
            <label class="block text-xs font-medium text-gray-600 mb-2">Username</label>
            <input
              type="text"
              v-model="registerForm.username"
              placeholder="Create your username"
              class="w-full px-4 py-2.5 bg-gray-100 rounded border border-transparent focus:border-green-700 focus:bg-white focus:ring-0 outline-none transition text-sm"
              required
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-600 mb-2">Email</label>
            <input
              type="email"
              v-model="registerForm.email"
              placeholder="Enter your email"
              class="w-full px-4 py-2.5 bg-gray-100 rounded border border-transparent focus:border-green-700 focus:bg-white focus:ring-0 outline-none transition text-sm"
              required
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-600 mb-2">Password</label>
            <input
              type="password"
              v-model="registerForm.password"
              placeholder="Create password"
              class="w-full px-4 py-2.5 bg-gray-100 rounded border border-transparent focus:border-green-700 focus:bg-white focus:ring-0 outline-none transition text-sm"
              required
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-gray-600 mb-2">Confirm Password</label>
            <input
              type="password"
              v-model="registerForm.confirmPwd"
              placeholder="Confirm your password"
              class="w-full px-4 py-2.5 bg-gray-100 rounded border border-transparent focus:border-green-700 focus:bg-white focus:ring-0 outline-none transition text-sm"
              required
            />
          </div>

          <div class="flex items-center">
            <input
              type="checkbox"
              v-model="registerForm.agreeProtocol"
              class="h-4 w-4 text-green-700 border-gray-300 rounded focus:ring-green-700"
              required
            />
            <label class="ml-2 text-xs text-gray-600">
              I agree to <a href="#" class="text-green-700">Terms</a> and <a href="#" class="text-green-700">Privacy Policy</a>
            </label>
          </div>

          <button
            type="submit"
            class="w-full py-2.5 bg-green-700 text-white rounded font-medium hover:bg-green-800 transition-colors shadow-md shadow-green-700/20 text-sm"
          >
            Create account
          </button>
        </form>

        <!-- 底部链接 -->
        <div class="mt-16 flex justify-center gap-8 text-xs text-gray-400">
          <a href="#" class="hover:text-gray-600 transition">PRIVACY</a>
          <a href="#" class="hover:text-gray-600 transition">TERMS</a>
          <a href="#" class="hover:text-gray-600 transition">CONTACT</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLogin } from '@/composables/useLogin'

const { activeTab, loginForm, registerForm, handleLogin, handleRegister } = useLogin()
</script>

<style scoped>
</style>