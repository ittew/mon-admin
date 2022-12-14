import router from './router'
import store from './store'

// 白名单
const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
  // 1. 用户登录后, token未过期之前, 不允许进入login页面
  // 2. 未登录时, 不允许进入除白名单之外的页面
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 已登录判断用户信息是否获取 没有则获取用户信息
      if (!store.getters.hasUserInfo) {
        const { permission } = await store.dispatch('user/getUserInfo')
        // 处理用户权限, 筛选出需要添加的权限
        const filterRoutes = await store.dispatch('permission/filterRoutes', permission.menus)
        console.log(filterRoutes)
        filterRoutes.forEach(item => {
          router.addRoute(item)
        })
      }
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
