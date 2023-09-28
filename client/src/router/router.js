import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Notes from '../pages/Notes.vue'
import Users from '../pages/Users.vue' 
import { isAuthenticated } from '../helpers/auth'
import { isActive } from '../helpers/active'
import { isAdmin } from '../helpers/admin'


const routes = [
  {
    path: "/",
    redirect: "/api/notes",
  },
  {
    path: '/api/login',
    component: Login 
  },
  {
    path: '/api/notes',
    component: Notes,
    beforeEnter: (to, from, next) => {
      if(!isAuthenticated()) {
        next('/api/login')
      } else {
        if (!isActive()) {
          next('/api/login')
          alert('Ваш аккаунт деактивирован!')
        } else {
          next()
        }
      }
    }
  },
  {
    path: '/api/users',
    component: Users,
    beforeEnter: (to, from, next) => {
      if(!isAuthenticated()) {
        next('/api/login')
      } else {
        if (!isActive()) {
          next('/api/login')
          alert('Ваш аккаунт деактивирован!')
        } else {
          if (!isAdmin()) {
            next('/api/login')
            alert('Доступ только администраторам!')
          } else {
            next()
          }
        }
      }
    }
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router