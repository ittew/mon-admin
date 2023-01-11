import { privateRoutes, publicRoutes } from '@/router'

export default {
  namespaced: true,
  state: {
    // 路由表: 初始拥有静态路由权限
    routes: publicRoutes
  },
  mutations: {
    // 增加路由
    setRoutes(state, newRoutes) {
      // 在静态路由基础上增加新路由
      state.routes = [...publicRoutes, ...newRoutes]
    }
  },
  actions: {
    // 根据权限筛选路由
    filterRoutes(context, menus) {
      const routes = []
      // 路由权限匹配
      menus.forEach(key => {
        // 权限名与路由的name匹配
        routes.push(...privateRoutes.filter(item => item.name === key))
      })
      context.commit('setRoutes', routes)
      return routes
    }
  }
}
