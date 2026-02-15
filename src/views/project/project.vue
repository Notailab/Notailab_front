<template>
  <div class="h-screen flex flex-col bg-gray-50 antialiased">
    <!-- 顶部导航栏 -->
    <header class="bg-white shadow-sm h-12 flex items-center px-4 border-b">
      <button class="mr-4 text-gray-600 hover:text-gray-800 transition-colors">←</button>
      <h1 class="text-lg font-medium text-gray-800">Python入门学习</h1>
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
import { ref } from 'vue'

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
/* 仅保留滚动条样式，无其他自定义样式 */
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 2px;
}
</style>
