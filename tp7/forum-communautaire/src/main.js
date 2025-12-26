import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// CSS
import './assets/base.css'
import './assets/main.css'

// ✅ Remove BootstrapVue Next import - using Bootstrap CSS only
// BootstrapVue Next components not needed for this app

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Initialiser l'authentification
import { useAuthStore } from './stores/auth'
const authStore = useAuthStore()
authStore.initAuth()

app.mount('#app')
