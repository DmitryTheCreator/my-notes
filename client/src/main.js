import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import { BootstrapVue3 } from 'bootstrap-vue-3'
import store from './store/store'
import './main.css'


const app = createApp(App)

app
  .use(BootstrapVue3)
  .use(store)
  .use(router)
  .mount('#app')
