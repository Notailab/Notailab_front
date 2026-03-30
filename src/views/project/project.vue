<template>
  <div class="min-h-screen bg-gray-50 flex flex-col relative">
    <!-- 顶部导航栏（不变） -->
    <header class="bg-white border-b border-gray-100">
      <div class="flex items-center justify-between px-6 py-3">
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 bg-emerald-700 rounded flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span class="font-semibold text-gray-900 text-sm">Notailab</span>
          </div>
          <div class="flex items-center gap-4">
            <button class="text-emerald-700 text-sm font-medium border-b-2 border-emerald-700 pb-1">Dashboard</button>
            <button class="text-gray-500 text-sm hover:text-gray-700">Stats</button>
            <button class="text-gray-500 text-sm hover:text-gray-700">Settings</button>
          </div>
        </div>

        <div class="flex items-center gap-2 text-xs text-gray-500">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <span>{{ projectTitle }}</span>
          <span>/</span>
          <span class="text-gray-900 font-medium">{{ currentFile.name || 'Untitled' }}</span>
        </div>

        <div class="flex items-center gap-4">
          <div class="relative">
            <input
              type="text"
              placeholder="Search documentation..."
              class="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 w-64"
            />
            <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button class="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button class="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
          <div class="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
            <img v-if="userInfo.avatar" :src="userInfo.avatar" class="w-full h-full object-cover">
            <div v-else class="w-full h-full flex items-center justify-center text-gray-600 text-sm">
              {{ userInfo.username?.charAt(0) || 'U' }}
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <!-- 左侧边栏（不变） -->
      <aside class="w-56 bg-white border-r border-gray-100 flex flex-col">
        <div class="p-4">
          <button class="w-full flex items-center justify-center gap-2 bg-emerald-700 text-white py-2 rounded hover:bg-emerald-800 transition text-sm"
            @click="handleNewFile"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            New File
          </button>
        </div>
        <nav class="flex-1 p-4 border-t border-gray-100 overflow-y-auto">
          <button
            v-for="file in fileList"
            :key="file.file_id"
            @click="handleOpenFile(file)"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm"
            :class="currentFile.file_id === file.file_id ? 'font-medium bg-gray-50' : 'text-gray-600 hover:bg-gray-50'"
          >
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span class="truncate">{{ file.name }}</span>
          </button>
          <div v-if="fileList.length === 0" class="text-xs text-gray-400 text-center py-4">No files yet</div>
        </nav>
        <div class="p-4 border-t border-gray-100 space-y-3">
          <button class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 text-sm">Help Center</button>
          <button class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 text-sm">Logout</button>
        </div>
      </aside>

      <!-- 右侧主区域 -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- 工具栏 -->
        <div class="bg-white border-b border-gray-100 px-6 py-2 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <button
              v-if="currentFile?.file_id"
              @click="handleDeleteFile"
              class="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm flex items-center justify-center hover:text-red-500 transition"
              title="删除当前文件"
            >
              <span v-html="toolbarIcons.delete"></span>
            </button>
          </div>
          <div class="flex items-center gap-2">
            <div class="flex items-center gap-2">
              <template v-for="(t, idx) in editorToolbars" :key="idx">
                <button
                  v-if="t !== '-' && t !== '='"
                  @click="handleToolbarClick(t)"
                  class="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm flex items-center justify-center"
                >
                  <span v-html="toolbarIcons[t] || t"></span>
                </button>
                <div v-else-if="t === '-'" class="w-px h-6 bg-gray-200 mx-1"></div>
                <div v-else-if="t === '='" class="w-4"></div>
              </template>
            </div>
            <button @click="handleSave" class="px-4 py-1.5 bg-emerald-700 text-white rounded text-sm">Save</button>
          </div>
        </div>

        <!-- ====================== 核心布局 ====================== -->
        <div class="flex-1 p-6 overflow-hidden">
          <!-- AI 关闭：编辑器居中 -->
          <div v-if="!showAIChat" class="h-full flex justify-center">
            <div :class="['w-full', centerEditorMaxClass, 'bg-white', 'rounded-lg', 'h-full']">
              <MdEditor
                ref="mdEditorRef"
                v-model="editorContent"
                :style="{ height: 'calc(100vh - 14rem)' }"
                theme="light" language="zh-CN" :toolbars="[]" footers="" :preview="isPreview"
              />
            </div>
          </div>

          <!-- AI 打开：编辑器 + AI 左右并排 -->
          <div v-else class="h-full flex items-stretch gap-3" id="drag-container">
            <div class="bg-white rounded-lg h-full" :style="{ width: `${editorWidth}%`, flexShrink: 0 }">
              <MdEditor
                ref="mdEditorRef"
                v-model="editorContent"
                :style="{ height: 'calc(100vh - 14rem)' }"
                theme="light" language="zh-CN" :toolbars="[]" footers="" :preview="isPreview"
              />
            </div>

            <div class="w-1 bg-gray-200 hover:bg-emerald-500 cursor-col-resize" @mousedown="startDrag"></div>

            <div class="flex-1 bg-white rounded-lg h-full flex flex-col overflow-hidden">
              <div class="px-4 py-3 border-b border-gray-100 bg-emerald-50 flex justify-between items-center">
                <h3 class="text-sm font-semibold text-emerald-800">AI Assistant</h3>
                <button @click="showAIChat = false" class="text-gray-500">✕</button>
              </div>
              <div class="flex-1 p-4 overflow-y-auto space-y-4">
                <div v-for="(msg, idx) in messages" :key="idx" class="flex flex-col" :class="msg.role === 'user' ? 'items-end' : 'items-start'">
                  <div class="max-w-[85%] px-3 py-2 rounded-lg text-sm"
                    :class="msg.role === 'user' ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'">
                    {{ msg.content }}
                  </div>
                </div>
                <div v-if="loading" class="text-sm text-gray-500">Thinking...</div>
              </div>
              <div class="p-3 border-t border-gray-100">
                <div class="flex gap-2">
                  <input v-model="inputMsg" @keyup.enter="sendMessage" placeholder="Enter question..." class="flex-1 px-3 py-2 bg-gray-100 rounded-lg text-sm outline-none">
                  <button @click="sendMessage" :disabled="!inputMsg.trim()" class="px-3 py-2 bg-emerald-600 text-white rounded-lg text-sm">Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部状态栏 -->
        <div class="bg-gray-50 border-t border-gray-100 px-6 py-2 text-xs text-gray-500">
          <div class="flex justify-between">
            <div>Saved to Cloud</div>
            <div>1,248 Words</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右下角 AI 按钮：关闭时显示 -->
    <button
      v-if="!showAIChat"
      @click="showAIChat = true"
      class="fixed right-6 bottom-6 w-14 h-14 bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-emerald-700 z-50"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v9a2 2 0 01-2 2h-4l-4 4z" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { useNoteEditor } from '@/composables/useNoteEditor'
