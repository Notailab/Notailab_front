// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  // 路径别名（解决 @ 指向 src）
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  // 代理配置（核心：消除跨域）
  server: {
    proxy: {
      // 匹配所有以 /api 开头的请求
      '/api': {
        target: 'http://localhost:8080', // 你的 Go 后端地址
        changeOrigin: true, // 开启代理（关键，模拟后端请求的 Origin）
        // rewrite: (path) => path.replace(/^\/api/, '') // 可选：如果后端路由没有 /api 前缀，就解开注释
      }
    }
  }
})
