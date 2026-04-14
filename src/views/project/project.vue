<template>
  <div class="min-h-screen flex flex-col bg-[#f6f8f5] text-slate-900 relative">
    <SiteHeader
      active-tab="dashboard"
      :tabs="headerTabs"
      @logo-click="router.push('/home')"
      @tab-click="handleHeaderTabClick"
    >
      <template #center>
        <div class="flex min-w-0 items-center gap-2 text-xs text-slate-500">
          <svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          <span class="truncate">{{ projectTitle }}</span>
          <span>/</span>
          <span class="font-medium text-slate-900">{{ currentFile.name || 'Untitled' }}</span>
        </div>
      </template>

      <template #right>
        <div class="relative hidden md:block">
          <input
            type="text"
            placeholder="Search documentation..."
            class="w-64 rounded-lg bg-slate-100 py-2 pl-10 pr-4 text-sm outline-none transition focus:bg-white focus:ring-2 focus:ring-emerald-500"
          />
          <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button class="rounded-full p-2 text-slate-500 transition hover:bg-slate-100" type="button">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <button class="rounded-full p-2 text-slate-500 transition hover:bg-slate-100" type="button">
          <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <button class="h-8 w-8 overflow-hidden rounded-full bg-slate-200" type="button">
          <img v-if="userInfo.avatar" :src="userInfo.avatar" class="h-full w-full object-cover">
          <div v-else class="flex h-full w-full items-center justify-center text-sm font-semibold text-slate-600">
            {{ userInfo.username?.charAt(0)?.toUpperCase() || 'U' }}
          </div>
        </button>
      </template>
    </SiteHeader>

    <div class="flex flex-1 overflow-hidden">
      <!-- 左侧边栏（不变） -->
      <aside class="flex w-56 flex-col overflow-hidden border border-slate-200 bg-white shadow-sm">
        <div class="p-4">
          <button class="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 py-2.5 text-sm text-white shadow-sm transition hover:bg-emerald-800"
            @click="handleNewFile"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            New File
          </button>
        </div>
        <nav class="flex-1 overflow-y-auto border-t border-slate-200 p-4">
          <button
            v-for="file in fileList"
            :key="file.file_id"
            @click="handleOpenFile(file)"
            class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition"
            :class="currentFile.file_id === file.file_id ? 'bg-slate-50 font-medium text-slate-900' : 'text-slate-600 hover:bg-slate-50'"
          >
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span class="truncate">{{ file.name }}</span>
          </button>
          <div v-if="fileList.length === 0" class="py-4 text-center text-xs text-slate-400">No files yet</div>
        </nav>
        <div class="space-y-3 border-t border-slate-200 p-4">
          <button class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50">Help Center</button>
          <button class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-50">Logout</button>
        </div>
      </aside>

      <!-- 右侧主区域 -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- 工具栏 -->
        <div class="mb-3 flex items-center justify-between border bg-white px-4 py-2 shadow-sm lg:px-5">
          <div class="flex items-center">
            <button
              v-if="currentFile?.file_id"
              @click="handleDeleteFile"
              class="flex items-center justify-center rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-600 transition hover:text-red-500 hover:bg-slate-200"
              title="删除当前文件"
            >
              <span v-html="toolbarIcons.delete"></span>
            </button>
          </div>
          <div class="flex items-center">
            <div class="flex items-center gap-2">
              <template v-for="(t, idx) in editorToolbars" :key="idx">
                <button
                  v-if="t !== '-' && t !== '='"
                  @click="handleToolbarClick(t)"
                  class="flex items-center justify-center rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-200"
                >
                  <span v-html="toolbarIcons[t] || t"></span>
                </button>
                <div v-else-if="t === '-'" class="mx-1 h-6 w-px bg-slate-200"></div>
                <div v-else-if="t === '='" class="w-4"></div>
              </template>
            </div>
            <button @click="handleSave" class="ml-3 rounded-xl bg-emerald-700 px-4 py-2 text-sm text-white shadow-sm transition hover:bg-emerald-800">Save</button>
          </div>
        </div>

        <!-- ====================== 核心布局 ====================== -->
        <div class="flex-1 overflow-hidden min-h-0">
          <!-- AI 关闭：编辑器居中 -->
          <div v-if="!showAIChat" class="flex h-full min-h-0 justify-center overflow-hidden">
            <div :class="['project-md-editor', 'h-full', 'min-h-0', 'w-full', centerEditorMaxClass, 'border', 'border-slate-200', 'bg-white', 'shadow-sm']">
              <MdEditor
                ref="mdEditorRef"
                v-model="editorContent"
                :style="{ height: 'calc(100vh - 14rem)' }"
                theme="light" language="zh-CN" :toolbars="[]" footers="" :preview="isPreview"
              />
            </div>
          </div>

          <!-- AI 打开：编辑器 + AI 左右并排 -->
          <div v-else class="h-full min-h-0 flex items-stretch gap-0 overflow-hidden" id="drag-container">
            <div class="project-md-editor h-full min-h-0 border-slate-200 bg-white shadow-sm" :style="{ width: `${editorWidth}%`, flexShrink: 0 }">
              <MdEditor
                ref="mdEditorRef"
                v-model="editorContent"
                :style="{ height: 'calc(100vh - 14rem)' }"
                theme="light" language="zh-CN" :toolbars="[]" footers="" :preview="isPreview"
              />
            </div>

            <div class="w-1 cursor-col-resize bg-slate-200 hover:bg-emerald-500" @mousedown="startDrag"></div>

            <div class="flex h-full min-h-0 flex-1 flex-col overflow-hidden border bg-white shadow-sm">
              <div class="flex items-center justify-between border-b bg-emerald-50 px-4 py-3">
                <h3 class="text-sm font-semibold text-emerald-800">AI Assistant</h3>
                <button @click="showAIChat = false" class="text-slate-500">✕</button>
              </div>
              <div class="flex-1 space-y-4 overflow-y-auto p-4">
                <div v-for="(msg, idx) in messages" :key="idx" class="flex flex-col" :class="msg.role === 'user' ? 'items-end' : 'items-start'">
                  <div class="max-w-[85%] px-3 py-2 rounded-md text-sm"
                    :class="msg.role === 'user' ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'">
                    <span v-if="msg.role === 'user'">{{ msg.content }}</span>
                    <span v-else v-html="formatAssistantMessage(msg.content)"></span>
                  </div>
                </div>
                <div v-if="loading" class="text-sm text-slate-500">Thinking...</div>
              </div>
              <div class="border-t border-slate-200 p-3">
                <div class="flex gap-2">
                  <input v-model="inputMsg" @keyup.enter="sendMessage" placeholder="Enter question..." class="flex-1 rounded-xl bg-slate-100 px-3 py-2 text-sm outline-none">
                  <button @click="sendMessage" :disabled="!inputMsg.trim()" class="rounded-xl bg-emerald-600 px-3 py-2 text-sm text-white transition hover:bg-emerald-700">Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部状态栏 -->
        <div class="mt-3 border bg-white px-4 py-3 text-xs text-slate-500 shadow-sm lg:px-5">
          <div class="flex justify-between">
            <div class="flex items-center gap-2">
              <span
                class="inline-block h-2.5 w-2.5 rounded-full"
                :class="hasUnsavedChanges ? 'bg-red-500' : 'bg-emerald-500'"
              ></span>
              <span>{{ hasUnsavedChanges ? 'Need to Save' : 'Saved to Cloud' }}</span>
            </div>
            <div>{{ displayWordCount }} Words</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右下角 AI 按钮：关闭时显示 -->
    <button
      v-if="!showAIChat"
      @click="showAIChat = true"
      class="fixed right-6 bottom-16 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-700"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v9a2 2 0 01-2 2h-4l-4 4z" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { useNoteEditor } from '@/composables/useNoteEditor'
