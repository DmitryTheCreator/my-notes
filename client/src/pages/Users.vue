<template>
  <div class="fullscreen header-indent">
    <Header />
    <div class="py-5 width container">
      <div class="flex stretch">
        <b-form-input
          class="stretch"
          type="search"
          size="lg"
          v-model="text"
          placeholder="Введите имя пользователя..."
        />
        <Button 
          v-tooltip:top.tooltip="'Регистрация нового пользователя'"
          class="btn" 
          @click="createNote"
        >
          <img width="40" height="40" src="/icons/plus.svg" />
        </Button>
      </div>  
      <div class="py-4 stretch">
        <UserCard v-for="user in users" :key="user.id" :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import Header from '../components/Header.vue'
import Button from '../components/UI/Button.vue'
import UserCard from '../components/UserCard.vue'
import Tooltip from "../components/UI/Tooltip.vue";
import { getUsers } from '../http/usersApi'
import { login } from '../http/authApi' 

export default {
  components: { Header, Button, UserCard, Tooltip },
  setup() {
    const users = ref([])

    onMounted(async () => {
      try {
        await getUsers()
          .then(items => {
            if (items.data.length > 0) {
              users.value = items.data
            } else {
              alert('Список пользователей пуст.')
            }
          })
      } catch (error) {
        alert(`Ошибка при загрузке списка пользователей: ${error.message}`)
      }
    })

    return { users }
  }
}
    
</script>

<style scoped>
.width {
  max-width: 1200px;
}

.stretch {
  width: 100%;
}

.btn {
  width: 100px;
  height: 60px;
}

.flex {
  display: flex;
  gap:20px
}
</style>
