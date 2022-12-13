// import path from 'path'
// console.log(path)
// 获取所有子路由
const getChildrenRoutes = routes => {
  const result = []
  routes.forEach(route => {
    if (route.children && route.children.length) {
      result.push(...route.children)
    }
  })
  return result
}

// 剔除重复的子路由 保留路由层级
export const filterRoutes = routes => {
  const childrenRoutes = getChildrenRoutes(routes)
  return routes.filter(route => {
    return !childrenRoutes.find(childrenRoute => {
      return childrenRoute.path === route.path
    })
  })
}

// 处理routes(filterRoutes)数据 返回对应的menu规则数据
export const generateMenus = (routes, basePath = '') => {
  const result = []
  // 过滤掉 children 或 meta 不存在的数据
  routes.forEach(item => {
    // 不存在 children 和 meta 直接return 如 login
    if (isNull(item.children) && isNull(item.meta)) return false
    // 不存在 meta 但 children存在 则递归处理 children 如 404 401
    if (isNull(item.meta) && !isNull(item.children)) {
      result.push(...generateMenus(item.children))
      return
    }
    // 存在 meta 且同时存在 title和icon才在 菜单显示
    const routePath = item.path
    // // 合并 path 作为跳转路径
    // // const routePath = path.resolve(basePath, item.path)
    // 若存在同名父路由 需单独处理
    let route = result.find(item => item.path === routePath)
    if (!route) {
      route = {
        ...item,
        path: routePath,
        children: []
      }
      // icon 与 title 必须全部存在
      if (route.meta.icon && route.meta.title) {
        // meta 存在生成 route 对象，放入 arr
        result.push(route)
      }
    }
    // 存在 children 进入迭代到children
    if (item.children) {
      route.children.push(...generateMenus(item.children, route.path))
    }
    // result.push(item)
  })
  return result
}

const isNull = data => {
  if (!data || JSON.stringify(data) === '{}' || JSON.stringify(data) === '[]') {
    return true
  }
}