import { useUserInfo } from '@/composables/useUserInfo'
import { createFile } from '@/api/file'
import { chatWithAgent } from '@/api/agent'
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import { toastSuccess, toastError } from '@/utils/toast'
import { headerTabs, createHeaderTabClickHandler } from '@/composables/useHeaderNavigation'
import SiteHeader from '@/components/SiteHeader.vue'

const route = useRoute()
const router = useRouter()
const projectTitle = route.params.projecttitle
const projectId = route.params.projectid

const { fileList, currentFile, openFile, saveFile, fetchFiles, removeFile } = useNoteEditor()
const { userInfo, fetchUserInfo } = useUserInfo()
fetchUserInfo()

const handleHeaderTabClick = createHeaderTabClickHandler(router)

const editorContent = ref('')
const showAIChat = ref(false)
const editorWidth = ref(65)
const isPreview = ref(false)
const mdEditorRef = ref(null)
const lastSavedContent = ref('')
const editorToolbars = [
  'bold', 'italic', 'underline', '-',
  'unorderedList', 'orderedList', '-',
  'code', 'codeRow', 'link', 'image', 'table', '-',
  'preview'
]
let refreshTimer = null

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
  currentFile.value = {
    file_id: null,
    name: '',
    content: ''
  }
  lastSavedContent.value = ''
}

// 切换文件
const handleOpenFile = (file) => {
  openFile(file)
  editorContent.value = file.content || ''
  lastSavedContent.value = file.content || ''
}

