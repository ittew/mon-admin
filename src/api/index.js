import request from '@/utils/request'

/**
 * 登录
 * @param {*} data
 * @returns promsie
 */
export const login = data => {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
 * @returns promsie
 */
export const getUserInfo = () => {
  return request({
    url: '/sys/profile'
  })
}
