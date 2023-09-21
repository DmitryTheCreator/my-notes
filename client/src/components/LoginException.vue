<template>
  <div :class="{ 'explose': !showErrorBanner }" class="login-exception">
    <h1><strong>Неверное имя пользователя или пароль</strong></h1> 
    <img @click="removeBanner" src="/icons/close.svg" width="12" height="12">
  </div>
</template>

<script>
export default {
  props: {
    showErrorBanner: Boolean
  },
  methods: {
    removeBanner() {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.login-exception {
  width: 100%;
  height: 60px;
  background-color: #fedce0;
  border: 1px solid #b5686d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
}

h1 {
  font-size: 14px;
  margin-top: 6px;
  color: #841a21;
}

img:hover {
  background-color: #E8D1D2;
  cursor: pointer;
}

.explose {
  display: none;
}
</style>
