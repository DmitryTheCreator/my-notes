<template>
  <header class="brown-b-color">
    <h1 class="white-color merriweather-font large normal">MyNotes</h1>
    <div class="icons">
      <div v-if="userRole === 'ADMIN'">
        <img 
          v-if="isNotesPage"
          @click="goToUsers"
          class="pointer" 
          src="/icons/user.svg" 
          width="60"
          height="60" 
        />
        <img
          v-else
          @click="goToNotes"
          class="pointer" 
          src="/icons/notes.svg" 
          width="60" 
          height="60" 
        />
      </div>
      <svg 
        class="logout-style pointer"
        @click="leavePage"
        fill="#ffffff" 
        width="60px" 
        height="60px" 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M18 2H6a1 1 0 0 0-1 1v9l5-4v3h6v2h-6v3l-5-4v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/>
      </svg>
    </div>
  </header>
</template>

<script>
import { useRouter } from 'vue-router'
import { logout } from '../http/authApi'
import { ref, onMounted, watch } from 'vue'
import jwt_decode from 'jwt-decode'

export default {
  setup() {
    const router = useRouter()

    const leavePage = () => {
      const isConfirmed = window.confirm('Вы действительно выйти из аккаунта?')
      if (isConfirmed) {
        try {
          logout()
          router.push('/api/login')
        } catch (e) {
          alert(`Ошибка выхода из аккаунта: ${e.message}`)
        }
      }
    }

    const userRole = ref('USER')
    const isNotesPage = ref(false)

    onMounted(() => {
      const token = localStorage.getItem('token')
      if (token) {
        const decoded = jwt_decode(token)
        userRole.value = decoded.role
      }
      isNotesPage.value = router.currentRoute.value.path === '/api/notes'
    })

    watch(() => router.currentRoute, (to, from) => {
      isNotesPage.value = to.path === '/api/notes'
    })

    const goToNotes = () => {
      try {
        router.push('/api/notes')
      } catch (e) {
        alert(`Ошибка перехода на страницу с заметками: ${e.message}`)
      }
    }

    const goToUsers = () => {
      try {
        router.push('/api/users')
      } catch (e) {
        alert(`Ошибка перехода на страницу управления пользователями: ${e.message}`)
      }
    }

    return { isNotesPage, leavePage, userRole, goToNotes, goToUsers }
  }
}
</script>

<style scoped>
header {
  vertical-align: middle;
  position: fixed;
  height: 80px;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px;
}

.icons {
  display: flex;
  gap: 20px;
}

.pointer {
  cursor: pointer;
}

.logout-style {
  transition: fill 0.3s;
}

.logout-style:hover {
  fill: #e54848;
}

</style>