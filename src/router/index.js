// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login.vue'
import Home from '../views/home.vue'
import NoteList from '../views/note_list.vue'
import NoteEdit from '../views/note_edit.vue'
import Porfile from '../views/profile.vue'

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
    component: Porfile
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
