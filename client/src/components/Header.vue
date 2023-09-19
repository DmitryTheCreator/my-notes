<template>
  <header class="brown-b-color ">
    <h1 class="white-color merriweather-font large normal">MyNotes</h1>
    <div class="icons">
      <div>
        <img v-if="isNotesPage" src="/icons/user.svg" width="60" height="60" />
        <img v-else src="/icons/notes.svg" width="60" height="60" />
      </div>
      <img src="/icons/log-out.svg" width="60" height="60" />
    </div>
    
  </header>
</template>

<script>
export default {
  computed: {
    isNotesPage() {
      const currentPath = window.location.pathname;
      console.log(currentPath)
      return currentPath === "/notes";
    },
  },
};
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

.icons{
  display: flex;
  gap: 20px;
}

</style>