import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import './index.scss'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
// import apiMock from '~/api-mock/'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.use(autoAnimatePlugin)
// app.use(apiMock)
app.mount('#app')
