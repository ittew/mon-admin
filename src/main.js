import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import installIcons from './icons/index.js'
import './styles/index.scss'
import './premission'
import i18n from './i18n'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
app.use(i18n).use(store).use(router).mount('#app')
