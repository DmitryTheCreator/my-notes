
<template>
  <div class="height">
    <Header /> 
    <div class="header-indent fullscreen flex">
      <NoteList />
      <Note />
    </div>
  </div>
 
</template>

<script>
import Header from '../components/Header.vue'
import NoteList from '../components/NoteList.vue'
import Note from '../components/Note.vue'

export default {
  components: { Header, NoteList, Note }
}
</script>

<style scoped>
.flex {
  display: flex;
}

.height {
  height: 100vh;
  overflow: hidden;
}

</style>