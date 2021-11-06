import { createApp } from 'vue'
import App from './AppXtnc.vue'
// import './scss/app.scss'
import './scss/tailwind.css'
import { store } from './libs/stores/xtncstore'
 
const app = createApp(App)
app.use(store)
app.mount('#app')