<template>
  <div class="container fullscreen v-center form">
    <Form 
      formTitle="MyNotes"
      formDesc="Запоминайте все, что важно."
      :formConfig="authFormConfig"
      errorTitle="Неверное имя пользователя или пароль"
      :action="action"
      :redirect="login"
    />
  </div>
</template>

<script>
import Form from '../components/Form.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../http/authApi'

const required = val => !!val
const optimalLength = (min, max) => val => val.length >= min && val.length < max

export default {
  components: {
    Form,
  },
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

    const router = useRouter()

    const action = async () => {
      router.push('/api/notes')
    }

    return { authFormConfig, formTitle, action, login }
  }
}
</script>

<style scoped>
Form {
  background-color: #E3D6C8;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 4px 4px 20px rgba(0, 0, 0, .2), -1px -1px 20px rgba(0, 0, 0, .2);
}
</style>