// 发布
const handleSave = async () => {
  if (currentFile.value?.file_id) {
    const saved = await saveFile(editorContent.value || '')
    if (saved) {
      await refreshFilesSilently()
      lastSavedContent.value = editorContent.value || ''
      currentFile.value.content = editorContent.value || ''
      toastSuccess('Saved')
    }
    return
  }
  const fullName = prompt('Enter file name (e.g. note.md)')
  if (!fullName) return

  const normalizedName = fullName.trim()
  if (!normalizedName) {
    toastError('文件名不能为空')
    return
  }
  if (normalizedName.startsWith('.')) {
    toastError('不允许创建以 . 开头的文件')
    return
  }

  try {
    const res = await createFile({
      project_id: +projectId,
      name: normalizedName,
      content: editorContent.value,
    })
    if (res.code === 200) {
      toastSuccess('Created')
      await refreshFilesSilently()
      const createdFile = fileList.value.find((file) => file.name === normalizedName)
      if (createdFile) {
        openFile(createdFile)
        editorContent.value = createdFile.content || editorContent.value || ''
        lastSavedContent.value = createdFile.content || editorContent.value || ''
      } else {
        lastSavedContent.value = editorContent.value || ''
      }
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
      lastSavedContent.value = ''
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
  window.addEventListener('keydown', handleGlobalShortcut)

  refreshTimer = window.setInterval(() => {
    if (document.hidden) return
    void refreshFilesSilently()
  }, 5000)
})
onUnmounted(() => {
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('keydown', handleGlobalShortcut)

  if (refreshTimer) {
    window.clearInterval(refreshTimer)
    refreshTimer = null
  }
})

const handleGlobalShortcut = (event) => {
  const isSaveShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's'
  if (!isSaveShortcut) return

  event.preventDefault()
  if (!hasUnsavedChanges.value) return
  handleSave()
}

// AI 聊天
const inputMsg = ref('')
const messages = ref([{ role: 'assistant', content: '你好！我是 AI 助手～' }])
const loading = ref(false)

const strippedText = computed(() => {
  return String(editorContent.value || '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/^\s{0,3}[-*+]\s+/gm, '')
    .replace(/^\s{0,3}>\s?/gm, '')
    .replace(/\|/g, ' ')
    .replace(/[\*_~>{}\[\]()#+\-=!]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
})

const displayWordCount = computed(() => {
  const text = strippedText.value
  if (!text) return 0

  const latinWords = (text.match(/[A-Za-z0-9]+(?:'[A-Za-z0-9]+)?/g) || []).length
  const cjkChars = (text.match(/[\u4e00-\u9fff]/g) || []).length
  return latinWords + cjkChars
})

const hasUnsavedChanges = computed(() => {
  const currentContent = editorContent.value || ''
  const savedContent = lastSavedContent.value || ''

  if (!currentFile.value?.file_id) {
    return currentContent.trim().length > 0
  }

  return currentContent !== savedContent
})

const syncOpenFileFromLatestList = () => {
  if (!currentFile.value?.file_id) return

  const latestFile = fileList.value.find((file) => file.file_id === currentFile.value.file_id)
  if (!latestFile) return

  currentFile.value = {
    ...currentFile.value,
    ...latestFile,
  }

  if (hasUnsavedChanges.value) {
    return
  }

  const latestContent = latestFile.content || ''
  if (editorContent.value !== latestContent) {
    editorContent.value = latestContent
  }
  if (lastSavedContent.value !== latestContent) {
    lastSavedContent.value = latestContent
  }
}

const refreshFilesSilently = async () => {
  await fetchFiles({ silent: true })
  syncOpenFileFromLatestList()
}

const sendMessage = async () => {
  const msg = inputMsg.value.trim()
  if (!msg) return
  messages.value.push({ role: 'user', content: msg })
  inputMsg.value = ''
  loading.value = true

  try {
    const res = await chatWithAgent({
      project_id: Number(projectId),
      content: msg,
    })

    const reply = res?.data?.reply || '暂时没有返回内容'
    messages.value.push({ role: 'assistant', content: reply })
  } catch (err) {
    messages.value.push({ role: 'assistant', content: '抱歉，当前无法连接到 AI 服务，请稍后重试。' })
    toastError('AI 请求失败')
  } finally {
    loading.value = false
  }
}

const escapeHtml = (value = '') => {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const formatAssistantMessage = (content = '') => {
  const normalized = String(content)

  return escapeHtml(normalized)
    .replace(/```([\s\S]*?)```/g, (_, code) => {
      return `<pre class="my-2 overflow-x-auto rounded-lg bg-gray-900 px-3 py-2 text-xs leading-5 text-gray-100"><code>${escapeHtml(code.trim())}</code></pre>`
    })
    .replace(/`([^`]+)`/g, '<code class="rounded bg-gray-200 px-1 py-0.5 text-[0.85em] text-gray-800">$1</code>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^\s*[-*]\s+/gm, '• ')
    .replace(/^\s*(\d+)\.\s+/gm, '$1. ')
    .replace(/\n/g, '<br>')
}
</script>

<style>
.md-editor { border: none !important; }
.md-editor-wrapper { border: none !important; }

.project-md-editor {
  min-height: 0;
  overflow: hidden;
}

.project-md-editor .md-editor-content,
.project-md-editor .md-editor-input-wrapper,
.project-md-editor .md-editor-preview-wrapper {
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
}

.project-md-editor .md-editor-content,
.project-md-editor .md-editor-input-wrapper,
.project-md-editor .md-editor-preview-wrapper,
.project-md-editor .md-editor-content::-webkit-scrollbar,
.project-md-editor .md-editor-input-wrapper::-webkit-scrollbar,
.project-md-editor .md-editor-preview-wrapper::-webkit-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.project-md-editor .md-editor-content::-webkit-scrollbar,
.project-md-editor .md-editor-input-wrapper::-webkit-scrollbar,
.project-md-editor .md-editor-preview-wrapper::-webkit-scrollbar {
  width: 0;
  height: 0;
}
</style>