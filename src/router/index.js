// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login.vue'
import Home from '../views/home.vue'
import NoteList from '../views/note_list.vue'
import NoteEdit from '../views/note_edit.vue'
import Profile from '../views/profile.vue'
import Project from '../views/project/project.vue'
import Project_New from '../views/project/new.vue'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/:username/:projecttitle',
        name: 'project',
        component: Project
    },
    {
        path: '/project/new',
        name: 'project/new',
        component: Project_New
    },
    {
        path: '/note_list',
        name: 'note_list',
        component: NoteList
    },
    {
        path: '/note_edit',
        name: 'note_edit',
        component: NoteEdit
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
