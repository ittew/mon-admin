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
