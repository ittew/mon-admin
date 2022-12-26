import i18n from '@/i18n'
export const getRoutesData = (routes, basePath = '', prefixTitle = []) => {
  // 创建 result 数据
  let res = []
  for (const route of routes) {
    const data = {
      path: `${basePath}${route.path}`,
      title: [...prefixTitle]
    }
    // 当存在meta时, 使用i18n解析国际化数据, 组合成新的title内容
    // 动态不允许被搜索
    const reg = /.*\/:.*/
    if (route.meta && route.meta.title && !reg.exec(route.path)) {
      const i18ntitle = i18n.global.t(`msg.route.${route.meta.title}`)
      data.title = [...data.title, i18ntitle]
      res.push(data)
    }
    // 存在 children 时, 迭代调用
    if (route.children) {
      const tempRoutes = getRoutesData(route.children, '', data.title)
      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes]
      }
    }
  }
  return res
}
