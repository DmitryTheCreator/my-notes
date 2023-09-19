<template>
  <div class="container">
    <b-form class="form" @submit="onSubmit" @reset="onReset" v-if="show">
      <h1 class="h-center black-color merriweather-font large normal">MyNotes</h1>
      <h4 class="h-center black-color lato-font normal">Запоминайте все, что важно.</h4>
      <b-form-group 
        id="input-group-1"
        label="Имя пользователя:"
        label-for="input-1"
        description=""
      >
        <b-form-input
          id="input-1"
          class="min-width"
          v-model="form.login"    
          type="email"
          placeholder="Алексей"
          required
        />
      </b-form-group>

      <b-form-group 
        id="input-group-2" 
        label="Пароль:" 
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          class="min-width"
          v-model="form.password"
          type="password"
          :state="passwordState"
          aria-describedby="input-live-feedback"
          placeholder="admin123"
          required
        ></b-form-input>
        <b-form-invalid-feedback id="input-live-feedback">
          Длина пароля должна быть не меньше 4 символов
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button
        type="submit"
        variant="success"
        block 
      >
        Продолжить
      </b-button>
    </b-form>
  </div>
</template>

<script>
export default {
    data() {
      return {
        form: {
          login: '',
          password: '',
        },
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        console.log(this.passwordState)
        if(this.passwordState)
          this.$router.push('/notes')
      },
      onReset(event) {
        event.preventDefault()
        this.form.email = ''
        this.form.name = ''
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    },
    computed: {
      passwordState() {
        return this.form.password.length > 4 && this.form.password.length < 30 ? true : false
      }
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
  padding-bottom: 30px;
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