import { useUserInfo } from '@/composables/useUserInfo'
import { createFile } from '@/api/file'
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { toastSuccess, toastError } from '@/utils/toast'

const route = useRoute()
const projectTitle = route.params.projecttitle
const projectId = route.params.projectid

const { fileList, currentFile, openFile, saveFile, fetchFiles, removeFile } = useNoteEditor()
const { userInfo, fetchUserInfo } = useUserInfo()
fetchUserInfo()

const editorContent = ref('')
const showAIChat = ref(false)
const editorWidth = ref(65)
const isPreview = ref(false)
const mdEditorRef = ref(null)
const editorToolbars = [
  'bold', 'italic', 'underline', '-',
  'unorderedList', 'orderedList', '-',
  'code', 'codeRow', 'link', 'image', 'table', '-',
  'preview'
]

const handleToolbarClick = async (key) => {
  try {
    if (key === 'preview') {
      return togglePreview()
    }

    const editor = mdEditorRef.value
    if (!editor) {
      toastError('编辑器实例不可用')
      return
    }

    if (typeof editor.execCommand === 'function') {
      editor.execCommand(key)
      return
    }
    if (typeof editor.command === 'function') {
      editor.command(key)
      return
    }
    if (typeof editor[key] === 'function') {
      editor[key]()
      return
    }

    toastError('该工具暂不支持：' + key)
  } catch (err) {
    toastError('工具执行出错：' + err)
  }
}

