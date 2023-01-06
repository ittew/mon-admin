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

// 获取指定角色权限
export const rolePermisstion = roleId => {
  return request({
    url: `/role/permission/${roleId}`
  })
}

// 为指定角色分配权限
export const distributePermission = data => {
  return request({
    url: '/role/distribute-permission',
    method: 'POST',
    data
  })
}
