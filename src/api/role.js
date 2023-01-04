import request from '@/utils/request'

// 角色列表
export const roleList = () => {
  return request({
    url: '/role/list'
  })
}

// 权限列表
export const permisstionList = () => {
  return request({
    url: '/permission/list'
  })
}
