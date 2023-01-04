import request from '@/utils/request'

/**
 * 员工管理列表
 * @param {*} data
 * @returns promsie
 */
export const getUserManageList = data => {
  return request({
    url: '/user-manage/list',
    params: data
  })
}

/**
 * 批量上传
 * @param {*} data
 * @returns promsie
 */
export const userBatchImport = data => {
  return request({
    url: '/user-manage/batch/import',
    method: 'POST',
    data
  })
}

/**
 * 删除指定数据
 * @param {*} data
 * @returns promsie
 */
export const deleteUser = id => {
  return request({
    url: `/user-manage/delete/${id}`
  })
}

/**
 * 获取所有员工列表
 * @returns promsie
 */
export const getAllUserManageList = () => {
  return request({
    url: '/user-manage/all-list'
  })
}

/**
 * 获取所有员工列表
 * @returns promsie
 */
export const getUserDetail = id => {
  return request({
    url: `/user-manage/detail/${id}`
  })
}

/**
 * 获取指定用户角色
 * @returns promsie
 */
export const userRoles = id => {
  return request({
    url: `/user-manage/role/${id}`
  })
}

/**
 * 更新指定用户角色
 * @returns promsie
 */
export const updateRoles = (id, roles) => {
  return request({
    url: `/user-manage/update-role/${id}`,
    method: 'POST',
    data: {
      roles
    }
  })
}
