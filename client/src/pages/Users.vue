<template>
  <div class="height header-indent">
    <Header />
    <div class="py-5 width container">
      <div class="flex stretch">
        <b-form-input
          class="stretch"
          type="search"
          size="lg"
          v-model="searchText"
          placeholder="Введите имя пользователя..."
          @input="loadUsers"
        />
        <Button 
          v-tooltip:top.tooltip="'Регистрация нового пользователя'"
          class="btn" 
          @click="createUser"
        >
          <img width="40" height="40" src="/icons/plus.svg" />
        </Button>
        <Dialog v-model:show="dialogVisible" class="dialog">
          <Form 
            formTitle="Регистрация"
            formDesc=""
            :formConfig="authFormConfig"
            errorTitle="Пользователь с таким именем уже существует"
            :action="action"
            :redirect="registration"
          />
        </Dialog>
      </div>  
      <div class="haha scroll">
        <UserCard v-for="user in users" :key="user.id" :user="user" :reload="loadUsers" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import Header from '../components/Header.vue'
import Button from '../components/UI/Button.vue'
import UserCard from '../components/UserCard.vue'
import Tooltip from "../components/UI/Tooltip.vue"
import Dialog from '../components/UI/Dialog.vue';
import Form from '../components/Form.vue'
import { getUsers } from '../http/usersApi'
import { registration } from '../http/usersApi' 

const required = val => !!val
const optimalLength = (min, max) => val => val.length >= min && val.length < max

export default {
  components: { Header, Button, UserCard, Tooltip, Dialog, Form },
  setup() {
    const authFormConfig = ref({
      login: {
        value: '',
        type: 'email',
        placeholder: 'Алексей',
        validators: {
          required
        },
        exception: 'Имя пользователя не должно быть пустым'
      },
      password: {
        value: '',
        type: 'password',
        placeholder: 'admin12345',
        validators: {   
          required,
          optimalLength: optimalLength(4, 30)
        },
        exception: 'Длина пароля должна быть от 4 до 30 символов'
      }
    })

    const dialogVisible = ref(false)

    const action = async () => {
      dialogVisible.value = false
      await loadUsers()
    }
    
    const searchText = ref('');
    const users = ref([])
   

    const createUser = () => {
      dialogVisible.value = true
    }

    const loadUsers = async () => {
      try {
        const items = await getUsers();
        if (items.data.length > 0) {
          const searchTextLower = searchText.value.toLowerCase()
          users.value = items.data
            .sort((a, b) => a.login.localeCompare(b.login))
            .filter(user => user.login.toLowerCase().includes(searchTextLower))
        } else {
          alert('Список пользователей пуст.');
        }
      } catch (error) {
        alert(`Ошибка при загрузке списка пользователей: ${error.message}`)
      }
    }

    onMounted(loadUsers)

    return { users, dialogVisible, createUser, authFormConfig, action, registration, loadUsers, searchText }
  }
}
    
</script>

<style scoped>

.height {
  height: 100vh;
  overflow: hidden;
}

.width {
  max-width: 1200px;
}

.stretch {
  width: 92.3%;
}

.haha {
  width: 100%;
  padding: 20px 45px;
}

.btn {
  width: 100px;
  height: 60px;
}

.flex {
  display: flex;
  gap: 20px;
}

.scroll {
  max-height: 79.8vh;
  overflow-y: auto; 
  overflow-x: hidden;
}

</style>
