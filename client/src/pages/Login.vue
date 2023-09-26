<template>
  <div class="container fullscreen v-center">
    <b-form class="form" @submit.prevent="submit">
      <h1 class="h-center black-color merriweather-font large normal">MyNotes</h1>
      <h4 class="h-center black-color lato-font normal">Запоминайте все, что важно.</h4>
      <LoginException :showErrorBanner="showErrorBanner" @close="closeErrorBanner" />
      <b-form-group 
        class="pd-top"
        id="input-group-1"
        label="Имя пользователя:"
        label-for="input-1"
        description=""
      >
        <b-form-input
          id="input-1"
          class="min-width"
          v-model="form.login.value"    
          type="email"
          :state="!form.login.touched || form.login.valid? null: false"
          @blur="form.login.blur"
          aria-describedby="login-live"
          placeholder="Алексей"
          required
        />
        <b-form-invalid-feedback id="login-live" value="ad">
          {{ form.login.exception }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group 
        id="input-group-2" 
        label="Пароль:" 
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          class="min-width"
          v-model="form.password.value"
          type="password"
          :state="!form.password.touched? null: form.password.valid"
          @blur="form.password.blur"
          aria-describedby="password-live"
          placeholder="admin123"
          required
        ></b-form-input>
        <b-form-invalid-feedback id="password-live">
          {{ form.password.exception }}
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="success"
        :disabled="!form.valid"
        block 
      >
        Продолжить
      </b-button>
    </b-form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useForm } from '../use/form'
import { login } from '../http/authApi'
import LoginException from '../components/LoginException.vue'
import { useRouter } from 'vue-router'

const required = val => !!val
const optimalLength = (min, max) => val => val.length >= min && val.length < max


export default {
  components: {
    LoginException
  },
  setup() {
    const form = useForm({
      login: {
        value: '',
        validators: {
          required
        },
        exception: 'Имя пользователя не должно быть пустым'
      },
      password: {
        value: '',
        validators: {   
          required,
          optimalLength: optimalLength(4, 30)
        },
        exception: 'Длина пароля должна быть от 4 до 30 символов'
      }
    })

    const showErrorBanner = ref(false)
    const router = useRouter()

    function closeErrorBanner() {
      showErrorBanner.value = false
    }

    async function submit() {
      try {
        await login(form.login.value, form.password.value)
        router.push('/api/notes')
      } catch (error) {
        showErrorBanner.value = true
      }
    }

    return {form, submit, showErrorBanner, closeErrorBanner }
  }
}
</script>

<style scoped>
.form {
  background-color: #E3D6C8;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 4px 4px 20px rgba(0, 0, 0, .2), -1px -1px 20px rgba(0, 0, 0, .2);
}

h1 {
  padding-top: 30px;
}

h4 {
  font-size: 18px;
  padding-top: 10px;
  padding-bottom: 15px;
}

.pd-top {
  padding-top: 15px;
}

.explose {
  display: none;
}

.min-width {
  min-width: 400px;
}

.hover:hover {
  background-color: #5e3409;
}
.active:active {
  background-color: #5e3409;
}

@media (max-width:496px) {
  .form {
    max-width: 496px;
  }
  .min-width {
    min-width: 100px;
  }
}
</style>