import { defineStore } from 'pinia'

export const useNoteStore = defineStore('notes', {
    state: () => ({
        notes: [],
        isGuest: false, // 是否为游客模式
    }),
    actions: {
        // 初始化：检查登录态，决定是否进入游客模式
        init() {
            const token = localStorage.getItem('token')
            if (!token) {
                this.isGuest = true
                this.loadGuestNotes() // 从本地加载游客笔记
            } else {
                this.isGuest = false
                // 这里调用后端接口加载用户笔记
                // this.fetchUserNotes()
            }
        },

        // 从 localStorage 加载游客笔记
        loadGuestNotes() {
            const saved = localStorage.getItem('guest_notes')
            this.notes = saved ? JSON.parse(saved) : []
        },

        // 保存游客笔记到 localStorage
        saveGuestNotes() {
            localStorage.setItem('guest_notes', JSON.stringify(this.notes))
        },

        // 新增笔记（兼容游客/登录模式）
        addNote(noteData) {
            if (this.isGuest) {
                const newNote = {
                    id: Date.now().toString(), // 用时间戳做本地ID
                    title: noteData.title,
                    content: noteData.content,
                    tag: noteData.tag || '其他',
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                }
                this.notes.unshift(newNote)
                this.saveGuestNotes() // 保存到本地
                return newNote
            } else {
                // 登录模式：调用后端接口
                // return api.post('/notes', noteData).then(res => {
                //   this.notes.unshift(res.data)
                // })
            }
        },

        // 更新笔记
        updateNote(id, updates) {
            if (this.isGuest) {
                const idx = this.notes.findIndex(n => n.id === id)
                if (idx !== -1) {
                    this.notes[idx] = {
                        ...this.notes[idx],
                        ...updates,
                        updatedAt: new Date().toISOString(),
                    }
                    this.saveGuestNotes()
                }
            } else {
                // 登录模式：调用后端接口
                // return api.patch(`/notes/${id}`, updates)
            }
        },

        // 删除笔记
        deleteNote(id) {
            if (this.isGuest) {
                this.notes = this.notes.filter(n => n.id !== id)
                this.saveGuestNotes()
            } else {
                // 登录模式：调用后端接口
                // return api.delete(`/notes/${id}`)
            }
        },
    },
})
