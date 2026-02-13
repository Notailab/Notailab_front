<template>
  <div class="h-screen flex flex-col bg-[#f7f8fa]">
    <!-- 顶部标题栏（Notailab 主题） -->
    <div class="h-14 bg-white border-b border-gray-200 flex items-center px-6 justify-between shadow-sm">
        <div class="flex items-center">
        <svg class="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
        <span class="ml-2 text-xl font-semibold text-gray-800">Notailab</span>
        </div>
      <div class="flex items-center gap-4">
        <span class="text-xs text-gray-500">字数：{{ text.length }}</span>
        <button @click="resetForm" class="text-sm px-3 py-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-50">重置</button>
        <button @click="saveNote" class="text-sm px-4 py-1.5 rounded bg-indigo-600 text-white hover:bg-indigo-700">保存笔记</button>
      </div>
    </div>

    <!-- 主体：双栏布局（大纲 + 编辑器） -->
    <div class="flex flex-1 overflow-hidden">
      <!-- 左侧：大纲目录 -->
      <div class="w-56 bg-white border-r border-gray-200 p-4 overflow-y-auto">
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

      <!-- 右侧：编辑器（占满剩余空间） -->
      <div class="flex-1 overflow-hidden">
        <MdEditor
          v-model="text"
          :id="editorId"
          placeholder="开始编写你的笔记..."
          :style="{ height: 'calc(100vh - 3.5rem)' }"
          :toolbars="toolbars"
          class="w-full"
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

<style scoped>
/* 基础样式 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.h-screen { height: 100vh; }
.h-14 { height: 3.5rem; }
.w-56 { width: 14rem; }
.w-full { width: 100%; }

/* Flex 布局 */
.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-1 { flex: 1; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.gap-3 { gap: 0.75rem; }
.gap-4 { gap: 1rem; }

/* 溢出处理 */
.overflow-hidden { overflow: hidden; }
.overflow-y-auto { overflow-y: auto; }

/* 背景与边框 */
.bg-white { background-color: #fff; }
.bg-\[\#f7f8fa\] { background-color: #f7f8fa; }
.border-b { border-bottom: 1px solid; }
.border-r { border-right: 1px solid; }
.border-gray-200 { border-color: #e5e7eb; }
.shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }

/* 圆角与内边距 */
.rounded { border-radius: 0.25rem; }
.p-4 { padding: 1rem; }
.p-6 { padding: 1.5rem; }
.px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.py-1\.5 { padding-top: 0.375rem; padding-bottom: 0.375rem; }
.mb-3 { margin-bottom: 0.75rem; }
.mr-2 { margin-right: 0.5rem; }

/* 文本样式 */
.text-xs { font-size: 0.75rem; }
.text-sm { font-size: 0.875rem; }
.text-xl { font-size: 1.25rem; }
.font-semibold { font-weight: 600; }
.text-gray-500 { color: #6b7280; }
.text-gray-600 { color: #4b5563; }
.text-gray-700 { color: #374151; }
.text-gray-800 { color: #1f2937; }
.text-indigo-500 { color: #6366f1; }
.text-indigo-600 { color: #4f46e5; }
.text-white { color: #fff; }

/* 交互样式 */
.hover\:bg-gray-50:hover { background-color: #f9fafb; }
.hover\:bg-indigo-700:hover { background-color: #4338ca; }
</style>
