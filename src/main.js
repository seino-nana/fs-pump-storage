import { createApp } from 'vue'
import './style.css'
import 'animate.css'
import App from './App.vue'
const app = createApp(App)

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// app.use(ElementPlus)
import router from './router/index'
app.use(router) 
import naive from 'naive-ui'
app.use(naive)

app.mount('#app')
