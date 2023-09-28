<template>
  <b-form @submit.prevent="submit">
    <h1 class="h-center black-color merriweather-font large normal">{{ formTitle }}</h1>
    <h4 class="h-center black-color lato-font normal">{{ formDesc }}</h4>
    <LoginException
      class="login-exception"
      :errorTitle="errorTitle"
      :showErrorBanner="showErrorBanner"
      @close="closeErrorBanner"
    />
    <b-form-group v-for="(field, fieldName) in formConfig" :key="fieldName" :label="field.label">
      <b-form-input
        class="min-width"
        v-model="form[fieldName].value"
        :type="field.type"
        :placeholder="field.placeholder"
        :state="fieldState(fieldName)"
        @blur="form[fieldName].blur"
        :aria-describedby="invalidFeedback(fieldName)"
      ></b-form-input>
      <b-form-invalid-feedback :id="invalidFeedback(fieldName)">
        {{ form[fieldName].exception }}
      </b-form-invalid-feedback>
    </b-form-group>
    <b-button type="submit" variant="success" :disabled="!form.valid" block>
      Продолжить
    </b-button>
  </b-form>
</template>

<script>
import { ref } from 'vue'
import { useForm } from '../use/form'
import LoginException from '../components/LoginException.vue'

export default {
  props: {
    formConfig: Object,
    formTitle: String,
    formDesc: String,
    errorTitle: String,
    action: Function,
    redirect: Function
  },
  components: { LoginException },
  setup(props) {
    const form = useForm(props.formConfig)
    const showErrorBanner = ref(false)

    const fieldState = (fieldName) => {
      const field = form[fieldName]
      if (field) {
        if (fieldName === 'login') {
          return !field.touched || field.valid ? null : false
        } else if (fieldName === 'password') {
          return !field.touched ? null : field.valid
        }
      }
      return null
    }

    const closeErrorBanner = async () => showErrorBanner.value = false
    const invalidFeedback = (fieldName) => fieldName + '-live'
    
    async function submit() {
      try {
        await props.redirect(form.login.value, form.password.value)
        props.action()
      } catch (error) {
        showErrorBanner.value = true
      }
    }

    return { form, submit, fieldState, showErrorBanner, closeErrorBanner, invalidFeedback }
  },
}
</script>

<style scoped>
h1 {
  padding-top: 30px;
}

h4 {
  font-size: 18px;
  padding-top: 10px;
  padding-bottom: 15px;
}

.login-exception {
  margin-bottom: 15px;
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