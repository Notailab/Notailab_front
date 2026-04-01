import { defineStore } from 'pinia'

interface NoteItem {
    id: string
    title: string
    content: string
    tag: string
    createdAt: string
    updatedAt: string
}

export const useNoteStore = defineStore('notes', {
    state: () => ({
        notes: [] as NoteItem[],
        isGuest: false
    }),
    actions: {
        init() {
            const token = localStorage.getItem('token')
            if (!token) {
                this.isGuest = true
                this.loadGuestNotes()
            } else {
                this.isGuest = false
            }
        },

        loadGuestNotes() {
            const saved = localStorage.getItem('guest_notes')
            this.notes = saved ? JSON.parse(saved) : []
        },

        saveGuestNotes() {
            localStorage.setItem('guest_notes', JSON.stringify(this.notes))
        },

        addNote(noteData: Partial<NoteItem>) {
            if (this.isGuest) {
                const now = new Date().toISOString()
                const newNote: NoteItem = {
                    id: Date.now().toString(),
                    title: noteData.title || '',
                    content: noteData.content || '',
                    tag: noteData.tag || '其他',
                    createdAt: now,
                    updatedAt: now
                }
                this.notes.unshift(newNote)
                this.saveGuestNotes()
                return newNote
            }
        },

        updateNote(id: string, updates: Partial<NoteItem>) {
            if (this.isGuest) {
                const idx = this.notes.findIndex((note) => note.id === id)
                if (idx !== -1) {
                    this.notes[idx] = {
                        ...this.notes[idx],
                        ...updates,
                        updatedAt: new Date().toISOString()
                    }
                    this.saveGuestNotes()
                }
            }
        },

        deleteNote(id: string) {
            if (this.isGuest) {
                this.notes = this.notes.filter((note) => note.id !== id)
                this.saveGuestNotes()
            }
        }
    }
})