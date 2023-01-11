import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import store from './store'
import router from './router'
import installElementPlus from './plugins/element'
import installIcons from './icons/index.js'
import './styles/index.scss'
import './premission'
// 导入所有icon
import * as EleIcons from '@element-plus/icons-vue'
import installFilters from '@/filters'
import installDirectives from '@/directives'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
installFilters(app)
installDirectives(app)
for (const name in EleIcons) {
  app.component(name, EleIcons[name])
}
app.use(i18n).use(store).use(router).mount('#app')
