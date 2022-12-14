import { createI18n } from 'vue-i18n'
import store from '@/store'
import zhLocale from './lang/zh'
import enLocale from './lang/en'
import { watch } from 'vue'

const messages = {
  en: {
    msg: {
      ...enLocale
    }
  },
  zh: {
    msg: {
      ...zhLocale
    }
  }
}

const i18n = createI18n({
  // 使用 Composition API 模式，则需要将其设置为false
  legacy: false,
  // 全局注入 $t 函数
  globalInjection: true,
  locale: store.getters.language || 'zh',
  messages,
  warnHtmlMessage: false // 不提示 v-html xss 警告
})

// 监听langguage切换
export function watchSwitchLang(...cbs) {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach(cb => cb(store.getters.language))
    }
  )
}

export default i18n
