// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/login.vue'
import Home from '../views/home.vue'
import NodeList from '../views/node_list.vue'
import NodeEdit from '../views/node_edit.vue'

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
    path: '/node_list',
    name: 'node_list',
    component: NodeList
  },
  {
    path: '/node_edit',
    name: 'node_edit',
    component: NodeEdit
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
