import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import installIcons from './icons/index.js'
import './styles/index.scss'
import './premission'
import i18n from './i18n'
// 导入所有icon
import * as EleIcons from '@element-plus/icons-vue'
import installFilters from '@/filters'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
installFilters(app)
for (const name in EleIcons) {
  app.component(name, EleIcons[name])
}
app.use(i18n).use(store).use(router).mount('#app')
