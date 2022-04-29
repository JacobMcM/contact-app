import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/addContact',
    name: 'addContact',
    component: () => import('@/views/AddContactView.vue')
  },
  {
    path: '/contact/:id',
    name: 'contact.show',
    component: ()=> import('@/views/ContactView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
