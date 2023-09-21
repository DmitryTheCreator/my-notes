import {createRouter, createWebHistory} from 'vue-router'
import Login from '../pages/Login.vue'
import Notes from '../pages/Notes.vue'
import Users from '../pages/Users.vue' 


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
    component: Notes 
  },
  {
    path: '/api/users',
    component: Users 
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

export default router;