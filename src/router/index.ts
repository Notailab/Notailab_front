import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Login from '../views/login.vue'
import Home from '../views/home.vue'
import Stats from '../views/stats.vue'
import Setting from '../views/setting.vue'
import Project from '../views/project/project.vue'
import ProjectNew from '../views/project/new.vue'

const routes: RouteRecordRaw[] = [
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
        path: '/stats',
        name: 'stats',
        component: Stats
    },
    {
        path: '/:username/:projecttitle',
        name: 'project',
        component: Project
    },
    {
        path: '/project/new',
        name: 'project/new',
        component: ProjectNew
    },
    {
        path: '/settings',
        name: 'settings',
        alias: '/profile',
        component: Setting
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router