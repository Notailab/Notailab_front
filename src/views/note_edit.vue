<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">

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
                <button @click="resetForm" class="text-sm px-3 py-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-50">重置</button>
                <button @click="saveNote" class="text-sm px-4 py-1.5 rounded bg-indigo-600 text-white hover:bg-indigo-700">保存笔记</button>
            </div>
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

    <!-- 主体：双栏布局（大纲 + 编辑器） -->
    <div class="flex flex-1 overflow-hidden">
      <!-- 左侧：大纲目录 -->
      <div class="w-72 h-[calc(100vh-3.5rem)] bg-white border-r border-gray-200 p-4 overflow-y-auto">
        <div class="text-sm font-semibold text-gray-700 mb-3 flex items-center">
          <svg class="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          文章大纲
        </div>
        <MdCatalog
          :editor-id="editorId"
          :scroll-element="scrollElement"
          class="text-sm"
        />
      </div>

      <!-- Markdown编辑器（https://imzbf.github.io/md-editor-v3/zh-CN/api） -->
      <div class="flex flex-1 overflow-hidden rounded-xl">
        <MdEditor
          v-model="text"
          :id="editorId"
          :style="{ height: 'calc(100vh - 3.5rem)' }"
          showToolbarName = true
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { MdEditor, MdCatalog } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

// 编辑器ID
const editorId = 'notailab-editor'
// 滚动元素
const scrollElement = ref(document.documentElement)
// 编辑内容
const text = ref('# JavaScript 异步编程\n\n## Promise\nPromise 是异步编程的一种方案...')
// 官方示例的完整工具栏配置
const toolbars = [
  'bold', 'underline', 'italic', 'strikeThrough', '-',
  'title', 'sub', 'sup', 'quote', 'unorderedList', 'orderedList', 'task', '-',
  'codeRow', 'code', 'link', 'image', 'table', 'mermaid', 'katex', '-',
  'revoke', 'next', 'save', '=',
  'pageFullscreen', 'fullscreen', 'preview', 'previewOnly', 'htmlPreview', 'catalog', 'github',
]

// 保存笔记
const saveNote = () => {
  if (!text.value.trim()) {
    alert('请输入笔记内容！')
    return
  }
  alert('笔记保存成功！')
}

// 重置表单
const resetForm = () => {
  if (confirm('确定重置？所有内容将被清空')) {
    text.value = ''
  }
}

onMounted(() => {
  scrollElement.value = document.querySelector('.md-editor') || document.documentElement
})
</script>
