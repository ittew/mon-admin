import router from './router'
import store from './store'

// 白名单
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  // 1. 用户登录后, token未过期之前, 不允许进入login页面
  // 2. 未登录时, 不允许进入除白名单之外的页面
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