const centerEditorMaxClass = computed(() => {
  return isPreview.value ? 'max-w-[1800px]' : 'max-w-4xl'
})

const toolbarIcons = {
  bold: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4h7a4 4 0 010 8H6z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h8a4 4 0 010 8H6z"></path></svg>',
  italic: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 4h6"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 20h6"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 4L10 20"></path></svg>',
  underline: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4v6a6 6 0 0012 0V4"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 20h16"></path></svg>',
  unorderedList: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8 6h13M8 12h13M8 18h13" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M3 6h.01M3 12h.01M3 18h.01" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>',
  orderedList: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M8 6h13M8 12h13M8 18h13" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><path d="M4 6v.01M4 12v.01M4 18v.01" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>',
  code: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 18l6-6-6-6"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 6L2 12l6 6"></path></svg>',
  codeRow: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="6" width="18" height="12" rx="2"></rect></svg>',
  link: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14a5 5 0 007.07 0l1.42-1.42"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10a5 5 0 00-7.07 0L5.51 11.42"></path></svg>',
  image: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="14" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-5.2-5.2"></path></svg>',
  table: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M3 9h18M9 3v18" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg>',
  preview: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8S2 12 2 12z" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><circle cx="12" cy="12" r="3" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle></svg>',
  delete: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862A2 2 0 015.867 19.142L5 7m5 4v6m4-6v6M10 7h4"></path></svg>',
}

const togglePreview = async () => {
  const editor = mdEditorRef.value
  if (editor && typeof editor.togglePreview === 'function') {
    editor.togglePreview()
    await nextTick()
    if (editor.preview !== undefined) {
      isPreview.value = !!editor.preview
      return
    }
  }
  isPreview.value = !isPreview.value
}

const handleNewFile = () => {
  editorContent.value = ''
  currentFile.value = {}
}

// 切换文件
const handleOpenFile = (file) => {
  openFile(file)
  editorContent.value = file.content || ''
}

// 发布
const handleSave = async () => {
  if (currentFile.value?.file_id) {
    await saveFile(editorContent.value || '')
    toastSuccess('Saved')
    return
  }
  const fullName = prompt('Enter file name (e.g. note.md)')
  if (!fullName) return
  try {
    const res = await createFile({
      project_id: +projectId, name: fullName, content: editorContent.value
    })
    if (res.code === 200) {
      toastSuccess('Created')
      await fetchFiles()
    }
  } catch (e) {
    toastError('Failed' + e)
  }
}

// ======================================
// 删除当前文件
// ======================================
const handleDeleteFile = async () => {
  if (!currentFile.value?.file_id) return

  const confirmDel = confirm('确定要删除这个文件吗？此操作不可恢复！')
  if (!confirmDel) return

  try {
    const res = await removeFile(currentFile.value.file_id)
    if (res) {
      editorContent.value = ''
      currentFile.value = {}
    } 
  } catch (err) {
    toastError('删除失败，请重试')
  }
}

// 拖拽
let isDragging = false
const startDrag = () => (isDragging = true)
const stopDrag = () => (isDragging = false)
const onDrag = (e) => {
  if (!isDragging) return
  const container = document.getElementById('drag-container')
  const rect = container.getBoundingClientRect()
  const per = ((e.clientX - rect.left) / rect.width) * 100
  editorWidth.value = Math.max(30, Math.min(75, per))
}

onMounted(() => {
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', stopDrag)
})
onUnmounted(() => {
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
})

// AI 聊天
const inputMsg = ref('')
const messages = ref([{ role: 'ai', content: '你好！我是 AI 助手～' }])
const loading = ref(false)

const sendMessage = async () => {
  const msg = inputMsg.value.trim()
  if (!msg) return
  messages.value.push({ role: 'user', content: msg })
  inputMsg.value = ''
  loading.value = true
  setTimeout(() => {
    messages.value.push({ role: 'ai', content: `我收到了：${msg}` })
    loading.value = false
  }, 700)
}
</script>

<style>
.md-editor { border: none !important; }
.md-editor-wrapper { border: none !important; }
</style>